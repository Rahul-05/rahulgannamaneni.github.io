// ── Case study template ──────────────────────────────────────────────
// The shape every project page follows below the hero. Each section has an
// id (used for the URL hash and the sticky directory), an icon, and a list
// of content blocks. Blocks are rendered by ProjectPage.
//
// Block types:
//   prose    lead + paragraphs
//   split    media on one side, text on the other (`flip` swaps them)
//   list     titled findings / bullets
//   stats    metric grid
//   quote    pull quote with attribution
//   steps    numbered process
//   gallery  grid of media slots
//
// Copy here is deliberately template copy: it describes what belongs in the
// slot, so a real case study can be written straight over the top of it.

export const CASE_SECTIONS = [
  {
    id: 'overview',
    label: 'Overview',
    icon: 'overview',
    blocks: [
      {
        type: 'prose',
        lead: 'One paragraph on what this project was and why it existed.',
        body: [
          'Set the scene: the product, the team, the timeframe, and what was at stake. Keep it to what a reader needs before the detail starts.',
        ],
      },
      {
        type: 'stats',
        items: [
          { k: 'Timeline', v: '12 weeks' },
          { k: 'Team', v: '4 people' },
          { k: 'My role', v: 'Design + Build' },
          { k: 'Platform', v: 'Web' },
        ],
      },
    ],
  },
  {
    id: 'problem',
    label: 'The problem',
    icon: 'problem',
    blocks: [
      {
        type: 'prose',
        lead: 'The problem, stated plainly and without the solution in it.',
        body: [
          'What was breaking, who felt it, and how often. Name the constraint that made it hard, otherwise the solution later reads as obvious.',
        ],
      },
      {
        type: 'split',
        media: 'BEFORE: the original experience',
        ratio: '4 / 3',
        title: 'Where it fell apart',
        body: 'Point at the exact moment the old flow lost people, and what it cost.',
      },
    ],
  },
  {
    id: 'research',
    label: 'Research',
    icon: 'research',
    blocks: [
      {
        type: 'prose',
        lead: 'How the problem was investigated before anything was drawn.',
        body: ['Method, sample, and why that method suited the question.'],
      },
      {
        type: 'steps',
        items: [
          { k: 'Interviews', v: 'Sessions with users across segments' },
          { k: 'Analytics', v: 'Funnel and drop-off review' },
          { k: 'Audit', v: 'Walkthrough of the existing product' },
          { k: 'Benchmarks', v: 'How comparable products solve it' },
        ],
      },
      { type: 'gallery', items: ['RESEARCH ARTEFACT 01', 'RESEARCH ARTEFACT 02'] },
    ],
  },
  {
    id: 'insights',
    label: 'Insights',
    icon: 'insights',
    blocks: [
      {
        type: 'list',
        title: 'What the research actually said',
        items: [
          'Insight one, written as a finding rather than a feature request.',
          'Insight two, with the evidence that supports it.',
          'Insight three, including the one that contradicted the original assumption.',
        ],
      },
      {
        type: 'quote',
        quote:
          'A short verbatim from a participant that captures the problem better than a summary can.',
        by: 'Participant, segment',
      },
    ],
  },
  {
    id: 'ideation',
    label: 'Ideation',
    icon: 'ideation',
    blocks: [
      {
        type: 'prose',
        lead: 'The directions explored, including the ones that were dropped.',
        body: ['Showing the discarded routes is what makes the chosen one credible.'],
      },
      { type: 'gallery', items: ['SKETCHES / EXPLORATIONS', 'CONCEPT DIRECTIONS'] },
    ],
  },
  {
    id: 'flow',
    label: 'Flows & IA',
    icon: 'flow',
    blocks: [
      {
        type: 'split',
        media: 'USER FLOW DIAGRAM',
        ratio: '16 / 10',
        flip: true,
        title: 'How the product is structured',
        body: 'The routes through the product and the decisions that shaped them.',
      },
    ],
  },
  {
    id: 'wireframes',
    label: 'Wireframes',
    icon: 'wireframe',
    blocks: [
      {
        type: 'prose',
        lead: 'Structure resolved before any visual design.',
        body: ['What each screen has to do, and what was cut to let it do that.'],
      },
      { type: 'gallery', items: ['WIREFRAME 01', 'WIREFRAME 02', 'WIREFRAME 03'] },
    ],
  },
  {
    id: 'system',
    label: 'Design system',
    icon: 'system',
    blocks: [
      {
        type: 'split',
        media: 'TOKENS / COMPONENTS',
        ratio: '4 / 3',
        title: 'The system behind the screens',
        body: 'Type scale, colour, spacing and the components built on them, plus how they were documented for the build.',
      },
      { type: 'gallery', items: ['COMPONENT SHEET', 'TYPE & COLOUR'] },
    ],
  },
  {
    id: 'prototype',
    label: 'Prototype',
    icon: 'prototype',
    blocks: [
      {
        type: 'split',
        media: 'INTERACTION GIF / VIDEO',
        ratio: '16 / 10',
        flip: true,
        title: 'How it actually feels',
        body: 'The motion and interaction detail: timing, easing, and what the feedback is doing for the user.',
      },
    ],
  },
  {
    id: 'testing',
    label: 'Testing',
    icon: 'testing',
    blocks: [
      {
        type: 'prose',
        lead: 'What was validated, and what the testing changed.',
        body: ['A case study is more convincing when the design lost an argument somewhere.'],
      },
      {
        type: 'list',
        title: 'Changes made after testing',
        items: [
          'Change one, and the observation that forced it.',
          'Change two, and how it was re-tested.',
        ],
      },
    ],
  },
  {
    id: 'handoff',
    label: 'Build & handoff',
    icon: 'handoff',
    blocks: [
      {
        type: 'prose',
        lead: 'How the design got into production without eroding.',
        body: ['Specs, tokens, and the parts that were built directly rather than handed over.'],
      },
      { type: 'gallery', items: ['SPEC / HANDOFF ARTEFACT'] },
    ],
  },
  {
    id: 'impact',
    label: 'Impact',
    icon: 'impact',
    blocks: [
      {
        type: 'stats',
        items: [
          { k: 'Primary metric', v: '+00%' },
          { k: 'Secondary metric', v: '+00%' },
          { k: 'Time saved', v: '00 hrs' },
          { k: 'Adoption', v: '00%' },
        ],
      },
      {
        type: 'prose',
        lead: 'What changed once it shipped.',
        body: ['Numbers where they exist, and an honest qualitative read where they do not.'],
      },
    ],
  },
  {
    id: 'learnings',
    label: 'Learnings',
    icon: 'learnings',
    blocks: [
      {
        type: 'list',
        title: 'What I would do differently',
        items: [
          'A decision worth revisiting, and why.',
          'Something the process missed that would be caught earlier next time.',
          'What carried forward into later work.',
        ],
      },
    ],
  },
];
