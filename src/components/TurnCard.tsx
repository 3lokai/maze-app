import { Badge } from "@/components/ui/badge";
import type { PlayerId } from '@/types/maze-app';
import { cn } from "@/lib/utils";

interface TurnCardProps {
  currentPlayer: PlayerId;
  wins: Record<PlayerId, number>;
  status?: string;
}

export function TurnCard({ currentPlayer, wins, status }: TurnCardProps) {
  const playerData = {
    1: {
      color: "player-badge-p1",
      label: "Player 1",
      emoji: "🐢",
      glowColor: "shadow-primary/50",
      ariaLabel: "Turtle token"
    },
    2: {
      color: "player-badge-p2",
      label: "Player 2", 
      emoji: "🦊",
      glowColor: "shadow-secondary/50",
      ariaLabel: "Fox token"
    },
  };

  const getStatusText = () => {
    switch (status) {
      case 'executing':
        return '🔄 Executing...';
      case 'hitWall':
        return '💥 Collision!';
      case 'reachedGoal':
        return '🎯 Goal Reached!';
      default:
        return '🎮 Your Turn';
    }
  };

  const getAriaStatusText = () => {
    switch (status) {
      case 'executing':
        return `${playerData[currentPlayer].label} is executing commands`;
      case 'hitWall':
        return `${playerData[currentPlayer].label} hit a wall`;
      case 'reachedGoal':
        return `${playerData[currentPlayer].label} reached the goal`;
      default:
        return `${playerData[currentPlayer].label}'s turn`;
    }
  };

  const currentPlayerData = playerData[currentPlayer];

  return (
    <div 
      className="text-center space-y-3"
      role="status"
      aria-live="polite"
      aria-label={`Turn status: ${getAriaStatusText()}`}
    >
      <div className="space-y-2">
        <Badge 
          className={cn(
            "text-lg px-4 py-2 transition-all duration-300",
            currentPlayerData.color,
            currentPlayerData.glowColor,
            "animate-pulse shadow-lg"
          )}
          aria-label={`${currentPlayerData.label} token, ${currentPlayerData.ariaLabel}`}
        >
          <span className="mr-2" aria-hidden="true">{currentPlayerData.emoji}</span>
          {currentPlayerData.label}
        </Badge>
        <div className="text-sm font-medium text-foreground">
          {getStatusText()}
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        <span aria-label={`Wins: ${playerData[1].label} ${wins[1]}, ${playerData[2].label} ${wins[2]}`}>
          🏆 Wins: {playerData[1].emoji} {wins[1]} · {playerData[2].emoji} {wins[2]}
        </span>
      </div>
    </div>
  );
}
