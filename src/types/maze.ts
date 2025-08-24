import { z } from 'zod';

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
