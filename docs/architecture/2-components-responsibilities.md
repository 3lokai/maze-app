# 2) Components & Responsibilities

* **`MazeViewport`** *(RENAMED from Maze)*
  * Renders maze cells with aspect-ratio locked squares, walls, start/goal, dynamic player tokens (1-4), colored trails.
  * **Viewport Management**: Scrollable container with follow-cam for larger maps (up to 20×20).
  * **Overlay System**: Labels and emojis rendered as absolute overlays, not layout content.
  * Pure presentational: receives `maze`, `positions`, `trails`, `status`, `currentPlayer`, `playerConfigs`.
  * Exposes refs for shake animation target and viewport control.
  * Emits `onViewportJump(to: Cell)` for follow-cam coordination.

* **`MapPicker`** *(NEW)*
  * Lightweight map selection interface with thumbnails and preview.
  * Displays catalog of available maps with difficulty indicators.
  * Calls `loadLayout(id)` to switch maps.
  * Responsive design: thumbnails adapt to screen size.

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
  * Responsive: buttons scale to ≥44px on mobile.

* **`HUD`**
  * Dynamic per-player stats display (1-4 players): steps/crashes/wins.
  * Play Again; optional High-Contrast toggle.
  * Adaptive record panel with player-specific rows.
  * Receives `mapId`, `size` for display only.

* **`PlayerManagement`**
  * Player settings interface: add/remove/edit players.
  * Name customization and emoji selection (🐢🐰🦊🦁).
  * Color customization and player activation toggle.
  * Integration with settings panel.

* **`SettingsDropdown`**
  * Enhanced settings panel with player management section.
  * Player configuration controls.
  * Accessibility and visual settings.

* **`/lib/maze.ts`**
  * Exports `maze` data ({ width, height, walls\[], start, goal }).
  * **NEW**: `compileLayout(layout: Layout)` → `MazeData` for map loading.
  * **NEW**: `loadLayout(id: string)` → `Promise<MazeData>` for catalog integration.
  * Helpers: `isWall(a,b)`, `inBounds(cell)`.

* **`/lib/executor.ts`**
  * Pure step engine: `simulate(maze, pos, cmd)` → `{nextPos, ok, hitWallAt?}`
  * Runner: `runQueue(queue, tickMs, onStep, onError, onDone)` — no React inside.
  * **UNCHANGED**: Performance optimized for larger maps (up to 20×20).

* **`/lib/player-management.ts`**
  * Player configuration utilities.
  * Default player templates and validation.
  * Player state management helpers.

* **`/lib/viewport.ts`** *(NEW)*
  * Viewport state management: `ViewportState` with scroll coordinates and follow mode.
  * Follow-cam algorithm: computes safe frame and animates scroll to keep player visible.
  * Performance optimization: `will-change: transform`, translate3d for smooth pans.

## Upcoming Epic Components

### Epic 4a - Game UI Alignment
* **Enhanced `Controls`**: Large arrow icons, colorful number pills, simplified layout
* **Enhanced `HUD`**: Icon-based stats (🏆💥👣), compact display
* **Enhanced `Header`**: Site design system alignment, consistent fonts/gradients
* **Theme system**: CSS custom properties for playful styling

### Epic 3 - Site Pages & Parent Content
* **`LandingPage`**: Hero section with "Play Now" and "For Parents" CTAs
* **`HelpPage`**: Illustrated step-by-step walkthrough for children
* **`ParentsPage`**: Pedagogy content and learning benefits explanation
* **`ParentDashboard`**: Statistics display, settings, and JSON export
* **`CurriculumPage`**: Chapter cards overview (stubbed for Epic 3)
* **`SettingsModal`**: Tabbed interface (Players/Game tabs)
* **`/lib/storage.ts`**: `StorageProvider` abstraction for local→cloud migration

### Epic 4 - Curriculum System
* **`ChapterSelectPage`**: Interactive chapter cards with lock states and badges
* **`SessionWrapper`**: Chapter-specific game configuration component
* **`BadgeBook`**: Achievement display with sticker book metaphor
* **`ProgressTracker`**: Chapter completion and statistics tracking
* **`AuthProvider`**: Supabase integration with magic-link authentication
* **`/lib/curriculum.ts`**: Chapter loading, validation, and progress management
* **`/lib/supabase.ts`**: Cloud storage provider implementing `StorageProvider`

