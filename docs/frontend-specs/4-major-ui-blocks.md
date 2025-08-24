# 4) Major UI Blocks

### A. Maze (left)

* **Square canvas** grid 10×10 (auto-fit to container).
* Each cell is a div; walls as overlay layers (avoid SVG complexity v0).
* **Player Tokens**: Display active player emojis (🐢🐰🦊🦁) with player-specific colors
* **Animations**
  * Valid move: cell scale `1.00 → 1.03 → 1.00` (100ms)
  * Illegal: **shake** (translateX ±4px, 250ms, once)
  * Trail: fade-in `opacity 0→1` over 120ms
* **Confetti**
  * Micro: emit ~10 particles per valid step (throttle to once per step, uses player color)
  * Mega: emit large burst once per win (player-colored)

### B. Turn Indicator (inline in maze header) - **ENHANCE FOR EPIC 1**

* **Current**: Badge with player number + emoji (🐢 Player 1)
* **Epic 1**: Dynamic player name + emoji (🐰 Kimaya's Turn)
* **Player-specific theming**: Color matches active player
* **Pulse animation**: Active player indicator
* **Accessibility**: Screen reader announces current player

### C. Commands & Execute (right/mid) - **MERGED CARD**

* **Direction row**: 4 Buttons (U/D/L/R) with arrow icons
* **Numbers row**: Buttons 1–10 explicit (wrap to 2 rows on mobile)
* **Tokens rail**: Displays queued tokens as `Badge`s with player theming
  * Show expanded step count and enforce cap (e.g., 50)
  * Player-specific colors and emoji indicators
* **Action buttons**: Undo/Reset → Progress → Run/Step/Stop
  * **Undo/Reset**: Remove last command / Clear all commands
  * **Progress**: Shows execution progress when active
  * **Run/Step/Stop**: Execute full queue / Execute next command / Stop execution
* **Empty state**: muted "Build your moves"
* **Debounce**: 150–200ms on token taps to avoid accidental double inserts
* **Speed Select**: `Select` with `Slow (400ms)` / `Medium (300ms)` (default: Medium)
* Disable all during execution; show subtle progress text "Executing… (k/N)"
* **Abort plumbing**: Wire in cancel support (button not surfaced in v0)

### D. Stats Drawer (right side) - **ENHANCE FOR EPIC 1**

* **Current**: Accessible via header button, shows player stats
* **Epic 1 Enhancement**: 
  * **Per-player stats rows** (1-4 players, dynamic height)
  * Each row: emoji + name, Wins 🏆, Crashes 💥, Steps 👣
  * Color-coded stats (green for wins, red for crashes, blue for steps)
  * Player-specific row theming
  * **Totals row** at bottom ("Overall") with aggregated stats
  * **Empty state**: "No players added" when no active players
  * **Add Player button**: Quick access to player management

### E. Settings Modal (new) - **PARENT INTERFACE**

* **Modal overlay** with backdrop blur
* **Tabbed interface**: Players | Themes | Accessibility
* **Players Tab**:
  * List of current players (1-4) with edit/remove actions
  * Add Player button (up to 4 players)
  * Name input field with validation
  * Emoji picker grid (🐢🐰🦊🦁)
  * Player color selection
* **Themes Tab**: Existing theme controls (Default/HC/Soft)
* **Accessibility Tab**: Existing a11y controls (HC/Soft/Reduced Motion)
* **Save/Cancel buttons** with validation

### F. Header (top) - **ENHANCE FOR EPIC 1**

* **Current**: Settings dropdown + Stats drawer trigger
* **Epic 1 Enhancement**: 
  * Add Settings modal trigger (⚙️ icon)
  * Keep existing accessibility settings dropdown
  * Keep existing stats drawer trigger

---

