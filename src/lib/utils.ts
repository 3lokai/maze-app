import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Magnitude1to10 } from '@/types/maze-app';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Narrow number to Magnitude1to10 at runtime */
export function asMagnitude1to10(n: number): Magnitude1to10 {
  if (Number.isInteger(n) && n >= 1 && n <= 10) return n as Magnitude1to10;
  throw new Error(`Invalid magnitude ${n}; expected integer 1..10`);
}
