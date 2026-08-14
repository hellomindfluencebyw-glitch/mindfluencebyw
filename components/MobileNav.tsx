"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JOURNEY } from "@/lib/journey";
import { triggerPathBurst } from "./PathBurst";
import { playSound } from "@/lib/sound";

// Fan the nodes across a quarter-circle arc opening up and to the left
// from the FAB, which sits in the bottom-right corner.
function nodeOffset(i: number, total: number, radius: number) {
  const startAngle = Math.PI; // pointing left
  const endAngle = Math.PI * 1.5; // pointing up
  const angle = startAngle + (i / Math.max(total - 1, 1)) * (endAngle - startAngle);
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const fabRef = useRef<HTMLButtonElement | null>(null);
  const firstNodeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const elements = JOURNEY.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el
    );

    const observer = new IntersectionObserver(
      (entries) => {
        let best: { id: string; dist: number } | null = null;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const rect = entry.target.getBoundingClientRect();
          const dist = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
          if (best === null || dist < best.dist) {
            best = { id: entry.target.id, dist };
          }
        });
        if (best !== null) setActiveId((best as { id: string }).id);
      },
      { threshold: [0.15, 0.5], rootMargin: "-10% 0px -10% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (open) firstNodeRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpen(false);
        fabRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function goTo(id: string) {
    setOpen(false);
    fabRef.current?.focus();
    triggerPathBurst(0.85, 0.9);
    playSound("navClick");
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 180);
  }

  const activeIndex = JOURNEY.findIndex((s) => s.id === activeId);
  const activeLabel = JOURNEY[activeIndex]?.label ?? "";

  return (
    <div className="mobile-nav">
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="mobile-nav-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            {JOURNEY.map((stop, i) => {
              const offset = nodeOffset(i, JOURNEY.length, 120);
              const isActive = stop.id === activeId;
              return (
                <motion.button
                  key={stop.id}
                  ref={i === 0 ? firstNodeRef : undefined}
                  className={`mobile-nav-node${isActive ? " is-active" : ""}`}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                  animate={{ x: offset.x, y: offset.y, opacity: 1, scale: 1 }}
                  exit={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                  transition={{ duration: 0.32, delay: i * 0.02, ease: "easeOut" }}
                  onClick={() => goTo(stop.id)}
                  aria-current={isActive}
                >
                  {stop.label}
                </motion.button>
              );
            })}
          </>
        )}
      </AnimatePresence>

      <button
        ref={fabRef}
        className="mobile-nav-fab"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close navigation" : `Open navigation, currently on ${activeLabel}`}
      >
        <span className={`mobile-nav-fab-icon${open ? " is-open" : ""}`} />
      </button>
    </div>
  );
}
