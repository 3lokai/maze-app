import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Palette } from "lucide-react";
import { useAccessibility } from "@/hooks/useAccessibility";

export function ThemesTab() {
  const { settings, setTheme } = useAccessibility();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Visual Themes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Selector */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
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
        </CardContent>
      </Card>
    </div>
  );
}
