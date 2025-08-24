# 11) Extensibility Notes (to not paint us into a corner)

### v1: Multipliers & Scoreboard
* **v1 Multipliers UX**: already supported via `{dir, n}` tokens; later allow `repeat` macros.
* **v1 Scoreboard**: existing `scores` object; render streaks; optional best‐of-N.
* **v1 Persistence**: localStorage wrapper for session data.

### v2: Parent Controls & Settings
* **v2 Player expansion**: extend `currentPlayer` from `{1,2}` to `PlayerId = 1|2|3|4`.
* **v2 Player state**: `players: Record<PlayerId, {name: string, color: string, emoji?: string}>`.
* **v2 Settings**: `config: {gridSize: 5|10|15, hazards: boolean, theme: 'default'|'hc'|'soft'}`.
* **v2 Maze scaling**: `maze` data structure supports variable `width`/`height`.

### v3: Hazards & Complications
* **v3 Hazard registry**: `hazards: Hazard[]` where `Hazard = {type: 'lion'|'door'|'hunter', position: Cell, config?: any}`.
* **v3 Executor expansion**: `simulate(maze, pos, cmd, hazards, inventory)` → `{nextPos, ok, hitWallAt?, hazardHit?, inventoryChange?}`.
* **v3 Inventory system**: `inventory: Record<PlayerId, {keys: number, shields: number, speedBoots: number}>`.
* **v3 State machine**: add `hitHazard` and `eliminated` states.

### v4: Campaign Mode & Learning Progression
* **v4 Level system**: `levels: Level[]` where `Level = {id: number, title: string, maze: Maze, features: string[], hazards: Hazard[]}`.
* **v4 Progress tracking**: `progress: Record<PlayerId, {currentLevel: number, badges: string[], concepts: Record<string, 'mastered'|'learning'|'locked'>}>`.
* **v4 Campaign loader**: `loadLevel(levelId: number)` → `{maze, features, hazards}`.
* **v4 World map**: component for level selection with locked/unlocked states.

### v5: Advanced Features
* **v5 Maze generator**: `generateMaze(seed: string, opts: {width, height, complexity, pathLength})` → `Maze`.
* **v5 Sprite system**: `sprites: Record<PlayerId, {emoji: string, altText: string}>`.
* **v5 Replay system**: `replay: {commands: CmdToken[], steps: Cell[], duration: number}`.
* **v5 Analytics**: `analytics: Record<PlayerId, {avgSteps: number, errors: number, successfulRuns: number, timeSpent: number}>`.

### Technical Infrastructure
* **Config-driven architecture**: JSON-based level definitions with feature flags.
* **Hazard registry system**: Pluggable complication framework with step-check functions.
* **Player array expansion**: Support for 1-4 players with flexible state management.
* **Campaign loader**: Dynamic level loading from JSON definitions.
* **Theme system**: CSS custom properties for multiple theme support.
* **Localization**: i18n system for multilingual U/D/L/R tokens.

---