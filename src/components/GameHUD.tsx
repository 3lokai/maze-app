import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayerStats } from "@/components/PlayerStats";
import { Scoreboard } from "@/components/Scoreboard";
import { PlayAgainButton } from "@/components/PlayAgainButton";
import type { PlayerId, Cell } from "@/types/maze-app";
import type { PlayerStatistics, HUDStats } from "@/types/stats";

interface GameHUDProps {
  currentPlayer: PlayerId;
  wins: Record<PlayerId, number>;
  crashes: Record<PlayerId, number>;
  trails: Record<PlayerId, Cell[]>;
  className?: string;
}

export function GameHUD({ currentPlayer, wins, crashes, trails, className }: GameHUDProps) {
  // Calculate player statistics
  const playerStats: Record<PlayerId, PlayerStatistics> = {
    1: {
      playerId: 1,
      wins: wins[1],
      crashes: crashes[1],
      steps: trails[1]?.length || 0,
      isCurrentPlayer: currentPlayer === 1,
    },
    2: {
      playerId: 2,
      wins: wins[2],
      crashes: crashes[2],
      steps: trails[2]?.length || 0,
      isCurrentPlayer: currentPlayer === 2,
    },
  };

  // Calculate overall statistics
  const hudStats: HUDStats = {
    totalWins: wins[1] + wins[2],
    totalSteps: (trails[1]?.length || 0) + (trails[2]?.length || 0),
    totalCrashes: crashes[1] + crashes[2],
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Player Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PlayerStats stats={playerStats[1]} />
        <PlayerStats stats={playerStats[2]} />
      </div>

      {/* Overall Scoreboard */}
      <Scoreboard stats={hudStats} />

      {/* Game Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Game Controls</span>
            <Badge variant="outline">Actions</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PlayAgainButton className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

