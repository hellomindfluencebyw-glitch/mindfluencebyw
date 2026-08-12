export type MemoryProject = {
  id: string;
  title: string;
  tagline: string;
  assetDir: string;
  slideCount: number;
  status: "case study drafted" | "campaign complete" | "in progress" | "ongoing campaign";
  question?: string;
  insight?: string;
  psychology?: string;
  creative?: string;
  result?: string;
  memory?: string;
  // References an id in lib/psychology.ts. This is the headline framework
  // shown as the interactive pill.
  principle?: string;
  howItAppeared?: string;
  // Additional real frameworks that also applied, shown as smaller
  // static tags alongside the primary principle.
  secondaryPrinciples?: string[];
};

export const MEMORY_PROJECTS: MemoryProject[] = [
  {
    id: "muratish",
    title: "Muratish",
    tagline: '"One Kenya. One Cup." — bottled muratina, founder Mike Okoth',
    assetDir: "/work/muratish/",
    slideCount: 5,
    status: "campaign complete",
    question:
      "Muratish had a real cultural product, muratina, with roots most competitors can't manufacture, but zero brand positioning: 268 followers, 435 following, and a bio that read like a product label. How do you turn heritage into a brand people want to be seen with?",
    insight:
      "The account was following more people than it had followers, which reads as a follower, not a brand. Meanwhile the product itself had a story competitors couldn't copy, and zero Gen Z positioning despite the price point and format being right for that audience.",
    psychology:
      "Identity Social Proof: when a choice signals who someone is, and shows people like them are already making it, both identity and social proof reinforce each other at once. Paired with Gen Z Discovery Psychology and In-Group Signalling.",
    creative:
      "The campaign became 'One Kenya. One Cup.' across three parallel directions: Jenga Foundation (a food-pairing series inviting every community in), Muratish Travels (the product placed across the Maasai Mara, Diani Beach, and other iconic Kenyan locations), and What's Inside Every Cup (ingredient transparency). The core line: you're not buying a drink, you're declaring which Kenya you belong to.",
    result:
      "10,369 views in 30 days, 1,670 accounts reached, 66.2% of views from non-followers, and followers up 6.3% to 322 in the period. 221 interactions on the campaign opener alone.",
    memory:
      "A product with real heritage doesn't need invented hype, it needs an invitation people want to accept publicly.",
    principle: "identity-social-proof",
    howItAppeared:
      "The Jenga Foundation opener asked people to declare their own food foundation before the product ever appeared, turning the comment section into a self-identification exercise and a UGC generator at the same time.",
    secondaryPrinciples: ["gen-z-discovery", "in-group-signalling", "belonging"],
  },
  {
    id: "testimony-of-three",
    title: "Testimony of Three",
    tagline: '"First Step" launch — leather goods, founder Wesley Karanja',
    assetDir: "/work/testimony-of-three/",
    slideCount: 2,
    status: "campaign complete",
    question:
      "Wesley Karanja had a craft, not yet a brand: a warm 13% engagement rate (more than double the 6% nano-account average) but only 11 posts, no rhythm, and zero founder-story content. Do we build the identity first, or the audience first?",
    insight:
      "Every piece was designed before it was made, and the founder's own process was a content goldmine sitting completely unused. Captions described products with no hook and no psychological objective, so the warmth in the audience had nothing to hold onto.",
    psychology:
      "Identity Theory and Social Proof, carried by Narrative Transport and the Mere Exposure Effect: let people become absorbed in Wesley's story before asking them to look at a product.",
    creative:
      "Identity-led content before product content. The opening post, \"He didn't start with a brand, he started with a material,\" ran with zero product in frame.",
    result:
      "That opening post pulled 661 views, the highest of any post, and brand-philosophy content outperformed product shots by 2.5x overall. All of it on zero paid spend.",
    memory:
      "People don't follow a product. They follow the person who made it, and the reason they made it.",
    principle: "identity",
    howItAppeared:
      "\"Not everything is a testimony\" opened the campaign with Wesley's own philosophy, not a product shot, and it became the single best-performing post of the entire launch.",
    secondaryPrinciples: ["social-proof", "narrative-transport", "familiarity"],
  },
  {
    id: "aether-aura",
    title: "Aether Aura",
    tagline: "Hair care formulation brand, 0→1 build — Lagos, Nigeria",
    assetDir: "/work/aether-aura/",
    slideCount: 2,
    status: "in progress",
    question:
      "Five real hair care products with a working formulation, but no logo, no packaging, no Instagram, and zero public identity. Most case studies start by auditing what exists. This one starts with nothing to audit.",
    insight:
      "Every design decision had to hold up in two places at once: on physical packaging and inside a social feed, for five different SKUs (Hair Growth Oil, Hair Mist, Avocado Hair Butter, Hair Conditioner, Hair Mask), simultaneously.",
    psychology:
      "This one is architecture before psychology: the framework-level positioning work follows once the brand is live and there's real audience behaviour to read.",
    creative:
      "A full logo mark and color system, packaging-ready labels across all five SKUs, and the Instagram account architecture, built before a single post goes live.",
    result: "Instagram launch is upcoming. This is a pro-bono brand build, currently mid-build.",
    memory: "Sometimes the work is building the room before you can decorate it.",
  },
  {
    id: "potato-treats",
    title: "Potato Treats",
    tagline: "B2B farm-to-kitchen potato processor — Nairobi",
    assetDir: "/work/potato-treats/",
    slideCount: 1,
    status: "campaign complete",
    question:
      "A farm-to-kitchen potato processor was posting consumer-style content to 57 followers and getting almost nothing back, except one processing video that hit a 53% engagement rate. Why did one post behave completely differently from the rest?",
    insight:
      "That processing video (farm footage, washing, cutting, vacuum-sealing) pulled 30 likes on 57 followers. The audience responding wasn't home cooks, it was other food business owners watching a food business operate. The entire strategy pivoted off correctly reading that one data point.",
    psychology:
      "Pain-Point Framing, backed by Authority Building, the Transparency Effect, and Trust Signalling: speak to a specific business frustration, and prove capability by showing it rather than claiming it.",
    creative:
      "Every caption reframed around restaurant-buyer pain points (prep time, consistency, waste reduction), Process Transparency established as the primary content pillar, the Rongai/Nakuru farm origin story led as a traceability claim competitors couldn't make, and a direct B2B CTA added to every post.",
    result:
      "The repositioning is built around the confirmed 53% peak engagement rate and the audience-read that triggered it. Reach and follower figures post-repositioning are still coming in.",
    memory: "The best insight in an account is often the one outlier post everyone else would ignore.",
    principle: "pain-point-framing",
    howItAppeared:
      "The reframe replaced consumer-facing captions with restaurant-buyer language, on the strength of a single video that behaved like B2B content, not consumer content.",
    secondaryPrinciples: ["authority-building", "transparency-effect", "trust-signalling"],
  },
  {
    id: "murata-wakwa",
    title: "Murata Wakwa",
    tagline: '"Made for Friendship" — Tag Your Murata UGC mechanic',
    assetDir: "/work/murata-wakwa/",
    slideCount: 1,
    status: "ongoing campaign",
  },
  {
    id: "mindfluence-content",
    title: "Mindfluence by W",
    tagline: "The agency's own account — psychology applied to every post",
    assetDir: "/work/mindfluence-content/",
    slideCount: 1,
    status: "in progress",
    question:
      "What does it look like when a social media strategist runs their own account the way they'd run a client's?",
    insight:
      "Most social media managers use best practices. Mindfluence by W uses named behavioral frameworks applied deliberately to each content decision, the difference between posting consistently and posting with a psychological objective.",
    memory: "This portfolio is itself a deliverable.",
  },
];
