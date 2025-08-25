import type { PlayerId } from '@/types/maze-app';
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/gameStore";

interface PlayerTokenProps {
  player: PlayerId;
  isCurrentPlayer?: boolean;
  className?: string;
}

export function PlayerToken({ player, isCurrentPlayer = false, className = "" }: PlayerTokenProps) {
  const { playerConfigs } = useGameStore();
  const config = playerConfigs[player];
  
  // Fallback emoji if config is not available
  const emoji = config?.emoji || '🐢';
  const playerName = config?.name || `Player ${player}`;

  return (
    <div
      className={cn(
        "w-8 h-8 flex items-center justify-center",
        "text-lg transition-all duration-300 ease-in-out",
        isCurrentPlayer && "scale-110",
        className
      )}
      title={`${playerName}${isCurrentPlayer ? ' (Current)' : ''}`}
    >
      <span>{emoji}</span>
    </div>
  );
}
