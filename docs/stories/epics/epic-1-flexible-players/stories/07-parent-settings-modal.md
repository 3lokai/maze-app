# Story Epic1-7 — Basic Settings Modal (S)

## 📋 Story Overview

**Epic**: Epic 1 — Flexible Players & Personalization  
**Priority**: Medium - Management interface foundation  
**Size**: Small (S) - Reduced from Medium to address QA concerns  
**Dependencies**: Stories Epic1-3, Epic1-4 (Player Names & Emojis, Record Panel UI)

---

## 🎯 User Story

**As a** parent  
**I want** a simple settings modal to manage players  
**So that** I can add and remove players easily

---

## ✅ Acceptance Criteria

- [ ] ⚙️ Settings → simple modal (no tabs initially)
- [ ] Player management: add/remove players (max 4)
- [ ] Edit player name and emoji
- [ ] Live preview of changes in record panel

---

## 🎬 Demo Scenario

**Demo**: Open settings → add/edit/remove players, see live update in record panel

**Steps**:
1. Click gear icon (⚙️) to open settings modal
2. Verify modal opens with simple interface (no tabs)
3. Add new player with name and emoji
4. Edit existing player name/emoji
5. Remove a player (minimum 1 player required)
6. Verify record panel updates live
7. Test settings persistence across sessions

---

## 🔧 Technical Implementation

### Core Changes Required

1. **Simple Settings Modal Component**
   - Create basic settings modal component (no tabs)
   - Implement player management interface
   - Ensure proper modal behavior (open/close, backdrop)
   - Add responsive design for mobile

2. **Player Management UI**
   - Build simple player management interface
   - Implement add/remove player functionality
   - Add edit name/emoji capabilities
   - Ensure proper validation (max 4 players, min 1 player)

3. **Settings Persistence**
   - Implement basic settings persistence
   - Store player configurations in localStorage
   - Add data migration for existing settings
   - Ensure backward compatibility

### Files to Modify

- `src/components/SettingsDropdown.tsx` - Replace with modal
- `src/store/gameStore.ts` - Add settings persistence
- `src/types/maze.ts` - Extend for settings data

### New Components Needed

- `src/components/SettingsModal.tsx` - Basic settings modal
- `src/components/PlayerManagement.tsx` - Player management UI
- `src/components/SettingsPersistence.ts` - Settings storage

### Modal Structure (Simplified)

```
Settings Modal
├── Player Management
│   ├── Player List
│   ├── Add Player Button
│   ├── Edit Player Forms
│   └── Remove Player Buttons
└── Close Button
```

### Testing Checklist

- [ ] Modal opens/closes properly
- [ ] Player management functions work
- [ ] Settings persist across sessions
- [ ] Responsive design maintained
- [ ] Error handling works
- [ ] Data validation prevents issues
- [ ] Maximum 4 players enforced
- [ ] Minimum 1 player enforced

---

## 🚨 Risk Considerations

- **Low-Medium Risk**: Simplified modal component (reduced from High)
- **Data Migration**: Handling existing settings data
- **Validation**: Ensuring proper player count limits

---

## 📋 Definition of Done

- [ ] Acceptance criteria met
- [ ] Demo scenario works
- [ ] No console errors
- [ ] Responsive design maintained
- [ ] Accessibility standards met
- [ ] Unit tests added
- [ ] Code reviewed
- [ ] Settings persistence tested
- [ ] Data migration tested

---

## 🔄 Future Enhancements (Separate Stories)

- **Epic1-8**: Add tabbed interface with Themes tab
- **Epic1-9**: Integrate accessibility controls into modal
- **Epic1-10**: Advanced settings and preferences
