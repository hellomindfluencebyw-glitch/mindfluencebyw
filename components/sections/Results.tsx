"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { RESULTS } from "@/lib/results";

export default function Results() {
  return (
    <Section
      id="results"
      eyebrow="THE RESULTS"
      title="Results as signals, not statistics"
      description="Each confirmed outcome lights up as an active signal. Everything else stays honestly dark until there's a real number behind it, no placeholder statistics."
    >
      <div className="signal-board">
        {RESULTS.map((project, pi) => (
          <motion.div
            key={project.id}
            className="signal-card"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: pi * 0.08 }}
          >
            <div className="signal-card-title">{project.title}</div>
            <div className="signal-rows">
              {project.signals.map((s) => {
                const confirmed = s.value !== null;
                return (
                  <div key={s.label} className={`signal-row${confirmed ? " signal-row--active" : ""}`}>
                    <span className="signal-dot" />
                    <span className="signal-label">{s.label}</span>
                    <span className="signal-value">
                      {confirmed ? s.value : "Pending"}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
