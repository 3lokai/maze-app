# Story Epic1-5 — Queue Tokens Polish (S)

## 📋 Story Overview

**Epic**: Epic 1 — Flexible Players & Personalization  
**Priority**: Low - Visual polish  
**Size**: Small (S)  
**Dependencies**: Story Epic1-3 (Player Names & Emojis)

---

## 🎯 User Story

**As a** child  
**I want** my queued commands to look fun and clear  
**So that** I can follow my plan

---

## ✅ Acceptance Criteria

- [ ] Queue shows pills: arrow icon + number (⬆×3)
- [ ] Tokens colored per player
- [ ] Tap bounce animation on add/remove

---

## 🎬 Demo Scenario

**Demo**: Tap Up + 3 → queue shows ⬆×3 pill, colored green for Player 1

**Steps**:
1. Set up game with 2+ players with different emojis
2. Select Player 1 (green theme)
3. Tap Up direction button
4. Tap "3" on number pad
5. Verify queue shows "⬆×3" pill in green
6. Select Player 2 (different color theme)
7. Add commands for Player 2
8. Verify queue shows different colored pills
9. Tap to remove commands - verify bounce animation

---

## 🔧 Technical Implementation

### Core Changes Required

1. **Command Queue Pills Redesign**
   - Redesign command queue pills with new format
   - Implement arrow icon + number display (⬆×3)
   - Ensure clear visual hierarchy
   - Add proper spacing and sizing

2. **Player-Specific Color Theming**
   - Implement color themes for each player
   - Apply colors to queue pills based on active player
   - Ensure color contrast meets accessibility standards
   - Add fallback colors for edge cases

3. **Bounce Animation Implementation**
   - Add tap bounce animation on command add
   - Add tap bounce animation on command remove
   - Ensure smooth, performant animations
   - Add animation preferences for accessibility

4. **Command Builder UI Updates**
   - Update command builder to reflect new pill design
   - Ensure proper integration with existing functionality
   - Maintain responsive design
   - Add visual feedback for active player

### Files to Modify

- `src/components/CommandQueue.tsx` - Main queue pill redesign
- `src/components/CommandBuilder.tsx` - Update builder integration
- `src/components/NumberPad.tsx` - Ensure proper number input
- `src/components/DirectionButtons.tsx` - Ensure proper direction input
- `src/styles/animations.css` - Add bounce animations

### Color Theme System

Player color themes:
- Player 1: Green (#22c55e)
- Player 2: Blue (#3b82f6)
- Player 3: Purple (#8b5cf6)
- Player 4: Orange (#f97316)

### Animation Specifications

- Bounce animation: 0.2s ease-out
- Scale: 1.0 → 1.1 → 1.0
- Trigger: On add/remove command
- Respects reduced motion preferences

### Testing Checklist

- [ ] Queue pills display correct format (⬆×3)
- [ ] Player colors apply correctly
- [ ] Bounce animations work smoothly
- [ ] Animations respect accessibility settings
- [ ] All command types display properly
- [ ] Responsive design maintained
- [ ] Color contrast meets standards

---

## 🚨 Risk Considerations

- **Low Risk**: Visual polish with existing functionality
- **Animation Performance**: Ensure smooth performance on all devices
- **Color Accessibility**: Ensure color themes work for colorblind users
- **Animation Accessibility**: Respect reduced motion preferences

---

## 📋 Definition of Done

- [ ] Acceptance criteria met
- [ ] Demo scenario works
- [ ] No console errors
- [ ] Responsive design maintained
- [ ] Accessibility standards met
- [ ] Unit tests added
- [ ] Code reviewed
- [ ] Animation performance tested
- [ ] Color accessibility verified
- [ ] Reduced motion preferences respected
