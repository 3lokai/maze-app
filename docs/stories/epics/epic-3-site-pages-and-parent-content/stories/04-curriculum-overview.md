# Story 4 — Curriculum Overview Page (M)

**As a** parent  
**I want** to see the roadmap of coding concepts  
**So that** I know what my child will learn next.

## Acceptance Criteria

* `/curriculum` route with chapter cards timeline
* 4-5 chapter cards: Sequencing → Multipliers → Checks → Hazards → Advanced
* Each card shows: concept icon, skills learned, difficulty level
* "Coming Soon" badges for unimplemented chapters

## Demo

Open `/curriculum` → cards show learning progression with status.

## Implementation Notes

- Medium complexity story
- Part of the second implementation phase
- Requires Story 5 (Curriculum JSON Stub) to be completed first
- Uses JSON-driven data for flexibility
- Prepare for Story 6 (Parent Dashboard Hook) integration

## 📚 References

- [Epic 3 & 4 UX Specs](../../../../frontend-specs/eic-3&4.md) - Curriculum page design requirements
- [Epic 3 & 4 Architecture Delta](../../../../architecture/epic3&4-delta.md) - Curriculum schema and data models
- [Visual System](../../../../frontend-specs/3-visual-system.md) - Design tokens and styling
- [Component Responsibilities](../../../../architecture/2-components-responsibilities.md) - CurriculumPage component spec
