# 3) Core Data (conceptual)

* **Maze**

  * Grid 10×10, walls as edges (e.g., `Set<'r,c→r,c'>`) or adjacency list per cell.
* **Game State**

  * `currentPlayer ∈ {1,2}`
  * `positions: {1: Cell, 2: Cell}`
  * `queues: {1: CmdToken[], 2: CmdToken[]}` where `CmdToken = {dir:'U|D|L|R', n:1..10}`
  * `trails: {1: Cell[], 2: Cell[]}`
  * `scores: {1:number, 2:number}`, `crashes: {1:number, 2:number}`
  * `status ∈ {idle, editing, executing, hitWall, reachedGoal}`
  * `speed ∈ {slow, med}` → tick 400/300ms
