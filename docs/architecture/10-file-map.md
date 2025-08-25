# 10) File Map

## Current Structure (Epic 1 & 2 Complete)

### Core Components
- `src/components/MazeRenderer.tsx` - Dynamic maze rendering (1-4 players, up to 20×20 grids)
- `src/components/TurnCard.tsx` - Dynamic turn indicator and scoreboard
- `src/components/CommandBuilder.tsx` - Player-specific command building
- `src/components/GameHUD.tsx` - Dynamic stats display (1-4 players)
- `src/components/PlayerManagement.tsx` - Player settings interface
- `src/components/SettingsDropdown.tsx` - Enhanced settings with player management
- `src/components/MapPicker.tsx` - Multi-map selection interface

### State Management
- `src/store/gameStore.ts` - Dynamic player state management with Zustand
- `src/types/maze-app.d.ts` - Player configuration and game state types

### Utilities
- `src/lib/player-management.ts` - Player configuration utilities
- `src/lib/maze.ts` - Maze data, compilation, and map catalog
- `src/lib/executor.ts` - Command execution engine (performance optimized)
- `src/lib/viewport.ts` - Viewport management and follow-cam logic

### Hooks
- `src/hooks/usePlayerManagement.ts` - Player management logic
- `src/hooks/useTurnManagement.ts` - Dynamic turn management
- `src/hooks/useViewport.ts` - Viewport state and follow-cam control

## Upcoming Epic Additions

### Epic 4a - Game UI Alignment
- Enhanced existing components with new styling system
- `src/styles/game-theme.css` - Child-friendly theming system
- Updated component styling to match site design system

### Epic 3 - Site Pages & Parent Content
```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── help/page.tsx         # Illustrated walkthrough
│   ├── parents/page.tsx      # Pedagogy content
│   ├── parent/page.tsx       # Parent dashboard
│   └── curriculum/page.tsx   # Chapter overview (stub)
├── components/site/
│   ├── LandingPage.tsx       # Hero with CTAs
│   ├── HelpPage.tsx          # Step-by-step tutorial
│   ├── ParentsPage.tsx       # Educational benefits
│   ├── ParentDashboard.tsx   # Stats & export
│   └── SettingsModal.tsx     # Tabbed settings
├── lib/
│   ├── storage.ts            # Storage abstraction
│   └── curriculum.ts         # Curriculum stub loader
```

### Epic 4 - Curriculum System
```
src/
├── app/
│   ├── chapters/page.tsx     # Chapter selection
│   └── play/page.tsx         # Enhanced with chapter mode
├── components/curriculum/
│   ├── ChapterSelectPage.tsx # Interactive chapter grid
│   ├── SessionWrapper.tsx    # Chapter-specific config
│   ├── BadgeBook.tsx         # Achievement display
│   └── ProgressTracker.tsx   # Completion tracking
├── lib/
│   ├── curriculum.ts         # Chapter loading & validation
│   ├── progress.ts           # Progress tracking
│   ├── badges.ts             # Achievement system
│   └── supabase.ts           # Cloud storage provider
├── types/
│   ├── curriculum.d.ts       # Chapter & progress types
│   └── auth.d.ts             # Authentication types
```

