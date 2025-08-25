import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommandBuilder } from "@/components/game/controls/CommandBuilder";
import { CommandToken } from "@/types/commands";
import { ExecutionState } from "@/types/execution";
import { Dir } from "@/types/maze-app";
import { useGameStore } from "@/store/gameStore";

interface GameRailProps {
  commandQueue: CommandToken[];
  executionState: ExecutionState;
  onAddCommand: (direction: Dir, steps: number) => void;
  onUndo: () => void;
  onReset: () => void;
  onRun: () => void;
  onStep: () => void;
  onStop: () => void;
  onRemoveCommand?: (index: number) => void;
}

export function GameRail({
  commandQueue,
  executionState,
  onAddCommand,
  onUndo,
  onReset,
  onRun,
  onStep,
  onStop,
  onRemoveCommand,
}: GameRailProps) {
  const { 
    playerConfigs, 
    getActivePlayers, 
    currentPlayer, 
    getPlayerStats, 
    getOverallStats 
  } = useGameStore();
  
  // Get active players from store
  const activePlayers = getActivePlayers();
  const overallStats = getOverallStats();
  
  return (
    <div className="space-y-6">
      {/* Command Builder & Executor */}
      <Card className="rail-section-commands shadow-lg border-2" role="region" aria-labelledby="commands-section-title">
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle id="commands-section-title" className="text-lg flex items-center gap-2 text-blue-900">
            <span className="rail-title-commands" aria-hidden="true">⚡ Commands & Execute</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <CommandBuilder 
            queue={commandQueue}
            onAddCommand={onAddCommand}
            onUndo={onUndo}
            onReset={onReset}
            onRun={onRun}
            onStep={onStep}
            onStop={onStop}
            onRemoveCommand={onRemoveCommand}
            executionState={executionState}
            currentPlayer={currentPlayer}
          />
        </CardContent>
      </Card>

      {/* Game Status & Record Panel */}
      <Card className="rail-section-status shadow-lg border-2" role="region" aria-labelledby="status-section-title">
        <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-emerald-50 border-b">
          <CardTitle id="status-section-title" className="text-lg flex items-center gap-2 text-green-900">
            <span aria-hidden="true">📊 Record</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {activePlayers.length > 0 ? (
              <>
                {/* Player Stats Rows */}
                <div className="space-y-2 sm:space-y-3">
                  {activePlayers.map((playerId) => {
                    const config = playerConfigs[playerId];
                    const isCurrentPlayer = playerId === currentPlayer;
                    const stats = getPlayerStats(playerId);
                    
                    return (
                      <div 
                        key={playerId} 
                        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg border gap-2 sm:gap-0 ${
                          isCurrentPlayer ? 'bg-primary/10 border-primary/20' : 'bg-muted/50'
                        }`}
                      >
                        {/* Player Info */}
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <span className="text-xl flex-shrink-0" aria-hidden="true">
                            {config?.emoji || '🐢'}
                          </span>
                          <span className="font-medium text-sm truncate">
                            {config?.name || `Player ${playerId}`}
                          </span>
                          {isCurrentPlayer && (
                            <span className="text-xs text-primary font-medium flex-shrink-0">
                              (Current)
                            </span>
                          )}
                        </div>
                        
                        {/* Stats Display */}
                        <div className="flex items-center justify-center sm:justify-end gap-3 text-sm">
                          {/* Wins */}
                          <div className="flex items-center gap-1">
                            <span className="text-green-600" aria-hidden="true">🏆</span>
                            <span className="font-bold text-green-600">{stats.wins}</span>
                          </div>
                          
                          {/* Crashes */}
                          <div className="flex items-center gap-1">
                            <span className="text-red-600" aria-hidden="true">💥</span>
                            <span className="font-bold text-red-600">{stats.crashes}</span>
                          </div>
                          
                          {/* Steps */}
                          <div className="flex items-center gap-1">
                            <span className="text-blue-600" aria-hidden="true">👣</span>
                            <span className="font-bold text-blue-600">{stats.steps}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Overall Totals Row */}
                <div className="border-t pt-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg bg-muted/30 border gap-2 sm:gap-0">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-muted-foreground">Overall</span>
                    </div>
                    
                    <div className="flex items-center justify-center sm:justify-end gap-3 text-sm">
                      {/* Total Wins */}
                      <div className="flex items-center gap-1">
                        <span className="text-green-600" aria-hidden="true">🏆</span>
                        <span className="font-bold text-green-600">{overallStats.wins}</span>
                      </div>
                      
                      {/* Total Crashes */}
                      <div className="flex items-center gap-1">
                        <span className="text-red-600" aria-hidden="true">💥</span>
                        <span className="font-bold text-red-600">{overallStats.crashes}</span>
                      </div>
                      
                      {/* Total Steps */}
                      <div className="flex items-center gap-1">
                        <span className="text-blue-600" aria-hidden="true">👣</span>
                        <span className="font-bold text-blue-600">{overallStats.steps}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-sm text-muted-foreground text-center py-4">
                No players yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
