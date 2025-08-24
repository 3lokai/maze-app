import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';

export function useTurnManagement() {
  const {
    currentPlayer,
    status,
    winner,
    switchTurn,
  } = useGameStore();

  // Track previous status to detect transitions
  const prevStatusRef = useRef(status);

  // Auto-switch turn when execution completes
  useEffect(() => {
    const prevStatus = prevStatusRef.current;
    prevStatusRef.current = status;

    // Switch turn on these conditions:
    // 1. Collision occurred (status is 'hitWall')
    // 2. Goal reached (status is 'reachedGoal')
    // 3. Execution completed normally (status changed from 'executing' to 'idle')
    if (
      (status === 'hitWall' || status === 'reachedGoal') &&
      !winner
    ) {
      // Small delay to allow for visual feedback
      const timer = setTimeout(() => {
        switchTurn();
      }, 1000);

      return () => clearTimeout(timer);
    }

    // Handle normal execution completion (executing -> idle)
    if (prevStatus === 'executing' && status === 'idle' && !winner) {
      // Small delay to allow for visual feedback
      const timer = setTimeout(() => {
        switchTurn();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [status, winner, switchTurn]);

  return {
    currentPlayer,
    status,
    switchTurn,
  };
}
