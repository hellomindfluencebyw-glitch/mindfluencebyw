"use client";

import { useEffect, useState } from "react";

type Burst = { id: number; x: number; y: number };

let counter = 0;

/** Call from anywhere (no context needed) to trigger the travel effect. */
export function triggerPathBurst(x = 0.5, y = 0.5) {
  window.dispatchEvent(new CustomEvent("mindfluence:burst", { detail: { x, y } }));
}

/** Call from anywhere to open a specific Memory Bank case study, e.g. from
 * the Creative Gallery lightbox — Hippocampus listens for this. */
export function triggerOpenMemory(projectId: string) {
  window.dispatchEvent(new CustomEvent("mindfluence:open-memory", { detail: { projectId } }));
}

export default function PathBurst() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    function onBurst(e: Event) {
      const { x, y } = (e as CustomEvent).detail as { x: number; y: number };
      const id = counter++;
      setBursts((b) => [...b, { id, x, y }]);
      window.setTimeout(() => {
        setBursts((b) => b.filter((burst) => burst.id !== id));
      }, 900);
    }
    window.addEventListener("mindfluence:burst", onBurst);
    return () => window.removeEventListener("mindfluence:burst", onBurst);
  }, []);

  return (
    <div className="path-burst-layer" aria-hidden="true">
      {bursts.map((b) => (
        <span
          key={b.id}
          className="path-burst"
          style={{ left: `${b.x * 100}%`, top: `${b.y * 100}%` }}
        />
      ))}
    </div>
  );
}
