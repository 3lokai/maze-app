import type { PlayerId } from './maze-app';

export interface PlayerStatistics {
  playerId: PlayerId;
  wins: number;
  crashes: number;
  steps: number;
  isCurrentPlayer: boolean;
}

export interface GameStatistics {
  players: Record<PlayerId, PlayerStatistics>;
  totalGames: number;
  currentPlayer: PlayerId;
}

export interface HUDStats {
  totalSteps: number;
  totalCrashes: number;
  totalWins: number;
}

