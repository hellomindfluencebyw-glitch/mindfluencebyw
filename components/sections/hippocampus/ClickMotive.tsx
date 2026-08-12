"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MemoryProject } from "@/lib/memoryBank";
import { PRINCIPLES } from "@/lib/psychology";

const MOTIVES: { label: string; principleId: string }[] = [
  { label: "Curiosity", principleId: "curiosity-gap" },
  { label: "Recognition", principleId: "familiarity" },
  { label: "Emotion", principleId: "emotion" },
  { label: "Aesthetic", principleId: "aesthetic-usability" },
  { label: "FOMO", principleId: "loss-aversion" },
  { label: "I don't know", principleId: "availability-heuristic" },
];

export default function ClickMotive({ project }: { project: MemoryProject }) {
  const [pickedIndex, setPickedIndex] = useState<number | null>(null);

  const picked = pickedIndex !== null ? MOTIVES[pickedIndex] : null;
  const motivePrinciple = picked ? PRINCIPLES.find((p) => p.id === picked.principleId) : null;
  const campaignPrinciple = project.principle
    ? PRINCIPLES.find((p) => p.id === project.principle)
    : null;

  return (
    <div className="click-motive">
      <AnimatePresence mode="wait">
        {picked === null ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="click-motive-prompt">What made you click?</div>
            <div className="click-motive-options">
              {MOTIVES.map((m, i) => (
                <button key={m.label} className="click-motive-option" onClick={() => setPickedIndex(i)}>
                  {m.label}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="click-motive-answer">That&apos;s psychology.</div>
            {motivePrinciple && (
              <p className="click-motive-explain">
                <strong>{motivePrinciple.name}.</strong> {motivePrinciple.definition}
              </p>
            )}
            {campaignPrinciple && (
              <p className="click-motive-explain click-motive-explain--campaign">
                And specifically in this campaign: <strong>{campaignPrinciple.name}</strong>,
                just below.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
