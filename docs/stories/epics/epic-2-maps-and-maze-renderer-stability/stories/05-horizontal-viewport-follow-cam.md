# Story 5 — Horizontal Viewport & Follow-Cam

## User Story

**As a** player  
**I want** the maze to scroll horizontally with my token  
**So that** I can explore larger maps without squinting.

## Acceptance Criteria

- [ ] Player token stays centered (or lead third)
- [ ] Smooth pan as player moves
- [ ] Touch-drag disabled (programmatic pan only)
- [ ] Viewport boundaries respected
- [ ] Pan animation maintains 60fps

## Technical Requirements

### Camera System
- Implement smooth camera following for player token
- Calculate optimal viewport position based on token location
- Handle edge cases when token approaches grid boundaries
- Maintain consistent pan speed regardless of grid size

### Viewport Management
- Calculate visible grid area based on viewport size
- Implement efficient rendering for visible cells only
- Handle viewport changes during orientation switches
- Ensure smooth transitions between viewport states

### Performance Optimization
- Use CSS transforms for smooth panning animations
- Implement efficient viewport culling for large grids
- Minimize DOM updates during camera movement
- Maintain 60fps performance during pan operations

## Implementation Tasks

1. **Camera Controller**
   - Create camera system for tracking player position
   - Implement smooth interpolation for camera movement
   - Add boundary detection for grid edges
   - Calculate optimal viewport positioning

2. **Viewport Rendering**
   - Implement viewport-based cell rendering
   - Add efficient culling for off-screen cells
   - Handle viewport size changes
   - Optimize rendering performance for large grids

3. **Pan Animation System**
   - Use CSS transforms for smooth panning
   - Implement easing functions for natural movement
   - Add configurable pan speed and behavior
   - Ensure consistent performance across devices

4. **Boundary Handling**
   - Detect when token approaches grid boundaries
   - Implement appropriate camera behavior at edges
   - Handle edge cases for different grid sizes
   - Maintain smooth experience at all grid positions

5. **Integration and Testing**
   - Integrate camera system with existing game logic
   - Test with various grid sizes and token positions
   - Validate performance on different devices
   - Ensure accessibility compliance

## Demo Criteria

**Demo:** Queue moves across wide maze → board pans smoothly as token advances

### Demo Steps
1. Load a wide maze (e.g., 15×20 or 20×15)
2. Queue a path that spans the entire width
3. Execute the path and observe smooth panning
4. Verify token stays in optimal viewport position
5. Test edge cases at grid boundaries
6. Confirm 60fps performance during panning

## Definition of Done

- [ ] Camera follows player token smoothly
- [ ] Pan animations maintain 60fps performance
- [ ] Viewport boundaries handled properly
- [ ] Touch-drag disabled as specified
- [ ] Works with all grid sizes
- [ ] Demo criteria met
- [ ] Code reviewed and tested

## Dependencies

- Existing maze renderer component
- Player token system
- Game state management

## Notes

- Focus on smooth, natural camera movement
- Consider user experience for different play styles
- Test on actual devices to ensure performance
