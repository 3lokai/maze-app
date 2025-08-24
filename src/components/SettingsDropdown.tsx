import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, 
  Eye, 
  Type, 
  Map,
  Palette,
  Timer
} from "lucide-react";
import { useAccessibility } from "@/hooks/useAccessibility";

export function SettingsDropdown() {
  const {
    settings,
    setTheme,
    toggleReducedMotion,
    toggleLargeText,
    togglePreviewPath,
    setExecutionSpeed,
  } = useAccessibility();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="lg"
          className="min-h-[44px] min-w-[44px]"
          aria-label="Open settings menu"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Theme Selector */}
        <DropdownMenuItem className="p-3" onSelect={(e) => e.preventDefault()}>
          <div className="flex items-center gap-3 w-full">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <div className="font-medium">Theme</div>
              <div className="text-sm text-muted-foreground">
                Choose your preferred visual theme
              </div>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2" onSelect={(e) => e.preventDefault()}>
          <Select value={settings.theme} onValueChange={setTheme}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="hc">High Contrast</SelectItem>
              <SelectItem value="soft">Soft (Warmer palette for long sessions)</SelectItem>
            </SelectContent>
          </Select>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Reduced Motion Toggle */}
        <DropdownMenuItem className="flex items-center justify-between p-4" onSelect={(e) => e.preventDefault()}>
          <div className="flex items-center gap-3 flex-1">
            <Eye className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0">
              <div className="font-medium">Reduced Motion</div>
              <div className="text-sm text-muted-foreground">
                Minimize animations
              </div>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <Switch
              checked={settings.reducedMotion}
              onCheckedChange={toggleReducedMotion}
              aria-label="Toggle reduced motion"
            />
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Large Text Toggle */}
        <DropdownMenuItem className="flex items-center justify-between p-4" onSelect={(e) => e.preventDefault()}>
          <div className="flex items-center gap-3 flex-1">
            <Type className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0">
              <div className="font-medium">Large Text</div>
              <div className="text-sm text-muted-foreground">
                Increase text size
              </div>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <Switch
              checked={settings.largeText}
              onCheckedChange={toggleLargeText}
              aria-label="Toggle large text mode"
            />
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Preview Path Toggle */}
        <DropdownMenuItem className="flex items-center justify-between p-4" onSelect={(e) => e.preventDefault()}>
          <div className="flex items-center gap-3 flex-1">
            <Map className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0">
              <div className="font-medium">Preview Path</div>
              <div className="text-sm text-muted-foreground">
                Show ghost trail
              </div>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <Switch
              checked={settings.previewPath}
              onCheckedChange={togglePreviewPath}
              aria-label="Toggle preview path"
            />
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Execution Speed Control */}
        <DropdownMenuItem className="p-3" onSelect={(e) => e.preventDefault()}>
          <div className="flex items-center gap-3 w-full">
            <Timer className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <div className="font-medium">Execution Speed</div>
              <div className="text-sm text-muted-foreground">
                Set command execution speed
              </div>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-2" onSelect={(e) => e.preventDefault()}>
          <Select value={settings.executionSpeed} onValueChange={setExecutionSpeed}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select speed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slow">Slow</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
            </SelectContent>
          </Select>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
