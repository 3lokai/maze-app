# 6. Architecture Sketch (summary)

**Components**
* `Maze.tsx`: renders grid + both players + trails.
* `Controls.tsx`: directional + numeric buttons, run/step/undo/reset.
* `HUD.tsx`: turn indicator, per-player steps/crashes, scoreboard.
* `lib/maze.ts`: fixed maze data.
* `lib/executor.ts`: tick engine, wall/bounds checks, turn switch logic.

**State**
* `currentPlayer` (1 or 2).
* `positions` (array of player positions).
* `queues` (per player).
* `trails` (per player).
* `scores` (success counts).

**State Machine**
Idle → Editing (Player N) → Executing → (HitWall | ReachedGoal) → SwitchTurn → Editing (Other Player).

---
