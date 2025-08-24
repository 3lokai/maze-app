import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import { MAZE_DATA } from '@/lib/maze';
import type { PlayerId, MazeData } from '@/types/maze-app';

export function useCelebration(maze?: MazeData) {
  const {
    positions,
    winner,
    showCelebration,
    setWinner,
    incrementWin,
    setShowCelebration,
  } = useGameStore();

  const hasTriggeredCelebration = useRef<Record<PlayerId, boolean>>({
    1: false,
    2: false,
  });

  // Check for goal achievement
  useEffect(() => {
    const currentMaze = maze || MAZE_DATA;
    const goalCell = currentMaze.goal;
    
    // Check if any player reached the goal
    Object.entries(positions).forEach(([playerId, position]) => {
      const player = Number(playerId) as PlayerId;
      
      if (
        position.r === goalCell.r && 
        position.c === goalCell.c && 
        !hasTriggeredCelebration.current[player] &&
        !winner
      ) {
        // First player to reach goal wins
        setWinner(player);
        incrementWin(player);
        setShowCelebration(true);
        hasTriggeredCelebration.current[player] = true;
      }
    });
  }, [positions, winner, setWinner, incrementWin, setShowCelebration, maze]);

  // Reset celebration flags when game resets
  useEffect(() => {
    if (!showCelebration && !winner) {
      hasTriggeredCelebration.current = { 1: false, 2: false };
    }
  }, [showCelebration, winner]);

  return {
    showCelebration,
    winner,
    setShowCelebration,
  };
}
