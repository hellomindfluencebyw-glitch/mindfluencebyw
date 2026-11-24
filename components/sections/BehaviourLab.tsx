
   "use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

const APPLICATIONS: Record<string, string> = {
  "social-proof":
    "Show credible customer experiences, reviews and evidence of real people choosing the brand. Make the proof specific and believable rather than relying on vague popularity claims.",
  identity:
    "Build creative around the audience's values, aspirations and sense of self. Help people recognise the kind of person or community the brand represents.",
  scarcity:
    "Use genuine limited quantities, deadlines or availability to communicate urgency. The constraint must be real; artificial scarcity can damage trust.",
  "loss-aversion":
    "Frame what an audience stands to miss or lose by delaying a decision. Make the consequence clear without resorting to fear or misleading pressure.",
  "curiosity-gap":
    "Open with a compelling question, unexpected observation or incomplete piece of information. Give the audience a meaningful payoff when they continue watching or reading.",
  belonging:
    "Create shared language, rituals and recognisable cultural references that make the intended audience feel seen and included.",
  familiarity:
    "Use consistent visual cues, messaging and recurring content formats. Repeated, recognisable exposure can help a brand become easier to remember.",
  "narrative-transport":
    "Turn product benefits into stories people can follow. Use relatable situations, tension and resolution to make the brand's message more memorable.",
};

export default function BehaviourLab() {
  const [openPrinciple, setOpenPrinciple] = useState<string | null>(null);

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
            {featuredPrinciples.map((p, i) => {
              const isOpen = openPrinciple === p.id;
              const applicationId = `principle-application-${p.id}`;

              return (
                <article
                  className={`lab-principle${isOpen ? " is-open" : ""}`}
                  key={p.id}
                >
                  <button
                    type="button"
                    className="lab-principle-trigger"
                    aria-expanded={isOpen}
                    aria-controls={applicationId}
                    onClick={() =>
                      setOpenPrinciple(isOpen ? null : p.id)
                    }
                  >
                    <span className="lab-principle-number">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="lab-principle-copy">
                      <span className="lab-principle-name">{p.name}</span>
                      <span className="lab-principle-definition">
                        {p.definition}
                      </span>
                    </span>

                    <span
                      className="lab-principle-mark"
                      aria-hidden="true"
                    >
                      {isOpen ? "−" : "↗"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={applicationId}
                        className="lab-principle-application"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="lab-application-inner">
                          <span className="lab-application-label">
                            STRATEGIC APPLICATION
                          </span>
                          <p>{APPLICATIONS[p.id]}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
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
