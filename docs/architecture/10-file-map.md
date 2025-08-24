# 10) File Map

## Core Components
- `src/components/MazeRenderer.tsx` - Dynamic maze rendering (1-4 players)
- `src/components/TurnCard.tsx` - Dynamic turn indicator and scoreboard
- `src/components/CommandBuilder.tsx` - Player-specific command building
- `src/components/GameHUD.tsx` - Dynamic stats display (1-4 players)
- `src/components/PlayerManagement.tsx` *(NEW)* - Player settings interface
- `src/components/SettingsDropdown.tsx` *(ENHANCED)* - Enhanced settings with player management

## State Management
- `src/store/gameStore.ts` *(ENHANCED)* - Dynamic player state management
- `src/types/maze-app.d.ts` *(ENHANCED)* - Player configuration types

## Utilities
- `src/lib/player-management.ts` *(NEW)* - Player configuration utilities
- `src/lib/maze.ts` - Maze data and helpers
- `src/lib/executor.ts` - Command execution engine

## Hooks
- `src/hooks/usePlayerManagement.ts` *(NEW)* - Player management logic
- `src/hooks/useTurnManagement.ts` *(ENHANCED)* - Dynamic turn management

