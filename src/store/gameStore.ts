import { create } from 'zustand';
import type { PlayerId, Cell, GameStatus, Dir } from '@/types/maze-app';
import type { MazeData } from '@/types/maze-app';
import { asMagnitude1to10 } from '@/lib/utils';
import type { CommandToken } from '@/types/commands';
import type { ExecutionSpeed } from '@/types/execution';

interface GameState {
  // Player positions and trails
  positions: Record<PlayerId, Cell>;
  trails: Record<PlayerId, Cell[]>;
  
  // Game state
  currentPlayer: PlayerId;
  status: GameStatus;
  
  // Scores
  scores: Record<PlayerId, number>;
  crashes: Record<PlayerId, number>;
  
  // Win tracking
  wins: Record<PlayerId, number>;
  winner: PlayerId | null;
  showCelebration: boolean;
  
  // Announcement state
  showAnnouncement: boolean;
  
  // Command queue
  commandQueue: CommandToken[];
  
  // Execution state
  executionSpeed: ExecutionSpeed;
  
  // Actions
  setPosition: (player: PlayerId, position: Cell) => void;
  addToTrail: (player: PlayerId, position: Cell) => void;
  clearTrail: (player: PlayerId) => void;
  switchPlayer: () => void;
  setStatus: (status: GameStatus) => void;
  incrementScore: (player: PlayerId) => void;
  incrementCrash: (player: PlayerId) => void;
  resetGame: (maze?: MazeData) => void;
  
  // Win actions
  setWinner: (player: PlayerId) => void;
  incrementWin: (player: PlayerId) => void;
  setShowCelebration: (show: boolean) => void;
  playAgain: (maze?: MazeData) => void;
  
  // Announcement actions
  setShowAnnouncement: (show: boolean) => void;
  
  // Turn management actions
  switchTurn: () => void;
  clearCurrentPlayerQueue: () => void;
  
  // Command actions
  addCommand: (direction: Dir, steps: number) => void;
  removeLastCommand: () => void;
  clearCommandQueue: () => void;
  
  // Execution actions
  setExecutionSpeed: (speed: ExecutionSpeed) => void;
}

// Default initial position (will be overridden by maze start position)
const DEFAULT_INITIAL_POSITION: Cell = { r: 0, c: 0 };

export const useGameStore = create<GameState>((set) => ({
  // Initial state
  positions: {
    1: DEFAULT_INITIAL_POSITION,
    2: DEFAULT_INITIAL_POSITION,
  },
  trails: {
    1: [DEFAULT_INITIAL_POSITION],
    2: [DEFAULT_INITIAL_POSITION],
  },
  currentPlayer: 1,
  status: 'idle',
  scores: {
    1: 0,
    2: 0,
  },
  crashes: {
    1: 0,
    2: 0,
  },
  wins: {
    1: 0,
    2: 0,
  },
  winner: null,
  showCelebration: false,
  showAnnouncement: false,
  commandQueue: [],
  executionSpeed: 'medium',

  // Actions
  setPosition: (player: PlayerId, position: Cell) =>
    set((state) => ({
      positions: {
        ...state.positions,
        [player]: position,
      },
    })),

  addToTrail: (player: PlayerId, position: Cell) =>
    set((state) => ({
      trails: {
        ...state.trails,
        [player]: [...state.trails[player], position],
      },
    })),

  clearTrail: (player: PlayerId) =>
    set((state) => ({
      trails: {
        ...state.trails,
        [player]: [state.positions[player]],
      },
    })),

  switchPlayer: () =>
    set((state) => ({
      currentPlayer: state.currentPlayer === 1 ? 2 : 1,
    })),

  setStatus: (status: GameStatus) =>
    set({ status }),

  incrementScore: (player: PlayerId) =>
    set((state) => ({
      scores: {
        ...state.scores,
        [player]: state.scores[player] + 1,
      },
    })),

  incrementCrash: (player: PlayerId) =>
    set((state) => ({
      crashes: {
        ...state.crashes,
        [player]: state.crashes[player] + 1,
      },
    })),

  resetGame: (maze?: MazeData) => {
    const startPosition = maze?.start || DEFAULT_INITIAL_POSITION;
    set({
      positions: {
        1: startPosition,
        2: startPosition,
      },
      trails: {
        1: [startPosition],
        2: [startPosition],
      },
      currentPlayer: 1,
      status: 'idle',
      commandQueue: [],
      crashes: {
        1: 0,
        2: 0,
      },
    });
  },

  // Command actions
  addCommand: (direction: Dir, steps: number) =>
    set((state) => ({
      commandQueue: [...state.commandQueue, { direction, steps: asMagnitude1to10(steps) }],
    })),

  removeLastCommand: () =>
    set((state) => ({
      commandQueue: state.commandQueue.slice(0, -1),
    })),

  clearCommandQueue: () =>
    set({ commandQueue: [] }),

  // Execution actions
  setExecutionSpeed: (speed: ExecutionSpeed) =>
    set({ executionSpeed: speed }),

  // Win actions
  setWinner: (player: PlayerId) =>
    set({ winner: player }),

  incrementWin: (player: PlayerId) =>
    set((state) => ({
      wins: {
        ...state.wins,
        [player]: state.wins[player] + 1,
      },
    })),

  setShowCelebration: (show: boolean) =>
    set({ showCelebration: show }),

  playAgain: (maze?: MazeData) => {
    const startPosition = maze?.start || DEFAULT_INITIAL_POSITION;
    set(() => ({
      positions: {
        1: startPosition,
        2: startPosition,
      },
      trails: {
        1: [startPosition],
        2: [startPosition],
      },
      currentPlayer: 1,
      status: 'idle',
      commandQueue: [],
      crashes: {
        1: 0,
        2: 0,
      },
      winner: null,
      showCelebration: false,
    }));
  },

  // Announcement actions
  setShowAnnouncement: (show: boolean) =>
    set({ showAnnouncement: show }),

  // Turn management actions
  switchTurn: () =>
    set((state) => ({
      currentPlayer: state.currentPlayer === 1 ? 2 : 1,
      commandQueue: [], // Clear current player's queue
    })),

  clearCurrentPlayerQueue: () =>
    set({ commandQueue: [] }),
}));
