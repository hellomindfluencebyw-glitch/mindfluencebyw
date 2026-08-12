"use client";

import { motion } from "framer-motion";
import { triggerPathBurst } from "@/components/PathBurst";

export default function FinalCTA({ onStart }: { onStart: () => void }) {
  return (
    <div className="final-cta">
      <motion.p
        className="final-cta-line"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Your audience is already thinking.
      </motion.p>

      <motion.p
        className="final-cta-line"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.3 }}
      >
        Let&apos;s understand what they&apos;re thinking about.
      </motion.p>

      <div className="final-cta-neuron">
        <svg viewBox="0 0 160 24" className="final-cta-neuron-svg">
          <motion.line
            x1={4}
            y1={12}
            x2={140}
            y2={12}
            className="final-cta-neuron-line"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 2.4, ease: "easeOut" }}
          />
          <motion.circle
            cx={4}
            cy={12}
            r={2.5}
            className="final-cta-neuron-dot"
            initial={{ opacity: 0.4 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 2.4 }}
          />
          <motion.circle
            cx={140}
            cy={12}
            r={3.5}
            className="final-cta-neuron-hub"
            initial={{ opacity: 0.25, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 3.15 }}
          />
        </svg>
      </div>

      <motion.button
        className="final-cta-button"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 3.4 }}
        onClick={() => {
          triggerPathBurst(0.5, 0.85);
          onStart();
        }}
      >
        Start a Conversation →
      </motion.button>
    </div>
  );
}
