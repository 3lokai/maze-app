# 8. QA Checklist (Parent Test)

1. Load app → grid + 2 colored circles visible (emerald Player A, indigo Player B).
2. Player 1 queues ≥6 moves, Run → sequence executes; control switches to Player 2.
3. Force wall collision → shake + toast; crashes counter increments; turn switches.
4. Success triggers player-colored confetti + scoreboard increment for that player.
5. Undo/Reset only affect active player; "Play Again" resets both players.
6. Speed toggle affects both players' execution speed.
7. Buttons usable on iPad; legible at ≥768px; high-contrast works.
8. ARIA labels announce turn changes and player actions.

---
