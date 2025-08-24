import { Button } from "@/components/ui/button";
import { SettingsDropdown } from "./SettingsDropdown";
import { StatsDrawerWrapper } from "./StatsDrawerWrapper";
import { Play } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { useMazeLayout } from '@/hooks/useMazeLayout';
import { MAZE_DATA } from '@/lib/maze';

export function Header() {
  const { playAgain, wins, crashes, trails, currentPlayer } = useGameStore();
  const { mazeData } = useMazeLayout();

  const handlePlayAgain = () => {
    playAgain(mazeData || MAZE_DATA);
  };

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        {/* Left side - Title */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Coding Maze</h1>
          <p className="text-muted-foreground">2-Player Programming Challenge</p>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center gap-3" role="group" aria-label="Game controls">
          {/* Play Again Button */}
          <Button 
            onClick={handlePlayAgain}
            className="bg-green-600 hover:bg-green-700 text-white"
            size="lg"
            aria-label="Reset game and start over"
          >
            <Play className="w-4 h-4 mr-2" aria-hidden="true" />
            Play Again
          </Button>

          {/* Settings Dropdown */}
          <SettingsDropdown />

          {/* Stats Drawer */}
          <StatsDrawerWrapper 
            wins={wins}
            crashes={crashes}
            trails={trails}
            currentPlayer={currentPlayer}
          />
        </div>
      </div>
    </header>
  );
}
