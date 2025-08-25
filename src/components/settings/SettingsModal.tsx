import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayersTab } from "@/components/settings/tabs/PlayersTab";
import { ThemesTab } from "@/components/settings/tabs/ThemesTab";
import { AccessibilityTab } from "@/components/settings/tabs/AccessibilityTab";
import { Settings } from "lucide-react";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState("players");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Game Settings
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="themes">Themes</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          </TabsList>
          
          <TabsContent value="players" className="mt-6">
            <PlayersTab />
          </TabsContent>
          
          <TabsContent value="themes" className="mt-6">
            <ThemesTab />
          </TabsContent>
          
          <TabsContent value="accessibility" className="mt-6">
            <AccessibilityTab />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
