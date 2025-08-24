📋 Nice twist — multiplayer for the twins. Let's refine the PRD so **two players alternate turns**, while keeping v0 simple.

---

# Updated **PRD — Coding Maze (v0, 2-Player)**

## 1. Goals & Background

The **Coding Maze** app introduces children (ages 4–6) to computational thinking through **touch-based command building**. Kids tap arrows (U, D, L, R) and numbers (1–10) to assemble sequences like `U×5, R×3`. Pressing **Run** animates their piece step-by-step through a fixed 10×10 maze.

This mechanic blends **visual play with symbolic syntax**, reinforcing sequencing, batching, and **deferred execution** ("write first, then run"). Immediate feedback ensures engagement: illegal moves shake + toast; reaching the goal triggers confetti.

v0 is designed for **two players taking alternate turns** — each child builds and runs their own sequence, then play passes automatically to the other. This setup encourages turn-taking, cooperative play, and sibling/parent co-play without requiring accounts or complex setup. The app remains **safe, ad-free, and purpose-built for short learning sessions**.

**Current Status: Core path features implemented and ready for future enhancements.**

---

## 2. Requirements

### Functional Requirements

* **Maze**
  * Shared 10×10 grid, start and goal visible.
  * **NEW:** Path route visualization with DFS algorithm and route highlighting.
* **NEW:** Theme labels for start/goal locations with configurable emoji icons.
* **NEW:** Maze layout loading from JSON with theme support.
* **NEW:** Path constraint validation with detailed error reporting.
* **NEW:** Header controls refactor with settings dropdown.
* **NEW:** UI polish with enhanced button interactions (56px height).
* **NEW:** Comprehensive statistics drawer with parent-friendly interface.
* **Players**
  * 2 tokens (Player A: emerald circle, Player B: indigo circle) with distinct colors.
  * Optional sprites for future enhancement (characters, animals, etc.).
  * Turn indicator visible (HUD shows "Player 1's Turn" / "Player 2's Turn").
* **Input**
  * On-screen buttons: U, D, L, R + numbers (1–10).
  * Command queue builds per player.
  * Run/Step/Undo/Reset affect only current player's queue.
  * Speed toggle (Slow/Med) affects both players' execution speed.
* **Turn system**
  * After a run completes (goal, wall, or reset), control switches to the other player.
  * Both players start from the same start cell.
* **Executor**
  * Runs commands at 300–400ms tick rate (Medium: 300ms, Slow: 400ms).
  * Each player's trail is colored differently (emerald trail for Player A, indigo trail for Player B).
  * Supports Step (single command) and Run (full queue).
  * **NEW:** Path validation with detailed error reporting.
* **Visual Feedback**
  * Shake + toast on invalid move ("Bumped wall at step N").
  * **NEW:** Path constraint errors with detailed step information and precise error location.
  * Micro-confetti per valid step (player-colored).
  * Mega-confetti at goal (player-colored).
  * Different colored feedback for each player (emerald/indigo themes).
  * **NEW:** Path route highlighting and theme labels.
* **Header & Controls**
  * Header contains Play Again, Settings dropdown, and Stats button.
  * Settings include High Contrast, Reduced Motion, Large Text, and Preview Path toggles.
  * Stats drawer provides comprehensive game statistics with real-time updates.
* **Game HUD**
  * Displays steps used + crashes per player.
  * Turn indicator shows current player with visual badges.
  * Session management: refresh wipes all game state.

### Non-Functional Requirements

* **Performance**: Stateless, no external APIs, Lighthouse kid-safe.
* **Accessibility**: Buttons ≥44px; ARIA labels for all controls; high-contrast toggle.
* **Devices**: Tablet + laptop, responsive at ≥768px width.
* **Session Length**: Designed for 10–20 min play sessions.

---

## 3. Success Metrics (v0)

1. Each player reaches the goal once in ≤90s without adult help.
2. Kids replay ≥3 consecutive rounds together.
3. No app crashes; no dead-end UX.
4. Parent can reset entire game in one tap.
5. **NEW:** Path visualization helps players understand optimal routes.

---

## 4. Out of Scope (v0)

* More than 2 players (planned for v2).
* Online multiplayer.
* Persistence of scores between sessions (planned for v1).
* Advanced mechanics (loops, portals, DFS mazes) (planned for v3+).
* Sound effects (planned for v5).
* Custom sprites/characters (planned for v5).
* Parent settings and controls (planned for v2).
* Hazards and complications (planned for v3).
* Campaign mode and learning progression (planned for v4).
* Maze randomization (planned for v4).

---

## 5. Future Phases & Roadmap

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
* **NEW:** Multiple maze layout selection.

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
* **NEW:** Path creation and visualization system ready for advanced features.

---

## 6. Architecture Sketch (summary)

**Components**
* `MazeRenderer.tsx`: renders grid + both players + trails + path visualization.
* `CommandBuilder.tsx`: directional + numeric buttons, run/step/undo/reset.
* `TurnCard.tsx`: turn indicator with player avatar and scoreboard.
* `GameHUD.tsx`: per-player steps/crashes, game status display.
* `Header.tsx`: Play Again, Settings, Stats controls.
* `StatsDrawer.tsx`: comprehensive statistics display with real-time tracking.
* `lib/maze.ts`: fixed maze data + layout compilation + JSON loading.
* `lib/executor.ts`: tick engine, wall/bounds checks, path validation, turn switch logic.

**State**
* `currentPlayer` (1 or 2).
* `positions` (array of player positions).
* `queues` (per player).
* `trails` (per player).
* `scores` (success counts).
* **NEW:** Path constraints for movement validation.

**State Machine**
Idle → Editing (Player N) → Executing → (HitWall | ReachedGoal) → SwitchTurn → Editing (Other Player).

---

## 7. Backlog (≤8 Stories, 2-Player Adjustments)

1. **UI shell + Tailwind**.
2. **Maze renderer** (10×10) - **ENHANCED with path visualization**.
3. **2 tokens + per-player colors**.
4. **Command queues per player** (append/undo/reset).
5. **Executor tick & trail** (per player) - **ENHANCED with path validation**.
6. **Turn switch logic** (auto after run completes).
7. **HUD** (turn indicator, per-player stats, scoreboard).
8. **QA pass + Vercel deploy (alpha-01)**.

---

## 8. QA Checklist (Parent Test)

1. Load app → grid + 2 colored circles visible (emerald Player A, indigo Player B).
2. Player 1 queues ≥6 moves, Run → sequence executes; control switches to Player 2.
3. Force wall collision → shake + toast; crashes counter increments; turn switches.
4. Success triggers player-colored confetti + scoreboard increment for that player.
5. Undo/Reset only affect active player; "Play Again" resets both players.
6. Speed toggle affects both players' execution speed.
7. Buttons usable on iPad; legible at ≥768px; high-contrast works.
8. ARIA labels announce turn changes and player actions.
9. **NEW:** Path route visualization is clear and helpful.
10. **NEW:** Theme labels provide clear visual identification.
11. **NEW:** Settings dropdown provides comprehensive accessibility options.
12. **NEW:** Stats drawer displays comprehensive game statistics with real-time updates.
13. **NEW:** Header controls are well-organized and accessible.

---

## 9. Risks & Mitigations

* **Sibling frustration** → clear turn indicator + distinct colors.
* **Over-scope** → freeze v0 at 2 players; no extras until kids clear multiple rounds.
* **Speed mismatch** → toggle Slow/Med, default Medium.

---

## 10. Repo & Delivery

* Repo: `maze-app`
* Hosting: Vercel (static).
* Env: none.

---

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
