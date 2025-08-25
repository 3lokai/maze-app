import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '@/store/gameStore';
import type { Cell, PlayerId } from '@/types/maze-app';
import type { MazeData } from '@/types/maze-app';

interface CameraController {
  startCameraUpdate: (maze: MazeData, positions: Partial<Record<PlayerId, Cell>>) => void;
  stopCameraUpdate: () => void;
  getViewportTransform: () => string;
  resetCamera: () => void;
}

/**
 * Camera controller hook for follow-cam functionality
 * Implements smooth panning with 60fps performance as per ADR-001
 */
export function useCamera(): CameraController {
  const { viewport, cameraConfig, setViewport } = useGameStore();
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastUpdateRef = useRef<number>(0);
  
  // Use refs to avoid dependency issues in updateCamera
  const viewportRef = useRef(viewport);
  const cameraConfigRef = useRef(cameraConfig);
  
  // Update refs when values change
  useEffect(() => {
    viewportRef.current = viewport;
  }, [viewport]);
  
  useEffect(() => {
    cameraConfigRef.current = cameraConfig;
  }, [cameraConfig]);

  // Calculate optimal viewport position for a player
  const calculateOptimalPosition = useCallback((
    maze: MazeData,
    playerPosition: Cell,
    viewportWidth: number,
    viewportHeight: number
  ): { scrollX: number; scrollY: number } => {
    // Calculate cell size based on viewport and maze dimensions
    const cellWidth = viewportWidth / maze.width;
    const cellHeight = viewportHeight / maze.height;
    
    // Calculate player center position in pixels
    const playerCenterX = (playerPosition.c + 0.5) * cellWidth;
    const playerCenterY = (playerPosition.r + 0.5) * cellHeight;
    
    // Calculate viewport center
    const viewportCenterX = viewportWidth / 2;
    const viewportCenterY = viewportHeight / 2;
    
    // Calculate scroll position to center player (lead third for better UX)
    const targetScrollX = playerCenterX - viewportCenterX * 0.67; // Lead third
    const targetScrollY = playerCenterY - viewportCenterY * 0.67;
    
    // Apply boundary constraints
    const maxScrollX = Math.max(0, maze.width * cellWidth - viewportWidth);
    const maxScrollY = Math.max(0, maze.height * cellHeight - viewportHeight);
    
    return {
      scrollX: Math.max(0, Math.min(targetScrollX, maxScrollX)),
      scrollY: Math.max(0, Math.min(targetScrollY, maxScrollY))
    };
  }, []);

  // Smooth interpolation between current and target positions
  const interpolatePosition = useCallback((
    current: number,
    target: number,
    speed: number,
    deltaTime: number
  ): number => {
    const frameSpeed = Math.min(speed * (deltaTime / 16), 1); // Normalize to 60fps
    return current + (target - current) * frameSpeed;
  }, []);

  // Start camera update loop
  const startCameraUpdate = useCallback((
    maze: MazeData,
    positions: Partial<Record<PlayerId, Cell>>
  ) => {
    // Cancel any existing animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const updateLoop = () => {
      const currentViewport = viewportRef.current;
      const currentCameraConfig = cameraConfigRef.current;
      
      if (!currentViewport.isFollowing || !currentViewport.targetPlayer) {
        return;
      }

      const playerPosition = positions[currentViewport.targetPlayer];
      if (!playerPosition) {
        return;
      }

      const now = performance.now();
      const deltaTime = now - lastUpdateRef.current;
      lastUpdateRef.current = now;

      // Calculate target position
      const targetPosition = calculateOptimalPosition(
        maze,
        playerPosition,
        currentViewport.width,
        currentViewport.height
      );

      // Apply smooth interpolation
      const newScrollX = interpolatePosition(
        currentViewport.scrollX,
        targetPosition.scrollX,
        currentCameraConfig.followSpeed,
        deltaTime
      );

      const newScrollY = interpolatePosition(
        currentViewport.scrollY,
        targetPosition.scrollY,
        currentCameraConfig.followSpeed,
        deltaTime
      );

      // Update viewport position
      setViewport({
        scrollX: newScrollX,
        scrollY: newScrollY
      });

      // Schedule next frame
      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };

    // Start the update loop
    updateLoop();
  }, [setViewport, calculateOptimalPosition, interpolatePosition]);

  // Stop camera update loop
  const stopCameraUpdate = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
  }, []);

  // Get CSS transform for viewport positioning
  const getViewportTransform = useCallback((): string => {
    return `translate3d(${-viewport.scrollX}px, ${-viewport.scrollY}px, 0)`;
  }, [viewport.scrollX, viewport.scrollY]);

  // Reset camera to initial position
  const resetCamera = useCallback(() => {
    setViewport({ scrollX: 0, scrollY: 0 });
  }, [setViewport]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    startCameraUpdate,
    stopCameraUpdate,
    getViewportTransform,
    resetCamera
  };
}
