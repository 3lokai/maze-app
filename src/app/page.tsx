"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MazeRenderer } from "@/components/MazeRenderer";
import { Celebration } from "@/components/Celebration";
import { useGameStore } from "@/store/gameStore";
import { useExecutor } from "@/hooks/useExecutor";
import { useCollision } from "@/hooks/useCollision";
import { useCelebration } from "@/hooks/useCelebration";
import { useTurnManagement } from "@/hooks/useTurnManagement";
import { Toaster } from "@/components/ui/sonner";
import { MAZE_DATA, memoryManager } from "@/lib/maze";
import { Header } from "@/components/Header";
import { GameRail } from "@/components/GameRail";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useMazeLayout, type MapId } from "@/hooks/useMazeLayout";
import { GameAnnouncement } from "@/components/GameAnnouncement";
import { MapPicker } from "@/components/MapPicker";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import type { GameStatus } from "@/types/maze-app";
import { cn } from "@/lib/utils";
import { Monitor, Smartphone, BookOpen, Brain } from "lucide-react";

// Mobile detection hook
function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile, isClient };
}

// Desktop-only warning component
function DesktopOnlyWarning() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-xl p-8 border border-blue-200">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Monitor className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Desktop Learning Experience
        </h1>
        
        <div className="space-y-4 text-gray-600 mb-6">
          <div className="flex items-center justify-center gap-3">
            <Smartphone className="w-5 h-5 text-red-500" />
            <span className="text-sm">Not available on mobile devices</span>
          </div>
          
          <div className="flex items-center justify-center gap-3">
            <BookOpen className="w-5 h-5 text-green-500" />
            <span className="text-sm">Designed for focused learning</span>
          </div>
          
          <div className="flex items-center justify-center gap-3">
            <Brain className="w-5 h-5 text-blue-500" />
            <span className="text-sm">Builds programming skills</span>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-800 font-medium">
            💡 <strong>Why desktop only?</strong>
          </p>
          <p className="text-xs text-blue-700 mt-2">
            This educational game is designed for focused learning on larger screens. 
            It helps kids develop programming logic and problem-solving skills 
            without the distractions of mobile devices.
          </p>
        </div>
        
        <div className="mt-6 text-xs text-gray-500">
          <p>Please use a laptop or desktop computer for the best learning experience.</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { isMobile, isClient } = useMobileDetection();
  
  // All hooks must be called before any conditional returns
  const { 
    positions, 
    trails, 
    currentPlayer, 
    status,
    winner,
    showCelebration,
    setShowCelebration,
    showAnnouncement,
    setShowAnnouncement,
    commandQueue,
    addCommand,
    removeLastCommand,
    removeCommandAtIndex,
    clearCommandQueue,
    setPosition,
    addToTrail,
    incrementCrash,
    setStatus,
    resetGame,
    playerConfigs
  } = useGameStore();

  const { settings } = useAccessibility();

  // Load maze layout
  const { 
    mazeData, 
    isLoading, 
    error, 
    currentMapId, 
    availableMaps, 
    switchMap 
  } = useMazeLayout();

  // Set up celebration logic
  useCelebration(mazeData || MAZE_DATA);

  // Set up turn management
  useTurnManagement();

  // Set up collision detection
  const {
    collisionState,
    triggerCollision,
  } = useCollision();

  // Set up executor for current player
  const currentPosition = positions[currentPlayer];
  
  // Safety check: if current player position doesn't exist, use maze start position
  const safeCurrentPosition = currentPosition || (mazeData?.start || { r: 0, c: 0 });
  
  // Convert CommandToken to CmdToken for executor
  const convertedQueue = commandQueue.map(token => ({
    dir: token.direction,
    n: token.steps
  }));
  
  const {
    executionState,
    runQueue,
    stepQueue,
    stopExecution,
  } = useExecutor(
    safeCurrentPosition,
    (position) => setPosition(currentPlayer, position),
    (position) => addToTrail(currentPlayer, position),
    {
      onError: (stepIndex, position) => {
        triggerCollision(position, stepIndex, currentPlayer, incrementCrash);
        setStatus('hitWall');
      },
      onGoal: () => {
        setStatus('reachedGoal');
      },
      onDone: () => {
        setStatus('idle');
      },
      onStatusChange: (status) => {
        setStatus(status as GameStatus);
      },
    },
    mazeData || MAZE_DATA, // Use loaded maze data or fallback to hardcoded
    settings.executionSpeed // Use speed from accessibility settings
  );

  // Performance monitoring setup
  useEffect(() => {
    if (mazeData) {
      const isLargeGrid = mazeData.width > 15 || mazeData.height > 15;
      
      // Set up memory tracking for large grids
      if (isLargeGrid) {
        const memoryTracker = memoryManager.createMemoryTracker();
        
        const memoryInterval = setInterval(() => {
          memoryTracker.snapshot();
          
          // Check for memory leaks
          if (memoryTracker.detectLeak()) {
            console.warn('Memory leak detected - performing cleanup');
            memoryManager.cleanup.fullCleanup();
          }
        }, 5000);

        return () => {
          clearInterval(memoryInterval);
          memoryManager.cleanup.fullCleanup();
        };
      }
    }
  }, [mazeData]);

  // Show announcement when status changes
  useEffect(() => {
    if (status === 'idle' && !showAnnouncement) {
      // Show "Ready Player 1" when game starts
      setShowAnnouncement(true);
    } else if (status === 'executing' || status === 'hitWall' || status === 'reachedGoal') {
      setShowAnnouncement(true);
    }
  }, [status, showAnnouncement, setShowAnnouncement]);

  // Reset game with maze start position when maze data is loaded
  useEffect(() => {
    if (mazeData) {
      resetGame(mazeData);
      // Debug: Log maze structure to console
      console.log('Loaded maze data:', mazeData);
      import('@/lib/maze').then(({ debugMazeGraph }) => {
        debugMazeGraph(mazeData);
      });
    }
  }, [mazeData, resetGame]);

  // Handle map changes
  const handleMapChange = async (mapId: string) => {
    try {
      await switchMap(mapId as MapId);
      // The maze data will be updated by the hook, which will trigger the resetGame effect
    } catch (error) {
      console.error('Failed to switch map:', error);
    }
  };
  
  // Show desktop-only warning on mobile
  if (isClient && isMobile) {
    return <DesktopOnlyWarning />;
  }
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading maze layout...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Error loading maze: {error}</p>
          <p>Using fallback maze layout</p>
        </div>
      </div>
    );
  }

  // Use loaded maze data or fallback to hardcoded
  const currentMazeData = mazeData || MAZE_DATA;
  
  // Get current player configuration
  const currentPlayerConfig = playerConfigs[currentPlayer];
  const currentPlayerEmoji = currentPlayerConfig?.emoji || '🐢';
  const currentPlayerName = currentPlayerConfig?.name || `Player ${currentPlayer}`;
  
  return (
    <div className="min-h-screen bg-background p-2 sm:p-4">
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <Header />

        {/* Performance Monitor for Large Grids */}
        {currentMazeData && (currentMazeData.width > 15 || currentMazeData.height > 15) && (
          <PerformanceMonitor 
            maze={currentMazeData} 
            isVisible={true} 
          />
        )}

        {/* Main Game Container - Desktop-optimized layout */}
        <main id="main-content" className="flex flex-col lg:grid lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Maze Area - Full width on tablet, left column on desktop */}
          <div className="w-full lg:col-span-2" role="region" aria-labelledby="maze-section-title">
            <div className="w-full max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span id="maze-section-title" className="text-lg font-semibold">Maze Grid</span>
                  <MapPicker
                    currentMapId={currentMapId}
                    availableMaps={availableMaps as unknown as Array<{readonly id: MapId; readonly name: string; readonly difficulty: string; readonly description: string}>}
                    onMapChange={handleMapChange}
                    isLoading={isLoading}
                  />
                </div>
                {/* Compact Player Turn Indicator */}
                <Badge 
                  className={cn(
                    "text-sm px-3 py-1 transition-all duration-300 animate-pulse shadow-lg self-start sm:self-auto",
                    currentPlayer === 1 
                      ? "bg-primary text-primary-foreground shadow-primary/50" 
                      : "bg-secondary text-secondary-foreground shadow-secondary/50"
                  )}
                  aria-label={`${currentPlayerEmoji} ${currentPlayerName}'s turn`}
                >
                  <span className="mr-1" aria-hidden="true">
                    {currentPlayerEmoji}
                  </span>
                  {currentPlayerName}
                </Badge>
              </div>
              <MazeRenderer 
                positions={positions}
                trails={trails}
                currentPlayer={currentPlayer}
                collisionCell={collisionState.collisionCell}
                isColliding={collisionState.isColliding}
                theme={currentMazeData.theme}
                previewPath={settings.previewPath}
                maze={currentMazeData}
              />
            </div>
          </div>

          {/* Game Rail - Full width on tablet, right column on desktop */}
          <div className="w-full lg:w-auto">
            <GameRail
              commandQueue={commandQueue}
              executionState={executionState}
              onAddCommand={addCommand}
              onUndo={removeLastCommand}
              onReset={clearCommandQueue}
              onRun={() => runQueue(convertedQueue)}
              onStep={() => stepQueue(convertedQueue)}
              onStop={stopExecution}
              onRemoveCommand={removeCommandAtIndex}
            />
          </div>
        </main>
      </div>
      
      {/* Celebration Overlay */}
      <Celebration 
        show={showCelebration}
        winner={winner}
        onComplete={() => setShowCelebration(false)}
        mazeSize={currentMazeData ? { width: currentMazeData.width, height: currentMazeData.height } : undefined}
      />

      {/* Game Announcement */}
      <GameAnnouncement />
      
      <Toaster />
    </div>
  );
}
