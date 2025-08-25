# Technology Stack

## Overview

This document outlines the complete technology stack used in the Maze App project, including frameworks, libraries, tools, and architectural decisions.

## Core Framework

### Next.js 15
- **Version**: 15.5.0
- **Router**: App Router (new file-system based routing)
- **Build Tool**: Turbopack (enabled via `--turbopack` flag)
- **Features Used**:
  - Client-side rendering (CSR) only
  - Dynamic imports for code splitting
  - Built-in TypeScript support
  - Optimized image handling
  - Automatic code splitting

### React 19
- **Version**: 19.1.0
- **Features Used**:
  - Hooks (useState, useEffect, useCallback, useMemo)
  - Server Components (though not heavily used in this CSR app)
  - Concurrent Features (React 19 improvements)
  - Strict Mode for development

## Frontend Technologies

### TypeScript
- **Version**: ^5
- **Configuration**: Strict mode enabled
- **Target**: ES2017
- **Features Used**:
  - Strict type checking
  - Branded types for runtime validation
  - Path mapping (`@/*` → `./src/*`)
  - Module resolution: bundler
  - Incremental compilation

### Tailwind CSS
- **Version**: ^4
- **Configuration**: Custom design system
- **Features Used**:
  - Utility-first CSS
  - Custom color palette
  - Responsive design utilities
  - Dark mode support (via next-themes)
  - Custom animations

### CSS-in-JS Utilities
- **clsx**: ^2.1.1 - Conditional class names
- **class-variance-authority**: ^0.7.1 - Component variant management
- **tailwind-merge**: ^3.3.1 - Tailwind class merging

## State Management

### Zustand
- **Version**: ^5.0.8
- **Usage**: Global state management for game state
- **Features Used**:
  - TypeScript integration
  - Immutable state updates
  - Action creators
  - Partial state updates
  - Middleware support (if needed)

### React State
- **Local State**: useState for component-level state
- **Custom Hooks**: Encapsulated stateful logic
- **Context**: Minimal usage (prefer Zustand for global state)

## UI Component Libraries

### shadcn/ui
- **Components Used**:
  - `@radix-ui/react-dialog`: Modal dialogs
  - `@radix-ui/react-dropdown-menu`: Dropdown menus
  - `@radix-ui/react-progress`: Progress indicators
  - `@radix-ui/react-select`: Select components
  - `@radix-ui/react-separator`: Visual separators
  - `@radix-ui/react-slot`: Component composition
  - `@radix-ui/react-switch`: Toggle switches
  - `@radix-ui/react-tabs`: Tab interfaces
  - `@radix-ui/react-toggle`: Toggle buttons
  - `@radix-ui/react-tooltip`: Tooltips

### Custom UI Components
- **magicui**: Custom animation and UI components
- **Custom Components**: Game-specific components (MazeRenderer, PlayerToken, etc.)

## Icons and Visual Assets

### Lucide React
- **Version**: ^0.541.0
- **Usage**: Consistent icon set throughout the application
- **Features**: Tree-shakable, customizable, accessible

### Canvas Confetti
- **Version**: ^1.9.3
- **Usage**: Celebration effects and visual feedback
- **Features**: Customizable particle effects

## Development Tools

### ESLint
- **Version**: ^9
- **Configuration**: Next.js recommended rules
- **Custom Rules**: Minimal project-specific rules
- **Integration**: IDE integration and CI/CD

### TypeScript Compiler
- **Configuration**: Strict mode with custom settings
- **Path Mapping**: Clean import paths
- **Incremental Compilation**: Faster builds

### PostCSS
- **Version**: ^4
- **Plugins**: Tailwind CSS processing
- **Configuration**: Optimized for production builds

## Build and Development

### Turbopack
- **Usage**: Next.js 15's new bundler
- **Benefits**: Faster development builds
- **Configuration**: Enabled via `--turbopack` flag

### Node.js
- **Version**: Compatible with Next.js 15 requirements
- **Package Manager**: npm (package-lock.json present)

## Data Validation

### Zod
- **Version**: ^4.1.0
- **Usage**: Runtime data validation
- **Features**: Schema validation, type inference

## Notifications and Feedback

### Sonner
- **Version**: ^2.0.7
- **Usage**: Toast notifications and user feedback
- **Features**: Accessible, customizable, lightweight

## Theme Management

### next-themes
- **Version**: ^0.4.6
- **Usage**: Dark/light mode switching
- **Features**: System preference detection, SSR support

## Animation and Effects

### tw-animate-css
- **Version**: ^1.3.7
- **Usage**: CSS animations and transitions
- **Features**: Tailwind CSS integration

## Development Dependencies

### Type Definitions
- `@types/node`: ^20 - Node.js type definitions
- `@types/react`: ^19 - React type definitions
- `@types/react-dom`: ^19 - React DOM type definitions
- `@types/canvas-confetti`: ^1.9.0 - Canvas confetti types

### Build Tools
- `@eslint/eslintrc`: ^3 - ESLint configuration
- `@tailwindcss/postcss`: ^4 - Tailwind PostCSS plugin

## Architectural Decisions

### Client-Side Rendering (CSR)
- **Decision**: Use CSR instead of SSR for this game application
- **Rationale**: 
  - Game state is client-side only
  - No SEO requirements for game content
  - Faster initial interactions
  - Simpler state management

### State Management Choice
- **Decision**: Zustand over Redux or Context
- **Rationale**:
  - Simpler API for small to medium applications
  - Better TypeScript integration
  - Less boilerplate code
  - Good performance characteristics

### Component Library Choice
- **Decision**: shadcn/ui over Material-UI or Ant Design
- **Rationale**:
  - Highly customizable
  - Tailwind CSS integration
  - Copy-paste components (no vendor lock-in)
  - Excellent accessibility
  - Modern design patterns

### Styling Approach
- **Decision**: Tailwind CSS over CSS-in-JS or CSS Modules
- **Rationale**:
  - Rapid development
  - Consistent design system
  - Excellent responsive design support
  - Good performance (smaller bundle size)
  - Strong community and ecosystem

### TypeScript Strict Mode
- **Decision**: Enable strict mode
- **Rationale**:
  - Better type safety
  - Catch errors at compile time
  - Improved developer experience
  - Better refactoring support

## Performance Considerations

### Bundle Optimization
- **Code Splitting**: Automatic with Next.js
- **Tree Shaking**: Enabled for all libraries
- **Dynamic Imports**: Used for heavy components
- **Image Optimization**: Next.js built-in optimization

### Runtime Performance
- **React.memo**: Used for expensive components
- **useMemo/useCallback**: Used for expensive computations
- **Zustand**: Efficient state updates
- **Tailwind**: Optimized CSS generation

## Security Considerations

### Client-Side Security
- **No Sensitive Data**: All data is client-side only
- **Input Validation**: Zod schemas for data validation
- **XSS Prevention**: React's built-in XSS protection
- **CSP**: Content Security Policy headers (if deployed)

## Accessibility

### ARIA Support
- **Radix UI**: Built-in accessibility features
- **Custom Components**: ARIA labels and roles
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Compatible with screen readers

### Visual Accessibility
- **High Contrast**: High contrast mode support
- **Reduced Motion**: Respect user motion preferences
- **Large Text**: Scalable text support
- **Color Blindness**: Color-blind friendly design

## Testing Strategy

### Current Testing
- **Manual Testing**: Primary testing method
- **TypeScript**: Compile-time error checking
- **ESLint**: Code quality checks

### Future Testing Plans
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Component integration testing
- **E2E Tests**: Playwright or Cypress
- **Visual Regression**: Storybook + Chromatic

## Deployment Considerations

### Build Output
- **Static Export**: Possible with Next.js
- **CDN Ready**: Optimized for CDN deployment
- **Environment Variables**: Next.js environment support

### Hosting Options
- **Vercel**: Optimal for Next.js applications
- **Netlify**: Static site hosting
- **GitHub Pages**: Free static hosting
- **AWS S3 + CloudFront**: Enterprise hosting

## Monitoring and Analytics

### Current Monitoring
- **Console Logging**: Development debugging
- **Error Boundaries**: React error catching

### Future Monitoring Plans
- **Error Tracking**: Sentry or similar
- **Performance Monitoring**: Web Vitals tracking
- **User Analytics**: Privacy-friendly analytics
- **Game Analytics**: Player behavior tracking

## Future Technology Considerations

### Potential Upgrades
- **React 20**: When available
- **Next.js 16**: Future framework updates
- **Bun**: Alternative to Node.js for faster builds
- **WebAssembly**: For performance-critical game logic

### Scalability Considerations
- **Micro-frontends**: If the app grows significantly
- **State Management**: Redux Toolkit if Zustand becomes insufficient
- **Testing**: Comprehensive testing suite
- **CI/CD**: Automated deployment pipeline

## Dependencies Management

### Version Pinning
- **Exact Versions**: Critical dependencies pinned
- **Range Versions**: Development dependencies use ranges
- **Security Updates**: Regular dependency updates

### Bundle Analysis
- **Bundle Analyzer**: Monitor bundle size
- **Dependency Auditing**: Regular security audits
- **Tree Shaking**: Ensure unused code is removed

---

*This document should be updated as the technology stack evolves and new decisions are made.*
