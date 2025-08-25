# 📋 Epic 3 — Site Pages & Parent Content

---

## 📖 Overview

Transform the single-page game into a complete educational website with parent-facing content and curriculum overview. This epic establishes the foundation for the learning platform while preparing architecture for Epic 4.

---

## Stories

### **Story 1 — Landing Page (S)**

**As a** new visitor  
**I want** a clear landing page explaining the game  
**So that** I understand the purpose and can choose my path.

* **AC:**
  * `/` route with hero section: "Teach coding through play"
  * Clear split CTAs: "Play Now" (children) vs "For Parents" (adults)
  * Screenshot of game + confetti paired with benefits copy
  * Mobile responsive with accessible navigation
* **Demo:** Visit `/` → see hero, click "Play Now" → go to game, click "For Parents" → pedagogy page.

---

### **Story 2 — Help Page (S)**

**As a** new parent/child  
**I want** a Help/How It Works page  
**So that** I can quickly understand the game mechanics.

* **AC:**
  * `/help` route with illustrated step-by-step walkthrough
  * 4 steps max: "Queue moves → Run → Reach goal → Confetti"
  * Child-friendly visuals with same arrow tokens from game
  * Next/Back navigation with "Try It" CTA to game
* **Demo:** Click Help → see illustrated walkthrough with clear navigation.

---

### **Story 3 — Parents Pedagogy Section (M)**

**As a** parent  
**I want** a Parents page explaining pedagogy  
**So that** I understand why this is coding, not "just a game."

* **AC:**
  * `/parents` route with educational benefits sections
  * Content: "Why Coding Maze?", "Thinking in Steps", "Building Resilience"
  * Clear benefits: sequencing, logical thinking, error recovery, persistence
  * CTA: "Track your child's progress" → Parent Dashboard
* **Demo:** Visit `/parents` → scroll pedagogy sections, CTA leads to dashboard.

---

### **Story 4 — Curriculum Overview Page (M)**

**As a** parent  
**I want** to see the roadmap of coding concepts  
**So that** I know what my child will learn next.

* **AC:**
  * `/curriculum` route with chapter cards timeline
  * 4-5 chapter cards: Sequencing → Multipliers → Checks → Hazards → Advanced
  * Each card shows: concept icon, skills learned, difficulty level
  * "Coming Soon" badges for unimplemented chapters
* **Demo:** Open `/curriculum` → cards show learning progression with status.

---

### **Story 5 — Curriculum JSON Stub (S)**

**As a** developer  
**I want** a structured curriculum data file  
**So that** I can bind UI now and game logic later.

* **AC:**
  * `curriculum.json` with schema: `{id, title, concept, description, status, skills[]}`
  * Curriculum page renders from JSON automatically
  * Status values: `available`, `comingSoon`, `locked`
  * Validation and TypeScript types
* **Demo:** Edit JSON → curriculum page reflects changes instantly.

---

### **Story 6 — Parent Dashboard Hook (S)**

**As a** parent  
**I want** connection between Curriculum and Parent Dashboard  
**So that** I see child progress against chapters.

* **AC:**
  * Curriculum cards show progress badges: Not Started/In Progress/Completed
  * Parent Dashboard shows curriculum progress section
  * Uses placeholder progress data (Epic 4 will add real tracking)
  * Export includes curriculum progress
* **Demo:** Dashboard shows "Chapter 1: Completed", curriculum cards reflect status.

---

### **Story 7 — Storage Abstraction (M)**

**As a** developer  
**I want** storage abstraction for future cloud sync  
**So that** Epic 4 can add authentication without rework.

* **AC:**
  * `StorageProvider` interface with `get/set/remove/clear` methods
  * `LocalStorageProvider` implements interface with namespace `coding-maze/v1`
  * Migration-safe keys: `players`, `settings`, `stats`, `progress`
  * Game components use abstraction, not direct localStorage
* **Demo:** Settings persist, game works same, ready for cloud provider swap.

---

### **Story 8 — Enhanced Settings Modal (M)**

**As a** parent  
**I want** comprehensive settings with tabs  
**So that** I can manage players and game preferences.

* **AC:**
  * Tabbed modal: "Players" tab (existing) + "Game" tab (new)
  * Game tab: theme selection, reduced motion, default map, reset options
  * Players tab: enhanced player management with better UX
  * Export/Import settings and data
* **Demo:** Settings → tabs work, game preferences persist, export downloads JSON.

---

## 🔧 Implementation Order

1. **Story 7** (Storage Abstraction) → **Story 1** (Landing) → **Story 2** (Help)
2. **Story 3** (Parents) → **Story 5** (JSON Stub) → **Story 4** (Curriculum)  
3. **Story 8** (Settings Modal) → **Story 6** (Dashboard Hook)

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

