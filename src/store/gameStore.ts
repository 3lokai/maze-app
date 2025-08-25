import { create } from 'zustand';
import type { PlayerId, Cell, GameStatus, Dir } from '@/types/maze-app';
import type { MazeData } from '@/types/maze-app';
import { asMagnitude1to10 } from '@/lib/utils';
import type { CommandToken } from '@/types/commands';
import type { ExecutionSpeed } from '@/types/execution';
import type { PlayerConfig, ViewportState, CameraConfig } from '@/types/maze';
import { DEFAULT_PLAYER_CONFIGS, getMaxPlayers, getMinPlayers, DEFAULT_CAMERA_CONFIG } from '@/types/maze';

interface GameState {
  // Player positions and trails - Partial to support variable player count
  positions: Partial<Record<PlayerId, Cell>>;
  trails: Partial<Record<PlayerId, Cell[]>>;
  
  // Player configurations with names and emojis
  playerConfigs: Partial<Record<PlayerId, PlayerConfig>>;
  
  // Game state
  currentPlayer: PlayerId;
  status: GameStatus;
  
  // Scores - Partial to support variable player count
  scores: Partial<Record<PlayerId, number>>;
  crashes: Partial<Record<PlayerId, number>>;
  
  // Win tracking - Partial to support variable player count
  wins: Partial<Record<PlayerId, number>>;
  winner: PlayerId | null;
  showCelebration: boolean;
  
  // Announcement state
  showAnnouncement: boolean;
  
  // Command queue
  commandQueue: CommandToken[];
  
  // Execution state
  executionSpeed: ExecutionSpeed;
  
  // Viewport and camera state
  viewport: ViewportState;
  cameraConfig: CameraConfig;
  
  // Actions
  setPosition: (player: PlayerId, position: Cell) => void;
  addToTrail: (player: PlayerId, position: Cell) => void;
  clearTrail: (player: PlayerId) => void;
  switchPlayer: () => void;
  setStatus: (status: GameStatus) => void;
  incrementScore: (player: PlayerId) => void;
  incrementCrash: (player: PlayerId) => void;
  resetGame: (maze?: MazeData) => void;
  onMapChange: (maze: MazeData) => void;
  
  // Player management actions
  addPlayer: () => void;
  removePlayer: (playerId: PlayerId) => void;
  updatePlayerConfig: (playerId: PlayerId, config: Partial<PlayerConfig>) => void;
  getActivePlayers: () => PlayerId[];
  
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
  removeCommandAtIndex: (index: number) => void;
  clearCommandQueue: () => void;
  
  // Execution actions
  setExecutionSpeed: (speed: ExecutionSpeed) => void;
  
  // Viewport and camera actions
  setViewport: (viewport: Partial<ViewportState>) => void;
  updateViewportSize: (width: number, height: number) => void;
  setCameraConfig: (config: Partial<CameraConfig>) => void;
  enableFollowCam: (playerId: PlayerId) => void;
  disableFollowCam: () => void;
  
  // Stats calculation actions
  getPlayerStats: (playerId: PlayerId) => { wins: number; crashes: number; steps: number };
  getOverallStats: () => { wins: number; crashes: number; steps: number };
  
  // Player color theme actions
  getPlayerColor: (playerId: PlayerId) => string;
}

// Default initial position (will be overridden by maze start position)
const DEFAULT_INITIAL_POSITION: Cell = { r: 0, c: 0 };

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state - Single player default
  positions: {
    1: DEFAULT_INITIAL_POSITION,
  },
  trails: {
    1: [DEFAULT_INITIAL_POSITION],
  },
  playerConfigs: {
    1: DEFAULT_PLAYER_CONFIGS[1],
  },
  currentPlayer: 1,
  status: 'idle',
  scores: {
    1: 0,
  },
  crashes: {
    1: 0,
  },
  wins: {
    1: 0,
  },
  winner: null,
  showCelebration: false,
  showAnnouncement: false,
  commandQueue: [],
  executionSpeed: 'medium',
  viewport: { 
    scrollX: 0, 
    scrollY: 0, 
    width: 800, 
    height: 600, 
    isFollowing: false 
  },
  cameraConfig: DEFAULT_CAMERA_CONFIG,

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
        [player]: [...(state.trails[player] || []), position],
      },
    })),

  clearTrail: (player: PlayerId) =>
    set((state) => ({
      trails: {
        ...state.trails,
        [player]: [state.positions[player] || DEFAULT_INITIAL_POSITION],
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
        [player]: (state.scores[player] || 0) + 1,
      },
    })),

  incrementCrash: (player: PlayerId) =>
    set((state) => ({
      crashes: {
        ...state.crashes,
        [player]: (state.crashes[player] || 0) + 1,
      },
    })),

  resetGame: (maze?: MazeData) => {
    const startPosition = maze?.start || DEFAULT_INITIAL_POSITION;
    const state = get();
    const activePlayers = state.getActivePlayers();
    
    const newPositions: Partial<Record<PlayerId, Cell>> = {};
    const newTrails: Partial<Record<PlayerId, Cell[]>> = {};
    const newCrashes: Partial<Record<PlayerId, number>> = {};
    
    activePlayers.forEach(playerId => {
      newPositions[playerId] = startPosition;
      newTrails[playerId] = [startPosition];
      newCrashes[playerId] = 0;
    });
    
    set({
      positions: newPositions,
      trails: newTrails,
      currentPlayer: activePlayers[0] || 1,
      status: 'idle',
      commandQueue: [],
      crashes: newCrashes,
    });
  },

  // Map change handler - resets game state when map changes
  onMapChange: (maze: MazeData) => {
    const startPosition = maze.start;
    const state = get();
    const activePlayers = state.getActivePlayers();
    
    const newPositions: Partial<Record<PlayerId, Cell>> = {};
    const newTrails: Partial<Record<PlayerId, Cell[]>> = {};
    const newCrashes: Partial<Record<PlayerId, number>> = {};
    
    activePlayers.forEach(playerId => {
      newPositions[playerId] = startPosition;
      newTrails[playerId] = [startPosition];
      newCrashes[playerId] = 0;
    });
    
    set({
      positions: newPositions,
      trails: newTrails,
      currentPlayer: activePlayers[0] || 1,
      status: 'idle',
      commandQueue: [],
      crashes: newCrashes,
      winner: null,
      showCelebration: false,
      showAnnouncement: false,
    });
  },

  // Player management actions
  addPlayer: () =>
    set((state) => {
      const activePlayers = state.getActivePlayers();
      if (activePlayers.length >= getMaxPlayers()) {
        return state; // Cannot add more players
      }
      
      // Find the next available player ID
      const nextPlayerId = (activePlayers.length + 1) as PlayerId;
      
      return {
        positions: {
          ...state.positions,
          [nextPlayerId]: DEFAULT_INITIAL_POSITION,
        },
        trails: {
          ...state.trails,
          [nextPlayerId]: [DEFAULT_INITIAL_POSITION],
        },
        playerConfigs: {
          ...state.playerConfigs,
          [nextPlayerId]: DEFAULT_PLAYER_CONFIGS[nextPlayerId],
        },
        scores: {
          ...state.scores,
          [nextPlayerId]: 0,
        },
        crashes: {
          ...state.crashes,
          [nextPlayerId]: 0,
        },
        wins: {
          ...state.wins,
          [nextPlayerId]: 0,
        },
      };
    }),

  removePlayer: (playerId: PlayerId) =>
    set((state) => {
      const activePlayers = state.getActivePlayers();
      if (activePlayers.length <= getMinPlayers()) {
        return state; // Cannot remove the last player
      }
      
      // If removing current player, switch to first available player
      let newCurrentPlayer = state.currentPlayer;
      if (playerId === state.currentPlayer) {
        const remainingPlayers = activePlayers.filter(id => id !== playerId);
        newCurrentPlayer = remainingPlayers[0];
      }
      
      const newPositions = { ...state.positions };
      const newTrails = { ...state.trails };
      const newPlayerConfigs = { ...state.playerConfigs };
      const newScores = { ...state.scores };
      const newCrashes = { ...state.crashes };
      const newWins = { ...state.wins };
      
      delete newPositions[playerId];
      delete newTrails[playerId];
      delete newPlayerConfigs[playerId];
      delete newScores[playerId];
      delete newCrashes[playerId];
      delete newWins[playerId];
      
      return {
        positions: newPositions,
        trails: newTrails,
        playerConfigs: newPlayerConfigs,
        currentPlayer: newCurrentPlayer,
        scores: newScores,
        crashes: newCrashes,
        wins: newWins,
      };
    }),

  updatePlayerConfig: (playerId: PlayerId, config: Partial<PlayerConfig>) =>
    set((state) => ({
      playerConfigs: {
        ...state.playerConfigs,
        [playerId]: {
          ...state.playerConfigs[playerId],
          ...config,
        },
      },
    })),

  getActivePlayers: () => {
    const state = get();
    return Object.keys(state.playerConfigs).map(Number) as PlayerId[];
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

  removeCommandAtIndex: (index: number) =>
    set((state) => ({
      commandQueue: state.commandQueue.filter((_, i) => i !== index),
    })),

  clearCommandQueue: () =>
    set({ commandQueue: [] }),

  // Execution actions
  setExecutionSpeed: (speed: ExecutionSpeed) =>
    set({ executionSpeed: speed }),

  // Viewport and camera actions
  setViewport: (viewport: Partial<ViewportState>) =>
    set((state) => ({ viewport: { ...state.viewport, ...viewport } })),
  updateViewportSize: (width: number, height: number) =>
    set((state) => ({ viewport: { ...state.viewport, width, height } })),
  setCameraConfig: (config: Partial<CameraConfig>) =>
    set((state) => ({ cameraConfig: { ...state.cameraConfig, ...config } })),
  enableFollowCam: (playerId: PlayerId) =>
    set((state) => ({ 
      viewport: { ...state.viewport, isFollowing: true, targetPlayer: playerId },
      cameraConfig: { ...state.cameraConfig }
    })),
  disableFollowCam: () =>
    set((state) => ({ 
      viewport: { ...state.viewport, isFollowing: false, targetPlayer: undefined },
      cameraConfig: { ...state.cameraConfig }
    })),

  // Win actions
  setWinner: (player: PlayerId) =>
    set({ winner: player }),

  incrementWin: (player: PlayerId) =>
    set((state) => ({
      wins: {
        ...state.wins,
        [player]: (state.wins[player] || 0) + 1,
      },
    })),

  setShowCelebration: (show: boolean) =>
    set({ showCelebration: show }),

  playAgain: (maze?: MazeData) => {
    const startPosition = maze?.start || DEFAULT_INITIAL_POSITION;
    const state = get();
    const activePlayers = state.getActivePlayers();
    
    const newPositions: Partial<Record<PlayerId, Cell>> = {};
    const newTrails: Partial<Record<PlayerId, Cell[]>> = {};
    const newCrashes: Partial<Record<PlayerId, number>> = {};
    
    activePlayers.forEach(playerId => {
      newPositions[playerId] = startPosition;
      newTrails[playerId] = [startPosition];
      newCrashes[playerId] = 0;
    });
    
    set({
      positions: newPositions,
      trails: newTrails,
      currentPlayer: activePlayers[0] || 1,
      status: 'idle',
      commandQueue: [],
      crashes: newCrashes,
      winner: null,
      showCelebration: false,
    });
  },

  // Announcement actions
  setShowAnnouncement: (show: boolean) =>
    set({ showAnnouncement: show }),

  // Turn management actions - Updated for round-robin cycling
  switchTurn: () =>
    set((state) => {
      const activePlayers = state.getActivePlayers();
      
      if (activePlayers.length === 1) {
        // Single player: stay on same player, just clear queue
        return {
          commandQueue: [], // Clear current player's queue
        };
      }
      
      // Multi-player: round-robin to next player
      const currentIndex = activePlayers.indexOf(state.currentPlayer);
      const nextIndex = (currentIndex + 1) % activePlayers.length;
      const nextPlayer = activePlayers[nextIndex];
      
      return {
        currentPlayer: nextPlayer,
        commandQueue: [], // Clear current player's queue
      };
    }),

  clearCurrentPlayerQueue: () =>
    set({ commandQueue: [] }),

  // Stats calculation actions
  getPlayerStats: (playerId: PlayerId) => {
    const state = get();
    const trail = state.trails[playerId] || [];
    return {
      wins: state.wins[playerId] || 0,
      crashes: state.crashes[playerId] || 0,
      steps: trail.length - 1, // Subtract 1 because trail includes starting position
    };
  },

  getOverallStats: () => {
    const state = get();
    const activePlayers = state.getActivePlayers();
    
    let totalWins = 0;
    let totalCrashes = 0;
    let totalSteps = 0;
    
    activePlayers.forEach(playerId => {
      const stats = state.getPlayerStats(playerId);
      totalWins += stats.wins;
      totalCrashes += stats.crashes;
      totalSteps += stats.steps;
    });
    
    return {
      wins: totalWins,
      crashes: totalCrashes,
      steps: totalSteps,
    };
  },

  // Player color theme actions
  getPlayerColor: (playerId: PlayerId) => {
    const playerColors = {
      1: '#22c55e', // Green
      2: '#3b82f6', // Blue
      3: '#8b5cf6', // Purple
      4: '#f97316', // Orange
    } as const;
    
    return playerColors[playerId as keyof typeof playerColors] || '#6b7280'; // Gray fallback
  },
}));
