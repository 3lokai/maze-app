# 4) Major UI Blocks

### A. Maze (left)

* **Square canvas** grid 10×10 (auto-fit to container).
* Each cell is a div; walls as overlay layers (avoid SVG complexity v0).
* **Animations**

  * Valid move: cell scale `1.00 → 1.03 → 1.00` (100ms)
  * Illegal: **shake** (translateX ±4px, 250ms, once)
  * Trail: fade-in `opacity 0→1` over 120ms
* **Confetti**

  * Micro: emit \~10 particles per valid step (throttle to once per step, uses player color)
  * Mega: emit large burst once per win (player-colored)

### B. Turn Card (right/top)

* `CardTitle`: "Player 1's Turn" / "Player 2's Turn" (shows active player name)
* Show **avatar chip** (Badge) with player color + tiny dot pulse on active
* **Scoreboard**: "⭐ Wins: P1 n · P2 m"
* **Layout**: Prep to scale to 4 players (wrap, not scroll)
* **Future space**: Leave room under for optional name edit chip

### C. Commands & Execute (right/mid) - **MERGED CARD**

* **Direction row**: 4 Buttons (U/D/L/R) with arrow icons
* **Numbers row**: Buttons 1–10 explicit (wrap to 2 rows on mobile)
* **Tokens rail**: Displays queued tokens as `Badge`s (e.g., `U×5`, `R×3`)
  * Show expanded step count and enforce cap (e.g., 50)
* **Action buttons**: Undo/Reset → Progress → Run/Step/Stop
  * **Undo/Reset**: Remove last command / Clear all commands
  * **Progress**: Shows execution progress when active
  * **Run/Step/Stop**: Execute full queue / Execute next command / Stop execution
* **Empty state**: muted "Build your moves"
* **Debounce**: 150–200ms on token taps to avoid accidental double inserts
* **Speed Select**: `Select` with `Slow (400ms)` / `Medium (300ms)` (default: Medium)
* Disable all during execution; show subtle progress text "Executing… (k/N)"
* **Abort plumbing**: Wire in cancel support (button not surfaced in v0)

### E. HUD (right/bottom)

* **Per-player stats**
  * Steps used (this run)
  * Crashes (lifetime this session)
  * Wins persist until refresh
* **Toasts**
  * Error: "Bumped a wall at step **N**" (bold N for quick parent scan, auto dismiss 2.5s)
* **Theme toggle**: Default / HC / Soft with legend "Soft = warmer palette for long sessions"
* **A11y**
  * Note: "All actions are touch-friendly"

---

