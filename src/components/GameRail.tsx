import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommandBuilder } from "@/components/CommandBuilder";
import { CommandToken } from "@/types/commands";
import { ExecutionState } from "@/types/execution";
import { PlayerId, Dir } from "@/types/maze-app";

interface GameRailProps {
  wins: Record<PlayerId, number>;
  commandQueue: CommandToken[];
  executionState: ExecutionState;
  onAddCommand: (direction: Dir, steps: number) => void;
  onUndo: () => void;
  onReset: () => void;
  onRun: () => void;
  onStep: () => void;
  onStop: () => void;
}

export function GameRail({
  wins,
  commandQueue,
  executionState,
  onAddCommand,
  onUndo,
  onReset,
  onRun,
  onStep,
  onStop,
}: GameRailProps) {
  return (
    <div className="space-y-4">
      {/* Command Builder & Executor */}
      <Card className="rail-section-commands" role="region" aria-labelledby="commands-section-title">
        <CardHeader className="pb-3">
          <CardTitle id="commands-section-title" className="text-lg flex items-center gap-2">
            <span className="rail-title-commands" aria-hidden="true">⚡ Commands & Execute</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <CommandBuilder 
            queue={commandQueue}
            onAddCommand={onAddCommand}
            onUndo={onUndo}
            onReset={onReset}
            onRun={onRun}
            onStep={onStep}
            onStop={onStop}
            executionState={executionState}
          />
        </CardContent>
      </Card>

      {/* Game Status & Wins */}
      <Card className="rail-section-status" role="region" aria-labelledby="status-section-title">
        <CardHeader className="pb-2">
          <CardTitle id="status-section-title" className="text-lg flex items-center gap-2">
            <span aria-hidden="true">📊 Record</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-center">
            <div className="flex justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span aria-hidden="true">🐢</span>
                <span className="font-medium">{wins[1]}</span>
              </div>
              <div className="flex items-center gap-1">
                <span aria-hidden="true">🦊</span>
                <span className="font-medium">{wins[2]}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
