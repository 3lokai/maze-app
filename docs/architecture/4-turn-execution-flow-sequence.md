# 4) Turn & Execution Flow (sequence)

## Turn Management *(ENHANCED)*

1. **Game Start**: Initialize with default single player (Player 1)
2. **Player Setup**: Parent can add/remove players (1-4 total)
3. **Turn Order**: Round-robin through active players: `[1]` → `[1,2]` → `[1,2,3]` → `[1,2,3,4]`
4. **Turn Switch**: `getNextPlayer(current, activePlayers)` → next active player
5. **Player Elimination**: Inactive players skip turns automatically

## Execution Flow

1. **Current Player's Turn**: `currentPlayer` builds command queue
2. **Queue Execution**: Run commands for current player only
3. **Result Handling**: 
   - **Success**: Switch to next active player
   - **Wall Hit**: Switch to next active player
   - **Goal Reached**: Win celebration, then next player or game end
4. **Turn Transition**: Clear current player's queue, update `currentPlayer`

## Player State Transitions

```
Single Player: [1] → [1] (loop)
Two Players:   [1] → [2] → [1] (loop)
Three Players: [1] → [2] → [3] → [1] (loop)
Four Players:  [1] → [2] → [3] → [4] → [1] (loop)
```

## Dynamic Player Management

- **Add Player**: Insert into `activePlayerIds`, initialize state
- **Remove Player**: Remove from `activePlayerIds`, cleanup state
- **Reorder Players**: Update `activePlayerIds` sequence
- **Player Deactivation**: Mark `isActive: false`, skip in turn order

