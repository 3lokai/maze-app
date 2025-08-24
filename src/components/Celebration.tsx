"use client";

import { useEffect, useRef } from 'react';
import { Confetti, type ConfettiRef } from '@/components/magicui/confetti';
import type { PlayerId } from '@/types/maze-app';

interface CelebrationProps {
  show: boolean;
  winner: PlayerId | null;
  onComplete?: () => void;
}

export function Celebration({ show, winner, onComplete }: CelebrationProps) {
  const confettiRef = useRef<ConfettiRef>(null);
  const firingCountRef = useRef(0);
  const maxFirings = 10;

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
      
      // Function to fire confetti with limit
      const fireConfetti = () => {
        if (firingCountRef.current < maxFirings && confettiRef.current) {
          confettiRef.current.fire({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: winner === 1 ? [p1Primary, p1Secondary] : [p2Primary, p2Secondary],
          });
          firingCountRef.current++;
          
          // Schedule next firing if under limit
          if (firingCountRef.current < maxFirings) {
            setTimeout(fireConfetti, 500); // Fire every 500ms
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
  }, [show, winner, onComplete]);

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
