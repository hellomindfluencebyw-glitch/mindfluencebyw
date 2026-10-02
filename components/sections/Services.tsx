import Section from "./Section";

const SERVICES = [
  ["SOCIAL MEDIA STRATEGY", "Audience research · content strategy · platform strategy · campaign planning"],
  ["SOCIAL CREATIVE", "Carousels · reels · static content · creative concepts · art direction"],
  ["CONTENT MANAGEMENT", "Content calendars · publishing · community management · performance monitoring"],
  ["BRAND & CAMPAIGN", "Campaign concepts · launch campaigns · brand storytelling · creative direction"],
  ["BEHAVIOUR INSIGHTS", "Audience behaviour · social media audits · psychology-informed strategy · content diagnostics"],
];

export default function Services() {
  return (
    <Section id="services" eyebrow="WHAT WE DO" title="A social media creative agency, with a different starting point." description="Psychology is the strategic edge. The deliverable is still strategy, creative and social media work that moves a brand forward.">
      <div className="service-list-new">
        {SERVICES.map(([title, body], i) => (
          <article className="service-row-new" key={title}>
            <span className="service-row-index">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
