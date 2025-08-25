# 📋 Epic 4 — Stories (Curriculum / Chapters)

### 1) Curriculum Data Model & Loader (S)

**As a** dev
**I want** a typed loader for `curriculum.json`
**So that** UI and game can read chapters safely.

* **AC:** Types for `Chapter {id, title, concept, status, maps[], featuresAllowed[], prereq?:id[]}`.
* **AC:** Loader validates schema; unknown fields ignored.
* **Demo:** Edit JSON → `/curriculum` reflects changes without code.

---

### 2) Chapter Select Screen (S)

**As a** parent/child
**I want** a chapter grid to start a session
**So that** I can pick what to learn.

* **AC:** `/chapters` shows cards: title, concept icon, status (Locked/Available/Done).
* **AC:** “Play” CTA on available/done; locked cards disabled with tooltip “Complete X first”.
* **Demo:** Navigate to `/chapters` → choose “Sequencing”.

---

### 3) Gate & Unlock Logic (S)

**As a** learner
**I want** chapters to unlock in order
**So that** difficulty/concepts ramp correctly.

* **AC:** Prereqs enforced from curriculum model.
* **AC:** Completion state computed from progress store.
* **Demo:** Mark Chapter 1 complete → Chapter 2 becomes Available.

---

### 4) Session Wrapper (Chapter Runtime) (M)

**As a** dev
**I want** a wrapper that configures the game per chapter
**So that** features/maps match the lesson.

* **AC:** `/play?chapter=id` injects: map(s) list, allowed features (e.g., multipliers on/off, checks on/off), success criteria (reach goal ≤ N steps?).
* **AC:** On win, wrapper posts a `SessionResult` to progress store.
* **Demo:** Launch a chapter → features match spec; completion recorded on finish.

---

### 5) Progress Tracking (Local) (S)

**As a** parent
**I want** to see which chapters are done
**So that** I can track learning.

* **AC:** Local store keeps per-chapter: attempts, wins, best steps/time, last played map.
* **AC:** Chapter cards show badges: Not Started / In Progress / Completed.
* **Demo:** Win Chapter 1 → card shows Completed + best steps.

---

### 6) Supabase Integration + Auth (M)

**As a** parent
**I want** progress to sync across devices
**So that** learning continues anywhere.

* **AC:** Magic-link auth; tables: `profiles`, `players`, `progress`, `sessions`.
* **AC:** Storage provider switches local↔cloud seamlessly; offline uses local and reconciles on login.
* **Demo:** Log in on laptop → progress appears; open on tablet → same chapters unlocked.

---

### 7) Badges & Rewards (S)

**As a** child
**I want** stickers/badges when I succeed
**So that** I feel proud and replay.

* **AC:** Badge types: “Path Finder” (first clear), “Fast Thinker” (≤ target steps), “Loop Learner” (multipliers chapter), “Bug Buster” (no crashes).
* **AC:** Badges visible on chapter card and in a simple “Sticker Book”.
* **Demo:** Clear with ≤ target → “Fast Thinker” appears.

---

### 8) Checks Chapter (Scoped Mechanic Intro) (M)

**As a** learner
**I want** a chapter that teaches **check**
**So that** I can handle hurdles logically.

* **AC (scope-safe):** Enable a **single `CHECK` tile** mechanic: when a `check` command runs at that tile, it passes; otherwise toast “Try a check here”.
* **AC:** Only available inside “Checks 101” chapter; executor plugin stays simple (no full conditionals yet).
* **Demo:** Run without `check` → fail toast; add `check` token → success.

---

### 9) Parent Dashboard: Curriculum View (S)

**As a** parent
**I want** progress by chapter
**So that** I understand learning outcomes.

* **AC:** Table/cards: Completed/Attempts/Best steps/time/Badges per chapter.
* **AC:** Export JSON (current player or all).
* **Demo:** `/parent` shows curriculum progress; export downloads file.

---

### 10) Resume & Deep Links (XS)

**As a** learner
**I want** to resume where I left off
**So that** I can continue quickly.

* **AC:** “Continue” button on landing goes to last `chapterId` + last map.
* **AC:** `/play?chapter=…` deep link starts configured session.
* **Demo:** Click Continue → launches last chapter/map reliably.

---

### 11) Telemetry (Minimal) (XS)

**As a** team
**I want** anonymous event pings
**So that** we can tune difficulty.

* **AC:** Client logs: chapter start, finish, result (win/crash), steps, duration.
* **AC:** Stored locally and, if logged in, in Supabase `sessions`.
* **Demo:** Play a chapter → events recorded; visible in dashboard counts.

---

### 12) QA & A11y Gate (XS)

**As a** QA
**I want** a single checklist
**So that** we sign off consistently.

* **AC:** Keyboard flow on `/chapters`; focus rings; SR labels on badges; Lighthouse A11y ≥95 on `/chapters` and `/play?chapter=…`.
* **Demo:** Run checklist → pass.

---

## 🔧 Recommended Build Order

1. **1 Data Model & Loader** → **2 Chapter Select** → **3 Gate/Unlock**
2. **4 Session Wrapper** → **5 Progress (local)**
3. **7 Badges** → **10 Resume/Deep Links**
4. **8 Checks Chapter (scoped)**
5. **6 Supabase Integration** → **9 Dashboard view**
6. **11 Telemetry** → **12 QA/A11y**

---
