# 4) Turn & Execution Flow (sequence)

1. **Editing (Player N)**: taps direction, then number → append `CmdToken`.
2. **Run**:

   * Lock inputs; set `status=executing`.
   * For each token: iterate `n` steps with `tickMs`; for each step:

     * `simulate`; if wall/bounds → `shake(cell)`, toast “Bumped at step k”; `crashes[N]++`; stop run.
     * Else move, push to `trails[N]`; micro-confetti tick.
     * If `goal` → one-shot mega-confetti; increment `scores[N]`; stop run.
3. **Switch Turn**:

   * `status=idle`; `currentPlayer = other`.
   * Clear only **that player’s queue**; keep trails/positions.

**Note:** Both players start at same `start`. You can optionally reset both via “Play Again”.
