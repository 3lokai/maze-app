# Player Management Module

## Overview

The Player Management Module provides flexible player configuration and personalization for the maze game, supporting 1-4 players with customizable names, emojis, and colors.

## Core Types

```typescript
type PlayerId = 1 | 2 | 3 | 4;

interface PlayerConfig {
  id: PlayerId;
  name: string;
  emoji: string;
  color: string;
  isActive: boolean;
}

interface PlayerSettings {
  maxPlayers: 4;
  allowCustomNames: boolean;
  allowCustomEmojis: boolean;
}
```

## Default Player Templates

```typescript
const DEFAULT_PLAYER_CONFIGS: PlayerConfig[] = [
  { id: 1, name: "Player 1", emoji: "🐢", color: "player-badge-p1", isActive: true },
  { id: 2, name: "Player 2", emoji: "🦊", color: "player-badge-p2", isActive: false },
  { id: 3, name: "Player 3", emoji: "🐰", color: "player-badge-p3", isActive: false },
  { id: 4, name: "Player 4", emoji: "🦁", color: "player-badge-p4", isActive: false },
];
```

## Available Emojis

- 🐢 Turtle (Player 1 default)
- 🦊 Fox (Player 2 default)
- 🐰 Rabbit (Player 3 default)
- 🦁 Lion (Player 4 default)

## Player Colors

- `player-badge-p1`: Primary color (blue)
- `player-badge-p2`: Secondary color (orange)
- `player-badge-p3`: Tertiary color (green)
- `player-badge-p4`: Quaternary color (purple)

## State Management

### Player Configuration State

```typescript
interface PlayerState {
  players: PlayerConfig[];
  activePlayerIds: PlayerId[];
  currentPlayer: PlayerId | null;
  playerSettings: PlayerSettings;
}
```

### Player Actions

```typescript
// Player Management
addPlayer: (config: Partial<PlayerConfig>) => void;
removePlayer: (id: PlayerId) => void;
updatePlayer: (id: PlayerId, updates: Partial<PlayerConfig>) => void;
togglePlayerActive: (id: PlayerId) => void;

// Turn Management
getNextPlayer: (current: PlayerId, activePlayers: PlayerId[]) => PlayerId;
switchToNextPlayer: () => void;
```

## Component Integration

### PlayerManagement Component

- **Purpose**: Settings interface for player configuration
- **Features**: Add/remove players, name editing, emoji selection, color customization
- **Integration**: Connected to settings dropdown

### Dynamic UI Components

- **TurnCard**: Adapts to show current player's name and emoji
- **GameHUD**: Dynamic stats display for 1-4 players
- **MazeRenderer**: Renders tokens for active players only
- **CommandBuilder**: Player-specific queue styling

## Turn Management Logic

### Round-Robin Implementation

```typescript
const getNextPlayer = (current: PlayerId, activePlayers: PlayerId[]): PlayerId => {
  if (activePlayers.length === 0) return null;
  if (activePlayers.length === 1) return activePlayers[0];
  
  const currentIndex = activePlayers.indexOf(current);
  const nextIndex = (currentIndex + 1) % activePlayers.length;
  return activePlayers[nextIndex];
};
```

### Player State Transitions

1. **Single Player**: `[1]` → `[1]` (loop)
2. **Two Players**: `[1]` → `[2]` → `[1]` (loop)
3. **Three Players**: `[1]` → `[2]` → `[3]` → `[1]` (loop)
4. **Four Players**: `[1]` → `[2]` → `[3]` → `[4]` → `[1]` (loop)

## Validation Rules

### Player Configuration

- **Names**: 1-20 characters, alphanumeric + spaces
- **Emojis**: Must be from approved list
- **Colors**: Must be valid CSS color classes
- **Active Players**: Minimum 1, maximum 4

### State Consistency

- **Active Players**: Must have at least one active player
- **Current Player**: Must be an active player or null
- **Player IDs**: Must be unique and sequential (1-4)

## Migration from v0

### Backward Compatibility

- **Default State**: Single player (Player 1) active
- **Existing Games**: Maintain current 2-player functionality
- **State Migration**: Gradual transition to new player system

### Breaking Changes

- `PlayerId` type expanded from `1 | 2` to `1 | 2 | 3 | 4`
- Player state moved from hardcoded to dynamic configuration
- Turn management logic updated for variable player counts

## Future Extensibility

### Player Presets

- Save/load player configurations
- Template player setups for different scenarios
- Import/export player settings

### Advanced Personalization

- Custom emoji uploads
- Player avatars and themes
- Player-specific sound effects

### Multi-Game Support

- Player statistics across multiple games
- Player ranking and achievements
- Persistent player profiles
