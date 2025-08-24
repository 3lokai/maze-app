# 5. Future Phases & Roadmap

### v1: Multipliers & Scoreboard
* **Multipliers badge**: "Loop Learner" achievement for using U×N tokens.
* **Enhanced scoreboard**: Turn-based streak tracking, best times.
* **Basic persistence**: localStorage for session scores.

### v2: Parent Controls & Settings
* **Maze customization**: Grid size controls (5×5, 10×10, 15×15).
* **Player management**: Up to 4 players with names and colors.
* **Theme toggles**: Default / High Contrast / Soft themes.
* **Settings persistence**: localStorage for parent preferences.
* **Player setup screen**: Names, colors, optional emoji sprites.

### v3: Hazards & Complications
* **Lion 🦁**: "Miss a turn" trap mechanic.
* **Door 🚪**: Key collectible system with inventory state.
* **Hunter 🏹**: Instant elimination mechanic for that player.
* **Hazard registry**: Configurable step-check functions.
* **Impact**: Executor expands beyond walls/goals to hazard states & inventory.

### v4: Campaign Mode & Learning Progression
* **Level-based progression**: 
  * Level 1: Foundations (U/D/L/R only, 5×5 maze)
  * Level 2: Multipliers (U×N tokens introduction)
  * Level 3: Branches (mazes with forks requiring planning)
  * Level 4: Hazards Intro (lion mechanic)
  * Level 5: Inventory (door+key puzzles)
  * Level 6: Debugging (intentional traps for undo/rewrite learning)
  * Level 7+: Larger grids, hunters, multiple players
* **World Map UI**: Grid of "islands" or "badges" unlocked as you progress.
* **Parent dashboard**: Shows concepts mastered (e.g., "Sequencing ✅", "Loops ✅").
* **Progress persistence**: Client-side storage with parent-managed settings.
* **Badge system**: "Path Finder", "Loop Learner", "Fast Thinker" achievements.

### v5: Advanced Features
* **Maze Randomizer**: Seed-based DFS/Prim generator with configurable path length.
* **Power-ups**: "Speed boots" (skip 2 steps), "Shield" (survive hunter once).
* **Sprites/Emojis**: Replace circles with emoji animals (🐰 🐢 🐯 🐸) or uploaded sprites.
* **Replay sharing**: Export kid's run as GIF or replay sequence.
* **Data for parents**: Basic stats (avg steps, errors, successful runs).
* **Assist mode**: Ghost preview of path before run.
* **Sound effects**: Subtle chimes, confetti pops (toggleable).
* **Multilingual support**: Localized U/D/L/R tokens ("Haut/Bas/Gauche/Droite").

### Accessibility Enhancements
* **Color-blind friendly palette**: Alternative color schemes.
* **Text-to-speech**: Audio feedback for moves and actions.
* **Enhanced ARIA**: Comprehensive screen reader support.
* **Keyboard navigation**: Full keyboard accessibility.

### Technical Debt & Infrastructure
* **Config-driven architecture**: JSON-based level definitions.
* **Hazard registry system**: Pluggable complication framework.
* **Player array expansion**: Support for 1-4 players with flexible state management.
* **Campaign loader**: Dynamic level loading from JSON definitions.

---
