import { Button } from "@/components/ui/button";
import type { Magnitude1to10 } from "@/types/maze-app";
import { asMagnitude1to10, cn } from "@/lib/utils";

interface NumberPadProps {
  onNumberClick: (number: Magnitude1to10) => void;
  selectedNumber?: Magnitude1to10 | null;
  "aria-labelledby"?: string;
}

export function NumberPad({ onNumberClick, selectedNumber, "aria-labelledby": ariaLabelledBy }: NumberPadProps) {
  const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-3" role="group" aria-labelledby={ariaLabelledBy}>
      {numbers.map((number) => (
        <Button
          key={number}
          variant={selectedNumber === asMagnitude1to10(number) ? "default" : "outline"}
          size="default"
          onClick={() => onNumberClick(asMagnitude1to10(number))}
          className={cn(
            "min-h-[44px] min-w-[44px] h-12 w-12 sm:h-14 sm:w-14 p-0 text-lg sm:text-xl font-semibold transition-all duration-200",
            "hover:scale-105 active:scale-95",
            "focus:ring-2 focus:ring-offset-2",
            "touch-manipulation", // Optimize for touch
            selectedNumber === asMagnitude1to10(number) && "shadow-lg"
          )}
          aria-label={`Select ${number} steps`}
          aria-pressed={selectedNumber === asMagnitude1to10(number)}
        >
          {number}
        </Button>
      ))}
    </div>
  );
}
