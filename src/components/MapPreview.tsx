"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { getCellsByType } from "@/lib/maze";
import type { MazeData } from "@/types/maze-app";

interface MapPreviewProps {
  mazeData: MazeData;
  size?: "sm" | "md" | "lg";
  className?: string;
  showPath?: boolean;
  showStartGoal?: boolean;
}

export function MapPreview({ 
  mazeData, 
  size = "md", 
  className,
  showPath = true,
  showStartGoal = true 
}: MapPreviewProps) {
  const { width, height, start, goal } = mazeData;

  // Get path cells from the maze graph
  const pathCoords = useMemo(() => {
    if (!showPath) return new Set();
    const pathCells = getCellsByType(mazeData, 'path');
    return new Set(pathCells.map(cell => `${cell.r},${cell.c}`));
  }, [mazeData, showPath]);

  // Size configurations
  const sizeConfig = {
    sm: { cellSize: 2, gap: 0.5, fontSize: 6 },
    md: { cellSize: 3, gap: 1, fontSize: 8 },
    lg: { cellSize: 4, gap: 1, fontSize: 10 }
  };

  const config = sizeConfig[size];
  const totalWidth = width * config.cellSize + (width - 1) * config.gap;
  const totalHeight = height * config.cellSize + (height - 1) * config.gap;

  // Generate grid cells
  const cells = [];
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const coord = `${r},${c}`;
      const isPath = pathCoords.has(coord);
      const isStart = showStartGoal && r === start.r && c === start.c;
      const isGoal = showStartGoal && r === goal.r && c === goal.c;
      
      let cellClass = "bg-gray-200 dark:bg-gray-700";
      let content = "";
      
      if (isStart) {
        cellClass = "bg-green-500 dark:bg-green-600";
        content = "🏠";
      } else if (isGoal) {
        cellClass = "bg-blue-500 dark:bg-blue-600";
        content = "🎯";
      } else if (isPath) {
        cellClass = "bg-white dark:bg-gray-300";
      } else {
        cellClass = "bg-gray-400 dark:bg-gray-600";
      }

      cells.push(
        <div
          key={coord}
          className={cn(
            "flex items-center justify-center border border-gray-300 dark:border-gray-600",
            cellClass
          )}
          style={{
            width: config.cellSize,
            height: config.cellSize,
            fontSize: config.fontSize,
            marginRight: c < width - 1 ? config.gap : 0,
            marginBottom: r < height - 1 ? config.gap : 0,
          }}
          aria-label={
            isStart ? "Start position" :
            isGoal ? "Goal position" :
            isPath ? "Path cell" : "Wall cell"
          }
        >
          {content}
        </div>
      );
    }
  }

  return (
    <div 
      className={cn(
        "inline-flex flex-wrap",
        className
      )}
      style={{
        width: totalWidth,
        height: totalHeight,
      }}
      role="img"
      aria-label={`Maze preview: ${mazeData.mazeId || 'Unnamed maze'} - ${width}x${height} grid`}
    >
      {cells}
    </div>
  );
}
