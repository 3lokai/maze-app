# Component Organization & File Structure

## Overview

This document defines the component organization strategy for the Maze App, designed to scale cleanly from the current game-only implementation through Epic 3 (site pages) and Epic 4 (curriculum system).

## Current State vs Target Structure

### Before (Epic 1 & 2 - All Mixed)
```
src/components/
├── ui/                    # shadcn/ui primitives
├── magicui/              # Third-party UI components  
├── [25 game components]   # All mixed together
```

### After (Epic 3 & 4 Ready)
```
src/components/
├── ui/                    # shadcn/ui primitives (unchanged)
├── magicui/              # Third-party UI components (unchanged)
├── game/                 # Core gameplay components
├── site/                 # Marketing/informational pages
├── curriculum/           # Learning/chapter system
├── settings/             # Configuration & management
└── dashboard/            # Parent/admin interfaces
```

## Detailed Organization Structure

### 🎮 `game/` - Core Gameplay Components
Components that directly implement game mechanics and rendering.

```
src/components/game/
├── maze/
│   ├── MazeRenderer.tsx           # Core maze grid rendering
│   ├── PlayerToken.tsx            # Player avatar/token display
│   ├── MazeLegend.tsx            # Start/goal labels and overlays
│   └── MapPreview.tsx            # Thumbnail maze previews
├── controls/
│   ├── CommandBuilder.tsx        # Main command building interface
│   ├── CommandQueue.tsx          # Command sequence display
│   ├── DirectionButtons.tsx      # Arrow direction inputs
│   └── NumberPad.tsx             # Step number inputs (1-10)
├── feedback/
│   ├── Celebration.tsx           # Win animations and confetti
│   ├── CollisionFeedback.tsx     # Wall bump animations
│   └── GameAnnouncement.tsx      # Turn/status announcements
├── layout/
│   ├── Header.tsx                # Game header (Play Again, Settings, Stats)
│   ├── GameRail.tsx              # Right sidebar layout container
│   └── PerformanceMonitor.tsx    # Debug performance overlay
└── maps/
    ├── MapPicker.tsx             # Map selection interface
    └── MapSelector.tsx           # Map dropdown/grid selector
```

### 🌐 `site/` - Marketing & Informational Pages
Components for public-facing website content (Epic 3).

```
src/components/site/
├── LandingPage.tsx               # Hero page with "Play Now" / "For Parents"
├── HelpPage.tsx                  # Illustrated game walkthrough  
├── ParentsPage.tsx               # Educational pedagogy content
├── CurriculumPage.tsx            # Chapter roadmap overview
└── shared/
    ├── SiteHeader.tsx            # Site navigation header
    ├── SiteFooter.tsx            # Site footer with links
    └── CTASection.tsx            # Reusable call-to-action blocks
```

### 📚 `curriculum/` - Learning & Chapter System
Components for structured learning progression (Epic 4).

```
src/components/curriculum/
├── ChapterSelectPage.tsx         # Interactive chapter grid with badges
├── SessionWrapper.tsx            # Chapter-specific game configuration
├── BadgeBook.tsx                 # Achievement display (sticker book metaphor)
├── ProgressTracker.tsx           # Chapter completion tracking
├── ChapterCard.tsx               # Individual chapter display card
└── UnlockAnimation.tsx           # Chapter unlock celebration
```

### ⚙️ `settings/` - Configuration & Management
Components for user preferences and player management.

```
src/components/settings/
├── SettingsModal.tsx             # Main tabbed settings interface
├── PlayerManagement.tsx          # Player add/edit/remove interface
├── AccessibilitySettings.tsx     # A11y preferences component
├── tabs/
│   ├── PlayersTab.tsx            # Player management tab content
│   ├── AccessibilityTab.tsx      # Accessibility settings tab
│   ├── ThemesTab.tsx             # Visual theme selection tab
│   └── GameTab.tsx               # Game preferences tab (Epic 3)
└── EmojiPicker.tsx               # Player emoji selection
```

### 📊 `dashboard/` - Parent & Admin Interfaces
Components for monitoring, statistics, and administration.

```
src/components/dashboard/
├── StatsDrawer.tsx               # Game statistics display
├── StatsDrawerWrapper.tsx        # Stats drawer layout container
├── ParentDashboard.tsx           # Parent progress monitoring (Epic 3)
├── ExportControls.tsx            # Data export interface (Epic 3)
├── ProgressSummary.tsx           # Curriculum progress overview (Epic 4)
└── charts/
    ├── ProgressChart.tsx         # Visual progress charts
    └── StatsVisualization.tsx    # Game statistics graphs
```

## Import Path Strategy

### Clear Component Purpose
```typescript
// Game components - clearly game-related
import { MazeRenderer } from '@/components/game/maze/MazeRenderer'
import { CommandBuilder } from '@/components/game/controls/CommandBuilder'

// Site components - clearly public-facing
import { LandingPage } from '@/components/site/LandingPage'
import { HelpPage } from '@/components/site/HelpPage'

// Curriculum components - clearly educational
import { ChapterSelectPage } from '@/components/curriculum/ChapterSelectPage'
import { BadgeBook } from '@/components/curriculum/BadgeBook'

// Settings components - clearly configuration
import { SettingsModal } from '@/components/settings/SettingsModal'
import { PlayerManagement } from '@/components/settings/PlayerManagement'

// Dashboard components - clearly analytics/admin
import { StatsDrawer } from '@/components/dashboard/StatsDrawer'
import { ParentDashboard } from '@/components/dashboard/ParentDashboard'
```

### Barrel Exports
Each folder includes an `index.ts` file for clean imports:

```typescript
// src/components/game/index.ts
export * from './maze'
export * from './controls'  
export * from './feedback'
export * from './layout'
export * from './maps'

// Usage
import { MazeRenderer, CommandBuilder, Celebration } from '@/components/game'
```

## Migration Strategy

### Phase 1: Epic 4a Preparation (Immediate)
1. **Create new folder structure** in `src/components/`
2. **Move existing components** to appropriate folders
3. **Update all import statements** throughout codebase
4. **Add barrel exports** (`index.ts` files)
5. **Test that game functionality** remains unchanged

### Phase 2: Epic 3 Implementation 
1. **Add `site/` components** for landing, help, parents pages
2. **Enhance `settings/` components** for parent dashboard  
3. **Add `dashboard/` components** for statistics and export

### Phase 3: Epic 4 Implementation
1. **Add `curriculum/` components** for chapter system
2. **Extend existing folders** with new educational features
3. **Add authentication** and cloud sync components

## Benefits

### 🧭 **Clear Navigation**
- Developers instantly know where to find components
- New team members can navigate codebase intuitively
- Component purpose is obvious from import path

### 📈 **Scalability**
- Each epic adds components to appropriate folders
- No mixing of game logic with site content
- Curriculum system has dedicated space to grow

### 🔧 **Maintainability**  
- Related components are grouped together
- Shared concerns (settings, dashboard) are centralized
- Easier to refactor within bounded contexts

### 🚀 **Development Efficiency**
- Faster component location and modification
- Reduced merge conflicts with clear ownership
- Better code review process with organized changes

### 🎯 **Architecture Alignment**
- Matches Epic 3 & 4 architectural boundaries
- Supports future features (analytics, admin tools)  
- Enables clean component reuse across contexts

## Rules & Guidelines

### Component Placement Rules
- **Game components**: Directly related to gameplay mechanics
- **Site components**: Public-facing, marketing, or informational  
- **Curriculum components**: Learning progression and educational features
- **Settings components**: Configuration that applies across contexts
- **Dashboard components**: Monitoring, statistics, and administration

### Shared Components
- **UI primitives**: Stay in `ui/` folder (buttons, inputs, etc.)
- **Third-party**: Stay in respective folders (`magicui/`, etc.)
- **Cross-cutting**: If used by 3+ different areas, consider `shared/` subfolder

### File Naming
- **PascalCase** for component files (`ComponentName.tsx`)
- **Descriptive names** that indicate purpose
- **Consistent suffixes** (`Page.tsx` for pages, `Modal.tsx` for modals)

This organization strategy provides a **clean, scalable foundation** for the educational platform evolution from Epic 2 through Epic 4 and beyond.