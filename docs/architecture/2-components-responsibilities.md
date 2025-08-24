# 2) Components & Responsibilities

* **`Maze`**
  * Renders 10×10 cells, walls, start/goal, dynamic player tokens (1-4), colored trails.
  * Pure presentational: receives `maze`, `positions`, `trails`, `status`, `currentPlayer`, `playerConfigs`.
  * Exposes refs for shake animation target.

* **`TurnCard`**
  * Dynamic turn indicator with player avatar and scoreboard.
  * Shows "{Player Name}'s Turn" with player-colored badges and custom emojis.
  * Displays dynamic scoreboard for 1-4 players: "⭐ Wins: {emoji} {name} {wins} · ...".
  * Adapts layout based on player count.

* **`Controls`**
  * Direction tokens (U/D/L/R) + numeric tokens (1–10).
  * Actions: **Append**, **Undo**, **Reset Player**, **Step**, **Run**, **Speed**.
  * Disabled when `status=executing`.
  * Player-specific command queue styling.

* **`HUD`**
  * Dynamic per-player stats display (1-4 players): steps/crashes/wins.
  * Play Again; optional High-Contrast toggle.
  * Adaptive record panel with player-specific rows.

* **`PlayerManagement`** *(NEW)*
  * Player settings interface: add/remove/edit players.
  * Name customization and emoji selection (🐢🐰🦊🦁).
  * Color customization and player activation toggle.
  * Integration with settings panel.

* **`SettingsDropdown`** *(ENHANCED)*
  * Enhanced settings panel with player management section.
  * Player configuration controls.
  * Accessibility and visual settings.

* **`/lib/maze.ts`**
  * Exports fixed `maze` data ({ width, height, walls\[], start, goal }).
  * Helpers: `isWall(a,b)`, `inBounds(cell)`.

* **`/lib/executor.ts`**
  * Pure step engine: `simulate(maze, pos, cmd)` → `{nextPos, ok, hitWallAt?}`
  * Runner: `runQueue(queue, tickMs, onStep, onError, onDone)` — no React inside.

* **`/lib/player-management.ts`** *(NEW)*
  * Player configuration utilities.
  * Default player templates and validation.
  * Player state management helpers.

