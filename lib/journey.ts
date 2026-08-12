export type JourneyStop = {
  id: string;
  label: string;
  region?: string; // matches a REGION_ANCHORS key, for brain-region stops
};

export const JOURNEY: JourneyStop[] = [
  { id: "hero", label: "The Mind" },
  { id: "who-we-are", label: "Who We Are" },
  { id: "how-we-think", label: "How We Think" },
  { id: "frontal-lobe", label: "What We Do", region: "frontal-lobe" },
  { id: "brocas-area", label: "Content Studio", region: "brocas-area" },
  { id: "hippocampus", label: "Memory Bank", region: "hippocampus" },
  { id: "occipital-lobe", label: "Creative Gallery", region: "occipital-lobe" },
  { id: "limbic-system", label: "Why It Worked", region: "limbic-system" },
  { id: "results", label: "The Results" },
  { id: "founder", label: "The Founder" },
  { id: "connect", label: "Let's Connect" },
];
