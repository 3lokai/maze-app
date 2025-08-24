import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { HUDStats } from "@/types/stats";

interface ScoreboardProps {
  stats: HUDStats;
  className?: string;
}

export function Scoreboard({ stats, className }: ScoreboardProps) {
  const { totalSteps, totalCrashes, totalWins } = stats;
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Game Statistics</span>
          <Badge variant="outline">Overall</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold stat-win">{totalWins}</div>
            <div className="text-xs text-muted-foreground">Total Wins</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold stat-step">{totalSteps}</div>
            <div className="text-xs text-muted-foreground">Total Steps</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold stat-crash">{totalCrashes}</div>
            <div className="text-xs text-muted-foreground">Total Crashes</div>
          </div>
        </div>
        <Separator />
        <div className="text-center">
          <div className="text-sm text-muted-foreground">
            Games Played: {Math.max(totalWins, 1)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

