# Story 0 — Common Header & Footer Components (S)

**As a** user navigating the site  
**I want** consistent header and footer with logo and navigation  
**So that** I can easily move between different sections and always know where I am.

## Acceptance Criteria

### Header
* **Logo**: "YoungCoders" branding prominently displayed on the left
* **Navigation Links**: Parents, Help, Curriculum, Login (when available)
* **Current Page Indicator**: Visual indication of active page
* **Responsive Design**: Collapses to hamburger menu on mobile
* **Accessibility**: Proper ARIA labels, keyboard navigation, focus management
* **Consistent Styling**: Matches design system across all pages
* **Back to Game**: Quick access to return to the game interface

### Footer
* **Logo**: "YoungCoders" branding with tagline
* **Quick Links**: Essential navigation links (Parents, Help, Privacy Policy)
* **Social Links**: GitHub, Twitter/X (when available)
* **Copyright**: Current year and company information
* **Responsive Design**: Stacks vertically on mobile
* **Accessibility**: Proper semantic structure and ARIA labels

## Demo

Visit any page → see consistent header with logo and navigation → click links to navigate → mobile view shows hamburger menu → keyboard navigation works properly → scroll to bottom → see footer with branding and additional links → responsive design adapts to screen size.

## Implementation Notes

- **Foundation Story**: This should be implemented first, before other site pages
- **Layout Integration**: Integrates with Next.js App Router layout system
- **Design System**: Uses established visual tokens and styling
- **Mobile-First**: Responsive design with touch-friendly interactions
- **SEO Friendly**: Proper semantic HTML structure
- **Sticky Footer**: Footer should stick to bottom on pages with minimal content

## 📚 References

- [Epic 3 & 4 UX Specs](../../../../frontend-specs/eic-3&4.md) - Header design requirements
- [Visual System](../../../../frontend-specs/3-visual-system.md) - Design tokens and styling
- [Accessibility Guidelines](../../../../frontend-specs/6-accessibility.md) - A11y compliance
- [Responsive Rules](../../../../frontend-specs/7-responsive-rules.md) - Mobile-first design
- [Component Responsibilities](../../../../architecture/2-components-responsibilities.md) - Header component spec

## Tasks

### Header
- [x] Create Header component with logo and navigation
- [x] Implement responsive hamburger menu for mobile
- [x] Add current page indicator functionality
- [x] Ensure proper accessibility compliance
- [x] Add keyboard navigation support

### Footer
- [x] Create Footer component with branding and links
- [x] Implement responsive layout for mobile
- [x] Add social media links (GitHub, Twitter/X)
- [x] Include copyright and legal links
- [x] Ensure proper semantic structure

### Integration
- [x] Integrate with Next.js layout system
- [x] Implement sticky footer behavior
- [x] Test across different screen sizes
- [x] Verify design system consistency

## Dev Agent Record

### Agent Model Used
- James (Full Stack Developer)

### Debug Log References
- Header component creation with responsive navigation
- Footer component creation with branding and links
- Layout integration with Next.js App Router
- Responsive design implementation for mobile/desktop
- Accessibility testing and compliance

### Completion Notes List
- Created responsive Header component with YoungCoders branding
- Implemented mobile hamburger menu with proper accessibility
- Added current page indicator with visual feedback
- Created Footer component with social links and legal information
- Integrated header and footer into main layout system
- Ensured proper semantic HTML structure and ARIA labels
- Implemented sticky footer behavior with flexbox layout
- Added "Back to Game" button logic for non-game pages

### File List
- `src/components/layout/Header.tsx` - Main header component with navigation
- `src/components/layout/Footer.tsx` - Main footer component with branding
- `src/components/layout/index.ts` - Layout component exports
- `src/app/layout.tsx` - Updated to include header and footer
- `src/app/game/page.tsx` - Updated to work with new header structure
- `src/app/parents/page.tsx` - Updated to remove redundant back button

### Change Log
- Created Header component with responsive navigation and mobile menu
- Created Footer component with branding, social links, and legal information
- Integrated header and footer into main layout with proper flexbox structure
- Updated game page to keep both game-specific and common headers
- Updated parents page to remove redundant back button
- Added automatic "Back to Game" button logic for non-game pages
- Ensured accessibility compliance with proper ARIA labels and keyboard navigation
- Implemented responsive design that works across all screen sizes

## Status
Ready for Review
