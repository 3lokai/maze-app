# 1) System Overview

* **Client-only** Next.js 15 (App Router) + React 19 + Tailwind.
* No SSR, no APIs, no persistence. All state local.
* One page, dynamic components: `Maze`, `TurnCard`, `Controls`, `HUD`, `PlayerManagement`.
* **Flexible Player System**: Supports 1-4 players with personalization (names, emojis, colors).
* **Dynamic UI**: Components adapt to player count and configuration.
* **Settings Integration**: Player management through settings panel.
* Effects: `canvas-confetti`. Haptics/Audio deferred.

