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

---

## 🎬 Demo Scenario

**Demo**: Load game → Record shows Player 1 row only

**Steps**:
1. Open the game in a fresh browser session
2. Observe the record panel on the right side
3. Verify only one player row is visible (Player 1)
4. Confirm no empty placeholders or missing player indicators

---

## 🔧 Technical Implementation

### Core Changes Required

1. **Game Store Modification**
   - Modify game store to default to 1 player instead of 2
   - Update initial state configuration
   - Ensure player array starts with single player

2. **Record Panel Updates**
   - Update record panel to handle variable player count
   - Remove hardcoded 2-player assumptions
   - Ensure single player display works correctly

3. **State Management**
   - Update any hardcoded player count references
   - Ensure turn management works with single player
   - Verify all game logic handles 1-player scenario

### Files to Modify

- `src/store/gameStore.ts` - Update default player count
- `src/components/GameRail.tsx` - Update record panel logic
- `src/hooks/useTurnManagement.ts` - Ensure single player compatibility

### Testing Checklist

- [ ] Fresh game load shows 1 player
- [ ] Record panel displays correctly
- [ ] Turn management works with single player
- [ ] No console errors
- [ ] Game functionality remains intact

---

## 🚨 Risk Considerations

- **Low Risk**: This is a foundation change that should be straightforward
- **Testing**: Ensure all existing functionality still works with single player
- **Backward Compatibility**: Maintain compatibility with existing game state

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
