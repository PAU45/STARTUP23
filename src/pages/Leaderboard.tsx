import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, TrendingUp, Flame, Users, Medal, Crown } from "lucide-react";
import { getStats } from "@/lib/storage";

const Leaderboard = () => {
  const [userStats, setUserStats] = useState<ReturnType<typeof getStats> | null>(null);

  useEffect(() => {
    setUserStats(getStats());
  }, []);

  // Mock leaderboard data (simular datos de otros usuarios)
  const weeklyLeaders = [
    { rank: 1, name: "Carlos Mendoza", university: "UNI", hours: 28.5, streak: 12, avatar: "CM" },
    { rank: 2, name: "Ana Quispe", university: "UNMSM", hours: 26.3, streak: 10, avatar: "AQ" },
    { rank: 3, name: "Tú", university: "PUCP", hours: parseFloat(userStats?.totalHours || "18.5"), streak: userStats?.streak || 5, avatar: "TU", isUser: true },
    { rank: 4, name: "Luis Torres", university: "PUCP", hours: 17.8, streak: 8, avatar: "LT" },
    { rank: 5, name: "María Santos", university: "UNI", hours: 16.2, streak: 7, avatar: "MS" },
    { rank: 6, name: "Pedro Ramírez", university: "UNMSM", hours: 15.5, streak: 6, avatar: "PR" },
    { rank: 7, name: "Sofía López", university: "UPC", hours: 14.8, streak: 9, avatar: "SL" },
    { rank: 8, name: "Diego Flores", university: "PUCP", hours: 14.2, streak: 5, avatar: "DF" },
  ];

  const monthlyLeaders = [
    { rank: 1, name: "Ana Quispe", university: "UNMSM", hours: 112.5, sessions: 58, avatar: "AQ" },
    { rank: 2, name: "Carlos Mendoza", university: "UNI", hours: 108.3, sessions: 54, avatar: "CM" },
    { rank: 3, name: "Luis Torres", university: "PUCP", hours: 95.8, sessions: 48, avatar: "LT" },
    { rank: 4, name: "Tú", university: "PUCP", hours: parseFloat(userStats?.totalHours || "79.5"), sessions: userStats?.totalSessions || 47, avatar: "TU", isUser: true },
    { rank: 5, name: "María Santos", university: "UNI", hours: 76.2, sessions: 42, avatar: "MS" },
  ];

  const streakLeaders = [
    { rank: 1, name: "Carlos Mendoza", university: "UNI", streak: 45, hours: 28.5, avatar: "CM" },
    { rank: 2, name: "Diego Flores", university: "PUCP", streak: 38, hours: 14.2, avatar: "DF" },
    { rank: 3, name: "Ana Quispe", university: "UNMSM", streak: 32, hours: 26.3, avatar: "AQ" },
    { rank: 4, name: "Luis Torres", university: "PUCP", streak: 28, hours: 17.8, avatar: "LT" },
    { rank: 5, name: "Tú", university: "PUCP", streak: userStats?.streak || 12, hours: parseFloat(userStats?.totalHours || "18.5"), avatar: "TU", isUser: true },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-warning" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-muted-foreground" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-600" />;
    return <span className="text-muted-foreground font-bold">#{rank}</span>;
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="mb-4 gradient-primary text-white border-0">
              <Users className="w-4 h-4 mr-2" />
              Comunidad StudyFlow
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tabla de Posiciones</h1>
            <p className="text-muted-foreground">
              Compite con estudiantes de todo el Perú
            </p>
          </motion.div>
        </div>

        {/* User Stats Summary */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card p-6 text-center">
            <Trophy className="w-8 h-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold mb-1">Top 15%</div>
            <div className="text-sm text-muted-foreground">Tu posición</div>
          </Card>
          <Card className="glass-card p-6 text-center">
            <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold mb-1">{userStats?.totalHours || 0}h</div>
            <div className="text-sm text-muted-foreground">Esta semana</div>
          </Card>
          <Card className="glass-card p-6 text-center">
            <Flame className="w-8 h-8 text-destructive mx-auto mb-2" />
            <div className="text-2xl font-bold mb-1">{userStats?.streak || 0}</div>
            <div className="text-sm text-muted-foreground">Días de racha</div>
          </Card>
          <Card className="glass-card p-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold mb-1">3,247</div>
            <div className="text-sm text-muted-foreground">Estudiantes activos</div>
          </Card>
        </div>

        {/* Leaderboard Tabs */}
        <Card className="glass-card p-6">
          <Tabs defaultValue="weekly">
            <TabsList className="grid grid-cols-3 w-full mb-6">
              <TabsTrigger value="weekly">Semanal</TabsTrigger>
              <TabsTrigger value="monthly">Mensual</TabsTrigger>
              <TabsTrigger value="streak">Racha</TabsTrigger>
            </TabsList>

            <TabsContent value="weekly">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Pos.</TableHead>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Universidad</TableHead>
                    <TableHead className="text-right">Horas</TableHead>
                    <TableHead className="text-right">Racha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {weeklyLeaders.map((leader) => (
                    <TableRow 
                      key={leader.rank} 
                      className={leader.isUser ? "bg-primary/10 border-l-4 border-l-primary" : ""}
                    >
                      <TableCell className="font-bold">
                        {getRankIcon(leader.rank)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className={leader.isUser ? "bg-primary text-primary-foreground" : ""}>
                              {leader.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className={leader.isUser ? "font-bold" : ""}>
                            {leader.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{leader.university}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {leader.hours}h
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className="bg-warning/20 text-warning border-warning/20">
                          🔥 {leader.streak}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="monthly">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Pos.</TableHead>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Universidad</TableHead>
                    <TableHead className="text-right">Horas</TableHead>
                    <TableHead className="text-right">Sesiones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyLeaders.map((leader) => (
                    <TableRow 
                      key={leader.rank}
                      className={leader.isUser ? "bg-primary/10 border-l-4 border-l-primary" : ""}
                    >
                      <TableCell className="font-bold">
                        {getRankIcon(leader.rank)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className={leader.isUser ? "bg-primary text-primary-foreground" : ""}>
                              {leader.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className={leader.isUser ? "font-bold" : ""}>
                            {leader.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{leader.university}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {leader.hours}h
                      </TableCell>
                      <TableCell className="text-right">
                        {leader.sessions}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="streak">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Pos.</TableHead>
                    <TableHead>Estudiante</TableHead>
                    <TableHead>Universidad</TableHead>
                    <TableHead className="text-right">Racha</TableHead>
                    <TableHead className="text-right">Horas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {streakLeaders.map((leader) => (
                    <TableRow 
                      key={leader.rank}
                      className={leader.isUser ? "bg-primary/10 border-l-4 border-l-primary" : ""}
                    >
                      <TableCell className="font-bold">
                        {getRankIcon(leader.rank)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className={leader.isUser ? "bg-primary text-primary-foreground" : ""}>
                              {leader.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className={leader.isUser ? "font-bold" : ""}>
                            {leader.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{leader.university}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className="bg-warning/20 text-warning border-warning/20 text-lg font-bold">
                          🔥 {leader.streak}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {leader.hours}h
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Info Banner */}
        <Card className="glass-card p-6 mt-8 border-2 border-primary/20 text-center">
          <Trophy className="w-12 h-12 text-warning mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">
            ¡Sigue Estudiando para Subir de Posición!
          </h3>
          <p className="text-muted-foreground">
            Los rankings se actualizan cada hora. Las mejores posiciones desbloquean badges especiales.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
