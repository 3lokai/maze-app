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
- [ ] Existing players get default names/emojis
- [ ] Data migration handles legacy player data

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
9. Test with existing players (should get default names/emojis)

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

3. **Data Migration Strategy** ⚠️ **QA PRIORITY**
   - Implement migration for existing players without names/emojis
   - Add default name generation (Player 1, Player 2, etc.)
   - Add default emoji assignment (🐢 for Player 1, 🦊 for Player 2, etc.)
   - Ensure backward compatibility with existing game states
   - Add migration validation and error handling

4. **Maze Renderer Updates**
   - Update maze renderer to use emoji tokens
   - Implement emoji display for each player
   - Ensure proper sizing and positioning
   - Add fallback for unsupported emojis

5. **Record Panel Updates**
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
- Data migration utilities

### Data Migration Implementation

```typescript
// Default player configuration
const DEFAULT_PLAYER_CONFIG = {
  1: { name: "Player 1", emoji: "🐢" },
  2: { name: "Player 2", emoji: "🦊" },
  3: { name: "Player 3", emoji: "🐰" },
  4: { name: "Player 4", emoji: "🦁" }
};

// Migration function
const migratePlayerData = (existingPlayers: Player[]) => {
  return existingPlayers.map((player, index) => ({
    ...player,
    name: player.name || DEFAULT_PLAYER_CONFIG[player.id]?.name || `Player ${player.id}`,
    emoji: player.emoji || DEFAULT_PLAYER_CONFIG[player.id]?.emoji || "🐢"
  }));
};
```

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
- [ ] Data migration works for existing players
- [ ] Default names/emojis assigned correctly
- [ ] Backward compatibility maintained
- [ ] Migration error handling works

---

## 🚨 Risk Considerations

- **Medium Risk**: Emoji compatibility across devices
- **Medium Risk**: Data migration complexity
- **UI Complexity**: Emoji picker component design
- **Data Integrity**: Ensuring migration doesn't corrupt existing data
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
- [ ] Migration error handling tested
- [ ] Backward compatibility verified

---

## 🔧 Migration Strategy

1. **Phase 1**: Implement data structure changes
2. **Phase 2**: Create migration utilities
3. **Phase 3**: Test migration with existing data
4. **Phase 4**: Deploy with migration safeguards
5. **Phase 5**: Monitor for migration issues
