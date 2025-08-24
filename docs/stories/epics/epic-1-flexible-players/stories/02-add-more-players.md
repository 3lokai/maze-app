# Story Epic1-2 — Add More Players (M)

## 📋 Story Overview

**Epic**: Epic 1 — Flexible Players & Personalization  
**Priority**: High - Core multi-player functionality  
**Size**: Medium (M)  
**Dependencies**: Story Epic1-1 (Single Player Default)

---

## 🎯 User Story

**As a** parent  
**I want** to add up to 4 players before play  
**So that** kids can take turns

---

## ✅ Acceptance Criteria

- [ ] Parent Settings modal: "Add Player" → up to 4
- [ ] Record box expands vertically, one row per player
- [ ] Turn order cycles round-robin
- [ ] Type system supports 1-4 players (not just 1-2)

---

## 🎬 Demo Scenario

**Demo**: Add Player 2 → Record shows both; executor alternates automatically

**Steps**:
1. Open game (starts with 1 player)
2. Access parent settings (gear icon)
3. Click "Add Player" button
4. Verify record panel now shows 2 player rows
5. Queue commands for both players
6. Run execution - verify turn alternates between players
7. Repeat to add up to 4 players total
8. Verify type system handles all player IDs correctly

---

## 🔧 Technical Implementation

### Core Changes Required

1. **Type System Extension** ⚠️ **CRITICAL QA FIX**
   - Extend `PlayerId` type from `1 | 2` to `1 | 2 | 3 | 4`
   - Update all type definitions to support 1-4 players
   - Ensure backward compatibility with existing code
   - Add runtime validation for player count limits

2. **Player Array Extension**
   - Extend player array to support 1-4 players
   - Update player data structure for scalability
   - Implement dynamic player management
   - Add proper initialization for new players

3. **Round-Robin Turn Management**
   - Implement round-robin turn cycling
   - Update turn logic to handle variable player count
   - Ensure proper turn order maintenance
   - Add validation for minimum 1 player

4. **Record Panel Layout**
   - Update record panel layout for variable height
   - Implement dynamic row generation
   - Ensure proper spacing and alignment
   - Add responsive design for 4 players

5. **Player Management UI**
   - Add player management UI in settings
   - Implement "Add Player" functionality
   - Add player removal capability
   - Ensure proper validation (max 4 players, min 1 player)

### Files to Modify

- `src/types/maze-app.d.ts` - **CRITICAL**: Extend PlayerId type
- `src/store/gameStore.ts` - Extend player array and management
- `src/hooks/useTurnManagement.ts` - Implement round-robin logic
- `src/components/GameRail.tsx` - Update record panel for variable players
- `src/components/SettingsDropdown.tsx` - Add player management UI
- `src/types/maze.ts` - Update player type definitions

### Type System Changes (QA Priority)

```typescript
// BEFORE (Current)
export type PlayerId = 1 | 2;

// AFTER (Required for Epic1-2)
export type PlayerId = 1 | 2 | 3 | 4;

// Add validation utilities
export const isValidPlayerId = (id: number): id is PlayerId => 
  id >= 1 && id <= 4;

export const getMaxPlayers = (): number => 4;
export const getMinPlayers = (): number => 1;
```

### New Components Needed

- Player management interface in settings
- Dynamic record panel row generation
- Turn indicator for current player
- Player count validation utilities

### Testing Checklist

- [ ] Type system supports 1-4 players correctly
- [ ] Can add up to 4 players
- [ ] Record panel expands correctly
- [ ] Turn order cycles properly
- [ ] Player removal works
- [ ] Settings validation prevents >4 players
- [ ] Settings validation prevents <1 player
- [ ] All existing functionality preserved
- [ ] Backward compatibility maintained
- [ ] Runtime validation works correctly

---

## 🚨 Risk Considerations

- **Medium Risk**: Complex state management changes
- **Critical Risk**: Type system changes require careful migration
- **UI Layout**: Record panel redesign needed
- **Turn Logic**: Round-robin implementation complexity
- **Testing**: Extensive testing needed for all player combinations

---

## 📋 Definition of Done

- [ ] Acceptance criteria met
- [ ] Demo scenario works
- [ ] Type system changes implemented and tested
- [ ] No console errors
- [ ] Responsive design maintained
- [ ] Accessibility standards met
- [ ] Unit tests added
- [ ] Code reviewed
- [ ] Tested with 1, 2, 3, and 4 players
- [ ] Turn management verified for all combinations
- [ ] Backward compatibility verified
- [ ] Runtime validation tested

---

## 🔧 Migration Strategy

1. **Phase 1**: Extend type system with backward compatibility
2. **Phase 2**: Update store to handle 1-4 players
3. **Phase 3**: Update UI components for variable player count
4. **Phase 4**: Implement player management features
5. **Phase 5**: Comprehensive testing and validation
