import { useState, useCallback, useRef } from 'react';
import { runQueueSimple, validateConstrainedPath, createPathConstraints } from '@/lib/executor';
import { MAZE_DATA } from '@/lib/maze';
import type { Cell, CmdToken, MazeData } from '@/types/maze-app';
import type { ExecutionState, ExecutionSpeed, ExecutionCallbacks } from '@/types/execution';
import { asMagnitude1to10 } from '@/lib/utils';

export function useExecutor(
  currentPosition: Cell,
  onPositionUpdate: (position: Cell) => void,
  onTrailUpdate: (position: Cell) => void,
  callbacks?: ExecutionCallbacks,
  maze?: MazeData,
  speed: ExecutionSpeed = 'medium'
) {
  const [executionState, setExecutionState] = useState<ExecutionState>({
    isRunning: false,
    isStepping: false,
    currentStep: 0,
    totalSteps: 0,
    speed,
    abortController: null,
  });

  const stepTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getTickMs = useCallback((speed: ExecutionSpeed) => {
    return speed === 'slow' ? 400 : 300;
  }, []);

  const calculateTotalSteps = useCallback((queue: CmdToken[]) => {
    return queue.reduce((sum, token) => sum + token.n, 0);
  }, []);

  const runQueue = useCallback((queue: CmdToken[]) => {
    if (queue.length === 0) return;

    const currentMaze = maze || MAZE_DATA;
    const pathConstraints = createPathConstraints(currentMaze);
    
    // Validate path with constraints before execution
    const validation = validateConstrainedPath(currentMaze, pathConstraints, currentPosition, queue);
    if (!validation.isValid) {
      // Path validation failed - trigger error callback
      callbacks?.onError?.(validation.stepIndex || 0, currentPosition);
      return;
    }

    const abortController = new AbortController();
    const totalSteps = calculateTotalSteps(queue);

    setExecutionState(prev => ({
      ...prev,
      isRunning: true,
      currentStep: 0,
      totalSteps,
      abortController,
    }));

    // Notify that execution is starting
    callbacks?.onStatusChange?.('executing');

    runQueueSimple({
      queue,
      from: currentPosition,
      maze: currentMaze,
      tickMs: getTickMs(executionState.speed),
      signal: abortController.signal,
      onTokenStart: callbacks?.onTokenStart,
             onStep: (cell: Cell) => {
         setExecutionState(prev => ({
           ...prev,
           currentStep: prev.currentStep + 1,
         }));
         onPositionUpdate(cell);
         onTrailUpdate(cell);
         callbacks?.onStep?.(cell, executionState.currentStep + 1);
       },
      onError: (stepIndex: number, cell: Cell) => {
        setExecutionState(prev => ({
          ...prev,
          isRunning: false,
          abortController: null,
        }));
        callbacks?.onError?.(stepIndex, cell);
      },
      onGoal: (cell: Cell) => {
        setExecutionState(prev => ({
          ...prev,
          isRunning: false,
          abortController: null,
        }));
        onPositionUpdate(cell);
        onTrailUpdate(cell);
        callbacks?.onGoal?.(cell);
      },
      onTokenEnd: callbacks?.onTokenEnd,
      onDone: () => {
        setExecutionState(prev => ({
          ...prev,
          isRunning: false,
          abortController: null,
        }));
        callbacks?.onDone?.();
      },
    });
  }, [maze, currentPosition, calculateTotalSteps, getTickMs, executionState.speed, executionState.currentStep, callbacks, onPositionUpdate, onTrailUpdate]);

  const stepQueue = useCallback((queue: CmdToken[]) => {
    if (queue.length === 0) return;

    setExecutionState(prev => ({
      ...prev,
      isStepping: true,
    }));

    // Notify that stepping is starting
    callbacks?.onStatusChange?.('executing');

    // Execute just the first step of the first token
    const firstToken = queue[0];
    const currentMaze = maze || MAZE_DATA;
    runQueueSimple({
      queue: [{ ...firstToken, n: asMagnitude1to10(1) }],
      from: currentPosition,
      maze: currentMaze,
      tickMs: getTickMs(executionState.speed),
             onStep: (cell: Cell) => {
         setExecutionState(prev => ({
           ...prev,
           isStepping: false,
           currentStep: prev.currentStep + 1,
         }));
         onPositionUpdate(cell);
         onTrailUpdate(cell);
         callbacks?.onStep?.(cell, executionState.currentStep + 1);
       },
      onError: (stepIndex: number, cell: Cell) => {
        setExecutionState(prev => ({
          ...prev,
          isStepping: false,
        }));
        callbacks?.onError?.(stepIndex, cell);
      },
      onGoal: (cell: Cell) => {
        setExecutionState(prev => ({
          ...prev,
          isStepping: false,
        }));
        onPositionUpdate(cell);
        onTrailUpdate(cell);
        callbacks?.onGoal?.(cell);
      },
      onDone: () => {
        setExecutionState(prev => ({
          ...prev,
          isStepping: false,
        }));
        callbacks?.onDone?.();
      },
    });
  }, [maze, currentPosition, executionState.speed, executionState.currentStep, getTickMs, onPositionUpdate, onTrailUpdate, callbacks]);

  const stopExecution = useCallback(() => {
    if (executionState.abortController) {
      executionState.abortController.abort();
    }
    if (stepTimeoutRef.current) {
      clearTimeout(stepTimeoutRef.current);
      stepTimeoutRef.current = null;
    }
    setExecutionState(prev => ({
      ...prev,
      isRunning: false,
      isStepping: false,
      abortController: null,
    }));
  }, [executionState.abortController]);

  const setSpeed = useCallback((speed: ExecutionSpeed) => {
    setExecutionState(prev => ({
      ...prev,
      speed,
    }));
  }, []);

  const resetExecution = useCallback(() => {
    stopExecution();
    setExecutionState(prev => ({
      ...prev,
      currentStep: 0,
      totalSteps: 0,
    }));
  }, [stopExecution]);

  return {
    executionState,
    runQueue,
    stepQueue,
    stopExecution,
    setSpeed,
    resetExecution,
  };
}
