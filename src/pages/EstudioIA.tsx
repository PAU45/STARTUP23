import { useState, Suspense } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { generateStudyPlan } from "@/lib/ai";
import type { StudyPlan } from "@/lib/ai";
import { Brain, Sparkles, Loader2, Lightbulb, BookCheck, Video, Info, Calendar, Star } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const EstudioIA = () => {
  const [topic, setTopic] = useState("");
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (suggestedTopic: string = "") => {
    const topicToGenerate = suggestedTopic || topic;
    if (!topicToGenerate) return;

    setIsLoading(true);
    setStudyPlan(null);
    const plan = await generateStudyPlan(topicToGenerate);
    setStudyPlan(plan);
    setIsLoading(false);
  };

  const suggestedTopics = ["Historia del Perú", "Arquitectura Romana"];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 gradient-primary text-white border-0">
            <Sparkles className="w-4 h-4 mr-2" />
            Asistente de Estudio IA
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tu Guía de Estudio Personalizada
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escribe un tema o elige una sugerencia. La IA creará un plan completo para que domines cualquier materia.
          </p>
        </motion.div>

        {/* Input Section */}
        <Card className="glass-card p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="Ej: La Primera Guerra Mundial, Integrales por partes..."
              className="text-lg flex-1"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <Button
              variant="hero"
              size="lg"
              onClick={() => handleGenerate()}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  Generar Plan
                </>
              )}
            </Button>
          </div>
          <div className="mt-4 flex gap-2 justify-center">
            <span className="text-sm text-muted-foreground">Sugerencias:</span>
            {suggestedTopics.map(t => (
              <Button key={t} variant="link" size="sm" className="p-0 h-auto" onClick={() => handleGenerate(t)}>
                {t}
              </Button>
            ))}
          </div>
        </Card>

        {/* Study Plan Display */}
        <Suspense fallback={<div>Cargando...</div>}>
          {studyPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="glass-card p-8">
                <h2 className="text-3xl font-bold mb-6 border-b pb-4">
                  Plan de Estudio para: <span className="text-gradient">{studyPlan.topic}</span>
                </h2>

                <Tabs defaultValue="summary" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="summary">
                      <Info className="w-4 h-4 mr-2" /> Resumen
                    </TabsTrigger>
                    <TabsTrigger value="schedule">
                      <Calendar className="w-4 h-4 mr-2" /> Plan Semanal
                    </TabsTrigger>
                    <TabsTrigger value="extra">
                      <Star className="w-4 h-4 mr-2" /> Extras
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="summary">
                    <div className="space-y-8">
                      {/* Summary */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                          <Info className="w-6 h-6 text-secondary" />
                          Resumen del Tema
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">{studyPlan.summary}</p>
                      </div>

                      {/* Key Concepts (bloques explicativos) */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                          <Lightbulb className="w-6 h-6 text-primary" />
                          Conceptos Clave Explicados
                        </h3>
                        <div className="space-y-6">
                          {studyPlan.keyConcepts.map((concept, i) => (
                            <div key={i} className="p-4 bg-muted/40 rounded-lg border-l-4 border-primary">
                              <div className="prose prose-neutral max-w-none text-base">
                                <ReactMarkdown>{concept}</ReactMarkdown>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="schedule">
                    <div className="space-y-8">
                      {/* Schedule */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                          <Calendar className="w-6 h-6 text-secondary" />
                          Plan de Estudio Sugerido
                        </h3>
                        <div className="space-y-4">
                          {studyPlan.schedule.map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                              <Badge className="font-bold">{item.day}</Badge>
                              <p>{item.task}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Videos */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                          <Video className="w-6 h-6 text-destructive" />
                          Videos Recomendados
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {studyPlan.videos.map((video, i) => (
                            <a key={i} href={video.url} target="_blank" rel="noopener noreferrer">
                              <Card className="p-4 hover:bg-muted/50 transition-colors">
                                <p className="font-semibold truncate">{video.title}</p>
                                <span className="text-xs text-blue-500">Ver en YouTube</span>
                              </Card>
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Reading Materials */}
                      {studyPlan.readingMaterials && studyPlan.readingMaterials.length > 0 && (
                        <div>
                          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <BookCheck className="w-6 h-6 text-green-600" />
                            Material de Lectura y PDFs
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {studyPlan.readingMaterials.map((material, i) => (
                              <a key={i} href={material.url} target="_blank" rel="noopener noreferrer">
                                <Card className="p-4 hover:bg-muted/50 transition-colors border-l-4 border-green-500">
                                  <p className="font-semibold truncate">{material.title}</p>
                                  <span className="text-xs text-green-600">Abrir recurso</span>
                                </Card>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="extra">
                    <div className="space-y-8">
                      {/* Exercises */}
                      <div>
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                          <BookCheck className="w-6 h-6 text-accent" />
                          Ejercicios Prácticos
                        </h3>
                        <div className="space-y-6">
                          {studyPlan.exercises.map((ex, i) => (
                            <ExerciseCard key={i} question={ex.question} answer={ex.answer} />
                          ))}
                        </div>
                      </div>

                      {/* Tips and Fun Facts */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-xl font-bold mb-3">Consejos Pro</h3>
                          <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
                            {studyPlan.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-3">Datos Curiosos</h3>
                          <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
                            {studyPlan.funFacts.map((fact, i) => <li key={i}>{fact}</li>)}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </motion.div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

const ExerciseCard = ({ question, answer }: { question: string; answer: string }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <Card className="p-4 bg-muted/30">
      <p className="font-semibold mb-4">{question}</p>
      {showAnswer && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-4 bg-background rounded-lg border"
        >
          <p className="text-sm text-muted-foreground">{answer}</p>
        </motion.div>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowAnswer(!showAnswer)}
        className="mt-4"
      >
        {showAnswer ? "Ocultar Respuesta" : "Mostrar Respuesta"}
      </Button>
    </Card>
  );
};

export default EstudioIA;
