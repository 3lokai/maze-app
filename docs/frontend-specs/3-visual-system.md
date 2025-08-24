# 3) Visual System

* **Players**

  * P1 color: `emerald-600` (trail `emerald-300`)
  * P2 color: `indigo-600` (trail `indigo-300`)
  * Tokens: filled circle with player color ring
  * Names: "Player 1" / "Player 2" (default), scalable to 4 players
* **Maze**

  * Cells: `bg-muted` with `border-border/60`
  * Walls: 2px lines `bg-foreground/70`
  * Start: `Badge` (outline, “START”)
  * Goal: `Badge` (default, `Trophy` icon)
* **Theme System**

  * **Default**: Standard shadcn palette
  * **High-Contrast**: Swap CSS vars: `--background`, `--foreground`, `--muted`, bump borders to 2px, ensure ≥ 4.5:1
  * **Soft**: Warmer palette for long sessions (amber/rose tones, reduced contrast)
  * Theme toggle in HUD with legend: "Soft = warmer palette for long sessions"

Typography: shadcn default; titles `text-lg`, labels `text-sm`, HUD numbers `text-2xl font-semibold`.

---
