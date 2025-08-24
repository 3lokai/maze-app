# 12) Player Management Components

## Current Implementation Status

### ✅ **Existing Components (Enhance for Epic 1):**
- **Turn Indicator**: Inline badge in maze header (enhance for player names)
- **Stats Display**: StatsDrawer component (enhance for 1-4 players)
- **Settings**: SettingsDropdown component (add player management)

### 🆕 **New Components Needed:**
- **Settings Modal**: Parent interface for player management
- **Emoji Picker**: Grid component for emoji selection
- **Player Management**: Add/edit/remove players interface

## Settings Modal

### Structure
```tsx
<Dialog>
  <DialogHeader>
    <DialogTitle>Game Settings</DialogTitle>
  </DialogHeader>
  <DialogContent>
    <Tabs defaultValue="players">
      <TabsList>
        <TabsTrigger value="players">Players</TabsTrigger>
        <TabsTrigger value="themes">Themes</TabsTrigger>
        <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
      </TabsList>
      <TabsContent value="players">
        <PlayerManagement />
      </TabsContent>
      <TabsContent value="themes">
        <ThemeSettings />
      </TabsContent>
      <TabsContent value="accessibility">
        <AccessibilitySettings />
      </TabsContent>
    </Tabs>
  </DialogContent>
</Dialog>
```

### Player Management Tab

#### Player List
- **Layout**: Vertical list of player rows
- **Empty State**: "No players added" with Add Player button
- **Player Row**: Emoji + Name + Edit/Remove buttons
- **Add Player**: Button (disabled when 4 players reached)

#### Player Row Component
```tsx
<div className="flex items-center justify-between p-3 border rounded">
  <div className="flex items-center gap-3">
    <span className="text-2xl">{emoji}</span>
    <span className="font-medium">{name}</span>
  </div>
  <div className="flex gap-2">
    <Button variant="ghost" size="sm">
      <Edit className="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="sm" disabled={isOnlyPlayer}>
      <Minus className="h-4 w-4" />
    </Button>
  </div>
</div>
```

#### Add/Edit Player Form
- **Name Input**: Text input with validation (1-20 chars)
- **Emoji Picker**: 2×2 grid of emoji buttons
- **Save/Cancel**: Form actions with validation

## Emoji Picker Component

### Structure
```tsx
<div className="grid grid-cols-2 gap-2">
  {emojis.map(emoji => (
    <Button
      key={emoji}
      variant={selected === emoji ? "default" : "outline"}
      size="lg"
      className="h-12 w-12 p-0 text-2xl"
      onClick={() => onSelect(emoji)}
    >
      {emoji}
    </Button>
  ))}
</div>
```

### Available Emojis
- 🐢 Turtle (Player 1 default)
- 🦊 Fox (Player 2 default)
- 🐰 Rabbit (Player 3 default)
- 🦁 Lion (Player 4 default)

## Enhanced Stats Drawer

### Current Structure (Enhance)
```tsx
// Current: Shows 2-player stats
// Epic 1: Dynamic 1-4 player rows
<div className="space-y-4">
  {activePlayers.map(player => (
    <PlayerRow key={player.id} player={player} />
  ))}
  <TotalsRow players={activePlayers} />
</div>
```

### Player Row Component (Enhanced)
```tsx
<div className="flex items-center justify-between p-2 border-b last:border-b-0">
  <div className="flex items-center gap-2">
    <span className="text-lg">{emoji}</span>
    <span className="font-medium">{name}</span>
  </div>
  <div className="flex gap-4 text-sm">
    <span className="text-green-600">🏆 {wins}</span>
    <span className="text-red-600">💥 {crashes}</span>
    <span className="text-blue-600">👣 {steps}</span>
  </div>
</div>
```

### Player Colors
- **Player 1**: `player-badge-p1` (Blue: #3B82F6)
- **Player 2**: `player-badge-p2` (Orange: #F97316)
- **Player 3**: `player-badge-p3` (Green: #10B981)
- **Player 4**: `player-badge-p4` (Purple: #8B5CF6)

## Enhanced Turn Indicator

### Current Implementation (Enhance)
```tsx
// Current: Fixed player numbers
<Badge className={playerColor}>
  <span>{currentPlayer === 1 ? '🐢' : '🦊'}</span>
  Player {currentPlayer}
</Badge>

// Epic 1: Dynamic player names
<Badge className={playerColor}>
  <span>{currentPlayer.emoji}</span>
  {currentPlayer.name}'s Turn
</Badge>
```

## Queue Token Enhancements

### Player-Specific Styling
```tsx
<Badge 
  variant="secondary"
  className={`${playerColor} flex items-center gap-1`}
>
  <span>{direction}</span>
  <span>×{count}</span>
  <span className="text-xs">{emoji}</span>
</Badge>
```

## Responsive Behavior

### Mobile (< 768px)
- Settings modal: Full screen sheet
- Player rows: Stack vertically, compact spacing
- Emoji picker: Larger touch targets (56px × 56px)
- Turn indicator: Single line, truncate names

### Tablet (768px - 1024px)
- Settings modal: Centered dialog with max-width
- Player rows: Standard spacing
- Emoji picker: Standard size (48px × 48px)
- Turn indicator: Two lines, full names

### Desktop (> 1024px)
- Settings modal: Standard dialog size
- Player rows: Horizontal layout when space allows
- Emoji picker: Compact size (40px × 40px)
- Turn indicator: Full layout with all elements

## Accessibility Features

### Screen Reader Support
- Player names announced with emoji descriptions
- Emoji picker: "Select emoji: turtle, fox, rabbit, lion"
- Player stats: "Kimaya: 3 wins, 1 crash, 15 steps"
- Settings modal: "Player management settings"

### Keyboard Navigation
- Tab order: Settings → Player management → Theme → Accessibility
- Emoji picker: Arrow keys to navigate, Enter to select
- Player rows: Tab to edit/remove buttons
- Modal: Escape to close, Enter to save

### Focus Management
- Focus trapped in settings modal
- Focus returns to trigger button when modal closes
- Player changes announce focus updates

---
