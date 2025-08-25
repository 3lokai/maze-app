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
        "w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center",
        "text-xl sm:text-2xl transition-all duration-300 ease-in-out",
        "rounded-full shadow-lg border-2 border-white",
        isCurrentPlayer && "scale-110 shadow-xl",
        className
      )}
      title={`${playerName}${isCurrentPlayer ? ' (Current)' : ''}`}
    >
      <span className="emoji-fallback">{emoji}</span>
    </div>
  );
}
