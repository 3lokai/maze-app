import type { MazeData, Cell, PlayerId } from '@/types/maze-app';
import type { ViewportState, CameraConfig } from '@/types/maze';

/**
 * Validation utilities for viewport and camera functionality
 * Tests the requirements from Story 5 - Horizontal Viewport & Follow-Cam
 */

export interface ViewportValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate viewport state meets requirements
 */
export function validateViewportState(
  viewport: ViewportState,
  maze: MazeData,
  positions: Partial<Record<PlayerId, Cell>>
): ViewportValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check viewport dimensions
  if (viewport.width <= 0 || viewport.height <= 0) {
    errors.push('Viewport dimensions must be positive');
  }

  // Check scroll boundaries
  const maxScrollX = Math.max(0, maze.width * 40 - viewport.width); // Assuming 40px cell size
  const maxScrollY = Math.max(0, maze.height * 40 - viewport.height);

  if (viewport.scrollX < 0 || viewport.scrollX > maxScrollX) {
    errors.push(`ScrollX (${viewport.scrollX}) is outside valid range [0, ${maxScrollX}]`);
  }

  if (viewport.scrollY < 0 || viewport.scrollY > maxScrollY) {
    errors.push(`ScrollY (${viewport.scrollY}) is outside valid range [0, ${maxScrollY}]`);
  }

  // Check follow-cam state
  if (viewport.isFollowing && !viewport.targetPlayer) {
    errors.push('Follow-cam enabled but no target player specified');
  }

  if (viewport.isFollowing && viewport.targetPlayer) {
    const playerPosition = positions[viewport.targetPlayer];
    if (!playerPosition) {
      errors.push(`Target player ${viewport.targetPlayer} has no position`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate camera configuration
 */
export function validateCameraConfig(config: CameraConfig): ViewportValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check follow speed
  if (config.followSpeed < 0 || config.followSpeed > 1) {
    errors.push('Follow speed must be between 0 and 1');
  }

  // Check boundary padding
  if (config.boundaryPadding < 0) {
    errors.push('Boundary padding must be non-negative');
  }

  // Check max pan speed
  if (config.maxPanSpeed <= 0) {
    errors.push('Max pan speed must be positive');
  }

  // Performance warnings
  if (config.followSpeed > 0.5) {
    warnings.push('High follow speed may cause jerky movement');
  }

  if (config.maxPanSpeed > 16) {
    warnings.push('High pan speed may exceed 60fps frame budget');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Test viewport performance requirements
 */
export function testViewportPerformance(
  maze: MazeData,
  viewport: ViewportState
): ViewportValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if grid size is within DOM performance limits (ADR-001)
  const totalCells = maze.width * maze.height;
  if (totalCells > 400) {
    errors.push(`Grid size ${maze.width}×${maze.height} (${totalCells} cells) exceeds DOM performance limit of 400 cells`);
  }

  // Check viewport size for performance
  if (viewport.width * viewport.height > 1000000) {
    warnings.push('Large viewport may impact performance');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Comprehensive viewport validation
 */
export function validateViewportSystem(
  viewport: ViewportState,
  cameraConfig: CameraConfig,
  maze: MazeData,
  positions: Partial<Record<PlayerId, Cell>>
): ViewportValidationResult {
  const results = [
    validateViewportState(viewport, maze, positions),
    validateCameraConfig(cameraConfig),
    testViewportPerformance(maze, viewport)
  ];

  const allErrors = results.flatMap(r => r.errors);
  const allWarnings = results.flatMap(r => r.warnings);

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings
  };
}
