# Epic 1 Implementation Guide: Flexible Players & Personalization

## Overview

This guide provides step-by-step implementation instructions for Epic 1, transforming the maze game from a fixed 2-player system to a flexible 1-4 player system with personalization features.

## Implementation Phases

### Phase 1: Type System & Store Foundation

#### 1.1 Update Type Definitions

**File**: `src/types/maze-app.d.ts`

```typescript
// Update PlayerId type
export type PlayerId = 1 | 2 | 3 | 4;

// Add PlayerConfig interface
export interface PlayerConfig {
  id: PlayerId;
  name: string;
  emoji: string;
  color: string;
  isActive: boolean;
}

// Add PlayerSettings interface
export interface PlayerSettings {
  maxPlayers: 4;
  allowCustomNames: boolean;
  allowCustomEmojis: boolean;
}

// Update GameState interface
export interface GameState {
  // ... existing properties ...
  players: PlayerConfig[];
  activePlayerIds: PlayerId[];
  currentPlayer: PlayerId | null;
  playerSettings: PlayerSettings;
}
```

#### 1.2 Create Player Management Utilities

**File**: `src/lib/player-management.ts`

```typescript
import type { PlayerId, PlayerConfig, PlayerSettings } from '@/types/maze-app';

export const DEFAULT_PLAYER_CONFIGS: PlayerConfig[] = [
  { id: 1, name: "Player 1", emoji: "🐢", color: "player-badge-p1", isActive: true },
  { id: 2, name: "Player 2", emoji: "🦊", color: "player-badge-p2", isActive: false },
  { id: 3, name: "Player 3", emoji: "🐰", color: "player-badge-p3", isActive: false },
  { id: 4, name: "Player 4", emoji: "🦁", color: "player-badge-p4", isActive: false },
];

export const AVAILABLE_EMOJIS = ["🐢", "🦊", "🐰", "🦁"] as const;

export const getNextPlayer = (current: PlayerId, activePlayers: PlayerId[]): PlayerId => {
  if (activePlayers.length === 0) return null;
  if (activePlayers.length === 1) return activePlayers[0];
  
  const currentIndex = activePlayers.indexOf(current);
  const nextIndex = (currentIndex + 1) % activePlayers.length;
  return activePlayers[nextIndex];
};

export const validatePlayerConfig = (config: Partial<PlayerConfig>): boolean => {
  // Implementation for validation logic
  return true;
};
```

#### 1.3 Refactor Game Store

**File**: `src/store/gameStore.ts`

```typescript
import { create } from 'zustand';
import type { PlayerId, PlayerConfig, PlayerSettings } from '@/types/maze-app';
import { DEFAULT_PLAYER_CONFIGS, getNextPlayer } from '@/lib/player-management';

interface GameState {
  // Player management
  players: PlayerConfig[];
  activePlayerIds: PlayerId[];
  currentPlayer: PlayerId | null;
  playerSettings: PlayerSettings;
  
  // Dynamic game state
  positions: Record<PlayerId, Cell>;
  trails: Record<PlayerId, Cell[]>;
  scores: Record<PlayerId, number>;
  crashes: Record<PlayerId, number>;
  wins: Record<PlayerId, number>;
  
  // ... existing properties ...
  
  // Player management actions
  addPlayer: (config: Partial<PlayerConfig>) => void;
  removePlayer: (id: PlayerId) => void;
  updatePlayer: (id: PlayerId, updates: Partial<PlayerConfig>) => void;
  togglePlayerActive: (id: PlayerId) => void;
  switchToNextPlayer: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  players: DEFAULT_PLAYER_CONFIGS,
  activePlayerIds: [1],
  currentPlayer: 1,
  playerSettings: {
    maxPlayers: 4,
    allowCustomNames: true,
    allowCustomEmojis: true,
  },
  
  // Dynamic state initialization
  positions: { 1: DEFAULT_INITIAL_POSITION },
  trails: { 1: [DEFAULT_INITIAL_POSITION] },
  scores: { 1: 0 },
  crashes: { 1: 0 },
  wins: { 1: 0 },
  
  // ... existing state ...
  
  // Player management actions
  addPlayer: (config) => {
    set((state) => {
      const newPlayer = { ...DEFAULT_PLAYER_CONFIGS[config.id - 1], ...config, isActive: true };
      const updatedPlayers = [...state.players, newPlayer];
      const updatedActiveIds = [...state.activePlayerIds, newPlayer.id];
      
      // Initialize state for new player
      const startPosition = state.positions[1]; // Use first player's position as template
      
      return {
        players: updatedPlayers,
        activePlayerIds: updatedActiveIds,
        positions: { ...state.positions, [newPlayer.id]: startPosition },
        trails: { ...state.trails, [newPlayer.id]: [startPosition] },
        scores: { ...state.scores, [newPlayer.id]: 0 },
        crashes: { ...state.crashes, [newPlayer.id]: 0 },
        wins: { ...state.wins, [newPlayer.id]: 0 },
      };
    });
  },
  
  removePlayer: (id) => {
    set((state) => {
      const updatedPlayers = state.players.map(p => 
        p.id === id ? { ...p, isActive: false } : p
      );
      const updatedActiveIds = state.activePlayerIds.filter(pid => pid !== id);
      
      // Handle current player if removed
      let newCurrentPlayer = state.currentPlayer;
      if (state.currentPlayer === id) {
        newCurrentPlayer = updatedActiveIds.length > 0 ? updatedActiveIds[0] : null;
      }
      
      return {
        players: updatedPlayers,
        activePlayerIds: updatedActiveIds,
        currentPlayer: newCurrentPlayer,
      };
    });
  },
  
  updatePlayer: (id, updates) => {
    set((state) => ({
      players: state.players.map(p => 
        p.id === id ? { ...p, ...updates } : p
      ),
    }));
  },
  
  togglePlayerActive: (id) => {
    set((state) => {
      const player = state.players.find(p => p.id === id);
      if (!player) return state;
      
      const newIsActive = !player.isActive;
      const updatedActiveIds = newIsActive 
        ? [...state.activePlayerIds, id]
        : state.activePlayerIds.filter(pid => pid !== id);
      
      // Handle current player if deactivated
      let newCurrentPlayer = state.currentPlayer;
      if (!newIsActive && state.currentPlayer === id) {
        newCurrentPlayer = updatedActiveIds.length > 0 ? updatedActiveIds[0] : null;
      }
      
      return {
        players: state.players.map(p => 
          p.id === id ? { ...p, isActive: newIsActive } : p
        ),
        activePlayerIds: updatedActiveIds,
        currentPlayer: newCurrentPlayer,
      };
    });
  },
  
  switchToNextPlayer: () => {
    set((state) => {
      if (!state.currentPlayer || state.activePlayerIds.length === 0) return state;
      
      const nextPlayer = getNextPlayer(state.currentPlayer, state.activePlayerIds);
      return {
        currentPlayer: nextPlayer,
        commandQueue: [], // Clear current player's queue
      };
    });
  },
  
  // ... existing actions ...
}));
```

### Phase 2: Component Refactoring

#### 2.1 Update TurnCard Component

**File**: `src/components/TurnCard.tsx`

```typescript
import { Badge } from "@/components/ui/badge";
import type { PlayerId, PlayerConfig } from '@/types/maze-app';
import { cn } from "@/lib/utils";

interface TurnCardProps {
  currentPlayer: PlayerId | null;
  players: PlayerConfig[];
  wins: Record<PlayerId, number>;
  status?: string;
}

export function TurnCard({ currentPlayer, players, wins, status }: TurnCardProps) {
  const currentPlayerConfig = players.find(p => p.id === currentPlayer);
  const activePlayers = players.filter(p => p.isActive);
  
  if (!currentPlayerConfig) {
    return <div>No active players</div>;
  }

  const getStatusText = () => {
    switch (status) {
      case 'executing':
        return '🔄 Executing...';
      case 'hitWall':
        return '💥 Collision!';
      case 'reachedGoal':
        return '🎯 Goal Reached!';
      default:
        return '🎮 Your Turn';
    }
  };

  const getAriaStatusText = () => {
    switch (status) {
      case 'executing':
        return `${currentPlayerConfig.name} is executing commands`;
      case 'hitWall':
        return `${currentPlayerConfig.name} hit a wall`;
      case 'reachedGoal':
        return `${currentPlayerConfig.name} reached the goal`;
      default:
        return `${currentPlayerConfig.name}'s turn`;
    }
  };

  return (
    <div 
      className="text-center space-y-3"
      role="status"
      aria-live="polite"
      aria-label={`Turn status: ${getAriaStatusText()}`}
    >
      <div className="space-y-2">
        <Badge 
          className={cn(
            "text-lg px-4 py-2 transition-all duration-300",
            currentPlayerConfig.color,
            "animate-pulse shadow-lg"
          )}
          aria-label={`${currentPlayerConfig.name} token, ${currentPlayerConfig.emoji}`}
        >
          <span className="mr-2" aria-hidden="true">{currentPlayerConfig.emoji}</span>
          {currentPlayerConfig.name}
        </Badge>
        <div className="text-sm font-medium text-foreground">
          {getStatusText()}
        </div>
      </div>
      
      {/* Dynamic Scoreboard */}
      <div className="text-sm text-muted-foreground">
        <span aria-label={`Wins: ${activePlayers.map(p => `${p.name} ${wins[p.id]}`).join(', ')}`}>
          🏆 Wins: {activePlayers.map(p => `${p.emoji} ${wins[p.id]}`).join(' · ')}
        </span>
      </div>
    </div>
  );
}
```

#### 2.2 Create PlayerManagement Component

**File**: `src/components/PlayerManagement.tsx`

```typescript
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { PlayerConfig } from '@/types/maze-app';
import { AVAILABLE_EMOJIS } from '@/lib/player-management';

interface PlayerManagementProps {
  players: PlayerConfig[];
  onAddPlayer: (config: Partial<PlayerConfig>) => void;
  onUpdatePlayer: (id: number, updates: Partial<PlayerConfig>) => void;
  onTogglePlayerActive: (id: number) => void;
}

export function PlayerManagement({ 
  players, 
  onAddPlayer, 
  onUpdatePlayer, 
  onTogglePlayerActive 
}: PlayerManagementProps) {
  const [editingPlayer, setEditingPlayer] = useState<number | null>(null);

  const handleAddPlayer = () => {
    const nextId = players.find(p => !p.isActive)?.id || 1;
    onAddPlayer({ id: nextId as any });
  };

  const handleUpdatePlayer = (id: number, field: keyof PlayerConfig, value: any) => {
    onUpdatePlayer(id, { [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Player Management</h3>
        <Button 
          onClick={handleAddPlayer}
          disabled={players.filter(p => p.isActive).length >= 4}
        >
          Add Player
        </Button>
      </div>
      
      <div className="space-y-3">
        {players.map((player) => (
          <div key={player.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{player.emoji}</span>
                <span className="font-medium">{player.name}</span>
              </div>
              <Switch
                checked={player.isActive}
                onCheckedChange={() => onTogglePlayerActive(player.id)}
              />
            </div>
            
            {player.isActive && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={player.name}
                    onChange={(e) => handleUpdatePlayer(player.id, 'name', e.target.value)}
                    placeholder="Player name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Emoji</label>
                  <Select
                    value={player.emoji}
                    onValueChange={(value) => handleUpdatePlayer(player.id, 'emoji', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABLE_EMOJIS.map((emoji) => (
                        <SelectItem key={emoji} value={emoji}>
                          {emoji}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Phase 3: Integration & Polish

#### 3.1 Update Main Page Component

**File**: `src/app/page.tsx`

```typescript
import { useGameStore } from '@/store/gameStore';
import { TurnCard } from '@/components/TurnCard';
import { PlayerManagement } from '@/components/PlayerManagement';
// ... other imports

export default function HomePage() {
  const { 
    players, 
    currentPlayer, 
    wins, 
    status,
    addPlayer, 
    updatePlayer, 
    togglePlayerActive 
  } = useGameStore();

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Area */}
        <div className="lg:col-span-2 space-y-4">
          <TurnCard 
            currentPlayer={currentPlayer}
            players={players}
            wins={wins}
            status={status}
          />
          {/* ... other game components */}
        </div>
        
        {/* Settings Panel */}
        <div className="space-y-4">
          <PlayerManagement
            players={players}
            onAddPlayer={addPlayer}
            onUpdatePlayer={updatePlayer}
            onTogglePlayerActive={togglePlayerActive}
          />
        </div>
      </div>
    </div>
  );
}
```

#### 3.2 Update Other Components

- **MazeRenderer**: Update to render only active players
- **GameHUD**: Update to show stats for all active players
- **CommandBuilder**: Add player-specific styling
- **SettingsDropdown**: Integrate PlayerManagement component

## Testing Strategy

### Unit Tests

1. **Player Management Logic**
   - Add/remove players
   - Update player configurations
   - Turn management with variable player counts

2. **State Consistency**
   - Active player validation
   - Current player assignment
   - State initialization for new players

### Integration Tests

1. **Component Integration**
   - TurnCard with dynamic players
   - PlayerManagement with store
   - Settings integration

2. **User Flows**
   - Single player to multi-player transition
   - Player customization workflow
   - Turn switching with variable counts

## Migration Checklist

- [ ] Update type definitions
- [ ] Create player management utilities
- [ ] Refactor game store
- [ ] Update TurnCard component
- [ ] Create PlayerManagement component
- [ ] Update main page integration
- [ ] Update other components
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Test backward compatibility
- [ ] Update documentation

## Backward Compatibility

- Default to single player mode (Player 1)
- Maintain existing 2-player functionality
- Gradual migration path for existing state
- No breaking changes to existing game logic

## Performance Considerations

- Lazy load player management components
- Optimize re-renders with React.memo
- Efficient state updates for dynamic players
- Minimal impact on existing game performance
