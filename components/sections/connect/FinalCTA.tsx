
"use client";

import { motion } from "framer-motion";
import { triggerPathBurst } from "@/components/PathBurst";

export default function FinalCTA({ onStart }: { onStart: () => void }) {
  return (
    <div className="final-cta">
      <div className="final-cta-index">
        <span>THE CONVERSATION STARTS HERE</span>
        <span>01 / CONNECT</span>
      </div>

      <div className="final-cta-headline">
        <motion.p
          className="final-cta-line"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          What's your brand
        </motion.p>

        <motion.p
          className="final-cta-line final-cta-line--accent"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
        >
          making people feel?
        </motion.p>
      </div>

      <motion.div
        className="final-cta-neuron"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <svg viewBox="0 0 240 42" className="final-cta-neuron-svg">
          <motion.path
            d="M4 21 H78 L91 9 L105 33 L120 15 L134 21 H216"
            className="final-cta-neuron-line"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.7, ease: "easeInOut" }}
          />
          <motion.circle
            cx="4"
            cy="21"
            r="3"
            className="final-cta-neuron-dot"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          />
          <motion.circle
            cx="216"
            cy="21"
            r="5"
            className="final-cta-neuron-hub"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8, type: "spring", stiffness: 180 }}
          />
        </svg>
      </motion.div>

      <motion.button
        className="final-cta-button"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.9 }}
        onClick={() => {
          triggerPathBurst(0.5, 0.85);
          onStart();
        }}
      >
        <span>Work with Mindfluence</span>
        <span className="final-cta-arrow">↗</span>
      </motion.button>
    </div>
  );
}
