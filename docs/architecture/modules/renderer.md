# Renderer Module Architecture

## Purpose

Define the rendering system for variable-sized mazes (up to 20×20) with viewport management, aspect-ratio locking, and follow-cam functionality. Focuses on performance optimization and responsive design.

## Core Principles

* **Aspect-Ratio Lock**: Cells must remain perfect squares across all devices
* **Overlay System**: Labels and emojis rendered as absolute overlays, not layout content
* **Viewport Management**: Programmatic panning for larger maps with follow-cam
* **Performance First**: DOM mode optimized for ≤20×20 maps with smooth 60fps

## Component Architecture

### MazeViewport (renamed from Maze)

```tsx
interface MazeViewportProps {
  maze: MazeData;
  positions: Record<PlayerId, Cell>;
  trails: Record<PlayerId, Cell[]>;
  status: GameStatus;
  currentPlayer: PlayerId | null;
  playerConfigs: PlayerConfig[];
  viewport: ViewportState;
  onViewportJump?: (to: Cell) => void;
}
```

**Responsibilities:**
* Renders maze grid with aspect-ratio locked cells
* Manages viewport scrolling and follow-cam
* Handles overlay rendering (labels, emojis, tokens)
* Exposes refs for animations and viewport control

## CSS Architecture

### Board Container

```css
.maze-viewport {
  aspect-ratio: var(--cols) / var(--rows);
  max-width: clamp(300px, 80vw, 800px);
  overflow: hidden;
  position: relative;
}

.maze-grid {
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);
  width: 100%;
  height: 100%;
  position: relative;
}
```

### Cell System

```css
.maze-cell {
  aspect-ratio: 1;
  position: relative;
  background: var(--cell-bg);
  border: 1px solid var(--cell-border);
}

.cell-content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Overlay System

```css
.cell-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(12px, 2.5vw, 16px);
  line-height: 1;
}

/* Icon-only mode for small screens */
@media (max-width: 390px) {
  .cell-overlay-text {
    display: none;
  }
  
  .cell-overlay-icon {
    font-size: 1.2em;
  }
}
```

## Viewport Management

### ViewportState

```ts
type ViewportState = {
  scrollX: number;    // px
  scrollY: number;    // px
  cellSize: number;   // px, computed responsive
  followMode: 'center' | 'lead-⅓' | 'none';
};
```

### Follow-Cam Algorithm

```ts
function updateViewport(
  viewport: ViewportState,
  activeCell: Cell,
  containerSize: { width: number; height: number }
): ViewportState {
  const cellPixelPos = {
    x: activeCell.c * viewport.cellSize,
    y: activeCell.r * viewport.cellSize
  };
  
  const safeFrame = {
    x: containerSize.width * 0.33,  // lead-third
    y: containerSize.height * 0.5   // center
  };
  
  const targetScroll = {
    x: Math.max(0, cellPixelPos.x - safeFrame.x),
    y: Math.max(0, cellPixelPos.y - safeFrame.y)
  };
  
  return {
    ...viewport,
    scrollX: targetScroll.x,
    scrollY: targetScroll.y
  };
}
```

### Responsive Breakpoints

* **Desktop (≥768px)**: Full layout with right rail
* **Tablet (≥480px)**: Compressed layout, smaller cells
* **Mobile (<480px)**: Stacked layout, icon-only overlays, legend below board

## Performance Optimization

### DOM Mode (≤20×20 maps)

```css
.maze-cell {
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.maze-viewport {
  will-change: transform;
  transform: translate3d(var(--scroll-x), var(--scroll-y), 0);
}
```

### Cell Memoization

```tsx
const MemoizedCell = React.memo(({ cell, content, overlay }) => {
  return (
    <div className="maze-cell">
      <div className="cell-content">{content}</div>
      {overlay && <div className="cell-overlay">{overlay}</div>}
    </div>
  );
});
```

### Animation Throttling

* **Step animations**: 60fps target, frame budget <16ms
* **Confetti**: Throttled for large boards, single mega-confetti on goal
* **Viewport pan**: requestAnimationFrame for smooth scrolling

## Canvas Mode (Future Extension)

For maps larger than 20×20, a canvas-based renderer can be implemented:

```ts
interface CanvasRenderer {
  drawMaze(maze: MazeData): void;
  drawTokens(positions: Record<PlayerId, Cell>): void;
  drawTrails(trails: Record<PlayerId, Cell[]>): void;
  panViewport(scrollX: number, scrollY: number): void;
}
```

**Benefits:**
* Unlimited map sizes
* Better performance for very large grids
* Reduced DOM complexity

**Trade-offs:**
* More complex implementation
* Harder to style and animate
* Accessibility challenges

## Testing Strategy

### Visual Regression Tests

* Aspect-ratio validation across devices
* Overlay positioning and sizing
* Responsive breakpoint behavior

### Performance Tests

* 20×20 map rendering at 60fps
* Memory stability across map switches
* Frame budget validation during step execution

### Accessibility Tests

* Screen reader compatibility with overlays
* Keyboard navigation in viewport
* High contrast mode support

## Implementation Notes

### CSS Custom Properties

```css
:root {
  --maze-cols: 10;
  --maze-rows: 10;
  --cell-size: min(calc(100vw / var(--maze-cols)), calc(100vh / var(--maze-rows)));
  --scroll-x: 0px;
  --scroll-y: 0px;
}
```

### State Management

* Viewport state managed in Zustand store
* Cell size computed responsively on mount and resize
* Follow-cam updates triggered by player movement

### Error Handling

* Graceful fallback for unsupported map sizes
* Loading states for map transitions
* Error boundaries for renderer failures
