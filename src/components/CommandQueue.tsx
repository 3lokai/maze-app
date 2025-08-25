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
      case 'U': return <ArrowUp className="w-3 h-3" />;
      case 'D': return <ArrowDown className="w-3 h-3" />;
      case 'L': return <ArrowLeft className="w-3 h-3" />;
      case 'R': return <ArrowRight className="w-3 h-3" />;
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
          "inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200",
          "border-2 shadow-sm",
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
        <span className="text-base" aria-hidden="true">
          {getDirectionIcon(command.direction)}
        </span>
        <span className="font-bold">×{command.steps}</span>
      </div>
    );
  };

  return (
    <div className="space-y-3" role="group" aria-labelledby={ariaLabelledBy}>
      {/* Queue Display */}
      <div className="min-h-[3rem] p-3 bg-muted rounded-md border" role="status" aria-live="polite">
        {queue.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {queue.map(renderCommandToken)}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground italic flex items-center justify-center h-full">
            No commands
          </div>
        )}
      </div>
      
      {/* Queue Info */}
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span>Commands: {queue.length}</span>
        <span>Total Steps: {queue.reduce((sum, cmd) => sum + cmd.steps, 0)}</span>
      </div>
    </div>
  );
}
