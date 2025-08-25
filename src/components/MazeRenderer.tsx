import { MAZE_DATA, getCellType, performanceUtils } from "@/lib/maze";
import type { Cell, PlayerId, MazeData } from "@/types/maze-app";
import { PlayerToken } from "./PlayerToken";
import { CollisionFeedback } from "./CollisionFeedback";
import { MazeLegend } from "./MazeLegend";
import { useGameStore } from "@/store/gameStore";
import { memo, useMemo } from "react";

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

// Memoized cell component for performance optimization
const MemoizedCell = memo(({ 
  row, 
  col, 
  maze, 
  positions, 
  trails, 
  currentPlayer, 
  collisionCell, 
  isColliding, 
  theme, 
  previewPath,
  activePlayers 
}: {
  row: number;
  col: number;
  maze: MazeData;
  positions: Partial<Record<PlayerId, Cell>>;
  trails: Partial<Record<PlayerId, Cell[]>>;
  currentPlayer: PlayerId;
  collisionCell: Cell | null;
  isColliding: boolean;
  theme?: { start?: string; goal?: string };
  previewPath: boolean;
  activePlayers: PlayerId[];
}) => {
  const cell: Cell = { r: row, c: col };
  const cellType = getCellType(maze, cell);
  
  let cellClasses = "cell w-full h-full flex items-center justify-center relative";
  
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
  
  // Base cell styling
  switch (cellType) {
    case 'wall':
      cellClasses += " maze-wall";
      break;
    case 'start':
      cellClasses += " maze-start";
      break;
    case 'goal':
      cellClasses += " maze-goal";
      break;
    case 'path':
    default:
      cellClasses += " maze-path";
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
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <PlayerToken 
            player={playerId} 
            isCurrentPlayer={currentPlayer === playerId} 
          />
        </div>
      );
    } else {
      // Multiple players in same cell - stack them
      playerContent = (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="flex flex-col gap-1">
            {playersHere.map(playerId => (
              <PlayerToken 
                key={playerId}
                player={playerId} 
                isCurrentPlayer={currentPlayer === playerId} 
              />
            ))}
          </div>
        </div>
      );
    }
  }
  
  // Check if this cell is the collision cell
  const isCollisionCell = isColliding && 
                         collisionCell && 
                         collisionCell.r === row && 
                         collisionCell.c === col;

  // Overlay content for start and goal cells
  let overlayContent = null;
  if (cellType === 'start' && theme?.start) {
    overlayContent = (
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="cell-overlay cell-overlay-start">
          <span className="cell-emoji cell-emoji-start">
            {theme.start.includes('🏠') ? '🏠' : theme.start}
          </span>
          {!theme.start.includes('🏠') && (
            <span className="cell-label cell-label-start sr-only">
              {theme.start}
            </span>
          )}
        </div>
      </div>
    );
  } else if (cellType === 'goal' && theme?.goal) {
    overlayContent = (
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="cell-overlay cell-overlay-goal">
          <span className="cell-emoji cell-emoji-goal">
            {theme.goal.includes('🌲') ? '🌲' : theme.goal}
          </span>
          {!theme.goal.includes('🌲') && (
            <span className="cell-label cell-label-goal sr-only">
              {theme.goal}
            </span>
          )}
        </div>
      </div>
    );
  }

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
      {overlayContent}
      {playerContent}
      {isCollisionCell && (
        <CollisionFeedback
          isColliding={isColliding}
          collisionCell={collisionCell}
        />
      )}
    </div>
  );
});

MemoizedCell.displayName = 'MemoizedCell';

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

  // Performance optimization: check if we need optimized rendering
  const performanceMode = useMemo(() => 
    performanceUtils.getPerformanceMode(maze.width, maze.height), 
    [maze.width, maze.height]
  );

  // Memoize grid cells for performance
  const gridCells = useMemo(() => {
    const cells = [];
    for (let row = 0; row < maze.height; row++) {
      for (let col = 0; col < maze.width; col++) {
        cells.push(
          <MemoizedCell
            key={`${row}-${col}`}
            row={row}
            col={col}
            maze={maze}
            positions={positions}
            trails={trails}
            currentPlayer={currentPlayer}
            collisionCell={collisionCell}
            isColliding={isColliding}
            theme={theme}
            previewPath={previewPath}
            activePlayers={activePlayers}
          />
        );
      }
    }
    return cells;
  }, [maze, positions, trails, currentPlayer, collisionCell, isColliding, theme, previewPath, activePlayers]);

  // Calculate aspect ratio based on maze dimensions
  const aspectRatio = useMemo(() => {
    return `${maze.width} / ${maze.height}`;
  }, [maze.width, maze.height]);

  // Optimize CSS classes based on performance mode and grid size
  const gridClasses = useMemo(() => {
    const baseClasses = "maze-grid grid gap-0 w-full max-w-2xl mx-auto";
    const performanceClasses = performanceMode === 'optimized' 
      ? "will-change-transform transform-gpu maze-grid-optimized" 
      : "";
    const largeGridClasses = maze.width > 15 || maze.height > 15 
      ? "maze-grid-large" 
      : "";
    return `${baseClasses} ${performanceClasses} ${largeGridClasses}`;
  }, [performanceMode, maze.width, maze.height]);

  // Add viewport management for large grids
  const containerClasses = useMemo(() => {
    const baseClasses = `w-full ${className}`;
    const viewportClasses = (maze.width > 15 || maze.height > 15) 
      ? "maze-viewport maze-viewport-large" 
      : "";
    return `${baseClasses} ${viewportClasses}`;
  }, [className, maze.width, maze.height]);

  return (
    <div className={containerClasses}>
      <div 
        className={gridClasses}
        style={{
          '--maze-aspect-ratio': aspectRatio,
          gridTemplateColumns: `repeat(${maze.width}, 1fr)`,
          gridTemplateRows: `repeat(${maze.height}, 1fr)`
        } as React.CSSProperties}
        role="grid"
        aria-label={`${maze.width} by ${maze.height} maze grid`}
        aria-rowcount={maze.height}
        aria-colcount={maze.width}
      >
        {gridCells}
      </div>
      <MazeLegend theme={theme} />
    </div>
  );
}
