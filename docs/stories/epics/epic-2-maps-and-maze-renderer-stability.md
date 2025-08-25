🎭 Party-mode here — Epic 2 is a big one, let’s slice it into **INVEST-compliant stories** with AC + Demo hooks.

---

# 📋 Epic 2 — Maps & Maze Renderer Stability (UX Overhaul)

---

### **Story 1 — Multiple Maps Library (S)**

**As a** player
**I want** multiple maps to choose from
**So that** I can play different layouts with rising complexity.

* **AC:**

  * Load at least 3 layouts (small, medium, large).
  * Maps are BFS-validated solvable.
  * Simple map switcher (Next Map / Dropdown).
* **Demo:** Open app → select “Map 2” → maze redraws with new layout.

---

### **Story 2 — Larger Grid Support (M)**

**As a** player
**I want** bigger mazes (15×15, 20×20)
**So that** the game scales with difficulty.

* **AC:**

  * Renderer supports up to 20×20 grids without layout break.
  * Executor runs with no perf degradation.
  * Confetti/trails scale proportionally.
* **Demo:** Load 20×20 map → board renders, run path executes at 60fps.

---

### **Story 3 — Aspect-Ratio Lock & Square Cells (S)**

**As a** player
**I want** cells to stay perfect squares
**So that** the maze doesn’t distort on different devices.

* **AC:**

  * Board container uses aspect-ratio `width/height`.
  * Each cell maintains aspect-ratio 1.
  * No stretch when labels/emojis present.
* **Demo:** Rotate phone → cells remain squares, board adjusts.

---

### **Story 4 — Label & Emoji Overlays (S)**

**As a** child
**I want** start/goal labels and emoji sprites inside cells
**So that** they don’t break the grid shape.

* **AC:**

  * Labels/icons rendered as absolute overlays.
  * Font-size capped; ≤390px shows icons only + legend below board.
  * Emojis fixed size, don’t resize cell.
* **Demo:** Start cell shows 🏡 overlay, goal shows 🌳; grid stays aligned.

---

### **Story 5 — Horizontal Viewport & Follow-Cam (M)**

**As a** player
**I want** the maze to scroll horizontally with my token
**So that** I can explore larger maps without squinting.

* **AC:**

  * Player token stays centered (or lead third).
  * Smooth pan as player moves.
  * Touch-drag disabled (programmatic pan only).
* **Demo:** Queue moves across wide maze → board pans smoothly as token advances.

---

### **Story 6 — Responsive Viewport UX (S)**

**As a** mobile player
**I want** the maze + controls to adapt on small screens
**So that** I can play comfortably on a phone.

* **AC:**

  * Below 768px: right rail stacks below maze.
  * Queue + buttons scale ≥44px.
  * No horizontal scroll unless in map viewport.
* **Demo:** Load on phone → maze stacked on top, controls below, no overflow.

---

### **Story 7 — Renderer Performance Optimization (M)**

**As a** developer
**I want** the renderer optimized for large mazes
**So that** gameplay remains smooth.

* **AC:**

  * 20×20 map runs step animation at 60fps.
  * Memory stable (no leaks across resets).
  * Confetti and trail rendering cost < 10ms per frame.
* **Demo:** Profile in dev tools → frame time <16ms during 20×20 run.

---

### **Story 8 — Map Loader & Preview (S)**

**As a** parent
**I want** to preview maps before starting
**So that** I can choose the right difficulty for my kids.

* **AC:**

  * Map picker shows small preview thumbnail of layout.
  * Selected map highlighted.
  * Start game loads selected layout.
* **Demo:** Open Map Picker → see thumbnails → select → board redraws.

---

### **Story 9 — UX Overhaul Polish (M)**

**As a** child
**I want** the interface to feel clean and playful
**So that** it’s fun and easy to use.

* **AC:**

  * Header hosts Play Again + Settings + Stats.
  * Right rail = Turn, Commands, Queue, Run/Step/Speed only.
  * Direction/number buttons ≥44px, icon + text.
  * Progress bar visible, matches player color.
  * Tap feedback = bounce animation.
* **Demo:** Load game → buttons large, queue playful pills, header tidy.

---

## ✅ Epic 2 Story Set

1. Multiple Maps Library (S)
2. Larger Grid Support (M)
3. Aspect-Ratio Lock & Square Cells (S)
4. Label & Emoji Overlays (S)
5. Horizontal Viewport & Follow-Cam (M)
6. Responsive Viewport UX (S)
7. Renderer Performance Optimization (M)
8. Map Loader & Preview (S)
9. UX Overhaul Polish (M)

---
