// Every piece lives in its own file so they can be reworked one at a time.
// Each one is a whole flow inside a device frame rather than a single
// control, so the frames in ./frames are shared and nothing else is.
//
// Lazy-loaded: the 16 demos used to ship in the one main bundle (517KB,
// over Vite's 500KB warning). Each demo is now its own chunk, fetched when
// the Lab section renders it. Callers must render DEMOS[id] inside
// <Suspense> — see Lab.jsx / LabModal.jsx. Imports are written out
// explicitly (not via a variable) so Vite can split them at build time.

import { lazy } from 'react';

export const DEMOS = {
  'ai-workspace': lazy(() => import('./AiWorkspace.jsx')),
  'figma-canvas': lazy(() => import('./FigmaCanvas.jsx')),
  'agent-run': lazy(() => import('./AgentRun.jsx')),
  'claude-activity': lazy(() => import('./ClaudeActivity.jsx')),
  'watch-ai': lazy(() => import('./WatchAi.jsx')),
  'matic-deck': lazy(() => import('./MaticDeck.jsx')),
  'scroll-stack': lazy(() => import('./ScrollStack.jsx')),
  'sheet-stack': lazy(() => import('./SheetStack.jsx')),
  'send-money': lazy(() => import('./SendMoney.jsx')),
  'command-palette': lazy(() => import('./CommandPalette.jsx')),
  'block-reorder': lazy(() => import('./BlockReorder.jsx')),
  'presence-canvas': lazy(() => import('./PresenceCanvas.jsx')),
  'timeline-editor': lazy(() => import('./TimelineEditor.jsx')),
  'gradient-brush': lazy(() => import('./GradientBrush.jsx')),
  'turn-it-in': lazy(() => import('./TurnItIn.jsx')),
};
