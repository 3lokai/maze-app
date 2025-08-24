# Story Epic1-4 — Record Panel UI (S)

## 📋 Story Overview

**Epic**: Epic 1 — Flexible Players & Personalization  
**Priority**: Medium - Enhanced UX  
**Size**: Small (S)  
**Dependencies**: Story Epic1-3 (Player Names & Emojis)

---

## 🎯 User Story

**As a** parent  
**I want** the record box to clearly show wins, crashes, steps  
**So that** progress is visible

---

## ✅ Acceptance Criteria

- [ ] Each row: emoji + name, Wins 🏆, Crashes 💥, Steps 👣
- [ ] Color-coded (green/red) for quick scan
- [ ] Totals row at bottom ("Overall")

---

## 🎬 Demo Scenario

**Demo**: Run → Player 1 wins → 🏆 increments; totals update

**Steps**:
1. Set up game with 2+ players with names/emojis
2. Queue and run commands for players
3. Observe record panel during execution
4. Verify wins increment with 🏆 icon
5. Verify crashes increment with 💥 icon
6. Verify steps increment with 👣 icon
7. Check color coding (green for wins, red for crashes)
8. Verify totals row updates correctly

---

## 🔧 Technical Implementation

### Core Changes Required

1. **Record Panel Layout Redesign**
   - Redesign record panel layout for enhanced stats display
   - Implement consistent column structure
   - Add proper spacing and alignment
   - Ensure responsive design

2. **Stats Display Enhancement**
   - Add emoji icons for each stat type (🏆💥👣)
   - Implement color coding system
   - Ensure clear visual hierarchy
   - Add proper number formatting

3. **Color Coding System**
   - Green for wins/positive stats
   - Red for crashes/negative stats
   - Neutral colors for steps/counts
   - Ensure accessibility compliance

4. **Totals Calculation**
   - Implement totals calculation for all players
   - Add "Overall" row at bottom
   - Ensure real-time updates during gameplay
   - Handle edge cases (no players, all zeros)

### Files to Modify

- `src/components/GameRail.tsx` - Main record panel redesign
- `src/store/gameStore.ts` - Add totals calculation logic
- `src/types/stats.ts` - Extend stats types if needed
- `src/styles/globals.css` - Add color coding styles

### Stats Display Format

Each player row should display:
```
🐰 Kimaya    🏆 2    💥 1    👣 15
```

Totals row:
```
Overall      🏆 5    💥 3    👣 42
```

### Testing Checklist

- [ ] All stats display with proper icons
- [ ] Color coding works correctly
- [ ] Totals calculation is accurate
- [ ] Real-time updates during gameplay
- [ ] Responsive design maintained
- [ ] Accessibility standards met
- [ ] Edge cases handled (no players, zeros)

---

## 🚨 Risk Considerations

- **Low Risk**: UI enhancement with existing data
- **Color Accessibility**: Ensure color coding works for colorblind users
- **Performance**: Ensure real-time updates don't impact performance
- **Layout**: Ensure design works with variable player count

---

## 📋 Definition of Done

- [ ] Acceptance criteria met
- [ ] Demo scenario works
- [ ] No console errors
- [ ] Responsive design maintained
- [ ] Accessibility standards met
- [ ] Unit tests added
- [ ] Code reviewed
- [ ] Color accessibility tested
- [ ] Performance tested with multiple players
