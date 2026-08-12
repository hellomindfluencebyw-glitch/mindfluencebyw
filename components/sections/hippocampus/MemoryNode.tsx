"use client";

import { motion } from "framer-motion";
import { MemoryProject } from "@/lib/memoryBank";

export default function MemoryNode({
  project,
  position,
  delay,
  state,
  onOpen,
}: {
  project: MemoryProject;
  position: { top: string; left: string };
  delay: number;
  state: "idle" | "dimmed" | "open";
  onOpen: (originEl: HTMLElement) => void;
}) {
  return (
    <motion.button
      layoutId={`memory-node-${project.id}`}
      className="memory-node"
      style={position}
      onClick={(e) => onOpen(e.currentTarget)}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: state === "open" ? 0 : 1, scale: 1 }}
      viewport={{ once: true }}
      animate={{
        opacity: state === "open" ? 0 : state === "dimmed" ? 0.28 : 1,
        filter: state === "dimmed" ? "blur(1.5px)" : "blur(0px)",
      }}
      whileHover={state === "idle" ? { scale: 1.12 } : {}}
      transition={{ duration: 0.4, delay: state === "idle" ? delay : 0 }}
    >
      <span className="memory-node-glow" style={{ animationDelay: `${delay}s` }} />
      <span className="memory-node-core" />
      <span className="memory-node-label">{project.title}</span>
    </motion.button>
  );
}
