# 5) Interaction Rules

* Building:

  * Tap Direction → highlights; next Number attaches → token appears as `U×5`.
  * If Direction tapped twice then Number: last direction wins (keep it forgiving).
* Execution:

  * **Run** executes full expanded queue; **Step** executes next token only.
  * On **illegal**: stop immediately, toast once, shake target cell, increment **crashes for current player**, **switch turn**.
  * On **goal**: mega confetti, increment **wins for current player**, **switch turn** after run completes.
  * Post-run: clear **current player’s** queue; keep positions & trails.
* Reset:

  * **Reset Player** clears that player’s queue and trail, returns position to start; does **not** affect other player.
  * **Play Again** resets both players to start, clears both queues/trails/HUD counts (wins persist or clear — your call; v0: persist wins until refresh).

---
