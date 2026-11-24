
export type ResultSignal = {
  label: string;
  // null = not yet confirmed. Never fill this with an invented number —
  // only what's been explicitly provided as a real campaign figure.
  value: string | null;
  source?: string;
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
      {
        label: "Peak Weekly Reach Growth",
        value: "+64.9K%",
        source: "Instagram Analytics",
      },
      {
        label: "Engagement Rate at Audit",
        value: "13% (vs 6% nano-account average)",
      },
      { label: "Profile Views / 30 Days", value: "4.7K" },
       {
        label: "Identity vs Product Content",
        value: "2.5x better performance",
      },
    ],
  },
  {
    id: "muratish",
    title: "Muratish",
    signals: [
      {
        label: "Views / 30 Days",
        value: "10,369",
        source: "Instagram Analytics",
      },
      {
        label: "Accounts Reached / 30 Days",
        value: "1,670",
        source: "Instagram Analytics",
      },
      {
        label: "Non-Follower Views / 30 Days",
        value: "66.2%",
        source: "Instagram Analytics",
      },
      {
        label: "Follower Growth / 30 Days",
        value: "+6.3% to 322",
        source: "Instagram Analytics",
      },
      {
        label: "Profile Visits / 30 Days",
        value: "132",
        source: "Instagram Analytics",
      },
    ],
  },
  {
    id: "potato-treats",
    title: "Potato Treats",
    signals: [
      {
        label: "Peak Engagement Rate",
        value: "53%",
        source: "Instagram Analytics",
      },
      { label: "Audience Read", value: "B2B, not consumer" },
      {
        label: "Engagement Type",
        value: "Independent audit — no managed tracking",
      },
    ],
  },
{
  id: "aether-aura",
  title: "Aether Aura",
  signals: [
    { label: "Logo Design", value: "Completed" },
    { label: "Visual Identity", value: "Completed" },
    { label: "Packaging Design", value: "Completed" },
    { label: "Brand Audit & Consultation", value: "Completed" },
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
