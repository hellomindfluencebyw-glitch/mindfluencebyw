"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MemoryProject } from "@/lib/memoryBank";
import CircularCarousel from "./CircularCarousel";
import WhyItWorked from "./WhyItWorked";
import ClickMotive from "./ClickMotive";

const FIELDS: { key: keyof MemoryProject; label: string; prompt: string }[] = [
  { key: "question", label: "The Question", prompt: "What were we trying to solve?" },
  { key: "insight", label: "The Insight", prompt: "What did we notice about people?" },
  { key: "psychology", label: "The Psychology", prompt: "What human behaviour informed the idea?" },
  { key: "creative", label: "The Creative", prompt: "The actual work." },
  { key: "result", label: "The Result", prompt: "Measurable impact, where available." },
  { key: "memory", label: "The Memory", prompt: "One short takeaway." },
];

export default function MemoryModal({
  project,
  onClose,
}: {
  project: MemoryProject | null;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="memory-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            layoutId={`memory-node-${project.id}`}
            className="memory-modal"
            initial={{ borderRadius: 999 }}
            animate={{ borderRadius: 20 }}
            transition={{ duration: 0.45, ease: [0.2, 0.7, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.35 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
              <button className="memory-modal-close" onClick={onClose} aria-label="Close">
                ✕
              </button>

              <div className="memory-modal-eyebrow">A MEMORY, RETRIEVED</div>
              <h3 className="memory-modal-title">{project.title}</h3>
              <p className="memory-modal-tagline">{project.tagline}</p>
              <div className="memory-modal-status">{project.status}</div>

              <ClickMotive key={project.id} project={project} />

              <CircularCarousel slideCount={project.slideCount} assetDir={project.assetDir} />

              <WhyItWorked project={project} />

              <div className="memory-modal-fields">
                {FIELDS.map((f) => (
                  <div key={f.key} className="memory-modal-field">
                    <div className="memory-modal-field-label">{f.label}</div>
                    <div className="memory-modal-field-prompt">{f.prompt}</div>
                    <div className="memory-modal-field-body">
                      {project[f.key] ?? "— pending, add copy —"}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
