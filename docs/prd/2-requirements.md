# 2. Requirements

### Functional Requirements

* **Maze**
  * Shared 10×10 grid, start and goal visible.
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
* **Visual Feedback**
  * Shake + toast on invalid move ("Bumped wall at step N").
  * Micro-confetti per valid step (player-colored).
  * Mega-confetti at goal (player-colored).
  * Different colored feedback for each player (emerald/indigo themes).
* **HUD**
  * Displays steps used + crashes per player.
  * Simple scoreboard: number of successful runs each.
  * "Play Again" button to restart entire game (both players reset).
  * Session management: refresh wipes all game state.

### Non-Functional Requirements

* **Performance**: Stateless, no external APIs, Lighthouse kid-safe.
* **Accessibility**: Buttons ≥44px; ARIA labels for all controls; high-contrast toggle.
* **Devices**: Tablet + laptop, responsive at ≥768px width.
* **Session Length**: Designed for 10–20 min play sessions.

---
