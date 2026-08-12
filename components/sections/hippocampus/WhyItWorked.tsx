"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MemoryProject } from "@/lib/memoryBank";
import { PRINCIPLES } from "@/lib/psychology";

export default function WhyItWorked({ project }: { project: MemoryProject }) {
  const [open, setOpen] = useState(false);
  const principle = project.principle ? PRINCIPLES.find((p) => p.id === project.principle) : null;
  const secondary = (project.secondaryPrinciples ?? [])
    .map((id) => PRINCIPLES.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <div className="why-it-worked">
      <div className="why-it-worked-eyebrow">Why It Worked</div>

      {principle ? (
        <>
          <div className="principle-pill-row">
            <button
              className="principle-pill"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
            >
              {principle.name}
            </button>
            {secondary.map((p) => (
              <span key={p.id} className="principle-pill principle-pill--secondary">
                {p.name}
              </span>
            ))}
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                className="why-it-worked-reveal"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <motion.span
                  className="neural-pathway-line"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <p className="why-it-worked-definition">{principle.definition}</p>
                <p className="why-it-worked-applied">
                  {project.howItAppeared ?? "— pending: how this appeared in the creative —"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <span className="principle-pill principle-pill--pending">Not yet tagged</span>
      )}
    </div>
  );
}
