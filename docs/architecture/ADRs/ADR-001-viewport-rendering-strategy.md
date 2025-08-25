# ADR-001: Viewport and Rendering Strategy for Epic 2

## Status

**Accepted** - 2024-12-19

## Context

Epic 2 introduces larger maze sizes (up to 20×20) and requires robust viewport management with follow-cam functionality. We need to choose between DOM-based rendering and Canvas-based rendering for optimal performance and maintainability.

## Decision

**DOM-First Approach with Canvas Fallback**

We will implement a DOM-based rendering system optimized for maps up to 20×20, with a documented path for Canvas-based rendering as a future extension for larger maps.

### Primary Strategy: DOM Mode (≤20×20)

* **Technology**: CSS Grid + React components with aspect-ratio locking
* **Performance**: Optimized with `will-change: transform`, translate3d, and cell memoization
* **Target**: 60fps step animations with frame budget <16ms
* **Benefits**: Easier styling, better accessibility, simpler state management

### Fallback Strategy: Canvas Mode (>20×20)

* **Technology**: HTML5 Canvas with custom rendering engine
* **Trigger**: Automatic switch for maps larger than 20×20
* **Benefits**: Unlimited map sizes, better performance for very large grids
* **Trade-offs**: More complex implementation, harder to style

## Rationale

### Why DOM-First?

1. **Performance Adequacy**: Modern browsers handle 400 DOM elements (20×20) efficiently
2. **Development Speed**: Leverages existing React patterns and CSS expertise
3. **Accessibility**: Better screen reader support and keyboard navigation
4. **Styling Flexibility**: Easier to implement responsive design and animations
5. **Debugging**: Better developer tools and inspection capabilities

### Why Canvas Fallback?

1. **Future-Proofing**: Allows for unlimited map sizes without architectural changes
2. **Performance Scaling**: Canvas outperforms DOM for very large grids
3. **Memory Efficiency**: Reduced DOM complexity for massive maps

## Consequences

### Positive

* **Immediate Implementation**: Can build on existing React patterns
* **Responsive Design**: CSS Grid provides excellent responsive behavior
* **Accessibility**: Maintains good accessibility out of the box
* **Performance**: Optimized for target use case (≤20×20 maps)

### Negative

* **Complexity**: Need to maintain two rendering paths
* **Bundle Size**: Canvas renderer adds to bundle size (even if unused)
* **Testing**: Need to test both rendering modes

### Risks

* **Performance Degradation**: DOM rendering may struggle with maps approaching 20×20
* **Implementation Complexity**: Canvas renderer requires significant development effort
* **Maintenance Burden**: Two code paths to maintain

## Mitigations

### Performance Risks

* **Benchmarking**: Establish performance baselines for 20×20 maps
* **Optimization**: Implement cell memoization and animation throttling
* **Monitoring**: Add performance metrics to detect degradation

### Implementation Risks

* **Phased Approach**: Implement DOM mode first, Canvas mode later
* **Shared Interface**: Design common interface for both renderers
* **Feature Flags**: Use feature flags to control renderer selection

## Implementation Plan

### Phase 1: DOM Mode (Epic 2)

1. Implement aspect-ratio locked CSS Grid system
2. Add viewport management with follow-cam
3. Optimize performance with memoization and transforms
4. Add responsive breakpoints and overlay system

### Phase 2: Canvas Mode (Future Epic)

1. Design shared renderer interface
2. Implement Canvas-based rendering engine
3. Add automatic renderer selection based on map size
4. Performance testing and optimization

## Technical Details

### DOM Mode Implementation

```tsx
// Aspect-ratio locked container
<div 
  className="maze-viewport"
  style={{
    aspectRatio: `${maze.width} / ${maze.height}`,
    transform: `translate3d(${viewport.scrollX}px, ${viewport.scrollY}px, 0)`
  }}
>
  <div className="maze-grid">
    {/* Memoized cells */}
  </div>
</div>
```

### Canvas Mode Interface

```ts
interface MazeRenderer {
  render(maze: MazeData, viewport: ViewportState): void;
  updatePositions(positions: Record<PlayerId, Cell>): void;
  updateTrails(trails: Record<PlayerId, Cell[]>): void;
  panViewport(scrollX: number, scrollY: number): void;
}
```

### Performance Thresholds

* **Target**: 60fps for step animations
* **Frame Budget**: <16ms per frame
* **Memory**: Stable across map switches
* **Switch Threshold**: 20×20 maps (400 cells)

## Related Decisions

* **ADR-002**: Aspect-Ratio Locking Strategy
* **ADR-003**: Follow-Cam Algorithm Design
* **ADR-004**: Responsive Breakpoint Strategy

## References

* [CSS Grid Performance](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
* [Canvas vs DOM Performance](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
* [React Performance Optimization](https://react.dev/learn/render-and-commit)
