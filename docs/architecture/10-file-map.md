# 10) File Map

```
/app/page.tsx              // Compose Maze + TurnCard + Controls + HUD; owns game state
/components/Maze.tsx       // Render grid, players, trails; exposes shake ref
/components/TurnCard.tsx   // Turn indicator with player avatar and scoreboard
/components/Controls.tsx   // Direction & number tokens; Run/Step/Undo/Reset; Speed
/components/HUD.tsx        // Per-player steps/crashes, Play Again, HC toggle
/lib/maze.ts               // Fixed maze graph + helpers
/lib/executor.ts           // simulate/runQueue (pure), no React
/styles/globals.css        // Tailwind base + HC theme variables
```
