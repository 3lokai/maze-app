# 11) Extensibility Notes (to not paint us into a corner)

### ✅ Epic 1: Flexible Players & Personalization *(COMPLETED)*
* **Player System**: Dynamic 1-4 player support with `PlayerConfig` objects
* **Personalization**: Player names, emoji sprites (🐢🐰🦊🦁), color customization
* **Dynamic UI**: Components adapt to player count and configuration
* **Settings Integration**: Player management through settings panel
* **Round-Robin Turns**: Dynamic turn order for variable player counts

### ✅ Epic 2: Maps & Maze Renderer Stability *(COMPLETED)*
* **Multi-Map System**: Multiple maze layouts with catalog, preview, and validation
* **Responsive Viewport**: Aspect-ratio locked cells with follow-cam for larger maps (up to 20×20)
* **Performance Optimization**: DOM mode optimized for smooth 60fps rendering
* **Overlay System**: Labels and emojis as absolute overlays preserving grid integrity

### 🔄 Epic 4a: Game UI Alignment *(NEXT PRIORITY)*
* **Visual Consistency**: Header alignment with site design system
* **Child-Friendly Controls**: Large arrow icons and colorful number pills
* **Production Polish**: Remove debug overlays and dev-only UI elements
* **Theming Integration**: Soft glowing trails and playful design elements

### 🔄 Epic 3: Site Pages & Parent Content *(READY)*
* **Storage Abstraction**: `StorageProvider` interface with migration-safe architecture
* **Parent Dashboard**: Statistics tracking and JSON export functionality
* **Content Pages**: Landing, Help, Parents pedagogy, Curriculum overview
* **Settings Modal**: Tabbed interface for player and game configuration

### 🔄 Epic 4: Curriculum System *(PLANNED)*
* **Chapter Schema**: JSON-driven curriculum with prerequisites and feature gating
* **Session Wrapper**: Chapter-specific game configuration and result tracking
* **Progress Store**: Local and cloud-synced chapter completion tracking
* **Badge System**: Achievement tracking with visual reward system
* **Check Command**: Scoped introduction of conditional logic mechanic

### v5: Advanced Learning Features
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