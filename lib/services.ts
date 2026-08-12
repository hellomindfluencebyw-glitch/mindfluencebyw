export type ServiceNode = {
  id: string;
  label: string;
  description: string;
  // Other real service ids this one works alongside. Used to show the
  // services as one connected system rather than isolated cards.
  relatesTo?: string[];
};

export const STRATEGY_SERVICES: ServiceNode[] = [
  {
    id: "social-strategy",
    label: "Social Media Strategy",
    description:
      "A plan for what gets posted, when, and why, built around how your specific audience actually thinks and decides, not generic best practices.",
 
    relatesTo: ["content-strategy", "social-audits"],
  },
  {
    id: "brand-strategy",
    label: "Brand Strategy",
    description:
      "The positioning underneath everything else: what a brand stands for, who it's for, and why that matters to the people you want to reach.",
 
    relatesTo: ["content-strategy", "marketing-psychology"],
  },
  {
    id: "marketing-psychology",
    label: "Marketing Psychology",
    description:
      "The behavioural science layer: applying named psychological frameworks, like social proof, loss aversion, and identity signalling, to how a campaign is built.",
 
    relatesTo: ["consumer-behaviour", "brand-strategy"],
  },
  {
    id: "consumer-behaviour",
    label: "Consumer Behaviour",
    description:
      "Understanding why people actually buy, scroll past, or share something, so creative decisions aren't guesses.",
 
    relatesTo: ["marketing-psychology", "social-audits"],
  },
  {
    id: "social-audits",
    label: "Social Media Audits",
    description:
      "A structured look at what's working, what isn't, and what's being left on the table across a brand's existing content.",
 
    relatesTo: ["social-strategy", "consumer-behaviour"],
  },
  {
    id: "content-strategy",
    label: "Content Strategy",
    description:
      "The bridge between brand strategy and what actually gets made: themes, formats, and cadence mapped to a goal.",
 
    relatesTo: ["social-strategy", "brand-strategy"],
  },
];

export const CONTENT_SERVICES: ServiceNode[] = [
  {
    id: "carousels",
    label: "Carousels",
    description:
      "Multi-slide posts built to be swiped through in full, using pacing and curiosity to keep attention slide to slide.",
 
    relatesTo: ["creative-concepts", "captions"],
  },
  {
    id: "scripts",
    label: "Scripts",
    description:
      "Written structure for video and voice content, built around a hook, a build, and a payoff.",
 
    relatesTo: ["creative-concepts", "captions"],
  },
  {
    id: "captions",
    label: "Captions",
    description:
      "The copy underneath the visual, doing the psychological work of framing, context, or a call to action.",
 
    relatesTo: ["carousels", "scripts"],
  },
  {
    id: "creative-concepts",
    label: "Creative Concepts",
    description:
      "The core idea behind a campaign or series, before it's translated into individual pieces of content.",
 
    relatesTo: ["carousels", "scripts", "content-systems"],
  },
  {
    id: "content-systems",
    label: "Content Systems",
    description:
      "Repeatable templates and formats so a brand's content stays consistent without starting from zero each time.",
 
    relatesTo: ["creative-concepts"],
  },
];
