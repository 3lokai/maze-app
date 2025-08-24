import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import type { Dir } from "@/types/maze-app";
import { cn } from "@/lib/utils";

interface DirectionButtonsProps {
  onDirectionClick: (direction: Dir) => void;
  selectedDirection?: Dir | null;
  "aria-labelledby"?: string;
}

export function DirectionButtons({ onDirectionClick, selectedDirection, "aria-labelledby": ariaLabelledBy }: DirectionButtonsProps) {
  const directions: { dir: Dir; icon: React.ReactNode; label: string }[] = [
    { dir: 'U', icon: <ArrowUp className="w-5 h-5" />, label: 'Up' },
    { dir: 'D', icon: <ArrowDown className="w-5 h-5" />, label: 'Down' },
    { dir: 'L', icon: <ArrowLeft className="w-5 h-5" />, label: 'Left' },
    { dir: 'R', icon: <ArrowRight className="w-5 h-5" />, label: 'Right' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3" role="group" aria-labelledby={ariaLabelledBy}>
      {directions.map(({ dir, icon, label }) => (
        <Button
          key={dir}
          variant={selectedDirection === dir ? "default" : "outline"}
          size="default"
          onClick={() => onDirectionClick(dir)}
          className={cn(
            "h-14 text-base font-medium transition-all duration-200",
            "hover:scale-105 active:scale-95",
            "focus:ring-2 focus:ring-offset-2",
            selectedDirection === dir && "shadow-lg"
          )}
          title={label}
          aria-label={`Select ${label} direction`}
          aria-pressed={selectedDirection === dir}
        >
          <div className="flex flex-col items-center gap-1">
            {icon}
            <span className="text-xs">{label}</span>
          </div>
        </Button>
      ))}
    </div>
  );
}
