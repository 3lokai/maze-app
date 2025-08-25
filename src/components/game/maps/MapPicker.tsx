"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPreview } from "@/components/game/maze/MapPreview";
import { cn } from "@/lib/utils";
import type { MapId } from "@/hooks/useMazeLayout";
import type { MazeData } from "@/types/maze-app";
import { loadMazeLayout } from "@/lib/maze";

interface MapPickerProps {
  currentMapId: MapId;
  availableMaps: Array<{
    readonly id: MapId;
    readonly name: string;
    readonly difficulty: string;
    readonly description: string;
  }>;
  onMapChange: (mapId: MapId) => Promise<void>;
  isLoading?: boolean;
  className?: string;
}

export function MapPicker({
  currentMapId,
  availableMaps,
  onMapChange,
  isLoading = false,
  className,
}: MapPickerProps) {
  const [allMazeData, setAllMazeData] = useState<Record<MapId, MazeData>>({} as Record<MapId, MazeData>);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMapId, setSelectedMapId] = useState<MapId>(currentMapId);
  
  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  // Load all maze data for previews (only after hydration)
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
  
  const handleMapSelect = (mapId: MapId) => {
    setSelectedMapId(mapId);
  };

  const handleConfirmSelection = async () => {
    if (selectedMapId === currentMapId || isLoading) return;
    
    try {
      await onMapChange(selectedMapId);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to change map:', error);
    }
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

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return '🟢';
      case 'medium':
        return '🟡';
      case 'hard':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className={cn("h-8 px-3", className)}
          disabled={isLoading}
          aria-label="Open map picker"
        >
          <span className="mr-2">🗺️</span>
          Choose Map
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Your Maze</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {availableMaps.map((map) => {
            const mazeData = allMazeData[map.id];
            const isSelected = selectedMapId === map.id;
            const isCurrent = currentMapId === map.id;
            
            return (
              <Card 
                key={map.id}
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:shadow-md",
                  isSelected && "ring-2 ring-primary shadow-lg",
                  isCurrent && "border-primary/50"
                )}
                onClick={() => handleMapSelect(map.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      {map.name}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <span className="text-xs" aria-hidden="true">
                        {getDifficultyIcon(map.difficulty)}
                      </span>
                      <Badge
                        variant="secondary"
                        className={cn("text-xs", getDifficultyColor(map.difficulty))}
                      >
                        {map.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col items-center gap-3">
                    {/* Map Preview */}
                    <div className="flex justify-center">
                      {mazeData ? (
                        <MapPreview 
                          mazeData={mazeData} 
                          size="sm" 
                          className="border rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded border flex items-center justify-center">
                          <span className="text-xs text-gray-500">Loading...</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Map Info */}
                    <div className="text-center space-y-1">
                      {mazeData && (
                        <p className="text-xs text-muted-foreground">
                          {mazeData.width} × {mazeData.height} grid
                        </p>
                      )}
                      {map.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {map.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="flex items-center gap-1 text-primary text-xs">
                        <span>✓</span>
                        <span>Selected</span>
                      </div>
                    )}
                    {isCurrent && !isSelected && (
                      <div className="flex items-center gap-1 text-muted-foreground text-xs">
                        <span>Current</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmSelection}
            disabled={selectedMapId === currentMapId || isLoading}
          >
            {isLoading ? 'Loading...' : 'Start Game'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
