"use client";

import { useEffect, useRef, useCallback } from 'react';
import { Confetti, type ConfettiRef } from '@/components/magicui/confetti';
import type { PlayerId } from '@/types/maze-app';
import { performanceUtils } from '@/lib/maze';

interface CelebrationProps {
  show: boolean;
  winner: PlayerId | null;
  onComplete?: () => void;
  mazeSize?: { width: number; height: number };
}

export function Celebration({ show, winner, onComplete, mazeSize }: CelebrationProps) {
  const confettiRef = useRef<ConfettiRef>(null);
  const firingCountRef = useRef(0);
  const maxFirings = 10;
  const performanceMode = mazeSize ? performanceUtils.getPerformanceMode(mazeSize.width, mazeSize.height) : 'standard';

  // Performance-optimized confetti configuration
  const getConfettiConfig = useCallback(() => {
    const baseConfig = {
      spread: 70,
      origin: { y: 0.6 },
    };

    // Reduce particle count and firing frequency for large grids
    if (performanceMode === 'optimized') {
      return {
        ...baseConfig,
        particleCount: 50, // Reduced from 100
        maxFirings: 5, // Reduced from 10
        firingInterval: 800, // Increased from 500ms
      };
    }

    return {
      ...baseConfig,
      particleCount: 100,
      maxFirings: 10,
      firingInterval: 500,
    };
  }, [performanceMode]);

  // Performance monitoring for confetti rendering
  const recordConfettiTime = useCallback((renderTime: number) => {
    if (typeof window !== 'undefined' && (window as { performanceMonitor?: { recordConfettiTime: (time: number) => void } }).performanceMonitor) {
      (window as { performanceMonitor?: { recordConfettiTime: (time: number) => void } }).performanceMonitor?.recordConfettiTime(renderTime);
    }
  }, []);

  useEffect(() => {
    if (show && winner && confettiRef.current) {
      // Reset firing count when celebration starts
      firingCountRef.current = 0;
      
      // Get computed styles to access CSS custom properties
      const rootStyles = getComputedStyle(document.documentElement);
      const p1Primary = rootStyles.getPropertyValue('--celebration-p1-primary').trim();
      const p1Secondary = rootStyles.getPropertyValue('--celebration-p1-secondary').trim();
      const p2Primary = rootStyles.getPropertyValue('--celebration-p2-primary').trim();
      const p2Secondary = rootStyles.getPropertyValue('--celebration-p2-secondary').trim();
      
      const config = getConfettiConfig();
      
      // Function to fire confetti with performance monitoring
      const fireConfetti = () => {
        if (firingCountRef.current < config.maxFirings && confettiRef.current) {
          const startTime = performance.now();
          
          confettiRef.current.fire({
            particleCount: config.particleCount,
            spread: config.spread,
            origin: config.origin,
            colors: winner === 1 ? [p1Primary, p1Secondary] : [p2Primary, p2Secondary],
          });
          
          // Record confetti rendering time
          const renderTime = performance.now() - startTime;
          recordConfettiTime(renderTime);
          
          firingCountRef.current++;
          
          // Schedule next firing if under limit
          if (firingCountRef.current < config.maxFirings) {
            setTimeout(fireConfetti, config.firingInterval);
          }
        }
      };
      
      // Start the confetti sequence
      fireConfetti();

      // Auto-hide celebration after 3 seconds
      const timer = setTimeout(() => {
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, winner, onComplete, getConfettiConfig, recordConfettiTime]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <Confetti
        ref={confettiRef}
        className="w-full h-full"
        manualstart={true}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg pointer-events-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            🎉 Player {winner} Wins! 🎉
          </h2>
          <p className="text-lg text-center text-gray-600">
            Congratulations! You've reached the goal first!
          </p>
        </div>
      </div>
    </div>
  );
}
