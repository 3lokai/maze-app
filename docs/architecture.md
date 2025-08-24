🏗️ **Winston (Architect) engaged.** Creating a one-pager, no code. If you want code later, say the word.

---

# Maze App — Architecture (v0, 2-Player)

## 1) System Overview

* **Client-only** Next.js 15 (App Router) + React 19 + Tailwind.
* No SSR, no APIs, no persistence. All state local.
* One page, three components: `Maze`, `TurnCard`, `Commands & Execute`, `HUD`.
* Effects: `canvas-confetti`. Haptics/Audio deferred.
* **NEW:** Path creation system with DFS route generation and visual highlighting.
* **NEW:** Maze layout loading from JSON with theme support.
* **NEW:** Comprehensive statistics drawer with parent-friendly interface.
* **NEW:** Header controls refactor with settings dropdown.
* **NEW:** UI polish with enhanced button interactions and animations.

## 2) Components & Responsibilities

* **`MazeRenderer`**

  * Renders 10×10 cells, walls, start/goal, two player tokens, colored trails.
  * **NEW:** Path route visualization with DFS algorithm and route highlighting.
  * **NEW:** Theme label support with visual badges.
  * **NEW:** Maze layout loading from JSON with dynamic dimensions.
  * Pure presentational: receives `maze`, `positions`, `trails`, `status`, `currentPlayer`.
  * Exposes refs for shake animation target.

* **`TurnCard`**

  * Turn indicator with player avatar and scoreboard.
  * Shows "Player 1's Turn" / "Player 2's Turn" with player-colored badges.
  * Displays "⭐ Wins: P1 n · P2 m" scoreboard.

* **`CommandBuilder`**

  * Direction tokens (U/D/L/R) + numeric tokens (1–10).
  * Actions: **Append**, **Undo**, **Reset**, **Step**, **Run**, **Stop**, **Speed**.
  * Progress indicator during execution.
  * Disabled when `status=executing`.
  * Enhanced UI with 56px button height and visual feedback.

* **`HUD`**

  * Per-player steps/crashes; Play Again; optional High-Contrast toggle.

* **`Header`**

  * Play Again button, Settings dropdown, and Stats button.
  * Responsive layout with proper accessibility labels.

* **`StatsDrawer`**

  * Comprehensive statistics display with real-time updates.
  * Per-player wins/crashes/steps with visual icons.
  * Parent-friendly progress monitoring interface.

* **`SettingsDropdown`**

  * Accessibility settings: High Contrast, Reduced Motion, Large Text.
  * Game settings: Preview Path toggle.
  * Proper ARIA labels and keyboard navigation.

* **`/lib/maze.ts`**

  * Exports fixed `maze` data ({ width, height, walls[], start, goal }).
  * Helpers: `isWall(a,b)`, `inBounds(cell)`.
  * **NEW:** Layout compilation functions for JSON maze data.
  * **NEW:** Path constraint creation and validation.

* **`/lib/executor.ts`**

  * Pure step engine: `simulate(maze, pos, cmd)` → `{nextPos, ok, hitWallAt?}`
  * Runner: `runQueue(queue, tickMs, onStep, onError, onDone)` — no React inside.
  * **NEW:** Path validation with detailed error reporting.
  * **NEW:** Constrained movement with step-by-step validation.

## 3) Core Data (conceptual)

* **Maze**

  * Grid 10×10, walls as edges (e.g., `Set<'r,c→r,c'>`) or adjacency list per cell.
  * **NEW:** Path route data with DFS-generated optimal paths.
* **NEW:** Theme data for start/goal labels.
* **NEW:** Layout compilation system for JSON maze data.
* **NEW:** Path constraints for movement validation.

* **Game State**

  * `currentPlayer ∈ {1,2}`
  * `positions: {1: Cell, 2: Cell}`
  * `queues: {1: CmdToken[], 2: CmdToken[]}` where `CmdToken = {dir:'U|D|L|R', n:1..10}`
  * `trails: {1: Cell[], 2: Cell[]}`
  * `scores: {1:number, 2:number}`, `crashes: {1:number, 2:number}`
  * `status ∈ {idle, editing, executing, hitWall, reachedGoal}`
  * `speed ∈ {slow, med}` → tick 400/300ms
  * **NEW:** Path constraints for movement validation.
  * **NEW:** Settings state for accessibility and game preferences.
  * **NEW:** Statistics state for comprehensive tracking.

## 4) Turn & Execution Flow (sequence)

1. **Editing (Player N)**: taps direction, then number → append `CmdToken`.
2. **Run**:

   * Lock inputs; set `status=executing`.
   * **NEW:** Validate path constraints before execution.
   * For each token: iterate `n` steps with `tickMs`; for each step:

     * `simulate`; if wall/bounds → `shake(cell)`, toast "Bumped at step k"; `crashes[N]++`; stop run.
     * **NEW:** Check path constraints; if invalid → detailed error message.
     * Else move, push to `trails[N]`; micro-confetti tick.
     * If `goal` → one-shot mega-confetti; increment `scores[N]`; stop run.
3. **Switch Turn**:

   * `status=idle`; `currentPlayer = other`.
   * Clear only **that player's queue**; keep trails/positions.

**Note:** Both players start at same `start`. You can optionally reset both via "Play Again".

## 5) State Machine (v0)

```
           +---------+
           |  Idle   |
           +----+----+
                |
                v
           +----+----+
           | Editing |  (Player N builds queue)
           +----+----+
                |
             Run/Step
                v
           +----+----+
           |Executing|
           +----+----+
            |       |
   hitWall  |       | reachedGoal
            v       v
         +----+-----+----+
         | HitWall / Win |
         +----+-----+----+
                |
          Switch Turn
                v
              Idle
```

## 6) Feedback & A11y

* **Illegal move**: shake the target cell (CSS transform), one toast with step index; position unchanged.
* **NEW:** Path constraint violation: detailed error message with step information.
* **Success**: single mega-confetti; "Play Again" button resets positions, trails, queues, HUD.
* Buttons ≥56px; logical order + ARIA labels; focus rings; High-Contrast toggle (CSS var swap).
* **NEW:** Theme labels with accessibility support.
* **NEW:** Enhanced UI polish with animations and visual feedback.
* **NEW:** Comprehensive settings dropdown with accessibility options.

## 7) Rendering & Performance

* Minimal re-renders: keep `executor` pure and push deltas via `onStep`.
* Represent walls as adjacency to make `simulate` O(1).
* **NEW:** Path route generation optimized with DFS algorithm.
* Avoid layout shifts: fixed controls/HUD heights; no CLS on buttons.
* Confetti throttled to per-step micro bursts.

## 8) Error Handling & Safeguards

* Disable controls during `executing`.
* Guard empty queue on Run/Step.
* Hard cap queue length (e.g., 50 steps expanded) to avoid marathon runs.
* Debounce Run/Step taps (single flight).
* **NEW:** Path validation with detailed error reporting.
* **NEW:** Robust error handling for layout loading.

## 9) Testing (parent 2-minute + unit hooks)

* Unit: `simulate()` for all dirs at edges/walls; shortest path sanity.
* Unit: runner stops on first collision; does not advance position.
* **NEW:** Unit: path validation with constraint checking.
* **NEW:** Unit: layout compilation and loading.
* **NEW:** Unit: settings and statistics functionality.
* **NEW:** Unit: header controls and accessibility features.
* UI: iPad touch hit-areas, focus order, HC toggle.
* Smoke: 3 full runs; alternating turns switch correctly; scoreboard increments.

## 10) File Map

```
/app/page.tsx              // Compose Maze + TurnCard + Commands + HUD; owns game state
/components/MazeRenderer.tsx // Render grid, players, trails; exposes shake ref
/components/TurnCard.tsx   // Turn indicator with player avatar and scoreboard
/components/CommandBuilder.tsx // Direction & number tokens; Run/Step/Undo/Reset; Speed
/components/GameHUD.tsx    // Per-player steps/crashes, game status display
/components/Header.tsx     // Game controls and settings
/components/StatsDrawer.tsx // Statistics display
/components/SettingsDropdown.tsx // Accessibility settings
/lib/maze.ts               // Fixed maze graph + helpers + layout compilation
/lib/executor.ts           // simulate/runQueue (pure), no React + path validation
/styles/globals.css        // Tailwind base + HC theme variables
```

## 11) Extensibility Notes (to not paint us into a corner)

### v1: Multipliers & Scoreboard
* **v1 Multipliers UX**: already supported via `{dir, n}` tokens; later allow `repeat` macros.
* **v1 Scoreboard**: existing `scores` object; render streaks; optional best‐of-N.
* **v1 Persistence**: localStorage wrapper for session data.

### v2: Parent Controls & Settings
* **v2 Player expansion**: extend `currentPlayer` from `{1,2}` to `PlayerId = 1|2|3|4`.
* **v2 Player state**: `players: Record<PlayerId, {name: string, color: string, emoji?: string}>`.
* **v2 Settings**: `config: {gridSize: 5|10|15, hazards: boolean, theme: 'default'|'hc'|'soft'}`.
* **v2 Maze scaling**: `maze` data structure supports variable `width`/`height`.
* **NEW:** Multiple maze layout support with theme customization.

### v3: Hazards & Complications
* **v3 Hazard registry**: `hazards: Hazard[]` where `Hazard = {type: 'lion'|'door'|'hunter', position: Cell, config?: any}`.
* **v3 Executor expansion**: `simulate(maze, pos, cmd, hazards, inventory)` → `{nextPos, ok, hitWallAt?, hazardHit?, inventoryChange?}`.
* **v3 Inventory system**: `inventory: Record<PlayerId, {keys: number, shields: number, speedBoots: number}>`.
* **v3 State machine**: add `hitHazard` and `eliminated` states.

### v4: Campaign Mode & Learning Progression
* **v4 Level system**: `levels: Level[]` where `Level = {id: number, title: string, maze: Maze, features: string[], hazards: Hazard[]}`.
* **v4 Progress tracking**: `progress: Record<PlayerId, {currentLevel: number, badges: string[], concepts: Record<string, 'mastered'|'learning'|'locked'>}>`.
* **v4 Campaign loader**: `loadLevel(levelId: number)` → `{maze, features, hazards}`.
* **v4 World map**: component for level selection with locked/unlocked states.

### v5: Advanced Features
* **v5 Maze generator**: `generateMaze(seed: string, opts: {width, height, complexity, pathLength})` → `Maze`.
* **v5 Sprite system**: `sprites: Record<PlayerId, {emoji: string, altText: string}>`.
* **v5 Replay system**: `replay: {commands: CmdToken[], steps: Cell[], duration: number}`.
* **v5 Analytics**: `analytics: Record<PlayerId, {avgSteps: number, errors: number, successfulRuns: number, timeSpent: number}>`.

### Technical Infrastructure
* **Config-driven architecture**: JSON-based level definitions with feature flags.
* **Hazard registry system**: Pluggable complication framework with step-check functions.
* **Player array expansion**: Support for 1-4 players with flexible state management.
* **Campaign loader**: Dynamic level loading from JSON definitions.
* **Theme system**: CSS custom properties for multiple theme support.
* **Localization**: i18n system for multilingual U/D/L/R tokens.
* **NEW:** Path creation and visualization system ready for advanced features.

---

## 🎯 Current Implementation Status

### ✅ **Completed Core Features**
- **Path Creation**: DFS route generation with visual highlighting
- **Maze Layout Loading**: JSON validation and compilation system
- **Constrained Movement**: Path validation with detailed error reporting
- **Theme Labels**: Visual badge system with accessibility support
- **Trail Visualization**: Color-coded player trails
- **Error Handling**: Robust validation and user feedback
- **Header Controls**: Clean organization with settings and stats
- **Statistics System**: Comprehensive tracking with parent-friendly interface
- **UI Polish**: Enhanced button interactions and visual feedback
- **Accessibility**: Full compliance with comprehensive settings

### 🚀 **Ready for Future Enhancements**
- Multiple maze layout selection
- Dynamic path generation algorithms
- Advanced collision detection
- Performance optimization for large mazes
- Interactive path editing tools
- Advanced theme customization
- Campaign mode and learning progression
- Hazard and complication systems