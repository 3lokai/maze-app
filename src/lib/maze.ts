import type { MazeData, Cell, MazeHelpers } from '@/types/maze-app';
import type { MazeLayout, MazeEdgeLayout } from '@/types/maze';
import { MazeLayoutSchema } from '@/types/maze';

/**
 * Grid size constraints for performance optimization
 */
export const GRID_CONSTRAINTS = {
  MAX_WIDTH: 20,
  MAX_HEIGHT: 20,
  MAX_CELLS: 400, // 20×20
  PERFORMANCE_THRESHOLD: 15, // Switch to optimized mode for grids > 15×15
} as const;

/**
 * Performance monitoring utilities
 */
export const performanceUtils = {
  /**
   * Check if grid size requires performance optimizations
   */
  needsOptimization: (width: number, height: number): boolean => {
    return width > GRID_CONSTRAINTS.PERFORMANCE_THRESHOLD || 
           height > GRID_CONSTRAINTS.PERFORMANCE_THRESHOLD;
  },

  /**
   * Validate grid size constraints
   */
  validateGridSize: (width: number, height: number): { isValid: boolean; reason?: string } => {
    if (width > GRID_CONSTRAINTS.MAX_WIDTH || height > GRID_CONSTRAINTS.MAX_HEIGHT) {
      return { 
        isValid: false, 
        reason: `Grid size ${width}×${height} exceeds maximum allowed size of ${GRID_CONSTRAINTS.MAX_WIDTH}×${GRID_CONSTRAINTS.MAX_HEIGHT}` 
      };
    }
    
    const totalCells = width * height;
    if (totalCells > GRID_CONSTRAINTS.MAX_CELLS) {
      return { 
        isValid: false, 
        reason: `Total cells ${totalCells} exceeds maximum allowed ${GRID_CONSTRAINTS.MAX_CELLS}` 
      };
    }
    
    return { isValid: true };
  },

  /**
   * Get performance mode for grid size
   */
  getPerformanceMode: (width: number, height: number): 'standard' | 'optimized' => {
    return performanceUtils.needsOptimization(width, height) ? 'optimized' : 'standard';
  }
};

/**
 * Fixed 10×10 maze data with walls, start, and goal positions
 * Start: (0,0), Goal: (9,9)
 */
export const MAZE_DATA: MazeData = {
  width: 10,
  height: 10,
  start: { r: 0, c: 0 },
  goal: { r: 9, c: 9 },
  mazeId: 'fixed-10x10-v1',
  seed: 42,
  theme: {
    start: "🏠 Home",
    goal: "🌲 Forest"
  },
  graph: {
    // Row 0
    '0,0': new Set(['0,1', '1,0']),
    '0,1': new Set(['0,0', '0,2', '1,1']),
    '0,2': new Set(['0,1', '0,3']),
    '0,3': new Set(['0,2', '0,4', '1,3']),
    '0,4': new Set(['0,3', '0,5']),
    '0,5': new Set(['0,4', '0,6', '1,5']),
    '0,6': new Set(['0,5', '0,7']),
    '0,7': new Set(['0,6', '0,8', '1,7']),
    '0,8': new Set(['0,7', '0,9']),
    '0,9': new Set(['0,8', '1,9']),
    
    // Row 1
    '1,0': new Set(['0,0', '1,1', '2,0']),
    '1,1': new Set(['0,1', '1,0', '1,2']),
    '1,2': new Set(['1,1', '1,3', '2,2']),
    '1,3': new Set(['0,3', '1,2', '1,4']),
    '1,4': new Set(['1,3', '1,5', '2,4']),
    '1,5': new Set(['0,5', '1,4', '1,6']),
    '1,6': new Set(['1,5', '1,7', '2,6']),
    '1,7': new Set(['0,7', '1,6', '1,8']),
    '1,8': new Set(['1,7', '1,9', '2,8']),
    '1,9': new Set(['0,9', '1,8', '2,9']),
    
    // Row 2
    '2,0': new Set(['1,0', '2,1', '3,0']),
    '2,1': new Set(['2,0', '2,2']),
    '2,2': new Set(['1,2', '2,1', '2,3', '3,2']),
    '2,3': new Set(['2,2', '2,4']),
    '2,4': new Set(['1,4', '2,3', '2,5', '3,4']),
    '2,5': new Set(['2,4', '2,6']),
    '2,6': new Set(['1,6', '2,5', '2,7', '3,6']),
    '2,7': new Set(['2,6', '2,8']),
    '2,8': new Set(['1,8', '2,7', '2,9', '3,8']),
    '2,9': new Set(['1,9', '2,8', '3,9']),
    
    // Row 3
    '3,0': new Set(['2,0', '3,1', '4,0']),
    '3,1': new Set(['3,0', '3,2']),
    '3,2': new Set(['2,2', '3,1', '3,3', '4,2']),
    '3,3': new Set(['3,2', '3,4']),
    '3,4': new Set(['2,4', '3,3', '3,5', '4,4']),
    '3,5': new Set(['3,4', '3,6']),
    '3,6': new Set(['2,6', '3,5', '3,7', '4,6']),
    '3,7': new Set(['3,6', '3,8']),
    '3,8': new Set(['2,8', '3,7', '3,9', '4,8']),
    '3,9': new Set(['2,9', '3,8', '4,9']),
    
    // Row 4
    '4,0': new Set(['3,0', '4,1', '5,0']),
    '4,1': new Set(['4,0', '4,2']),
    '4,2': new Set(['3,2', '4,1', '4,3', '5,2']),
    '4,3': new Set(['4,2', '4,4']),
    '4,4': new Set(['3,4', '4,3', '4,5', '5,4']),
    '4,5': new Set(['4,4', '4,6']),
    '4,6': new Set(['3,6', '4,5', '4,7', '5,6']),
    '4,7': new Set(['4,6', '4,8']),
    '4,8': new Set(['3,8', '4,7', '4,9', '5,8']),
    '4,9': new Set(['3,9', '4,8', '5,9']),
    
    // Row 5
    '5,0': new Set(['4,0', '5,1', '6,0']),
    '5,1': new Set(['5,0', '5,2']),
    '5,2': new Set(['4,2', '5,1', '5,3', '6,2']),
    '5,3': new Set(['5,2', '5,4']),
    '5,4': new Set(['4,4', '5,3', '5,5', '6,4']),
    '5,5': new Set(['5,4', '5,6']),
    '5,6': new Set(['4,6', '5,5', '5,7', '6,6']),
    '5,7': new Set(['5,6', '5,8']),
    '5,8': new Set(['4,8', '5,7', '5,9', '6,8']),
    '5,9': new Set(['4,9', '5,8', '6,9']),
    
    // Row 6
    '6,0': new Set(['5,0', '6,1', '7,0']),
    '6,1': new Set(['6,0', '6,2']),
    '6,2': new Set(['5,2', '6,1', '6,3', '7,2']),
    '6,3': new Set(['6,2', '6,4']),
    '6,4': new Set(['5,4', '6,3', '6,5', '7,4']),
    '6,5': new Set(['6,4', '6,6']),
    '6,6': new Set(['5,6', '6,5', '6,7', '7,6']),
    '6,7': new Set(['6,6', '6,8']),
    '6,8': new Set(['5,8', '6,7', '6,9', '7,8']),
    '6,9': new Set(['5,9', '6,8', '7,9']),
    
    // Row 7
    '7,0': new Set(['6,0', '7,1', '8,0']),
    '7,1': new Set(['7,0', '7,2']),
    '7,2': new Set(['6,2', '7,1', '7,3', '8,2']),
    '7,3': new Set(['7,2', '7,4']),
    '7,4': new Set(['6,4', '7,3', '7,5', '8,4']),
    '7,5': new Set(['7,4', '7,6']),
    '7,6': new Set(['6,6', '7,5', '7,7', '8,6']),
    '7,7': new Set(['7,6', '7,8']),
    '7,8': new Set(['6,8', '7,7', '7,9', '8,8']),
    '7,9': new Set(['6,9', '7,8', '8,9']),
    
    // Row 8
    '8,0': new Set(['7,0', '8,1', '9,0']),
    '8,1': new Set(['8,0', '8,2']),
    '8,2': new Set(['7,2', '8,1', '8,3', '9,2']),
    '8,3': new Set(['8,2', '8,4']),
    '8,4': new Set(['7,4', '8,3', '8,5', '9,4']),
    '8,5': new Set(['8,4', '8,6']),
    '8,6': new Set(['7,6', '8,5', '8,7', '9,6']),
    '8,7': new Set(['8,6', '8,8']),
    '8,8': new Set(['7,8', '8,7', '8,9', '9,8']),
    '8,9': new Set(['7,9', '8,8', '9,9']),
    
    // Row 9
    '9,0': new Set(['8,0', '9,1']),
    '9,1': new Set(['9,0', '9,2']),
    '9,2': new Set(['8,2', '9,1', '9,3']),
    '9,3': new Set(['9,2', '9,4']),
    '9,4': new Set(['8,4', '9,3', '9,5']),
    '9,5': new Set(['9,4', '9,6']),
    '9,6': new Set(['8,6', '9,5', '9,7']),
    '9,7': new Set(['9,6', '9,8']),
    '9,8': new Set(['8,8', '9,7', '9,9']),
    '9,9': new Set(['8,9', '9,8']),
  }
};

/**
 * Maze helper functions
 */
export const mazeHelpers: MazeHelpers = {
  /**
   * Convert cell to string key
   */
  key: (cell: Cell): string => `${cell.r},${cell.c}`,
  
  /**
   * Parse string key to cell
   */
  parseKey: (k: string): Cell => {
    const [r, c] = k.split(',').map(Number);
    return { r, c };
  },
  
  /**
   * Get valid neighbors for a cell
   */
  neighbors: (maze: MazeData, cell: Cell): Cell[] => {
    const key = mazeHelpers.key(cell);
    const neighborKeys = maze.graph[key];
    if (!neighborKeys) return [];
    
    return Array.from(neighborKeys).map(mazeHelpers.parseKey);
  },
  
  /**
   * Check if cell is within maze bounds
   */
  inBounds: (maze: MazeData, cell: Cell): boolean => {
    return cell.r >= 0 && cell.r < maze.height && 
           cell.c >= 0 && cell.c < maze.width;
  }
};

/**
 * Check if a move is valid (no wall collision)
 */
export function isValidMove(maze: MazeData, from: Cell, to: Cell): boolean {
  if (!mazeHelpers.inBounds(maze, to)) return false;
  
  const fromKey = mazeHelpers.key(from);
  const toKey = mazeHelpers.key(to);
  
  const neighbors = maze.graph[fromKey];
  return neighbors ? neighbors.has(toKey) : false;
}

/**
 * Get cell type (wall, start, goal, or path)
 */
export function getCellType(maze: MazeData, cell: Cell): 'wall' | 'start' | 'goal' | 'path' {
  if (!mazeHelpers.inBounds(maze, cell)) return 'wall';
  
  if (cell.r === maze.start.r && cell.c === maze.start.c) return 'start';
  if (cell.r === maze.goal.r && cell.c === maze.goal.c) return 'goal';
  
  // Check if cell exists in graph and has neighbors (is part of the path)
  const key = mazeHelpers.key(cell);
  const neighbors = maze.graph[key];
  return neighbors && neighbors.size > 0 ? 'path' : 'wall';
}

/**
 * Get all cells of a specific type
 */
export function getCellsByType(maze: MazeData, type: 'wall' | 'start' | 'goal' | 'path'): Cell[] {
  const cells: Cell[] = [];
  
  for (let r = 0; r < maze.height; r++) {
    for (let c = 0; c < maze.width; c++) {
      const cell = { r, c };
      if (getCellType(maze, cell) === type) {
        cells.push(cell);
      }
    }
  }
  
  return cells;
}

/**
 * Calculate Manhattan distance between two cells
 */
export function manhattanDistance(a: Cell, b: Cell): number {
  return Math.abs(a.r - b.r) + Math.abs(a.c - b.c);
}

/**
 * Check if a cell is the goal
 */
export function isGoal(maze: MazeData, cell: Cell): boolean {
  return cell.r === maze.goal.r && cell.c === maze.goal.c;
}

/**
 * Check if a cell is the start
 */
export function isStart(maze: MazeData, cell: Cell): boolean {
  return cell.r === maze.start.r && cell.c === maze.start.c;
}

/**
 * Compile maze layout from JSON into MazeData format
 * Converts path list or edge list to adjacency graph
 */
export function compileLayout(layout: MazeLayout | MazeEdgeLayout): MazeData {
  const graph: Record<string, Set<string>> = {};
  
  // Build adjacency graph from path or edges
  if ('path' in layout) {
    // Path list format - connect consecutive cells
    const pathCells = layout.path;
    for (let i = 0; i < pathCells.length; i++) {
      const current = pathCells[i];
      const next = pathCells[i + 1];
      
      // Initialize current cell if not exists
      if (!graph[current]) {
        graph[current] = new Set();
      }
      
      if (next) {
        // Initialize next cell if not exists
        if (!graph[next]) {
          graph[next] = new Set();
        }
        
        // Add bidirectional connection
        graph[current].add(next);
        graph[next].add(current);
      }
    }
    
    // Add connection from last path cell to goal if goal is not in path
    const lastPathCell = pathCells[pathCells.length - 1];
    const goalKey = `${layout.goal.r},${layout.goal.c}`;
    
    if (lastPathCell !== goalKey) {
      // Initialize goal cell if not exists
      if (!graph[goalKey]) {
        graph[goalKey] = new Set();
      }
      
      // Add bidirectional connection from last path cell to goal
      graph[lastPathCell].add(goalKey);
      graph[goalKey].add(lastPathCell);
    }
  } else if ('edges' in layout) {
    // Edge list format - connect specified edges
    for (const edge of layout.edges) {
      // Initialize cells if they don't exist
      if (!graph[edge.from]) {
        graph[edge.from] = new Set();
      }
      if (!graph[edge.to]) {
        graph[edge.to] = new Set();
      }
      
      graph[edge.from].add(edge.to);
      graph[edge.to].add(edge.from);
    }
  }
  
  return {
    width: layout.width,
    height: layout.height,
    start: layout.start,
    goal: layout.goal,
    mazeId: layout.name || 'compiled-layout',
    theme: layout.theme,
    graph
  };
}

/**
 * Load and compile maze layout from JSON file
 */
export async function loadMazeLayout(filename: string): Promise<MazeData> {
  try {
    const response = await fetch(`/data/layouts/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to load layout: ${response.statusText}`);
    }
    
    const json = await response.json();
    const layout = MazeLayoutSchema.parse(json);
    return compileLayout(layout);
  } catch (error) {
    console.error('Error loading maze layout:', error);
    throw error;
  }
}

/**
 * Debug function to visualize the maze graph
 * Useful for verifying constrained movement
 */
export function debugMazeGraph(maze: MazeData): void {
  console.log('=== Maze Debug Info ===');
  console.log(`Dimensions: ${maze.width}×${maze.height}`);
  console.log(`Start: (${maze.start.r}, ${maze.start.c})`);
  console.log(`Goal: (${maze.goal.r}, ${maze.goal.c})`);
  console.log(`Maze ID: ${maze.mazeId}`);
  
  console.log('\n=== Path Cells ===');
  const pathCells = getCellsByType(maze, 'path');
  console.log(`Total path cells: ${pathCells.length}`);
  
  console.log('\n=== Adjacency Graph ===');
  for (let r = 0; r < maze.height; r++) {
    let row = '';
    for (let c = 0; c < maze.width; c++) {
      const key = `${r},${c}`;
      const neighbors = maze.graph[key];
      if (neighbors && neighbors.size > 0) {
        row += '█'; // Path cell with connections
      } else {
        row += '·'; // Wall or empty cell
      }
    }
    console.log(row);
  }
  
  console.log('\n=== Valid Moves from Start ===');
  const startNeighbors = mazeHelpers.neighbors(maze, maze.start);
  console.log(`From start (${maze.start.r}, ${maze.start.c}):`, startNeighbors);
  
  console.log('=== End Debug Info ===');
}
