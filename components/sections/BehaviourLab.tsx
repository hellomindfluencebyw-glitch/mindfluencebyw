
      import Section from "./Section";
import { PRINCIPLES } from "@/lib/psychology";
import { assetPath } from "@/lib/assetPath";

const FEATURED_PRINCIPLE_IDS = [
  "social-proof",
  "identity",
  "scarcity",
  "loss-aversion",
  "curiosity-gap",
  "belonging",
  "familiarity",
  "narrative-transport",
] as const;

export default function BehaviourLab() {
  const featuredPrinciples = FEATURED_PRINCIPLE_IDS.map((id) =>
    PRINCIPLES.find((principle) => principle.id === id)
  ).filter((principle): principle is NonNullable<typeof principle> =>
    Boolean(principle)
  );

  return (
    <Section
      id="behaviour-lab"
      eyebrow="BEHAVIOUR LAB / 004"
      title="Study the behaviour. Then make the creative."
      description="An ongoing editorial space examining psychology, social behaviour and digital culture — turning human insight into sharper brand strategy."
    >
      <div className="lab-editorial">
        <article className="lab-investigation">
          <div className="lab-investigation-art">
            <img
              src={assetPath("/work/mindfluence-content/03.jpg")}
              alt="Mindfluence Investigative Series — Issue 001"
              loading="lazy"
            />

            <span className="lab-image-caption">
              AN INVESTIGATION INTO HUMAN BEHAVIOUR
            </span>
          </div>

          <div className="lab-investigation-copy">
            <div className="lab-meta">
              <span>THE INVESTIGATIVE SERIES</span>
              <span>ISSUE NO. 001</span>
            </div>

            <h3>
              Psychology meets
              <span> the marketplace.</span>
            </h3>

            <p>
              We look beneath the surface of campaigns, trends and
              everyday digital behaviour to understand what makes
              people notice, remember, trust and act.
            </p>

            <div className="lab-process">
              <span>OBSERVATION</span>
              <i>→</i>
              <span>MECHANISM</span>
              <i>→</i>
              <span>STRATEGY</span>
              <i>→</i>
              <span>APPLICATION</span>
            </div>
          </div>
        </article>

        <aside className="lab-index">
          <div className="lab-index-heading">
            <span>THE BEHAVIOUR INDEX</span>
            <span>01—08</span>
          </div>

          <div className="lab-principles">
            {featuredPrinciples.map((p, i) => (
              <article className="lab-principle" key={p.id}>
                <span className="lab-principle-number">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="lab-principle-copy">
                  <h4>{p.name}</h4>
                  <p>{p.definition}</p>
                </div>

                <span className="lab-principle-mark">↗</span>
              </article>
            ))}
          </div>

          <div className="lab-index-footer">
            <span>HUMAN PATTERNS / BRAND POSSIBILITIES</span>
            <span>MW — LAB</span>
          </div>
        </aside>
      </div>
    </Section>
  );
}
