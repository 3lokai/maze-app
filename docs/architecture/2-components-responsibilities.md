# 2) Components & Responsibilities

* **`Maze`**

  * Renders 10×10 cells, walls, start/goal, two player tokens, colored trails.
  * Pure presentational: receives `maze`, `positions`, `trails`, `status`, `currentPlayer`.
  * Exposes refs for shake animation target.

* **`TurnCard`**

  * Turn indicator with player avatar and scoreboard.
  * Shows "Player 1's Turn" / "Player 2's Turn" with player-colored badges.
  * Displays "⭐ Wins: P1 n · P2 m" scoreboard.

* **`Controls`**

  * Direction tokens (U/D/L/R) + numeric tokens (1–10).
  * Actions: **Append**, **Undo**, **Reset Player**, **Step**, **Run**, **Speed**.
  * Disabled when `status=executing`.

* **`HUD`**

  * Per-player steps/crashes; Play Again; optional High-Contrast toggle.

* **`/lib/maze.ts`**

  * Exports fixed `maze` data ({ width, height, walls\[], start, goal }).
  * Helpers: `isWall(a,b)`, `inBounds(cell)`.

* **`/lib/executor.ts`**

  * Pure step engine: `simulate(maze, pos, cmd)` → `{nextPos, ok, hitWallAt?}`
  * Runner: `runQueue(queue, tickMs, onStep, onError, onDone)` — no React inside.
