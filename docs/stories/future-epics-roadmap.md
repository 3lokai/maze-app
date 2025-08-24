# 🚀 Future Epics & Roadmap

## 🎯 Current Implementation Status

### ✅ **Completed Core Features**
- **Path Creation**: DFS route generation with visual highlighting
- **Maze Layout Loading**: JSON validation and compilation system
- **Constrained Movement**: Path validation with detailed error reporting
- **Theme Labels**: Visual badge system with accessibility support
- **Trail Visualization**: Color-coded player trails
- **Error Handling**: Robust validation and user feedback

### 🚀 **Ready for Future Enhancements**
- Multiple maze layout selection
- Dynamic path generation algorithms
- Advanced collision detection
- Performance optimization for large mazes
- Interactive path editing tools
- Advanced theme customization

---

## 📋 Epic Roadmap

### Epic 1 — Flexible Players & Personalization
* **Default Single-Player Mode**: Game starts with 1 player ready, no setup required.
* **Multi-Player Support**: Parent can add up to 4 players with round-robin turn order.
* **Player Personalization**: Players choose names + animal emoji sprites (🐢🐰🦊🦁).
* **Adaptive Record Panel**: Dynamic rows for 1–4 players, shows emoji + stats clearly.
* **Enhanced Record Panel**: Clear stats display with wins, crashes, steps per player.
* **Queue Token Polish**: Colored command pills with player-specific styling.
* **Progress Bar Upgrade**: Step-by-step progress tracking with player colors.
* **Parent Settings → Player Management**: Add/remove/edit players, emoji selection, name customization.

### Epic 2 — Maps & Maze Renderer Stability (UX Overhaul)
* **Multiple Maps**: Add multiple maps with rising complexity (small → medium → large).
* **Larger Grid Support**: 15×15, 20×20 grid support with responsive scaling.
* **Responsive Scaling**: Preserve square cells across all devices with aspect-ratio lock + overlay labels.
* **Aspect-Ratio Lock**: Cells stay perfect squares across all devices.
* **Label Overlays**: Labels & emojis as overlays (no cell stretching).
* **Horizontal Viewport**: Scrolling viewport with follow-camera for large mazes.
* **Viewport UX**: Ensure maze + right rail work gracefully on small screens; responsive stack mode for phones.
* **Renderer Performance**: Optimize rendering for big mazes and smooth animations.
* **Map Library Loader**: Quick swap between layouts with preview system.
* **UX Overhaul Polish**: Header-centric controls, simplified rail, bigger buttons, progress bar, tap bounce animations.

### Epic 3 — Parent Section & Landing Page
* **Landing Page**: Next.js marketing style page explaining coding pedagogy and benefits.
* **Player Management**: Add/remove/edit players, emoji selection, name customization (shared with Epic 1).
* **Game Settings**: Grid size, hazards toggle, themes, accessibility controls.
* **Local Persistence (M)**: Save players, settings, and stats in localStorage for immediate use.
* **Supabase Upgrade (M)**: Replace localStorage with Supabase tables for multi-device persistence.
* **Parent Auth (M)**: Simple magic link login for parents.
* **Persistence Layer**: localStorage / Supabase integration for settings + stats.
* **Productization**: Bridge "toy" → full-fledged edtech web app with professional presentation.
* **Settings Dashboard**: Comprehensive parent control panel with progress tracking.

### Epic 4 — Chapter Selection / Curriculum Mode
* **Chapter Screen**: Entry through structured curriculum (sequencing, multipliers, checks, hazards).
* **Coding Concepts per Chapter**: Sequencing → Multipliers → Checks/Conditionals → Hazards.
* **Map-Chapter Integration**: Maps tied to chapters with difficulty ramping.
* **Unlock Progression**: Badge system and chapter completion tracking.
* **Chapter Badges**: Visual rewards (stickers, icons) per concept mastered.
* **Parent Dashboard**: Track child's progress (chapters mastered, concepts learned).
* **Curriculum Structure**: Structured pedagogy with clear learning objectives.
* **Progress Analytics**: Detailed insights into learning progression and concept mastery.

### Epic: Accessibility Enhancements
* **Color-blind Friendly**: Alternative color schemes and high-contrast options.
* **Soft Mode**: Warm palette theme for reduced visual stress.
* **Reduced Motion Defaults**: Animations subtle by default on mobile.
* **Text-to-Speech**: Audio feedback for moves, actions, and achievements.
* **Enhanced ARIA**: Comprehensive screen reader support and keyboard navigation.
* **Focus Management**: Logical tab order and focus indicators.
* **NEW:** Enhanced theme label accessibility leveraging existing system.

### Epic: Technical Infrastructure
* **Config-driven Architecture**: JSON-based level definitions with feature flags.
* **Hazard Registry**: Pluggable complication framework with step-check functions.
* **Executor Extensibility**: Allow hazards / checks as pluggable step evaluators.
* **Player Array Expansion**: Support for 1-4 players with flexible state management.
* **Campaign Loader**: Dynamic level loading from JSON definitions.
* **Theme System**: CSS custom properties for multiple theme support.
* **Persistence Hooks**: Abstracted storage interface (local first, Supabase later).
* **Data Model Spec**: Players, maps, settings, stats, progress.
* **Migration Plan**: localStorage → Supabase with minimal code change.
* **Localization**: i18n system for multilingual token support.
* **NEW:** Path creation and visualization system ready for advanced features.

---

## 🎯 Implementation Priority Notes

### **Foundation Complete** ✅
- Core path creation system implemented
- Maze layout loading and validation working
- Constrained movement with detailed feedback
- Theme system with accessibility support

### **Next Phase Focus**
- **Epic 1**: Build flexible player system with personalization features
- **Epic 2**: Scale maze renderer and UX for larger, more complex maps
- **Epic 3**: Productize with landing page and parent-facing features
- **Epic 4**: Implement structured curriculum with progression tracking

### **Technical Debt & Infrastructure**
- Path creation system provides solid foundation for all future epics
- Layout compilation system ready for multiple maze formats
- Theme system extensible for advanced customization
- Error handling robust for complex scenarios

---

## 🚀 Quick Wins (Ready to Implement)

### **Epic 1 Quick Wins**
1. **Single Player Default**: Modify game store to start with 1 player
2. **Player Array Expansion**: Extend to support 1-4 players
3. **Emoji Picker Component**: Reusable emoji selection interface
4. **Record Panel Enhancement**: Adaptive stats display for variable players

### **Epic 2 Quick Wins**
1. **Multiple Maze Layouts**: Leverage existing layout system for variety
2. **Aspect Ratio Lock**: Ensure perfect squares across devices
3. **Horizontal Scrolling**: Viewport with follow-camera for large mazes
4. **Renderer Performance**: Optimize for larger grid sizes

### **Epic 3 Quick Wins**
1. **Landing Page**: Next.js marketing page with coding pedagogy
2. **Player Management**: Add/remove/edit players, emoji selection
3. **Game Settings**: Grid size, hazards toggle, theme controls
4. **Local Persistence**: Save players, settings, and stats in localStorage
5. **Settings Dashboard**: Parent control panel with progress tracking

### **Epic 4 Quick Wins**
1. **Chapter Screen**: Structured curriculum entry point
2. **Coding Concepts per Chapter**: Sequencing → Multipliers → Checks/Conditionals → Hazards
3. **Map-Chapter Integration**: Tie maps to learning objectives
4. **Chapter Badges**: Visual rewards per concept mastered
5. **Unlock System**: Badge and progression tracking
6. **Parent Dashboard**: Learning progress analytics

