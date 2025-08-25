"use client";

import { useState, useEffect, useRef } from 'react';
import { performanceMonitor } from '@/lib/utils';
import { performanceUtils } from '@/lib/maze';
import type { MazeData } from '@/types/maze-app';

interface PerformanceMonitorProps {
  maze: MazeData;
  isVisible?: boolean;
  className?: string;
}

interface EnhancedPerformanceStats {
  frameTime: {
    current: number;
    avg: number;
    max: number;
    samples: number;
    is60fps: boolean;
  };
  memory: {
    current: number | null;
    avg: number;
    max: number;
    samples: number;
  } | null;
  confetti: {
    avg: number;
    max: number;
    samples: number;
    isUnder10ms: boolean;
  };
  trail: {
    avg: number;
    max: number;
    samples: number;
    isUnder10ms: boolean;
  };
  warnings: string[];
}

export function PerformanceMonitor({ 
  maze, 
  isVisible = false, 
  className = "" 
}: PerformanceMonitorProps) {
  const [stats, setStats] = useState<EnhancedPerformanceStats>({
    frameTime: {
      current: 0,
      avg: 0,
      max: 0,
      samples: 0,
      is60fps: true,
    },
    memory: null,
    confetti: {
      avg: 0,
      max: 0,
      samples: 0,
      isUnder10ms: true,
    },
    trail: {
      avg: 0,
      max: 0,
      samples: 0,
      isUnder10ms: true,
    },
    warnings: [],
  });

  const enhancedMonitorRef = useRef(performanceMonitor.createEnhancedMonitor());
  const lastFrameTimeRef = useRef(performance.now());
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isVisible) return;

    const updateStats = () => {
      // Check for memory leaks
      const hasMemoryLeak = enhancedMonitorRef.current.checkMemoryLeak();
      
      // Get comprehensive performance stats
      const performanceStats = enhancedMonitorRef.current.getPerformanceStats();
      
      // Generate warnings based on performance thresholds
      const warnings: string[] = [];
      
      if (!performanceStats.frameTime.is60fps) {
        warnings.push(`Frame time ${performanceStats.frameTime.avg.toFixed(1)}ms exceeds 16ms budget`);
      }
      
      if (performanceStats.memory && performanceStats.memory.avg > 50) {
        warnings.push(`Memory usage ${performanceStats.memory.avg.toFixed(1)}MB exceeds 50MB target`);
      }
      
      if (!performanceStats.confetti.isUnder10ms && performanceStats.confetti.samples > 0) {
        warnings.push(`Confetti rendering ${performanceStats.confetti.avg.toFixed(1)}ms exceeds 10ms target`);
      }
      
      if (!performanceStats.trail.isUnder10ms && performanceStats.trail.samples > 0) {
        warnings.push(`Trail rendering ${performanceStats.trail.avg.toFixed(1)}ms exceeds 10ms target`);
      }
      
      if (hasMemoryLeak) {
        warnings.push('Potential memory leak detected');
      }

      setStats({
        ...performanceStats,
        warnings,
      });
    };

    // Update stats every second
    const interval = setInterval(updateStats, 1000);
    
    // Monitor frame times with requestAnimationFrame
    const measureFrameTime = () => {
      const now = performance.now();
      const frameTime = now - lastFrameTimeRef.current;
      
      enhancedMonitorRef.current.recordFrameTime(frameTime);
      lastFrameTimeRef.current = now;
      
      animationFrameRef.current = requestAnimationFrame(measureFrameTime);
    };

    animationFrameRef.current = requestAnimationFrame(measureFrameTime);

    return () => {
      clearInterval(interval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible]);

  // Expose monitor methods for external use
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as { performanceMonitor?: {
        recordConfettiTime: (time: number) => void;
        recordTrailRenderTime: (time: number) => void;
        getStats: () => ReturnType<typeof enhancedMonitorRef.current.getPerformanceStats>;
        clear: () => void;
      } }).performanceMonitor = {
        recordConfettiTime: (time: number) => enhancedMonitorRef.current.recordConfettiTime(time),
        recordTrailRenderTime: (time: number) => enhancedMonitorRef.current.recordTrailRenderTime(time),
        getStats: () => enhancedMonitorRef.current.getPerformanceStats(),
        clear: () => enhancedMonitorRef.current.clear(),
      };
    }
  }, []);

  if (!isVisible) return null;

  const performanceMode = performanceUtils.getPerformanceMode(maze.width, maze.height);
  const gridSize = `${maze.width}×${maze.height}`;

  return (
    <div className={`fixed bottom-4 right-4 bg-background border border-border rounded-lg p-3 shadow-lg z-50 max-w-sm ${className}`}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Performance Monitor</h3>
          <span className={`text-xs px-2 py-1 rounded ${
            performanceMode === 'optimized' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {performanceMode}
          </span>
        </div>
        
        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span>Grid:</span>
            <span className="font-mono">{gridSize}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Frame Time:</span>
            <span className={`font-mono ${stats.frameTime.is60fps ? 'text-green-600' : 'text-red-600'}`}>
              {stats.frameTime.current.toFixed(1)}ms (avg: {stats.frameTime.avg.toFixed(1)}ms)
            </span>
          </div>
          
          {stats.memory && (
            <div className="flex justify-between">
              <span>Memory:</span>
              <span className={`font-mono ${stats.memory.avg <= 50 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.memory.current?.toFixed(1)}MB (avg: {stats.memory.avg.toFixed(1)}MB)
              </span>
            </div>
          )}
          
          {stats.confetti.samples > 0 && (
            <div className="flex justify-between">
              <span>Confetti:</span>
              <span className={`font-mono ${stats.confetti.isUnder10ms ? 'text-green-600' : 'text-red-600'}`}>
                {stats.confetti.avg.toFixed(1)}ms
              </span>
            </div>
          )}
          
          {stats.trail.samples > 0 && (
            <div className="flex justify-between">
              <span>Trail:</span>
              <span className={`font-mono ${stats.trail.isUnder10ms ? 'text-green-600' : 'text-red-600'}`}>
                {stats.trail.avg.toFixed(1)}ms
              </span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span>Samples:</span>
            <span className="font-mono">{stats.frameTime.samples}</span>
          </div>
        </div>
        
        {stats.warnings.length > 0 && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs">
            <div className="font-semibold text-red-800 mb-1">Warnings:</div>
            {stats.warnings.map((warning, index) => (
              <div key={index} className="text-red-700">• {warning}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
