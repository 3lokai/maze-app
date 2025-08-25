🏗️ Winston (Architect) here — let’s capture **architecture deltas** for both Epics 3 & 4 so your docs stay ahead of dev. I’ll keep it module-level, additive, and align to your existing arch baseline.

---

# ⚙️ Epic 3 — Parent Section & Landing Page (Architecture Delta)

### 1. New Routes

* `/` → Landing page (Next.js static, no state).
* `/help` → Illustrated walkthrough.
* `/parents` → Pedagogy & “Why coding maze?” content.
* `/curriculum` → Curriculum overview cards (stubbed for Epic 3).
* `/parent` → Dashboard (stats, settings, export).

---

### 2. Storage Abstraction

```ts
// src/lib/storage.ts
export interface StorageProvider {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
}
```

* Default: LocalStorageProvider (namespace `coding-maze/v1`).
* Future: SupabaseProvider implements same contract.
* **Migration-safe:** keys: `players`, `settings`, `stats`, `progress`.

---

### 3. Data Models (extended)

```ts
type ParentSettings = {
  theme: 'default' | 'hc' | 'soft';
  reducedMotion: boolean;
  defaultMapId?: string;
};

type Player = {
  id: string;
  name: string;
  emoji: string;
  stats: { wins: number; crashes: number; steps: number };
};

type Stats = {
  session: Record<string, number>;   // resets with Reset
  cumulative: Record<string, number>; // persists
};
```

---

### 4. Components

* **SettingsModal**: Tabs → Players (manage array), Game (theme, reducedMotion, reset).
* **ParentDashboard**: reads stats from StorageProvider; displays table + export JSON.
* **CurriculumPage**: stub, loads `curriculum.json` and renders cards (status = Coming Soon).

---

### 5. Security/Access

* No auth yet. Parent routes not gated, but messaging clear (kids don’t need to use them).

---

# ⚙️ Epic 4 — Chapter Selection & Curriculum Mode (Architecture Delta)

### 1. Curriculum Schema

```ts
type Chapter = {
  id: string;
  title: string;
  concept: 'sequencing' | 'multipliers' | 'checks' | 'hazards';
  description: string;
  maps: string[];                 // ids of layouts
  featuresAllowed: string[];      // e.g. ['multipliers','check']
  prereq?: string[];              // chapter ids
  status: 'locked' | 'available' | 'completed' | 'comingSoon';
};
```

* Stored in `curriculum.json`.
* Loader validates schema, returns `Chapter[]`.

---

### 2. Session Wrapper

```ts
type SessionConfig = {
  chapterId: string;
  maps: MazeData[];
  allowedFeatures: string[];
  successCriteria?: { maxSteps?: number; requireCheck?: boolean };
};

type SessionResult = {
  chapterId: string;
  playerId: string;
  steps: number;
  crashes: number;
  durationMs: number;
  completed: boolean;
  badges: string[];
};
```

* Wrapper injects config into Maze runtime.
* Posts SessionResult to StorageProvider on end.

---

### 3. Progress Store

```ts
type ChapterProgress = {
  attempts: number;
  wins: number;
  bestSteps?: number;
  lastPlayedMap?: string;
  badges: string[];
};

type Progress = Record<string, ChapterProgress>; // keyed by chapterId
```

* Stored in local provider (Epic 4a).
* Synced to Supabase when logged in (Epic 4b).

---

### 4. Supabase Schema (for Epic 4)

Tables:

* `profiles (id, email, created_at)`
* `players (id, profile_id, name, emoji)`
* `settings (id, profile_id, theme, reduced_motion, default_map)`
* `progress (id, profile_id, chapter_id, attempts, wins, best_steps, last_played_map, badges jsonb)`
* `sessions (id, profile_id, chapter_id, steps, crashes, duration_ms, completed, created_at)`

---

### 5. Executor Extensions

* **Feature gating**: Executor checks `allowedFeatures` array.
* **Check command plugin**:

  * Adds new token type: `{ type: 'check' }`.
  * On run: if current cell has `hazard: 'check'` and token present → ok.
  * If hazard present and no `check` → fail toast.
  * Outside Checks chapter → executor rejects adding `check` token.

---

### 6. UI Contracts

* **ChapterSelectPage**: renders curriculum cards (from JSON), state from Progress.
* **PlayPage (chapter mode)**: configures MazeRenderer + Controls with allowedFeatures.
* **BadgeBook**: simple component showing earned stickers.
* **ParentDashboard**: extended to show curriculum progress + export.

---

### 7. Telemetry

* Client logs: `chapter_start`, `chapter_finish`, `chapter_result`.
* Stored local + synced to `sessions` table.

---

### 8. Risks / Mitigations

* **Migration pain**: solved by abstraction (StorageProvider).
* **Checks mechanic complexity**: keep scoped to one “check tile” chapter initially.
* **Data bloat**: `sessions` table may grow; prune via retention policy later.

---

✅ With this, Epic 3 & 4 architecture is documented:

* **Epic 3** = parent/landing/pages + storage abstraction.
* **Epic 4** = curriculum schema, session wrapper, progress model, Supabase integration, check command.

---

## 🎯 Implementation Priority & Dependencies

### Epic 4a Prerequisites (Critical Path)
Before implementing Epic 3 & 4, **Epic 4a (Game UI Alignment)** must be completed to ensure visual consistency:

1. **Header Alignment** - Establish design system consistency
2. **Controls Simplification** - Child-friendly interface foundation  
3. **Visual Theming** - Brand palette and component styling
4. **Debug Removal** - Production-ready polish
5. **Record Panel Redesign** - Icon-based stats display

### Epic 3 → Epic 4 Dependency Chain
- **Epic 3** establishes storage abstraction and parent-facing content
- **Epic 4** builds on storage layer for curriculum and progress tracking
- **Supabase integration** in Epic 4 extends storage abstraction from Epic 3

### Architecture Migration Path
```ts
// Phase 1: Epic 3 Storage Abstraction
interface StorageProvider {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
}

// Phase 2: Epic 4 Progress Extension
interface ProgressProvider extends StorageProvider {
  getProgress(playerId: string): Progress;
  saveSession(result: SessionResult): void;
}

// Phase 3: Epic 4 Cloud Sync
interface CloudProvider extends ProgressProvider {
  sync(): Promise<void>;
  authenticate(email: string): Promise<void>;
}
```

---

👉 **Ready for implementation**: Architecture supports clean migration from local-only (Epic 3) → local+cloud (Epic 4) with zero breaking changes to game logic.
