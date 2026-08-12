"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceNode } from "@/lib/services";

function nodePosition(i: number, total: number, radius: number) {
  const angle = -Math.PI / 2 + (i / total) * Math.PI * 2;
  return {
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle),
  };
}

export default function ServiceNetwork({
  hubLabel,
  services,
}: {
  hubLabel: string;
  services: ServiceNode[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pulseKey, setPulseKey] = useState(0);
  const active = services.find((s) => s.id === activeId) ?? null;
  const radius = 38;

  const positions = useMemo(() => {
    const map: Record<string, { x: number; y: number }> = {};
    services.forEach((s, i) => {
      map[s.id] = nodePosition(i, services.length, radius);
    });
    return map;
  }, [services]);

  // Unique relation pairs, so each real connection is only drawn once.
  const relationLines = useMemo(() => {
    const seen = new Set<string>();
    const lines: { a: string; b: string }[] = [];
    services.forEach((s) => {
      (s.relatesTo ?? []).forEach((otherId) => {
        if (!positions[otherId]) return;
        const key = [s.id, otherId].sort().join("::");
        if (seen.has(key)) return;
        seen.add(key);
        lines.push({ a: s.id, b: otherId });
      });
    });
    return lines;
  }, [services, positions]);

  function handleSelect(id: string) {
    setActiveId(id);
    setPulseKey((k) => k + 1);
  }

  return (
    <div className="service-network-wrap">
      <div className="service-network">
        <svg className="service-network-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          {services.map((s, i) => {
            const pos = nodePosition(i, services.length, radius);
            const isActive = s.id === activeId;
            return (
              <line
                key={s.id}
                x1={50}
                y1={50}
                x2={pos.x}
                y2={pos.y}
                className={`service-network-line${isActive ? " service-network-line--active" : ""}`}
              />
            );
          })}

          {relationLines.map(({ a, b }) => {
            const isLit = hoveredId === a || hoveredId === b || activeId === a || activeId === b;
            return (
              <line
                key={`${a}-${b}`}
                x1={positions[a].x}
                y1={positions[a].y}
                x2={positions[b].x}
                y2={positions[b].y}
                className={`service-network-relation${isLit ? " service-network-relation--lit" : ""}`}
              />
            );
          })}
        </svg>

        {active && (
          <motion.div
            key={`pulse-${pulseKey}`}
            className="service-network-pulse"
            initial={{ left: "50%", top: "50%", opacity: 1 }}
            animate={{
              left: `${nodePosition(services.findIndex((s) => s.id === activeId), services.length, radius).x}%`,
              top: `${nodePosition(services.findIndex((s) => s.id === activeId), services.length, radius).y}%`,
              opacity: 0,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}

        <div className="service-network-hub">
          <span>{hubLabel}</span>
        </div>

        {services.map((s, i) => {
          const pos = nodePosition(i, services.length, radius);
          const isActive = s.id === activeId;
          const isRelatedToHover =
            !!hoveredId && hoveredId !== s.id && (s.relatesTo ?? []).includes(hoveredId);
          return (
            <button
              key={s.id}
              className={`service-network-node${isActive ? " service-network-node--active" : ""}${
                isRelatedToHover ? " service-network-node--related" : ""
              }`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => handleSelect(s.id)}
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId((h) => (h === s.id ? null : h))}
              onFocus={() => setHoveredId(s.id)}
              onBlur={() => setHoveredId((h) => (h === s.id ? null : h))}
              aria-pressed={isActive}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="service-network-detail">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="service-network-detail-label">{active.label}</div>
              <p className="service-network-detail-text">{active.description}</p>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="service-network-detail-hint"
            >
              Hover a node to see how it connects. Select one to see what it includes.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
