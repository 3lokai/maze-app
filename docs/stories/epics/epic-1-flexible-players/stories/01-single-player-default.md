# Story Epic1-1 — Single Player Default (S)

## 📋 Story Overview

**Epic**: Epic 1 — Flexible Players & Personalization  
**Priority**: High - Foundation for all other stories  
**Size**: Small (S)  
**Dependencies**: None (foundation story)

---

## 🎯 User Story

**As a** child  
**I want** the game to start with one player ready  
**So that** I can play alone without setup

---

## ✅ Acceptance Criteria

- [ ] Default state = 1 player (Player 1)
- [ ] Record box shows only that player's stats
- [ ] No empty placeholders for missing players
- [ ] Turn management works correctly with single player
- [ ] Single player can complete full game cycle

---

## 🎬 Demo Scenario

**Demo**: Load game → Record shows Player 1 row only → Play complete game

**Steps**:
1. Open the game in a fresh browser session
2. Observe the record panel on the right side
3. Verify only one player row is visible (Player 1)
4. Confirm no empty placeholders or missing player indicators
5. Queue commands for the single player
6. Run execution - verify single player can move and reach goal
7. Verify turn management doesn't break with single player
8. Complete a full game cycle (start → goal → celebration → reset)

---

## 🔧 Technical Implementation

### Core Changes Required

1. **Game Store Modification**
   - Modify game store to default to 1 player instead of 2
   - Update initial state configuration
   - Ensure player array starts with single player
   - Add single player validation

2. **Record Panel Updates**
   - Update record panel to handle variable player count
   - Remove hardcoded 2-player assumptions
   - Ensure single player display works correctly
   - Add dynamic row generation

3. **State Management**
   - Update any hardcoded player count references
   - Ensure turn management works with single player
   - Verify all game logic handles 1-player scenario
   - Add edge case handling for single player

4. **Turn Management Edge Cases** ⚠️ **QA PRIORITY**
   - Handle single player turn cycling (no-op or continuous)
   - Ensure single player can complete full game cycle
   - Add validation for minimum player count
   - Test turn switching logic with single player

### Files to Modify

- `src/store/gameStore.ts` - Update default player count
- `src/components/GameRail.tsx` - Update record panel logic
- `src/hooks/useTurnManagement.ts` - Ensure single player compatibility
- `src/lib/executor.ts` - Handle single player execution

### Single Player Turn Logic

```typescript
// Single player turn management
const handleSinglePlayerTurn = () => {
  // For single player, turn switching is a no-op
  // or could trigger immediate next turn
  if (playerCount === 1) {
    return currentPlayer; // Stay on same player
  }
  // Normal turn switching for multiple players
  return nextPlayer;
};
```

### Testing Checklist

- [ ] Fresh game load shows 1 player
- [ ] Record panel displays correctly
- [ ] Turn management works with single player
- [ ] Single player can complete full game cycle
- [ ] No console errors
- [ ] Game functionality remains intact
- [ ] Turn switching doesn't break with single player
- [ ] Edge cases handled properly
- [ ] Backward compatibility maintained

---

## 🚨 Risk Considerations

- **Low Risk**: This is a foundation change that should be straightforward
- **Testing**: Ensure all existing functionality still works with single player
- **Backward Compatibility**: Maintain compatibility with existing game state
- **Turn Logic**: Verify single player turn management doesn't introduce bugs

---

## 📋 Definition of Done

- [ ] Acceptance criteria met
- [ ] Demo scenario works
- [ ] No console errors
- [ ] Responsive design maintained
- [ ] Accessibility standards met
- [ ] Unit tests added
- [ ] Code reviewed
- [ ] Integration tested with existing features
- [ ] Single player turn management tested
- [ ] Edge cases validated
- [ ] Backward compatibility verified

---

## 🔧 Migration Notes

- Ensure existing 2-player games can still load correctly
- Add data migration if needed for existing game states
- Test transition from 2-player to 1-player default
