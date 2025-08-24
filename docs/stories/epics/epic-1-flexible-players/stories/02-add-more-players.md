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

---

## 🔧 Technical Implementation

### Core Changes Required

1. **Player Array Extension**
   - Extend player array to support 1-4 players
   - Update player data structure for scalability
   - Implement dynamic player management

2. **Round-Robin Turn Management**
   - Implement round-robin turn cycling
   - Update turn logic to handle variable player count
   - Ensure proper turn order maintenance

3. **Record Panel Layout**
   - Update record panel layout for variable height
   - Implement dynamic row generation
   - Ensure proper spacing and alignment

4. **Player Management UI**
   - Add player management UI in settings
   - Implement "Add Player" functionality
   - Add player removal capability
   - Ensure proper validation (max 4 players)

### Files to Modify

- `src/store/gameStore.ts` - Extend player array and management
- `src/hooks/useTurnManagement.ts` - Implement round-robin logic
- `src/components/GameRail.tsx` - Update record panel for variable players
- `src/components/SettingsDropdown.tsx` - Add player management UI
- `src/types/maze.ts` - Update player type definitions

### New Components Needed

- Player management interface in settings
- Dynamic record panel row generation
- Turn indicator for current player

### Testing Checklist

- [ ] Can add up to 4 players
- [ ] Record panel expands correctly
- [ ] Turn order cycles properly
- [ ] Player removal works
- [ ] Settings validation prevents >4 players
- [ ] All existing functionality preserved

---

## 🚨 Risk Considerations

- **Medium Risk**: Complex state management changes
- **UI Layout**: Record panel redesign needed
- **Turn Logic**: Round-robin implementation complexity
- **Testing**: Extensive testing needed for all player combinations

---

## 📋 Definition of Done

- [ ] Acceptance criteria met
- [ ] Demo scenario works
- [ ] No console errors
- [ ] Responsive design maintained
- [ ] Accessibility standards met
- [ ] Unit tests added
- [ ] Code reviewed
- [ ] Tested with 1, 2, 3, and 4 players
- [ ] Turn management verified for all combinations
