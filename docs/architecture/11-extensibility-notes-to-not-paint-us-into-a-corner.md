# 11) Extensibility Notes (to not paint us into a corner)

### ✅ Epic 1: Flexible Players & Personalization *(COMPLETED)*
* **Player System**: Dynamic 1-4 player support with `PlayerConfig` objects
* **Personalization**: Player names, emoji sprites (🐢🐰🦊🦁), color customization
* **Dynamic UI**: Components adapt to player count and configuration
* **Settings Integration**: Player management through settings panel
* **Round-Robin Turns**: Dynamic turn order for variable player counts

### v2: Multipliers & Scoreboard
* **v2 Multipliers UX**: already supported via `{dir, n}` tokens; later allow `repeat` macros.
* **v2 Scoreboard**: existing `scores` object; render streaks; optional best‐of-N.
* **v2 Persistence**: localStorage wrapper for session data.

### v3: Parent Controls & Settings *(ENHANCED)*
* **v3 Maze scaling**: `maze` data structure supports variable `width`/`height`.
* **v3 Advanced settings**: `config: {gridSize: 5|10|15, hazards: boolean, theme: 'default'|'hc'|'soft'}`.
* **v3 Player presets**: Save/load player configurations.

### v4: Hazards & Complications
* **v4 Hazard registry**: `hazards: Hazard[]` where `Hazard = {type: 'lion'|'door'|'hunter', position: Cell, config?: any}`.
* **v4 Executor expansion**: `simulate(maze, pos, cmd, hazards, inventory)` → `{nextPos, ok, hitWallAt?, hazardHit?, inventoryChange?}`.
* **v4 Inventory system**: `inventory: Record<PlayerId, {keys: number, shields: number, speedBoots: number}>`.
* **v4 State machine**: add `hitHazard` and `eliminated` states.

### v5: Campaign Mode & Learning Progression
* **v5 Level system**: `levels: Level[]` where `Level = {id: number, title: string, maze: Maze, features: string[], hazards: Hazard[]}`.
* **v5 Progress tracking**: `progress: Record<PlayerId, {currentLevel: number, badges: string[], concepts: Record<string, 'mastered'|'learning'|'locked'>}>`.
* **v5 Campaign loader**: `loadLevel(levelId: number)` → `{maze, features, hazards}`.
* **v5 World map**: component for level selection with locked/unlocked states.

### v6: Advanced Features
* **v6 Maze generator**: `generateMaze(seed: string, opts: {width, height, complexity, pathLength})` → `Maze`.
* **v6 Replay system**: `replay: {commands: CmdToken[], steps: Cell[], duration: number}`.
* **v6 Analytics**: `analytics: Record<PlayerId, {avgSteps: number, errors: number, successfulRuns: number, timeSpent: number}>`.

### Technical Infrastructure
* **Config-driven architecture**: JSON-based level definitions with feature flags.
* **Hazard registry system**: Pluggable complication framework with step-check functions.
* **Campaign loader**: Dynamic level loading from JSON definitions.
* **Theme system**: CSS custom properties for multiple theme support.
* **Localization**: i18n system for multilingual U/D/L/R tokens.
* **Player configuration system**: Flexible player management with validation and defaults.

---