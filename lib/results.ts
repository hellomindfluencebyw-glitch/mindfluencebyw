export type ResultSignal = {
  label: string;
  // null = not yet confirmed. Never fill this with an invented number —
  // only what's been explicitly provided as a real campaign figure.
  value: string | null;
};

export type ProjectResults = {
  id: string;
  title: string;
  signals: ResultSignal[];
};

export const RESULTS: ProjectResults[] = [
  {
    id: "testimony-of-three",
    title: "Testimony of Three",
    signals: [
      { label: "Paid Spend", value: "Zero" },
      { label: "Peak Weekly Reach Growth", value: "+64.9K%" },
      { label: "Engagement Rate at Audit", value: "13% (vs 6% nano-account average)" },
      { label: "Profile Views / 30 Days", value: "4.7K" },
      { label: "Identity vs Product Content", value: "2.5x better performance" },
    ],
  },
  {
    id: "muratish",
    title: "Muratish",
    signals: [
      { label: "Views / 30 Days", value: "10,369" },
      { label: "Accounts Reached", value: "1,670" },
      { label: "Non-Follower Views", value: "66.2%" },
      { label: "Follower Growth", value: "+6.3% to 322" },
      { label: "Profile Visits", value: "132" },
    ],
  },
  {
    id: "potato-treats",
    title: "Potato Treats",
    signals: [
      { label: "Peak Engagement Rate", value: "53%" },
      { label: "Audience Read", value: "B2B, not consumer" },
      { label: "Reach Post-Repositioning", value: null },
      { label: "Follower Growth Post-Repositioning", value: null },
    ],
  },
  {
    id: "aether-aura",
    title: "Aether Aura",
    signals: [
      { label: "Brand Build", value: "0 to 1, complete" },
      { label: "Instagram Launch", value: "Upcoming" },
      { label: "Reach", value: null },
      { label: "Followers", value: null },
    ],
  },
  {
    id: "murata-wakwa",
    title: "Murata Wakwa",
    signals: [
      { label: "Paid Spend", value: null },
      { label: "Reach", value: null },
      { label: "Followers", value: null },
    ],
  },
];
