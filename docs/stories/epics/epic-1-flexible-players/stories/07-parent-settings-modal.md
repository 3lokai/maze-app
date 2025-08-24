# Story Epic1-7 — Parent Settings Modal (M)

## 📋 Story Overview

**Epic**: Epic 1 — Flexible Players & Personalization  
**Priority**: Medium - Management interface  
**Size**: Medium (M)  
**Dependencies**: Stories Epic1-3, Epic1-4 (Player Names & Emojis, Record Panel UI)

---

## 🎯 User Story

**As a** parent  
**I want** a place to manage players and personalization  
**So that** setup is easy and hidden from kids

---

## ✅ Acceptance Criteria

- [ ] ⚙️ Settings → modal with tabs (Players, Themes, Accessibility)
- [ ] Players tab: add/remove, edit name, pick emoji
- [ ] Accessibility tab reuses HC/Soft/Reduced Motion toggles

---

## 🎬 Demo Scenario

**Demo**: Open settings → add/edit/remove players, see live update in record panel

**Steps**:
1. Click gear icon (⚙️) to open settings modal
2. Verify modal opens with tabbed interface
3. Navigate to "Players" tab
4. Add new player with name and emoji
5. Edit existing player name/emoji
6. Remove a player
7. Verify record panel updates live
8. Navigate to "Accessibility" tab
9. Verify existing accessibility controls are present
10. Test settings persistence across sessions

---

## 🔧 Technical Implementation

### Core Changes Required

1. **Settings Modal Component**
   - Create comprehensive settings modal component
   - Implement tabbed interface (Players, Themes, Accessibility)
   - Ensure proper modal behavior (open/close, backdrop)
   - Add responsive design for mobile

2. **Tabbed Interface Implementation**
   - Build tab navigation system
   - Implement content switching between tabs
   - Ensure proper tab state management
   - Add visual feedback for active tab

3. **Player Management UI**
   - Build player management interface in Players tab
   - Implement add/remove player functionality
   - Add edit name/emoji capabilities
   - Ensure proper validation and error handling

4. **Accessibility Integration**
   - Reuse existing accessibility controls
   - Integrate HC/Soft/Reduced Motion toggles
   - Ensure proper accessibility compliance
   - Maintain existing functionality

5. **Settings Persistence**
   - Implement settings persistence layer
   - Store player configurations in localStorage
   - Add data migration for existing settings
   - Ensure backward compatibility

### Files to Modify

- `src/components/SettingsDropdown.tsx` - Replace with modal
- `src/components/AccessibilitySettings.tsx` - Integrate into modal
- `src/store/gameStore.ts` - Add settings persistence
- `src/types/maze.ts` - Extend for settings data

### New Components Needed

- `src/components/SettingsModal.tsx` - Main settings modal
- `src/components/SettingsTabs.tsx` - Tab navigation
- `src/components/PlayerManagement.tsx` - Player management UI
- `src/components/SettingsPersistence.ts` - Settings storage

### Modal Structure

```
Settings Modal
├── Players Tab
│   ├── Player List
│   ├── Add Player Button
│   ├── Edit Player Forms
│   └── Remove Player Buttons
├── Themes Tab
│   └── (Future theme options)
└── Accessibility Tab
    ├── High Contrast Toggle
    ├── Soft Colors Toggle
    └── Reduced Motion Toggle
```

### Testing Checklist

- [ ] Modal opens/closes properly
- [ ] Tab navigation works correctly
- [ ] Player management functions work
- [ ] Settings persist across sessions
- [ ] Accessibility controls function properly
- [ ] Responsive design maintained
- [ ] Error handling works
- [ ] Data validation prevents issues

---

## 🚨 Risk Considerations

- **Medium Risk**: Complex modal component with multiple features
- **Data Migration**: Handling existing settings data
- **UI Complexity**: Tabbed interface implementation
- **Persistence**: Ensuring settings don't get corrupted

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
- [ ] Cross-browser compatibility verified
