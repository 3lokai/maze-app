# 7) Rendering & Performance

* Minimal re-renders: keep `executor` pure and push deltas via `onStep`.
* Represent walls as adjacency to make `simulate` O(1).
* Avoid layout shifts: fixed controls/HUD heights; no CLS on buttons.
* Confetti throttled to per-step micro bursts.
