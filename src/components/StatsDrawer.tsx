import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PlayerId, Cell } from "@/types/maze-app";

interface StatsDrawerProps {
  wins: Record<PlayerId, number>;
  crashes: Record<PlayerId, number>;
  trails: Record<PlayerId, Cell[]>;
  currentPlayer: PlayerId;
}

export function StatsDrawer({ wins, crashes, trails, currentPlayer }: StatsDrawerProps) {
  const totalWins = wins[1] + wins[2];
  const totalCrashes = crashes[1] + crashes[2];
  const totalSteps = (trails[1]?.length || 0) + (trails[2]?.length || 0);

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

      {/* Player 1 Stats */}
      <Card className={`${currentPlayer === 1 ? 'stats-player-card-active-p1' : 'stats-player-card-inactive'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🐢</span>
            <span className={currentPlayer === 1 ? 'text-primary font-bold' : 'text-foreground'}>
              Player 1 {currentPlayer === 1 && '(Active)'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold stat-win">{wins[1]}</div>
              <div className="text-xs text-muted-foreground">🏆 Wins</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold stat-crash">{crashes[1]}</div>
              <div className="text-xs text-muted-foreground">💥 Crashes</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold stat-step">{trails[1]?.length || 0}</div>
              <div className="text-xs text-muted-foreground">👣 Steps</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Player 2 Stats */}
      <Card className={`${currentPlayer === 2 ? 'stats-player-card-active-p2' : 'stats-player-card-inactive'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🦊</span>
            <span className={currentPlayer === 2 ? 'text-secondary font-bold' : 'text-foreground'}>
              Player 2 {currentPlayer === 2 && '(Active)'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold stat-win">{wins[2]}</div>
              <div className="text-xs text-muted-foreground">🏆 Wins</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold stat-crash">{crashes[2]}</div>
              <div className="text-xs text-muted-foreground">💥 Crashes</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold stat-step">{trails[2]?.length || 0}</div>
              <div className="text-xs text-muted-foreground">👣 Steps</div>
            </div>
          </div>
        </CardContent>
      </Card>

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
          {wins[1] !== wins[2] && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Leader</span>
              <Badge variant="secondary" className="stats-badge-warning">
                {wins[1] > wins[2] ? '🐢 Player 1' : '🦊 Player 2'}
              </Badge>
            </div>
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
