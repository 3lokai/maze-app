import { MAZE_DATA, getCellType, performanceUtils } from "@/lib/maze";
import type { Cell, PlayerId, MazeData } from "@/types/maze-app";
import { PlayerToken } from "./PlayerToken";
import { CollisionFeedback } from "../feedback/CollisionFeedback";
import { MazeLegend } from "./MazeLegend";
import { useGameStore } from "@/store/gameStore";
import { useCamera } from "@/hooks/useCamera";
import { useViewportContainer } from "@/hooks/useViewport";
import { memo, useMemo, useEffect, useRef, useCallback, useState } from "react";

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

// Viewport culling utilities for large grids
const viewportCulling = {
  /**
   * Calculate visible cells based on viewport and camera position
   */
  getVisibleCells: (
    maze: MazeData,
    viewportTransform: { x: number; y: number; scale: number },
    containerSize: { width: number; height: number },
    cellSize: number
  ): { startRow: number; endRow: number; startCol: number; endCol: number } => {
    // Calculate viewport bounds in grid coordinates
    const viewportLeft = -viewportTransform.x / viewportTransform.scale;
    const viewportTop = -viewportTransform.y / viewportTransform.scale;
    const viewportRight = viewportLeft + containerSize.width / viewportTransform.scale;
    const viewportBottom = viewportTop + containerSize.height / viewportTransform.scale;

    // Convert to grid coordinates with padding
    const padding = 2; // Render 2 extra cells on each side for smooth scrolling
    const startCol = Math.max(0, Math.floor(viewportLeft / cellSize) - padding);
    const endCol = Math.min(maze.width - 1, Math.ceil(viewportRight / cellSize) + padding);
    const startRow = Math.max(0, Math.floor(viewportTop / cellSize) - padding);
    const endRow = Math.min(maze.height - 1, Math.ceil(viewportBottom / cellSize) + padding);

    return { startRow, endRow, startCol, endCol };
  },

  /**
   * Check if a cell is visible in the viewport
   */
  isCellVisible: (
    row: number,
    col: number,
    visibleBounds: { startRow: number; endRow: number; startCol: number; endCol: number }
  ): boolean => {
    return row >= visibleBounds.startRow && 
           row <= visibleBounds.endRow && 
           col >= visibleBounds.startCol && 
           col <= visibleBounds.endCol;
  },
};

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
  activePlayers,
  onTrailRenderTime
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
  onTrailRenderTime?: (time: number) => void;
}) => {
  const cell: Cell = { r: row, c: col };
  const cellType = getCellType(maze, cell);
  
  let cellClasses = "cell w-full h-full flex items-center justify-center relative";
  
  // Performance monitoring for trail rendering
  const trailRenderStart = useRef(performance.now());
  
  // Check for player trails first (background) - handle partial records
  const playerTrails = activePlayers.map(playerId => ({
    playerId,
    hasTrail: trails[playerId]?.some(pos => pos.r === row && pos.c === col) || false
  }));
  
  // Apply trail styling with player-specific colors
  const hasAnyTrail = playerTrails.some(p => p.hasTrail);
  if (hasAnyTrail) {
    // Use player-specific trail colors
    const trailColors = {
      1: "trail-p1",
      2: "trail-p2", 
      3: "trail-p3",
      4: "trail-p4"
    };
    
    // Apply trail color for the first player found in this cell
    const firstPlayerWithTrail = playerTrails.find(p => p.hasTrail);
    if (firstPlayerWithTrail) {
      cellClasses += ` ${trailColors[firstPlayerWithTrail.playerId as keyof typeof trailColors] || 'trail-emerald'}`;
    }
    
    // Record trail rendering time for performance monitoring
    if (onTrailRenderTime) {
      const trailRenderTime = performance.now() - trailRenderStart.current;
      onTrailRenderTime(trailRenderTime);
    }
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
  const { getActivePlayers, enableFollowCam, disableFollowCam } = useGameStore();
  const activePlayers = getActivePlayers();
  
  // Camera and viewport management
  const { startCameraUpdate, stopCameraUpdate, getViewportTransform } = useCamera();
  const containerRef = useViewportContainer();
  const positionsRef = useRef(positions);
  
  // Performance monitoring
  const performanceMode = useMemo(() => 
    performanceUtils.getPerformanceMode(maze.width, maze.height), 
    [maze.width, maze.height]
  );

  // Check if viewport management is needed
  const needsViewport = maze.width > 15 || maze.height > 15;

  // Viewport culling state
  const [visibleBounds, setVisibleBounds] = useState(() => ({
    startRow: 0,
    endRow: maze.height - 1,
    startCol: 0,
    endCol: maze.width - 1,
  }));

  // Container size tracking for viewport culling
  const containerSizeRef = useRef({ width: 0, height: 0 });
  const cellSizeRef = useRef(0);

  // Update positions ref when positions change
  useEffect(() => {
    positionsRef.current = positions;
  }, [positions]);

  // Enable follow-cam for current player on large grids
  useEffect(() => {
    if (needsViewport) {
      enableFollowCam(currentPlayer);
    } else {
      disableFollowCam();
    }
  }, [needsViewport, currentPlayer, enableFollowCam, disableFollowCam]);

  // Start camera update when viewport is needed
  useEffect(() => {
    if (needsViewport) {
      // Start the camera update loop
      startCameraUpdate(maze, positionsRef.current);
    } else {
      // Stop camera update when not needed
      stopCameraUpdate();
    }
    
    // Cleanup on unmount
    return () => {
      stopCameraUpdate();
    };
  }, [needsViewport, maze, startCameraUpdate, stopCameraUpdate]);

  // Viewport culling update function
  const updateVisibleBounds = useCallback(() => {
    if (!needsViewport || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    containerSizeRef.current = { width: rect.width, height: rect.height };
    
    // Estimate cell size based on container and grid dimensions
    const estimatedCellSize = Math.min(rect.width / maze.width, rect.height / maze.height);
    cellSizeRef.current = estimatedCellSize;

    const viewportTransformString = getViewportTransform();
    // Parse the transform string to extract x, y values
    const transformMatch = viewportTransformString.match(/translate3d\(([^,]+),\s*([^,]+),\s*([^)]+)\)/);
    const viewportTransform = transformMatch ? {
      x: parseFloat(transformMatch[1]),
      y: parseFloat(transformMatch[2]),
      scale: 1 // Default scale for now
    } : { x: 0, y: 0, scale: 1 };
    
    const newBounds = viewportCulling.getVisibleCells(
      maze,
      viewportTransform,
      containerSizeRef.current,
      cellSizeRef.current
    );

    setVisibleBounds(newBounds);
  }, [needsViewport, maze, getViewportTransform, containerRef]);

  // Update visible bounds when viewport changes
  useEffect(() => {
    if (!needsViewport) return;

    const handleResize = () => {
      updateVisibleBounds();
    };

    // Update bounds immediately
    updateVisibleBounds();

    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    // Update bounds periodically for smooth scrolling
    const interval = setInterval(updateVisibleBounds, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, [needsViewport, updateVisibleBounds]);

  // Performance monitoring callback
  const handleTrailRenderTime = useCallback((renderTime: number) => {
    if (typeof window !== 'undefined' && (window as { performanceMonitor?: { recordTrailRenderTime: (time: number) => void } }).performanceMonitor) {
      (window as { performanceMonitor?: { recordTrailRenderTime: (time: number) => void } }).performanceMonitor?.recordTrailRenderTime(renderTime);
    }
  }, []);

  // Memoize grid cells for performance with viewport culling
  const gridCells = useMemo(() => {
    const cells = [];
    const bounds = needsViewport ? visibleBounds : {
      startRow: 0,
      endRow: maze.height - 1,
      startCol: 0,
      endCol: maze.width - 1,
    };

    for (let row = bounds.startRow; row <= bounds.endRow; row++) {
      for (let col = bounds.startCol; col <= bounds.endCol; col++) {
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
            onTrailRenderTime={handleTrailRenderTime}
          />
        );
      }
    }
    return cells;
  }, [maze, positions, trails, currentPlayer, collisionCell, isColliding, theme, previewPath, activePlayers, needsViewport, visibleBounds, handleTrailRenderTime]);

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
    const viewportClasses = needsViewport 
      ? "maze-viewport maze-viewport-large" 
      : "";
    return `${baseClasses} ${viewportClasses}`;
  }, [className, needsViewport]);

  // Apply viewport transform for smooth panning
  const viewportStyle = useMemo(() => {
    const baseStyle = {
      '--maze-aspect-ratio': aspectRatio,
      gridTemplateColumns: `repeat(${maze.width}, 1fr)`,
      gridTemplateRows: `repeat(${maze.height}, 1fr)`
    } as React.CSSProperties;

    if (needsViewport) {
      baseStyle.transform = getViewportTransform();
      baseStyle.transition = 'transform 0.1s ease-out';
    }

    return baseStyle;
  }, [aspectRatio, maze.width, maze.height, needsViewport, getViewportTransform]);

  return (
    <div ref={containerRef} className={containerClasses}>
      <div 
        className={gridClasses}
        style={viewportStyle}
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
