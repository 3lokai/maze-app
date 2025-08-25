"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { MapId } from "@/hooks/useMazeLayout";
import type { MazeData } from "@/types/maze-app";
import { loadMazeLayout } from "@/lib/maze";

interface MapSelectorProps {
  currentMapId: MapId;
  availableMaps: Array<{
    readonly id: MapId;
    readonly name: string;
    readonly difficulty: string;
  }>;
  onMapChange: (mapId: MapId) => Promise<void>;
  isLoading?: boolean;
  className?: string;
}

export function MapSelector({
  currentMapId,
  availableMaps,
  onMapChange,
  isLoading = false,
  className,
}: MapSelectorProps) {
  const [allMazeData, setAllMazeData] = useState<Record<MapId, MazeData>>({} as Record<MapId, MazeData>);
  const [isHydrated, setIsHydrated] = useState(false);
  
  const currentMap = availableMaps.find(map => map.id === currentMapId);
  
  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  // Load all maze data for grid size display (only after hydration)
  useEffect(() => {
    if (!isHydrated) return;
    
    const loadAllMazes = async () => {
      try {
        const mazeDataPromises = availableMaps.map(async (map) => {
          try {
            const data = await loadMazeLayout(map.id);
            return { id: map.id, data };
          } catch (error) {
            console.warn(`Failed to load maze ${map.id}:`, error);
            return null;
          }
        });
        
        const results = await Promise.all(mazeDataPromises);
        const newMazeData: Record<MapId, MazeData> = {} as Record<MapId, MazeData>;
        
        results.forEach((result) => {
          if (result) {
            newMazeData[result.id] = result.data;
          }
        });
        
        setAllMazeData(newMazeData);
      } catch (error) {
        console.error('Failed to load maze data:', error);
      }
    };
    
    loadAllMazes();
  }, [availableMaps, isHydrated]);
  
  const handleMapSelect = async (mapId: string) => {
    if (mapId === currentMapId || isLoading) return;
    await onMapChange(mapId as MapId);
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Get grid size for a specific map from loaded maze data
  // During SSR and before hydration, use difficulty-based estimates for consistency
  const getGridSizeForMap = (mapId: MapId) => {
    // Before hydration, use consistent difficulty-based estimates
    if (!isHydrated) {
      const map = availableMaps.find(m => m.id === mapId);
      if (map) {
        switch (map.difficulty.toLowerCase()) {
          case 'easy': return '10×10';
          case 'medium': return '15×15';
          case 'hard': return '20×20';
          default: return '10×10';
        }
      }
      return '10×10';
    }
    
    // After hydration, use actual maze data if available
    const mazeData = allMazeData[mapId];
    if (mazeData) {
      return `${mazeData.width}×${mazeData.height}`;
    }
    
    // Fallback to difficulty-based estimate if maze data not loaded yet
    const map = availableMaps.find(m => m.id === mapId);
    if (map) {
      switch (map.difficulty.toLowerCase()) {
        case 'easy': return '10×10';
        case 'medium': return '15×15';
        case 'hard': return '20×20';
        default: return '10×10';
      }
    }
    return '10×10';
  };

  return (
    <Select
      key={currentMapId} // Add key to ensure proper re-rendering
      value={currentMapId}
      onValueChange={handleMapSelect}
      disabled={isLoading}
    >
      <SelectTrigger 
        className={cn(
          "w-auto min-w-[140px] h-8 text-sm",
          className
        )}
        aria-label="Select maze map"
      >
        <SelectValue>
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {currentMap?.name} ({getGridSizeForMap(currentMapId)})
            </span>
            <Badge
              variant="secondary"
              className={cn("text-xs", getDifficultyColor(currentMap?.difficulty || ''))}
            >
              {currentMap?.difficulty}
            </Badge>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {availableMaps.map((map) => (
          <SelectItem key={map.id} value={map.id}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {map.name} ({getGridSizeForMap(map.id)})
                </span>
                <Badge
                  variant="secondary"
                  className={cn("text-xs", getDifficultyColor(map.difficulty))}
                >
                  {map.difficulty}
                </Badge>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
