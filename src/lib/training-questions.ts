/**
 * Source of truth for the Agent Training questionnaire.
 *
 * Used by:
 *   - /admin/training form (renders sections and questions)
 *   - /api/training (builds the markdown attachment from saved answers)
 *
 * Add or reorder questions here and both surfaces stay in sync.
 * Stable `id`s are important: they key the saved answers and the markdown.
 */

export type TrainingQuestionType = "shorttext" | "textarea" | "radio" | "multiselect";

export interface TrainingQuestion {
  id: string;
  label: string;
  helper?: string;
  type: TrainingQuestionType;
  options?: readonly string[];
  rows?: number;
  placeholder?: string;
  optional?: boolean;
}

export interface TrainingSection {
  id: string;
  title: string;
  eyebrow?: string;
  intro?: string;
  questions: TrainingQuestion[];
}

export const TRAINING_SECTIONS: readonly TrainingSection[] = [
  {
    id: "agent-brief",
    eyebrow: "Section 0",
    title: "About this agent",
    intro:
      "Quick context-setting before the business questions. This tells us what kind of agent we're actually building.",
    questions: [
      {
        id: "agent-jobs",
        label: "What jobs do you want the agent to do? Pick any.",
        type: "multiselect",
        options: [
          "Greet visitors",
          "Qualify new leads",
          "Answer common FAQs",
          "Book showroom visits",
          "Route inquiries to the right person",
          "Follow up on stale quotes",
          "Recommend products by category",
          "Help individuals shop home-office",
        ],
      },
      {
        id: "agent-name",
        label: "Should the agent have a name and personality?",
        helper: "Examples: \"Hudson\", \"Vivi\", \"HVOF Assistant\". Leave blank if no preference.",
        type: "shorttext",
        optional: true,
        placeholder: "Hudson",
      },
      {
        id: "agent-placement",
        label: "Where should it live on the site?",
        type: "multiselect",
        options: [
          "Sitewide chat bubble (bottom-right)",
          "Only on /quote-request",
          "Embedded inline on category pages",
          "Only on /contact",
          "Floating panel that opens on a button",
        ],
      },
      {
        id: "agent-languages",
        label: "Languages.",
        type: "radio",
        options: ["English only", "English and Spanish", "Other (note in answer)"],
      },
    ],
  },

  {
    id: "about-hvof",
    eyebrow: "Section 1",
    title: "About HVOF",
    questions: [
      {
        id: "founding-story",
        label: "Tell us the founding story in 3 to 5 sentences.",
        helper: "Where it started, when, why, and what has changed since.",
        type: "textarea",
        rows: 6,
      },
      {
        id: "customer-understanding",
        label: "What do you wish more customers understood about HVOF before they reach out?",
        type: "textarea",
        rows: 5,
      },
      {
        id: "differentiators",
        label: "What 3 things make HVOF different from Staples, Office Depot, or buying direct from Steelcase or MillerKnoll?",
        type: "textarea",
        rows: 5,
      },
      {
        id: "one-sentence-pitch",
        label: "If a stranger summed up HVOF in one sentence, what should it say?",
        type: "textarea",
        rows: 3,
      },
      {
        id: "always-mention",
        label: "What is the one thing the agent should always work into the conversation if it can?",
        helper: "30 years in business, NYS OGS contract, free space planning, etc.",
        type: "textarea",
        rows: 3,
      },
    ],
  },

  {
    id: "voice-tone",
    eyebrow: "Section 2",
    title: "Voice and tone",
    questions: [
      {
        id: "sound-like-words",
        label: "3 words that describe how HVOF should sound.",
        helper: "Examples: warm, honest, expert.",
        type: "shorttext",
        placeholder: "warm, honest, expert",
      },
      {
        id: "never-sound-like-words",
        label: "3 words HVOF should never sound like.",
        helper: "Examples: pushy, corporate, salesy.",
        type: "shorttext",
        placeholder: "pushy, corporate, salesy",
      },
      {
        id: "voice-example",
        label: "Paste 2 or 3 sentences in your real voice.",
        helper: "A recent email, quote, or message you were proud of works perfectly.",
        type: "textarea",
        rows: 6,
      },
      {
        id: "never-use-phrases",
        label: "Words or phrases the agent should never use.",
        helper: "Brand names you avoid, industry jargon, salesy clichés, etc.",
        type: "textarea",
        rows: 3,
        optional: true,
      },
      {
        id: "formality-level",
        label: "How formal should the agent be?",
        type: "radio",
        options: [
          "Casual. \"Hey, what are you looking for?\"",
          "Friendly-professional. \"Hi there, how can we help?\"",
          "Polished. \"Good afternoon, how may I assist you?\"",
        ],
      },
    ],
  },

  {
    id: "team-routing",
    eyebrow: "Section 3",
    title: "Team and routing",
    intro: "When the agent runs into something it shouldn't answer alone, who does it pull in?",
    questions: [
      {
        id: "big-projects",
        label: "Who handles big commercial projects (multi-floor, full-buildout)?",
        type: "shorttext",
      },
      {
        id: "individuals",
        label: "Who handles individuals and home offices?",
        type: "shorttext",
      },
      {
        id: "gov-school",
        label: "Who handles NYS, county, town, and school orders?",
        type: "shorttext",
      },
      {
        id: "healthcare-clients",
        label: "Who handles healthcare clients?",
        type: "shorttext",
      },
      {
        id: "customer-service",
        label: "Who handles existing-customer issues (warranty, damage, returns)?",
        type: "shorttext",
      },
      {
        id: "escalation-triggers",
        label: "When should the agent stop and bring in a human? Give 3 to 5 examples.",
        type: "textarea",
        rows: 6,
      },
      {
        id: "after-hours",
        label: "After hours: what should the agent do with a lead that lands at 9pm on Saturday?",
        type: "textarea",
        rows: 3,
      },
    ],
  },

  {
    id: "products-pricing",
    eyebrow: "Section 4",
    title: "Products and pricing",
    questions: [
      {
        id: "strongest-categories",
        label: "Of the 9 categories, which 3 are strongest? Why?",
        helper:
          "Seating, Desks, Conference, Healthcare, Education, Preowned, Reception, Panel Systems and Pods, Systems.",
        type: "textarea",
        rows: 5,
      },
      {
        id: "growth-categories",
        label: "Which categories do you want to grow in 2026?",
        type: "textarea",
        rows: 3,
      },
      {
        id: "pricing-posture",
        label: "Pricing posture in one line.",
        type: "radio",
        options: [
          "Premium",
          "Mid-market",
          "Best value (mid-market price, premium service)",
          "It depends. Note in next answer.",
        ],
      },
      {
        id: "pricing-rules",
        label: "When can the agent share a price, and when should it always pivot to a quote?",
        type: "textarea",
        rows: 5,
      },
      {
        id: "top-ask-products",
        label: "Top 5 products people ask about by name.",
        helper: "One per line is fine.",
        type: "textarea",
        rows: 5,
      },
      {
        id: "lead-times",
        label: "Lead times: in-stock chair vs custom desk vs 50-station office.",
        helper: "Even rough ranges help. The agent will calibrate customer expectations from these.",
        type: "textarea",
        rows: 5,
      },
      {
        id: "financing-terms",
        label: "Financing, lease-to-own, net-30 terms: yes, no, and under what rules?",
        type: "textarea",
        rows: 4,
      },
    ],
  },

  {
    id: "services",
    eyebrow: "Section 5",
    title: "Services",
    questions: [
      {
        id: "space-planning-process",
        label: "Walk through your space-planning process in 3 to 5 steps.",
        type: "textarea",
        rows: 6,
      },
      {
        id: "install-team",
        label: "Who installs? In-house, subcontracted, or both? How far do you travel?",
        type: "textarea",
        rows: 4,
      },
      {
        id: "delivery-radius",
        label: "Delivery radius. Where does it stop being free?",
        type: "textarea",
        rows: 3,
      },
      {
        id: "removal-decommissioning",
        label: "Furniture removal, decommissioning, or recycling. What you offer and what it costs.",
        type: "textarea",
        rows: 4,
      },
      {
        id: "reconfiguration",
        label: "Do you reconfigure existing panels and cubicles for clients?",
        type: "textarea",
        rows: 3,
      },
      {
        id: "sell-your-furniture",
        label: "Sell Your Furniture program. When do you buy back, take for free, or decline?",
        type: "textarea",
        rows: 4,
      },
    ],
  },

  {
    id: "customers-markets",
    eyebrow: "Section 6",
    title: "Customers and markets",
    questions: [
      {
        id: "top-customer-types",
        label: "Top 3 customer types by revenue.",
        helper: "Commercial offices, schools, government, healthcare, individuals, etc.",
        type: "textarea",
        rows: 3,
      },
      {
        id: "top-industries",
        label: "Top 3 industries you serve most in the Hudson Valley.",
        type: "textarea",
        rows: 3,
      },
      {
        id: "project-sizes",
        label: "Project sizes: smallest, average, biggest.",
        type: "textarea",
        rows: 4,
      },
      {
        id: "new-vs-refresh",
        label: "Are most projects new builds, move-ins, or refreshes of an existing space?",
        type: "textarea",
        rows: 3,
      },
      {
        id: "how-customers-find-us",
        label: "How do most customers find you?",
        type: "multiselect",
        options: [
          "Referrals",
          "Google search",
          "Google ads",
          "NYS contract listings",
          "Drive-by / showroom signage",
          "Repeat customer",
          "Social media",
          "Trade shows / networking",
          "Other",
        ],
      },
      {
        id: "repeat-percentage",
        label: "Roughly what percentage of business is repeat vs new?",
        type: "shorttext",
        placeholder: "e.g., 60% repeat, 40% new",
      },
    ],
  },

  {
    id: "nys-contract",
    eyebrow: "Section 7",
    title: "NYS contract and government",
    questions: [
      {
        id: "ogs-contracts",
        label: "Which OGS contract(s) are you on right now? Numbers if handy.",
        type: "textarea",
        rows: 3,
      },
      {
        id: "nys-buyer-needs",
        label: "What does a typical NYS buyer need from you (paperwork, quotes, approvals)?",
        type: "textarea",
        rows: 5,
      },
      {
        id: "contract-manufacturers",
        label: "Which manufacturers do you push hardest under the contract?",
        type: "textarea",
        rows: 4,
      },
      {
        id: "repeat-gov-customers",
        label: "Which state agencies, counties, towns, or schools are steady customers?",
        helper: "OK to leave names off if it feels private. Just \"Dutchess County schools\" is fine.",
        type: "textarea",
        rows: 4,
        optional: true,
      },
    ],
  },

  {
    id: "showroom",
    eyebrow: "Section 8",
    title: "Showroom and visiting",
    questions: [
      {
        id: "showroom-basics",
        label: "Confirm: address, hours, parking, loading dock notes.",
        type: "textarea",
        rows: 5,
      },
      {
        id: "walkin-policy",
        label: "Walk-ins welcome or appointment only?",
        type: "radio",
        options: ["Walk-ins welcome any time during hours", "Walk-ins ok but appointments preferred", "Appointment only"],
      },
      {
        id: "display-vs-orderable",
        label: "What's actually on display vs orderable-but-not-shown?",
        type: "textarea",
        rows: 4,
      },
      {
        id: "showroom-push",
        label: "Should the agent push for a showroom visit, or only mention it when asked?",
        type: "radio",
        options: [
          "Always recommend a visit when appropriate",
          "Mention only when the customer is local or asks",
          "Don't push, just answer if asked",
        ],
      },
      {
        id: "virtual-vs-real",
        label: "Virtual tour vs real visit. When do you recommend each?",
        type: "textarea",
        rows: 4,
      },
    ],
  },

  {
    id: "faq",
    eyebrow: "Section 9",
    title: "Common questions",
    intro:
      "For each one below, give your standard answer the way you'd actually say it. If a question doesn't apply, skip it.",
    questions: [
      { id: "faq-individuals", label: "Do you sell to individuals?", type: "textarea", rows: 3 },
      { id: "faq-see-in-person", label: "Can I see this chair in person?", type: "textarea", rows: 3 },
      { id: "faq-assembly", label: "Do you assemble?", type: "textarea", rows: 3 },
      { id: "faq-returns", label: "What's your return policy?", type: "textarea", rows: 3 },
      { id: "faq-warranty", label: "What kind of warranty?", type: "textarea", rows: 3 },
      { id: "faq-delivery-time", label: "How long until delivery?", type: "textarea", rows: 3 },
      { id: "faq-preowned", label: "Do you have used or refurbished?", type: "textarea", rows: 3 },
      { id: "faq-brands", label: "What brands do you carry?", type: "textarea", rows: 3 },
      { id: "faq-discount", label: "Can I get a discount?", type: "textarea", rows: 3 },
      { id: "faq-catalog", label: "Do you have a catalog?", type: "textarea", rows: 3 },
      {
        id: "faq-extras",
        label: "Other top questions and answers. One question per paragraph.",
        helper: "Add anything that gets asked weekly that we missed above.",
        type: "textarea",
        rows: 6,
        optional: true,
      },
    ],
  },

  {
    id: "boundaries",
    eyebrow: "Section 10",
    title: "Boundaries and rules",
    questions: [
      {
        id: "delivery-commitments",
        label: "Can the agent commit to delivery dates?",
        type: "radio",
        options: [
          "Yes, when stock is confirmed",
          "Never. Always say a human will confirm.",
          "Only ranges, never specific dates",
        ],
      },
      {
        id: "price-quoting",
        label: "Can the agent quote prices?",
        type: "radio",
        options: [
          "Yes, on anything listed on the site",
          "Only ranges, never exact",
          "No. Always pivot to a quote",
        ],
      },
      {
        id: "competitor-handling",
        label: "If a customer asks how you compare to a named competitor, what's the right move?",
        type: "textarea",
        rows: 4,
      },
      {
        id: "off-topic-handling",
        label: "Off-topic questions (weather, sports, personal). Redirect or play along briefly?",
        type: "radio",
        options: [
          "Play along briefly, then redirect",
          "Politely redirect right away",
          "Ignore and continue with the inquiry",
        ],
      },
      {
        id: "escalation-script",
        label: "If someone is upset or escalating, what's the de-escalation play?",
        type: "textarea",
        rows: 5,
      },
      {
        id: "named-customers",
        label: "Can the agent name customers HVOF has worked with?",
        helper: "Marist, Marshall + Sterling, etc. Some clients prefer to stay quiet.",
        type: "textarea",
        rows: 4,
      },
    ],
  },

  {
    id: "wins-stories",
    eyebrow: "Section 11",
    title: "Wins and stories",
    intro: "Real anecdotes the agent can reference when relevant. Specific is better than generic.",
    questions: [
      {
        id: "favorite-project",
        label: "Favorite recent project. Who, what, why it went well.",
        type: "textarea",
        rows: 6,
      },
      {
        id: "save-the-day",
        label: "A \"save the day\" moment. Tight deadline, complex install, last-minute change.",
        type: "textarea",
        rows: 6,
      },
      {
        id: "favorite-testimonial",
        label: "A customer quote in their own words you wish was on the website.",
        type: "textarea",
        rows: 4,
      },
      {
        id: "wow-moment",
        label: "A \"wow\" moment a customer had with HVOF.",
        type: "textarea",
        rows: 4,
      },
    ],
  },

  {
    id: "extras",
    eyebrow: "Section 12",
    title: "Anything else",
    questions: [
      {
        id: "tired-of-explaining",
        label: "What's the team most tired of explaining? We'll teach the agent to handle it.",
        type: "textarea",
        rows: 4,
      },
      {
        id: "wish-customers-asked",
        label: "What's a question you wish customers would ask?",
        type: "textarea",
        rows: 4,
      },
      {
        id: "hope-never-asked",
        label: "What's a question you hope the agent never has to answer, and why?",
        type: "textarea",
        rows: 4,
      },
    ],
  },
] as const;

export type TrainingAnswers = Record<string, string | string[]>;

export function flattenQuestions(): TrainingQuestion[] {
  return TRAINING_SECTIONS.flatMap((s) => s.questions);
}

export function countAnsweredInSection(section: TrainingSection, answers: TrainingAnswers): number {
  return section.questions.reduce((n, q) => (isAnswered(answers[q.id]) ? n + 1 : n), 0);
}

export function isAnswered(value: string | string[] | undefined): boolean {
  if (value == null) return false;
  if (Array.isArray(value)) return value.length > 0;
  return value.trim().length > 0;
}
