"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import { GALLERY_ITEMS, GalleryItem } from "@/lib/gallery";
import { assetPath } from "@/lib/assetPath";
import { triggerPathBurst, triggerOpenMemory } from "@/components/PathBurst";
import { playSound } from "@/lib/sound";

// Golden-angle phyllotaxis scatter — an organic, non-grid distribution that
// looks intentional at any item count, not just the ones we happen to have.
function clusterPosition(i: number, total: number) {
  const goldenAngle = 137.508 * (Math.PI / 180);
  const angle = i * goldenAngle;
  const radius = total <= 1 ? 0 : 10 + 36 * Math.sqrt(i / (total - 1));
  return {
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle) * 0.7, // flatten slightly for a wide section
  };
}

export default function OccipitalLobe() {
  const [openItem, setOpenItem] = useState<GalleryItem | null>(null);
  const hasItems = GALLERY_ITEMS.length > 0;

  function handleOpen(item: GalleryItem, el: HTMLElement) {
    setOpenItem(item);
    const rect = el.getBoundingClientRect();
    triggerPathBurst(
      (rect.left + rect.width / 2) / window.innerWidth,
      (rect.top + rect.height / 2) / window.innerHeight
    );
    playSound("navClick");
  }

  return (
    <Section
      id="occipital-lobe"
      eyebrow="OCCIPITAL LOBE · WHAT WE'VE CREATED — CREATIVE GALLERY"
      title="The work, floating in space"
      description="Instagram posts arranged in circular, neural-network clusters instead of a grid. Hover to enlarge, click to open the full case study."
    >
      {hasItems ? (
        <div className="gallery-cluster">
          {GALLERY_ITEMS.map((item, i) => {
            const pos = clusterPosition(i, GALLERY_ITEMS.length);
            return (
              <motion.button
                key={item.id}
                className="gallery-item"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                whileHover={{ scale: 1.12 }}
                onClick={(e) => handleOpen(item, e.currentTarget)}
                aria-label={item.caption ?? "Open piece"}
              >
                <img src={assetPath(item.src)} alt={item.caption ?? ""} />
              </motion.button>
            );
          })}
        </div>
      ) : (
        <div className="gallery-placeholder">
          Gallery structure is ready. Real posts will appear here once added.
        </div>
      )}

      <AnimatePresence>
        {openItem && (
          <motion.div
            className="gallery-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenItem(null)}
          >
            <motion.div
              className="gallery-lightbox"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="gallery-lightbox-close"
                onClick={() => setOpenItem(null)}
                aria-label="Close"
              >
                ✕
              </button>
              <img src={assetPath(openItem.src)} alt={openItem.caption ?? ""} />
              {openItem.caption && <p className="gallery-lightbox-caption">{openItem.caption}</p>}
              {openItem.projectId && (
                <button
                  className="gallery-lightbox-link"
                  onClick={() => {
                    const projectId = openItem.projectId;
                    setOpenItem(null);
                    document
                      .getElementById("hippocampus")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    // Give the scroll a moment to actually get there before
                    // the specific memory opens on top of it.
                    window.setTimeout(() => {
                      if (projectId) triggerOpenMemory(projectId);
                    }, 550);
                  }}
                >
                  See the full case study →
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
