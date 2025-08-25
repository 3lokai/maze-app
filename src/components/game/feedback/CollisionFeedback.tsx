"use client";

import { useEffect } from 'react';
import type { Cell } from '@/types/maze-app';

interface CollisionFeedbackProps {
  isColliding: boolean;
  collisionCell: Cell | null;
  className?: string;
}

export function CollisionFeedback({ 
  isColliding, 
  collisionCell, 
  className = "" 
}: CollisionFeedbackProps) {
  useEffect(() => {
    if (isColliding && collisionCell) {
      // Add haptic feedback if supported
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  }, [isColliding, collisionCell]);

  if (!isColliding || !collisionCell) {
    return null;
  }

  return (
    <div 
      className={`
        absolute inset-0 pointer-events-none z-10
        collision-cell
        ${className}
      `}
      aria-live="polite"
      role="alert"
    >
      {/* Visual collision indicator */}
      <div className="w-full h-full bg-red-500/20 border-2 border-red-500 rounded animate-pulse-error" />
    </div>
  );
}
