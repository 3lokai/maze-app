import { useState, useEffect } from 'react';
import type { MazeData } from '@/types/maze-app';
import { loadMazeLayout } from '@/lib/maze';

// Available map layouts
export const AVAILABLE_MAPS = [
  { id: 'forest-01.json', name: 'Forest Path', difficulty: 'Easy' },
  { id: 'garden-01.json', name: 'Garden Maze', difficulty: 'Easy' },
  { id: 'castle-01.json', name: 'Castle Courtyard', difficulty: 'Medium' },
  { id: 'city-01.json', name: 'City Streets', difficulty: 'Medium' },
  { id: 'mountain-01.json', name: 'Mountain Trail', difficulty: 'Hard' },
] as const;

export type MapId = typeof AVAILABLE_MAPS[number]['id'];

interface UseMazeLayoutReturn {
  mazeData: MazeData | null;
  isLoading: boolean;
  error: string | null;
  currentMapId: MapId;
  availableMaps: typeof AVAILABLE_MAPS;
  loadLayout: (filename: MapId) => Promise<void>;
  switchMap: (mapId: MapId) => Promise<void>;
}

const STORAGE_KEY = 'maze-app-current-map';
const DEFAULT_MAP_ID: MapId = 'forest-01.json';

function getStoredMapId(): MapId {
  if (typeof window === 'undefined') return DEFAULT_MAP_ID;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && AVAILABLE_MAPS.some(map => map.id === stored)) {
      return stored as MapId;
    }
  } catch (error) {
    console.warn('Failed to read stored map ID:', error);
  }
  
  return DEFAULT_MAP_ID;
}

function storeMapId(mapId: MapId): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, mapId);
  } catch (error) {
    console.warn('Failed to store map ID:', error);
  }
}

export function useMazeLayout(): UseMazeLayoutReturn {
  const [mazeData, setMazeData] = useState<MazeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Always start with default map ID to ensure consistent hydration
  const [currentMapId, setCurrentMapId] = useState<MapId>(DEFAULT_MAP_ID);
  const [isHydrated, setIsHydrated] = useState(false);

  const loadLayout = async (filename: MapId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await loadMazeLayout(filename);
      setMazeData(data);
      setCurrentMapId(filename);
      storeMapId(filename);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load maze layout');
      console.error('Error loading maze layout:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const switchMap = async (mapId: MapId) => {
    if (mapId === currentMapId) return;
    await loadLayout(mapId);
  };

  // Handle hydration and localStorage reading
  useEffect(() => {
    setIsHydrated(true);
    
    // Only read from localStorage after hydration
    const storedMapId = getStoredMapId();
    if (storedMapId !== currentMapId) {
      setCurrentMapId(storedMapId);
    }
  }, [currentMapId]);

  // Load layout when currentMapId changes (but only after hydration)
  useEffect(() => {
    if (isHydrated) {
      loadLayout(currentMapId);
    }
  }, [currentMapId, isHydrated]);

  return {
    mazeData,
    isLoading,
    error,
    currentMapId,
    availableMaps: AVAILABLE_MAPS,
    loadLayout,
    switchMap
  };
}
