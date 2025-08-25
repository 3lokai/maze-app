import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PLAYER_EMOJIS, type PlayerEmoji } from "@/types/maze";

interface EmojiPickerProps {
  selectedEmoji: string;
  onEmojiSelect: (emoji: PlayerEmoji) => void;
  disabled?: boolean;
}

export function EmojiPicker({ selectedEmoji, onEmojiSelect, disabled = false }: EmojiPickerProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-3">
        <div className="grid grid-cols-3 gap-2">
          {PLAYER_EMOJIS.map((emoji) => (
            <Button
              key={emoji}
              variant={selectedEmoji === emoji ? "default" : "outline"}
              size="lg"
              className="h-12 text-2xl"
              onClick={() => onEmojiSelect(emoji)}
              disabled={disabled}
              aria-label={`Select ${emoji} emoji`}
            >
              {emoji}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
