import type { Cell, CmdToken, GameStatus } from '@/types/maze-app';
import type { CommandToken } from '@/types/commands';

export type ExecutionSpeed = 'slow' | 'medium';

export interface ExecutionState {
  isRunning: boolean;
  isStepping: boolean;
  currentStep: number;
  totalSteps: number;
  speed: ExecutionSpeed;
  abortController: AbortController | null;
}

export interface ExecutionCallbacks {
  onStep?: (cell: Cell, stepIndex: number) => void;
  onTokenStart?: (token: CmdToken, tokenIndex: number) => void;
  onTokenEnd?: (token: CmdToken, tokenIndex: number) => void;
  onError?: (stepIndex: number, cell: Cell) => void;
  onGoal?: (cell: Cell) => void;
  onDone?: () => void;
  onStatusChange?: (status: GameStatus) => void;
}

export interface ExecutorProps {
  queue: CommandToken[];
  isDisabled?: boolean;
  onRun: () => void;
  onStep: () => void;
  onStop: () => void;
  executionState: ExecutionState;
}
