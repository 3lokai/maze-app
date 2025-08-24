# Maze Module Architecture

## Purpose

Describe the file format for authored mazes and how it compiles into `MazeData.graph` used by the executor. Zero runtime refactors.

## Types (impl-aligned)

```ts
// runtime shape produced for the app (already in your code)
type Cell = { r: number; c: number };

type MazeData = {
  width: number;
  height: number;
  start: Cell;
  goal: Cell;
  graph: Record<string, Set<string>>; // adjacency, no walls
  mazeId?: string;
  seed?: number;
};
```

## Authoring Schema (JSON)

Two equivalent inputs are supported; pick one per file:

### A) **Path List** (easiest for hand-drawn mazes)

```json
{
  "id": "forest-01",
  "width": 10,
  "height": 10,
  "start": { "r": 8, "c": 1 },
  "goal":  { "r": 1, "c": 8 },
  "path": ["8,1","8,2","8,3","7,3","6,3","6,4","6,5","5,5","4,5","4,4","4,3","3,3","2,3","2,4","2,5","2,6","2,7","2,8"],
  "labels": { "start": "Home", "goal": "Forest" }
}
```

**Compilation rule:** build an **undirected adjacency** by linking any **consecutive** path cells (and any orthogonal neighbors you list). Output `MazeData.graph` with `Set`s.

### B) **Edge List** (explicit corridors)

```json
{
  "id": "forest-edges",
  "width": 10,
  "height": 10,
  "start": { "r": 8, "c": 1 },
  "goal":  { "r": 1, "c": 8 },
  "edges": [
    ["8,1","8,2"], ["8,2","8,3"], ["8,3","7,3"], ["7,3","6,3"], ["6,3","6,4"]
  ],
  "labels": { "start": "Home", "goal": "Forest" }
}
```

**Compilation rule:** for each pair `[a,b]`, add `b` to `graph[a]` and `a` to `graph[b]`.

> Notes
> • Coordinates are 0-based `{r,c}`; keys stringify as `"r,c"` (matches your `mazeHelpers.key`).
> • **Orthogonal moves only**; diagonals are ignored during compile.
> • `labels` are optional and used by the renderer only.

## Compile Function (pseudocode)

```ts
type Layout =
  | { id:string; width:number; height:number; start:Cell; goal:Cell; path:string[]; labels?:{start?:string;goal?:string} }
  | { id:string; width:number; height:number; start:Cell; goal:Cell; edges:[string,string][]; labels?:{start?:string;goal?:string} };

function compileLayout(layout: Layout): MazeData {
  const graph: Record<string, Set<string>> = {};
  const link = (a: string, b: string) => {
    (graph[a] ??= new Set()).add(b);
    (graph[b] ??= new Set()).add(a);
  };

  if ('path' in layout) {
    const keys = layout.path;
    for (let i=0; i<keys.length-1; i++) {
      link(keys[i], keys[i+1]);         // consecutive path cells
    }
    // Optional: also link any orthogonal neighbors present in path to widen corridors
    // (leave off for skinny paths)
  } else {
    for (const [a,b] of layout.edges) link(a,b);
  }

  return {
    width: layout.width,
    height: layout.height,
    start: layout.start,
    goal: layout.goal,
    graph,
    mazeId: layout.id
  };
}
```

## Renderer & Executor Contracts (unchanged)

* **Renderer**: use `graph` and `mazeHelpers.neighbors(cell)` to draw corridors; non-adjacent edges imply walls.
* **Executor**: still calls `executeStep` → `isValidMove(maze, from, to)` which uses `graph[from].has(to)`; no change.
* **Labels**: optional `labels.start/goal` displayed by UI; not part of `MazeData`.

## Validation

* BFS from `start` must reach `goal`.
* Shortest path length within a parent-defined window (e.g., 10–20) — future setting.
* No orphan nodes outside `path/edges` unless you want dead-ends (allowed).
* Grid bounds: every referenced cell must satisfy `0 ≤ r < height`, `0 ≤ c < width`.

## Future Extensibility (stubs)

* **Themes:** `labels` may add `icon` (`"🏡"`, `"🌳"`) and `color`.
* **Hazards:** add `hazards?: Array<{ type:'lion'|'door'|'hunter'; at: string }>`; compile keeps `graph` same; executor checks hazards on step.
* **Multiple layouts:** `layouts/forest-01.json`, `...-02.json` — picker uses `mazeId`.

## Implementation Notes

### What you need to change (minimal)

1. Add a tiny loader: `loadLayout(json) → compileLayout(json) → MazeData`.
2. Keep `executor.ts` and `mazeHelpers` as-is (they're already perfect for this).
3. UI: read `labels.start/goal` if provided; otherwise default badges.

### Current Foundation

You already use **`MazeData.graph: Record<string, Set<string>>`** with helpers `mazeHelpers.key/parseKey/neighbors/inBounds` and `isValidMove(...)`. `executor.ts` calls `executeStep(...)` and consumes `mazeHelpers` + `isGoal`. Perfect foundation.

The **MazeLayout schema** will slot **on top** of that without refactors: we'll load a layout JSON, **compile it into your `graph`** once, and keep executor/maze helpers unchanged.

### File Structure

```
src/
├── lib/
│   ├── maze.ts (existing - add compileLayout function)
│   └── executor.ts (unchanged)
├── types/
│   └── maze.ts (add Layout types)
└── data/
    └── layouts/
        ├── forest-01.json
        └── forest-02.json
```

## Winston's Assessment

**Winston (Architect)** — looked at your code. Quick readouts:

* You already use **`MazeData.graph: Record<string, Set<string>>`** with helpers `mazeHelpers.key/parseKey/neighbors/inBounds` and `isValidMove(...)`. `executor.ts` calls `executeStep(...)` and consumes `mazeHelpers` + `isGoal`. Perfect foundation.

So, I'll define the **MazeLayout schema** to slot **on top** of that without refactors: we'll load a layout JSON, **compile it into your `graph`** once, and keep executor/maze helpers unchanged.

If you want, I can paste a **real `compileLayout.ts`** file matching your imports (`@/types/maze-app`) that you can drop into `/lib/` right now.
