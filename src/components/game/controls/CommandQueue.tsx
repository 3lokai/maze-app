import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import type { CommandToken } from "@/types/commands";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/gameStore";
import { useState } from "react";

interface CommandQueueProps {
  queue: CommandToken[];
  "aria-labelledby"?: string;
  onRemoveCommand?: (index: number) => void;
}

export function CommandQueue({ 
  queue, 
  "aria-labelledby": ariaLabelledBy, 
  onRemoveCommand 
}: CommandQueueProps) {
  const { currentPlayer, getPlayerColor } = useGameStore();
  const [bouncingTokens, setBouncingTokens] = useState<Set<number>>(new Set());

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'U': return <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />;
      case 'D': return <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4" />;
      case 'L': return <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />;
      case 'R': return <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />;
      default: return null;
    }
  };

  const handleTokenClick = (index: number) => {
    if (onRemoveCommand) {
      // Add bounce animation
      setBouncingTokens(prev => new Set([...prev, index]));
      
      // Remove token after animation
      setTimeout(() => {
        onRemoveCommand(index);
        setBouncingTokens(prev => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
      }, 200);
    }
  };

  const renderCommandToken = (command: CommandToken, index: number) => {
    const playerColor = getPlayerColor(currentPlayer);
    const isBouncing = bouncingTokens.has(index);
    const isClickable = !!onRemoveCommand;
    
    return (
      <div
        key={index}
        className={cn(
          "inline-flex items-center gap-1 px-2 sm:px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200",
          "border-2 shadow-sm min-h-[44px] min-w-[44px]",
          "touch-manipulation", // Optimize for touch
          isClickable && "cursor-pointer hover:scale-105 active:scale-95",
          isBouncing && "animate-token-bounce"
        )}
        style={{
          backgroundColor: `${playerColor}15`,
          borderColor: playerColor,
          color: playerColor,
        }}
        onClick={() => handleTokenClick(index)}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable ? 0 : undefined}
        aria-label={isClickable ? `Remove command ${index + 1}` : undefined}
        onKeyDown={isClickable ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleTokenClick(index);
          }
        } : undefined}
      >
        <span className="text-base sm:text-lg" aria-hidden="true">
          {getDirectionIcon(command.direction)}
        </span>
        <span className="font-bold">×{command.steps}</span>
      </div>
    );
  };

  return (
    <div className="space-y-3" role="group" aria-labelledby={ariaLabelledBy}>
      {/* Queue Display */}
      <div className="min-h-[3rem] sm:min-h-[4rem] p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 shadow-inner" role="status" aria-live="polite">
        {queue.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {queue.map(renderCommandToken)}
          </div>
        ) : (
          <div className="text-sm text-blue-600 italic flex items-center justify-center h-full font-medium">
            ✨ Add commands to get started!
          </div>
        )}
      </div>
      
      {/* Queue Info */}
      <div className="flex justify-between items-center text-xs sm:text-sm text-muted-foreground">
        <span>Commands: {queue.length}</span>
        <span>Total Steps: {queue.reduce((sum, cmd) => sum + cmd.steps, 0)}</span>
      </div>
    </div>
  );
}
