import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import type { Achievement } from "@/lib/storage";

export const AchievementPopup = ({ achievement, onClose }: { achievement: Achievement; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 max-w-sm"
    >
      <Card className="glass-card p-6 border-2 border-warning shadow-glow">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-start gap-4">
          <div className="text-5xl animate-bounce">{achievement.icon}</div>
          <div className="flex-1">
            <div className="text-sm text-warning font-semibold mb-1">¡Logro Desbloqueado!</div>
            <div className="font-bold text-lg mb-1">{achievement.name}</div>
            <div className="text-sm text-muted-foreground">{achievement.description}</div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export const AchievementManager = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const checkAchievements = async () => {
      const { checkAndUnlockAchievements } = await import('@/lib/storage');
      const newAchievements = checkAndUnlockAchievements();
      if (newAchievements.length > 0) {
        setAchievements(prev => [...prev, ...newAchievements]);
      }
    };

    checkAchievements();
    const interval = setInterval(checkAchievements, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {achievements.map((achievement, i) => (
        <AchievementPopup
          key={achievement.id}
          achievement={achievement}
          onClose={() => setAchievements(prev => prev.filter((_, idx) => idx !== i))}
        />
      ))}
    </AnimatePresence>
  );
};
