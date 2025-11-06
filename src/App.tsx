import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AchievementManager } from "@/components/AchievementPopup";
import Landing from "./pages/Landing";
import Diagnostico from "./pages/Diagnostico";
import Resultado from "./pages/Resultado";
import Dashboard from "./pages/Dashboard";
import Sesion from "./pages/Sesion";
import Progreso from "./pages/Progreso";
import Configuracion from "./pages/Configuracion";
import Leaderboard from "./pages/Leaderboard";
import EstudioIA from "./pages/EstudioIA";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AchievementManager />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/diagnostico" element={<Diagnostico />} />
          <Route path="/resultado" element={<Resultado />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sesion" element={<Sesion />} />
          <Route path="/progreso" element={<Progreso />} />
          <Route path="/configuracion" element={<Configuracion />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/estudio-ia" element={<EstudioIA />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
