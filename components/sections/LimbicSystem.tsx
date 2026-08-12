"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import { PRINCIPLES } from "@/lib/psychology";
import { MEMORY_PROJECTS } from "@/lib/memoryBank";

export default function LimbicSystem() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section
      id="limbic-system"
      eyebrow="LIMBIC SYSTEM · WHY IT WORKED — EMOTION"
      title="People don't buy products. They respond to emotion."
      description="Every principle below is also tagged onto real campaigns in the Memory Bank — open one to see it explained, then go find it in the work."
    >
      <div className="principle-list">
        {PRINCIPLES.map((p) => {
          const linked = MEMORY_PROJECTS.filter(
            (proj) => proj.principle === p.id || proj.secondaryPrinciples?.includes(p.id)
          );
          const open = openId === p.id;
          return (
            <div key={p.id} className="principle-row">
              <button
                className="principle-row-toggle"
                onClick={() => setOpenId(open ? null : p.id)}
                aria-expanded={open}
              >
                <span className="principle-row-name">{p.name}</span>
                <span className="principle-row-caret">{open ? "−" : "+"}</span>
              </button>
              <AnimatePresence>
                {open && (
                  <motion.div
                    className="principle-row-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <p className="principle-row-definition">{p.definition}</p>
                    {linked.length > 0 ? (
                      <div className="principle-row-linked">
                        Seen in: {linked.map((l) => l.title).join(", ")}
                      </div>
                    ) : (
                      <div className="principle-row-linked principle-row-linked--pending">
                        Not yet linked to a campaign
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
