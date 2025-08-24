# Epic 1 — Flexible Players & Personalization

## 📋 Epic Overview

**Goal**: Transform the game from a fixed 2-player experience to a flexible 1-4 player system with personalization features that make each child feel ownership of their game experience.

**Business Value**: 
- Reduces setup friction for single players
- Enables family play with multiple children
- Increases engagement through personalization
- Provides clear progress tracking for parents

**Technical Scope**: 
- Player state management expansion
- UI component enhancements
- Settings modal implementation
- Data persistence for player configurations

---

## 🎯 Story Breakdown

### Story 1 — Single Player Default (S)
**Priority**: High - Foundation for all other stories

**User Story**: As a child, I want the game to start with one player ready so that I can play alone without setup.

**Acceptance Criteria**:
- Default state = 1 player (Player 1)
- Record box shows only that player's stats
- No empty placeholders for missing players

**Demo**: Load game → Record shows Player 1 row only

**Technical Implementation**:
- Modify game store to default to 1 player
- Update record panel to handle variable player count
- Remove hardcoded 2-player assumptions

**Dependencies**: None (foundation story)

---

### Story 2 — Add More Players (M)
**Priority**: High - Core multi-player functionality

**User Story**: As a parent, I want to add up to 4 players before play so that kids can take turns.

**Acceptance Criteria**:
- Parent Settings modal: "Add Player" → up to 4
- Record box expands vertically, one row per player
- Turn order cycles round-robin

**Demo**: Add Player 2 → Record shows both; executor alternates automatically

**Technical Implementation**:
- Extend player array to support 1-4 players
- Implement round-robin turn management
- Update record panel layout for variable height
- Add player management UI in settings

**Dependencies**: Story 1 (Single Player Default)

---

### Story 3 — Player Names & Emojis (M)
**Priority**: Medium - Personalization features

**User Story**: As a child, I want to see my name and animal token so that I feel the game is mine.

**Acceptance Criteria**:
- On Add Player, choose name (input) + emoji (picker grid 🐢🐰🦊🦁)
- Record row shows emoji + name
- Token in maze uses emoji

**Demo**: Add "Kimaya 🐰" → record shows 🐰 Kimaya row, maze token = 🐰

**Technical Implementation**:
- Create emoji picker component
- Extend player data structure with name/emoji
- Update maze renderer to use emoji tokens
- Update record panel to display emoji + name

**Dependencies**: Story 2 (Add More Players)

---

### Story 4 — Record Panel UI (S)
**Priority**: Medium - Enhanced UX

**User Story**: As a parent, I want the record box to clearly show wins, crashes, steps so that progress is visible.

**Acceptance Criteria**:
- Each row: emoji + name, Wins 🏆, Crashes 💥, Steps 👣
- Color-coded (green/red) for quick scan
- Totals row at bottom ("Overall")

**Demo**: Run → Player 1 wins → 🏆 increments; totals update

**Technical Implementation**:
- Redesign record panel layout
- Add color coding for stats
- Implement totals calculation
- Update stats tracking to include steps

**Dependencies**: Story 3 (Player Names & Emojis)

---

### Story 5 — Queue Tokens Polish (S)
**Priority**: Low - Visual polish

**User Story**: As a child, I want my queued commands to look fun and clear so that I can follow my plan.

**Acceptance Criteria**:
- Queue shows pills: arrow icon + number (⬆×3)
- Tokens colored per player
- Tap bounce animation on add/remove

**Demo**: Tap Up + 3 → queue shows ⬆×3 pill, colored green for Player 1

**Technical Implementation**:
- Redesign command queue pills
- Add player-specific color theming
- Implement bounce animations
- Update command builder UI

**Dependencies**: Story 3 (Player Names & Emojis)

---

### Story 6 — Progress Bar Upgrade (XS)
**Priority**: Low - Visual enhancement

**User Story**: As a child, I want to see how far I am in my run so that I can track progress.

**Acceptance Criteria**:
- Progress bar shows % + "2 / 7 steps"
- Bar color matches active player
- Bar fills step by step during execution

**Demo**: Queue 5 steps → run → bar fills step by step, 1/5 → 5/5

**Technical Implementation**:
- Enhance progress bar component
- Add step counter display
- Implement player color theming
- Connect to executor for real-time updates

**Dependencies**: Story 5 (Queue Tokens Polish)

---

### Story 7 — Parent Settings Modal (M)
**Priority**: Medium - Management interface

**User Story**: As a parent, I want a place to manage players and personalization so that setup is easy and hidden from kids.

**Acceptance Criteria**:
- ⚙️ Settings → modal with tabs (Players, Themes, Accessibility)
- Players tab: add/remove, edit name, pick emoji
- Accessibility tab reuses HC/Soft/Reduced Motion toggles

**Demo**: Open settings → add/edit/remove players, see live update in record panel

**Technical Implementation**:
- Create settings modal component
- Implement tabbed interface
- Build player management UI
- Integrate existing accessibility controls
- Add settings persistence

**Dependencies**: Stories 3, 4 (Player Names & Emojis, Record Panel UI)

---

## 🚀 Implementation Strategy

### Phase 1: Foundation (Stories 1-2)
1. **Story 1**: Single Player Default
   - Modify game store initialization
   - Update record panel for single player
   - Test default state

2. **Story 2**: Add More Players
   - Extend player management system
   - Implement round-robin turns
   - Update UI for variable player count

### Phase 2: Personalization (Stories 3-4)
3. **Story 3**: Player Names & Emojis
   - Build emoji picker component
   - Extend player data model
   - Update visual representations

4. **Story 4**: Record Panel UI
   - Redesign stats display
   - Add color coding
   - Implement totals

### Phase 3: Polish & Management (Stories 5-7)
5. **Story 5**: Queue Tokens Polish
   - Enhance command queue visuals
   - Add player theming
   - Implement animations

6. **Story 6**: Progress Bar Upgrade
   - Enhance progress tracking
   - Add player color theming
   - Connect to execution system

7. **Story 7**: Parent Settings Modal
   - Build comprehensive settings interface
   - Integrate all management features
   - Add persistence

---

## 🎯 Success Metrics

### User Experience
- **Setup Time**: Reduce from 30s to 5s for single player
- **Engagement**: 80% of players customize their character
- **Family Play**: Support 3+ players in 90% of family sessions

### Technical Quality
- **Performance**: No degradation with 4 players
- **Accessibility**: Maintain WCAG AA compliance
- **Data Integrity**: 100% player data persistence

### Business Impact
- **Adoption**: 50% increase in single-player sessions
- **Retention**: 30% increase in repeat family play
- **Satisfaction**: 4.5+ star rating for personalization features

---

## 🔧 Technical Considerations

### State Management
- Extend Zustand store for variable player count
- Implement player array with name/emoji properties
- Add settings persistence layer

### UI Components
- Create reusable emoji picker
- Build flexible record panel
- Implement tabbed settings modal

### Data Persistence
- Store player configurations in localStorage
- Maintain backward compatibility with v0
- Implement migration strategy

### Performance
- Optimize rendering for 4 players
- Lazy load emoji assets
- Efficient state updates

---

## 🚨 Risk Mitigation

### High Risk
- **Player State Complexity**: Start with 2-player expansion, then scale
- **UI Layout Changes**: Prototype record panel redesign early
- **Data Migration**: Test v0 → Epic 1 migration thoroughly

### Medium Risk
- **Emoji Compatibility**: Fallback to text tokens if needed
- **Settings Modal Complexity**: Build incrementally with core features first
- **Performance with 4 Players**: Monitor and optimize as needed

### Low Risk
- **Animation Performance**: Use CSS transforms for smooth animations
- **Local Storage Limits**: Implement data cleanup for old configurations

---

## 📋 Definition of Done

### For Each Story
- [ ] Acceptance criteria met
- [ ] Demo scenario works
- [ ] No console errors
- [ ] Responsive design maintained
- [ ] Accessibility standards met
- [ ] Unit tests added
- [ ] Code reviewed

### For Epic Completion
- [ ] All 7 stories completed
- [ ] End-to-end testing with 1-4 players
- [ ] Performance testing completed
- [ ] Accessibility audit passed
- [ ] Documentation updated
- [ ] Parent QA script updated
- [ ] Ready for production deployment
