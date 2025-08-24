# Maze App — Architecture (v1, Flexible Players)

## Table of Contents

- [Maze App — Architecture (v1, Flexible Players)](#table-of-contents)
  - [1) System Overview](#1-system-overview)
  - [2) Components & Responsibilities](#2-components-responsibilities)
  - [3) Core Data (conceptual)](#3-core-data-conceptual)
  - [4) Turn & Execution Flow (sequence)](#4-turn-execution-flow-sequence)
  - [5) State Machine (v1)](#5-state-machine-v1)
  - [6) Feedback & A11y](#6-feedback-a11y)
  - [7) Rendering & Performance](#7-rendering-performance)
  - [8) Error Handling & Safeguards](#8-error-handling-safeguards)
  - [9) Testing (parent 2-minute + unit hooks)](#9-testing-parent-2-minute-unit-hooks)
  - [10) File Map](#10-file-map)
  - [11) Extensibility Notes (to not paint us into a corner)](#11-extensibility-notes-to-not-paint-us-into-a-corner)

## Modules

- [Maze Module](./modules/maze.md) - Maze layout schema and compilation architecture
- [Player Management Module](./modules/player-management.md) - Flexible player system and personalization

## Epic 1 Changes Summary

- **Player System**: Expanded from fixed 2 players to flexible 1-4 players
- **Personalization**: Player names, emoji sprites, and color customization
- **Dynamic UI**: Components adapt to player count and configuration
- **Settings Integration**: Player management through settings panel
- **Round-Robin Turns**: Dynamic turn order for variable player counts
