// Every piece lives in its own file so they can be reworked one at a time.
// Each one is a whole flow inside a device frame rather than a single
// control, so the frames in ./frames are shared and nothing else is.

import AiWorkspace from './AiWorkspace.jsx';
import FigmaCanvas from './FigmaCanvas.jsx';
import AgentRun from './AgentRun.jsx';
import ClaudeActivity from './ClaudeActivity.jsx';
import WatchAi from './WatchAi.jsx';
import MaticDeck from './MaticDeck.jsx';
import ScrollStack from './ScrollStack.jsx';
import SheetStack from './SheetStack.jsx';
import SendMoney from './SendMoney.jsx';
import CommandPalette from './CommandPalette.jsx';
import BlockReorder from './BlockReorder.jsx';
import PresenceCanvas from './PresenceCanvas.jsx';
import TimelineEditor from './TimelineEditor.jsx';
import GradientBrush from './GradientBrush.jsx';
import TurnItIn from './TurnItIn.jsx';

export const DEMOS = {
  'ai-workspace': AiWorkspace,
  'figma-canvas': FigmaCanvas,
  'agent-run': AgentRun,
  'claude-activity': ClaudeActivity,
  'watch-ai': WatchAi,
  'matic-deck': MaticDeck,
  'scroll-stack': ScrollStack,
  'sheet-stack': SheetStack,
  'send-money': SendMoney,
  'command-palette': CommandPalette,
  'block-reorder': BlockReorder,
  'presence-canvas': PresenceCanvas,
  'timeline-editor': TimelineEditor,
  'gradient-brush': GradientBrush,
  'turn-it-in': TurnItIn,
};
