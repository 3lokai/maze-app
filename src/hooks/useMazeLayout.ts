import { useState, useEffect } from 'react';
import type { MazeData } from '@/types/maze-app';
import { loadMazeLayout } from '@/lib/maze';

interface UseMazeLayoutReturn {
  mazeData: MazeData | null;
  isLoading: boolean;
  error: string | null;
  loadLayout: (filename: string) => Promise<void>;
}

export function useMazeLayout(): UseMazeLayoutReturn {
  const [mazeData, setMazeData] = useState<MazeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadLayout = async (filename: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await loadMazeLayout(filename);
      setMazeData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load maze layout');
      console.error('Error loading maze layout:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load default layout on mount
  useEffect(() => {
    loadLayout('forest-01.json');
  }, []);

  return {
    mazeData,
    isLoading,
    error,
    loadLayout
  };
}
