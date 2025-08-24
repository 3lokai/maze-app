"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Square, StepForward } from "lucide-react";
import type { ExecutorProps } from "@/types/execution";

export function Executor({
  queue,
  isDisabled = false,
  onRun,
  onStep,
  onStop,
  executionState,
}: Omit<ExecutorProps, 'onSpeedChange'>) {
  const { isRunning, isStepping, currentStep, totalSteps } = executionState;
  const hasCommands = queue.length > 0;
  const isExecuting = isRunning || isStepping;

  return (
    <div className="space-y-4">
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
          />
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-2" role="group" aria-label="Execution controls">
        <Button
          onClick={onRun}
          disabled={isDisabled || !hasCommands || isExecuting}
          className="flex-1"
          size="sm"
          aria-label="Run all commands in queue"
        >
          <Play className="h-4 w-4 mr-2" />
          Run
        </Button>
        
        <Button
          onClick={onStep}
          disabled={isDisabled || !hasCommands || isExecuting}
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
