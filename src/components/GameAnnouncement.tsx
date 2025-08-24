import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/gameStore";

export function GameAnnouncement() {
  const { status, showAnnouncement, setShowAnnouncement, currentPlayer } = useGameStore();

  useEffect(() => {
    if (showAnnouncement && status) {
      // Auto-close after 2 seconds
      const timer = setTimeout(() => {
        setShowAnnouncement(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showAnnouncement, status, setShowAnnouncement]);

  const getAnnouncementContent = () => {
    switch (status) {
      case 'idle':
        return { text: `🎮 Ready Player ${currentPlayer}`, variant: 'default' as const };
      case 'executing':
        return { text: '🔄 Executing Commands...', variant: 'default' as const };
      case 'hitWall':
        return { text: '💥 Collision!', variant: 'destructive' as const };
      default:
        return null;
    }
  };

  const content = getAnnouncementContent();

  if (!showAnnouncement || !content) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 flex items-center justify-center z-50 pointer-events-none",
        "transition-opacity duration-300 opacity-100"
      )}
      role="alert"
      aria-live="assertive"
    >
      <Badge 
        variant={content.variant}
        className={cn(
          "text-lg px-6 py-3 shadow-lg border-2",
          "animate-pulse",
          content.variant === 'destructive' 
            ? "bg-destructive text-destructive-foreground border-destructive-foreground/20" 
            : "bg-primary text-primary-foreground border-primary-foreground/20"
        )}
      >
        {content.text}
      </Badge>
    </div>
  );
}
