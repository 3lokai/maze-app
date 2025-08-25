🎨 **Sally (UX)** chiming in — Epic 3 & 4 shift the app from “toy → edtech product.” Here’s what matters from my side:

---

## 🌱 Epic 3 (Parent Section & Landing Page)

### Landing Page

* Needs to **feel different** from the game: lighter typography, clear hierarchy. Parents should immediately understand *why this matters*.
* Hero = bold statement: *“Teach coding through play.”*
* Visual: maybe a screenshot of the maze + confetti, paired with a parent-friendly tagline.
* CTA buttons: *“Play Now”* (kid) vs *“Parent Section”* (adult). Clear split.

### Help Page

* Make it **child-facing**: large visuals, arrows, step-by-step flow. Minimal text, max illustrations. Think “board game instruction leaflet.”
* Use the same arrow tokens they’ll see in-game → cognitive consistency.

### Parents Section

* Tone = trust + pedagogy: “Sequencing → Loops → Checks → Problem-solving.”
* Include **benefits**: patience, logical thinking, resilience.
* CTA = “Track your child’s progress.” → flows to login/dashboard.

### Curriculum Overview (stubbed)

* Use **chapter cards** like “storybook covers.” Each card = concept, icon, short description.
* Lock future chapters with **“Coming Soon” ribbon** so parents see roadmap but kids don’t feel blocked.

---

## 🚀 Epic 4 (Curriculum / Chapters)

### Chapter Selection

* Replace today’s “map picker” with **chapter cards grid**: bright illustrations, badge slots, lock states.
* Card states:

  * ✅ Completed → confetti sticker + badge icons.
  * 🔒 Locked → greyed out + tooltip “Complete Sequencing first.”
  * 🟢 Available → big “Play” button.

### Session Wrapper

* Pre-game splash for each chapter: “In this chapter you’ll learn… \[Multipliers].”
* Post-game summary: “You unlocked \[Fast Thinker badge]!” → option to replay or continue.

### Badges & Rewards

* UX = sticker book. Kids drag badges into a “notebook page” metaphor. Keeps it tactile.
* Parents see the same badges in dashboard → consistency.

### Parent Dashboard (Curriculum View)

* Expand from “stats table” → progress bars + badges per chapter.
* Export button stays tucked top-right (not front and center). Parents love transparency, but UX should keep the focus on the child’s growth.

---

## 🎯 UX Themes Across Both Epics

1. **Two audiences:** Kids = playful, icons, minimal text. Parents = pedagogy, progress, reassurance. Keep split clean.
2. **Progress Feedback:** Every action must give micro-feedback (confetti, bounce, badge awarded).
3. **Consistency:** Arrows, tokens, maps → same visual language across help page, gameplay, and pedagogy explainer.
4. **Accessibility:** All new pages (Help, Parents, Curriculum) must hit Lighthouse a11y ≥95. Large buttons, aria labels, clear tab order.

---
🎨 **Sally (UX)** — here’s a **site map + wireframe-level navigation map** for Epics 3 & 4. Think of it as a bird’s-eye flow; no pixel detail yet, just structure.

---

# 🌐 Site Map (Epic 3 + 4)

```
/
├── Landing Page
│   ├── Hero ("Teach coding through play")
│   ├── CTA: [Play Now] → /chapters
│   └── CTA: [For Parents] → /parents
│
├── /help
│   ├── Step 1: Queue commands (arrow icons)
│   ├── Step 2: Press Run
│   ├── Step 3: Token moves
│   ├── Step 4: Confetti at goal
│   └── CTA: [Try a Map] → /chapters
│
├── /parents
│   ├── Why Coding Maze? (pedagogy)
│   ├── Concepts roadmap (Sequencing → Multipliers → Checks → Hazards)
│   ├── Benefits (focus, resilience, logic)
│   └── CTA: [View Progress] → /parent
│
├── /curriculum
│   ├── Chapter Cards (Sequencing, Multipliers, Checks, Hazards…)
│   ├── Status: Available, Completed, Coming Soon
│   └── CTA: [Play Chapter] → /play?chapter=id
│
├── /chapters   (child-facing entry)
│   ├── Grid of Chapter Cards (icons, lock states, badges earned)
│   └── CTA: [Play] → /play?chapter=id
│
├── /play?chapter=id
│   ├── Session Splash: “In this chapter you’ll learn X”
│   ├── Maze UI (already built, config-driven)
│   └── Post-Game Summary: badges earned + replay/continue
│
└── /parent
    ├── Settings Modal (Players tab, Game tab)
    ├── Stats (wins, crashes, steps/session vs cumulative)
    ├── Curriculum Progress (per chapter: badges + % done)
    └── Export JSON (download)
```

---

# 🖼️ Wireframe-Level Flow

**Landing →**

* Kid clicks “Play Now” → **Chapters grid**.
* Parent clicks “For Parents” → **Parents pedagogy page**.

**Chapters →**

* Child sees cards:

  * ✅ Completed (colorful, sticker overlay).
  * 🔒 Locked (grey).
  * 🟢 Available (CTA Play).
* Clicking card → **Session splash** → Maze → Summary.

**Parents →**

* Curriculum overview (concept roadmap).
* CTA → **Dashboard**: stats, badges, settings.

**Help →**

* 4-step tutorial with icons.
* CTA → “Try it” → **Chapters**.

---

# 🎯 UX Notes

* **Clear bifurcation:** kid paths (Play Now, Help) vs parent paths (For Parents, Dashboard).
* **Curriculum cards** serve both: child picks chapters, parent sees roadmap.
* **Consistency:** use same icons across Help, Parents roadmap, Curriculum cards.

---
