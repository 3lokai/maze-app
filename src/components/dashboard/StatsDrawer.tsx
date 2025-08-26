import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGameStore } from "@/store/gameStore";
import { PlayerId, Cell } from "@/types/maze-app";

interface StatsDrawerProps {
  wins: Partial<Record<PlayerId, number>>;
  crashes: Partial<Record<PlayerId, number>>;
  trails: Partial<Record<PlayerId, Cell[]>>;
  currentPlayer: PlayerId;
}

export function StatsDrawer({ wins, crashes, trails, currentPlayer }: StatsDrawerProps) {
  const { playerConfigs } = useGameStore();
  
  // Get active players (players with any data recorded)
  const activePlayers = Object.keys(wins).map(Number) as PlayerId[];
  
  // Player emoji mapping
  const playerEmojis: Record<PlayerId, string> = {
    1: "🐢",
    2: "🦊", 
    3: "🐰",
    4: "🦁"
  };
  
  // Player color classes
  const playerColorClasses: Record<PlayerId, string> = {
    1: "text-primary",
    2: "text-secondary", 
    3: "text-orange-600",
    4: "text-purple-600"
  };

  // Calculate totals from active players only
  const totalWins = activePlayers.reduce((sum, playerId) => sum + (wins[playerId] || 0), 0);
  const totalCrashes = activePlayers.reduce((sum, playerId) => sum + (crashes[playerId] || 0), 0);
  const totalSteps = activePlayers.reduce((sum, playerId) => sum + (trails[playerId]?.length || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">📊 Game Statistics</h2>
        <p className="text-muted-foreground">Track your progress and achievements</p>
      </div>

      {/* Overall Stats */}
      <Card className="stats-drawer-header">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 stats-drawer-title">
            <span>🏆 Overall Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold stat-win">{totalWins}</div>
              <div className="text-sm text-muted-foreground">Total Wins</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold stat-crash">{totalCrashes}</div>
              <div className="text-sm text-muted-foreground">Total Crashes</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold stat-step">{totalSteps}</div>
              <div className="text-sm text-muted-foreground">Total Steps</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Dynamic Player Stats */}
      {activePlayers.length > 0 ? (
        activePlayers.map((playerId) => (
          <Card key={playerId} className={`${currentPlayer === playerId ? `stats-player-card-active-p${playerId}` : 'stats-player-card-inactive'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{playerEmojis[playerId]}</span>
                <span className={currentPlayer === playerId ? `${playerColorClasses[playerId]} font-bold` : 'text-foreground'}>
                  {playerConfigs[playerId]?.name || `Player ${playerId}`} {currentPlayer === playerId && '(Active)'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold stat-win">{wins[playerId] || 0}</div>
                  <div className="text-xs text-muted-foreground">🏆 Wins</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold stat-crash">{crashes[playerId] || 0}</div>
                  <div className="text-xs text-muted-foreground">💥 Crashes</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold stat-step">{trails[playerId]?.length || 0}</div>
                  <div className="text-xs text-muted-foreground">👣 Steps</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No player data available</p>
          </CardContent>
        </Card>
      )}

      {/* Performance Insights */}
      <Card className="stats-insights-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 stats-insights-title">
            <span>📈 Performance Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {totalWins > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Win Rate</span>
              <Badge variant="secondary" className="stats-badge-success">
                {totalCrashes > 0 ? Math.round((totalWins / (totalWins + totalCrashes)) * 100) : 100}%
              </Badge>
            </div>
          )}
          {totalSteps > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Average Steps per Game</span>
              <Badge variant="secondary" className="stats-badge-info">
                {Math.round(totalSteps / Math.max(totalWins + totalCrashes, 1))}
              </Badge>
            </div>
          )}
          {activePlayers.length > 1 && (
            (() => {
              const playerWins = activePlayers.map(playerId => ({ playerId, wins: wins[playerId] || 0 }));
              const maxWins = Math.max(...playerWins.map(p => p.wins));
              const leaders = playerWins.filter(p => p.wins === maxWins && p.wins > 0);
              
              if (leaders.length === 1) {
                const leader = leaders[0];
                return (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Leader</span>
                    <Badge variant="secondary" className="stats-badge-warning">
                      {playerEmojis[leader.playerId]} {playerConfigs[leader.playerId]?.name || `Player ${leader.playerId}`}
                    </Badge>
                  </div>
                );
              } else if (leaders.length > 1) {
                return (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Leader</span>
                    <Badge variant="secondary" className="stats-badge-warning">
                      Tie
                    </Badge>
                  </div>
                );
              }
              return null;
            })()
          )}
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="stats-tips-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 stats-tips-title">
            <span>💡 Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="stats-tips-bullet">•</span>
            <span>Plan your route before executing commands</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="stats-tips-bullet">•</span>
            <span>Use the step-by-step mode to learn from mistakes</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="stats-tips-bullet">•</span>
            <span>Take turns to practice different strategies</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
