import type { Dir, Magnitude1to10 } from '@/types/maze-app';

export interface CommandToken {
  direction: Dir;
  steps: Magnitude1to10;
}

export interface CommandBuilderState {
  queue: CommandToken[];
  selectedDirection: Dir | null;
  selectedNumber: Magnitude1to10 | null;
}

export interface CommandBuilderActions {
  addCommand: (direction: Dir, steps: Magnitude1to10) => void;
  removeLastCommand: () => void;
  clearQueue: () => void;
  setSelectedDirection: (direction: Dir | null) => void;
  setSelectedNumber: (number: Magnitude1to10 | null) => void;
}
