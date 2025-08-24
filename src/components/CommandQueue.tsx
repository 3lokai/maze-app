import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import type { CommandToken } from "@/types/commands";
import { cn } from "@/lib/utils";

interface CommandQueueProps {
  queue: CommandToken[];
  "aria-labelledby"?: string;
}

export function CommandQueue({ queue, "aria-labelledby": ariaLabelledBy }: CommandQueueProps) {
  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'U': return <ArrowUp className="w-3 h-3" />;
      case 'D': return <ArrowDown className="w-3 h-3" />;
      case 'L': return <ArrowLeft className="w-3 h-3" />;
      case 'R': return <ArrowRight className="w-3 h-3" />;
      default: return null;
    }
  };

  const renderCommandToken = (command: CommandToken, index: number) => (
    <div
      key={index}
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
        "queue-token-default"
      )}
    >
      {getDirectionIcon(command.direction)}
      <span>×{command.steps}</span>
    </div>
  );

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
