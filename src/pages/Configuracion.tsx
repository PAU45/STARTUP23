import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  User,
  Settings,
  Link as LinkIcon,
  CreditCard,
  AlertTriangle,
  Clock,
  Bell,
  Calendar,
  Trophy,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Configuracion = () => {
  const { toast } = useToast();
  const [pomodoroDuration, setPomodoroDuration] = useState([25]);
  const [shortBreak, setShortBreak] = useState([5]);
  const [longBreak, setLongBreak] = useState([15]);
  
  const userData = {
    name: "María Torres",
    email: "maria.torres@uni.pe",
    university: "PUCP",
    career: "Ingeniería Industrial",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    plan: "Plata",
    sessionsUsed: "Ilimitadas",
  };

  const paymentHistory = [
    { date: "01 Nov 2025", amount: "S/ 69.90", status: "Pagado", plan: "Plata" },
    { date: "01 Oct 2025", amount: "S/ 69.90", status: "Pagado", plan: "Plata" },
    { date: "01 Sep 2025", amount: "S/ 34.90", status: "Pagado", plan: "Bronce" },
  ];

  const handleSaveProfile = () => {
    toast({
      title: "✓ Perfil actualizado",
      description: "Tus cambios se guardaron correctamente",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "✓ Preferencias guardadas",
      description: "Tu configuración de estudio se actualizó",
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Configuración</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="study">
              <Settings className="w-4 h-4 mr-2" />
              Estudio
            </TabsTrigger>
            <TabsTrigger value="integrations">
              <LinkIcon className="w-4 h-4 mr-2" />
              Integraciones
            </TabsTrigger>
            <TabsTrigger value="plan">
              <Trophy className="w-4 h-4 mr-2" />
              Mi Plan
            </TabsTrigger>
            <TabsTrigger value="danger">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Peligro
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">Información Personal</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback>MT</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">Cambiar Foto</Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG o GIF. Máximo 2MB.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label>Nombre Completo</Label>
                  <Input defaultValue={userData.name} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" defaultValue={userData.email} />
                </div>
                <div className="space-y-2">
                  <Label>Universidad</Label>
                  <Input defaultValue={userData.university} />
                </div>
                <div className="space-y-2">
                  <Label>Carrera</Label>
                  <Input defaultValue={userData.career} />
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="hero" onClick={handleSaveProfile}>
                  Guardar Cambios
                </Button>
                <Button variant="outline">Re-hacer Diagnóstico</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Study Preferences Tab */}
          <TabsContent value="study">
            <Card className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">Preferencias de Estudio</h2>

              <div className="space-y-8">
                {/* Pomodoro Duration */}
                <div>
                  <Label className="text-base mb-4 block">
                    Duración de Pomodoro de Enfoque
                  </Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={pomodoroDuration}
                      onValueChange={setPomodoroDuration}
                      min={15}
                      max={45}
                      step={5}
                      className="flex-1"
                    />
                    <div className="w-20 text-center">
                      <span className="text-2xl font-bold text-primary">
                        {pomodoroDuration[0]}
                      </span>
                      <span className="text-sm text-muted-foreground ml-1">min</span>
                    </div>
                  </div>
                </div>

                {/* Short Break */}
                <div>
                  <Label className="text-base mb-4 block">
                    Descanso Corto
                  </Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={shortBreak}
                      onValueChange={setShortBreak}
                      min={3}
                      max={10}
                      step={1}
                      className="flex-1"
                    />
                    <div className="w-20 text-center">
                      <span className="text-2xl font-bold text-secondary">
                        {shortBreak[0]}
                      </span>
                      <span className="text-sm text-muted-foreground ml-1">min</span>
                    </div>
                  </div>
                </div>

                {/* Long Break */}
                <div>
                  <Label className="text-base mb-4 block">
                    Descanso Largo
                  </Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={longBreak}
                      onValueChange={setLongBreak}
                      min={10}
                      max={30}
                      step={5}
                      className="flex-1"
                    />
                    <div className="w-20 text-center">
                      <span className="text-2xl font-bold text-accent">
                        {longBreak[0]}
                      </span>
                      <span className="text-sm text-muted-foreground ml-1">min</span>
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div className="pt-6 border-t border-border">
                  <Label className="text-base mb-4 block flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notificaciones
                  </Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Recordatorios por WhatsApp</div>
                        <div className="text-sm text-muted-foreground">
                          Te avisamos 10 min antes de tus sesiones
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Email semanal de resumen</div>
                        <div className="text-sm text-muted-foreground">
                          Recibe tu progreso cada domingo
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Push de sesiones agendadas</div>
                        <div className="text-sm text-muted-foreground">
                          Notificaciones en el navegador
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                {/* Study Schedule */}
                <div className="pt-6 border-t border-border">
                  <Label className="text-base mb-4 block flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Horario Preferido
                  </Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Hora de Inicio</Label>
                      <Input type="time" defaultValue="08:00" />
                    </div>
                    <div className="space-y-2">
                      <Label>Hora de Fin</Label>
                      <Input type="time" defaultValue="22:00" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button variant="hero" onClick={handleSavePreferences}>
                  Guardar Preferencias
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <div className="space-y-6">
              <Card className="glass-card p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Google Calendar</h3>
                      <p className="text-sm text-muted-foreground">
                        Sincroniza tus sesiones con tu calendario
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Conectar</Button>
                </div>
              </Card>

              <Card className="glass-card p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">WhatsApp</h3>
                      <p className="text-sm text-muted-foreground">
                        Recibe recordatorios y reportes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-accent/20 text-accent border-accent/20">
                      Conectado
                    </Badge>
                    <Button variant="ghost" size="sm">Desconectar</Button>
                  </div>
                </div>
              </Card>

              <Card className="glass-card p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Spotify</h3>
                      <p className="text-sm text-muted-foreground">
                        Música de concentración durante sesiones
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-accent/20 text-accent border-accent/20">
                      Conectado
                    </Badge>
                    <Button variant="ghost" size="sm">Desconectar</Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Plan Tab */}
          <TabsContent value="plan">
            <div className="space-y-6">
              <Card className="glass-card p-8 border-2 border-primary">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <Badge className="gradient-primary text-white border-0 mb-2">
                      Plan Actual
                    </Badge>
                    <h2 className="text-3xl font-bold">Plan {userData.plan}</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gradient">S/ 69.90</div>
                    <div className="text-sm text-muted-foreground">por mes</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold mb-1">∞</div>
                    <div className="text-sm text-muted-foreground">Sesiones</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold mb-1">79.5h</div>
                    <div className="text-sm text-muted-foreground">Este mes</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold mb-1">01 Dic</div>
                    <div className="text-sm text-muted-foreground">Próxima renovación</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="hero">Upgrade a Oro</Button>
                  <Button variant="outline">Cambiar Método de Pago</Button>
                </div>
              </Card>

              {/* Payment History */}
              <Card className="glass-card p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Historial de Pagos
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Monto</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((payment, i) => (
                      <TableRow key={i}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.plan}</TableCell>
                        <TableCell className="font-bold">{payment.amount}</TableCell>
                        <TableCell>
                          <Badge className="bg-accent/20 text-accent border-accent/20">
                            {payment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Payment Method */}
              <Card className="glass-card p-8">
                <h3 className="text-xl font-bold mb-4">Método de Pago</h3>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white font-bold text-xs">
                      VISA
                    </div>
                    <div>
                      <div className="font-medium">•••• 4242</div>
                      <div className="text-sm text-muted-foreground">Vence 12/26</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Editar</Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Danger Tab */}
          <TabsContent value="danger">
            <Card className="glass-card p-8 border-2 border-destructive/20">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    Pausar Suscripción
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Puedes pausar tu suscripción por 1-2 meses sin perder tu progreso.
                  </p>
                  <Button variant="outline">Pausar por 1 Mes</Button>
                </div>

                <div className="pt-8 border-t border-border">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-5 h-5" />
                    Cancelar Cuenta
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Esta acción es permanente. Perderás todo tu progreso, sesiones y datos.
                  </p>
                  <Button variant="destructive">Cancelar Cuenta Permanentemente</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Configuracion;
