import { useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import type { Cell, PlayerId, MazeData } from '@/types/maze-app';
import { createPathConstraints, validatePathMove } from '@/lib/executor';

interface CollisionState {
  isColliding: boolean;
  collisionCell: Cell | null;
  collisionStep: number | null;
}

export function useCollision(maze?: MazeData) {
  const [collisionState, setCollisionState] = useState<CollisionState>({
    isColliding: false,
    collisionCell: null,
    collisionStep: null,
  });

  const collisionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Create path constraints if maze is provided
  const pathConstraints = maze ? createPathConstraints(maze) : null;

  const triggerCollision = useCallback((
    cell: Cell, 
    stepIndex: number, 
    player: PlayerId,
    onCrashIncrement?: (player: PlayerId) => void,
    reason?: string
  ) => {
    // Clear any existing timeout
    if (collisionTimeoutRef.current) {
      clearTimeout(collisionTimeoutRef.current);
    }

    // Set collision state
    setCollisionState({
      isColliding: true,
      collisionCell: cell,
      collisionStep: stepIndex,
    });

    // Show toast notification with custom reason or default message
    const message = reason || `Player ${player} bumped wall at step ${stepIndex}!`;
    toast.error(message, {
      description: `Hit wall at position (${cell.r}, ${cell.c})`,
      duration: 3000,
    });

    // Increment crash counter
    onCrashIncrement?.(player);

    // Clear collision state after animation completes
    collisionTimeoutRef.current = setTimeout(() => {
      setCollisionState({
        isColliding: false,
        collisionCell: null,
        collisionStep: null,
      });
    }, 1000); // Match the duration of our longest animation

  }, []);

  const validateMove = useCallback((
    from: Cell,
    to: Cell
  ): boolean => {
    if (!pathConstraints) return true; // No constraints, allow all moves
    
    const validation = validatePathMove(pathConstraints, from, to);
    return validation.isValid;
  }, [pathConstraints]);

  const clearCollision = useCallback(() => {
    if (collisionTimeoutRef.current) {
      clearTimeout(collisionTimeoutRef.current);
    }
    setCollisionState({
      isColliding: false,
      collisionCell: null,
      collisionStep: null,
    });
  }, []);

  const isCollisionCell = useCallback((cell: Cell): boolean => {
    return collisionState.isColliding && 
           collisionState.collisionCell !== null &&
           collisionState.collisionCell.r === cell.r && 
           collisionState.collisionCell.c === cell.c;
  }, [collisionState]);

  return {
    collisionState,
    triggerCollision,
    clearCollision,
    isCollisionCell,
    validateMove,
    pathConstraints,
  };
}
