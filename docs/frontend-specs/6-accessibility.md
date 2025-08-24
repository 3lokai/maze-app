# 6) Accessibility

* All interactive elements ≥ 44×44 px.
* ARIA:
  * Buttons: `aria-label="Up"`, `"Down"`, `"Left"`, `"Right"`, `"Number 5"`, `"Run sequence"`, etc.
  * Turn indicator: `role="status"` live region polite; screen readers announce "Player X's turn"
  * Toasts: `role="alert"` for error.
  * Future: Provide ARIA labels for emoji/sprite when added (e.g., `aria-label="Tiger token"`)
* Keyboard: Arrow keys map to U/D/L/R; digits map to multipliers; `Enter` = Run (parent use).
* Focus management: return focus to **Run** after execution completes; visible focus rings.
* Theme contrast: Ensure Soft mode also meets contrast on text/buttons.

---
