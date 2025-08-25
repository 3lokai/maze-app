# Coding Standards

## Overview

This document defines the coding standards, patterns, and conventions used throughout the Maze App project. These standards ensure consistency, maintainability, and developer productivity.

## TypeScript Standards

### Configuration
- **Strict Mode**: Enabled with `"strict": true` in `tsconfig.json`
- **Target**: ES2017 for broad browser compatibility
- **Module Resolution**: Bundler-based for Next.js 15 compatibility
- **Path Mapping**: `@/*` maps to `./src/*` for clean imports

### Type Definitions
- **File Extension**: Use `.d.ts` for global type definitions
- **Branded Types**: Use branded types for runtime validation (e.g., `Magnitude1to10`)
- **Readonly**: Prefer `Readonly<T>` for immutable data structures
- **Partial Records**: Use `Partial<Record<K, V>>` for optional player-based data

```typescript
// Example: Branded type with runtime validation
declare const __MagnitudeBrand: unique symbol;
export type Magnitude1to10 = number & { readonly [__MagnitudeBrand]: 'Magnitude1to10' };

export function asMagnitude1to10(n: number): Magnitude1to10 {
  if (Number.isInteger(n) && n >= 1 && n <= 10) return n as Magnitude1to10;
  throw new Error(`Invalid magnitude ${n}; expected integer 1..10`);
}
```

### Interface Naming
- **Props Interfaces**: Suffix with `Props` (e.g., `MazeProps`, `TurnCardProps`)
- **State Interfaces**: Use descriptive names (e.g., `GameState`, `CollisionState`)
- **Event Types**: Use union types for event handling (e.g., `GameEvent`)

## React Patterns

### Component Structure
- **Client Components**: Use `"use client"` directive at the top
- **Server Components**: Default (no directive needed)
- **Component Organization**: One component per file with matching filename
- **Export Pattern**: Named exports for components, default exports discouraged

```typescript
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ComponentProps {
  // Props definition
}

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Component implementation
}
```

### State Management
- **Zustand**: Use for complex global state (game state, settings)
- **useState**: Use for simple local component state
- **useEffect**: Use for side effects and lifecycle management
- **Custom Hooks**: Extract reusable logic into custom hooks

```typescript
// Example: Zustand store pattern
interface GameState {
  // State properties
  positions: Partial<Record<PlayerId, Cell>>;
  currentPlayer: PlayerId;
  
  // Actions
  setPosition: (player: PlayerId, position: Cell) => void;
  switchPlayer: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  // Initial state
  positions: { 1: { r: 0, c: 0 } },
  currentPlayer: 1,
  
  // Actions
  setPosition: (player, position) =>
    set((state) => ({
      positions: { ...state.positions, [player]: position }
    })),
}));
```

### Custom Hooks Pattern
- **Naming**: Prefix with `use` (e.g., `useExecutor`, `useCollision`)
- **Return Pattern**: Return object with state and actions
- **Dependencies**: Accept dependencies as parameters
- **Error Handling**: Include error states in return object

```typescript
// Example: Custom hook pattern
export function useCustomHook(dependency: string) {
  const [state, setState] = useState<StateType>(initialState);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Effect logic
  }, [dependency]);
  
  const actions = {
    action1: () => { /* implementation */ },
    action2: () => { /* implementation */ },
  };
  
  return { state, error, ...actions };
}
```

## File Organization

### Directory Structure
```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components ()
│   ├── ui/             # shadcn/ui components
│   └── magicui/        # Custom UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and pure logic
├── store/              # Zustand stores
├── styles/             # Global styles and CSS modules
└── types/              # TypeScript type definitions
```

### Import Organization
1. **React imports** (useState, useEffect, etc.)
2. **Third-party libraries** (zustand, lucide-react, etc.)
3. **Internal components** (@/components/...)
4. **Internal utilities** (@/lib/..., @/hooks/...)
5. **Types** (@/types/...)
6. **Styles** (CSS imports)

```typescript
// Example: Import organization
import { useState, useEffect } from "react";
import { create } from "zustand";
import { Badge } from "@/components/ui/badge";
import { useGameStore } from "@/store/gameStore";
import { cn } from "@/lib/utils";
import type { GameState } from "@/types/maze-app";
```

## Naming Conventions

### Variables and Functions
- **camelCase**: For variables, functions, and methods
- **PascalCase**: For components, interfaces, and types
- **UPPER_SNAKE_CASE**: For constants
- **kebab-case**: For CSS classes and file names

### Component Props
- **Descriptive Names**: Use clear, descriptive prop names
- **Boolean Props**: Use `is` or `has` prefix (e.g., `isColliding`, `hasError`)
- **Event Handlers**: Use `on` prefix (e.g., `onClick`, `onStatusChange`)

### CSS Classes
- **Tailwind**: Use Tailwind CSS classes with `cn()` utility for conditional classes
- **Custom Classes**: Use kebab-case for custom CSS classes
- **Responsive**: Use Tailwind responsive prefixes (sm:, md:, lg:)

```typescript
// Example: CSS class patterns
const className = cn(
  "base-class",
  condition && "conditional-class",
  variant === "primary" && "primary-variant"
);
```

## Error Handling

### Error Boundaries
- **Component Level**: Wrap components in error boundaries for graceful degradation
- **State Management**: Include error states in Zustand stores
- **Custom Hooks**: Return error states from custom hooks

### Validation
- **Runtime Guards**: Use branded types with runtime validation
- **Zod Schemas**: Use Zod for complex data validation
- **Type Guards**: Use TypeScript type guards for runtime type checking

```typescript
// Example: Error handling pattern
interface HookReturn {
  data: DataType | null;
  error: string | null;
  isLoading: boolean;
}

export function useDataHook(): HookReturn {
  const [data, setData] = useState<DataType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    try {
      // Data fetching logic
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return { data, error, isLoading };
}
```

## Performance Patterns

### Optimization
- **React.memo**: Use for expensive components that receive stable props
- **useMemo**: Use for expensive computations
- **useCallback**: Use for stable function references
- **Lazy Loading**: Use dynamic imports for code splitting

### State Updates
- **Immutable Updates**: Always create new objects/arrays for state updates
- **Batch Updates**: Use Zustand's set function for multiple state changes
- **Selective Updates**: Use partial state updates to minimize re-renders

```typescript
// Example: Immutable state updates
set((state) => ({
  positions: {
    ...state.positions,
    [player]: position,
  },
  trails: {
    ...state.trails,
    [player]: [...(state.trails[player] || []), position],
  },
}));
```

## Accessibility Standards

### ARIA Labels
- **Descriptive Labels**: Use clear, descriptive ARIA labels
- **Dynamic Labels**: Update labels based on state changes
- **Skip Links**: Include skip links for keyboard navigation

### Keyboard Navigation
- **Focus Management**: Ensure logical tab order
- **Keyboard Events**: Handle keyboard events for interactive elements
- **Focus Indicators**: Maintain visible focus indicators

```typescript
// Example: Accessibility patterns
<button
  aria-label={`${playerEmojis[currentPlayer]} Player ${currentPlayer}'s turn`}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Player {currentPlayer}
</button>
```

## Testing Standards

### Unit Testing
- **Pure Functions**: Test pure functions with various inputs
- **Custom Hooks**: Test custom hooks with React Testing Library
- **State Management**: Test Zustand stores with isolated state

### Integration Testing
- **Component Integration**: Test component interactions
- **User Flows**: Test complete user journeys
- **Error Scenarios**: Test error handling and edge cases

### Test Organization
- **Test Files**: Co-locate test files with source files
- **Test Naming**: Use descriptive test names that explain the scenario
- **Test Data**: Use consistent test data and fixtures

## Documentation Standards

### Code Comments
- **Complex Logic**: Comment complex algorithms and business logic
- **API Contracts**: Document function parameters and return values
- **TODOs**: Use TODO comments for future improvements

### JSDoc
- **Public APIs**: Use JSDoc for public functions and components
- **Type Information**: Include type information in JSDoc comments
- **Examples**: Provide usage examples for complex APIs

```typescript
/**
 * Simulates a single step in the maze
 * @param maze - The maze data structure
 * @param from - Starting position
 * @param dir - Direction to move
 * @returns Result of the simulation step
 */
export function simulate(maze: MazeData, from: Cell, dir: Dir): SimStepResult {
  // Implementation
}
```

## Git Standards

### Commit Messages
- **Conventional Commits**: Use conventional commit format
- **Descriptive**: Write clear, descriptive commit messages
- **Scope**: Include affected area in commit message

### Branch Naming
- **Feature Branches**: `feature/description`
- **Bug Fixes**: `fix/description`
- **Hotfixes**: `hotfix/description`

## Code Review Standards

### Review Checklist
- [ ] Code follows TypeScript standards
- [ ] Components follow React patterns
- [ ] Error handling is implemented
- [ ] Accessibility requirements are met
- [ ] Performance considerations are addressed
- [ ] Tests are included for new functionality
- [ ] Documentation is updated

### Review Process
- **Self-Review**: Review your own code before submitting
- **Peer Review**: Have at least one peer review changes
- **Automated Checks**: Ensure all linting and type checks pass

## Tools and Configuration

### ESLint
- **Configuration**: Uses Next.js recommended rules
- **Custom Rules**: Minimal custom rules for project-specific needs
- **Integration**: Integrated with IDE and CI/CD

### Prettier
- **Formatting**: Consistent code formatting across the project
- **Integration**: Integrated with ESLint and IDE

### TypeScript
- **Strict Mode**: Enabled for better type safety
- **Path Mapping**: Configured for clean imports
- **Incremental Compilation**: Enabled for faster builds

## Future Considerations

### Scalability
- **Component Library**: Consider building a component library for reuse
- **State Management**: Plan for state management scaling with more features
- **Performance**: Monitor and optimize performance as the app grows

### Maintainability
- **Code Splitting**: Implement code splitting for better performance
- **Documentation**: Maintain comprehensive documentation
- **Testing**: Increase test coverage as the codebase grows

---

*This document should be updated as the project evolves and new patterns emerge.*
