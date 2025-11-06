import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import React, { Suspense } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "@/lib/lazyRecharts";
import {
  Clock,
  Target,
  TrendingUp,
  Flame,
  Play,
  Edit,
  Sparkles,
  Award,
  Calendar,
  BrainCircuit, // Importar nuevo ícono
} from "lucide-react";
import { getStats, getSessions, getUserProfile, generateAITip, getUnlockedAchievements } from "@/lib/storage";

const Dashboard = () => {
  const [currentSubject, setCurrentSubject] = useState("");
  type StatsType = {
    sessionsThisWeek: number;
    totalHours: number;
    streak: number;
    name: string;
    university: string;
    plan: string;
    currentAverage: number;
    estimatedAverage: number;
  } | null;
  type AchievementType = {
    icon: React.ReactNode;
    name: string;
    // agrega más campos si es necesario
  };
  const [stats, setStats] = useState<StatsType>(null);
  const [aiTip, setAiTip] = useState("");
  const [achievements, setAchievements] = useState<AchievementType[]>([]);
  
  useEffect(() => {
    // Cargar datos reales del storage
    const loadedStats = getStats();
    const profile = getUserProfile();
    const unlockedAchievements = getUnlockedAchievements();

    setStats({
      ...loadedStats,
      name: profile?.name || "Estudiante",
      university: profile?.university || "Universidad",
      plan: profile?.plan || "Bronce",
      currentAverage: profile?.currentAverage || 14.2,
      estimatedAverage: profile?.targetAverage || 15.8,
      totalHours: typeof loadedStats.totalHours === 'string' ? parseFloat(loadedStats.totalHours) : loadedStats.totalHours,
    });

    setAchievements(unlockedAchievements);
    setAiTip(generateAITip());

    // Actualizar tip cada minuto
    const interval = setInterval(() => {
      setAiTip(generateAITip());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Cargando tus datos...</div>
      </div>
    );
  }

  const targetSessions = 15;
  const sessionsThisWeek = Math.min(stats.sessionsThisWeek, targetSessions);

  const weeklyProductivity = [
    { hour: "8am", productivity: 65 },
    { hour: "10am", productivity: 85 },
    { hour: "12pm", productivity: 70 },
    { hour: "2pm", productivity: 60 },
    { hour: "4pm", productivity: 75 },
    { hour: "6pm", productivity: 80 },
    { hour: "8pm", productivity: 90 },
    { hour: "10pm", productivity: 75 },
  ];

  // Calcular stats de materias desde sesiones reales
  const sessions = getSessions();
  const subjectStats = sessions.reduce((acc: Record<string, number>, session: { subject: string; duration: number }) => {
    if (!acc[session.subject]) {
      acc[session.subject] = 0;
    }
    acc[session.subject] += session.duration / 3600;
    return acc;
  }, {});

  const subjectHours = Object.entries(subjectStats)
    .map(([subject, hours]) => ({ subject, hours: parseFloat((hours as number).toFixed(1)) }))
    .sort((a, b) => b.hours - a.hours)
    .slice(0, 5);

  const upcomingSessions = [
    { time: "4:00 PM", subject: currentSubject || "Cálculo 2", technique: "Pomodoro 25-5", duration: "2h" },
    { time: "7:00 PM", subject: "Física 1", technique: "Pomodoro 50-10", duration: "2h" },
    { time: "9:00 PM", subject: "Inglés", technique: "Pomodoro 25-5", duration: "1h" },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              ¡Hola, {stats.name}! 👋
            </h1>
            <p className="text-muted-foreground">
              {stats.university} • Plan {stats.plan}
            </p>
          </div>
          <Badge className="gradient-primary text-white border-0 px-4 py-2">
            🔥 Racha de {stats.streak} días
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Sesiones</span>
              </div>
              <div className="text-2xl font-bold mb-2">
                {sessionsThisWeek}/{targetSessions}
              </div>
              <Progress value={(sessionsThisWeek / targetSessions) * 100} className="h-2" />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-secondary" />
                <span className="text-sm text-muted-foreground">Horas</span>
              </div>
              <div className="text-2xl font-bold">{stats.totalHours}h</div>
              <span className="text-xs text-muted-foreground">Total estudiadas</span>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-2">
                <Flame className="w-5 h-5 text-warning" />
                <span className="text-sm text-muted-foreground">Racha</span>
              </div>
              <div className="text-2xl font-bold">{stats.streak} días</div>
              <span className="text-xs text-accent">¡Sigue así!</span>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">Promedio</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{stats.currentAverage}</span>
                <span className="text-accent">→ {stats.estimatedAverage}</span>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Study Assistant Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass-card p-6 border-2 border-primary/30 shadow-glow">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-primary" />
                  Asistente de Estudio IA
                </h3>
                <p className="text-muted-foreground mb-4">
                  ¿No sabes por dónde empezar? Pide a la IA que te cree un plan de estudio con los conceptos clave y ejercicios.
                </p>
                <Link to="/estudio-ia">
                  <Button variant="hero" className="w-full">
                    Empezar a Crear
                  </Button>
                </Link>
              </Card>
            </motion.div>



            {/* Productivity Chart */}
            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4">Productividad por Hora</h3>
              <Suspense fallback={<div className="h-64 animate-pulse" /> }>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weeklyProductivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="productivity"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Suspense>
            </Card>

            {/* Subjects Chart */}
            {subjectHours.length > 0 && (
              <Card className="glass-card p-6">
                <h3 className="text-xl font-bold mb-4">Horas por Materia</h3>
                <Suspense fallback={<div className="h-72 animate-pulse" /> }>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={subjectHours}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Suspense>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Sessions */}
            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" />
                Próximas Sesiones
              </h3>
              <div className="space-y-4">
                {upcomingSessions.map((session, i) => (
                  <div key={i} className="p-4 bg-muted/30 rounded-lg border border-border">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold">{session.subject}</div>
                      <Badge variant="outline" className="text-xs">{session.time}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {session.technique} • {session.duration}
                    </div>
                    <Button variant="ghost" size="sm" className="w-full">
                      <Edit className="w-3 h-3 mr-2" />
                      Editar
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Insights */}
            <Card className="glass-card p-6 border-2 border-primary/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Insights de IA
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg text-sm">
                  {aiTip}
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg text-sm">
                  💡 Tu mejor hora de estudio es a las 8pm según tus datos
                </div>
              </div>
            </Card>

            {/* Achievements */}
            {achievements.length > 0 && (
              <Card className="glass-card p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-warning" />
                  Logros Recientes
                </h3>
                <div className="space-y-3">
                  {achievements.slice(0, 3).map((achievement, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="text-3xl">{achievement.icon}</div>
                      <span className="text-sm font-medium">{achievement.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
