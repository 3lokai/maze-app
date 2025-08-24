# 5) Interaction Rules

* **Player Management**:
  * Settings modal opens via ⚙️ icon (parent interface)
  * Add Player: Up to 4 players maximum
  * Remove Player: Minimum 1 player must remain active
  * Edit Player: Name (1-20 chars) + emoji picker (🐢🐰🦊🦁)
  * Player changes apply immediately to UI

* **Turn Management**:
  * Round-robin cycling: 1→2→3→4→1 (only active players)
  * Single player: loops on same player
  * Turn indicator shows current player name + emoji
  * Turn switches after crash or goal achievement

* **Building**:
  * Tap Direction → highlights; next Number attaches → token appears as `U×5`.
  * If Direction tapped twice then Number: last direction wins (keep it forgiving).
  * Queue tokens show player-specific colors and emoji indicators

* **Execution**:
  * **Run** executes full expanded queue; **Step** executes next token only.
  * On **illegal**: stop immediately, toast once, shake target cell, increment **crashes for current player**, **switch to next active player**.
  * On **goal**: mega confetti, increment **wins for current player**, **switch to next active player** after run completes.
  * Post-run: clear **current player's** queue; keep positions & trails.

* **Reset**:
  * **Reset Player** clears that player's queue and trail, returns position to start; does **not** affect other players.
  * **Play Again** resets all active players to start, clears all queues/trails/HUD counts (wins persist until refresh).

* **Settings Persistence**:
  * Player configurations save to localStorage
  * Settings apply immediately without page refresh
  * Validation prevents invalid configurations

---

