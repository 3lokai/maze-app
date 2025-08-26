# Story 1 — Landing Page (S)

**As a** new visitor  
**I want** a clear landing page explaining the game  
**So that** I understand the purpose and can choose my path.

## Acceptance Criteria

* `/` route with hero section: "Teach coding through play"
* Clear split CTAs: "Play Now" (children) vs "For Parents" (adults)
* Screenshot of game + confetti paired with benefits copy
* Mobile responsive with accessible navigation

## Demo

Visit `/` → see hero, click "Play Now" → go to game, click "For Parents" → pedagogy page.

## Implementation Notes

- This is the first story in the implementation order
- Requires Story 7 (Storage Abstraction) to be completed first
- Focus on clear value proposition and user journey
- Ensure accessibility compliance from the start

## 📚 References

- [Epic 3 & 4 UX Specs](../../../../frontend-specs/eic-3&4.md) - Landing page design requirements
- [Visual System](../../../../frontend-specs/3-visual-system.md) - Design tokens and styling
- [Accessibility Guidelines](../../../../frontend-specs/6-accessibility.md) - A11y compliance
- [Component Responsibilities](../../../../architecture/2-components-responsibilities.md) - LandingPage component spec

## Tasks

- [x] Create landing page component with hero section
- [x] Implement split CTAs: "Play Now" and "For Parents"
- [x] Add game screenshot with confetti animation
- [x] Create benefits copy section
- [x] Ensure mobile responsive design
- [x] Implement accessible navigation
- [x] Update routing to support landing page
- [x] Test accessibility compliance

## Dev Agent Record

### Agent Model Used
- James (Full Stack Developer)

### Debug Log References
- Landing page component creation
- Routing implementation
- Accessibility testing

### Completion Notes List
- Landing page component created with hero section
- Split CTAs implemented with proper navigation
- Game screenshot with confetti animation added
- Benefits copy section created
- Mobile responsive design implemented
- Accessibility compliance verified
- Routing updated to support landing page

### File List
- `src/app/page.tsx` - Landing page as main entry point
- `src/app/game/page.tsx` - Game interface moved to /game route
- `src/app/parents/page.tsx` - Parents page placeholder
- `src/app/layout.tsx` - Updated metadata for landing page
- `src/app/globals.css` - Added skip link accessibility styles

### Change Log
- Simplified architecture: landing page as main entry point at `/`
- Moved game interface to dedicated `/game` route
- Created parents page placeholder at `/parents` route
- Implemented proper navigation with back buttons
- Added accessibility features including skip links
- Ensured mobile responsive design throughout
- Used proper Next.js App Router structure

## Status
Ready for Review
