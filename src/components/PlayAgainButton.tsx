"use client";

import { Button } from '@/components/ui/button';
import { useGameStore } from '@/store/gameStore';
import { useMazeLayout } from '@/hooks/useMazeLayout';
import { MAZE_DATA } from '@/lib/maze';

interface PlayAgainButtonProps {
  className?: string;
}

export function PlayAgainButton({ className }: PlayAgainButtonProps) {
  const { playAgain } = useGameStore();
  const { mazeData } = useMazeLayout();

  const handlePlayAgain = () => {
    playAgain(mazeData || MAZE_DATA);
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <Button
        onClick={handlePlayAgain}
        size="lg"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 text-lg"
      >
        🎮 Play Again
      </Button>
    </div>
  );
}
