# Source Tree

## Overview

This document provides a comprehensive map of the Maze App source code organization, explaining the purpose and relationships between different files and directories.

## Root Directory Structure

```
maze-app/
├── .bmad-core/              # BMAD Core configuration and agents
├── docs/                    # Project documentation
├── public/                  # Static assets
├── scripts/                 # Build and utility scripts
├── src/                     # Main source code
├── .eslintrc.json          # ESLint configuration
├── components.json         # shadcn/ui configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Source Code Organization (`src/`)

### Main Application Structure

```
src/
├── app/                     # Next.js App Router pages
├── components/              # React components
├── data/                    # Static data files
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions and pure logic
├── store/                   # State management (Zustand)
├── styles/                  # Global styles and CSS
└── types/                   # TypeScript type definitions
```

## Detailed File Structure

### App Router (`src/app/`)

```
src/app/
├── favicon.ico             # Application favicon
├── globals.css             # Global CSS styles
├── layout.tsx              # Root layout component
└── page.tsx                # Main application page
```

**Purpose**: Next.js 15 App Router structure for the single-page application.

- **`layout.tsx`**: Root layout with metadata and global providers
- **`page.tsx`**: Main game interface with maze, controls, and HUD
- **`globals.css`**: Global styles including Tailwind CSS imports
- **`favicon.ico`**: Application icon

### Components (`src/components/`)

```
src/components/
├── ui/                      # shadcn/ui components
│   ├── badge.tsx           # Badge component
│   ├── button.tsx          # Button component
│   ├── card.tsx            # Card component
│   ├── dialog.tsx          # Dialog/modal component
│   ├── dropdown-menu.tsx   # Dropdown menu component
│   ├── input.tsx           # Input component
│   ├── progress.tsx        # Progress bar component
│   ├── select.tsx          # Select component
│   ├── separator.tsx       # Separator component
│   ├── sheet.tsx           # Sheet/sidebar component
│   ├── sonner.tsx          # Toast notification component
│   ├── switch.tsx          # Switch/toggle component
│   ├── tabs.tsx            # Tabs component
│   └── tooltip.tsx         # Tooltip component
├── magicui/                 # Custom UI components
│   └── confetti.tsx        # Confetti animation component
├── AccessibilitySettings.tsx # Accessibility settings component
├── Celebration.tsx          # Victory celebration component
├── CollisionFeedback.tsx    # Collision feedback component
├── CommandBuilder.tsx       # Command input interface
├── CommandQueue.tsx         # Command queue display
├── DirectionButtons.tsx     # Direction control buttons
├── GameAnnouncement.tsx     # Game announcements
├── GameRail.tsx             # Game controls sidebar
├── Header.tsx               # Application header
├── MazeRenderer.tsx         # Maze grid renderer
├── NumberPad.tsx            # Number input pad
├── PlayerToken.tsx          # Player token component
├── SettingsDropdown.tsx     # Settings dropdown menu
├── StatsDrawer.tsx          # Statistics display
└── StatsDrawerWrapper.tsx   # Statistics wrapper component
```

**Purpose**: All React components organized by functionality and source.

#### UI Components (`src/components/ui/`)
- **shadcn/ui Components**: Reusable UI components built on Radix UI primitives
- **Consistent Design**: All components follow the same design system
- **Accessibility**: Built-in accessibility features from Radix UI

#### Game Components (`src/components/`)
- **Core Game Logic**: MazeRenderer, CommandBuilder, GameRail
- **User Interface**: Header, SettingsDropdown, StatsDrawer
- **Feedback Systems**: Celebration, CollisionFeedback, GameAnnouncement
- **Accessibility**: AccessibilitySettings for inclusive design

### Data (`src/data/`)

```
src/data/
└── layouts/                 # Maze layout definitions
    └── forest-01.json       # Forest theme maze layout
```

**Purpose**: Static data files for maze layouts and game configurations.

- **JSON Layouts**: Maze definitions with walls, start/goal positions, and themes
- **Extensible**: Easy to add new maze layouts and themes

### Hooks (`src/hooks/`)

```
src/hooks/
├── useAccessibility.ts      # Accessibility settings hook
├── useCelebration.ts        # Celebration logic hook
├── useCollision.ts          # Collision detection hook
├── useExecutor.ts           # Command execution hook
├── useMazeLayout.ts         # Maze layout loading hook
└── useTurnManagement.ts     # Turn management hook
```

**Purpose**: Custom React hooks that encapsulate reusable stateful logic.

- **`useAccessibility.ts`**: Manages accessibility settings and preferences
- **`useCelebration.ts`**: Handles victory celebrations and confetti
- **`useCollision.ts`**: Manages collision detection and feedback
- **`useExecutor.ts`**: Handles command execution and movement simulation
- **`useMazeLayout.ts`**: Loads and manages maze layout data
- **`useTurnManagement.ts`**: Manages player turns and game flow

### Library (`src/lib/`)

```
src/lib/
├── executor.ts              # Command execution engine
├── maze.ts                  # Maze utilities and data
└── utils.ts                 # General utility functions
```

**Purpose**: Pure utility functions and business logic separated from React components.

- **`executor.ts`**: Pure command execution logic (no React dependencies)
- **`maze.ts`**: Maze data structures and helper functions
- **`utils.ts`**: General utility functions (cn, asMagnitude1to10, etc.)

### Store (`src/store/`)

```
src/store/
└── gameStore.ts             # Main game state management
```

**Purpose**: Zustand stores for global state management.

- **`gameStore.ts`**: Central game state including positions, scores, turns, etc.
- **TypeScript Integration**: Fully typed state and actions
- **Immutable Updates**: Proper immutable state updates

### Styles (`src/styles/`)

```
src/styles/
├── accessibility.css        # Accessibility-specific styles
└── animations.css           # Custom animation definitions
```

**Purpose**: Global styles and CSS modules for specialized styling needs.

- **`accessibility.css`**: High contrast and accessibility-focused styles
- **`animations.css`**: Custom CSS animations and transitions

### Types (`src/types/`)

```
src/types/
├── commands.ts              # Command-related type definitions
├── execution.ts             # Execution-related type definitions
├── maze-app.d.ts            # Main application type definitions
├── maze.ts                  # Maze-specific type definitions
└── stats.ts                 # Statistics-related type definitions
```

**Purpose**: TypeScript type definitions organized by domain.

- **`maze-app.d.ts`**: Core application types (PlayerId, Cell, GameStatus, etc.)
- **`commands.ts`**: Command token and execution types
- **`execution.ts`**: Execution engine types
- **`maze.ts`**: Maze data structure types
- **`stats.ts`**: Statistics and tracking types

## Public Assets (`public/`)

```
public/
├── data/                    # Public data files
│   └── layouts/             # Public maze layouts
│       └── forest-01.json   # Forest theme maze layout
├── file.svg                 # File icon
├── globe.svg                # Globe icon
├── next.svg                 # Next.js logo
├── vercel.svg               # Vercel logo
└── window.svg               # Window icon
```

**Purpose**: Static assets accessible via URL.

- **SVG Icons**: Various icons used throughout the application
- **Data Files**: Public maze layouts accessible via fetch

## Documentation (`docs/`)

```
docs/
├── architecture/            # Architecture documentation
│   ├── modules/             # Module-specific documentation
│   ├── 1-system-overview.md # System overview
│   ├── 2-components-responsibilities.md # Component responsibilities
│   ├── 3-core-data-conceptual.md # Core data concepts
│   ├── 4-turn-execution-flow-sequence.md # Turn execution flow
│   ├── 5-state-machine-v0.md # State machine diagram
│   ├── 6-feedback-a11y.md # Feedback and accessibility
│   ├── 7-rendering-performance.md # Performance considerations
│   ├── 8-error-handling-safeguards.md # Error handling
│   ├── 9-testing-parent-2-minute-unit-hooks.md # Testing strategy
│   ├── 10-file-map.md # File organization map
│   ├── 11-extensibility-notes-to-not-paint-us-into-a-corner.md # Extensibility
│   ├── coding-standards.md # Coding standards (this document)
│   ├── tech-stack.md # Technology stack (this document)
│   ├── source-tree.md # Source tree (this document)
│   ├── epic1-implementation-guide.md # Implementation guide
│   └── index.md # Architecture index
├── development/             # Development documentation
├── frontend-specs/          # Frontend specifications
├── prd/                     # Product requirements
├── qa/                      # Quality assurance
├── stories/                 # User stories and epics
├── architecture.md # Main architecture document
├── completed-sprints-summary.md # Sprint summaries
├── frontend-specs.md # Frontend specifications
├── prd.md # Product requirements document
├── qa.md # Quality assurance
├── README.md # Project readme
└── stories.md # User stories
```

**Purpose**: Comprehensive project documentation organized by topic.

## Configuration Files

### Build Configuration

- **`next.config.ts`**: Next.js configuration with Turbopack
- **`tsconfig.json`**: TypeScript configuration with strict mode
- **`tailwind.config.ts`**: Tailwind CSS configuration
- **`postcss.config.mjs`**: PostCSS configuration
- **`components.json`**: shadcn/ui component configuration

### Development Configuration

- **`eslint.config.mjs`**: ESLint configuration with Next.js rules
- **`package.json`**: Dependencies, scripts, and project metadata
- **`.eslintrc.json`**: Legacy ESLint configuration (if needed)

## File Naming Conventions

### React Components
- **PascalCase**: Component files use PascalCase (e.g., `MazeRenderer.tsx`)
- **Descriptive Names**: Clear, descriptive component names
- **One Component Per File**: Each file contains one main component

### Utilities and Hooks
- **camelCase**: Utility files use camelCase (e.g., `useExecutor.ts`)
- **Prefix Hooks**: Custom hooks prefixed with `use` (e.g., `useCollision.ts`)
- **Descriptive Names**: Clear indication of functionality

### Type Definitions
- **Domain-based**: Types organized by domain (e.g., `commands.ts`, `maze.ts`)
- **Global Types**: Main types in `maze-app.d.ts`
- **Specific Types**: Domain-specific types in separate files

### Configuration Files
- **Standard Names**: Use standard configuration file names
- **Extension**: Use appropriate extensions (`.ts`, `.json`, `.mjs`)

## Import Organization

### Import Order
1. **React imports**: React hooks and utilities
2. **Third-party libraries**: External dependencies
3. **Internal components**: `@/components/...`
4. **Internal utilities**: `@/lib/...`, `@/hooks/...`
5. **Types**: `@/types/...`
6. **Styles**: CSS imports

### Path Aliases
- **`@/*`**: Maps to `./src/*` for clean imports
- **Consistent Usage**: Use path aliases for all internal imports
- **No Relative Paths**: Avoid deep relative paths

## Code Organization Principles

### Separation of Concerns
- **Components**: UI and presentation logic
- **Hooks**: Stateful logic and side effects
- **Utilities**: Pure functions and business logic
- **Types**: Type definitions and interfaces
- **Store**: Global state management

### Modularity
- **Single Responsibility**: Each file has a single, clear purpose
- **Loose Coupling**: Minimize dependencies between modules
- **High Cohesion**: Related functionality grouped together

### Maintainability
- **Clear Structure**: Easy to navigate and understand
- **Consistent Patterns**: Follow established patterns throughout
- **Documentation**: Well-documented code and structure

## Future Organization Considerations

### Scalability
- **Feature-based Organization**: Consider organizing by features as the app grows
- **Module Boundaries**: Clear boundaries between different parts of the application
- **Code Splitting**: Organize for effective code splitting

### Testing Organization
- **Test Co-location**: Place tests next to source files
- **Test Utilities**: Shared test utilities and fixtures
- **Integration Tests**: Separate integration test organization

### Documentation Organization
- **Living Documentation**: Keep documentation in sync with code
- **API Documentation**: Document public APIs and interfaces
- **Architecture Decision Records**: Document major architectural decisions

---

*This document should be updated as the codebase evolves and new organizational patterns emerge.*
