# 1) Layout (single page)

* **Header**: Settings + Stats (existing controls)
* **Main**: 12-col grid @ ≥768px

  * **Left (col-span-7)**: `Maze` board (square, responsive, aspect-ratio locked) with inline MapPicker.
  * **Right (col-span-5)**: stacked `TurnCard` → `Commands & Execute` → `HUD`.
* **Mobile (≤767px)**: vertical stack → `TurnCard` → `Maze` (with MapPicker) → `Commands & Execute` → `HUD`. Keep Maze ≥ 320px square.
* **Large Maps (≥15×15)**: Horizontal viewport with follow-cam; maze scrolls to keep player token centered.

Spacing: `gap-4` page, `gap-3` cards. Touch targets ≥ **44px**; min button size `h-12 px-4`.

---

