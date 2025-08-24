# 8) State & Disable Logic (UX)

* **Settings Modal States**:
  * **Open**: Backdrop blur, focus trapped, escape to close
  * **Editing**: Form validation, save/cancel buttons active
  * **Saving**: Disable all inputs, show loading state
  * **Error**: Show validation messages, prevent save

* **Player Management States**:
  * **Adding Player**: Disable other player actions, show form
  * **Editing Player**: Highlight active row, disable other edits
  * **Removing Player**: Confirm dialog, prevent if only 1 player
  * **Validating**: Real-time name validation, emoji selection

* **Game States**:
  * **Executing**: Disable all controls except stop
  * **Player Turn**: Highlight current player, show turn indicator
  * **Goal Achieved**: Celebration state, auto-switch turn
  * **Crash**: Error state, auto-switch turn

* **Disable Rules**:
  * Settings modal open: Disable game controls
  * Executing: Disable all inputs except stop
  * Single player: Disable turn switching
  * Invalid config: Disable save button

---

