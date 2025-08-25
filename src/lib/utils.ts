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

  /**
   * Enhanced performance monitor for 20×20 grid optimization
   */
  createEnhancedMonitor: () => {
    const frameTimes: number[] = [];
    const memorySnapshots: number[] = [];
    const confettiTimes: number[] = [];
    const trailRenderTimes: number[] = [];
    let lastMemoryCheck = performance.now();
    const memoryLeakThreshold = 10; // MB increase threshold

    return {
      // Frame time monitoring
      recordFrameTime: (frameTime: number) => {
        frameTimes.push(frameTime);
        if (frameTimes.length > 60) { // Keep last 60 frames (1 second at 60fps)
          frameTimes.shift();
        }
      },

      // Memory leak detection
      checkMemoryLeak: () => {
        const now = performance.now();
        if (now - lastMemoryCheck > 5000) { // Check every 5 seconds
          const currentMemory = performanceMonitor.getMemoryUsage();
          if (currentMemory !== null) {
            memorySnapshots.push(currentMemory);
            if (memorySnapshots.length > 12) { // Keep last 12 snapshots (1 minute)
              memorySnapshots.shift();
            }

            // Check for memory leak (consistent increase over time)
            if (memorySnapshots.length >= 6) {
              const recent = memorySnapshots.slice(-6);
              const older = memorySnapshots.slice(0, 6);
              const recentAvg = recent.reduce((sum, val) => sum + val, 0) / recent.length;
              const olderAvg = older.reduce((sum, val) => sum + val, 0) / older.length;
              
              if (recentAvg - olderAvg > memoryLeakThreshold) {
                console.warn(`Potential memory leak detected: ${(recentAvg - olderAvg).toFixed(2)}MB increase`);
                return true;
              }
            }
          }
          lastMemoryCheck = now;
        }
        return false;
      },

      // Confetti performance monitoring
      recordConfettiTime: (renderTime: number) => {
        confettiTimes.push(renderTime);
        if (confettiTimes.length > 10) {
          confettiTimes.shift();
        }
      },

      // Trail rendering performance
      recordTrailRenderTime: (renderTime: number) => {
        trailRenderTimes.push(renderTime);
        if (trailRenderTimes.length > 30) {
          trailRenderTimes.shift();
        }
      },

      // Get comprehensive performance stats
      getPerformanceStats: () => {
        const avgFrameTime = frameTimes.length > 0 
          ? frameTimes.reduce((sum, time) => sum + time, 0) / frameTimes.length 
          : 0;
        
        const avgConfettiTime = confettiTimes.length > 0
          ? confettiTimes.reduce((sum, time) => sum + time, 0) / confettiTimes.length
          : 0;

        const avgTrailTime = trailRenderTimes.length > 0
          ? trailRenderTimes.reduce((sum, time) => sum + time, 0) / trailRenderTimes.length
          : 0;

        const currentMemory = performanceMonitor.getMemoryUsage();
        const memoryStats = memorySnapshots.length > 0 ? {
          current: currentMemory,
          avg: memorySnapshots.reduce((sum, val) => sum + val, 0) / memorySnapshots.length,
          max: Math.max(...memorySnapshots),
          samples: memorySnapshots.length,
        } : null;

        return {
          frameTime: {
            current: frameTimes[frameTimes.length - 1] || 0,
            avg: avgFrameTime,
            max: frameTimes.length > 0 ? Math.max(...frameTimes) : 0,
            samples: frameTimes.length,
            is60fps: avgFrameTime <= 16,
          },
          memory: memoryStats,
          confetti: {
            avg: avgConfettiTime,
            max: confettiTimes.length > 0 ? Math.max(...confettiTimes) : 0,
            samples: confettiTimes.length,
            isUnder10ms: avgConfettiTime < 10,
          },
          trail: {
            avg: avgTrailTime,
            max: trailRenderTimes.length > 0 ? Math.max(...trailRenderTimes) : 0,
            samples: trailRenderTimes.length,
            isUnder10ms: avgTrailTime < 10,
          },
          warnings: [] as string[],
        };
      },

      // Clear all measurements
      clear: () => {
        frameTimes.length = 0;
        memorySnapshots.length = 0;
        confettiTimes.length = 0;
        trailRenderTimes.length = 0;
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
    
    // Center on cell midpoint
    const playerX = playerPosition.c * cellSize + cellSize / 2;
    const playerY = playerPosition.r * cellSize + cellSize / 2;
    
    // Calculate desired scroll positions to center player
    const desiredScrollX = playerX - viewportWidth / 2;
    const desiredScrollY = playerY - viewportHeight / 2;
    
    // Calculate content dimensions
    const contentWidth = gridWidth * cellSize;
    const contentHeight = gridHeight * cellSize;
    
    // Clamp scroll positions to valid range
    const scrollX = Math.max(0, Math.min(desiredScrollX, contentWidth - viewportWidth));
    const scrollY = Math.max(0, Math.min(desiredScrollY, contentHeight - viewportHeight));
    
    return {
      scrollX,
      scrollY,
    };
  },
};
