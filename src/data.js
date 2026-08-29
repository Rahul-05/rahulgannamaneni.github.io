// ── Placeholder content ─────────────────────────────────────────────
// All copy + images here are temporary. Real content gets transferred
// from the old portfolio (rahulraog.com) later.

// The hero ring shows what I do, not project thumbnails.
// The hero ring shows what I do. Each card carries a `shape` whose drawing
// actually means something for that skill, see CardArt.jsx.
export const RING_CARDS = [
  {
    title: 'Product Design',
    kind: 'Discovery → Ship',
    note: 'Framing the problem',
    shape: 'layers',
  },
  {
    title: 'UX Engineering',
    kind: 'Design × Code',
    note: 'Specs that survive build',
    shape: 'bridge',
  },
  {
    title: 'Design Engineering',
    kind: 'Systems',
    note: 'Tokens, components, docs',
    shape: 'modules',
  },
  {
    title: 'Interaction Design',
    kind: 'Behaviour',
    note: 'States, gestures, feedback',
    shape: 'ripple',
  },
  {
    title: 'Motion & Animation',
    kind: 'Motion · CSS',
    note: 'Timing, easing, choreography',
    shape: 'easing',
  },
  { title: 'User Research', kind: 'Evidence', note: 'Interviews to insight', shape: 'lens' },
  { title: 'Design Systems', kind: 'Scale', note: 'One language, many surfaces', shape: 'tokens' },
  { title: 'Prototyping', kind: 'Proof', note: 'Real code, real feel', shape: 'wireframe' },
  {
    title: 'Frontend Engineering',
    kind: 'React · TS',
    note: 'Ship it properly',
    shape: 'brackets',
  },
  { title: 'Visual Design', kind: 'Craft', note: 'Type, grid, colour', shape: 'mixing' },
];

export const TESTIMONIALS = [
  {
    quote:
      'Rahul does the design and then builds it, which is rarer than it sounds and changes how fast a team can move. He would come out of a shaping session and have something running the same week, not a mock but the real thing, and it looked finished. The handover between design and engineering is where our work normally loses a fortnight. With him there was no handover.',
    name: 'Shri Hulisandra',
    role: 'Principal Engineer',
    place: 'CPP Investments',
    logo: '/work/shared/cpp-investments.webp',
    logoInvert: true,
  },
  {
    quote:
      'What struck me while working with Rahul was how much research he did before proposing anything. He spent real time with the teachers and the children, and came back with several directions rather than one, each answering a different reading of what we had told him. As a researcher I am used to that kind of divergence taking weeks and arriving as a document. He brought it as something we could try in the room.',
    name: 'Melanie Killen',
    role: 'Founder, DIY Teachers · Distinguished University Professor',
    place: 'University of Maryland',
    // the square globe rather than the full lockup: the wordmark beside it
    // is illegible at the 27px these cards give a mark
    logo: '/work/shared/university-of-maryland-mark.webp',
  },
  {
    quote:
      "I'm delighted to endorse Rahul as an exceptional UX intern. His infectious enthusiasm brought a dynamic energy to our team. He consistently impressed us with innovative approaches, pushing boundaries and elevating our projects. Rahul's dedication to excellence and proactive mindset were truly commendable. His creative thinking and collaborative nature make him an asset to any team.",
    name: 'Rajarshi Banerjee',
    role: 'Senior Product Designer, B2B SaaS',
    place: 'Keka HR',
    logo: '/work/keka-marketplace/logo.webp',
  },
  {
    quote:
      "During our collaboration at Keka, his UI/UX design skills proved to be invaluable, particularly in our successful completion of significant projects within the Core HR module. Rahul's designs consistently demonstrated an impressive ability to combine aesthetics and functionality, resulting in outstanding user experiences. His effective communication and collaboration skills further enriched our team dynamics. The final results consistently reflected his dedication to delivering top-notch work.",
    name: 'Zoeb Nomi',
    role: 'AI Product Manager, LLM & Agent Evaluation',
    place: 'Keka HR',
    logo: '/work/keka-marketplace/logo.webp',
  },
];

export const SCATTER_NOTES = [
  {
    text: 'Placeholder note, a short scribbled review that sits tilted next to the main testimonial card, exactly like little paper notes pinned to a board.',
    author: 'Temp Author',
    rotate: 8,
  },
  {
    text: 'Second placeholder note with slightly different length so the pile of tilted papers feels organic and hand-placed rather than generated.',
    author: 'Temp Author 2',
    rotate: -6,
  },
];

// Six projects, browsed one at a time in the Work section. Copy is
// placeholder until the real case studies are transferred across.
// Six projects. `roles` and `stack` are icon keys resolved by TechIcon.
// Projects 03-06 are real work carried over from the previous portfolio
// (github.com/Rahul-05/rahulgannamaneni.github.io). 01 and 02 are still
// placeholders. `sections` names a per-project case study in caseContent.js;
// anything without one falls back to the generic template.
export const PROJECTS = [
  {
    n: '01',
    slug: 'data-product-marketplace',
    title: 'Data portal and data factory',
    kicker: 'Platform, Discovery',
    year: '2026',
    company: 'CPP Investments',
    logo: '/work/shared/cpp-investments.webp',
    // a flat navy wordmark, so it inverts cleanly; the colourful
    // marks on the other cards must not be touched
    logoInvert: true,
    accent: '#2f7de1',
    heroShape: 'modules',
    // the card leads with the branded cover; the case study still opens
    // on the screenshot, which is the thing worth seeing
    card: '/work/data-product-marketplace/cover.webp',
    cover: '/work/data-product-marketplace/browse.webp',
    summary:
      'One place to find data across the firm, a reason to trust it, and the pipelines that keep it current.',
    industry: 'Finance',
    tags: ['Data Visualisation', 'Governance', 'Lineage'],
    roles: [
      { label: 'UX Research', icon: 'research' },
      { label: 'Design', icon: 'design' },
      { label: 'Frontend', icon: 'frontend' },
      { label: 'Backend', icon: 'backend' },
    ],
    stack: ['figma', 'figma-make', 'angular', 'typescript', 'aws', 'neptune', 'dynamodb'],
    pinned: [
      'One front door to every department’s data, searched in business language rather than table names',
      'A quality score and a scorecard on every product, so trust is a number a stranger can read',
      'Lineage and impact drawn as a graph, so what breaks if this changes is answered in a glance instead of a week',
      'Entitlements, ownership and usage on the same page as the data itself',
      'The pipelines that build it live behind the same door, so the product and its machinery are one click apart',
      'Other internal teams started asking to be added to the catalogue',
    ],
    sections: 'portal',
  },
  {
    n: '02',
    slug: 'ai-agent-usage-dashboard',
    title: 'AI agent and usage dashboard',
    kicker: 'Assistant, Observability',
    year: '2026',
    company: 'CPP Investments',
    logo: '/work/shared/cpp-investments.webp',
    // a flat navy wordmark, so it inverts cleanly; the colourful
    // marks on the other cards must not be touched
    logoInvert: true,
    accent: '#5a9ee0',
    heroShape: 'wireframe',
    // the card leads with the branded cover; the case study still opens
    // on the screenshot, which is the thing worth seeing
    card: '/work/ai-agent-usage-dashboard/cover.webp',
    cover: '/work/ai-agent-usage-dashboard/dashboard.webp',
    summary:
      'An agent that asks before it answers, and a dashboard that turned those questions into the team’s research.',
    industry: 'Finance',
    tags: ['Data Visualisation', 'Observability', 'Governance'],
    roles: [
      { label: 'UX Research', icon: 'research' },
      { label: 'Design', icon: 'design' },
      { label: 'Frontend', icon: 'frontend' },
      { label: 'Backend', icon: 'backend' },
    ],
    stack: [
      'figma',
      'figma-make',
      'angular',
      'typescript',
      'aws',
      'quicksight',
      'neptune',
      'dynamodb',
    ],
    pinned: [
      'The agent narrows what you meant before it answers, because a wrong reading answered confidently is worse than no answer',
      'Clarifying turns are concrete choices, not an open prompt, so they cost a second not a sentence',
      'Debug mode shows the SQL, the metadata it leaned on and the assumptions it made',
      'The dashboard answers a different question for a different person: where is this used, what is it asked, what is failing',
      'Clusters of poor answers pointed straight at the metadata behind them, turning complaints into an owned backlog',
      'Adoption arguments got settled with the department split rather than with opinion',
    ],
    sections: 'agent',
  },
  {
    n: '03',
    slug: 'data-ingestion-flow',
    title: 'Data product ingestion',
    kicker: 'Enterprise, Pipelines',
    year: '2026',
    company: 'CPP Investments',
    logo: '/work/shared/cpp-investments.webp',
    // a flat navy wordmark, so it inverts cleanly; the colourful
    // marks on the other cards must not be touched
    logoInvert: true,
    accent: '#3f8fd6',
    heroShape: 'bridge',
    // the card leads with the branded cover; the case study still opens
    // on the screenshot, which is the thing worth seeing
    card: '/work/data-ingestion-flow/cover.webp',
    cover: '/work/data-ingestion-flow/onboarding-list.webp',
    summary:
      'The form that replaced the spreadsheet: give it a view name, it fills in every column and fails loudly first.',
    industry: 'Finance',
    tags: ['Secure Dataflow', 'Governance', 'Data Modelling'],
    roles: [
      { label: 'UX Research', icon: 'research' },
      { label: 'Design', icon: 'design' },
      { label: 'Frontend', icon: 'frontend' },
      { label: 'Backend', icon: 'backend' },
    ],
    stack: ['figma', 'figma-make', 'angular', 'typescript', 'aws', 'neptune', 'dynamodb'],
    pinned: [
      'Give the form a view name and it derives every underlying table, column and type from the catalogue',
      'People supply only what a person actually knows: names, descriptions, ownership, classification',
      'It fails loudly and specifically: the view name that is missing, not “invalid input”',
      'Errors surface during entry instead of weeks later in someone else’s report',
      'A flow expression DSL with a visual read, so the transformation is reviewable by people who will not read code',
      'Approvers read a diff against the last version rather than a document',
    ],
    sections: 'ingestion',
  },
  {
    n: '04',
    slug: 'ai-keyword-domain-model',
    title: 'Conceptual domain model',
    kicker: 'Taxonomy, Semantics',
    year: '2026',
    company: 'CPP Investments',
    logo: '/work/shared/cpp-investments.webp',
    // a flat navy wordmark, so it inverts cleanly; the colourful
    // marks on the other cards must not be touched
    logoInvert: true,
    accent: '#6fb0e8',
    heroShape: 'tokens',
    // the card leads with the branded cover; the case study still opens
    // on the screenshot, which is the thing worth seeing
    card: '/work/ai-keyword-domain-model/cover.webp',
    cover: '/work/ai-keyword-domain-model/relationships.webp',
    summary:
      'Getting a firm to agree what its own words mean, in sessions with the stewards who own the vocabulary.',
    industry: 'Finance',
    tags: ['Taxonomy', 'Data Modelling', 'Governance'],
    roles: [
      { label: 'UX Research', icon: 'research' },
      { label: 'Design', icon: 'design' },
      { label: 'Frontend', icon: 'frontend' },
      { label: 'Backend', icon: 'backend' },
    ],
    stack: ['figma', 'figma-make', 'angular', 'typescript', 'aws', 'neptune', 'dynamodb'],
    pinned: [
      'Built in working sessions with the domain stewards who own the vocabulary, not handed to them',
      'Concepts, the terms that express them, and typed links between the two',
      'Cardinality on every link, which is what makes the model checkable rather than decorative',
      'The editor validates all 58 relationships instead of leaving a human to audit dropdowns',
      'Every concept got an owner, so a question about a word has somewhere to go',
      'This is the vocabulary the agent reasons over, which is why its answers land on the right product',
    ],
    sections: 'cdm',
  },
  {
    n: '05',
    title: 'Guide',
    slug: 'guide',
    heroShape: 'lens',
    company: 'Guide',
    logo: '/work/guide/logo.webp',
    accent: '#00bae2',
    kicker: 'Healthcare, Capstone',
    tagline: 'Search and tracking for therapy between sessions',
    summary:
      'An LMS that pivoted mid-project to mental health: therapists assign, patients see what comes next.',
    industry: 'Healthcare',
    tags: ['Education', 'Mental Health', 'LMS'],
    roles: [
      { icon: 'design', label: 'Product Design' },
      { icon: 'research', label: 'Research' },
      { icon: 'system', label: 'Product Strategy' },
    ],
    stack: ['figma', 'miro', 'design-system', 'prototype'],
    pinned: [
      'Started as a corporate LMS with no real search: people browsed endlessly to find a 90-second video',
      'Pivoted to mental health eight months in, so the users changed entirely and the research had to earn its place again',
      'Ended as a dual interface: therapists assign and track, patients see what to do between sessions',
      'I led design across sprints and drove discovery, not just the screens',
      'A component set so the two audiences shared one product rather than forking it',
      'Eight months, six people, one audience change survived',
    ],
    year: '2025',
    outcome: 'Dual therapist and patient interface',
    cover: '/work/guide/cover.webp',
    sections: 'guide',
    href: '#',
  },
  {
    n: '06',
    title: 'Keka Marketplace',
    slug: 'keka-marketplace',
    heroShape: 'bridge',
    company: 'Keka HR',
    logo: '/work/keka-marketplace/logo.webp',
    accent: '#f100cb',
    kicker: 'HR Tech, Internship',
    tagline: 'Making integrations visible, controllable and safe',
    summary:
      'Reworking how companies see, control and secure their integrations, for a catalogue growing from 5 to over 25.',
    industry: 'HR Tech',
    tags: ['Marketplace', 'Integrations', 'Enterprise'],
    roles: [
      { icon: 'research', label: 'User Research' },
      { icon: 'design', label: 'UX Design' },
    ],
    stack: ['figma', 'miro', 'design-system', 'prototype'],
    pinned: [
      'Keka is one of India’s larger HRMS providers; this is the marketplace inside it',
      'Reworked how companies discover, connect, control and secure third-party integrations',
      'Designed for a catalogue going from five integrations to more than twenty-five in a year',
      'The card had to survive that growth, not just look right at five',
      'Permissions and security state made visible on the integration itself',
      'Ten weeks, as a UX design intern, shipped into the product',
    ],
    year: '2023',
    outcome: 'Scales from 5 to 25+ integrations',
    cover: '/work/keka-marketplace/cover.webp',
    sections: 'keka',
    href: '#',
  },
  {
    n: '07',
    title: 'Apoyo Smart Helmet',
    slug: 'apoyo-smart-helmet',
    heroShape: 'ripple',
    accent: '#ff8709',
    kicker: 'Wearable, Group Project',
    tagline: 'Navigation projected onto the visor, eyes on the road',
    summary:
      'A helmet that projects navigation onto the visor, so riders on tight windows stop checking a phone mid-road.',
    industry: 'Mobility',
    tags: ['Wearable', 'Safety', 'Hardware'],
    roles: [
      { icon: 'research', label: 'User Research' },
      { icon: 'design', label: 'UX Design' },
    ],
    stack: ['figma', 'miro', 'cad', 'prototype'],
    pinned: [
      'A smart helmet that projects navigation onto the visor, with a companion app',
      'For delivery riders on tight windows, who check a phone at junctions, exactly where looking away costs most',
      'The finding that shaped it: a rider does not need more information, they need it where looking costs nothing',
      'Field of view tested on a physical rig to decide what the visor is allowed to show and where',
      'Handedness and glance cost drove the layout more than any visual preference',
      'Group project, three of us, three months',
    ],
    year: '2022',
    outcome: 'Projection concept validated with riders',
    cover: '/work/apoyo-smart-helmet/product.webp',
    sections: 'helmet',
    href: '#',
  },
  {
    n: '08',
    title: 'Space',
    slug: 'space-adhd-app',
    heroShape: 'layers',
    accent: '#9d95ff',
    kicker: 'Accessibility, Solo Project',
    tagline: 'Helping ADHD children run their own day',
    summary:
      'A dual-device app for children with ADHD: they plan and finish tasks, parents support without standing over them.',
    industry: 'Education',
    tags: ['Accessibility', 'ADHD', 'Family'],
    roles: [
      { icon: 'research', label: 'User Research' },
      { icon: 'design', label: 'UX Design' },
      { icon: 'prototype', label: 'Prototyping' },
    ],
    stack: ['figma', 'miro', 'prototype'],
    pinned: [
      'A dual-device app for children with ADHD and the parent supporting them',
      'Supports executive function, meaning planning, starting and switching, rather than trying to supply motivation',
      'The finding that changed the design: rewards a parent can bend do not hold',
      'So the structure sits with the app, and the parent gets to stay the ally rather than the enforcer',
      'The child plans and completes; the parent sees progress without standing over them',
      'Fourteen interviews, two weeks, solo',
    ],
    year: '2022',
    outcome: '14 interviews with parents and children',
    cover: '/work/space-adhd-app/cover.webp',
    sections: 'space',
    href: '#',
  },
];

// ── Graphics & Animation ────────────────────────────────────────────
// Each entry is a slot. `kind` drives the filter chips; `slot` names the
// placeholder so a real canvas, SVG or embed can be dropped in later
// without touching the layout.
export const LAB_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI' },
  { id: 'ios', label: 'iOS' },
  { id: 'web', label: 'Web app' },
  { id: 'gesture', label: 'Gesture' },
  { id: 'system', label: 'Interface systems' },
  { id: 'motion', label: 'Animation' },
];

// Each entry maps to a component of the same id in components/lab/. Every one
// is a complete flow running inside a device frame at real device dimensions,
// not an isolated control -- the piece is the hero of the card, and
// `sections` (three at most) is what the popup shows underneath it.
export const LAB_ITEMS = [
  {
    id: 'ai-workspace',
    title: 'One assistant, three surfaces',
    note: 'Prose when prose is enough, a chart when the question is a comparison, and a document off to the side when the output is too long for a thread.',
    kinds: ['ai', 'web', 'system'],
    tools: ['Figma', 'Code'],
    sections: [
      {
        k: 'The wait is the design problem',
        v: 'Between pressing enter and the first token there are a couple of seconds of nothing, and what fills them decides whether the product feels like it is working or hanging. The reply arrives in stages that each say something true, what it is reading, what it chose to look up, what that returned, and only then the text, word by word rather than character by character, because character streaming is a typewriter costume and word streaming is roughly what generation actually looks like.',
      },
      {
        k: 'Choosing the encoding is answering',
        v: 'A question about composition gets stacked bars; a ranking question gets sorted bars with the answer coloured out of its own context. Handing back the same chart for both would be a chart library, not an answer, so the piece names the encoding it picked above every chart it draws.',
      },
      {
        k: 'Long output leaves the thread',
        v: 'A draft in a message list cannot be edited, cannot be seen whole, and a revision means re-reading from the top to find what moved. Asking for the note opens a third column, the grid template itself animates so the conversation re-flows the way a real split does, and selecting a paragraph in that column is what addresses the chat, with the edit landing as a marked diff in place.',
      },
    ],
  },
  {
    id: 'figma-canvas',
    title: 'An AI with its own cursor',
    note: 'It works in the canvas beside you, moves to a frame, selects it, drags it into the row, draws the connector. No shimmer, no takeover.',
    kinds: ['ai', 'web', 'motion'],
    tools: ['Figma', 'Code'],
    sections: [
      {
        k: 'What is wrong with generative loading',
        v: 'Every generative design tool has the same tell: you ask, the artboard is taken away, a shimmer plays, a finished result appears. You cannot see what it decided, cannot stop it halfway, and have no idea which frames it touched. It is a slot machine with a spinner on it.',
      },
      {
        k: 'A second cursor instead',
        v: 'The assistant gets a cursor on the same board and works the way you would: travels to a frame, selects it, drags it into place, moves on. Its selection shows in the layer panel in its own colour next to yours. Everything it does is a thing you could have done, which is also what makes everything it does undoable.',
      },
      {
        k: 'The motion is the argument',
        v: 'A cursor that teleports reads as a script. This one eases in with a slight overshoot, pauses for a beat before it commits to a grab, and rests between actions, that hesitation before each grab is doing more work than anything else in the piece.',
      },
    ],
  },
  {
    id: 'agent-run',
    title: 'An agent showing its work',
    note: 'A plan that is written as it is decided, one step that fails and is retried in public, and a run you can audit backwards.',
    kinds: ['ai', 'web', 'system'],
    tools: ['After Effects', 'Code'],
    sections: [
      {
        k: 'A new interaction problem',
        v: 'What does a product look like while it thinks for longer than a person will sit still? Nobody had to answer that before agents. A spinner is not an answer, and a fake progress bar is worse.',
      },
      {
        k: 'Show the dead ends',
        v: 'Steps arrive as they are decided rather than being declared up front, each names the thing it actually touched, and one hits a paywall and falls back in public. An agent that only ever shows success is asking to be trusted; one that shows a failure and recovers is handing you the evidence to decide.',
      },
      {
        k: 'Auditable afterwards',
        v: 'Every step stays expandable once the run is over, which is the only real reason to watch a progress list. The running gradient stops when the work does, a decorative sweep that runs forever stops meaning “busy”.',
      },
    ],
  },
  {
    id: 'claude-activity',
    title: 'An agent as a Live Activity',
    note: 'A four-minute run reported from the island, one number when compact, a pushing log when open. Three runs, because the shape has to hold.',
    kinds: ['ai', 'ios', 'motion', 'system'],
    tools: ['After Effects', 'Figma', 'Code'],
    sections: [
      {
        k: 'The right home for a long run',
        v: 'An agent that runs for four minutes has exactly the shape Live Activities were designed for: something you started, that is still going, that you want to glance at without opening anything. A notification per step would be unusable and a spinner inside an app you have to open is worse.',
      },
      {
        k: 'Compact is 110 points',
        v: 'That is room for one number and one word, so the entire run has to compress to “which step, how far”, and everything else has to earn its way into the expanded state. Getting that compression right is most of the work; the morph is the easy half.',
      },
      {
        k: 'The log pushes, it does not overwrite',
        v: 'New lines arrive from below and older ones recede rather than disappearing, so the run reads as a stack of things that happened instead of a label being rewritten. Only the last three are kept, a scrolling list inside an island would be a joke. Three different runs share the shape: a routine that mostly succeeds, a code task that finds real failures, and research whose steps are all different lengths.',
      },
    ],
  },
  {
    id: 'watch-ai',
    title: 'An assistant on a wrist',
    note: 'One line, one number at glance size, and two actions. The whole problem at 198pt is subtraction.',
    kinds: ['ai', 'ios', 'motion'],
    tools: ['Figma', 'Code'],
    sections: [
      {
        k: 'Two seconds of budget',
        v: 'A hedged four-paragraph answer is merely annoying on a phone. On a wrist held up mid-stride it is useless, because the arm drops after about two seconds. Everything here is built to fit inside that.',
      },
      {
        k: 'The number is the answer',
        v: 'What was asked for is “34 min”, so that is what is set at display size and everything else is a single supporting line. Putting the caveats first, the way a chat interface does, would mean the one useful token never gets read.',
      },
      {
        k: 'Follow-ups are actions',
        v: 'On a watch the next thing you want is to do something, not to know more, so the two buttons are Directions and Remind me rather than suggested questions. The waveform only moves while it is actually listening, because an idle animation that looks live teaches people to ignore it.',
      },
    ],
  },
  {
    id: 'matic-deck',
    title: 'Card deck, ported from Xcode',
    note: 'A SwiftUI prototype I built, running in the browser at the same device size with the same layout numbers and springs.',
    kinds: ['ios', 'gesture', 'motion'],
    tools: ['SwiftUI', 'Figma', 'Code'],
    sections: [
      {
        k: 'What it is',
        v: 'Three cards at rest in a deck. Tapping one grows it to a 558pt sheet while the other two tuck into a strip at the bottom edge; dragging it down puts the whole deck back. Originally built in SwiftUI for an interview prototype and ported here rather than re-approximated.',
      },
      {
        k: 'One interpolation, not three',
        v: 'Every card has a rest placement and a target placement, and a single progress value moves the deck between them. The focused card growing, the other two sliding into the strip and the rotations unwinding are the same animation, so they cannot fall out of step. The layout constants, 342pt wide, 97pt collapsed, the −4/0/−2 degree rest rotations, the sub-pixel x offsets, are the ones from the Xcode project.',
      },
      {
        k: 'The dismissal',
        v: 'SwiftUI commits a drag on predictedEndTranslation, so a fast flick releases from further up the screen than a slow drag. Velocity projection reproduces that. While the card travels down it passes behind the strip rather than over it, which is what makes the deck read as one object being put back rather than a sheet closing.',
      },
    ],
  },
  {
    id: 'scroll-stack',
    title: 'Cards that scroll up and stay',
    note: 'Each card parks at the top, compresses to a header, and the next one slides underneath, so scrolling builds a stack of everything you passed.',
    kinds: ['ios', 'gesture', 'motion'],
    tools: ['Figma', 'Code'],
    sections: [
      {
        k: 'The idea',
        v: 'A list where nothing leaves. As a card reaches the top of the viewport it stops, collapses to a 62pt header and the next card rides up beneath it, so the top of the screen accumulates a record of where you have been instead of throwing it away.',
      },
      {
        k: 'Why not sticky',
        v: 'position: sticky can pin a header but it cannot compress one, and it cannot tell the cards still below that the stack above them has grown. Here every card derives its own top, height and body opacity from a single scroll value, so the compression, the parking and the depth of the cards underneath all stay in agreement.',
      },
      {
        k: 'The scroll itself',
        v: 'Hand-rolled, because the piece needs to overscroll: past either end the travel is damped to a third, and releasing runs a decaying fling that eases back inside the bounds rather than stopping dead.',
      },
    ],
  },
  {
    id: 'sheet-stack',
    title: 'Sheets that stack in depth',
    note: 'Pushing a sheet does not cover the last one, it pushes it back, so the way out stays visible and dragging unwinds the whole stack at once.',
    kinds: ['ios', 'gesture', 'system'],
    tools: ['Figma', 'Code'],
    sections: [
      {
        k: 'The problem',
        v: 'Modals that fully cover what came before lose the thread: two sheets deep, nobody knows how far in they are or what closing will return them to. Pushing the previous sheet back in depth instead of hiding it keeps the trail readable.',
      },
      {
        k: 'One drag, whole stack',
        v: 'Dragging the front sheet down does not just move that sheet. The amount it has travelled is fed back as a negative step into every sheet behind it, so they come forward by exactly what the front one gives up. Release halfway and the stack is still coherent rather than caught between two states.',
      },
    ],
  },
  {
    id: 'send-money',
    title: 'Hold to send money',
    note: 'A hold instead of a tap, and a running undo window instead of an “are you sure?” nobody reads.',
    kinds: ['ios', 'gesture', 'motion'],
    tools: ['Figma', 'Code'],
    sections: [
      {
        k: 'Hold, not tap',
        v: 'A tap can be a mis-tap; 900ms of continuous contact cannot. The bar fills in real time with no easing on it, because the fill is the elapsed time, smoothing it would lie about how much longer the finger has to stay down. Letting go early reads as a cancel rather than a failure.',
      },
      {
        k: 'Undo beats confirm',
        v: '“Are you sure?” is answered reflexively and protects nobody, people have dismissed it before they have read it. Ten seconds of a visibly running countdown with a real Undo protects the only case that matters, which is realising immediately.',
      },
      {
        k: 'The money is what moves',
        v: 'On send, the amount itself flies up into the recipient chip and shrinks. The transfer is the thing being confirmed, so the transfer is the thing that animates, not a spinner standing in for it.',
      },
    ],
  },
  {
    id: 'command-palette',
    title: 'Command palette with real ranking',
    note: 'Subsequence matching, boundary-weighted scoring, and a mode that switches mid-keystroke. Type “chpg”, or “>” to run something.',
    kinds: ['web', 'system'],
    tools: ['Code'],
    sections: [
      {
        k: 'The overlay is the easy half',
        v: 'What makes a palette usable is ranking. This one matches subsequences rather than substrings, so “chpg” finds Changelog page, and it scores gaps: letters that start a word are nearly free, letters in the middle of one cost. The thing you meant comes first instead of the shortest string that happens to contain the letters.',
      },
      {
        k: 'Mode without a mode switch',
        v: 'Typing “>” turns the palette from a search into a command runner mid-keystroke, different pool, different chip, different result semantics, with no separate screen and nothing to dismiss. Matched characters are marked in the results so the ranking is legible rather than magic.',
      },
      {
        k: 'Keyboard first',
        v: 'Arrows and ⌃N/⌃P move a selection that survives the list re-ranking underneath it, Enter commits, Escape closes. The selection is clamped on every re-rank, so typing another letter never leaves the highlight pointing at nothing.',
      },
    ],
  },
  {
    id: 'block-reorder',
    title: 'Document blocks that reflow',
    note: 'Drag a block and the gap opens where it will land, continuously, not an insertion line appearing between two rows.',
    kinds: ['web', 'gesture', 'motion'],
    tools: ['Code'],
    sections: [
      {
        k: 'What it is doing',
        v: 'An editor with mixed block heights, headings, paragraphs, a quote, list items, an image. Grabbing a handle lifts that block and the rest of the document reflows around where it would land, so you are looking at the result before you commit rather than at a hint about it.',
      },
      {
        k: 'Measured once',
        v: 'On pointer down the layout is measured into a table of heights and tops, and from then on every neighbour’s displacement is arithmetic on that table rather than a re-measure. No FLIP pass, no library. The neighbours ease; the dragged block does not, because anything that eases under a cursor reads as lag.',
      },
    ],
  },
  {
    id: 'presence-canvas',
    title: 'Multiplayer canvas',
    note: 'Three other people on the same board, cursors, attributed selections, and edits that arrive as motion rather than as new state.',
    kinds: ['web', 'system', 'motion'],
    tools: ['Code'],
    sections: [
      {
        k: 'Presence is attribution',
        v: 'Cursors alone do not make a canvas feel shared. What does is that every change is owned: the selection ring takes the peer’s colour before their shape moves, their name rides their cursor, and a shape they are holding is visibly not yours to grab.',
      },
      {
        k: 'Peers that do not read as bots',
        v: 'Each peer runs its own eased path with pauses written into it, because anything moving at constant speed and never hesitating is identifiable as a script within about two seconds. Their edits are interpolated rather than set, so a shape they move arrives instead of teleporting.',
      },
    ],
  },
  {
    id: 'timeline-editor',
    title: 'Edit timeline with magnets',
    note: 'Clips snap to every other clip’s edges and to the playhead, and draw a guide at whatever they locked to.',
    kinds: ['web', 'gesture', 'system'],
    tools: ['After Effects', 'Code'],
    sections: [
      {
        k: 'Why snapping exists',
        v: 'Placing a cut frame-exactly with a mouse is not possible, so the tool has to guess. Candidates are every other clip’s head and tail, the playhead and zero; both edges of the dragged clip are tested against all of them.',
      },
      {
        k: 'Pixels, not seconds',
        v: 'The magnet radius is measured in screen pixels rather than in time, so the pull feels identical however far you are zoomed in, a threshold in seconds becomes uselessly strong when zoomed out and useless when zoomed in.',
      },
      {
        k: 'Say what you locked to',
        v: 'A guide is drawn at whatever edge won. Without it, a snap is indistinguishable from the clip refusing to go where you put it, which is the single most common complaint about editors that snap.',
      },
    ],
  },
  {
    id: 'gradient-brush',
    title: 'Paint the button to ship',
    note: 'A release button you have to paint across before it fires. Deliberate friction, and a stroke that shows how far you got.',
    kinds: ['web', 'gesture', 'motion'],
    tools: ['After Effects', 'Code'],
    sections: [
      {
        k: 'Friction on purpose',
        v: 'Some actions should be hard. A confirm dialog is the lazy version of that and people click through it by reflex; painting the button takes about a second of continuous attention and cannot happen by accident. Unlike a hold-to-confirm ring it also leaves something behind, so an abandoned attempt is visible.',
      },
      {
        k: 'The curl',
        v: 'The brush wanders off the pointer’s own line on a sine, so the stroke has a wrist in it rather than being a straight swipe, and the gradient advances its hue along the x axis, the button is a different colour depending on where you crossed it.',
      },
      {
        k: 'Measuring coverage',
        v: 'Reading pixels back with getImageData on every pointer move would be the slowest possible way to answer a question this rough. Instead the stroke marks cells on a 26×6 grid and coverage is a set size, which is exact enough and effectively free.',
      },
    ],
  },
  {
    id: 'turn-it-in',
    title: 'Turning in an assignment',
    note: 'Press submit and the whole window plays, streamers, a lift, a wash, then settles into a permanent receipt.',
    kinds: ['web', 'motion'],
    tools: ['After Effects', 'Figma', 'Code'],
    sections: [
      {
        k: 'Why celebrate at all',
        v: 'Handing work in is the end of days of effort and it feels irreversible even when it is not. A button changing from “Turn in” to “Turned in” is technically complete information and emotionally nothing. The animation is the acknowledgement.',
      },
      {
        k: 'Sized to the moment',
        v: 'It plays once, takes under two seconds, and cannot be re-triggered by accident. The card lifts and gains a shadow, a green wash crosses the window and fades, and streamers fly up and over rather than raining down, a fountain of dots reads as a game, a lift reads as an acknowledgement.',
      },
      {
        k: 'It leaves a receipt',
        v: 'Once the streamers are gone the state is permanent and boring: a timestamp, a status pill that changed colour, and an undo. The celebration is not the confirmation; it just carries it.',
      },
    ],
  },
];

export const RESUME_URL =
  'https://drive.google.com/file/d/1LEDEb0LSjwRhwep3wFS4TuRdxn9wjsDj/view?usp=sharing';

// Testimonials sits between About and Contact in the scroll order but is
// intentionally absent here: it is something you come across, not a
// destination someone navigates to.
export const NAV_LINKS = [
  { label: 'Work', index: 1 },
  { label: 'Interaction & Animation', index: 2 },
  { label: 'About', index: 3 },
  { label: 'Contact', index: 5 },
]; // About, written from the same disciplines the hero ring lists.
export const ABOUT = {
  lead: "I'm a product designer and UX engineer. I work end to end: framing the problem, designing the system, then building it in production code rather than handing off a picture of it.",
  body: 'That middle ground is the point: designs that survive contact with a codebase, and code that keeps the intent of the design. Most of my work sits where the two meet, in design systems, interaction and motion, and the front-end that carries them.',
  capabilities: [
    { n: '01', title: 'Product Design', note: 'Discovery, framing, flows, UI' },
    { n: '02', title: 'UX Engineering', note: 'Specs that survive the build' },
    { n: '03', title: 'Design Systems', note: 'Tokens, components, documentation' },
    { n: '04', title: 'Interaction & Motion', note: 'States, gestures, choreography' },
    { n: '05', title: 'User Research', note: 'Interviews through to insight' },
    { n: '06', title: 'Frontend Engineering', note: 'React, TypeScript, shipping' },
  ],
  stats: [
    { k: 'Working since', v: '2019' },
    { k: 'Based in', v: 'United States' },
    { k: 'Focus', v: 'Design × Code' },
  ],
};

export const EMAIL = 'rahulraog.work@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/rahulraog/';

export const WORDMARK = "RAHUL'RAO";
