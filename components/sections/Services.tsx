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
    <Section
      id="services"
      eyebrow="WHAT WE DO"
      title="A social media creative agency, with a different starting point."
      description="Psychology is the strategic edge. The deliverable is still strategy, creative and social media work that moves a brand forward."
    >
      <div className="service-list-new">
        <div className="service-neural-line" aria-hidden="true">
          <span className="service-neural-pulse" />
        </div>

        <div className="service-editorial-stage">
          <div className="service-editorial-copy" aria-hidden="true">
            <span className="service-editorial-kicker">
              INSIGHT / IDEAS / IMPACT
            </span>

            <p className="service-editorial-headline">
              THINK DEEP.
              <br />
              <span>MAKE BOLD.</span>
            </p>

            <span className="service-editorial-footer">
              PSYCHOLOGY INFORMS THE THINKING. CREATIVITY MAKES IT VISIBLE.
            </span>
          </div>

          <div className="service-creative-orbit" aria-hidden="true">
            <div className="creative-asset creative-campaign">
              <span className="campaign-kicker">THE BIG IDEA</span>
              <span className="campaign-visual" />
              <span className="campaign-title">
                MAKE IT<br />MATTER.
              </span>
              <span className="campaign-footer">MINDFLUENCE STUDIO</span>
            </div>

            <div className="creative-asset creative-carousel">
              <span className="carousel-image" />
              <span className="carousel-line" />
              <span className="carousel-line short" />
              <span className="carousel-pages">01 / 05</span>
            </div>

            <div className="creative-asset creative-reel">
              <span className="reel-image" />
              <span className="reel-play">▶</span>
              <span className="reel-caption">STOP THE SCROLL.</span>
            </div>
          </div>
        </div>

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
