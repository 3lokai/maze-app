"use client";

import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { MazeRenderer } from "@/components/MazeRenderer";

import { Celebration } from "@/components/Celebration";
import { useGameStore } from "@/store/gameStore";
import { useExecutor } from "@/hooks/useExecutor";
import { useCollision } from "@/hooks/useCollision";
import { useCelebration } from "@/hooks/useCelebration";
import { useTurnManagement } from "@/hooks/useTurnManagement";
import { Toaster } from "@/components/ui/sonner";
import { MAZE_DATA } from "@/lib/maze";
import { Header } from "@/components/Header";
import { GameRail } from "@/components/GameRail";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useMazeLayout } from "@/hooks/useMazeLayout";
import { GameAnnouncement } from "@/components/GameAnnouncement";
import type { GameStatus } from "@/types/maze-app";
import { cn } from "@/lib/utils";

export default function Home() {
  const { 
    positions, 
    trails, 
    currentPlayer, 
    status,
    wins,
    winner,
    showCelebration,
    setShowCelebration,
    showAnnouncement,
    setShowAnnouncement,
    commandQueue,
    addCommand,
    removeLastCommand,
    clearCommandQueue,
    setPosition,
    addToTrail,
    incrementCrash,
    setStatus,
    resetGame
  } = useGameStore();

  const { settings } = useAccessibility();

  // Load maze layout
  const { mazeData, isLoading, error } = useMazeLayout();

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
    currentPosition,
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
  
  return (
    <div className="min-h-screen bg-background p-4">
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <Header />

        {/* Main Game Container */}
        <main id="main-content" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Maze Area - Left Column */}
          <div className="lg:col-span-2" role="region" aria-labelledby="maze-section-title">
            <div className="w-full max-w-2xl mx-auto">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" aria-label={`Maze size: ${currentMazeData.width} by ${currentMazeData.height} cells`}>
                    {currentMazeData.width}×{currentMazeData.height}
                  </Badge>
                  <span id="maze-section-title" className="text-lg font-semibold">Maze Grid</span>
                </div>
                {/* Compact Player Turn Indicator */}
                <Badge 
                  className={cn(
                    "text-sm px-3 py-1 transition-all duration-300 animate-pulse shadow-lg",
                    currentPlayer === 1 
                      ? "bg-primary text-primary-foreground shadow-primary/50" 
                      : "bg-secondary text-secondary-foreground shadow-secondary/50"
                  )}
                  aria-label={`${currentPlayer === 1 ? 'Turtle' : 'Fox'} Player ${currentPlayer}'s turn`}
                >
                  <span className="mr-1" aria-hidden="true">
                    {currentPlayer === 1 ? '🐢' : '🦊'}
                  </span>
                  Player {currentPlayer}
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

          {/* Game Rail - Right Column */}
          <GameRail
            wins={wins}
            commandQueue={commandQueue}
            executionState={executionState}
            onAddCommand={addCommand}
            onUndo={removeLastCommand}
            onReset={clearCommandQueue}
            onRun={() => runQueue(convertedQueue)}
            onStep={() => stepQueue(convertedQueue)}
            onStop={stopExecution}
          />
        </main>
      </div>
      
      {/* Celebration Overlay */}
      <Celebration 
        show={showCelebration}
        winner={winner}
        onComplete={() => setShowCelebration(false)}
      />

      {/* Game Announcement */}
      <GameAnnouncement />
      
      <Toaster />
    </div>
  );
}
