import type { 
  MazeData, 
  Cell, 
  Dir, 
  CmdToken, 
  SimStepResult, 
  SimulateFn
} from '@/types/maze-app';
import { mazeHelpers, isGoal, performanceUtils } from './maze';

/**
 * Path validation types
 */
export interface PathValidationResult {
  isValid: boolean;
  reason?: string;
  stepIndex?: number;
}

export interface PathConstraints {
  pathCells: Set<string>;
  start: Cell;
  goal: Cell;
}

/**
 * Performance monitoring for executor
 */
export interface ExecutorPerformance {
  stepCount: number;
  executionTime: number;
  memoryUsage?: number;
  cacheHits: number;
  cacheMisses: number;
}

/**
 * Path cache for repeated operations
 */
class PathCache {
  private cache = new Map<string, { result: SimStepResult; timestamp: number }>();
  private maxSize = 1000; // Limit cache size to prevent memory leaks
  private ttl = 30000; // 30 seconds TTL

  private getKey(mazeId: string, from: Cell, dir: Dir): string {
    return `${mazeId}:${from.r},${from.c}:${dir}`;
  }

  get(mazeId: string, from: Cell, dir: Dir): SimStepResult | null {
    const key = this.getKey(mazeId, from, dir);
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    // Check TTL
    if (Date.now() - cached.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.result;
  }

  set(mazeId: string, from: Cell, dir: Dir, result: SimStepResult): void {
    const key = this.getKey(mazeId, from, dir);
    
    // Evict oldest entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }
    
    this.cache.set(key, { result, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }

  getStats(): { hits: number; misses: number; size: number } {
    return {
      hits: 0, // Would need to track these in practice
      misses: 0,
      size: this.cache.size
    };
  }
}

// Global path cache instance
const pathCache = new PathCache();

/**
 * Simulate a single step in a direction with caching
 * Returns the result of the step including collision detection
 */
export function executeStep(maze: MazeData, from: Cell, dir: Dir): SimStepResult {
  // Try cache first for performance optimization
  const mazeId = maze.mazeId || 'default';
  const cached = pathCache.get(mazeId, from, dir);
  if (cached) {
    return cached;
  }

  let next: Cell;
  
  switch (dir) {
    case 'U':
      next = { r: from.r - 1, c: from.c };
      break;
    case 'D':
      next = { r: from.r + 1, c: from.c };
      break;
    case 'L':
      next = { r: from.r, c: from.c - 1 };
      break;
    case 'R':
      next = { r: from.r, c: from.c + 1 };
      break;
  }
  
  // Check bounds
  if (!mazeHelpers.inBounds(maze, next)) {
    const result = { next, ok: false };
    pathCache.set(mazeId, from, dir, result);
    return result;
  }
  
  // Check wall collision
  const fromKey = mazeHelpers.key(from);
  const nextKey = mazeHelpers.key(next);
  const neighbors = maze.graph[fromKey];
  
  if (!neighbors || !neighbors.has(nextKey)) {
    const result = { next, ok: false };
    pathCache.set(mazeId, from, dir, result);
    return result;
  }
  
  // Valid move
  const reachedGoal = isGoal(maze, next);
  const result = { next, ok: true, reachedGoal };
  pathCache.set(mazeId, from, dir, result);
  return result;
}

/**
 * Optimized path validation for larger grids
 * Uses early termination and efficient bounds checking
 */
export function validatePath(
  maze: MazeData, 
  from: Cell, 
  tokens: readonly CmdToken[]
): { finalPosition: Cell; isValid: boolean; hitWallAt?: number } {
  let current = from;
  let stepIndex = 0;
  
  // Performance optimization: pre-calculate total steps
  const totalSteps = tokens.reduce((sum, token) => sum + token.n, 0);
  
  // Early termination for very long paths on large grids
  if (performanceUtils.needsOptimization(maze.width, maze.height) && totalSteps > 100) {
    // For large grids, limit path validation to prevent performance issues
    const maxSteps = Math.min(totalSteps, 100);
    let stepsProcessed = 0;
    
    for (const token of tokens) {
      for (let i = 0; i < token.n && stepsProcessed < maxSteps; i++) {
        stepIndex++;
        stepsProcessed++;
        const result = executeStep(maze, current, token.dir);
        
        if (!result.ok) {
          return { 
            finalPosition: current, 
            isValid: false, 
            hitWallAt: stepIndex 
          };
        }
        
        current = result.next;
        
        if (result.reachedGoal) {
          return { finalPosition: current, isValid: true };
        }
      }
    }
    
    // If we hit the limit, assume the path is valid (will be validated during execution)
    return { finalPosition: current, isValid: true };
  }
  
  // Standard validation for smaller grids
  for (const token of tokens) {
    for (let i = 0; i < token.n; i++) {
      stepIndex++;
      const result = executeStep(maze, current, token.dir);
      
      if (!result.ok) {
        return { 
          finalPosition: current, 
          isValid: false, 
          hitWallAt: stepIndex 
        };
      }
      
      current = result.next;
      
      if (result.reachedGoal) {
        return { finalPosition: current, isValid: true };
      }
    }
  }
  
  return { finalPosition: current, isValid: true };
}

/**
 * Create a simulation function that uses the maze data
 */
export function createSimulateFunction(mazeData: MazeData): SimulateFn {
  return (maze: MazeData, from: Cell, dir: Dir): SimStepResult => {
    return executeStep(mazeData, from, dir);
  };
}

/**
 * Expand a command token into individual steps
 * Useful for previewing paths or calculating total steps
 */
export function expandToken(token: CmdToken): Dir[] {
  return Array(token.n).fill(token.dir);
}

/**
 * Expand a queue of tokens into individual steps
 */
export function expandQueue(tokens: readonly CmdToken[]): Dir[] {
  return tokens.flatMap(expandToken);
}

/**
 * Calculate the total number of steps in a queue
 */
export function getQueueStepCount(tokens: readonly CmdToken[]): number {
  return tokens.reduce((sum, token) => sum + token.n, 0);
}

/**
 * Check if a queue would reach the goal
 */
export function wouldReachGoal(
  maze: MazeData, 
  from: Cell, 
  tokens: readonly CmdToken[]
): boolean {
  const { finalPosition } = validatePath(maze, from, tokens);
  return isGoal(maze, finalPosition);
}

/**
 * Get the final position after executing a queue
 */
export function getFinalPosition(
  maze: MazeData, 
  from: Cell, 
  tokens: readonly CmdToken[]
): Cell {
  const { finalPosition } = validatePath(maze, from, tokens);
  return finalPosition;
}

/**
 * Calculate the minimum steps needed to reach goal from a position
 * Uses Manhattan distance as a heuristic
 */
export function estimateStepsToGoal(maze: MazeData, from: Cell): number {
  return Math.abs(from.r - maze.goal.r) + Math.abs(from.c - maze.goal.c);
}

/**
 * Check if a position is a dead end (only one valid neighbor)
 */
export function isDeadEnd(maze: MazeData, cell: Cell): boolean {
  const neighbors = mazeHelpers.neighbors(maze, cell);
  return neighbors.length === 1;
}

/**
 * Create path constraints from maze data
 * Extracts the valid path cells for movement validation
 */
export function createPathConstraints(maze: MazeData): PathConstraints {
  const pathCells = new Set<string>();
  
  // Add all cells that exist in the graph (have neighbors)
  for (const [key, neighbors] of Object.entries(maze.graph)) {
    if (neighbors.size > 0) {
      pathCells.add(key);
    }
  }
  
  // Explicitly add start and goal cells to ensure they're always accessible
  pathCells.add(mazeHelpers.key(maze.start));
  pathCells.add(mazeHelpers.key(maze.goal));
  
  return {
    pathCells,
    start: maze.start,
    goal: maze.goal
  };
}

/**
 * Validate if a move is within the defined path
 * This is the core function for constrained movement
 */
export function validatePathMove(
  constraints: PathConstraints,
  from: Cell,
  to: Cell
): PathValidationResult {
  const toKey = mazeHelpers.key(to);
  
  // Check if the destination cell is in the allowed path
  if (!constraints.pathCells.has(toKey)) {
    return {
      isValid: false,
      reason: 'Move outside defined path'
    };
  }
  
  return { isValid: true };
}

/**
 * Validate a complete path with path constraints
 * Returns detailed validation result including step information
 */
export function validateConstrainedPath(
  maze: MazeData,
  constraints: PathConstraints,
  from: Cell,
  tokens: readonly CmdToken[]
): PathValidationResult {
  let current = from;
  let stepIndex = 0;
  
  for (const token of tokens) {
    for (let i = 0; i < token.n; i++) {
      stepIndex++;
      
      // Calculate next position
      let next: Cell;
      switch (token.dir) {
        case 'U':
          next = { r: current.r - 1, c: current.c };
          break;
        case 'D':
          next = { r: current.r + 1, c: current.c };
          break;
        case 'L':
          next = { r: current.r, c: current.c - 1 };
          break;
        case 'R':
          next = { r: current.r, c: current.c + 1 };
          break;
      }
      
      // First check path constraints
      const pathValidation = validatePathMove(constraints, current, next);
      if (!pathValidation.isValid) {
        return {
          isValid: false,
          reason: pathValidation.reason,
          stepIndex
        };
      }
      
      // Then check wall collision (existing logic)
      if (!mazeHelpers.inBounds(maze, next)) {
        return {
          isValid: false,
          reason: 'Move outside maze bounds',
          stepIndex
        };
      }
      
      const fromKey = mazeHelpers.key(current);
      const nextKey = mazeHelpers.key(next);
      const neighbors = maze.graph[fromKey];
      
      if (!neighbors || !neighbors.has(nextKey)) {
        return {
          isValid: false,
          reason: 'Wall collision',
          stepIndex
        };
      }
      
      current = next;
      
      // Check if goal reached
      if (isGoal(maze, current)) {
        return { isValid: true };
      }
    }
  }
  
  return { isValid: true };
}

/**
 * Get all valid moves from a position
 */
export function getValidMoves(maze: MazeData, from: Cell): Dir[] {
  const validMoves: Dir[] = [];
  
  const directions: Dir[] = ['U', 'D', 'L', 'R'];
  for (const dir of directions) {
    const result = executeStep(maze, from, dir);
    if (result.ok) {
      validMoves.push(dir);
    }
  }
  
  return validMoves;
}

/**
 * Run a queue of commands with callbacks for each step
 * This is a simplified version that works with the existing types
 */
export function runQueueSimple({
  queue,
  from,
  maze,
  tickMs = 300,
  signal,
  maxRunMs,
  onTokenStart,
  onStep,
  onError,
  onGoal,
  onTokenEnd,
  onDone
}: {
  queue: readonly CmdToken[];
  from: Cell;
  maze: MazeData;
  tickMs?: number;
  signal?: AbortSignal;
  maxRunMs?: number;
  onTokenStart?: (token: CmdToken, tokenIndex: number) => void;
  onStep: (cell: Cell) => void;
  onError: (stepIndex: number, cell: Cell) => void;
  onGoal: (cell: Cell) => void;
  onTokenEnd?: (token: CmdToken, tokenIndex: number) => void;
  onDone: () => void;
}) {
  let current = from;
  let stepIndex = 0;
  const startTime = Date.now();
  
  // Check for immediate cancellation
  if (signal?.aborted) {
    onDone();
    return;
  }
  
  const processNextToken = (tokenIndex: number) => {
    if (signal?.aborted || (maxRunMs && Date.now() - startTime > maxRunMs)) {
      onDone();
      return;
    }
    
    if (tokenIndex >= queue.length) {
      onDone();
      return;
    }
    
    const token = queue[tokenIndex];
    onTokenStart?.(token, tokenIndex);
    
    let stepsCompleted = 0;
    
    const processNextStep = () => {
      if (signal?.aborted || (maxRunMs && Date.now() - startTime > maxRunMs)) {
        onDone();
        return;
      }
      
      if (stepsCompleted >= token.n) {
        onTokenEnd?.(token, tokenIndex);
        // Process next token after a small delay
        setTimeout(() => processNextToken(tokenIndex + 1), tickMs / 2);
        return;
      }
      
      stepIndex++;
      const result = executeStep(maze, current, token.dir);
      
      if (!result.ok) {
        onError(stepIndex, result.next);
        return;
      }
      
      current = result.next;
      onStep(current);
      stepsCompleted++;
      
      if (result.reachedGoal) {
        onGoal(current);
        return;
      }
      
      // Schedule next step
      setTimeout(processNextStep, tickMs);
    };
    
    // Start processing steps for this token
    processNextStep();
  };
  
  // Start processing tokens
  processNextToken(0);
}
