# 📋 Epic 3 — Site Pages & Parent Content

---

## 📖 Overview

Transform the single-page game into a complete educational website with parent-facing content and curriculum overview. This epic establishes the foundation for the learning platform while preparing architecture for Epic 4.

---

## 🎯 Epic Success Criteria

* Complete website experience: Landing → Help → Parents → Curriculum → Game
* Parent confidence: Clear educational value and progress visibility
* Technical foundation: Storage abstraction ready for Epic 4 auth
* Curriculum pipeline: JSON-driven system ready for real chapters
* Professional polish: Cohesive design system across all pages

---

## 📐 Architecture Changes

* **Multi-route application**: Next.js app router with 5 main routes
* **Storage layer**: Abstracted interface enabling Epic 4 cloud sync
* **Component organization**: Site components separate from game components
* **Type system**: Extended for curriculum, settings, and parent data
* **Data flow**: Parent dashboard connects game stats with curriculum progress

## 📚 Reference Documents

### Architecture
- [Epic 3 & 4 Architecture Delta](../../../architecture/epic3&4-delta.md) - Technical implementation details
- [Component Responsibilities](../../../architecture/2-components-responsibilities.md) - Epic 3 component specifications
- [Coding Standards](../../../architecture/coding-standards.md) - Development guidelines

### Frontend Specifications
- [Epic 3 & 4 UX Specifications](../../../frontend-specs/eic-3&4.md) - Design and UX requirements
- [Visual System](../../../frontend-specs/3-visual-system.md) - Design tokens and styling
- [Accessibility Guidelines](../../../frontend-specs/6-accessibility.md) - A11y requirements
- [Responsive Rules](../../../frontend-specs/7-responsive-rules.md) - Mobile-first design

---

## 🔧 Implementation Order

1. **Story 0** (Common Header & Footer) → **Story 7** (Storage Abstraction) → **Story 1** (Landing) → **Story 2** (Help)
2. **Story 3** (Parents) → **Story 5** (JSON Stub) → **Story 4** (Curriculum)  
3. **Story 8** (Settings Modal) → **Story 6** (Dashboard Hook)

---

## 📚 Story Documents

### Foundation Components
- [Story 0 — Common Header & Footer Components](stories/00-common-header.md)

### Core Site Pages
- [Story 1 — Landing Page](stories/01-landing-page.md)
- [Story 2 — Help Page](stories/02-help-page.md)
- [Story 3 — Parents Pedagogy Section](stories/03-parents-pedagogy.md)
- [Story 4 — Curriculum Overview Page](stories/04-curriculum-overview.md)

### Technical Foundation
- [Story 5 — Curriculum JSON Stub](stories/05-curriculum-json-stub.md)
- [Story 7 — Storage Abstraction](stories/07-storage-abstraction.md)

### Enhanced Features
- [Story 6 — Parent Dashboard Hook](stories/06-parent-dashboard-hook.md)
- [Story 8 — Enhanced Settings Modal](stories/08-enhanced-settings-modal.md)
