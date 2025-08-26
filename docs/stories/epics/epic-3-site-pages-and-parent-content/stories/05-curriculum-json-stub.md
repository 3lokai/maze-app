# Story 5 — Curriculum JSON Stub (S)

**As a** developer  
**I want** a structured curriculum data file  
**So that** I can bind UI now and game logic later.

## Acceptance Criteria

* `curriculum.json` with schema: `{id, title, concept, description, status, skills[]}`
* Curriculum page renders from JSON automatically
* Status values: `available`, `comingSoon`, `locked`
* Validation and TypeScript types

## Demo

Edit JSON → curriculum page reflects changes instantly.

## Implementation Notes

- Small complexity story
- Part of the second implementation phase
- Foundation for Stories 3, 4, and 6
- Focus on data structure and validation
- Prepare for Epic 4 integration

## 📚 References

- [Epic 3 & 4 Architecture Delta](../../../../architecture/epic3&4-delta.md) - Curriculum schema and data models
- [Coding Standards](../../../../architecture/coding-standards.md) - TypeScript and validation guidelines
- [Component Responsibilities](../../../../architecture/2-components-responsibilities.md) - Data loading patterns
