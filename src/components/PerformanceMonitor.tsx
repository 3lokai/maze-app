import { useEffect, useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { performanceMonitor } from '@/lib/utils';
import { performanceUtils } from '@/lib/maze';
import type { MazeData } from '@/types/maze-app';

interface PerformanceMonitorProps {
  maze: MazeData;
  isVisible?: boolean;
  className?: string;
}

interface PerformanceStats {
  frameTime: number;
  memoryUsage: number | null;
  gridSize: string;
  performanceMode: 'standard' | 'optimized';
  warnings: string[];
}

export function PerformanceMonitor({ 
  maze, 
  isVisible = false, 
  className = "" 
}: PerformanceMonitorProps) {
  const [stats, setStats] = useState<PerformanceStats>({
    frameTime: 0,
    memoryUsage: null,
    gridSize: `${maze.width}×${maze.height}`,
    performanceMode: performanceUtils.getPerformanceMode(maze.width, maze.height),
    warnings: [],
  });

  const memoryMonitorRef = useRef(performanceMonitor.createMemoryMonitor());
  const frameTimeRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef(performance.now());

  useEffect(() => {
    if (!isVisible) return;

    const updateStats = () => {
      // Measure memory usage
      memoryMonitorRef.current.measure();
      const memoryStats = memoryMonitorRef.current.getStats();
      
      // Calculate average frame time from recent measurements
      const recentFrameTimes = frameTimeRef.current.slice(-10);
      const avgFrameTime = recentFrameTimes.length > 0 
        ? recentFrameTimes.reduce((sum, time) => sum + time, 0) / recentFrameTimes.length 
        : 0;

      // Check for performance warnings
      const warnings: string[] = [];
      
      if (avgFrameTime > 16) {
        warnings.push(`Frame time ${avgFrameTime.toFixed(1)}ms exceeds 16ms budget`);
      }
      
      if (memoryStats && memoryStats.avg > 50) {
        warnings.push(`Memory usage ${memoryStats.avg.toFixed(1)}MB exceeds 50MB target`);
      }

      setStats({
        frameTime: avgFrameTime,
        memoryUsage: memoryStats?.avg || null,
        gridSize: `${maze.width}×${maze.height}`,
        performanceMode: performanceUtils.getPerformanceMode(maze.width, maze.height),
        warnings,
      });
    };

    // Update stats every second
    const interval = setInterval(updateStats, 1000);
    
    // Monitor frame times
    const measureFrameTime = () => {
      const now = performance.now();
      const frameTime = now - lastFrameTimeRef.current;
      
      frameTimeRef.current.push(frameTime);
      
      // Keep only last 30 frame time measurements
      if (frameTimeRef.current.length > 30) {
        frameTimeRef.current.shift();
      }
      
      lastFrameTimeRef.current = now;
      requestAnimationFrame(measureFrameTime);
    };

    requestAnimationFrame(measureFrameTime);

    return () => {
      clearInterval(interval);
    };
  }, [isVisible, maze.width, maze.height]);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 bg-background border border-border rounded-lg p-3 shadow-lg z-50 ${className}`}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Performance Monitor</span>
          <Badge variant={stats.performanceMode === 'optimized' ? 'default' : 'secondary'}>
            {stats.performanceMode}
          </Badge>
        </div>
        
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span>Grid Size:</span>
            <span className="font-mono">{stats.gridSize}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Frame Time:</span>
            <span className={`font-mono ${stats.frameTime > 16 ? 'text-orange-600' : 'text-green-600'}`}>
              {stats.frameTime.toFixed(1)}ms
            </span>
          </div>
          
          {stats.memoryUsage !== null && (
            <div className="flex justify-between">
              <span>Memory:</span>
              <span className={`font-mono ${stats.memoryUsage > 50 ? 'text-orange-600' : 'text-green-600'}`}>
                {stats.memoryUsage.toFixed(1)}MB
              </span>
            </div>
          )}
        </div>

        {stats.warnings.length > 0 && (
          <div className="mt-2 space-y-1">
            {stats.warnings.map((warning, index) => (
              <div key={index} className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                ⚠️ {warning}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
