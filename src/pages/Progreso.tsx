import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { Suspense } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from '@/lib/lazyRecharts';
import {
  TrendingUp,
  Download,
  Award,
  Target,
  Flame,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

const Progreso = () => {
  const [timeRange, setTimeRange] = useState("month");

  // Mock data
  const dailyHours = [
    { date: "1 Nov", hours: 2.5, goal: 3 },
    { date: "2 Nov", hours: 3.2, goal: 3 },
    { date: "3 Nov", hours: 1.8, goal: 3 },
    { date: "4 Nov", hours: 4.1, goal: 3 },
    { date: "5 Nov", hours: 3.5, goal: 3 },
    { date: "6 Nov", hours: 2.9, goal: 3 },
    { date: "7 Nov", hours: 3.8, goal: 3 },
  ];

  const subjectSessions = [
    { subject: "Cálculo 2", sessions: 24, percentage: 35, color: "hsl(var(--primary))" },
    { subject: "Física 1", sessions: 18, percentage: 26, color: "hsl(var(--secondary))" },
    { subject: "Programación", sessions: 15, percentage: 22, color: "hsl(var(--accent))" },
    { subject: "Química", sessions: 8, percentage: 12, color: "hsl(var(--warning))" },
    { subject: "Inglés", sessions: 4, percentage: 5, color: "hsl(var(--muted-foreground))" },
  ];

  const sessionHistory = [
    {
      date: "06 Nov 2025",
      subject: "Cálculo 2",
      duration: "1h 45min",
      technique: "Pomodoro 25-5",
      result: "completed",
    },
    {
      date: "06 Nov 2025",
      subject: "Física 1",
      duration: "2h 00min",
      technique: "Pomodoro 50-10",
      result: "completed",
    },
    {
      date: "05 Nov 2025",
      subject: "Programación",
      duration: "1h 20min",
      technique: "Pomodoro 25-5",
      result: "partial",
    },
    {
      date: "05 Nov 2025",
      subject: "Inglés",
      duration: "0h 45min",
      technique: "Pomodoro 25-5",
      result: "cancelled",
    },
  ];

  const heatmapData = Array.from({ length: 7 }, (_, week) =>
    Array.from({ length: 10 }, (_, day) => ({
      week,
      day,
      hours: Math.random() * 4,
    }))
  ).flat();

  const getIntensityColor = (hours: number) => {
    if (hours === 0) return "bg-muted";
    if (hours < 1) return "bg-primary/20";
    if (hours < 2) return "bg-primary/40";
    if (hours < 3) return "bg-primary/60";
    return "bg-primary";
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Mi Progreso</h1>
            <p className="text-muted-foreground">Análisis detallado de tu rendimiento</p>
          </div>
          <div className="flex gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Última semana</SelectItem>
                <SelectItem value="month">Último mes</SelectItem>
                <SelectItem value="semester">Semestre</SelectItem>
                <SelectItem value="all">Todo el tiempo</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Horas</span>
            </div>
            <div className="text-3xl font-bold">79.5h</div>
            <div className="text-xs text-accent mt-1">+15% vs mes pasado</div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-secondary" />
              <span className="text-sm text-muted-foreground">Sesiones</span>
            </div>
            <div className="text-3xl font-bold">47</div>
            <div className="text-xs text-accent mt-1">+8 esta semana</div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-5 h-5 text-warning" />
              <span className="text-sm text-muted-foreground">Racha Máxima</span>
            </div>
            <div className="text-3xl font-bold">12 días</div>
            <div className="text-xs text-muted-foreground mt-1">Récord personal</div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">Mejora</span>
            </div>
            <div className="text-3xl font-bold">+23%</div>
            <div className="text-xs text-muted-foreground mt-1">vs mes pasado</div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Hours Chart */}
          <Card className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4">Horas de Estudio Diarias</h3>
            <Suspense fallback={<div className="h-72 animate-pulse" />}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyHours}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorHours)"
                  />
                  <Area
                    type="monotone"
                    dataKey="goal"
                    stroke="hsl(var(--muted-foreground))"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    fill="none"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Suspense>
          </Card>

          {/* Sessions by Subject */}
          <Card className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4">Sesiones por Materia</h3>
            <Suspense fallback={<div className="h-72 animate-pulse" />}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectSessions} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis type="category" dataKey="subject" stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="sessions" radius={[0, 8, 8, 0]}>
                    {subjectSessions.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Suspense>
          </Card>
        </div>

        {/* Heatmap Calendar */}
        <Card className="glass-card p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Calendario de Actividad</h3>
          <div className="flex gap-1 flex-wrap">
            {heatmapData.map((day, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded ${getIntensityColor(day.hours)} hover:scale-110 transition-transform cursor-pointer`}
                title={`${day.hours.toFixed(1)}h`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <span>Menos</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded bg-muted" />
              <div className="w-4 h-4 rounded bg-primary/20" />
              <div className="w-4 h-4 rounded bg-primary/40" />
              <div className="w-4 h-4 rounded bg-primary/60" />
              <div className="w-4 h-4 rounded bg-primary" />
            </div>
            <span>Más</span>
          </div>
        </Card>

        {/* Level Gauge */}
        <Card className="glass-card p-8 mb-8 text-center">
          <h3 className="text-2xl font-bold mb-6">Nivel Anti-Procrastinación</h3>
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-64 h-32" viewBox="0 0 200 100">
              <path
                d="M 20 80 A 80 80 0 0 1 180 80"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 20 80 A 80 80 0 0 1 180 80"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="251"
                strokeDashoffset={251 - (251 * 67) / 100}
              />
              <defs>
                <linearGradient id="gaugeGradient">
                  <stop offset="0%" stopColor="hsl(var(--destructive))" />
                  <stop offset="50%" stopColor="hsl(var(--warning))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-0">
              <div className="text-5xl font-bold text-gradient">67</div>
              <div className="text-sm text-muted-foreground">Nivel</div>
            </div>
          </div>
          <div className="mt-6">
            <Badge className="gradient-primary text-white border-0 text-lg px-6 py-2">
              <Award className="w-5 h-5 mr-2" />
              Guerrero en Progreso
            </Badge>
          </div>
          <p className="text-muted-foreground mt-4">
            Has mejorado <strong className="text-accent">23%</strong> vs el mes pasado
          </p>
        </Card>

        {/* Session History Table */}
        <Card className="glass-card p-6">
          <h3 className="text-xl font-bold mb-4">Historial de Sesiones</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Materia</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Técnica</TableHead>
                  <TableHead>Resultado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessionHistory.map((session, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{session.date}</TableCell>
                    <TableCell>{session.subject}</TableCell>
                    <TableCell>{session.duration}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{session.technique}</Badge>
                    </TableCell>
                    <TableCell>
                      {session.result === "completed" && (
                        <Badge className="bg-accent/20 text-accent border-accent/20">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completado
                        </Badge>
                      )}
                      {session.result === "partial" && (
                        <Badge className="bg-warning/20 text-warning border-warning/20">
                          Parcial
                        </Badge>
                      )}
                      {session.result === "cancelled" && (
                        <Badge className="bg-destructive/20 text-destructive border-destructive/20">
                          <XCircle className="w-3 h-3 mr-1" />
                          Cancelado
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Community Comparison (Plan Oro) */}
        <Card className="glass-card p-8 mt-8 border-2 border-warning/20">
          <div className="flex items-start gap-4">
            <Award className="w-8 h-8 text-warning flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Comparativa con la Comunidad</h3>
              <p className="text-muted-foreground mb-4">
                Estás en el <strong className="text-warning">top 15%</strong> de usuarios Plan Oro
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Promedio Comunidad</div>
                  <div className="text-2xl font-bold">12h/semana</div>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-sm text-muted-foreground mb-1">Tu Promedio</div>
                  <div className="text-2xl font-bold text-primary">18.5h/semana</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Progreso;
