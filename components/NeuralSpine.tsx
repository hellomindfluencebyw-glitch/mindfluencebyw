"use client";

import { useEffect, useRef, useState } from "react";
import { JOURNEY } from "@/lib/journey";
import { triggerPathBurst } from "./PathBurst";

export default function NeuralSpine() {
  const [activeId, setActiveId] = useState("hero");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = JOURNEY.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el
    );

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // pick the entry closest to the vertical center of the viewport
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

    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  function goTo(id: string) {
    triggerPathBurst(0.5, 0.5);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 180);
  }

  return (
    <nav className="neural-spine" aria-label="Journey through the mind">
      <div className="neural-spine-line" />
      {JOURNEY.map((stop) => {
        const isActive = stop.id === activeId;
        return (
          <button
            key={stop.id}
            className={`neural-spine-node ${isActive ? "is-active" : ""}`}
            onClick={() => goTo(stop.id)}
            aria-current={isActive}
          >
            <span className="neural-spine-dot" />
            <span className="neural-spine-label">{stop.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
