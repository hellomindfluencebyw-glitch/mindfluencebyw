"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceCategory } from "@/lib/services";

export default function ServiceCategoryList({ categories }: { categories: ServiceCategory[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="service-category-list">
      {categories.map((cat) => {
        const open = openId === cat.id;
        return (
          <div key={cat.id} className="service-category-row">
            <button
              className="service-category-toggle"
              onClick={() => setOpenId(open ? null : cat.id)}
              aria-expanded={open}
            >
              <span className="service-category-name-wrap">
                <span className="service-category-name">{cat.name}</span>
                <span className="service-category-tagline">{cat.tagline}</span>
              </span>
              <span className="service-category-caret">{open ? "−" : "+"}</span>
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  className="service-category-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <ul className="service-sublist">
                    {cat.services.map((s) => (
                      <li key={s.name} className="service-subitem">
                        <span className="service-subitem-name">{s.name}</span>
                        <span className="service-subitem-desc">{s.description}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
