# 📋 Finalized v0 Backlog — Coding Maze (2-Player)

## Story 1 — Scaffold App Shell (XS)

App boots cleanly with Tailwind v4 + shadcn, globals.css themes wired, responsive at ≥768px, no console errors.

## Story 2 — Maze Renderer (S)

10×10 fixed maze rendered from JSON; start/goal visible; walls drawn; square grid scales.

## Story 3 — Two Players & Tokens (S)

Two distinct tokens (emerald/indigo), trails per player, both start at start cell, TurnCard shows active turn.

## Story 4 — Command Builder (M)

Tap U/D/L/R + 1–10 to form tokens (e.g., U×5); queue rail shows tokens; Undo removes last; Reset clears queue.

## Story 5 — Executor & Movement (M)

Run executes expanded queue step-by-step (300/400ms tick, Slow/Med toggle); Step executes single token; trails animate.

## Story 6 — Collision & Feedback (M)

Illegal moves stop run; target cell shakes; toast "Bumped wall at step N"; crashes++ for active player.

## Story 7 — Goal & Celebration (M)

First reach triggers mega confetti; wins++ for active player; "Play Again" resets board & HUD; wins persist until page refresh.

## Story 8 — Turn Switching (S)

After run (win/error/done), control auto-switches to the other player; clears only that player's queue; TurnCard indicator updates.

## Story 9a — HUD & Stats (S)

HUD shows steps/crashes per player, wins scoreboard; per-player stats display; "Play Again" button.

## Story 9b — Accessibility (S)

High Contrast toggle; all buttons ≥44px; ARIA labels; toast roles correct; keyboard navigation.

## Story 10 — Core Libraries (XS)

/lib/maze.ts exports fixed maze data + helpers; /lib/executor.ts pure step engine + runner.

## Story 11 — QA Pass & Deploy (XS)

Parent QA script passes; deploy to Vercel; tagged alpha-01; no console errors; basic unit tests on executor functions.
