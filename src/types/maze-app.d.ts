// types/maze-app.d.ts

/* =========================
   Shared Types & Utilities
   ========================= */

   export type PlayerId = 1 | 2;
   export type Dir = 'U' | 'D' | 'L' | 'R';
   
   export type Cell = Readonly<{ r: number; c: number }>;
   
   export type GameStatus = 'idle' | 'editing' | 'executing' | 'hitWall' | 'reachedGoal';
   export type Speed = 'slow' | 'med';
   
   // Align with PRD terminology
   export type CurrentPlayer = PlayerId;
   
   /** Branded int for 1..10 (runtime guard still recommended) */
   declare const __MagnitudeBrand: unique symbol;
   export type Magnitude1to10 = number & { readonly [__MagnitudeBrand]: 'Magnitude1to10' };
   
   export type CmdToken = Readonly<{ dir: Dir; n: Magnitude1to10 }>;
   
   export type MazeData = Readonly<{
  width: number;   // 10
  height: number;  // 10
  start: Cell;
  goal: Cell;
  /** adjacency: key "r,c" => Set of neighbor keys allowed (no wall) */
  graph: Readonly<Record<string, ReadonlySet<string>>>;
  /** optional identifiers for debugging/randomization */
  mazeId?: string;
  seed?: number;
  /** optional theme labels for start/goal locations */
  theme?: {
    start?: string;
    goal?: string;
  };
}>;
   
   /** Simple event hook for analytics/telemetry (optional) */
   export type GameEvent =
     | { type: 'append_token'; payload: { player: PlayerId; token: CmdToken } }
     | { type: 'undo'; payload: { player: PlayerId } }
     | { type: 'run'; payload: { player: PlayerId; expandedSteps: number } }
     | { type: 'step'; payload: { player: PlayerId } }
     | { type: 'hit_wall'; payload: { player: PlayerId; at: Cell; stepIndex: number } }
     | { type: 'reach_goal'; payload: { player: PlayerId; at: Cell; stepsUsed: number } }
     | { type: 'reset_player'; payload: { player: PlayerId } }
     | { type: 'play_again' }
     | { type: 'speed_change'; payload: { speed: Speed } }
     | { type: 'turn_switch'; payload: { from: PlayerId; to: PlayerId } };
   
   /* =========================
      Component Prop Contracts
      ========================= */
   
   /** <Maze /> */
   export interface MazeProps {
     readonly maze: MazeData;
     readonly positions: Readonly<Record<PlayerId, Cell>>;
     readonly trails: Readonly<Record<PlayerId, readonly Cell[]>>;
     readonly currentPlayer: PlayerId; // Align with PRD terminology
     readonly status: GameStatus;
     /** visual tokens per player (tailwind class or hex) */
     readonly playerColors: Readonly<Record<PlayerId, string>>;
     /** optional HC palette override */
     readonly hcPlayerColors?: Readonly<Record<PlayerId, string>>;
     /** imperative hooks */
     readonly shakeCellRef?: React.MutableRefObject<((cell: Cell) => void) | null>;
     readonly gridRef?: React.RefObject<HTMLDivElement>;
     /** test ids (optional) */
     readonly dataTestId?: Readonly<Record<string, string>>;
   }
   
   /** <TurnCard /> */
   export interface TurnCardProps {
     readonly currentPlayer: PlayerId;
     readonly scores: Readonly<Record<PlayerId, number>>;
     readonly playerColors: Readonly<Record<PlayerId, string>>;
     /** test ids (optional) */
     readonly dataTestId?: Readonly<Record<string, string>>;
   }
   
   /** <Controls /> */
   export interface ControlsProps {
     readonly currentPlayer: PlayerId; // Align with PRD terminology
     readonly status: GameStatus;
     readonly speed: Speed;
   
     // building queue
     readonly onAppendToken: (token: CmdToken) => void;
     readonly onUndo: () => void;
     readonly onResetPlayer: () => void;
   
     // execution
     readonly onRun: () => void;
     readonly onStep: () => void;
     readonly onSpeedChange: (s: Speed) => void;
   
     // disable logic
     readonly canRun: boolean;
     readonly canStep: boolean;
     readonly canUndo: boolean;
   
     // UX toggles
     readonly enableHaptics?: boolean;
     readonly enableSfx?: boolean;
   
     // labels for a11y/localization
     readonly ariaLabels?: Partial<Record<'up'|'down'|'left'|'right'|'run'|'step'|'reset'|'undo'|'speed', string>>;
   
     // test ids
     readonly dataTestId?: Readonly<Record<string, string>>;
   }
   
   /** <HUD /> */
   export interface HUDProps {
     readonly currentPlayer: PlayerId; // Align with PRD terminology
     readonly scores: Readonly<Record<PlayerId, number>>;
     readonly crashes: Readonly<Record<PlayerId, number>>;
     readonly stepsThisRun: number;
     readonly playerColors: Readonly<Record<PlayerId, string>>;
     readonly highContrast: boolean;
   
     readonly onPlayAgain: () => void;
     readonly onToggleHighContrast: (v: boolean) => void;
     readonly onResetScores?: () => void;    // optional policy hook
     readonly persistWins?: boolean;         // if true, keep wins until refresh
   
     readonly dataTestId?: Readonly<Record<string, string>>;
   }
   
   /* =========================
      Effects / Confetti
      ========================= */
   
   export interface ConfettiHandle {
     micro: (opts?: { origin?: { x: number; y: number }; particles?: number }) => void;
     mega: (opts?: { particles?: number }) => void;
   }
   
   /* =========================
      Page State (parent)
      ========================= */
   
   export interface GameState {
     maze: MazeData;
     currentPlayer: PlayerId; // Align with PRD terminology
     positions: Record<PlayerId, Cell>;
     trails: Record<PlayerId, Cell[]>;
     queues: Record<PlayerId, CmdToken[]>;
     scores: Record<PlayerId, number>;
     crashes: Record<PlayerId, number>;
     status: GameStatus;
     speed: Speed;
     highContrast: boolean;
   
     /** limits & control */
     maxExpandedSteps?: number;    // hard cap sum(n) after expansion
     /** cancel an in-flight run via AbortController.signal */
     runAbortCtrl?: AbortController;
   
     /** hooks */
     onEvent?: (e: GameEvent) => void;
     onTurnSwitch?: (next: PlayerId) => void;
     onPlayAgain?: () => void; // Add Play Again functionality
   }
   
   /* =========================
      Executor Contracts (pure)
      ========================= */
   
   export interface SimStepResult {
     next: Cell;
     ok: boolean;                 // false if wall/bounds
     hitWallAt?: number;          // expanded step index (1-based) when failed
     reachedGoal?: boolean;
   }
   
   export type SimulateFn = (maze: MazeData, from: Cell, dir: Dir) => SimStepResult;
   
   export type RunQueueFn = (args: {
     queue: readonly CmdToken[];
     from: Cell;
     tickMs: number;
     simulate: SimulateFn;
     signal?: AbortSignal;                 // cancel mid-run
     maxRunMs?: number;                    // optional safety cutoff
     onTokenStart?: (token: CmdToken, tokenIndex: number) => void;
     onStep: (cell: Cell) => void;         // each valid expanded step
     onError: (k: number, cell: Cell) => void;
     onGoal: (cell: Cell) => void;
     onTokenEnd?: (token: CmdToken, tokenIndex: number) => void;
     onDone: () => void;                   // finished queue without goal/error
   }) => void;
   
   /* =========================
      Maze Helpers (suggested)
      ========================= */
   
   export type MazeHelpers = {
     key: (cell: Cell) => string;
     parseKey: (k: string) => Cell;
     neighbors: (maze: MazeData, cell: Cell) => Cell[];
     inBounds: (maze: MazeData, cell: Cell) => boolean;
   };
   
   /* =========================
      Guards (runtime, optional)
      ========================= */
   
   /** Narrow number to Magnitude1to10 at runtime */
   export function asMagnitude1to10(n: number): Magnitude1to10 {
     if (Number.isInteger(n) && n >= 1 && n <= 10) return n as Magnitude1to10;
     throw new Error(`Invalid magnitude ${n}; expected integer 1..10`);
   }
   