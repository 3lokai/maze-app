# Story Epic1-3 — Player Names & Emojis (M)

## 📋 Story Overview

**Epic**: Epic 1 — Flexible Players & Personalization  
**Priority**: Medium - Personalization features  
**Size**: Medium (M)  
**Dependencies**: Story Epic1-2 (Add More Players)

---

## 🎯 User Story

**As a** child  
**I want** to see my name and animal token  
**So that** I feel the game is mine

---

## ✅ Acceptance Criteria

- [ ] On Add Player, choose name (input) + emoji (picker grid 🐢🐰🦊🦁)
- [ ] Record row shows emoji + name
- [ ] Token in maze uses emoji

---

## 🎬 Demo Scenario

**Demo**: Add "Kimaya 🐰" → record shows 🐰 Kimaya row, maze token = 🐰

**Steps**:
1. Open game and access settings
2. Click "Add Player"
3. Enter name "Kimaya" in text input
4. Select 🐰 emoji from picker grid
5. Save player configuration
6. Verify record panel shows "🐰 Kimaya" row
7. Verify maze displays 🐰 token for that player
8. Repeat for additional players with different names/emojis

---

## 🔧 Technical Implementation

### Core Changes Required

1. **Emoji Picker Component**
   - Create reusable emoji picker component
   - Implement grid layout with animal emojis
   - Add selection state and visual feedback
   - Ensure accessibility compliance

2. **Player Data Structure Extension**
   - Extend player data structure with name/emoji properties
   - Update type definitions for new fields
   - Implement data validation for names/emojis
   - Add default values for existing players

3. **Maze Renderer Updates**
   - Update maze renderer to use emoji tokens
   - Implement emoji display for each player
   - Ensure proper sizing and positioning
   - Add fallback for unsupported emojis

4. **Record Panel Updates**
   - Update record panel to display emoji + name
   - Implement proper layout for emoji + text
   - Ensure consistent styling across all player rows
   - Add proper spacing and alignment

### Files to Modify

- `src/types/maze.ts` - Extend player type with name/emoji
- `src/store/gameStore.ts` - Update player data structure
- `src/components/PlayerToken.tsx` - Use emoji tokens
- `src/components/GameRail.tsx` - Display emoji + names
- `src/components/SettingsDropdown.tsx` - Add name/emoji input

### New Components Needed

- `src/components/EmojiPicker.tsx` - Emoji selection component
- Player name input field
- Emoji display components

### Emoji Set

Available emojis: 🐢🐰🦊🦁 (turtle, rabbit, fox, lion)

### Testing Checklist

- [ ] Emoji picker displays correctly
- [ ] Name input works properly
- [ ] Record panel shows emoji + name
- [ ] Maze tokens display emojis
- [ ] Multiple players can have different emojis
- [ ] Emoji picker is accessible
- [ ] Fallback handling for unsupported emojis

---

## 🚨 Risk Considerations

- **Medium Risk**: Emoji compatibility across devices
- **UI Complexity**: Emoji picker component design
- **Data Migration**: Handling existing players without names/emojis
- **Accessibility**: Ensuring emoji picker is screen reader friendly

---

## 📋 Definition of Done

- [ ] Acceptance criteria met
- [ ] Demo scenario works
- [ ] No console errors
- [ ] Responsive design maintained
- [ ] Accessibility standards met
- [ ] Unit tests added
- [ ] Code reviewed
- [ ] Emoji picker tested across devices
- [ ] Data migration tested for existing players
