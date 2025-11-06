// Sistema de almacenamiento temporal (localStorage) para simular base de datos

export interface UserProfile {
  name: string;
  email: string;
  university: string;
  career: string;
  currentAverage: number;
  targetAverage: number;
  plan: 'Bronce' | 'Plata' | 'Oro';
  createdAt: string;
}

export interface StudySession {
  id: string;
  subject: string;
  duration: number;
  startTime: string;
  endTime: string;
  pomodorosCompleted: number;
  mood: string;
  notes: string;
  completed: boolean;
}

export interface DiagnosticAnswer {
  questionId: number;
  answer: any;
  timestamp: string;
}

// User Profile
export const saveUserProfile = (profile: Partial<UserProfile>) => {
  const existing = getUserProfile();
  const updated = { ...existing, ...profile };
  localStorage.setItem('studyflow_user', JSON.stringify(updated));
};

export const getUserProfile = (): UserProfile | null => {
  const data = localStorage.getItem('studyflow_user');
  return data ? JSON.parse(data) : null;
};

// Diagnostic Answers - Guarda cada respuesta inmediatamente
export const saveDiagnosticAnswer = (questionId: number, answer: any) => {
  const answers = getDiagnosticAnswers();
  const newAnswer: DiagnosticAnswer = {
    questionId,
    answer,
    timestamp: new Date().toISOString()
  };
  
  const filtered = answers.filter(a => a.questionId !== questionId);
  filtered.push(newAnswer);
  
  localStorage.setItem('studyflow_diagnostic', JSON.stringify(filtered));
};

export const getDiagnosticAnswers = (): DiagnosticAnswer[] => {
  const data = localStorage.getItem('studyflow_diagnostic');
  return data ? JSON.parse(data) : [];
};

export const clearDiagnostic = () => {
  localStorage.removeItem('studyflow_diagnostic');
};

// Study Sessions
export const saveSession = (session: StudySession) => {
  const sessions = getSessions();
  sessions.push(session);
  localStorage.setItem('studyflow_sessions', JSON.stringify(sessions));
};

export const getSessions = (): StudySession[] => {
  const data = localStorage.getItem('studyflow_sessions');
  return data ? JSON.parse(data) : [];
};

// Statistics (calculadas en tiempo real)
export const getStats = () => {
  const sessions = getSessions();
  const completedSessions = sessions.filter(s => s.completed);
  
  const totalHours = completedSessions.reduce((acc, s) => acc + s.duration / 3600, 0);
  const thisWeekSessions = completedSessions.filter(s => {
    const sessionDate = new Date(s.startTime);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return sessionDate > weekAgo;
  });
  
  const streak = calculateStreak(completedSessions);
  
  return {
    totalSessions: completedSessions.length,
    totalHours: totalHours.toFixed(1),
    sessionsThisWeek: thisWeekSessions.length,
    streak,
  };
};

const calculateStreak = (sessions: StudySession[]): number => {
  if (sessions.length === 0) return 0;
  
  const dates = sessions
    .map(s => new Date(s.startTime).toDateString())
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  let streak = 0;
  let checkDate = new Date();
  
  for (let i = 0; i < dates.length; i++) {
    const sessionDate = new Date(dates[i]);
    const diffDays = Math.floor((checkDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === streak) {
      streak++;
      checkDate = sessionDate;
    } else {
      break;
    }
  }
  
  return streak;
};

// Achievements
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export const checkAndUnlockAchievements = (): Achievement[] => {
  const stats = getStats();
  const achievements: Achievement[] = [];
  const unlocked = getUnlockedAchievements();
  
  if (stats.totalSessions >= 1 && !unlocked.find(a => a.id === 'first_session')) {
    achievements.push({
      id: 'first_session',
      name: 'Primera Sesión',
      description: 'Completaste tu primera sesión de estudio',
      icon: '🎯',
      unlockedAt: new Date().toISOString()
    });
  }
  
  if (stats.totalSessions >= 10 && !unlocked.find(a => a.id === 'ten_sessions')) {
    achievements.push({
      id: 'ten_sessions',
      name: '10 Sesiones Sin Fallar',
      description: 'Completaste 10 sesiones de estudio',
      icon: '🏆',
      unlockedAt: new Date().toISOString()
    });
  }
  
  if (stats.streak >= 7 && !unlocked.find(a => a.id === 'week_streak')) {
    achievements.push({
      id: 'week_streak',
      name: 'Racha de 7 Días',
      description: 'Estudiaste 7 días seguidos',
      icon: '🔥',
      unlockedAt: new Date().toISOString()
    });
  }
  
  if (achievements.length > 0) {
    const allUnlocked = [...unlocked, ...achievements];
    localStorage.setItem('studyflow_achievements', JSON.stringify(allUnlocked));
  }
  
  return achievements;
};

export const getUnlockedAchievements = (): Achievement[] => {
  const data = localStorage.getItem('studyflow_achievements');
  return data ? JSON.parse(data) : [];
};

// AI Tips Generation (simula IA)
export const generateAITip = (): string => {
  const tips = [
    "💡 La técnica Pomodoro funciona porque tu cerebro necesita descansos para consolidar información",
    "⚡ Estudiar a la misma hora cada día crea un hábito automático. Tu cerebro se prepara solo",
    "🎯 Empieza siempre con la tarea más difícil. Tu fuerza de voluntad es más alta en la mañana",
    "🧠 Hacer resúmenes en voz alta activa más áreas del cerebro que solo leer",
    "⏰ Los descansos de 5 minutos son ideales. Más cortos no descansas, más largos pierdes el momentum",
    "📱 Pon tu celular en modo avión durante sesiones. Las notificaciones rompen tu concentración por 25 minutos",
    "☕ La cafeína tarda 20 minutos en hacer efecto. Tómala antes de estudiar, no durante",
    "🎵 Música sin letra (lofi, clásica) mejora el enfoque. La música con letra distrae",
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
};

// Simular análisis de IA con delay
export const simulateAIAnalysis = async (duration: number = 2000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, duration));
};
