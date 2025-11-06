import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  SkipForward, 
  X, 
  Sparkles,
  Music,
  StickyNote,
  CheckSquare,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { saveSession } from "@/lib/storage";
import type { StudySession } from "@/lib/storage";

const Sesion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const [startTime] = useState(() => new Date().toISOString());
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [phase, setPhase] = useState<'focus' | 'short-break' | 'long-break'>('focus');
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [notes, setNotes] = useState("");
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Repasar teoría", completed: false },
    { id: 2, text: "Resolver ejercicios", completed: false },
    { id: 3, text: "Hacer resumen", completed: false },
  ]);
  const [showMoodCheck, setShowMoodCheck] = useState(false);
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [selectedMood, setSelectedMood] = useState("");
  const [achievementGoal, setAchievementGoal] = useState<'yes' | 'partial' | 'no'>('yes');

  const subject = (location.state as any)?.subject || "Cálculo 2 - Integrales";
  const totalDuration = 120 * 60; // 2 hours
  const elapsed = totalDuration - timeLeft;
  const progressPercent = (elapsed / totalDuration) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handlePhaseComplete();
            return getNextPhaseTime();
          }
          return prev - 1;
        });
        // Incrementar tiempo total transcurrido
        setTotalElapsed(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // Emotional checkpoint every 15 minutes
  useEffect(() => {
    if (isRunning && elapsed > 0 && elapsed % (15 * 60) === 0) {
      setShowMoodCheck(true);
      setIsRunning(false);
    }
  }, [elapsed]);

  const getNextPhaseTime = () => {
    if (phase === 'focus') {
      const newCount = pomodoroCount + 1;
      setPomodoroCount(newCount);
      if (newCount % 4 === 0) {
        setPhase('long-break');
        return 15 * 60;
      } else {
        setPhase('short-break');
        return 5 * 60;
      }
    } else {
      setPhase('focus');
      return 25 * 60;
    }
  };

  const handlePhaseComplete = () => {
    toast({
      title: phase === 'focus' ? "🎉 ¡Pomodoro Completado!" : "✓ Descanso Terminado",
      description: phase === 'focus' ? "Tiempo de descansar" : "Volvamos a enfocarnos",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSkip = () => {
    setTimeLeft(1);
  };

  const handleQuit = () => {
    setShowQuitDialog(true);
  };

  const confirmQuit = () => {
    navigate('/dashboard');
  };

  const handleFinish = () => {
    setShowCompletionDialog(true);
  };

  const saveAndFinish = () => {
    // Guardar sesión completa en localStorage
    const session: StudySession = {
      id: sessionId,
      subject,
      duration: totalElapsed,
      startTime,
      endTime: new Date().toISOString(),
      pomodorosCompleted: pomodoroCount,
      mood: selectedMood,
      notes,
      completed: achievementGoal !== 'no',
    };
    
    saveSession(session);
    
    toast({
      title: "🎉 Sesión Guardada",
      description: "Tu progreso se guardó correctamente",
    });
    
    navigate('/progreso');
  };

  const phaseConfig = {
    focus: { color: 'text-accent', label: 'Enfoque', bg: 'bg-accent/20' },
    'short-break': { color: 'text-warning', label: 'Descanso Corto', bg: 'bg-warning/20' },
    'long-break': { color: 'text-secondary', label: 'Descanso Largo', bg: 'bg-secondary/20' },
  };

  const moods = [
    { emoji: "😫", label: "Muy mal" },
    { emoji: "😐", label: "Normal" },
    { emoji: "🙂", label: "Bien" },
    { emoji: "😊", label: "Muy bien" },
    { emoji: "🔥", label: "¡Genial!" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Badge className={`${phaseConfig[phase].bg} ${phaseConfig[phase].color} border-0 mb-2`}>
              {phaseConfig[phase].label}
            </Badge>
            <h1 className="text-2xl md:text-3xl font-bold">{subject}</h1>
          </div>
          <Button variant="ghost" onClick={handleQuit}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <Card className="glass-card p-4 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Progreso de la Sesión</span>
            <span className="text-sm font-semibold">{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Timer - Center */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center min-h-[400px]"
            >
              <Card className="glass-card p-12 text-center">
                <div className="relative">
                  {/* Circular Progress */}
                  <svg className="w-64 h-64 mx-auto mb-8" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="8"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 90}`}
                      strokeDashoffset={`${2 * Math.PI * 90 * (1 - (phase === 'focus' ? timeLeft / (25 * 60) : timeLeft / (5 * 60)))}`}
                      strokeLinecap="round"
                      transform="rotate(-90 100 100)"
                      className="transition-all duration-1000"
                    />
                    <text
                      x="100"
                      y="100"
                      textAnchor="middle"
                      dy=".3em"
                      className="text-5xl font-bold fill-foreground"
                    >
                      {formatTime(timeLeft)}
                    </text>
                  </svg>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={() => setIsRunning(!isRunning)}
                  >
                    {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <Button variant="outline" size="lg" onClick={handleSkip}>
                    <SkipForward className="w-5 h-5" />
                  </Button>
                  <Button variant="destructive" size="lg" onClick={handleFinish}>
                    Terminar
                  </Button>
                </div>

                <div className="mt-6 text-muted-foreground">
                  Pomodoros completados: <span className="font-bold text-foreground">{pomodoroCount}</span>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notes */}
            <Card className="glass-card p-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-warning" />
                Notas Rápidas
              </h3>
              <Textarea
                placeholder="Anota lo que vas aprendiendo..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </Card>

            {/* Checklist */}
            <Card className="glass-card p-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-accent" />
                Temas a Cubrir
              </h3>
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <Checkbox
                      id={`task-${item.id}`}
                      checked={item.completed}
                      onCheckedChange={(checked) => {
                        setChecklist(checklist.map(c => 
                          c.id === item.id ? { ...c, completed: checked as boolean } : c
                        ));
                      }}
                    />
                    <Label
                      htmlFor={`task-${item.id}`}
                      className={`flex-1 ${item.completed ? 'line-through text-muted-foreground' : ''}`}
                    >
                      {item.text}
                    </Label>
                  </div>
                ))}
              </div>
            </Card>

            {/* Music */}
            <Card className="glass-card p-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Music className="w-4 h-4 text-secondary" />
                Música Focus
              </h3>
              <Button variant="outline" className="w-full">
                Activar Spotify
              </Button>
            </Card>
          </div>
        </div>

        {/* Motivational Messages */}
        <AnimatePresence>
          {isRunning && Math.floor(timeLeft / 60) === 10 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed bottom-8 right-8 max-w-sm"
            >
              <Card className="glass-card p-4 border-2 border-primary shadow-glow">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="text-sm">
                    <strong>💪 Vas genial!</strong> Ya completaste 40% de este Pomodoro
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mood Check Dialog */}
        <Dialog open={showMoodCheck} onOpenChange={setShowMoodCheck}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Checkpoint Emocional</DialogTitle>
              <DialogDescription>
                ¿Cómo te sientes ahora?
              </DialogDescription>
            </DialogHeader>
              <div className="grid grid-cols-5 gap-4 py-4">
              {moods.map((mood) => (
                <Button
                  key={mood.emoji}
                  variant="outline"
                  className="flex flex-col gap-2 h-auto py-4"
                  onClick={() => {
                    setSelectedMood(mood.label);
                    setShowMoodCheck(false);
                    setIsRunning(true);
                    toast({ title: "¡Perfecto! Sigamos adelante" });
                  }}
                >
                  <span className="text-3xl">{mood.emoji}</span>
                  <span className="text-xs">{mood.label}</span>
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Quit Dialog */}
        <Dialog open={showQuitDialog} onOpenChange={setShowQuitDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                ¿Seguro que quieres abandonar?
              </DialogTitle>
              <DialogDescription>
                Ya llevas {Math.round(progressPercent)}% de la sesión. ¿Dale 5 minutos más?
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowQuitDialog(false)}>
                Dale 5 minutos más
              </Button>
              <Button variant="destructive" onClick={confirmQuit}>
                Abandonar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Completion Dialog */}
        <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl">🎉 ¡Sesión Completada!</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {Math.floor(totalElapsed / 3600)}h {Math.floor((totalElapsed % 3600) / 60)}min
                  </div>
                  <div className="text-xs text-muted-foreground">Tiempo efectivo</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-secondary mb-1">{pomodoroCount}</div>
                  <div className="text-xs text-muted-foreground">Pomodoros</div>
                </Card>
              </div>
              <div>
                <Label>¿Lograste tus objetivos?</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button 
                    variant={achievementGoal === 'no' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setAchievementGoal('no')}
                  >
                    No
                  </Button>
                  <Button 
                    variant={achievementGoal === 'partial' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setAchievementGoal('partial')}
                  >
                    Parcial
                  </Button>
                  <Button 
                    variant={achievementGoal === 'yes' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setAchievementGoal('yes')}
                  >
                    Sí
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>¿Qué aprendiste hoy? (opcional)</Label>
                <Textarea
                  placeholder="Ej: Entendí cómo resolver integrales por partes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
              <Button variant="hero" className="w-full" onClick={saveAndFinish}>
                Guardar y Ver Progreso
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Sesion;
