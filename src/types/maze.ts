import { z } from 'zod';
import { PlayerId } from './maze-app';

/**
 * Zod schema for maze layout JSON validation
 */
export const MazeLayoutSchema = z.object({
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  start: z.object({
    r: z.number().int().min(0),
    c: z.number().int().min(0)
  }),
  goal: z.object({
    r: z.number().int().min(0),
    c: z.number().int().min(0)
  }),
  path: z.array(z.string().regex(/^\d+,\d+$/)),
  name: z.string().optional(),
  theme: z.object({
    start: z.string().min(1).max(50).optional(),
    goal: z.string().min(1).max(50).optional()
  }).optional()
});

/**
 * Type for maze layout data loaded from JSON
 */
export type MazeLayout = z.infer<typeof MazeLayoutSchema>;

/**
 * Alternative edge list format for maze layouts
 */
export const MazeEdgeLayoutSchema = z.object({
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  start: z.object({
    r: z.number().int().min(0),
    c: z.number().int().min(0)
  }),
  goal: z.object({
    r: z.number().int().min(0),
    c: z.number().int().min(0)
  }),
  edges: z.array(z.object({
    from: z.string().regex(/^\d+,\d+$/),
    to: z.string().regex(/^\d+,\d+$/)
  })),
  name: z.string().optional(),
  theme: z.object({
    start: z.string().min(1).max(50).optional(),
    goal: z.string().min(1).max(50).optional()
  }).optional()
});

export type MazeEdgeLayout = z.infer<typeof MazeEdgeLayoutSchema>;

/**
 * Player configuration with name and emoji
 */
export interface PlayerConfig {
  id: PlayerId;
  name: string;
  emoji: string;
}

/**
 * Available emoji options for players
 */
export const PLAYER_EMOJIS = ['🐢', '🦊', '🐰', '🦁', '🐸', '🐼', '🐨', '🐯', '🦄', '🐙', '🦋', '🐺'] as const;
export type PlayerEmoji = typeof PLAYER_EMOJIS[number];

/**
 * Default player configurations
 */
export const DEFAULT_PLAYER_CONFIGS: Record<PlayerId, PlayerConfig> = {
  1: { id: 1, name: 'Player 1', emoji: '🐢' },
  2: { id: 2, name: 'Player 2', emoji: '🦊' },
  3: { id: 3, name: 'Player 3', emoji: '🐰' },
  4: { id: 4, name: 'Player 4', emoji: '🦁' }
};

/**
 * Validation utilities for player management
 */
export const isValidPlayerId = (id: number): id is PlayerId => 
  id >= 1 && id <= 4;

export const getMaxPlayers = (): number => 4;
export const getMinPlayers = (): number => 1;
