import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accessibility, Eye, Type, Map, Timer } from "lucide-react";
import { useAccessibility } from "@/hooks/useAccessibility";

export function AccessibilityTab() {
  const {
    settings,
    toggleReducedMotion,
    toggleLargeText,
    togglePreviewPath,
    setExecutionSpeed,
  } = useAccessibility();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Accessibility className="h-5 w-5" />
            Accessibility Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Reduced Motion Toggle */}
          <div className="flex items-center justify-between">
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
          </div>

          {/* Large Text Toggle */}
          <div className="flex items-center justify-between">
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
          </div>

          {/* Preview Path Toggle */}
          <div className="flex items-center justify-between">
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
          </div>

          {/* Execution Speed Control */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Timer className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <div className="font-medium">Execution Speed</div>
                <div className="text-sm text-muted-foreground">
                  Set command execution speed
                </div>
              </div>
            </div>
            <Select value={settings.executionSpeed} onValueChange={setExecutionSpeed}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select speed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slow">Slow</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
