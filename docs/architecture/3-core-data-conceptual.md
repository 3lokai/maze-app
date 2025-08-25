# 3) Core Data (conceptual)

* **Maze**
  * Grid variable size (up to 20×20), walls as edges (e.g., `Set<'r,c→r,c'>`) or adjacency list per cell.
  * **NEW**: `mazeId?: string` - Unique identifier for map catalog.
  * **NEW**: `labels?: { start?: string; goal?: string; startIcon?: string; goalIcon?: string }` - Display labels and icons.

* **Viewport State** *(NEW)*
  * `ViewportState = { scrollX: number; scrollY: number; cellSize: number; followMode: 'center' | 'lead-⅓' | 'none' }`
  * `scrollX/Y` - Pixel coordinates for viewport position
  * `cellSize` - Computed responsive cell size in pixels
  * `followMode` - Follow-cam behavior for player tracking

* **Map Catalog** *(NEW)*
  * `MazeCatalogItem = { id: string; width: number; height: number; preview?: string; difficulty?: string }`
  * `LoadLayoutFn = (id: string) => Promise<MazeData>` - Async map loading function

* **Player Configuration**
  * `PlayerConfig = { id: PlayerId, name: string, emoji: string, color: string, isActive: boolean }`
  * `PlayerId = 1 | 2 | 3 | 4`
  * Default emojis: 🐢🐰🦊🦁
  * Player colors: configurable per player

* **Game State**
  * `players: PlayerConfig[]` - Dynamic player configurations
  * `activePlayerIds: PlayerId[]` - Currently active players (1-4)
  * `currentPlayer: PlayerId | null` - Current player (null if no active players)
  * `positions: Record<PlayerId, Cell>` - Dynamic positions for active players
  * `queues: Record<PlayerId, CmdToken[]>` - Dynamic command queues per player
  * `trails: Record<PlayerId, Cell[]>` - Dynamic trails per player
  * `scores: Record<PlayerId, number>` - Dynamic scores per player
  * `crashes: Record<PlayerId, number>` - Dynamic crashes per player
  * `wins: Record<PlayerId, number>` - Dynamic wins per player
  * `status ∈ {idle, editing, executing, hitWall, reachedGoal}`
  * `speed ∈ {slow, med}` → tick 400/300ms
  * **NEW**: `currentMapId: string` - Currently loaded map identifier
  * **NEW**: `viewport: ViewportState` - Current viewport state

* **Player Management State**
  * `playerSettings: { maxPlayers: 4, allowCustomNames: boolean, allowCustomEmojis: boolean }`
  * `defaultPlayerConfigs: PlayerConfig[]` - Template configurations

