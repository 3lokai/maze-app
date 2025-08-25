"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Square, StepForward, Undo2, RotateCcw } from "lucide-react";
import { DirectionButtons } from "./DirectionButtons";
import { NumberPad } from "./NumberPad";
import { CommandQueue } from "./CommandQueue";
import { useGameStore } from "@/store/gameStore";
import type { Dir, Magnitude1to10, PlayerId } from "@/types/maze-app";
import type { ExecutionState } from "@/types/execution";

interface CommandBuilderProps {
  queue: Array<{ direction: Dir; steps: Magnitude1to10 }>;
  onAddCommand: (direction: Dir, steps: number) => void;
  onUndo: () => void;
  onReset: () => void;
  onRun: () => void;
  onStep: () => void;
  onStop: () => void;
  onRemoveCommand?: (index: number) => void;
  executionState: ExecutionState;
  currentPlayer: number;
}

export function CommandBuilder({ 
  queue, 
  onAddCommand, 
  onUndo, 
  onReset, 
  onRun, 
  onStep, 
  onStop, 
  onRemoveCommand,
  executionState,
  currentPlayer
}: CommandBuilderProps) {
  const [selectedDirection, setSelectedDirection] = useState<Dir | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<Magnitude1to10 | null>(null);

  const { getPlayerColor } = useGameStore();
  const { isRunning, isStepping, currentStep, totalSteps } = executionState;
  const hasCommands = queue.length > 0;
  const isExecuting = isRunning || isStepping;
  
  // Get player color for progress bar theming
  const playerColor = getPlayerColor(currentPlayer as PlayerId);

  const handleDirectionClick = (direction: Dir) => {
    setSelectedDirection(direction);
    
    // If we have both direction and number selected, add the command
    if (selectedNumber !== null) {
      onAddCommand(direction, selectedNumber);
      setSelectedDirection(null);
      setSelectedNumber(null);
    }
  };

  const handleNumberClick = (number: Magnitude1to10) => {
    setSelectedNumber(number);
    
    // If we have both direction and number selected, add the command
    if (selectedDirection !== null) {
      onAddCommand(selectedDirection, number);
      setSelectedDirection(null);
      setSelectedNumber(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Direction Buttons */}
      <div>
        <h4 className="text-sm font-medium mb-2" id="direction-label">Direction</h4>
        <DirectionButtons 
          onDirectionClick={handleDirectionClick}
          selectedDirection={selectedDirection}
          aria-labelledby="direction-label"
        />
      </div>

      {/* Number Pad */}
      <div>
        <h4 className="text-sm font-medium mb-2" id="steps-label">Steps</h4>
        <NumberPad 
          onNumberClick={handleNumberClick}
          selectedNumber={selectedNumber}
          aria-labelledby="steps-label"
        />
      </div>

      {/* Command Queue */}
      <div>
        <h4 className="text-sm font-medium mb-2" id="queue-label">Command Queue</h4>
        <CommandQueue 
          queue={queue}
          aria-labelledby="queue-label"
          onRemoveCommand={onRemoveCommand}
        />
      </div>

      {/* Undo/Reset Buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onUndo}
          disabled={queue.length === 0}
          className="flex-1"
          aria-label="Undo last command"
        >
          <Undo2 className="w-4 h-4 mr-1" />
          Undo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          disabled={queue.length === 0}
          className="flex-1"
          aria-label="Reset all commands"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>

      {/* Progress Indicator */}
      {totalSteps > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Progress:</span>
            <Badge variant="outline">
              {currentStep} / {totalSteps} steps
            </Badge>
          </div>
          <Progress 
            value={(currentStep / totalSteps) * 100} 
            className="h-3 transition-all duration-300"
            style={{
              '--progress-color': playerColor
            } as React.CSSProperties}
          />
        </div>
      )}

      {/* Execution Control Buttons */}
      <div className="flex gap-2" role="group" aria-label="Execution controls">
        <Button
          onClick={onRun}
          disabled={!hasCommands || isExecuting}
          className="flex-1"
          size="sm"
          aria-label="Run all commands in queue"
        >
          <Play className="h-4 w-4 mr-2" />
          Run
        </Button>
        
        <Button
          onClick={onStep}
          disabled={!hasCommands || isExecuting}
          variant="outline"
          size="sm"
          aria-label="Execute next command step"
        >
          <StepForward className="h-4 w-4 mr-2" />
          Step
        </Button>
        
        <Button
          onClick={onStop}
          disabled={!isExecuting}
          variant="destructive"
          size="sm"
          aria-label="Stop execution"
        >
          <Square className="h-4 w-4 mr-2" />
          Stop
        </Button>
      </div>

      {/* Status */}
      {isExecuting && (
        <div className="text-sm text-muted-foreground text-center">
          {isRunning ? 'Running commands...' : 'Stepping...'}
        </div>
      )}
    </div>
  );
}
