"use client";

import { memo } from "react";

interface MazeLegendProps {
  theme?: {
    start?: string;
    goal?: string;
  };
  className?: string;
}

export const MazeLegend = memo(({ theme, className = "" }: MazeLegendProps) => {
  // Legend is shown via CSS media queries, so we always render it
  // CSS will handle hiding it on larger screens
  if (!theme?.start || !theme?.goal) {
    return null;
  }

  return (
    <div className={`maze-legend ${className}`}>
      <div className="legend-item">
        <span className="legend-emoji legend-emoji-start">
          {theme.start.includes('🏠') ? '🏠' : theme.start}
        </span>
        <span className="legend-label legend-label-start">
          {theme.start}
        </span>
      </div>
      <div className="legend-item">
        <span className="legend-emoji legend-emoji-goal">
          {theme.goal.includes('🌲') ? '🌲' : theme.goal}
        </span>
        <span className="legend-label legend-label-goal">
          {theme.goal}
        </span>
      </div>
    </div>
  );
});

MazeLegend.displayName = 'MazeLegend';
