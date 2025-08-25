import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { MAZE_DATA, getCellType } from "@/lib/maze";
import type { Cell, PlayerId, MazeData } from "@/types/maze-app";
import { PlayerToken } from "./PlayerToken";
import { CollisionFeedback } from "./CollisionFeedback";
import { useGameStore } from "@/store/gameStore";

interface MazeRendererProps {
  className?: string;
  maze?: MazeData;
  positions?: Partial<Record<PlayerId, Cell>>;
  trails?: Partial<Record<PlayerId, Cell[]>>;
  currentPlayer?: PlayerId;
  collisionCell?: Cell | null;
  isColliding?: boolean;
  theme?: {
    start?: string;
    goal?: string;
  };
  previewPath?: boolean;
}

export function MazeRenderer({ 
  className = "", 
  maze = MAZE_DATA,
  positions = { 1: { r: 0, c: 0 } },
  trails = { 1: [{ r: 0, c: 0 }] },
  currentPlayer = 1,
  collisionCell = null,
  isColliding = false,
  theme,
  previewPath = false
}: MazeRendererProps) {
  const { getActivePlayers } = useGameStore();
  const activePlayers = getActivePlayers();

  const renderCell = (row: number, col: number) => {
    const cell: Cell = { r: row, c: col };
    const cellType = getCellType(maze, cell);
    
    let cellClasses = "cell w-full h-full flex items-center justify-center relative";
    let content = null;
    
    // Check for player trails first (background) - handle partial records
    const playerTrails = activePlayers.map(playerId => ({
      playerId,
      hasTrail: trails[playerId]?.some(pos => pos.r === row && pos.c === col) || false
    }));
    
    // Apply trail styling (simplified for multiple players)
    const hasAnyTrail = playerTrails.some(p => p.hasTrail);
    if (hasAnyTrail) {
      cellClasses += " trail-emerald"; // Use single trail color for simplicity
    }
    
    // Add preview path visualization if enabled
    if (previewPath && cellType === 'path') {
      cellClasses += " preview-path";
    }
    
    switch (cellType) {
      case 'wall':
        cellClasses += " bg-foreground/70";
        break;
      case 'start':
        cellClasses += " bg-green-100 border-2 border-green-300";
        content = (
          <Badge variant="outline" className="text-xs bg-green-50 text-green-800 border-green-300">
            <span className="emoji-fallback">{theme?.start || "🏠 Home"}</span>
          </Badge>
        );
        break;
      case 'goal':
        cellClasses += " bg-blue-100 border-2 border-blue-300";
        content = (
          <Badge className="text-xs bg-blue-50 text-blue-800 border-blue-300">
            <Trophy className="w-3 h-3 mr-1" />
            <span className="emoji-fallback">{theme?.goal || "🌲 Forest"}</span>
          </Badge>
        );
        break;
      case 'path':
      default:
        // Regular path cells - removed green dots visualization
        cellClasses += " bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200";
        break;
    }
    
    // Check for player tokens (foreground) - support 1-4 players
    const playersHere = activePlayers.filter(playerId => 
      positions[playerId]?.r === row && positions[playerId]?.c === col
    );
    
    let playerContent = null;
    if (playersHere.length > 0) {
      if (playersHere.length === 1) {
        // Single player in this cell
        const playerId = playersHere[0];
        playerContent = (
          <PlayerToken 
            player={playerId} 
            isCurrentPlayer={currentPlayer === playerId} 
          />
        );
      } else {
        // Multiple players in same cell - stack them
        playerContent = (
          <div className="flex flex-col gap-1">
            {playersHere.map(playerId => (
              <PlayerToken 
                key={playerId}
                player={playerId} 
                isCurrentPlayer={currentPlayer === playerId} 
              />
            ))}
          </div>
        );
      }
    }
    
    // Check if this cell is the collision cell
    const isCollisionCell = isColliding && 
                           collisionCell && 
                           collisionCell.r === row && 
                           collisionCell.c === col;

    const getCellAriaLabel = () => {
      const cellType = getCellType(maze, cell);
      let label = `Cell at row ${row + 1}, column ${col + 1}`;
      
      if (cellType === 'start') {
        label += ', Start position';
      } else if (cellType === 'goal') {
        label += ', Goal position';
      } else if (cellType === 'wall') {
        label += ', Wall';
      } else {
        label += ', Path';
      }
      
      if (playersHere.length > 0) {
        if (playersHere.length === 1) {
          label += `, Player ${playersHere[0]} present`;
        } else {
          label += `, ${playersHere.length} players present`;
        }
      }
      
      if (isCollisionCell) {
        label += ', Collision occurred here';
      }
      
      return label;
    };

    return (
      <div 
        key={`${row}-${col}`} 
        className={cellClasses}
        role="gridcell"
        aria-label={getCellAriaLabel()}
        aria-rowindex={row + 1}
        aria-colindex={col + 1}
      >
        {content}
        {playerContent}
        {isCollisionCell && (
          <CollisionFeedback
            isColliding={isColliding}
            collisionCell={collisionCell}
          />
        )}
      </div>
    );
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div 
        className="grid gap-0 aspect-square w-full max-w-2xl mx-auto"
        style={{
          gridTemplateColumns: `repeat(${maze.width}, 1fr)`,
          gridTemplateRows: `repeat(${maze.height}, 1fr)`
        }}
        role="grid"
        aria-label={`${maze.width} by ${maze.height} maze grid`}
        aria-rowcount={maze.height}
        aria-colcount={maze.width}
      >
        {Array.from({ length: maze.height }, (_, row) =>
          Array.from({ length: maze.width }, (_, col) => renderCell(row, col))
        )}
      </div>
    </div>
  );
}
