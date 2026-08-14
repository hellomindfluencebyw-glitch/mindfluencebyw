export type Service = {
  name: string;
  description: string;
};

export type ServiceCategory = {
  id: string;
  name: string;
  tagline: string;
  services: Service[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "strategy",
    name: "Strategy",
    tagline: "We plan with purpose.",
    services: [
      { name: "Brand Strategy", description: "Position your brand to stand out." },
      { name: "Social Media Strategy", description: "Data-driven plans aligned with business goals." },
      { name: "Marketing Consulting", description: "Expert guidance for smarter marketing decisions." },
      { name: "Launch Planning", description: "Strategic launch plans designed to create impact." },
    ],
  },
  {
    id: "content-system",
    name: "Content System",
    tagline: "Content that connects.",
    services: [
      { name: "Content Creation", description: "Scroll-stopping content that tells your story." },
      {
        name: "Social Media Management",
        description: "We handle your content so you can focus on your business.",
      },
      { name: "Copywriting", description: "Words that inspire, engage and sell." },
      { name: "Video & Reels", description: "Short-form video designed to drive reach and results." },
    ],
  },
  {
    id: "brand-identity",
    name: "Brand Identity",
    tagline: "Build a brand people believe in.",
    services: [
      { name: "Brand Positioning", description: "Own your space in the market." },
      {
        name: "Brand Voice",
        description: "A voice that reflects who you are and connects with your audience.",
      },
      { name: "Visual Identity", description: "Design that makes your brand instantly recognisable." },
      { name: "Personal Branding", description: "Build influence as a brand, not just a business." },
    ],
  },
  {
    id: "growth-engine",
    name: "Growth Engine",
    tagline: "Grow with intention.",
    services: [
      { name: "Organic Growth", description: "Grow your audience organically and sustainably." },
      { name: "Social SEO", description: "Optimise your content to be discovered." },
      {
        name: "Paid Ads",
        description: "Strategic advertising designed to deliver measurable results.",
      },
      { name: "Influencer Marketing", description: "Partner with the right voices to expand your reach." },
    ],
  },
  {
    id: "campaign-studio",
    name: "Campaign Studio",
    tagline: "Ideas that move people.",
    services: [
      { name: "Product Launches", description: "Launch with strategy and make an impact." },
      { name: "Hospitality Marketing", description: "Marketing that fills rooms and builds loyalty." },
      { name: "Seasonal Campaigns", description: "Timely campaigns that capture attention." },
      { name: "Community Building", description: "Build communities that engage and stay." },
      {
        name: "Event & Experience Marketing",
        description: "Experiences that strengthen your brand both offline and online.",
      },
    ],
  },
  {
    id: "behaviour-lab",
    name: "Behaviour Lab",
    tagline: "Psychology drives performance.",
    services: [
      { name: "Consumer Behaviour", description: "Understand your audience on a deeper level." },
      { name: "Analytics & Reporting", description: "Clear reports that show what's working." },
      { name: "Market Research", description: "Data-backed insights for better decisions." },
      {
        name: "Performance Tracking",
        description: "Track, analyse and optimise performance for growth.",
      },
    ],
  },
];
