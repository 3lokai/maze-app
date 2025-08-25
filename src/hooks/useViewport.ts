import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '@/store/gameStore';
import type { MazeData } from '@/types/maze-app';

interface ViewportInfo {
  width: number;
  height: number;
  isLargeGrid: boolean;
  needsViewport: boolean;
}

/**
 * Viewport management hook for responsive viewport handling
 * Automatically detects viewport size and enables viewport management for large grids
 */
export function useViewport(maze: MazeData): ViewportInfo {
  const { viewport, updateViewportSize } = useGameStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if grid is large enough to need viewport management
  const isLargeGrid = maze.width > 15 || maze.height > 15;
  const needsViewport = isLargeGrid;

  // Update viewport size when container size changes
  const updateSize = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      updateViewportSize(rect.width, rect.height);
    }
  }, [updateViewportSize]);

  // Set up resize observer for automatic viewport size updates
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserver.observe(containerRef.current);

    // Initial size update
    updateSize();

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateSize]);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      updateSize();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateSize]);

  return {
    width: viewport.width,
    height: viewport.height,
    isLargeGrid,
    needsViewport
  };
}

/**
 * Hook to get container ref for viewport management
 */
export function useViewportContainer() {
  const { updateViewportSize } = useGameStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSize = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      updateViewportSize(rect.width, rect.height);
    }
  }, [updateViewportSize]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserver.observe(containerRef.current);
    updateSize(); // Initial size

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateSize]);

  return containerRef;
}
