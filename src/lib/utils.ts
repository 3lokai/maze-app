import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Magnitude1to10 } from '@/types/maze-app';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Narrow number to Magnitude1to10 at runtime */
export function asMagnitude1to10(n: number): Magnitude1to10 {
  if (Number.isInteger(n) && n >= 1 && n <= 10) return n as Magnitude1to10;
  throw new Error(`Invalid magnitude ${n}; expected integer 1..10`);
}

/**
 * Performance monitoring utilities for larger grids
 */
export const performanceMonitor = {
  /**
   * Measure execution time of a function
   */
  measureTime: <T>(fn: () => T, label?: string): T => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    if (label) {
      console.log(`${label}: ${(end - start).toFixed(2)}ms`);
    }
    
    return result;
  },

  /**
   * Check if frame time is within budget (16ms for 60fps)
   */
  isFrameTimeValid: (frameTime: number): boolean => {
    return frameTime <= 16;
  },

  /**
   * Get memory usage if available
   */
  getMemoryUsage: (): number | null => {
    if ('memory' in performance) {
      return ((performance as { memory: { usedJSHeapSize: number } }).memory.usedJSHeapSize) / 1024 / 1024; // MB
    }
    return null;
  },

  /**
   * Monitor memory usage over time
   */
  createMemoryMonitor: () => {
    const measurements: number[] = [];
    
    return {
      measure: () => {
        const usage = performanceMonitor.getMemoryUsage();
        if (usage !== null) {
          measurements.push(usage);
        }
      },
      getStats: () => {
        if (measurements.length === 0) return null;
        
        const sorted = [...measurements].sort((a, b) => a - b);
        return {
          min: sorted[0],
          max: sorted[sorted.length - 1],
          avg: measurements.reduce((sum, val) => sum + val, 0) / measurements.length,
          samples: measurements.length,
        };
      },
      clear: () => {
        measurements.length = 0;
      },
    };
  },
};

/**
 * Grid size utilities
 */
export const gridUtils = {
  /**
   * Calculate optimal cell size for responsive design
   */
  getOptimalCellSize: (containerWidth: number, containerHeight: number, gridWidth: number, gridHeight: number): number => {
    const maxCellWidth = containerWidth / gridWidth;
    const maxCellHeight = containerHeight / gridHeight;
    return Math.min(maxCellWidth, maxCellHeight);
  },

  /**
   * Check if grid needs viewport management
   */
  needsViewportManagement: (gridWidth: number, gridHeight: number): boolean => {
    return gridWidth > 15 || gridHeight > 15;
  },

  /**
   * Calculate viewport bounds for follow-cam
   */
  calculateViewportBounds: (
    playerPosition: { r: number; c: number },
    gridWidth: number,
    gridHeight: number,
    viewportWidth: number,
    viewportHeight: number
  ) => {
    const cellSize = Math.min(viewportWidth / gridWidth, viewportHeight / gridHeight);
    const playerX = playerPosition.c * cellSize;
    const playerY = playerPosition.r * cellSize;
    
    return {
      scrollX: Math.max(0, playerX - viewportWidth / 2),
      scrollY: Math.max(0, playerY - viewportHeight / 2),
    };
  },
};
