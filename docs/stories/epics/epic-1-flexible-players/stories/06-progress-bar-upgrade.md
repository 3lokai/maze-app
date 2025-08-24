# Story Epic1-6 — Progress Bar Upgrade (XS)

## 📋 Story Overview

**Epic**: Epic 1 — Flexible Players & Personalization  
**Priority**: Low - Visual enhancement  
**Size**: Extra Small (XS)  
**Dependencies**: Story Epic1-5 (Queue Tokens Polish)

---

## 🎯 User Story

**As a** child  
**I want** to see how far I am in my run  
**So that** I can track progress

---

## ✅ Acceptance Criteria

- [ ] Progress bar shows % + "2 / 7 steps"
- [ ] Bar color matches active player
- [ ] Bar fills step by step during execution

---

## 🎬 Demo Scenario

**Demo**: Queue 5 steps → run → bar fills step by step, 1/5 → 5/5

**Steps**:
1. Set up game with 2+ players with different colors
2. Queue 5 steps for current player
3. Start execution
4. Observe progress bar during execution
5. Verify bar shows "1/5", "2/5", etc.
6. Verify bar fills step by step
7. Verify bar color matches active player
8. Switch to different player and repeat

---

## 🔧 Technical Implementation

### Core Changes Required

1. **Progress Bar Component Enhancement**
   - Enhance existing progress bar component
   - Add step counter display
   - Implement percentage calculation
   - Ensure smooth progress updates

2. **Player Color Theming Integration**
   - Connect progress bar to player color themes
   - Update bar color based on active player
   - Ensure color consistency with queue tokens
   - Add smooth color transitions

3. **Real-Time Progress Updates**
   - Connect to executor for real-time updates
   - Update progress on each step completion
   - Ensure accurate step counting
   - Handle edge cases (no commands, execution complete)

4. **Visual Polish**
   - Add smooth fill animations
   - Ensure proper text contrast
   - Add responsive design considerations
   - Implement accessibility features

### Files to Modify

- `src/components/GameRail.tsx` - Progress bar integration
- `src/hooks/useExecutor.ts` - Connect to execution progress
- `src/store/gameStore.ts` - Track execution progress
- `src/styles/globals.css` - Progress bar styling

### Progress Display Format

- Text: "2 / 7 steps" or "40%"
- Bar: Visual progress indicator
- Color: Matches active player theme

### Animation Specifications

- Fill animation: Smooth transition during execution
- Color transition: Smooth when switching players
- Duration: 0.3s ease-out for color changes
- Respects reduced motion preferences

### Testing Checklist

- [ ] Progress bar shows correct step count
- [ ] Bar fills step by step during execution
- [ ] Bar color matches active player
- [ ] Smooth animations work properly
- [ ] Handles edge cases (no commands, complete)
- [ ] Responsive design maintained
- [ ] Accessibility standards met

---

## 🚨 Risk Considerations

- **Low Risk**: Visual enhancement with existing data
- **Animation Performance**: Ensure smooth performance during execution
- **Color Consistency**: Ensure colors match player themes exactly
- **Real-Time Updates**: Ensure progress updates don't impact performance

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
- [ ] Color consistency verified
- [ ] Real-time updates tested
