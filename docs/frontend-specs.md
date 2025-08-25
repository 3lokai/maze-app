🎨 **Sally (UX)** here. No bespoke snowflakes — we'll compose from **shadcn/ui** + **Magic UI Confetti**. Here's a tight front-end spec you can hand straight to dev.

---

# UI / Front-End Spec (Next.js 15 + React 19 + Tailwind + shadcn/ui)

## 1) Layout (single page)

* **Header**: Settings + Stats (existing controls)
* **Main**: 12-col grid @ ≥768px

  * **Left (col-span-7)**: `Maze` board (square, responsive, aspect-ratio locked) with inline MapPicker.
  * **Right (col-span-5)**: stacked `TurnCard` → `Commands & Execute` → `HUD`.
* **Mobile (≤767px)**: vertical stack → `TurnCard` → `Maze` (with MapPicker) → `Commands & Execute` → `HUD`. Keep Maze ≥ 320px square.
* **Large Maps (≥15×15)**: Horizontal viewport with follow-cam; maze scrolls to keep player token centered.

Spacing: `gap-4` page, `gap-3` cards. Touch targets ≥ **44px**; min button size `h-12 px-4`.

---

## 2) Component Map (use shadcn where possible)

* **Cards/Containers**

  * `Card`, `CardHeader`, `CardTitle`, `CardContent`
* **Buttons & Inputs**

  * `Button` (variants: `default`, `secondary`, `destructive`, `ghost`)
  * `Toggle` (for High Contrast)
  * `Select` (Speed, Map Selection)
  * `Tooltip` (labels for pre-readers' helpers)
  * `Badge` (Player indicators, step count chips)
  * `Separator`
  * `Toast` (use shadcn toast for "Bumped a wall at step N")
* **Feedback**

  * **Magic UI**: `Confetti` component (micro on valid step, mega on win)
* **Icons**

  * `lucide-react`: `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Undo2`, `Play`, `StepForward`, `RotateCcw`, `Trophy`, `Shuffle`, `Map`, `Eye`

---

## 3) Visual System

* **Players**

  * P1 color: `emerald-600` (trail `emerald-300`)
  * P2 color: `indigo-600` (trail `indigo-300`)
  * Tokens: filled circle with player color ring
  * Names: "Player 1" / "Player 2" (default), scalable to 4 players
* **Maze**

  * Cells: `bg-muted` with `border-border/60`
  * Walls: 2px lines `bg-foreground/70`
  * **NEW:** Start: Emoji overlay `🏡` (absolute positioned, fixed size)
  * **NEW:** Goal: Emoji overlay `🌳` (absolute positioned, fixed size)
  * **NEW:** Small screens (≤390px): Icons only, legend below maze
  * **NEW:** Path route cells: highlighted with gradient background
  * **NEW:** Theme labels: "🏠 Home" and "🌲 Forest" badges
* **Theme System**

  * **Default**: Standard shadcn palette
  * **High-Contrast**: Swap CSS vars: `--background`, `--foreground`, `--muted`, bump borders to 2px, ensure ≥ 4.5:1
  * **Soft**: Warmer palette for long sessions (amber/rose tones, reduced contrast)
  * Theme toggle in HUD with legend: "Soft = warmer palette for long sessions"

Typography: shadcn default; titles `text-lg`, labels `text-sm`, HUD numbers `text-2xl font-semibold`.

---

## 4) Major UI Blocks

### A. MapPicker (inline with Maze Grid title) - **REPURPOSED EXISTING ELEMENT**

* **Location**: Replace existing "10×10" pill badge next to "Maze Grid" title
* **Component**: `Select` dropdown with map names and grid sizes
* **Map Names**: "Forest Path (10×10)", "City Blocks (15×15)", "Mountain Trail (20×20)" (descriptive + size)
* **Difficulty Indicators**: Small badges (Easy/Medium/Hard) based on grid size
* **Active State**: Shows current map name + size in pill format
* **Mobile**: Same dropdown behavior, no layout changes needed
* **Accessibility**: `aria-label="Select maze map"` with clear map descriptions

### B. Maze (left) - **ENHANCED FOR EPIC 2**

* **Aspect-Ratio Lock**: Container uses `aspect-ratio: 1` CSS property
* **Responsive Scaling**: Grid auto-fits container while maintaining square cells
* **Cell Sizing**: Each cell maintains `aspect-ratio: 1` (perfect squares)
* **Large Map Support**: Up to 20×20 grids without layout break
* **Horizontal Viewport**: For maps ≥15×15, enable horizontal scrolling
* **Follow-Cam**: Player token stays centered (or lead third) during movement
* **Overlay Labels**: Start/goal emojis as absolute positioned overlays
* **Performance Target**: 20×20 maps render at 60fps (≤16ms per frame)
* **Animations**

  * Valid move: cell scale `1.00 → 1.03 → 1.00` (100ms)
  * Illegal: **shake** (translateX ±4px, 250ms, once)
  * Trail: fade-in `opacity 0→1` over 120ms
  * **NEW:** Bounce feedback on button taps
* **Confetti**

  * Micro: emit ~10 particles per valid step (throttle to once per step, uses player color)
  * Mega: emit large burst once per win (player-colored)

### C. Turn Card (right/top)

* `CardTitle`: "Player 1's Turn" / "Player 2's Turn" (shows active player name)
* Show **avatar chip** (Badge) with player color + tiny dot pulse on active
* **Scoreboard**: "⭐ Wins: P1 n · P2 m"
* **Layout**: Prep to scale to 4 players (wrap, not scroll)
* **Future space**: Leave room under for optional name edit chip

### D. Commands & Execute (right/mid) - **MERGED CARD**

* **Direction row**: 4 Buttons (U/D/L/R) with arrow icons
* **Numbers row**: Buttons 1–10 explicit (wrap to 2 rows on mobile)
* **Tokens rail**: Displays queued tokens as `Badge`s (e.g., `U×5`, `R×3`)
  * Show expanded step count and enforce cap (e.g., 50)
* **Action buttons**: Undo/Reset → Progress → Run/Step/Stop
  * **Undo/Reset**: Remove last command / Clear all commands
  * **Progress**: Shows execution progress when active (enhanced for large maps)
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
  * **NEW:** Path constraint errors with detailed step information
* **Theme toggle**: Default / HC / Soft with legend "Soft = warmer palette for long sessions"
* **Speed select**: Stays in Run Controls
* **A11y**
  * Note: "All actions are touch-friendly"

---

## 5) Interaction Rules

* **Map Selection**:
  * Click map dropdown → shows list of available maps with sizes
  * Select map → maze redraws with new layout, pill updates to show new map name + size
  * Map change resets both players to start positions
  * Show loading state during map transition
* Building:

  * Tap Direction → highlights; next Number attaches → token appears as `U×5`.
  * If Direction tapped twice then Number: last direction wins (keep it forgiving).
* Execution:

  * **Run** executes full expanded queue; **Step** executes next token only.
  * **NEW:** Path validation before execution with detailed error reporting.
  * On **illegal**: stop immediately, toast once, shake target cell, increment **crashes for current player**, **switch turn**.
  * On **goal**: mega confetti, increment **wins for current player**, **switch turn** after run completes.
  * Post-run: clear **current player's** queue; keep positions & trails.
  * **NEW:** Large maps: follow-cam keeps player token visible during execution
* Reset:

  * **Reset Player** clears that player's queue and trail, returns position to start; does **not** affect other player.
  * **Play Again** resets both players to start, clears both queues/trails/HUD counts (wins persist or clear — your call; v0: persist wins until refresh).

---

## 6) Accessibility

* All interactive elements ≥ 44×44 px.
* ARIA:
  * Buttons: `aria-label="Up"`, `"Down"`, `"Left"`, `"Right"`, `"Number 5"`, `"Run sequence"`, etc.
  * Turn indicator: `role="status"` live region polite; screen readers announce "Player X's turn"
  * Toasts: `role="alert"` for error.
  * **NEW:** Map selection: `aria-label="Select maze map"` with clear map descriptions
  * **NEW:** Start/goal overlays: `aria-label="Start position"`, `"Goal position"`
  * **NEW:** Theme labels: `aria-label` for start/goal badges
  * Future: Provide ARIA labels for emoji/sprite when added (e.g., `aria-label="Tiger token"`)
* Keyboard: Arrow keys map to U/D/L/R; digits map to multipliers; `Enter` = Run (parent use).
* Focus management: return focus to **Run** after execution completes; visible focus rings.
* Theme contrast: Ensure Soft mode also meets contrast on text/buttons.

---

## 7) Responsive Rules - **ENHANCED FOR EPIC 2**

* **Aspect-Ratio Lock**: Maze container uses `aspect-ratio: 1` CSS property
* **Cell Squares**: Each cell maintains `aspect-ratio: 1` (perfect squares)
* **Maze Scaling**: Auto-fit to container while preserving square cells
* **Mobile Layout**: MapPicker → TurnCard → Maze → Commands → HUD (vertical stack)
* **Large Maps (≥15×15)**: Enable horizontal viewport scrolling
* **Follow-Cam**: Player token stays centered during movement on large maps
* **Small Screens (≤390px)**: 
  * MapPicker dropdown remains functional (no layout changes needed)
  * Start/goal labels become legend below maze
  * Number buttons wrap to 2 rows
* **Performance**: 20×20 maps must render at 60fps (≤16ms per frame)
* **Touch Targets**: All interactive elements ≥44px
* **Prevent CLS**: Fixed heights for control rows; `min-h-[56px]` on rows

---

## 8) State & Disable Logic (UX)

* Disable all input while `executing`.
* Show subtle inline helper when queue is empty: "Tap an arrow, then a number".
* Hard cap expanded steps (e.g., 50) → show toast "That's a long journey! Try fewer steps."
* During executing: disable all inputs and show "Executing… (k/N)".
* **NEW:** Path validation feedback with detailed error messages.
* **NEW:** Map loading state: show spinner during map transition.
* **NEW:** Large map progress: enhanced progress bar + text for maps ≥15×15.

---

## 9) QA (visual + UX) - **ENHANCED FOR EPIC 2**

* Tap accuracy on iPad: no missed taps across edges.
* Turn switching is obvious (color + text + pulse).
* Confetti: micro per step (throttled), single mega on win.
* Toast appears once per illegal move; position unchanged.
* High-contrast passes WCAG AA on maze + controls.
* **NEW:** Path route visualization is clear and intuitive.
* **NEW:** Theme labels provide clear visual identification.
* **NEW:** MapPicker: dropdown clearly shows map options, selection obvious.
* **NEW:** Aspect-ratio lock: cells remain squares on all devices.
* **NEW:** Large maps: horizontal scrolling smooth, follow-cam responsive.
* **NEW:** Performance: 20×20 maps render at 60fps without lag.

---

## 10) Future-proof Hooks (non-blocking v0)

* **Hidden Settings entry point**: Parent mode for future: grid size, hazards, players (1–4), sprites.
* **Space under TurnCard**: Leave room for optional name edit chip (future).
* **Theme system**: CSS custom properties ready for multiple themes.
* **Player scaling**: Layout prepared for 1–4 players (wrap, not scroll).
* **Hazard registry**: UI hooks for future hazard indicators and inventory.
* **Campaign mode**: Space reserved for level selection and progress indicators.
* **NEW:** Path creation system ready for multiple maze layouts.
* **NEW:** Theme system ready for advanced customization.
* **NEW:** Map library: ready for 10+ maps with categories (Easy/Medium/Hard).
* **NEW:** Canvas fallback: DOM-based rendering with canvas optimization for very large maps.

---

## 11) Build Notes (no code, just choices)

* **shadcn/ui**: Button, Card, Badge, Select, Toggle, Tooltip, Separator, Toast.
* **Magic UI**: Confetti component — mount in page root; provide imperative handles for micro/mega.
* **Aspect-Ratio**: Use CSS `aspect-ratio: 1` for maze container and cells.
* **Performance**: DOM-based rendering with canvas fallback for maps >20×20.
* **Viewport**: CSS `overflow-x: auto` for horizontal scrolling on large maps.
* **Follow-Cam**: JavaScript scroll positioning to keep player token centered.
* Tailwind utilities for layout; no custom CSS except small keyframes for shake (or use Tailwind animations).

---

## 12) JSON Layout Structure Updates for Epic 2

### **Required Fields for MapPicker Support**

Each maze layout JSON file needs these additional fields:

```json
{
  "width": 10,
  "height": 10,
  "start": { "r": 8, "c": 1 },
  "goal": { "r": 1, "c": 8 },
  "path": ["8,1", "8,2", "8,3", ...],
  "name": "Forest Path",
  "difficulty": "Easy",
  "description": "A gentle forest trail for beginners",
  "theme": {
    "start": "🏠 Home",
    "goal": "🌲 Forest"
  }
}
```

### **New Required Fields:**

* **`name`** (string): Display name for MapPicker dropdown
* **`difficulty`** (string): "Easy" | "Medium" | "Hard" (for difficulty badges)
* **`description`** (string): Optional description for accessibility

### **Map Library Structure:**

Create multiple layout files in `/public/data/layouts/`:

* `forest-01.json` - "Forest Path (10×10)" - Easy
* `city-01.json` - "City Blocks (15×15)" - Medium  
* `mountain-01.json` - "Mountain Trail (20×20)" - Hard
* `castle-01.json` - "Castle Maze (12×12)" - Medium
* `garden-01.json` - "Secret Garden (8×8)" - Easy

### **Display Format in MapPicker:**

* **Dropdown Option**: "Forest Path (10×10)"
* **Active Pill**: "Forest Path (10×10)" 
* **Difficulty Badge**: Small "Easy" badge next to name

---

## 🎯 Epic 2 Implementation Status

### ✅ **Completed Core Features**
- **Path Creation**: DFS route generation with visual highlighting
- **Maze Layout Loading**: JSON validation and compilation system
- **Constrained Movement**: Path validation with detailed error reporting
- **Theme Labels**: Visual badge system with accessibility support
- **Trail Visualization**: Color-coded player trails
- **Error Handling**: Robust validation and user feedback

### 🚀 **Epic 2 Enhancements Ready**
- **MapPicker Component**: Inline dropdown replacing "10×10" pill badge
- **Aspect-Ratio Lock**: Perfect square cells across all devices
- **Overlay Labels**: Start/goal emojis as absolute positioned overlays
- **Horizontal Viewport**: Scrollable maze for large maps (≥15×15)
- **Follow-Cam**: Player token stays centered during movement
- **Performance Optimization**: 20×20 maps at 60fps target
- **Enhanced Responsive**: Mobile-first layout with large map support
- **Map Library**: Ready for multiple layouts with difficulty indicators

### 🔮 **Future Epic 2 Extensions**
- Multiple maze layout categories (Easy/Medium/Hard)
- Dynamic path generation algorithms
- Advanced collision detection
- Interactive path editing tools
- Advanced theme customization
- Campaign mode with level progression