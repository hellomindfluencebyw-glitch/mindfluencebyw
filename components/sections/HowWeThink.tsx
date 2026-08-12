"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import { triggerPathBurst } from "@/components/PathBurst";

const STEPS = [
  {
    n: "01",
    label: "Observe",
    body: "We look at what people are actually doing, not what they say they do.",
    region: null as string | null,
    regionLabel: "",
  },
  {
    n: "02",
    label: "Understand",
    body: "We identify the psychology behind those behaviours: what's driving the decision underneath.",
    region: "limbic-system",
    regionLabel: "Why It Worked",
  },
  {
    n: "03",
    label: "Strategize",
    body: "We turn those insights into a marketing strategy built around how the mind actually works.",
    region: "frontal-lobe",
    regionLabel: "Strategy",
  },
  {
    n: "04",
    label: "Create",
    body: "We turn strategy into content people genuinely want to engage with.",
    region: "brocas-area",
    regionLabel: "Content Studio",
  },
  {
    n: "05",
    label: "Measure",
    body: "We look at what worked, why it worked, and feed that back into the next campaign.",
    region: "results",
    regionLabel: "The Results",
  },
];

export default function HowWeThink() {
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!autoPlay) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setActive((a) => (a + 1) % STEPS.length);
    }, 4200);
    return () => clearInterval(id);
  }, [autoPlay]);

  function select(i: number, focus = false) {
    setActive(i);
    setAutoPlay(false);
    if (focus) tabRefs.current[i]?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      select((active + 1) % STEPS.length, true);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      select((active - 1 + STEPS.length) % STEPS.length, true);
    }
  }

  function goToRegion(id: string) {
    triggerPathBurst(0.5, 0.5);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 220);
  }

  const step = STEPS[active];

  return (
    <Section
      id="how-we-think"
      eyebrow="HOW WE THINK"
      title="A pathway, not a checklist"
      description="Every campaign moves through the same five stages. Step through them the way a thought moves through the mind."
    >
      <div className="pathway">
        <div className="pathway-track" aria-hidden="true">
          <div
            className="pathway-fill"
            style={{ width: `${(active / (STEPS.length - 1)) * 100}%` }}
          />
          <span
            className="pathway-pulse-head"
            style={{ left: `${(active / (STEPS.length - 1)) * 100}%` }}
          />
        </div>

        <div
          className="pathway-nodes"
          role="tablist"
          aria-label="How we think, five stages"
          onKeyDown={handleKeyDown}
        >
          {STEPS.map((s, i) => (
            <button
              key={s.n}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              tabIndex={active === i ? 0 : -1}
              aria-selected={active === i}
              className={`pathway-node ${i <= active ? "is-lit" : ""} ${
                active === i ? "is-active" : ""
              }`}
              onClick={() => select(i)}
            >
              <span className="pathway-node-dot" />
              <span className="pathway-node-label">
                <span className="pathway-node-n">{s.n}</span>
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="pathway-detail"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="pathway-detail-label">
            {step.n} — {step.label}
          </div>
          <p className="pathway-detail-body">{step.body}</p>
          {step.region && (
            <button className="pathway-detail-link" onClick={() => goToRegion(step.region!)}>
              See this in {step.regionLabel} →
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
