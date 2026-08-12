"use client";

import { motion } from "framer-motion";

export type Node = { label: string; sub?: string };

export default function NodeGrid({ items }: { items: Node[] }) {
  return (
    <div className="node-grid">
      {items.map((item) => (
        <motion.div
          key={item.label}
          className="node-card"
          whileHover={{
            borderColor: "rgba(143,255,234,0.55)",
            backgroundColor: "rgba(143,255,234,0.09)",
            y: -3,
          }}
          transition={{ duration: 0.25 }}
        >
          <div className="node-label">{item.label}</div>
          {item.sub && <div className="node-sub">{item.sub}</div>}
        </motion.div>
      ))}
    </div>
  );
}
