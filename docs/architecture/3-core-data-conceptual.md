# 3) Core Data (conceptual)

* **Maze**
  * Grid 10×10, walls as edges (e.g., `Set<'r,c→r,c'>`) or adjacency list per cell.

* **Player Configuration** *(NEW)*
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

* **Player Management State** *(NEW)*
  * `playerSettings: { maxPlayers: 4, allowCustomNames: boolean, allowCustomEmojis: boolean }`
  * `defaultPlayerConfigs: PlayerConfig[]` - Template configurations

