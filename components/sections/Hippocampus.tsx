"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section from "./Section";
import MemoryNode from "./hippocampus/MemoryNode";
import MemoryModal from "./hippocampus/MemoryModal";
import { MEMORY_PROJECTS } from "@/lib/memoryBank";
import { triggerPathBurst } from "@/components/PathBurst";

const POSITIONS = [
  { top: "14%", left: "12%" },
  { top: "58%", left: "76%" },
  { top: "76%", left: "22%" },
  { top: "10%", left: "62%" },
  { top: "42%", left: "40%" },
  { top: "80%", left: "68%" },
];

const STILLNESS_HOLD_MS = 2000;

export default function Hippocampus() {
  // modalId controls whether MemoryModal is mounted.
  // activeId controls node dim/idle state, and stays set through the
  // stillness pause so the network doesn't reactivate until the moment holds.
  const [modalId, setModalId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [stillness, setStillness] = useState(false);

  const modalProject = MEMORY_PROJECTS.find((p) => p.id === modalId) ?? null;

  function handleOpen(id: string, originEl: HTMLElement) {
    setModalId(id);
    setActiveId(id);
    const rect = originEl.getBoundingClientRect();
    triggerPathBurst(
      (rect.left + rect.width / 2) / window.innerWidth,
      (rect.top + rect.height / 2) / window.innerHeight
    );
  }

  function handleClose() {
    setModalId(null);
    setStillness(true);
    window.setTimeout(() => {
      setActiveId(null);
      setStillness(false);
    }, STILLNESS_HOLD_MS);
  }

  return (
    <Section
      id="hippocampus"
      eyebrow="HIPPOCAMPUS · WHAT WE'VE CREATED"
      title="Memory Bank"
      description="Some ideas disappear. Others stay with you. Open a memory to retrieve the thinking behind it."
    >
      <div className="memory-cluster">
        {MEMORY_PROJECTS.map((project, i) => {
          const state = activeId === null ? "idle" : activeId === project.id ? "open" : "dimmed";
          return (
            <MemoryNode
              key={project.id}
              project={project}
              position={POSITIONS[i]}
              delay={i * 0.12}
              state={state}
              onOpen={(el) => handleOpen(project.id, el)}
            />
          );
        })}

        <AnimatePresence>
          {stillness && (
            <motion.p
              className="memory-stillness"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              People remember what makes them feel something.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <MemoryModal project={modalProject} onClose={handleClose} />
    </Section>
  );
}
