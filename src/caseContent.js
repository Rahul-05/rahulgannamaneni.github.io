// ── Per-project case studies ─────────────────────────────────────────
// Written from the previous portfolio's own write-ups. Projects reference
// these by the `sections` key in data.js; anything without one falls back
// to the generic template in caseStudy.js.
//
// Block types are the same as the template: prose, split, list, stats,
// quote, steps, gallery. `src` on a media block points at a real image in
// /public/work/<slug>/; without one the slot renders as a labelled
// placeholder.

export const CASE_CONTENT = {
  // ══════════ Guide ══════════
  guide: [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'overview',
      blocks: [
        {
          type: 'prose',
          lead: 'A search and content-tracking experience that changed industry halfway through the project.',
          body: [
            'Guide started as a corporate LMS: companies uploaded 90-second training videos for staff development. It had no dedicated search, so people browsed endlessly to find anything.',
            'Partway through, the company pivoted to mental health. Therapists replaced companies as the people supplying content, patients replaced employees, and the problem changed shape with them.',
          ],
        },
        {
          type: 'stats',
          items: [
            { k: 'Timeline', v: '8 months' },
            { k: 'Team', v: '6 people' },
            { k: 'Industry', v: 'Healthcare' },
            { k: 'My role', v: 'Design, strategy, PM' },
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
          lead: 'Care stops at the end of a session, and nobody can see what happens next.',
          body: [
            'Mental health providers have no reliable way to keep patients engaged between appointments. Without a way to assign content and see whether it was completed, the work between sessions is invisible and therapy is less effective for it.',
            'Patients feel the same gap from the other side: unsure what they are meant to be doing, and with no way to show they did it.',
          ],
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
          lead: 'Groundwork before the pivot, carried across after it.',
          body: [
            'We mapped the business model to understand value propositions, users, revenue and partnerships, then read into search patterns and best practice in online learning.',
          ],
        },
        {
          type: 'feature',
          media: 'Product pivot',
          src: '/work/guide/pivot.webp',
          title: 'The pivot, mapped',
          body: 'Corporate LMS on one side, mental health content platform on the other.',
          points: [
            'Companies became therapists, employees became patients.',
            'Everything learned about search had to be re-read against a new pair of users.',
            'The search work survived the pivot. The assumptions under it did not.',
          ],
        },
        {
          type: 'highlight',
          figure: 'arc',
          k: 'The turn',
          text: 'Eight months in, the users changed entirely and the research had to earn its place again.',
        },
        {
          type: 'split',
          media: 'Business model canvas',
          src: '/work/guide/bmc.webp',
          ratio: '16 / 10',
          flip: true,
          title: 'Business model canvas',
          body: 'Partnerships, activities, value propositions, customer relationships and segments mapped before design started, so the search work was anchored to how the product actually made money.',
        },
        {
          type: 'steps',
          items: [
            { k: 'Business model canvas', v: 'Value propositions, users, revenue, partners' },
            { k: 'Secondary research', v: 'Academic work on search and online learning' },
            {
              k: 'Competitive analysis',
              v: 'Cornerstone, LinkedIn Learning, Absorb, TalentLMS, Skilljar, Xensai',
            },
            { k: 'Interviews', v: '9 users plus one expert, across education, healthcare and IT' },
          ],
        },
      ],
    },
    {
      id: 'insights',
      label: 'Insights',
      icon: 'insights',
      blocks: [
        {
          type: 'list',
          title: 'What the interviews said',
          items: [
            'Training was treated as a compliance checkbox, not something people chose to do.',
            'Being able to preview content before committing to it mattered more than expected.',
            'People preferred systems that recommended relevant content over ones that made them hunt.',
            'Users wanted to keep exploring material aligned to their own goals, not just assigned items.',
          ],
        },
        {
          type: 'list',
          title: 'What good search needed to do',
          items: [
            'Index everything, and use controlled vocabularies so terms stay consistent.',
            'Weigh both relevance and behaviour, with faceted search rather than one flat list.',
            'Keep the interface simple, with autocomplete, filters and highlighted results.',
            'Track search behaviour to refine ranking and personalise over time.',
          ],
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
          lead: 'Mapping, sketching, deciding, prototyping, testing.',
          body: [
            'We ran information architecture and collaborative voting sessions to find the features essential to an MVP and to order everything else behind them.',
          ],
        },
        {
          type: 'gallery',
          items: [
            {
              label: 'Practitioner tracking flow',
              src: '/work/guide/flow-tracking.webp',
              ratio: '16 / 9',
            },
            {
              label: 'Patient self-track flow',
              src: '/work/guide/flow-selftrack.webp',
              ratio: '16 / 9',
            },
          ],
        },
      ],
    },
    {
      id: 'flow',
      label: 'Flows & IA',
      icon: 'flow',
      blocks: [
        {
          type: 'split',
          media: 'Practitioner primary flow',
          src: '/work/guide/flow-therapist.webp',
          ratio: '16 / 10',
          title: 'Two people, two paths',
          body: 'We mapped how therapists and patients each move through the product, which clarified where the paths meet and where they should stay apart.',
        },
      ],
    },
    {
      id: 'system',
      label: 'Design system',
      icon: 'system',
      blocks: [
        {
          type: 'feature',
          media: 'Component library',
          src: '/work/guide/components.webp',
          title: 'Components that relate to each other',
          body: 'Each element was refined against the others rather than in isolation, aligned to existing guidelines with accessibility carried through.',
          points: [
            'Nav, filters, search and assignment built as one set.',
            'Patient info, tags, pagination and bookmarks share the same rules.',
          ],
        },
        {
          type: 'gallery',
          items: [{ label: 'Hi-fi screens', src: '/work/guide/hifi.webp', ratio: '16 / 10' }],
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
          lead: 'Nine users: five healthcare professionals and four patients.',
          body: [
            'Run through Useberry. The aim was less about task success rates and more about hearing how people actually talked about the work between sessions.',
          ],
        },
      ],
    },
    {
      id: 'impact',
      label: 'Final designs',
      icon: 'impact',
      blocks: [
        {
          type: 'feature',
          media: 'Final hi-fi screens',
          src: '/work/guide/hifi.webp',
          title: 'Both sides of the same product',
          body: 'Search, assignment and tracking all sit on one surface.',
          points: [
            'Therapists assign content and see what was completed.',
            'Patients see what to do before the next session, and can show it was done.',
          ],
        },
        {
          type: 'split',
          media: 'Patient primary flow',
          src: '/work/guide/flow-patient.webp',
          ratio: '16 / 10',
          flip: true,
          title: 'The patient path',
          body: 'Mapped end to end so the between-session work has somewhere obvious to live rather than being left to memory.',
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
          title: 'What I took from it',
          items: [
            'A pivot mid-project is a research problem before it is a design problem: the interface survived, the assumptions underneath it did not.',
            'Carrying multiple roles across sprints meant the design decisions had to be defensible to product and business, not just to design.',
          ],
        },
      ],
    },
  ],

  // ══════════ Keka Marketplace ══════════
  keka: [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'overview',
      blocks: [
        {
          type: 'prose',
          lead: 'A new way to visualise, control and manage company-wide integrations inside the Keka HR portal.',
          body: [
            'Keka HR is a well-established HRMS provider in India. During my internship I worked on the integrations surface: how companies see what is connected, decide who gets access, and stay aware when something breaks.',
          ],
        },
        {
          type: 'stats',
          items: [
            { k: 'Context', v: 'Internship' },
            { k: 'Timeline', v: 'Apr to Jun 2023' },
            { k: 'Role', v: 'Research, UX design' },
            { k: 'Tools', v: 'Figma, Miro' },
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
          lead: 'Azure AD broke the pattern every earlier integration had followed.',
          body: [
            'The product team found a need to automate Azure AD provisioning from the HR portal. Trying to build it surfaced three problems the existing design could not absorb.',
          ],
        },
        {
          type: 'list',
          title: 'What surfaced',
          items: [
            'Customisation complexity: unlike Google Calendar or Microsoft Teams, Azure AD needs real configuration. More flexibility, but far more to get wrong.',
            'Security management: earlier integrations raised no access concerns. This one needed to restrict employee access properly.',
            'Connectivity: integrations were silently disconnecting on the backend and nobody found out until something failed.',
          ],
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
          lead: 'The mental model behind enable and disable did not match how people work.',
          body: [
            'Someone in one team might use several tools for the same job and switch between them as needed. Making that a multi-step sign-out and sign-in each time was solving for the system, not the person.',
          ],
        },
        {
          type: 'list',
          title: 'How others handle it',
          items: [
            'Remote, Deel and Asana offer customisation and approval gates to control how employees flow in.',
            'Most add a dedicated personalisation step, so admins say exactly when and where people are added.',
            'All of them give HR a monitoring page covering current and past integration usage.',
          ],
        },
      ],
    },
    {
      id: 'insights',
      label: 'Business goals',
      icon: 'insights',
      blocks: [
        {
          type: 'split',
          media: 'The integrations catalogue',
          src: '/work/keka-marketplace/goals.webp',
          ratio: '16 / 10',
          title: 'Designing for 25, not 5',
          body: 'Keka planned to ship more than 20 further integrations on top of the existing five within the year. Anything designed for five would collapse at twenty-five, so the real question became how someone finds one specific integration in a long list.',
        },
        {
          type: 'highlight',
          figure: 'steps',
          k: 'The constraint',
          text: 'Five integrations become twenty-five in a year. The card had to survive that, not just look right today.',
        },
      ],
    },
    {
      id: 'ideation',
      label: 'Iterations',
      icon: 'ideation',
      blocks: [
        {
          type: 'split',
          media: 'Card iterations',
          src: '/work/keka-marketplace/iterations.webp',
          ratio: '16 / 10',
          flip: true,
          title: 'Reimagining the integration card',
          body: 'Several versions were designed and tested against multiple personas and the business goals, deliberately including the bad scenarios. Search and switch were added to make filtering viable at scale.',
        },
        {
          type: 'gallery',
          items: [
            {
              label: 'Version comparison',
              src: '/work/keka-marketplace/versions.webp',
              ratio: '16 / 7',
            },
          ],
        },
      ],
    },
    {
      id: 'system',
      label: 'Design explorations',
      icon: 'system',
      blocks: [
        {
          type: 'list',
          title: 'What each part of the surface does',
          items: [
            'Status and tags: status shows the live state of an integration, tags classify what it is for.',
            'Understanding and configuring: information, product links and help, so the decision is informed.',
            'Preferences and security: defaults can be replaced with settings that suit the company.',
            'Activity log: current and past records of integration logins and registrations.',
            'Inbox: employee integration requests reviewed at onboarding and during licence management.',
          ],
        },
        {
          type: 'feature',
          media: 'App directory',
          src: '/work/keka-marketplace/directory.webp',
          title: 'Status and tags on the card itself',
          body: 'So the directory stays scannable as the catalogue grows past twenty-five.',
          points: [
            'Status shows the live state of an integration.',
            'Tags classify what each one is for.',
            'Search and switch make filtering viable at scale.',
          ],
        },
        {
          type: 'feature',
          media: 'Integration detail',
          src: '/work/keka-marketplace/detail.webp',
          title: 'Understanding before configuring',
          body: 'What the integration does, how it works with Keka, product links and help, all before an admin commits to switching it on.',
        },
        {
          type: 'feature',
          media: 'Security preferences',
          src: '/work/keka-marketplace/security.webp',
          title: 'Preferences and security',
          body: 'Azure AD was the first integration that needed real access control.',
          points: [
            'Defaults can be replaced with rules that match the company.',
            'Set at the point of connection, not buried in settings.',
          ],
        },
        {
          type: 'gallery',
          items: [
            {
              label: 'Activity log',
              src: '/work/keka-marketplace/activity.webp',
              ratio: '16 / 10',
            },
            {
              label: 'Inbox and approvals',
              src: '/work/keka-marketplace/inbox.webp',
              ratio: '16 / 10',
            },
          ],
        },
      ],
    },
    {
      id: 'impact',
      label: 'Final design',
      icon: 'impact',
      blocks: [
        {
          type: 'split',
          media: 'Final solution',
          src: '/work/keka-marketplace/solution.webp',
          ratio: '16 / 10',
          title: 'Where it landed',
          body: 'More customisation during setup, live status monitoring, integrations that can be switched on or off on demand, and a deliberate extra step when a new employee joins so HR makes that call knowingly.',
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
          title: 'What I took from it',
          items: [
            'Designing for a wide user base means removing your own bias and deciding from data.',
            'Product and business belong in the process early. Most of the real work happened well before high fidelity.',
          ],
        },
      ],
    },
  ],

  // ══════════ Apoyo Smart Helmet ══════════
  helmet: [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'overview',
      blocks: [
        {
          type: 'prose',
          lead: 'A helmet that projects navigation onto the visor, so riders stop looking down at a phone.',
          body: [
            'Delivery riders face traffic collisions, pedestrian incidents and other hazards, and the risk extends to everyone else on the road. We set out to keep navigation in the rider’s line of sight, with a companion app for planning.',
          ],
        },
        {
          type: 'stats',
          items: [
            { k: 'Context', v: 'Group project' },
            { k: 'Team', v: '3 members' },
            { k: 'Timeline', v: 'Oct 2022, 3 months' },
            { k: 'Role', v: 'Research, UX design' },
          ],
        },
      ],
    },
    {
      id: 'problem',
      label: 'Project vision',
      icon: 'problem',
      blocks: [
        {
          type: 'split',
          media: 'The helmet',
          src: '/work/apoyo-smart-helmet/product.webp',
          ratio: '16 / 9',
          title: 'Safe and efficient, for riders and everyone near them',
          body: 'We worked with delivery riders to understand their conditions, while keeping the solution usable for a wider group. Weather and construction updates were treated as safety inputs, not extras.',
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
          lead: 'A goal-directed process, leaning on qualitative methods.',
          body: [
            'Interviews and usability sessions drove the decisions. We opened with affinity mapping to organise and prioritise ideas before committing to a direction.',
          ],
        },
        {
          type: 'split',
          media: 'Affinity mapping',
          src: '/work/apoyo-smart-helmet/affinity.webp',
          ratio: '16 / 8',
          flip: true,
          title: 'What riders told us',
          body: 'Strict delivery timelines came up repeatedly as the reason riders take risks. The pressure, not carelessness, is what puts their eyes on a phone mid-ride.',
        },
      ],
    },
    {
      id: 'vision',
      label: 'Field of view',
      icon: 'insights',
      blocks: [
        {
          type: 'feature',
          media: 'Foveal and parafoveal vision',
          src: '/work/apoyo-smart-helmet/fov.webp',
          title: 'Where information can sit without stealing attention',
          body: 'Foveal against parafoveal vision, mapped on a real road.',
          points: [
            'Anything inside foveal vision competes with the traffic.',
            'The parafoveal band can carry information without pulling the eye.',
            'That boundary set how much the visor is allowed to show at once.',
          ],
        },
        {
          type: 'highlight',
          figure: 'orbit',
          k: 'The finding that shaped it',
          text: 'A rider does not need more information. They need it where looking at it costs nothing.',
        },
      ],
    },
    {
      id: 'benchmarks',
      label: 'Benchmarks',
      icon: 'research',
      blocks: [
        {
          type: 'split',
          media: 'Competitive analysis',
          src: '/work/apoyo-smart-helmet/competitive.webp',
          ratio: '16 / 7',
          title: 'What existing helmets already do',
          body: 'Feature-by-feature against the smart helmets already on the market, which showed where a projection approach would actually be different rather than another heads-up gimmick.',
        },
        {
          type: 'split',
          media: 'Priority matrix',
          src: '/work/apoyo-smart-helmet/priority.webp',
          ratio: '16 / 9',
          flip: true,
          title: 'Effort against priority',
          body: 'SOS, GPS navigation and augmented reality HUD plotted by effort and priority, which set what the prototype had to prove first.',
        },
      ],
    },
    {
      id: 'flow',
      label: 'Flows',
      icon: 'flow',
      blocks: [
        {
          type: 'split',
          media: 'User flow',
          src: '/work/apoyo-smart-helmet/flow.webp',
          ratio: '16 / 10',
          title: 'Splitting helmet from app',
          body: 'Planning belongs in the app before setting off; only what is needed in motion is projected onto the visor.',
        },
      ],
    },
    {
      id: 'hardware',
      label: 'Hardware',
      icon: 'handoff',
      blocks: [
        {
          type: 'feature',
          media: 'Industrial design',
          src: '/work/apoyo-smart-helmet/industrial.webp',
          title: 'Designing the shell around the projector',
          body: 'Side and front elevations working out where the projection unit sits.',
          points: [
            'Weight kept balanced so the helmet stays wearable for a full shift.',
            'Nothing added into the visor line.',
          ],
        },
        {
          type: 'gallery',
          items: [
            { label: 'Projection rig', src: '/work/apoyo-smart-helmet/rig.webp', ratio: '16 / 9' },
            {
              label: 'Testing on the visor',
              src: '/work/apoyo-smart-helmet/visor.webp',
              ratio: '16 / 9',
            },
          ],
        },
        {
          type: 'prose',
          lead: 'We built the rig rather than mocking it up.',
          body: [
            'A working projection unit was assembled and tested against a real visor, which is how we learned what brightness and placement actually survive daylight.',
          ],
        },
      ],
    },
    {
      id: 'prototype',
      label: 'The app',
      icon: 'prototype',
      blocks: [
        {
          type: 'gallery',
          items: [
            {
              label: 'Companion app screens',
              src: '/work/apoyo-smart-helmet/app.webp',
              ratio: '16 / 9',
            },
            {
              label: 'Handedness options',
              src: '/work/apoyo-smart-helmet/handedness.webp',
              ratio: '16 / 9',
            },
          ],
        },
      ],
    },
    {
      id: 'impact',
      label: 'Outcome',
      icon: 'impact',
      blocks: [
        {
          type: 'feature',
          media: 'Projection in place',
          src: '/work/apoyo-smart-helmet/fov-final.webp',
          title: 'Where it landed',
          body: 'The concept held up for most users and addressed the frustrations riders described.',
          points: [
            'Useful to delivery partners under time pressure.',
            'Equally useful to everyday riders.',
          ],
        },
      ],
    },
    {
      id: 'learnings',
      label: 'Next steps',
      icon: 'learnings',
      blocks: [
        {
          type: 'list',
          title: 'What comes next',
          items: [
            'Perfect the projection mechanism and make the hardware reliable enough to trust at speed.',
            'More testing across a wider range of riders: task-based usability studies, focus groups and surveys.',
            'Iterate helmet and app together, since the split between them is the thing that makes it work.',
          ],
        },
      ],
    },
  ],

  // ══════════ Space (ADHD) ══════════
  space: [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'overview',
      blocks: [
        {
          type: 'prose',
          lead: 'A dual-device app helping children with ADHD manage their own day.',
          body: [
            'Around 10 million new ADHD cases arise each year, and it is one of the most common neurodevelopmental conditions of childhood. It does not affect a child’s knowledge or creativity, but it does affect focus, attention and follow-through on schoolwork.',
            'The hardest part is doing work in order and scheduling tasks. Parents fill that gap, but they cannot always be there, and children need to plan for themselves eventually. That transition is where it breaks down.',
          ],
        },
        {
          type: 'stats',
          items: [
            { k: 'Context', v: 'Solo project' },
            { k: 'Timeline', v: 'Jan 2022, 2 weeks' },
            { k: 'Interviews', v: '14 people' },
            { k: 'Tools', v: 'Figma, Miro' },
          ],
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
          lead: 'Fourteen interviews: ten parents and four children with ADHD.',
          body: [
            'Empathy maps built from those sessions. The primary group was parents looking for support, and they confirmed the initial assumptions, but also asked for something that keeps a child going when no adult is in the room.',
            'One finding cut against the obvious design: rewards given by parents do not hold, because parents bend when a child is overwhelmed.',
          ],
        },
        {
          type: 'split',
          media: 'Design process',
          src: '/work/space-adhd-app/process.webp',
          ratio: '16 / 5',
          title: 'Empathise, define, ideate, prototype, test',
          body: 'Two weeks, solo, with the research front-loaded because the user group was one I did not know well enough to design for on instinct.',
        },
        {
          type: 'gallery',
          items: [
            {
              label: 'Persona: Anupama, parent',
              src: '/work/space-adhd-app/persona-1.webp',
              ratio: '16 / 10',
            },
            {
              label: 'Persona: Sidharth, parent',
              src: '/work/space-adhd-app/persona-2.webp',
              ratio: '16 / 10',
            },
          ],
        },
      ],
    },
    {
      id: 'insights',
      label: 'Insights',
      icon: 'insights',
      blocks: [
        {
          type: 'list',
          title: 'Three things the research settled',
          items: [
            'Children need guidance: an adult planning each step lets them stay on the current task without drifting.',
            'Children lose motivation: not finishing on time leads to abandoning the task altogether.',
            'Phone access is its own problem: sending a photo of finished work to a parent means handing a child a phone.',
          ],
        },
        {
          type: 'highlight',
          figure: 'spark',
          k: 'The finding that changed the design',
          text: 'Rewards given by a parent do not hold, because parents bend when a child is overwhelmed.',
        },
        {
          type: 'prose',
          lead: 'The transition is the real design problem.',
          body: [
            'Support may not be there as they grow up, so planning has to shift to the child. For a child with ADHD that shift is the hard part, which is why the two devices are designed to hand over gradually rather than switch.',
          ],
        },
      ],
    },
    {
      id: 'flow',
      label: 'Flows',
      icon: 'flow',
      blocks: [
        {
          type: 'feature',
          media: 'Parent user flow',
          src: '/work/space-adhd-app/flow-parent.webp',
          title: 'Parent device',
          body: 'Kept deliberately simple.',
          points: [
            'The point of Space is to reduce the load on the parent.',
            'The parent flow should not become another task to manage.',
          ],
        },
        {
          type: 'feature',
          media: 'Child user flow',
          src: '/work/space-adhd-app/flow-child.webp',
          title: 'Child device',
          body: 'Children with ADHD can struggle with anger management.',
          points: [
            'The palette stays subtle rather than loud and rewarding.',
            'The flow avoids complex structures that invite frustration.',
          ],
        },
      ],
    },
    {
      id: 'wireframes',
      label: 'Wireframes',
      icon: 'wireframe',
      blocks: [
        {
          type: 'gallery',
          items: [
            {
              label: 'Paper sketches, parent',
              src: '/work/space-adhd-app/sketch-parent.webp',
              ratio: '16 / 9',
            },
            {
              label: 'Paper sketches, child',
              src: '/work/space-adhd-app/sketch-child.webp',
              ratio: '16 / 9',
            },
          ],
        },
        {
          type: 'gallery',
          items: [
            {
              label: 'Lo-fi wireflow, parent',
              src: '/work/space-adhd-app/lofi-parent.webp',
              ratio: '16 / 9',
            },
            {
              label: 'Lo-fi wireflow, child',
              src: '/work/space-adhd-app/lofi-child.webp',
              ratio: '16 / 9',
            },
          ],
        },
      ],
    },
    {
      id: 'impact',
      label: 'Final design',
      icon: 'impact',
      blocks: [
        {
          type: 'gallery',
          items: [
            {
              label: 'Scheduled tasks',
              src: '/work/space-adhd-app/app-tasks.webp',
              ratio: '3 / 4',
            },
            {
              label: 'Timeline and rewards',
              src: '/work/space-adhd-app/app-schedule.webp',
              ratio: '3 / 4',
            },
            {
              label: 'Settings and ADHD mode',
              src: '/work/space-adhd-app/app-settings.webp',
              ratio: '3 / 4',
            },
          ],
        },
        {
          type: 'feature',
          media: 'Space app',
          src: '/work/space-adhd-app/final.webp',
          title: 'Across devices',
          body: 'Child login is tied to a parent email so syncing and device switching stay simple, with tips on first use. The app was adapted to larger screens with responsive layouts kept consistent with mobile, so nothing has to be relearned.',
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
          title: 'What I took from it',
          items: [
            'Building empathy for a group I knew little about did more for me as a designer than any single technique.',
            'Observation and usability sessions with these children showed how much real-world context matters, and how much more you learn by being with someone than by reading about them.',
          ],
        },
      ],
    },
  ],
};
