# Story 8 — Enhanced Settings Modal (M)

**As a** parent  
**I want** comprehensive settings with tabs  
**So that** I can manage players and game preferences.

## Acceptance Criteria

* Tabbed modal: "Players" tab (existing) + "Game" tab (new)
* Game tab: theme selection, reduced motion, default map, reset options
* Players tab: enhanced player management with better UX
* Export/Import settings and data

## Demo

Settings → tabs work, game preferences persist, export downloads JSON.

## Implementation Notes

- Medium complexity story
- Part of the third implementation phase
- Builds on existing settings functionality
- Focus on UX improvements and data management
- Prepare for Story 6 (Parent Dashboard Hook) integration

## 📚 References

- [Epic 3 & 4 UX Specs](../../../../frontend-specs/eic-3&4.md) - Settings modal design requirements
- [Epic 3 & 4 Architecture Delta](../../../../architecture/epic3&4-delta.md) - Settings data models
- [Visual System](../../../../frontend-specs/3-visual-system.md) - Design tokens and styling
- [Component Responsibilities](../../../../architecture/2-components-responsibilities.md) - SettingsModal component spec
