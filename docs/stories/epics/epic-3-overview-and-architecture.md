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

## 🔧 Implementation Order

1. **Story 7** (Storage Abstraction) → **Story 1** (Landing) → **Story 2** (Help)
2. **Story 3** (Parents) → **Story 5** (JSON Stub) → **Story 4** (Curriculum)  
3. **Story 8** (Settings Modal) → **Story 6** (Dashboard Hook)

---

## 📐 Architecture Changes

* **Multi-route application**: Next.js app router with 5 main routes
* **Storage layer**: Abstracted interface enabling Epic 4 cloud sync
* **Component organization**: Site components separate from game components
* **Type system**: Extended for curriculum, settings, and parent data
* **Data flow**: Parent dashboard connects game stats with curriculum progress

---

## 📚 Related Documents

* [Epic 3 - User-Facing Pages](./epic-3-user-facing-pages.md) - Stories 1-4
* [Epic 3 - Technical Infrastructure](./epic-3-technical-infrastructure.md) - Stories 5-7  
* [Epic 3 - Settings & Polish](./epic-3-settings-and-polish.md) - Story 8
