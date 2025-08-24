import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { PlayerStatistics } from "@/types/stats";

interface PlayerStatsProps {
  stats: PlayerStatistics;
}

export function PlayerStats({ stats }: PlayerStatsProps) {
  const { playerId, wins, crashes, steps, isCurrentPlayer } = stats;
  
  return (
    <Card className={`transition-all duration-200 ${isCurrentPlayer ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span>Player {playerId}</span>
          {isCurrentPlayer && (
            <Badge variant="default" className="text-xs">
              Current Turn
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <div className="text-muted-foreground">Wins</div>
            <div className="font-mono font-bold stat-win">{wins}</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground">Crashes</div>
            <div className="font-mono font-bold stat-crash">{crashes}</div>
          </div>
        </div>
        <Separator />
        <div className="space-y-1">
          <div className="text-muted-foreground text-sm">Steps Taken</div>
          <div className="font-mono font-bold stat-step">{steps}</div>
        </div>
      </CardContent>
    </Card>
  );
}

