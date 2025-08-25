# Story Epic 1-1: Single Player Default (S)

## 📋 Story Overview

**Priority**: High - Foundation for all other stories  
**Size**: Small (S)  
**Dependencies**: None (foundation story)

**User Story**: As a child, I want the game to start with 1 player ready so that I can play alone without setup.

## ✅ Acceptance Criteria

- On load, `players[]` initialized with Player 1 only
- Record panel shows 1 row (Player 1)
- No "empty slots" rendered
- Demo: Load game → see Player 1 row in Record panel, can play immediately

## 🎯 Technical Implementation

### 1. Update Type Definitions

**File**: `src/types/maze-app.d.ts`

```typescript
// Update PlayerId type to support 1-4 players
export type PlayerId = 1 | 2 | 3 | 4;

// Add PlayerConfig interface
export interface PlayerConfig {
  id: PlayerId;
  name: string;
  emoji: string;
  color: string;
  isActive: boolean;
}

// Update GameState interface
export interface GameState {
  // ... existing properties ...
  players: PlayerConfig[];
  activePlayerIds: PlayerId[];
  currentPlayer: PlayerId | null;
  positions: Record<PlayerId, Cell>;
  trails: Record<PlayerId, Cell[]>;
  scores: Record<PlayerId, number>;
  crashes: Record<PlayerId, number>;
  wins: Record<PlayerId, number>;
}
```

### 2. Create Player Management Utilities

**File**: `src/lib/player-management.ts`

```typescript
import type { PlayerId, PlayerConfig } from '@/types/maze-app';

export const DEFAULT_PLAYER_CONFIGS: PlayerConfig[] = [
  { id: 1, name: "Player 1", emoji: "🐢", color: "player-badge-p1", isActive: true },
  { id: 2, name: "Player 2", emoji: "🦊", color: "player-badge-p2", isActive: false },
  { id: 3, name: "Player 3", emoji: "🐰", color: "player-badge-p3", isActive: false },
  { id: 4, name: "Player 4", emoji: "🦁", color: "player-badge-p4", isActive: false },
];

export const AVAILABLE_EMOJIS = ["🐢", "🦊", "🐰", "🦁"] as const;

export const getActivePlayers = (players: PlayerConfig[]): PlayerConfig[] => {
  return players.filter(player => player.isActive);
};

export const getActivePlayerIds = (players: PlayerConfig[]): PlayerId[] => {
  return getActivePlayers(players).map(player => player.id);
};
```

### 3. Refactor Game Store

**File**: `src/store/gameStore.ts`

```typescript
import { create } from 'zustand';
import type { PlayerId, PlayerConfig } from '@/types/maze-app';
import { DEFAULT_PLAYER_CONFIGS, getActivePlayerIds } from '@/lib/player-management';

interface GameState {
  // Player management
  players: PlayerConfig[];
  activePlayerIds: PlayerId[];
  currentPlayer: PlayerId | null;
  
  // Dynamic game state
  positions: Record<PlayerId, Cell>;
  trails: Record<PlayerId, Cell[]>;
  scores: Record<PlayerId, number>;
  crashes: Record<PlayerId, number>;
  wins: Record<PlayerId, number>;
  
  // ... existing properties ...
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initialize with single player
  players: [DEFAULT_PLAYER_CONFIGS[0]], // Only Player 1 active
  activePlayerIds: [1],
  currentPlayer: 1,
  
  // Initialize dynamic state for Player 1
  positions: { 1: { row: 0, col: 0 } }, // Start position
  trails: { 1: [] },
  scores: { 1: 0 },
  crashes: { 1: 0 },
  wins: { 1: 0 },
  
  // ... existing state and actions ...
}));
```

### 4. Update Stats Drawer Component

**File**: `src/components/StatsDrawer.tsx`

```typescript
import { useGameStore } from '@/store/gameStore';
import { getActivePlayers } from '@/lib/player-management';

export const StatsDrawer = () => {
  const players = useGameStore(state => state.players);
  const activePlayers = getActivePlayers(players);
  
  return (
    <div className="space-y-4">
      {activePlayers.map(player => (
        <PlayerRow key={player.id} player={player} />
      ))}
      {activePlayers.length > 1 && (
        <TotalsRow players={activePlayers} />
      )}
    </div>
  );
};

const PlayerRow = ({ player }: { player: PlayerConfig }) => {
  const { wins, crashes, scores } = useGameStore();
  
  return (
    <div className="flex items-center justify-between p-2 border-b last:border-b-0">
      <div className="flex items-center gap-2">
        <span className="text-lg">{player.emoji}</span>
        <span className="font-medium">{player.name}</span>
      </div>
      <div className="flex gap-4 text-sm">
        <span className="text-green-600">🏆 {wins[player.id] || 0}</span>
        <span className="text-red-600">💥 {crashes[player.id] || 0}</span>
        <span className="text-blue-600">👣 {scores[player.id] || 0}</span>
      </div>
    </div>
  );
};
```

### 5. Update Turn Indicator

**File**: `src/components/Header.tsx`

```typescript
import { useGameStore } from '@/store/gameStore';

export const TurnIndicator = () => {
  const { players, currentPlayer } = useGameStore();
  const currentPlayerConfig = players.find(p => p.id === currentPlayer);
  
  if (!currentPlayerConfig) return null;
  
  return (
    <Badge className={`${currentPlayerConfig.color} animate-pulse`}>
      <span>{currentPlayerConfig.emoji}</span>
      <span>{currentPlayerConfig.name}'s Turn</span>
    </Badge>
  );
};
```

## 🎨 UI/UX Requirements

### Record Panel Behavior
- **Single Player**: Shows only Player 1 row with emoji + name + stats
- **No Empty Slots**: No placeholder rows for inactive players
- **Immediate Playability**: Game ready to play as soon as loaded

### Responsive Design
- **Mobile**: Compact player row layout
- **Tablet/Desktop**: Standard spacing and layout
- **Accessibility**: Screen reader announces "Player 1's turn" with emoji description

## 🧪 Testing Requirements

### Unit Tests
- `getActivePlayers()` returns only active players
- `getActivePlayerIds()` returns correct player IDs
- Game store initializes with single player
- Stats drawer renders single player row

### Integration Tests
- Game loads with Player 1 ready to play
- Turn indicator shows Player 1's name and emoji
- Record panel displays Player 1 stats only
- No console errors on initialization

### Manual Testing
- Load game → verify single player setup
- Check record panel shows only Player 1
- Verify turn indicator displays correctly
- Test immediate playability

## 📋 Definition of Done

- [ ] Type definitions updated for 1-4 player support
- [ ] Player management utilities created
- [ ] Game store refactored for single player default
- [ ] Stats drawer updated for dynamic player count
- [ ] Turn indicator enhanced for player names
- [ ] No hardcoded 2-player assumptions remain
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] No console errors
- [ ] Responsive design verified
- [ ] Accessibility requirements met

## 🔗 Dependencies

- **None**: This is the foundation story for Epic 1
- **Next**: Story 2 (Add/Remove Players) builds on this foundation

## 📝 Notes

- This story establishes the foundation for flexible player management
- All subsequent stories will build on this single-player default
- The game should feel natural for single players while being extensible for multiple players
- Player colors and emojis are predefined but will be customizable in later stories
