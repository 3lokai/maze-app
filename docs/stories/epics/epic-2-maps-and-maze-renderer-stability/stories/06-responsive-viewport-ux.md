# Story 6 — Responsive Viewport UX

## User Story

**As a** mobile player  
**I want** the maze + controls to adapt on small screens  
**So that** I can play comfortably on a phone.

## Acceptance Criteria

- [ ] Below 768px: right rail stacks below maze
- [ ] Queue + buttons scale ≥44px
- [ ] No horizontal scroll unless in map viewport
- [ ] Touch targets meet accessibility requirements
- [ ] Layout remains functional across all screen sizes

## Technical Requirements

### Responsive Layout
- Implement mobile-first responsive design
- Stack right rail below maze on screens < 768px
- Maintain proper spacing and proportions
- Ensure no horizontal overflow except for map viewport

### Touch Accessibility
- All interactive elements ≥44px minimum size
- Proper touch target spacing (8px minimum)
- Clear visual feedback for touch interactions
- Support for both touch and mouse interactions

### Content Scaling
- Scale queue items appropriately for mobile
- Adjust button sizes for touch interaction
- Maintain readability of all text content
- Optimize spacing for small screens

## Implementation Tasks

1. **Responsive Layout System**
   - Implement CSS Grid/Flexbox for responsive layout
   - Add breakpoints for different screen sizes
   - Create mobile-first design approach
   - Test layout across various device sizes

2. **Mobile Layout Optimization**
   - Stack right rail below maze on mobile
   - Optimize spacing and proportions for small screens
   - Ensure proper content flow and readability
   - Handle orientation changes gracefully

3. **Touch Target Optimization**
   - Scale all interactive elements to ≥44px
   - Add proper touch target spacing
   - Implement clear visual feedback
   - Test touch interactions on actual devices

4. **Content Scaling**
   - Scale queue items for mobile screens
   - Adjust button sizes and spacing
   - Optimize text sizing for readability
   - Maintain visual hierarchy across screen sizes

5. **Testing and Validation**
   - Test on various mobile devices and screen sizes
   - Validate touch accessibility requirements
   - Check for horizontal overflow issues
   - Ensure consistent experience across devices

## Demo Criteria

**Demo:** Load on phone → maze stacked on top, controls below, no overflow

### Demo Steps
1. Load application on mobile device (≤768px)
2. Verify maze displays at top of screen
3. Confirm right rail stacks below maze
4. Test all interactive elements meet 44px minimum
5. Verify no horizontal scroll except in map viewport
6. Test orientation changes and layout adaptation

## Definition of Done

- [ ] Mobile layout stacks properly (≤768px)
- [ ] All touch targets ≥44px minimum size
- [ ] No horizontal overflow except map viewport
- [ ] Layout works across all screen sizes
- [ ] Touch accessibility requirements met
- [ ] Demo criteria met
- [ ] Code reviewed and tested

## Dependencies

- Existing layout components
- Responsive design utilities
- Touch accessibility guidelines

## Notes

- Focus on mobile-first design approach
- Test on actual devices, not just browser dev tools
- Consider performance implications of responsive design
