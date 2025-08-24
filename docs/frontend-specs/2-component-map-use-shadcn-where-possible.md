# 2) Component Map (use shadcn where possible)

* **Cards/Containers**
  * `Card`, `CardHeader`, `CardTitle`, `CardContent`
  * `Dialog` (for settings modal) shadcn@canary ✅
  * `Sheet` (alternative to dialog for mobile) shadcn@canary ✅

* **Buttons & Inputs**
  * `Button` (variants: `default`, `secondary`, `destructive`, `ghost`)
  * `Switch` (for High Contrast, Reduced Motion, etc.)
  * `Select` (Speed, Player Count)
  * `Input` (Player names) shadcn@canary ✅
  * `Tooltip` (labels for pre-readers' helpers)
  * `Badge` (Player indicators, step count chips)
  * `Separator`
  * `Toast` (use shadcn toast for "Bumped a wall at step N")

* **Navigation & Layout**
  * `Tabs` (Settings modal tabs) shadcn@canary ✅
  * `TabsList`, `TabsTrigger`, `TabsContent` shadcn@canary ✅

* **Feedback**
  * **Magic UI**: `Confetti` component (micro on valid step, mega on win)

* **Custom Components**
  * `EmojiPicker` (grid of 4 emoji options: 🐢🐰🦊🦁)
  * `PlayerRow` (individual player stats row with emoji + name + stats)
  * `PlayerManagement` (add/edit/remove players interface)
  * `SettingsModal` (parent interface with tabs)

* **Icons**
  * `lucide-react`: `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `Undo2`, `Play`, `StepForward`, `RotateCcw`, `Trophy`, `Shuffle`, `Settings`, `Plus`, `Minus`, `Edit`, `User`

---

