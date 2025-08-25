# 1) System Overview

* **Client-only** Next.js 15 (App Router) + React 19 + Tailwind.
* No SSR, no APIs, no persistence. All state local.
* One page, dynamic components: `MazeViewport`, `TurnCard`, `Controls`, `HUD`, `PlayerManagement`, `MapPicker`.
* **Flexible Player System**: Supports 1-4 players with personalization (names, emojis, colors).
* **Multi-Map System**: Multiple maze layouts with catalog, preview, and validation.
* **Responsive Viewport**: Aspect-ratio locked cells with follow-cam for larger maps (up to 20×20).
* **Dynamic UI**: Components adapt to player count, map size, and device configuration.
* **Settings Integration**: Player management through settings panel.
* Effects: `canvas-confetti`. Haptics/Audio deferred.

