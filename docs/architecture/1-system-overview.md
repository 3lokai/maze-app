# 1) System Overview

## Current State (Epic 1 & 2 Complete)
* **Client-only** Next.js 15 (App Router) + React 19 + Tailwind.
* **Local state only**: No SSR, no APIs, localStorage for persistence.
* **Multi-page application**: Game (`/play`) + upcoming site pages.
* **Flexible Player System**: Supports 1-4 players with personalization (names, emojis, colors).
* **Multi-Map System**: Multiple maze layouts with catalog, preview, and validation (up to 20×20).
* **Responsive Viewport**: Aspect-ratio locked cells with follow-cam for larger maps.
* **Performance Optimized**: 60fps rendering with DOM-first approach.
* **Accessibility Complete**: High contrast, reduced motion, keyboard navigation.

## Upcoming Epic Changes

### Epic 4a - Game UI Alignment (Next Priority)
* **Visual Consistency**: Align game header/controls with site design system
* **Child-Friendly Interface**: Large arrow icons, colorful number pills
* **Production Polish**: Remove debug overlays and dev-only elements
* **Theming Integration**: Soft glowing trails, playful styling

### Epic 3 - Site Architecture Expansion
* **Multi-route application**: `/`, `/help`, `/parents`, `/parent`, `/curriculum`
* **Storage abstraction**: `StorageProvider` interface for local→cloud migration
* **Settings modal**: Tabbed interface with player and game configuration
* **Parent dashboard**: Statistics export and progress monitoring

### Epic 4 - Curriculum Platform
* **Authentication**: Supabase integration with magic-link auth
* **Chapter system**: JSON-driven curriculum with feature gating
* **Progress tracking**: Badge system with local and cloud sync
* **Session wrapper**: Chapter-specific game configuration

