import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { EmojiPicker } from "@/components/settings/EmojiPicker";
import { useGameStore } from "@/store/gameStore";
import { useMazeLayout } from "@/hooks/useMazeLayout";
import { PlayerId } from "@/types/maze-app";
import { getMaxPlayers, getMinPlayers, type PlayerEmoji } from "@/types/maze";
import { UserPlus, UserMinus, Edit3, Save, X } from "lucide-react";

export function PlayerManagement() {
  const {
    playerConfigs,
    getActivePlayers,
    addPlayer,
    removePlayer,
    updatePlayerConfig,
  } = useGameStore();

  const { mazeData } = useMazeLayout();

  const [editingPlayer, setEditingPlayer] = useState<PlayerId | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmoji, setEditEmoji] = useState<string>("");

  const activePlayers = getActivePlayers();
  const canAddPlayer = activePlayers.length < getMaxPlayers();
  const canRemovePlayer = activePlayers.length > getMinPlayers();

  const handleEditPlayer = (playerId: PlayerId) => {
    const config = playerConfigs[playerId];
    if (config) {
      setEditingPlayer(playerId);
      setEditName(config.name);
      setEditEmoji(config.emoji);
    }
  };

  const handleSavePlayer = () => {
    if (editingPlayer) {
      updatePlayerConfig(editingPlayer, {
        name: editName.trim() || `Player ${editingPlayer}`,
        emoji: editEmoji,
      });
      setEditingPlayer(null);
      setEditName("");
      setEditEmoji("");
    }
  };

  const handleCancelEdit = () => {
    setEditingPlayer(null);
    setEditName("");
    setEditEmoji("");
  };

  const handleRemovePlayer = (playerId: PlayerId) => {
    removePlayer(playerId);
    if (editingPlayer === playerId) {
      handleCancelEdit();
    }
  };

  const handleAddPlayer = () => {
    // Pass the current maze start position to ensure new players start at the correct position
    const mazeStartPosition = mazeData?.start;
    addPlayer(mazeStartPosition);
  };

  return (
    <div className="space-y-4">
        {/* Player List */}
        <div className="space-y-3">
          {activePlayers.map((playerId) => {
            const config = playerConfigs[playerId];
            const isEditing = editingPlayer === playerId;
            
            return (
              <div key={playerId} className="flex items-center gap-3 p-3 border rounded-lg">
                {isEditing ? (
                  // Edit Mode
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Player name"
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        onClick={handleSavePlayer}
                        disabled={!editName.trim()}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <EmojiPicker
                      selectedEmoji={editEmoji}
                      onEmojiSelect={(emoji: PlayerEmoji) => setEditEmoji(emoji)}
                    />
                  </div>
                ) : (
                  // Display Mode
                  <>
                    <div className="flex-1 flex items-center gap-2">
                      <span className="text-2xl">{config?.emoji}</span>
                      <span className="font-medium">{config?.name}</span>
                      <Badge variant="secondary">Player {playerId}</Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditPlayer(playerId)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      {canRemovePlayer && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemovePlayer(playerId)}
                        >
                          <UserMinus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <Separator />

        {/* Add Player Button */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {activePlayers.length} of {getMaxPlayers()} players
          </div>
          <Button
            onClick={handleAddPlayer}
            disabled={!canAddPlayer}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Add Player
          </Button>
        </div>
      </div>
  );
}
