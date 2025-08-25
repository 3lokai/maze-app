import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { StatsDrawer } from "@/components/StatsDrawer";
import { PlayerId, Cell } from "@/types/maze-app";
import { BarChart3 } from "lucide-react";

interface StatsDrawerWrapperProps {
  wins: Partial<Record<PlayerId, number>>;
  crashes: Partial<Record<PlayerId, number>>;
  trails: Partial<Record<PlayerId, Cell[]>>;
  currentPlayer: PlayerId;
}

export function StatsDrawerWrapper({ 
  wins, 
  crashes, 
  trails, 
  currentPlayer 
}: StatsDrawerWrapperProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 stats-button"
          aria-label="Open statistics drawer"
        >
          <BarChart3 className="h-4 w-4" />
          <span className="hidden sm:inline">Stats</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">Game Statistics</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <StatsDrawer 
            wins={wins}
            crashes={crashes}
            trails={trails}
            currentPlayer={currentPlayer}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
