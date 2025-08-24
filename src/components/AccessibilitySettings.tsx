import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAccessibility } from "@/hooks/useAccessibility";
import { 
  Eye, 
  Type, 
  Accessibility,
  Map,
  Palette
} from "lucide-react";

export function AccessibilitySettings() {
  const {
    settings,
    setTheme,
    toggleReducedMotion,
    toggleLargeText,
    togglePreviewPath,
  } = useAccessibility();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Accessibility className="h-5 w-5" />
          <span>Accessibility</span>
          <Badge variant="outline">A11y</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Theme Selector */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-medium">Theme</div>
              <div className="text-sm text-muted-foreground">
                Choose your preferred visual theme
              </div>
            </div>
          </div>
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
        </div>

        <Separator />

        {/* Reduced Motion Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-medium">Reduced Motion</div>
              <div className="text-sm text-muted-foreground">
                Minimize animations and transitions
              </div>
            </div>
          </div>
          <Switch
            checked={settings.reducedMotion}
            onCheckedChange={toggleReducedMotion}
            aria-label="Toggle reduced motion"
          />
        </div>

        <Separator />

        {/* Large Text Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Type className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0">
              <div className="font-medium">Large Text</div>
              <div className="text-sm text-muted-foreground">
                Increase text size for better readability
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

        <Separator />

        {/* Preview Path Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Map className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0">
              <div className="font-medium">Preview Path</div>
              <div className="text-sm text-muted-foreground">
                Show ghost trail for path preview
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
      </CardContent>
    </Card>
  );
}

