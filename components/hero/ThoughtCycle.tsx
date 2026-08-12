"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Each pair: a first-person question, then the concept it resolves to —
// per "Why did I stop scrolling? -> ATTENTION" in the brief.
const CYCLE: { text: string; kind: "question" | "word" }[] = [
  { text: "Why did I stop scrolling?", kind: "question" },
  { text: "Attention", kind: "word" },
  { text: "Would I remember this?", kind: "question" },
  { text: "Memory", kind: "word" },
  { text: "Do I trust this?", kind: "question" },
  { text: "Trust", kind: "word" },
  { text: "Why do I want this?", kind: "question" },
  { text: "Desire", kind: "word" },
];

const POSITIONS = [
  { top: 16, left: 12 },
  { top: 72, left: 16 },
  { top: 22, left: 80 },
  { top: 66, left: 78 },
  { top: 12, left: 46 },
  { top: 80, left: 44 },
];

export default function ThoughtCycle({
  paused,
  onThought,
}: {
  paused: boolean;
  onThought?: (ndc: { x: number; y: number }) => void;
}) {
  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState(POSITIONS[0]);
  const lastPos = useRef(0);

  useEffect(() => {
    if (paused) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const interval = setInterval(
      () => {
        setIndex((i) => (i + 1) % CYCLE.length);
        let next = Math.floor(Math.random() * POSITIONS.length);
        if (next === lastPos.current) next = (next + 1) % POSITIONS.length;
        lastPos.current = next;
        const p = POSITIONS[next];
        setPos(p);
        onThought?.({ x: (p.left / 100) * 2 - 1, y: -((p.top / 100) * 2 - 1) });
      },
      prefersReduced ? 6000 : 3200
    );
    return () => clearInterval(interval);
  }, [paused, onThought]);

  const current = CYCLE[index];

  if (paused) return null;

  return (
    <div className="thought-cycle-slot" style={{ top: `${pos.top}%`, left: `${pos.left}%` }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className={`thought thought--${current.kind}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {current.text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
