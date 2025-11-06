import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import {
  Brain,
  Target,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const Resultado = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const answers = localStorage.getItem('diagnosticAnswers');
    if (!answers) {
      navigate('/diagnostico');
      return;
    }

    // Generate profile based on answers
    const parsedAnswers = JSON.parse(answers);
    const generatedProfile = generateProfile(parsedAnswers);
    setProfile(generatedProfile);
  }, [navigate]);

  const generateProfile = (answers: any) => {
    // Simple logic to generate profile type
    const procrastinationFreq = answers[1] || 5;
    const motivation = answers[7] || 5;
    const perfectionism = answers[6] === "Perfeccionismo (espero el momento ideal)";

    let type = "PROCRASTINADOR PERFECCIONISTA";
    let description = "Esperas el momento perfecto para estudiar, pero ese momento nunca llega. Tienes altos estándares que a veces te paralizan.";
    
    if (procrastinationFreq > 7) {
      type = "PROCRASTINADOR CRÓNICO";
      description = "Pospones constantemente tus tareas de estudio. Necesitas estructura y accountability externos para mantener el enfoque.";
    } else if (motivation < 4) {
      type = "DESMOTIVADO ESTRATÉGICO";
      description = "Te falta claridad sobre tus metas. Una vez que conectes con tu 'por qué', tu productividad se disparará.";
    }

    return {
      type,
      description,
      strengths: [
        "Consciente de tu problema",
        "Motivado a cambiar",
        "Dispuesto a probar nuevas técnicas"
      ],
      challenges: [
        "Posponer tareas difíciles",
        "Distracciones digitales",
        "Falta de estructura"
      ],
      radarData: [
        { subject: "Enfoque", value: Math.max(30, 100 - procrastinationFreq * 10), fullMark: 100 },
        { subject: "Motivación", value: motivation * 10, fullMark: 100 },
        { subject: "Organización", value: 40, fullMark: 100 },
        { subject: "Consistencia", value: 35, fullMark: 100 },
        { subject: "Técnicas", value: 50, fullMark: 100 },
        { subject: "Autodisciplina", value: 45, fullMark: 100 },
      ],
      recommendedPlan: "Plata"
    };
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 gradient-primary text-white border-0">
            <Sparkles className="w-4 h-4 mr-2" />
            Análisis Completado
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tu Perfil Anti-Procrastinación
          </h1>
        </motion.div>

        <div className="space-y-8">
          {/* Profile Type */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-card p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary mb-6 shadow-glow">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                {profile.type}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {profile.description}
              </p>
            </Card>
          </motion.div>

          {/* Strengths & Challenges */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold">Tus Fortalezas</h3>
                </div>
                <div className="space-y-3">
                  {profile.strengths.map((strength: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                        ✓
                      </Badge>
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold">Retos Principales</h3>
                </div>
                <div className="space-y-3">
                  {profile.challenges.map((challenge: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                        ⚠
                      </Badge>
                      <span>{challenge}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Análisis de 6 Dimensiones
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={profile.radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: 'hsl(var(--foreground))' }}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Tu Nivel"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Recommended Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-card p-8 text-center border-2 border-primary shadow-glow">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                Plan Recomendado: {profile.recommendedPlan}
              </h3>
              <p className="text-muted-foreground mb-6">
                Basado en tu perfil, este plan te dará las herramientas necesarias para transformar tu forma de estudiar.
              </p>
              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate('/#pricing')}
                className="group"
              >
                Ver Plan Personalizado
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Resultado;
