import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Brain, Clock, Heart, BookOpen, Trophy, Sparkles, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const questions = [
  {
    category: "Hábitos Actuales",
    icon: Clock,
    questions: [
      {
        id: 1,
        question: "¿Cuántas veces pospones estudiar en una semana?",
        type: "slider",
        min: 0,
        max: 10,
        unit: "veces"
      },
      {
        id: 2,
        question: "¿Cuándo estudias mejor?",
        type: "radio",
        options: ["Mañana (6am-12pm)", "Tarde (12pm-6pm)", "Noche (6pm-12am)", "Madrugada (12am-6am)"]
      },
      {
        id: 3,
        question: "¿Qué te distrae más? (puedes marcar varias)",
        type: "checkbox",
        options: ["TikTok", "WhatsApp", "YouTube", "Instagram", "Netflix", "Videojuegos", "Ruido ambiental"]
      },
      {
        id: 4,
        question: "¿Cuánto tiempo estudias sin parar normalmente?",
        type: "radio",
        options: ["Menos de 15 minutos", "15-30 minutos", "30-60 minutos", "Más de 60 minutos"]
      },
      {
        id: 5,
        question: "¿Con qué frecuencia cumples tu plan de estudio?",
        type: "slider",
        min: 0,
        max: 10,
        unit: "/10"
      }
    ]
  },
  {
    category: "Motivación y Miedos",
    icon: Heart,
    questions: [
      {
        id: 6,
        question: "¿Por qué crees que procrastinas?",
        type: "radio",
        options: [
          "Miedo a fracasar",
          "Perfeccionismo (espero el momento ideal)",
          "Me aburre la materia",
          "No sé por dónde empezar",
          "Baja autoestima académica"
        ]
      },
      {
        id: 7,
        question: "¿Qué tan urgente es mejorar tus notas?",
        type: "slider",
        min: 1,
        max: 10,
        unit: "/10"
      },
      {
        id: 8,
        question: "¿Qué te motiva realmente a estudiar?",
        type: "checkbox",
        options: ["Subir mis notas", "No decepcionar a mi familia", "Conseguir una beca", "Mi futuro profesional", "Competir con otros", "Orgullo personal"]
      }
    ]
  },
  {
    category: "Contexto Académico",
    icon: BookOpen,
    questions: [
      {
        id: 9,
        question: "¿Qué estudias?",
        type: "text",
        placeholder: "Ej: Ingeniería Industrial"
      },
      {
        id: 10,
        question: "¿Cuál es tu promedio actual?",
        type: "slider",
        min: 0,
        max: 20,
        unit: ""
      },
      {
        id: 11,
        question: "¿Qué promedio quieres alcanzar?",
        type: "slider",
        min: 0,
        max: 20,
        unit: ""
      },
      {
        id: 12,
        question: "¿Cuántos cursos estás llevando?",
        type: "slider",
        min: 1,
        max: 8,
        unit: "cursos"
      },
      {
        id: 13,
        question: "¿Tienes exámenes o trabajos importantes próximos?",
        type: "radio",
        options: ["Sí, en menos de 2 semanas", "Sí, en 2-4 semanas", "Sí, en más de un mes", "No tengo ahora"]
      }
    ]
  },
  {
    category: "Estilo de Aprendizaje",
    icon: Brain,
    questions: [
      {
        id: 14,
        question: "¿Cómo aprendes mejor?",
        type: "radio",
        options: ["Visual (diagramas, videos)", "Auditivo (explicaciones, podcasts)", "Kinestésico (práctica, experimentos)", "Lectoescritor (leer y escribir)"]
      },
      {
        id: 15,
        question: "¿Prefieres estudiar solo o en grupo?",
        type: "radio",
        options: ["Siempre solo", "Prefiero solo pero a veces grupo", "Me gusta en grupo", "Depende de la materia"]
      },
      {
        id: 16,
        question: "¿Qué técnicas de estudio usas? (marca todas las que apliquen)",
        type: "checkbox",
        options: ["Mapas mentales", "Resúmenes escritos", "Flashcards", "Explicar en voz alta", "Ninguna en particular"]
      }
    ]
  },
  {
    category: "Objetivos",
    icon: Trophy,
    questions: [
      {
        id: 17,
        question: "¿Qué quieres lograr este ciclo?",
        type: "radio",
        options: ["Aprobar todos los cursos", "Subir mi promedio", "Conseguir una beca", "Estar en el tercio superior", "Simplemente no jalarme"]
      },
      {
        id: 18,
        question: "¿Cuántas horas puedes estudiar al día realísticamente?",
        type: "slider",
        min: 1,
        max: 8,
        unit: "horas"
      },
      {
        id: 19,
        question: "Tu correo para enviarte los resultados",
        type: "email",
        placeholder: "tu@email.com"
      }
    ]
  }
];


const Diagnostico = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentCategory, setCurrentCategory] = useState(0);
  type AnswerValue = string | number | string[];
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [isLoading, setIsLoading] = useState(false);

  const totalCategories = questions.length;
  const totalQuestions = questions.reduce((acc, cat) => acc + cat.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  // Navegación entre categorías
  const handleCategoryChange = (idx: number) => {
    setCurrentCategory(idx);
  };

  // Guardar respuesta
  const handleAnswer = (qid: number, value: AnswerValue) => {
    const newAnswers = { ...answers, [qid]: value };
    setAnswers(newAnswers);
    import('@/lib/storage').then(({ saveDiagnosticAnswer }) => {
      saveDiagnosticAnswer(qid, value);
    });
  };

  // Validar que todas las preguntas de la categoría estén respondidas
  const isCategoryComplete = (catIdx: number) => {
    return questions[catIdx].questions.every(q => answers[q.id] !== undefined && answers[q.id] !== "");
  };

  // Siguiente categoría
  const handleNextCategory = () => {
    if (!isCategoryComplete(currentCategory)) {
      toast({
        title: "Completa todas las preguntas",
        description: "Responde todas las preguntas de esta sección antes de continuar.",
        variant: "destructive"
      });
      return;
    }
    if (currentCategory < totalCategories - 1) {
      setCurrentCategory(currentCategory + 1);
    } else {
      finishDiagnostic();
    }
  };

  // Categoría anterior
  const handlePrevCategory = () => {
    if (currentCategory > 0) setCurrentCategory(currentCategory - 1);
  };

  // Finalizar diagnóstico
  const finishDiagnostic = async () => {
    setIsLoading(true);
    await import('@/lib/storage').then(({ simulateAIAnalysis, saveUserProfile }) => {
      return simulateAIAnalysis(3500).then(() => {
        const rawEmail = answers[19];
        const email = typeof rawEmail === 'string' ? rawEmail : 'usuario@email.com';
        saveUserProfile({
          email,
          plan: 'Bronce',
          createdAt: new Date().toISOString()
        });
      });
    });
    navigate('/resultado');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="relative">
            <Brain className="w-24 h-24 text-primary animate-float mx-auto" />
            <Sparkles className="w-8 h-8 text-secondary absolute top-0 right-1/4 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold">Analizando con IA...</h2>
          <p className="text-muted-foreground">Estamos procesando tus respuestas para crear tu perfil personalizado</p>
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
        </motion.div>
      </div>
    );
  }

  // Renderizar preguntas de la categoría actual
  const category = questions[currentCategory];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Stepper de categorías */}
        <div className="flex gap-2 mb-8 justify-center">
          {questions.map((cat, idx) => (
            <Button
              key={cat.category}
              variant={idx === currentCategory ? "hero" : isCategoryComplete(idx) ? "secondary" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(idx)}
              className="flex items-center gap-2 px-3"
              disabled={idx > currentCategory + 1 || (idx > 0 && !isCategoryComplete(idx - 1))}
            >
              <cat.icon className="w-4 h-4" />
              {cat.category}
            </Button>
          ))}
        </div>

        <Progress value={progress} className="h-2 mb-8" />

        <Card className="glass-card p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
            <category.icon className="w-7 h-7 text-primary" />
            {category.category}
          </h2>
          <form className="space-y-8">
            {category.questions.map((q, idx) => (
              <div key={q.id} className="space-y-4">
                <Label className="text-lg font-semibold">{q.question}</Label>
                {q.type === "slider" && (
                  <div className="space-y-2">
                    <Slider
                      value={[
                        (() => {
                          const v = answers[q.id];
                          if (typeof v === 'number') return v;
                          if (typeof v === 'string') {
                            const parsed = parseFloat(v);
                            return isNaN(parsed) ? (q.min ?? 0) : parsed;
                          }
                          return q.min ?? 0;
                        })()
                      ]}
                      onValueChange={(value) => handleAnswer(q.id, value[0])}
                      min={q.min}
                      max={q.max}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-center">
                      <span className="text-2xl font-bold text-primary">
                        {(() => {
                          const v = answers[q.id];
                          if (typeof v === 'number') return v;
                          if (typeof v === 'string') {
                            const parsed = parseFloat(v);
                            return isNaN(parsed) ? (q.min ?? 0) : parsed;
                          }
                          return q.min ?? 0;
                        })()}
                      </span>
                      {q.unit && (
                        <span className="text-lg text-muted-foreground ml-2">{q.unit}</span>
                      )}
                    </div>
                  </div>
                )}
                {q.type === "radio" && (
                  <RadioGroup
                    value={(() => {
                      const v = answers[q.id];
                      if (typeof v === 'string') return v;
                      if (typeof v === 'number') return String(v);
                      return '';
                    })()}
                    onValueChange={(val) => handleAnswer(q.id, val)}
                  >
                    <div className="space-y-2">
                      {q.options?.map((option, i) => (
                        <div key={i} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                          <RadioGroupItem value={option} id={`option-${q.id}-${i}`} />
                          <Label htmlFor={`option-${q.id}-${i}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}
                {q.type === "checkbox" && (
                  <div className="space-y-2">
                    {q.options?.map((option, i) => {
                      const current = (answers[q.id] as string[] | undefined) || [];
                      return (
                        <div key={i} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                          <Checkbox
                            id={`check-${q.id}-${i}`}
                            checked={current.includes(option)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleAnswer(q.id, [...current, option]);
                              } else {
                                handleAnswer(q.id, current.filter((v) => v !== option));
                              }
                            }}
                          />
                          <Label htmlFor={`check-${q.id}-${i}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                )}
                {(q.type === "text" || q.type === "email") && (
                  <Input
                    type={q.type}
                    placeholder={q.placeholder}
                    value={answers[q.id] || ""}
                    onChange={(e) => handleAnswer(q.id, e.target.value)}
                    className="text-lg p-6"
                  />
                )}
              </div>
            ))}
          </form>
        </Card>

        {/* Navegación entre categorías */}
        <div className="flex gap-4 mt-8">
          <Button
            variant="ghost"
            size="lg"
            onClick={handlePrevCategory}
            disabled={currentCategory === 0}
            className="flex-1"
          >
            <ArrowLeft className="mr-2" />
            Anterior
          </Button>
          <Button
            variant="hero"
            size="lg"
            onClick={handleNextCategory}
            className="flex-1"
          >
            {currentCategory === totalCategories - 1 ? "Ver Resultados" : "Siguiente"}
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Diagnostico;
