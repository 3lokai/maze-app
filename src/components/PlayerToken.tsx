import type { PlayerId } from '@/types/maze-app';
import { cn } from "@/lib/utils";

interface PlayerTokenProps {
  player: PlayerId;
  isCurrentPlayer?: boolean;
  className?: string;
}

export function PlayerToken({ player, isCurrentPlayer = false, className = "" }: PlayerTokenProps) {
  const playerData = {
    1: {
      color: "token-emerald",
      emoji: "🐢",
      label: "P1"
    },
    2: {
      color: "token-indigo",
      emoji: "🦊", 
      label: "P2"
    },
  };

  const currentPlayerData = playerData[player];

  return (
    <div
      className={cn(
        "w-8 h-8 flex items-center justify-center",
        "text-lg transition-all duration-300 ease-in-out",
        isCurrentPlayer && "scale-110",
        className
      )}
      title={`Player ${player}${isCurrentPlayer ? ' (Current)' : ''}`}
    >
      <span>{currentPlayerData.emoji}</span>
    </div>
  );
}
