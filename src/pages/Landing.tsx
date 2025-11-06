import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Star,
  Zap,
  Award,
  Users,
  ArrowRight,
  Sparkles
} from "lucide-react";

const Landing = () => {
  const stats = [
    { value: "68%", label: "de estudiantes procrastinan" },
    { value: "+1.5", label: "puntos de mejora promedio" },
    { value: "10,000+", label: "horas de estudio completadas" },
  ];

  const steps = [
    {
      icon: Brain,
      title: "Diagnóstico IA (5 min)",
      description: "Identifica tu tipo de procrastinación con inteligencia artificial",
    },
    {
      icon: Target,
      title: "Plan Personalizado",
      description: "Sesiones de 2h adaptadas a tu estilo de aprendizaje",
    },
    {
      icon: TrendingUp,
      title: "Seguimiento Inteligente",
      description: "La IA aprende y mejora contigo en cada sesión",
    },
  ];

  const plans = [
    {
      name: "Bronce",
      
      badge: "",
      features: [
        "15 sesiones al mes",
        "Diagnóstico personalizado",
        "Timer Pomodoro básico",
        "Estadísticas semanales",
        "Soporte por email",
      ],
      notIncluded: ["IA adaptativa avanzada", "Integraciones", "Reportes mensuales"],
    },
    {
      name: "Plata",
     
      badge: "Más Popular",
      features: [
        "Sesiones ilimitadas",
        "IA adaptativa completa",
        "Timer Pomodoro avanzado",
        "Estadísticas en tiempo real",
        "Integración Google Calendar",
        "Soporte prioritario",
        "Reportes mensuales",
      ],
      notIncluded: [],
    },
    {
      name: "Oro",
      
      badge: "Mejor Valor",
      features: [
        "Todo de Plata +",
        "Coach IA personalizado",
        "Análisis predictivo",
        "Comunidad exclusiva",
        "Comparativa con pares",
        "Certificados de logros",
        "Soporte 24/7",
        "Llamadas 1-1 mensuales",
      ],
      notIncluded: [],
    },
  ];

  const testimonials = [
    {
      name: "María Torres",
      university: "PUCP",
      rating: 5,
      text: "Subí de 13.5 a 16.2 en un semestre. La IA realmente entiende cuándo estoy por procrastinar.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    },
    {
      name: "Carlos Mendoza",
      university: "UNI",
      rating: 5,
      text: "Dejé de posponer tareas difíciles. El timer y los checkpoints emocionales son lo mejor.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    {
      name: "Ana Quispe",
      university: "UNMSM",
      rating: 5,
      text: "Pasé de reprobar 3 cursos a aprobar todos con 15+. StudyFlow cambió mi vida académica.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
  ];

  return (
    <main role="main" aria-label="Landing" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
              <Badge className="mx-auto gradient-primary text-white border-0 px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
              Más de 10,000 estudiantes ya mejoraron sus notas
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Deja de Procrastinar.
              <br />
              <span className="text-gradient">Empieza a Aprobar.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              IA personalizada que convierte tu flojera en productividad.
              <br />
              Hecho para estudiantes peruanos.
            </p>
            
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/diagnostico" aria-label="Comenzar diagnóstico gratis">
                <Button variant="hero" size="xl" className="group" aria-label="Comenzar diagnóstico gratis">
                  Comenzar Diagnóstico Gratis
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </Link>
              <Button variant="glass" size="xl" asChild>
                <a href="#pricing" aria-label="Ver planes y precios">Ver Planes y Precios</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  <Card className="glass-card p-6 text-center hover:scale-105 transition-transform">
                    <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-secondary-foreground">Cómo Funciona</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              3 Pasos para Transformar tu Estudio
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="glass-card p-8 h-full hover:scale-105 transition-transform">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-glow">
            <step.icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <div className="text-2xl font-semibold mb-3 flex items-center gap-3">
                    <span className="text-primary">0{i + 1}</span>
                    {step.title}
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent text-accent-foreground">Planes y Precios</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Elige tu Plan de Éxito
            </h2>
            <p className="text-xl text-muted-foreground">
              Todos incluyen 14 días de garantía de devolución
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={i === 1 ? "md:scale-110 md:-mt-4" : ""}
              >
                <Card className={`glass-card p-8 h-full relative ${i === 1 ? "ring-2 ring-primary shadow-glow" : ""}`}>
                  {plan.badge && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-white border-0">
                      {plan.badge}
                    </Badge>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3 opacity-40">
                        <div className="w-5 h-5 flex-shrink-0 mt-0.5">✕</div>
                        <span className="text-sm line-through">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/diagnostico">
                    <Button 
                      variant={i === 1 ? "hero" : "default"} 
                      className="w-full"
                      size="lg"
                    >
                      Elegir Plan {plan.name}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-secondary-foreground">Testimonios</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Estudiantes que Ya Aprobaron
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass-card p-6 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      loading="lazy"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.university}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold">StudyFlow AI</span>
              </div>
              <p className="text-muted-foreground mb-4">
                La plataforma anti-procrastinación con IA para estudiantes peruanos.
              </p>
              <div className="text-sm text-muted-foreground">
                Hecho con ❤️ en Perú
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div><a href="#" className="hover:text-primary transition-colors">Términos de Servicio</a></div>
                <div><a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a></div>
                <div><a href="#" className="hover:text-primary transition-colors">Política de Cookies</a></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Contacto</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div><a href="#" className="hover:text-primary transition-colors">Instagram</a></div>
                <div><a href="#" className="hover:text-primary transition-colors">TikTok</a></div>
                <div><a href="#" className="hover:text-primary transition-colors">WhatsApp</a></div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 StudyFlow AI. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Landing;
