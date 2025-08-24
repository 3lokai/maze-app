# Maze App — Architecture (v0, 2-Player)

## Table of Contents

- [Maze App — Architecture (v0, 2-Player)](#table-of-contents)
  - [1) System Overview](#1-system-overview)
  - [2) Components & Responsibilities](#2-components-responsibilities)
  - [3) Core Data (conceptual)](#3-core-data-conceptual)
  - [4) Turn & Execution Flow (sequence)](#4-turn-execution-flow-sequence)
  - [5) State Machine (v0)](#5-state-machine-v0)
  - [6) Feedback & A11y](#6-feedback-a11y)
  - [7) Rendering & Performance](#7-rendering-performance)
  - [8) Error Handling & Safeguards](#8-error-handling-safeguards)
  - [9) Testing (parent 2-minute + unit hooks)](#9-testing-parent-2-minute-unit-hooks)
  - [10) File Map](#10-file-map)
  - [11) Extensibility Notes (to not paint us into a corner)](#11-extensibility-notes-to-not-paint-us-into-a-corner)

## Modules

- [Maze Module](./modules/maze.md) - Maze layout schema and compilation architecture
