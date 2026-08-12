"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { assetPath } from "@/lib/assetPath";

const CREDENTIALS = ["BA, Psychology (Consumer Behaviour focus)", "Nairobi, Kenya", "3+ Years in Market"];

// Two small clusters, Psychology and Marketing, each with their own
// internal connections, positioned apart. On scroll they draw lines
// converging into a single hub: Mindfluence by W.
const PSYCH_NODES = [
  { x: 30, y: 30 },
  { x: 18, y: 62 },
  { x: 42, y: 68 },
];
const MARKETING_NODES = [
  { x: 270, y: 30 },
  { x: 282, y: 62 },
  { x: 258, y: 68 },
];
const HUB = { x: 150, y: 78 };

function BridgeVisual() {
  return (
    <div className="founder-bridge">
      <svg viewBox="0 0 300 150" className="founder-bridge-svg">
        {/* internal cluster connections */}
        {PSYCH_NODES.map((n, i) => {
          const next = PSYCH_NODES[(i + 1) % PSYCH_NODES.length];
          return (
            <motion.line
              key={`psych-internal-${i}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              className="founder-bridge-line founder-bridge-line--cluster"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            />
          );
        })}
        {MARKETING_NODES.map((n, i) => {
          const next = MARKETING_NODES[(i + 1) % MARKETING_NODES.length];
          return (
            <motion.line
              key={`mkt-internal-${i}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              className="founder-bridge-line founder-bridge-line--cluster"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            />
          );
        })}

        {/* the convergence: each cluster's nearest node reaches for the hub */}
        <motion.line
          x1={42}
          y1={68}
          x2={HUB.x}
          y2={HUB.y}
          className="founder-bridge-line founder-bridge-line--converge"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        />
        <motion.line
          x1={258}
          y1={68}
          x2={HUB.x}
          y2={HUB.y}
          className="founder-bridge-line founder-bridge-line--converge"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
        />

        {[...PSYCH_NODES, ...MARKETING_NODES].map((n, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={n.x}
            cy={n.y}
            r={2.2}
            className="founder-bridge-dot"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          />
        ))}

        <motion.circle
          cx={HUB.x}
          cy={HUB.y}
          r={4}
          className="founder-bridge-hub-dot"
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 1.1 }}
        />
      </svg>

      <div className="founder-bridge-node founder-bridge-node--left">Psychology</div>
      <div className="founder-bridge-node founder-bridge-node--right">Marketing</div>
      <motion.div
        className="founder-bridge-node founder-bridge-node--hub"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.2 }}
      >
        Mindfluence by W
      </motion.div>
    </div>
  );
}

export default function Founder() {
  return (
    <Section id="founder" eyebrow="THE FOUNDER" title="I was fascinated by two worlds.">
      <div className="founder-grid">
        <div className="founder-portrait">
          <img src={assetPath("/founder/wambui.jpg")} alt="Wambui Ng'ang'a, founder of Mindfluence by W" />
        </div>

        <div className="founder-bio-col">
          <p className="founder-bio">
            Wambui Ng&apos;ang&apos;a started noticing patterns in how people responded to
            campaigns: why some messages stayed in people&apos;s minds, why certain campaigns
            created emotion, why some brands were remembered and others weren&apos;t.
          </p>
          <p className="founder-bio">
            Psychology helped her understand people. Marketing gave her a way to communicate
            with them. She realized these weren&apos;t two separate worlds. Mindfluence by W was
            born where those two worlds meet.
          </p>

          <div className="founder-credentials">
            {CREDENTIALS.map((c) => (
              <span key={c} className="founder-credential">
                {c}
              </span>
            ))}
          </div>

          <BridgeVisual />
        </div>
      </div>
    </Section>
  );
}
