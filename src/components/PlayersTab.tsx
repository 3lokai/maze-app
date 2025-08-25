import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayerManagement } from "@/components/PlayerManagement";
import { Users } from "lucide-react";

export function PlayersTab() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Player Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PlayerManagement />
        </CardContent>
      </Card>
    </div>
  );
}
