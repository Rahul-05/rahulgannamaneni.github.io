// ── Per-project case studies ─────────────────────────────────────────
// Written from the previous portfolio's own write-ups. Projects reference
// these by the `sections` key in data.js; anything without one falls back
// to the generic template in caseStudy.js.
//
// Block types are the same as the template: prose, split, list, stats,
// quote, steps, gallery. `src` on a media block points at a real image in
// /public/work/<slug>/; without one the slot renders as a labelled
// placeholder.

// image path prefixes, so a folder rename is one edit rather than sixty
const W = '/work/data-product-marketplace';
const A = '/work/ai-agent-usage-dashboard';
const I = '/work/data-ingestion-flow';
const C = '/work/ai-keyword-domain-model';

export const CASE_CONTENT = {
  // ─────────────────────────────────────────────────────────────────────────
  // 4 · Conceptual domain model
  // Built with the people who hold the vocabulary rather than for them.
  cdm: [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'grid',
      blocks: [
        {
          type: 'context',
          title: 'The words this is about',
          items: [
            {
              icon: 'lightbulb',
              k: 'Concept',
              v: 'Something a department reasons about — capital allocation, exposure, liquidity — independent of whatever any one system happens to call it.',
            },
            {
              icon: 'book',
              k: 'Term',
              v: 'The word a department actually uses for a concept. Several terms often point at one concept, which is exactly where the disagreements start.',
            },
            {
              icon: 'layers',
              k: 'Conceptual domain model',
              v: 'The concepts, the terms, and the typed links between them. It is what lets a question asked in business language find the right data product underneath.',
            },
          ],
          links: [
            {
              to: 'agent',
              section: 'asking',
              k: 'Related',
              title: 'What the agent needs this for',
            },
            {
              to: 'portal',
              section: 'overview',
              k: 'Related',
              title: 'The products it maps onto',
            },
          ],
        },
        {
          type: 'prose',
          lead: 'Getting a firm to agree what its own words mean',
          body: [
            'A conceptual domain model records the concepts a department works with, the terms that express them, and how those relate to one another and to the data products underneath. It is the layer that lets someone ask a question in business language and have the platform know what they meant.',
          ],
        },
        {
          type: 'stats',
          items: [
            { k: 'Context', v: 'Enterprise platform' },
            { k: 'My role', v: 'Product design, systems' },
            { k: 'Surface', v: 'CDM library and model editor' },
            { k: 'Built with', v: 'Domain stewards, per department' },
          ],
        },
        {
          type: 'feature',
          src: C + '/relationships.webp',
          media: 'Typed relationships between concepts and terms',
          chrome: true,
          url: 'dataportal / admin / cdm / active-equities',
          title: 'The model is the relationships',
          body: 'Concepts and terms are the easy half. What makes the model useful is the typed links between them, and the cardinality on each one, because that is what turns a glossary into something a machine can reason over.',
        },
      ],
    },
    {
      id: 'problem',
      label: 'The problem',
      icon: 'alert',
      blocks: [
        {
          type: 'prose',
          lead: 'Everyone was right, and the numbers still disagreed',
          body: [
            'Two departments reporting different figures for the same question, both correct within their own definition, is the most expensive kind of disagreement because there is nothing to fix. The vocabulary lived in people\u2019s heads and in slide decks, and it diverged quietly for years.',
          ],
        },
        {
          type: 'list',
          title: 'What that cost',
          items: [
            'Reconciliation meetings that were really vocabulary meetings.',
            'Search that could not connect a business question to the data product that answered it.',
            'New joiners learning definitions by asking, which spreads the divergence further.',
            'No way to say which definition is the authoritative one, so nobody could be wrong.',
          ],
        },
      ],
    },
    {
      id: 'collaboration',
      label: 'Built with stewards',
      icon: 'lightbulb',
      blocks: [
        {
          type: 'prose',
          lead: 'The theory was built with the people who own the words',
          body: [
            'This could not be designed and handed over. The structure came out of working sessions with domain stewards, per department, asking how they actually think about their own concepts, what a term means to them, and where they know their vocabulary collides with another team\u2019s.',
          ],
        },
        {
          type: 'highlight',
          figure: 'orbit',
          k: 'The shape came from them, the constraints came from the platform',
          text: 'Stewards defined what a relationship between two concepts should be able to say. The platform defined what it could enforce. The model is where those met, and the editor is a straight expression of it.',
        },
        {
          type: 'gallery',
          chrome: true,
          items: [
            {
              src: C + '/library.webp',
              label: 'The CDM library, one model per department',
              url: 'dataportal / admin / cdm',
            },
            {
              src: C + '/create-model.webp',
              label: 'Creating a model, scoped to a department',
              url: 'dataportal / admin / cdm',
            },
          ],
        },
      ],
    },
    {
      id: 'concepts',
      label: 'Concepts and terms',
      icon: 'layers',
      blocks: [
        {
          type: 'prose',
          lead: 'Two levels, deliberately separated',
          body: [
            'A concept is the idea, Capital Allocation. A term is how a particular department says it, with its own definition and calculation. Keeping them apart is what lets two teams keep their language and still agree on the underlying thing.',
          ],
        },
        {
          type: 'gallery',
          chrome: true,
          items: [
            {
              src: C + '/concepts.webp',
              label: 'Concepts, with definitions and their owning department',
              url: 'dataportal / admin / cdm / concepts',
            },
            {
              src: C + '/terms.webp',
              label: 'A term, with its definition and calculation',
              url: 'dataportal / admin / cdm / terms',
            },
          ],
        },
      ],
    },
    {
      id: 'relationships',
      label: 'Relationships',
      icon: 'flow',
      blocks: [
        {
          type: 'prose',
          lead: 'Typed links, with cardinality, that validate themselves',
          body: [
            'Every link says what kind of thing it is, and how many of one relates to how many of the other. That constraint is what makes the model checkable, which is why the editor can tell you all 58 relationships look good rather than leaving you to audit them.',
          ],
        },
        {
          type: 'gallery',
          chrome: true,
          items: [
            {
              src: C + '/relationship-patterns.webp',
              label: 'Choosing the relationship pattern',
              url: 'dataportal / admin / cdm / relationships',
            },
            {
              src: C + '/define-relationship.webp',
              label: 'Defining one link and its cardinality',
              url: 'dataportal / admin / cdm / relationships',
            },
          ],
        },
        {
          type: 'split',
          src: C + '/relationship-list.webp',
          media: 'Every relationship in the model, filtered by type',
          chrome: true,
          url: 'dataportal / admin / cdm / relationships',
          flip: true,
          title: 'Filtered by the kind of link',
          body: 'Concept to concept, concept to term, term to term, concept to data product. The counts alongside each type make the shape of the model readable before any single row is.',
        },
      ],
    },
    {
      id: 'context',
      label: 'Business context',
      icon: 'book',
      blocks: [
        {
          type: 'prose',
          lead: 'Where the model meets how people speak',
          body: [
            'The context step captures the questions each concept is expected to answer and the language people use when they ask. This is the layer search reads, and it is why a question phrased in department vocabulary can find a data product named in engineering vocabulary.',
          ],
        },
        {
          type: 'gallery',
          chrome: true,
          items: [
            {
              src: C + '/business-context.webp',
              label: 'Business context per concept',
              url: 'dataportal / admin / cdm / context',
            },
            {
              src: C + '/context-grid.webp',
              label: 'The questions each concept is expected to answer',
              url: 'dataportal / admin / cdm / context',
            },
          ],
        },
        {
          type: 'split',
          src: C + '/review-save.webp',
          media: 'Review and save, with every change marked',
          chrome: true,
          url: 'dataportal / admin / cdm / review',
          title: 'Changes reviewed before they are published',
          body: 'A model that anyone can quietly edit is worth nothing. Every change is marked against the approved version and reviewed as a delta before it becomes the authority.',
        },
      ],
    },
    {
      id: 'outcome',
      label: 'Outcome',
      icon: 'trend',
      blocks: [
        {
          type: 'prose',
          lead: 'What changed',
          body: [
            'The firm got a written, owned, checkable vocabulary per department, and a way to say which definition is authoritative. That is unglamorous and it is the foundation everything else in the platform stands on.',
          ],
        },
        {
          type: 'list',
          title: 'What it moved',
          items: [
            'Definition disagreements became a change request against a model rather than an argument in a meeting.',
            'Search could connect a business question to the data product that answers it.',
            'Every concept got an owner, so a question about a word had somewhere to go.',
            'The agent had a vocabulary to reason over, which is what made its answers land in the language people asked in.',
          ],
        },
        {
          type: 'crosslink',
          to: 'portal',
          section: 'overview',
          k: 'What it powers',
          title: 'The portal this vocabulary makes searchable',
          text: 'A model nobody uses is a diagram. This one is what lets a business-language search reach the right data product.',
        },
      ],
    },
    {
      id: 'learnings',
      label: 'Learnings',
      icon: 'book',
      blocks: [
        {
          type: 'prose',
          lead: 'What I took from it',
          body: ['This one was as much facilitation as design.'],
        },
        {
          type: 'list',
          items: [
            'Nobody will adopt a vocabulary they were handed. Building the structure in sessions with the stewards who own the words is slower and it is the only version that survives.',
            'Separating the concept from the term let two departments keep their own language without either of them losing the argument, which is what made agreement possible at all.',
          ],
        },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // 3 · Data product ingestion
  // The spreadsheet problem, solved at the point of entry rather than cleaned
  // up afterwards.
  ingestion: [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'grid',
      blocks: [
        {
          type: 'context',
          title: 'What is being registered, and where it ends up',
          items: [
            {
              icon: 'database',
              k: 'Data product',
              v: 'A dataset the firm treats as a product: it has an owner, a fixed shape, a quality bar and teams that depend on it. Not a table someone exported once.',
            },
            {
              icon: 'handoff',
              k: 'Registering one',
              v: 'Describing a new data product well enough for the rest of the platform to use it: what it holds, which tables it comes from, who owns it, who may see it.',
            },
            {
              icon: 'alert',
              k: 'Why it matters here',
              v: 'Everything captured in this form is what the portal later shows and the agent later answers from. A sloppy record does not stay a local problem.',
            },
          ],
          links: [
            {
              to: 'portal',
              section: 'overview',
              k: 'Related',
              title: 'The portal this feeds',
            },
            {
              to: 'cdm',
              section: 'concepts',
              k: 'Related',
              title: 'The vocabulary it has to match',
            },
          ],
        },
        {
          type: 'prose',
          lead: 'Replacing the spreadsheet with a form that knows things',
          body: [
            'Registering a data product used to mean filling in a workbook and emailing it. This is the form that replaced it: you give it a view name, it reaches into the catalogue and fills in the underlying tables, every column and every type, and then it validates all of it before a human is asked to approve anything.',
          ],
        },
        {
          type: 'stats',
          items: [
            { k: 'Context', v: 'Enterprise platform' },
            { k: 'My role', v: 'Product design, UX engineering' },
            { k: 'Surface', v: 'Onboarding and management' },
            { k: 'Replaces', v: 'Templated spreadsheets' },
          ],
        },
        {
          type: 'feature',
          src: I + '/onboarding-list.webp',
          media: 'Data product onboarding and management',
          chrome: true,
          url: 'dataportal / admin / onboarding',
          title: 'Everything in flight, in one list',
          body: 'Draft, in review, approved and rejected in a single queue, with the state of each request visible without opening it.',
        },
      ],
    },
    {
      id: 'problem',
      label: 'The problem',
      icon: 'alert',
      blocks: [
        {
          type: 'prose',
          lead: 'Templates do not survive contact with people',
          body: [
            'The org needed data described consistently across every department, so it issued spreadsheet templates. They were good templates. It made almost no difference. Normalisation was done by hand, validation happened after the fact if at all, and every submission arrived a little different from the last one.',
          ],
        },
        {
          type: 'highlight',
          figure: 'steps',
          k: 'And the cost landed somewhere nobody was looking',
          text: 'Inconsistent metadata fed straight into everything downstream. Answers degraded, search ranked the wrong things, and tracing any of it back to the workbook cell that caused it was a week of work nobody had.',
        },
        {
          type: 'list',
          title: 'What went wrong, repeatedly',
          items: [
            'The same column described four ways by four teams.',
            'Types entered as free text, so validation was impossible.',
            'Errors found weeks later by whoever consumed the data, not by the person who entered it.',
            'No version history, so nobody could see what a submission used to say.',
          ],
        },
      ],
    },
    {
      id: 'autofill',
      label: 'Auto-fill',
      icon: 'code',
      blocks: [
        {
          type: 'prose',
          lead: 'Ask for the one thing only a person knows',
          body: [
            'The insight that made the form work: almost everything in that spreadsheet already existed in the catalogue. The person only needs to supply the view name. Everything structural is derived, and what remains for a human is the part that requires judgement rather than transcription.',
          ],
        },
        {
          type: 'feature',
          src: I + '/core-metadata.webp',
          media: 'Core metadata, with identity, location, ownership and timing',
          chrome: true,
          url: 'dataportal / onboarding / core-metadata',
          title: 'Derived structure, authored meaning',
          body: 'Tables, columns and types are pulled in and locked. Names, descriptions, ownership and classification are the human contribution, and the form is explicit about which is which.',
          points: [
            'The step rail carries completion state, so progress is legible from any step.',
            'Each group reports its own completeness rather than a single count at the end.',
          ],
        },
        {
          type: 'split',
          src: I + '/attributes.webp',
          media: 'Bulk attribute entry across every column',
          chrome: true,
          url: 'dataportal / onboarding / attributes',
          title: 'Bulk entry, because the alternative is abandonment',
          body: 'Describing a hundred columns one modal at a time is how a form gets left half finished. Attributes are edited in place, in a grid, with the technical metadata already filled in beside each row.',
        },
      ],
    },
    {
      id: 'validation',
      label: 'Validation',
      icon: 'alert',
      blocks: [
        {
          type: 'prose',
          lead: 'Fail at the point of entry, not at the point of use',
          body: [
            'The whole argument for this form is that a mistake caught here costs a minute, and the same mistake caught downstream costs a week. So validation runs against the live catalogue while the person is still in the room.',
          ],
        },
        {
          type: 'gallery',
          chrome: true,
          items: [
            {
              src: I + '/validation.webp',
              label: 'Four items needing attention, each naming the exact object',
              url: 'dataportal / onboarding / validate',
            },
            {
              src: I + '/errors.webp',
              label: 'Errors resolved against the catalogue in place',
              url: 'dataportal / onboarding / validate',
            },
          ],
        },
        {
          type: 'highlight',
          figure: 'arc',
          k: 'An error that names the object beats one that names the rule',
          text: 'View not found in Glue catalog, and then the exact view name, is actionable. Invalid input is not. Every message points at the thing it is complaining about and, where it can, at the fix.',
        },
        {
          type: 'crosslink',
          to: 'cdm',
          section: 'concepts',
          k: 'What it validates against',
          title: 'The vocabulary a record has to line up with',
          text: 'Failing loudly is only useful if there is an agreed definition to fail against. That agreement is the domain model.',
        },
      ],
    },
    {
      id: 'dsl',
      label: 'Flow expression',
      icon: 'flow',
      blocks: [
        {
          type: 'prose',
          lead: 'Describing how the data moves',
          body: [
            'A product is not just its columns, it is the transformation that produced them. The flow step captures that as an expression, and draws it, so the person writing it can see whether the shape matches what they meant.',
          ],
        },
        {
          type: 'gallery',
          chrome: true,
          items: [
            {
              src: I + '/dsl-editor.webp',
              label: 'The flow expression alongside its generated diagram',
              url: 'dataportal / onboarding / data-flow',
            },
            {
              src: I + '/dsl-visual.webp',
              label: 'The same flow as a node graph',
              url: 'dataportal / onboarding / data-flow',
            },
          ],
        },
        {
          type: 'split',
          src: I + '/use-cases.webp',
          media: 'Use cases and the questions this product answers',
          chrome: true,
          url: 'dataportal / onboarding / use-cases',
          flip: true,
          title: 'And what it is for',
          body: 'The use case step asks what questions this product is meant to answer. It is the field that later makes search work, because it is written in the language people search in.',
        },
      ],
    },
    {
      id: 'approval',
      label: 'Approval',
      icon: 'shield',
      blocks: [
        {
          type: 'prose',
          lead: 'Governance that shows its working',
          body: [
            'A submission goes to an approver who did not write it and may not know the domain. Everything that person needs to judge it has to be on one screen, including what changed since the last approved version.',
          ],
        },
        {
          type: 'gallery',
          chrome: true,
          items: [
            {
              src: I + '/approval.webp',
              label: 'Review and approval readiness',
              url: 'dataportal / onboarding / approval',
            },
            {
              src: I + '/diff.webp',
              label: 'Changes from the original record, field by field',
              url: 'dataportal / onboarding / approval',
            },
          ],
        },
        {
          type: 'split',
          src: I + '/version-history.webp',
          media: 'Governed version history',
          chrome: true,
          url: 'dataportal / onboarding / history',
          title: 'Every version kept',
          body: 'A field level diff against the previously approved record, so an approver reviews the delta rather than re-reading the whole submission.',
        },
      ],
    },
    {
      id: 'outcome',
      label: 'Outcome',
      icon: 'trend',
      blocks: [
        {
          type: 'prose',
          lead: 'What changed',
          body: [
            'Registering a product went from a workbook and a wait to a guided form that fails fast. More importantly, what comes out the other end is uniform, which is the thing everything downstream was missing.',
          ],
        },
        {
          type: 'list',
          title: 'What it moved',
          items: [
            'Structural metadata stopped being typed by hand, so it stopped being wrong.',
            'Errors surfaced during entry rather than weeks later in someone else\u2019s pipeline.',
            'Approvers reviewed a diff instead of a document.',
            'Downstream answers improved without anyone touching the model, because the descriptions underneath them finally agreed.',
          ],
        },
      ],
    },
    {
      id: 'learnings',
      label: 'Learnings',
      icon: 'book',
      blocks: [
        {
          type: 'prose',
          lead: 'What I took from it',
          body: ['Mostly about where to put the effort.'],
        },
        {
          type: 'list',
          items: [
            'The best fix for a data quality problem was a form, not a cleanup job. Everything upstream of the mistake is cheaper than everything downstream of it.',
            'People will fill in a long form if it is obviously doing work for them. The moment it asks for something it could have looked up, they stop believing in it.',
          ],
        },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // 2 · AI agent and usage dashboard
  // Two halves of one argument: an agent that asks before it answers, and a
  // dashboard that made the firm's own usage legible to the people running it.
  agent: [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'grid',
      blocks: [
        {
          type: 'context',
          title: 'What this sits on top of',
          items: [
            {
              icon: 'database',
              k: 'Data product',
              v: 'A dataset the firm treats as a product: it has an owner, a fixed shape, a quality bar and teams that depend on it. Not a table someone exported once.',
            },
            {
              icon: 'agent',
              k: 'Agent',
              v: 'A question-answering assistant over one data product. You ask in business language; it works out which question you actually meant before it answers, and it shows the SQL and metadata it leaned on.',
            },
            {
              icon: 'chart',
              k: 'Usage dashboard',
              v: 'The other half of this project. Not what the agent answers, but where it is being used across the firm, what it is being asked, and which parts are quietly failing.',
            },
          ],
          links: [
            {
              to: 'portal',
              section: 'overview',
              k: 'Related',
              title: 'The portal these products live in',
            },
            {
              to: 'cdm',
              section: 'overview',
              k: 'Related',
              title: 'The vocabulary it has to answer in',
            },
          ],
        },
        {
          type: 'prose',
          lead: 'An agent that asks first, and a dashboard that watches it',
          body: [
            'The agent answers questions about a data product in words. The dashboard answers a different question, for a different person: where is this being used across the firm, what is it being asked, and which parts of it are quietly failing.',
          ],
        },
        {
          type: 'stats',
          items: [
            { k: 'Context', v: 'Enterprise platform' },
            { k: 'My role', v: 'Product design, UX engineering' },
            { k: 'Surfaces', v: 'In-product agent, usage dashboard' },
            { k: 'Audience', v: 'Analysts, and the people who own the platform' },
          ],
        },
        {
          type: 'feature',
          src: A + '/dashboard.webp',
          media: 'The agent usage dashboard',
          chrome: true,
          url: 'dataportal / admin / agent-usage',
          title: 'The half that got attention',
          body: 'Building the agent was the expected work. The dashboard was the thing leadership asked for a second time, because it answered a question nobody could previously answer about their own product.',
        },
      ],
    },
    {
      id: 'asking',
      label: 'Asking well',
      icon: 'lightbulb',
      blocks: [
        {
          type: 'prose',
          lead: 'The design problem was the question, not the answer',
          body: [
            'A question like what happened to risk exposure has half a dozen readings, and answering the wrong one confidently is worse than not answering. The agent is built to narrow before it commits: it asks what kind of information you are after, then what shape you want it in.',
          ],
        },
        {
          type: 'gallery',
          chrome: true,
          items: [
            {
              src: A + '/agent-open.webp',
              label: 'The opening turn, offering directions rather than a blank box',
              url: 'dataportal / recourse-leverage',
            },
            {
              src: A + '/agent-clarify.webp',
              label: 'Narrowing what the person actually means',
              url: 'dataportal / recourse-leverage',
            },
          ],
        },
        {
          type: 'highlight',
          figure: 'orbit',
          k: 'Clarifying questions are UI, not conversation filler',
          text: 'Each clarifying turn is a small set of concrete choices, not an open prompt. People answer a choice in a second and abandon an open question, and the choice is also what keeps the agent inside what the data can actually support.',
        },
        {
          type: 'split',
          src: A + '/agent-mode.webp',
          media: 'Choosing between a normal answer and a detailed one',
          chrome: true,
          url: 'dataportal / recourse-leverage',
          title: 'Depth is the person\u2019s decision',
          body: 'Normal mode answers. Debug mode shows the SQL, the metadata it leaned on and the assumptions it made. The same question, two audiences, one control.',
        },
        {
          type: 'crosslink',
          to: 'cdm',
          section: 'relationships',
          k: 'What it reads',
          title: 'The typed links the agent narrows a question with',
          text: 'Working out which question someone meant needs an agreed map of concepts and terms. Building that map with the stewards was its own project.',
        },
      ],
    },
    {
      id: 'answering',
      label: 'Answering',
      icon: 'flow',
      blocks: [
        {
          type: 'prose',
          lead: 'And the answer has a shape you chose',
          body: [
            'Some answers want prose. Some want a diagram. Rather than guessing, the agent asks what output would help, then produces that: a structured summary, a lineage graph, a table, an image it can hand over.',
          ],
        },
        {
          type: 'gallery',
          chrome: true,
          items: [
            {
              src: A + '/agent-format.webp',
              label: 'Picking the output format before generating it',
              url: 'dataportal / recourse-leverage',
            },
            {
              src: A + '/agent-answer.webp',
              label: 'A structured answer with identifiers, classification and instrument detail',
              url: 'dataportal / recourse-leverage',
            },
          ],
        },
        {
          type: 'feature',
          src: A + '/agent-graph.webp',
          media: 'A lineage graph generated inside the conversation',
          chrome: true,
          url: 'dataportal / recourse-leverage',
          title: 'A graph generated from a sentence',
          body: 'Asked for a visual representation of lineage, the agent draws the dependency map for that product inside the thread, and then explains what it drew.',
        },
        {
          type: 'split',
          src: A + '/lineage-map.webp',
          media: 'The data product lineage and dependency map',
          flip: true,
          title: 'The picture people forwarded',
          body: 'Source systems, the product, its downstream consumers and the reports that sit on top of them. This diagram left the tool and ended up in decks, which is the clearest signal that it was doing work.',
        },
      ],
    },
    {
      id: 'story-one',
      label: 'Where it is used',
      icon: 'chart',
      blocks: [
        {
          type: 'prose',
          lead: 'Story one: which parts of the firm actually use this',
          body: [
            'The first thing the dashboard settles is the argument about adoption. Not a total, but the shape: which departments, which products, and how concentrated the usage is on a small number of teams.',
          ],
        },
        {
          type: 'feature',
          src: A + '/usage-overview.webp',
          media: 'Usage across the organisation',
          chrome: true,
          url: 'dataportal / admin / agent-usage',
          title: 'Totals, then the breakdown that makes them mean something',
          body: 'Four counts across the top for the glance, and underneath them the split by department and by product, because the total on its own has never answered a question anyone had.',
          points: [
            'Top product share is the number that ends the where should we invest conversation.',
            'Unique users against total questions separates broad adoption from one enthusiastic team.',
          ],
        },
        {
          type: 'gallery',
          chrome: true,
          items: [
            {
              src: A + '/usage-charts.webp',
              label: 'Questions by department and by data product',
              url: 'dataportal / admin / agent-usage',
            },
            {
              src: A + '/usage-department.webp',
              label: 'The same view scoped to one department',
              url: 'dataportal / admin / agent-usage',
            },
          ],
        },
        {
          type: 'crosslink',
          to: 'portal',
          section: 'navigation',
          k: 'Where it is used',
          title: 'The portal the agent is embedded in',
          text: 'The agent is not a separate destination. It sits on the product page people were already on.',
        },
      ],
    },
    {
      id: 'story-two',
      label: 'What is asked',
      icon: 'search',
      blocks: [
        {
          type: 'prose',
          lead: 'Story two: what people are actually asking',
          body: [
            'The second story is the one nobody had before. Every conversation is a person telling you, in their own words, what they could not find on their own. Read in bulk, that is the most direct product feedback the platform has ever had.',
          ],
        },
        {
          type: 'split',
          src: A + '/conversations.webp',
          media: 'Every conversation, filterable by product, department and date',
          chrome: true,
          url: 'dataportal / admin / agent-usage / conversations',
          title: 'The log is the research',
          body: 'Filterable by product, department and period, so a product owner can read a fortnight of real questions about their own data product in one sitting.',
        },
        {
          type: 'split',
          src: A + '/thread-summary.webp',
          media: 'A full conversation with its generated summary',
          chrome: true,
          url: 'dataportal / admin / agent-usage / conversations',
          flip: true,
          title: 'And each thread opens whole',
          body: 'The question, the clarifying turns, what the agent answered and what it generated. Reading the failures matters more than reading the successes.',
        },
      ],
    },
    {
      id: 'story-three',
      label: 'What is failing',
      icon: 'alert',
      blocks: [
        {
          type: 'prose',
          lead: 'Story three: where the product is quietly wrong',
          body: [
            'This is the one that paid for the whole thing. A question the agent answers badly is almost never an agent problem. It is a missing description, an undocumented column, a definition two departments disagree about. The dashboard turned that into a queue.',
          ],
        },
        {
          type: 'highlight',
          figure: 'spark',
          k: 'It found the firm\u2019s own gaps',
          text: 'Clusters of poor answers pointed straight at the metadata behind them. Fixing the description fixed every future answer that would have leaned on it, which made the dashboard a data quality instrument rather than an analytics page.',
        },
        {
          type: 'gallery',
          chrome: true,
          items: [
            {
              src: A + '/generated-sql.webp',
              label: 'The SQL the agent generated, open for inspection',
              url: 'dataportal / admin / agent-usage',
            },
            {
              src: A + '/ecosystem.webp',
              label: 'The ecosystem view built from what people asked',
              url: 'dataportal / admin / agent-usage',
            },
          ],
        },
      ],
    },
    {
      id: 'outcome',
      label: 'Outcome',
      icon: 'trend',
      blocks: [
        {
          type: 'prose',
          lead: 'What changed',
          body: [
            'The agent lowered the cost of asking a question about a data product from a support ticket to a sentence. The dashboard did something less expected: it made the platform team the best informed people in the building about their own product.',
          ],
        },
        {
          type: 'list',
          title: 'What it moved',
          items: [
            'Product owners started reading real questions about their own data products instead of guessing at them.',
            'Poor answers became a metadata backlog with an owner, rather than an anecdote in a meeting.',
            'Adoption arguments got settled with the department split rather than with opinion.',
            'The usage view became the thing other internal teams asked for once they saw it, which is how the platform spread.',
          ],
        },
      ],
    },
    {
      id: 'learnings',
      label: 'Learnings',
      icon: 'book',
      blocks: [
        {
          type: 'prose',
          lead: 'What I took from it',
          body: ['Both lessons are about restraint.'],
        },
        {
          type: 'list',
          items: [
            'An agent that asks two short questions before answering is trusted more than one that answers immediately, even when the immediate answer would have been right. The asking is what makes the answer legible.',
            'Instrumenting the assistant turned out to be worth more than the assistant. Watching what people ask is the cheapest research the platform has, and it runs whether or not anyone is looking.',
          ],
        },
      ],
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // 1 · Data portal and data factory
  // Written around the argument rather than the screens: the org had data
  // everywhere and no way to trust any of it, and every downstream AI answer
  // inherited that.
  portal: [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'grid',
      blocks: [
        {
          type: 'context',
          title: 'Before any of this makes sense',
          items: [
            {
              icon: 'database',
              k: 'Data product',
              v: 'A dataset the firm treats as a product: it has an owner, a fixed shape, a quality bar and teams that depend on it. Not a table someone exported once.',
            },
            {
              icon: 'search',
              k: 'Data portal',
              v: 'The front door. One place to search every data product in the firm and see, before you use it, whether it can be trusted.',
            },
            {
              icon: 'flow',
              k: 'Data factory',
              v: 'The pipelines that build and refresh those products. Put behind the same door, so the data and the machinery keeping it current are one click apart.',
            },
          ],
          links: [
            {
              to: 'ingestion',
              section: 'overview',
              k: 'Related',
              title: 'How a data product gets registered',
            },
            {
              to: 'agent',
              section: 'overview',
              k: 'Related',
              title: 'The agent that answers questions about one',
            },
          ],
        },
        {
          type: 'prose',
          lead: 'One place to find data, and a reason to trust it',
          body: [
            'Teams across the firm needed data from outside their own department, and there was no single place to go and no way to tell whether what they found was current, governed or safe to use. The portal is the front door. The data factory behind it is what makes anything in the portal worth believing.',
          ],
        },
        {
          type: 'stats',
          items: [
            { k: 'Context', v: 'Enterprise platform' },
            { k: 'My role', v: 'Product design, UX engineering' },
            { k: 'Surfaces', v: 'Portal, product pages, factory' },
            { k: 'Users', v: 'Risk, Finance, Investment, Tech' },
          ],
        },
        {
          type: 'feature',
          src: W + '/browse.webp',
          media: 'Browsing data products by department',
          chrome: true,
          url: 'dataportal / departments / risk',
          title: 'Search first, browse second',
          body: 'Most people arrive knowing what they need in business language, not in table names. Search leads, department browsing is the fallback for people who want to see the shape of a domain before they commit to a query.',
        },
      ],
    },
    {
      id: 'problem',
      label: 'The problem',
      icon: 'alert',
      blocks: [
        {
          type: 'prose',
          lead: 'The data was fine. Everything around it was not.',
          body: [
            'Teams needed data across the whole organisation, so they collected it in spreadsheets. Even with the best templates, normalisation and validation happened by hand and inconsistently, and every workbook diverged a little further from the last. That was survivable while people read the numbers themselves. It stopped being survivable the moment anything automated tried to.',
          ],
        },
        {
          type: 'highlight',
          figure: 'spark',
          k: 'Bad structure is not a data problem, it is a model problem',
          text: 'Feeding those spreadsheets into anything downstream degraded the results, and it degraded them quietly. The answers looked plausible. Tracing a wrong answer back through an undocumented workbook to the column that caused it took days, and usually nobody bothered.',
        },
        {
          type: 'list',
          title: 'What people actually hit',
          items: [
            'No way to find out whether a data product already existed, so several teams built the same one.',
            'No shared definition of a field, so two departments reported different numbers for the same question and both were right.',
            'No visible ownership, so a question about a column had no obvious person to ask.',
            'No lineage, so nobody could answer what breaks if this changes.',
          ],
        },
      ],
    },
    {
      id: 'navigation',
      label: 'Navigation',
      icon: 'search',
      blocks: [
        {
          type: 'prose',
          lead: 'A catalogue people can enter from any direction',
          body: [
            'The hardest navigation problem here was that there is no single right hierarchy. A risk analyst thinks in departments, an engineer thinks in source systems, and somebody new thinks in plain questions. The portal supports all three rather than picking one and making the other two wrong.',
          ],
        },
        {
          type: 'gallery',
          chrome: true,
          items: [
            {
              src: W + '/landing.webp',
              label: 'The landing view, with the catalogue sized up front',
              url: 'dataportal',
            },
            {
              src: W + '/departments.webp',
              label: 'Browsing by department',
              url: 'dataportal / departments',
            },
          ],
        },
        {
          type: 'split',
          src: W + '/search-results.webp',
          media: 'Search results with the assistant alongside',
          chrome: true,
          url: 'dataportal / search',
          title: 'Results, then help reading them',
          body: 'A search returns products, and beside them an assistant that explains why these results and what the differences between them are. Someone who does not yet know the vocabulary gets a way in that is not a support ticket.',
        },
      ],
    },
    {
      id: 'product',
      label: 'Product page',
      icon: 'layers',
      blocks: [
        {
          type: 'prose',
          lead: 'Everything a person needs before they commit',
          body: [
            'The product page carries a great deal: what this is, who owns it, how fresh it is, what the columns mean, how good the data is, who already has access and where it came from. The design problem was density. Every tab is a question somebody asked before they were willing to use the thing.',
          ],
        },
        {
          type: 'feature',
          src: W + '/product-overview.webp',
          media: 'A data product overview',
          chrome: true,
          url: 'dataportal / active-risk',
          title: 'Overview answers the first question',
          body: 'What it is, in a sentence a non-specialist can read, then the metadata that decides whether it is fit for the purpose in front of them.',
          points: [
            'Ownership and stewardship named, so questions have an address.',
            'Refresh cadence and classification sit next to the description, not three clicks away.',
          ],
        },
        {
          type: 'gallery',
          chrome: true,
          items: [
            {
              src: W + '/column-metadata.webp',
              label: 'Column level metadata, business and technical side by side',
              url: 'dataportal / active-risk / metadata',
            },
            {
              src: W + '/quality-scorecard.webp',
              label: 'Quality scored across dimensions',
              url: 'dataportal / active-risk / quality',
            },
          ],
        },
      ],
    },
    {
      id: 'quality',
      label: 'Quality',
      icon: 'chart',
      blocks: [
        {
          type: 'prose',
          lead: 'Quality had to be a number, not a promise',
          body: [
            'Everyone claims their data is good. The scorecard makes it specific: completeness, validity, timeliness, each measured and each traceable to the check that produced it. A low score is not a failure state, it is information you can act on before you build on top of it.',
          ],
        },
        {
          type: 'split',
          src: W + '/quality-gauges.webp',
          media: 'Quality dimensions with the underlying checks',
          chrome: true,
          url: 'dataportal / active-risk / quality',
          flip: true,
          title: 'Every score opens into its evidence',
          body: 'A gauge that cannot be interrogated is decoration. Each dimension expands to the rules behind it, what they run against and when they last passed.',
        },
        {
          type: 'split',
          src: W + '/dq-agent.webp',
          media: 'Asking the quality assistant about a recommendation',
          chrome: true,
          url: 'dataportal / active-risk / quality',
          title: 'And a way to ask about it in words',
          body: 'The quality assistant answers questions about a specific check on a specific product, which is what people actually want at the moment they are looking at a score they do not like.',
        },
        {
          type: 'crosslink',
          to: 'agent',
          section: 'overview',
          k: 'The other half',
          title: 'The agent behind the Data Q&A button',
          text: 'The quality panel answers whether a product is sound. Asking it a question in words is a separate build, and its own case study.',
        },
      ],
    },
    {
      id: 'governance',
      label: 'Governance',
      icon: 'shield',
      blocks: [
        {
          type: 'prose',
          lead: 'Access, entitlement and lineage in the open',
          body: [
            'Governance usually lives in a system nobody outside the governance team opens. Putting it on the product page changes who can answer a question about it, which is the whole point.',
          ],
        },
        {
          type: 'gallery',
          chrome: true,
          items: [
            {
              src: W + '/entitlements.webp',
              label: 'Who has access to this product, and through which role',
              url: 'dataportal / active-risk / access',
            },
            {
              src: W + '/usage-by-user.webp',
              label: 'Who is actually using it',
              url: 'dataportal / active-risk / usage',
            },
          ],
        },
      ],
    },
    {
      id: 'lineage',
      label: 'Lineage',
      icon: 'flow',
      blocks: [
        {
          type: 'prose',
          lead: 'The graph that sold the product',
          body: [
            'Lineage turned out to be the thing that moved people. Not because it was new, but because it was the first time anyone could see the whole chain in one picture and point at it in a meeting. What breaks if this changes stopped being a research task and became a glance.',
          ],
        },
        {
          type: 'feature',
          src: W + '/lineage.webp',
          media: 'Lineage across upstream sources and downstream consumers',
          chrome: true,
          url: 'dataportal / active-risk / lineage',
          title: 'Upstream and downstream in one frame',
          body: 'Sources on the left, the product in the middle, everything that depends on it to the right. Colour separates the kinds of node so the shape of the dependency is readable before any label is.',
          points: [
            'Expand a node to see the columns that actually carry the dependency.',
            'The same graph is what the assistant generates when someone asks in words.',
          ],
        },
        {
          type: 'split',
          src: W + '/lineage-detail.webp',
          media: 'Column level lineage between two products',
          chrome: true,
          url: 'dataportal / lineage',
          flip: true,
          title: 'Down to the column',
          body: 'Product level lineage answers whether something is connected. Column level answers whether this change affects you, which is the question people are usually really asking.',
        },
      ],
    },
    {
      id: 'factory',
      label: 'Data factory',
      icon: 'code',
      blocks: [
        {
          type: 'prose',
          lead: 'The half nobody sees',
          body: [
            'The portal is only trustworthy if the pipelines behind it are legible. The factory is where a team registers a workspace, wires up services, and watches the jobs that keep every product in the catalogue current.',
          ],
        },
        {
          type: 'gallery',
          chrome: true,
          items: [
            {
              src: W + '/workspaces.webp',
              label: 'Workspaces with their platform versions and update state',
              url: 'dataportal / admin / workspaces',
            },
            {
              src: W + '/services.webp',
              label: 'Services and compute attached to a workspace',
              url: 'dataportal / admin / services',
            },
          ],
        },
        {
          type: 'split',
          src: W + '/run-history.webp',
          media: 'Run history for a pipeline',
          chrome: true,
          url: 'dataportal / jobs / tnc-proposals',
          title: 'Runs read as a history, not a status light',
          body: 'A single green tick tells you nothing about whether this pipeline is healthy. The run timeline shows the pattern, so a job that has been slowly degrading for a fortnight is visible before it fails.',
        },
        {
          type: 'gallery',
          chrome: true,
          items: [
            {
              src: W + '/execution-timeline.webp',
              label: 'The steps inside one execution',
              url: 'dataportal / jobs / run',
            },
            {
              src: W + '/run-failure.webp',
              label: 'A failure, with the step and the error that caused it',
              url: 'dataportal / jobs / run',
            },
          ],
        },
        {
          type: 'crosslink',
          to: 'ingestion',
          section: 'autofill',
          k: 'Where products come from',
          title: 'The form that puts a product here in the first place',
          text: 'Everything the portal shows about a product was captured at registration. That form is the reason this page has anything worth reading.',
        },
      ],
    },
    {
      id: 'outcome',
      label: 'Outcome',
      icon: 'trend',
      blocks: [
        {
          type: 'prose',
          lead: 'What changed',
          body: [
            'The portal gave the firm a shared vocabulary for its own data, and the lineage graph gave it a way to argue about change without a week of investigation first. Both of those are worth more than the catalogue itself.',
          ],
        },
        {
          type: 'list',
          title: 'What it moved',
          items: [
            'Duplicate build work fell, because teams could see a product already existed before starting one.',
            'Definition arguments got shorter, because both parties were reading the same field description.',
            'Impact analysis became a conversation over a graph rather than a research exercise.',
            'The catalogue became the thing other internal teams asked to be added to, which is the only adoption signal that counts.',
          ],
        },
      ],
    },
    {
      id: 'learnings',
      label: 'Learnings',
      icon: 'book',
      blocks: [
        {
          type: 'prose',
          lead: 'What I took from it',
          body: ['Two things, and the second one surprised me.'],
        },
        {
          type: 'list',
          items: [
            'Density is not the enemy on an expert tool. Hiding the metadata would have made the page calmer and less useful. The work was in ordering it, not in removing it.',
            'The feature that sold the platform internally was not search or quality scoring, it was the picture. A graph people can point at in a meeting travels further than a page of correct information.',
          ],
        },
      ],
    },
  ],

  // ══════════ Guide ══════════
  guide: [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'overview',
      blocks: [
        {
          type: 'context',
          title: 'What Guide was, and what it became',
          items: [
            {
              icon: 'book',
              k: 'LMS',
              v: 'A learning management system: where an organisation keeps its training content and tracks who has worked through it.',
            },
            {
              icon: 'route',
              k: 'The pivot',
              v: 'Eight months in the audience changed from corporate learners to mental health patients, and the research had to earn its place again.',
            },
            {
              icon: 'people',
              k: 'Dual interface',
              v: 'Two products on one base. Therapists assign and track; patients see what to do between sessions.',
            },
          ],
        },
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
          items: [
            {
              label: 'Hi-fi screens',
              src: '/work/guide/hifi.webp',
              chrome: true,
              url: 'guide.app / library',
              ratio: '16 / 10',
            },
          ],
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
          chrome: true,
          url: 'guide.app / library',
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
          type: 'context',
          title: 'What a marketplace is doing inside an HR product',
          items: [
            {
              icon: 'grid',
              k: 'HRMS',
              v: 'A human resource management system: payroll, leave, performance and hiring in one place. Keka is one of India\u2019s larger ones.',
            },
            {
              icon: 'layers',
              k: 'Marketplace',
              v: 'The catalogue of outside tools a company can connect to that system, and the screens for connecting them.',
            },
            {
              icon: 'shield',
              k: 'Integration',
              v: 'One live connection to an outside tool. Each needs setting up, scoped permissions, and a way to see that it is still working.',
            },
          ],
        },
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
          chrome: true,
          url: 'keka.com / marketplace',
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
          chrome: true,
          url: 'keka.com / marketplace',
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
          chrome: true,
          url: 'keka.com / marketplace / app',
          title: 'Understanding before configuring',
          body: 'What the integration does, how it works with Keka, product links and help, all before an admin commits to switching it on.',
        },
        {
          type: 'feature',
          media: 'Security preferences',
          src: '/work/keka-marketplace/security.webp',
          chrome: true,
          url: 'keka.com / marketplace / security',
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
              chrome: true,
              url: 'keka.com / marketplace',
              ratio: '16 / 10',
            },
            {
              label: 'Inbox and approvals',
              src: '/work/keka-marketplace/inbox.webp',
              chrome: true,
              url: 'keka.com / inbox',
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
          type: 'context',
          title: 'The problem this is aimed at',
          items: [
            {
              icon: 'eye',
              k: 'Heads-up display',
              v: 'Information projected into your field of view, so reading it does not mean looking away from the road.',
            },
            {
              icon: 'route',
              k: 'The rider\u2019s problem',
              v: 'Delivery riders on tight windows check a phone at junctions, which is exactly where looking away costs the most.',
            },
            {
              icon: 'search',
              k: 'Field of view',
              v: 'How much a rider takes in without moving their head. It decides where anything on the visor is allowed to sit.',
            },
          ],
        },
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
          type: 'context',
          title: 'Who this is for',
          items: [
            {
              icon: 'people',
              k: 'ADHD',
              v: 'Attention deficit hyperactivity disorder. Among other things it makes starting, sequencing and finishing tasks harder, separately from ability or effort.',
            },
            {
              icon: 'flow',
              k: 'Executive function',
              v: 'Planning, starting and switching between tasks. That is what the app supports, rather than trying to supply motivation.',
            },
            {
              icon: 'device',
              k: 'Dual-device',
              v: 'Two apps, one system. The child plans and completes; the parent supports without having to stand over them.',
            },
          ],
        },
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
