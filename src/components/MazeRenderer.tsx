import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { MAZE_DATA, getCellType } from "@/lib/maze";
import type { Cell, PlayerId, MazeData } from "@/types/maze-app";
import { PlayerToken } from "./PlayerToken";
import { CollisionFeedback } from "./CollisionFeedback";

interface MazeRendererProps {
  className?: string;
  maze?: MazeData;
  positions?: Record<PlayerId, Cell>;
  trails?: Record<PlayerId, Cell[]>;
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
  positions = { 1: { r: 0, c: 0 }, 2: { r: 0, c: 0 } },
  trails = { 1: [{ r: 0, c: 0 }], 2: [{ r: 0, c: 0 }] },
  currentPlayer = 1,
  collisionCell = null,
  isColliding = false,
  theme,
  previewPath = false
}: MazeRendererProps) {
  // Get the actual path route from start to goal
  const getPathRoute = () => {
    const pathRoute: Cell[] = [];
    const visited = new Set<string>();
    
    const dfs = (current: Cell): boolean => {
      const key = `${current.r},${current.c}`;
      if (visited.has(key)) return false;
      visited.add(key);
      
      pathRoute.push(current);
      
      // Check if we reached the goal
      if (current.r === maze.goal.r && current.c === maze.goal.c) {
        return true;
      }
      
      // Get neighbors and try each one
      const neighbors = maze.graph[key];
      if (neighbors) {
        for (const neighborKey of neighbors) {
          const [r, c] = neighborKey.split(',').map(Number);
          const neighbor = { r, c };
          if (dfs(neighbor)) {
            return true;
          }
        }
      }
      
      // If no path found, remove this cell from the route
      pathRoute.pop();
      return false;
    };
    
    dfs(maze.start);
    return pathRoute;
  };

  const pathRoute = getPathRoute();
  const isInPathRoute = (cell: Cell) => {
    return pathRoute.some(pathCell => pathCell.r === cell.r && pathCell.c === cell.c);
  };

  const renderCell = (row: number, col: number) => {
    const cell: Cell = { r: row, c: col };
    const cellType = getCellType(maze, cell);
    
    // Check if this cell is part of the actual path route
    const isInRoute = isInPathRoute(cell);
    
    let cellClasses = "cell w-full h-full flex items-center justify-center relative";
    let content = null;
    
    // Check for player trails first (background)
    const player1Trail = trails[1].some(pos => pos.r === row && pos.c === col);
    const player2Trail = trails[2].some(pos => pos.r === row && pos.c === col);
    
    if (player1Trail) {
      cellClasses += " trail-emerald";
    } else if (player2Trail) {
      cellClasses += " trail-indigo";
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
        if (isInRoute) {
          // Highlight cells that are part of the actual path route
          cellClasses += " bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300";
          content = (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-2 h-2 bg-green-500 rounded-full opacity-60"></div>
            </div>
          );
        } else {
          // Regular path cells (not part of the route)
          cellClasses += " bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200";
        }
        break;
    }
    
    // Check for player tokens (foreground)
    const player1Here = positions[1].r === row && positions[1].c === col;
    const player2Here = positions[2].r === row && positions[2].c === col;
    
    let playerContent = null;
    if (player1Here && player2Here) {
      // Both players in same cell - stack them
      playerContent = (
        <div className="flex flex-col gap-1">
          <PlayerToken player={1} isCurrentPlayer={currentPlayer === 1} />
          <PlayerToken player={2} isCurrentPlayer={currentPlayer === 2} />
        </div>
      );
    } else if (player1Here) {
      playerContent = <PlayerToken player={1} isCurrentPlayer={currentPlayer === 1} />;
    } else if (player2Here) {
      playerContent = <PlayerToken player={2} isCurrentPlayer={currentPlayer === 2} />;
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
      
      if (player1Here && player2Here) {
        label += ', Both players present';
      } else if (player1Here) {
        label += ', Player 1 present';
      } else if (player2Here) {
        label += ', Player 2 present';
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
