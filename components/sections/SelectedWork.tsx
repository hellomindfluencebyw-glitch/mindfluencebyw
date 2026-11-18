
"use client";

import { useState } from "react";
import { MEMORY_PROJECTS, MemoryProject } from "@/lib/memoryBank";
import { assetPath } from "@/lib/assetPath";
import Section from "./Section";
import MemoryModal from "./hippocampus/MemoryModal";

const EXTRA = [
  {
    id: "potato-treats",
    title: "Potato Treats",
    category: "INDEPENDENT BRAND AUDIT",
    desc: "Independent diagnostic work. No supplied visual asset package was found in the repository or CV.",
  },
];

const PROJECT_ORDER = [
  "delightful-decor",
  "basket-by-mama",
  "muratish",
  "murata-wakwa",
  "testimony-of-three",
  "aether-aura",
  "mindfluence-content",
];

const real = PROJECT_ORDER
  .map((id) => MEMORY_PROJECTS.find((p) => p.id === id))
  .filter((p): p is MemoryProject => Boolean(p));

const galleryItems = real.flatMap((project) =>
  Array.from({ length: project.slideCount }, (_, index) => ({
    project,
    image: `${project.assetDir}${String(index + 1).padStart(2, "0")}.${project.assetExt ?? "jpg"}`,
    imageNumber: index + 1,
  }))
);

export default function SelectedWork() {
  const [open, setOpen] = useState<MemoryProject | null>(null);

  return (
    <Section
      id="work"
      eyebrow="THE MEMORY BANK"
      title="A mind full of ideas."
      description="Every project is a memory. Every creative decision begins with an idea. Explore what's inside."
    >
      <div className="memory-gallery-shell">
        <div className="memory-gallery-track">
          {[...galleryItems, ...galleryItems].map((item, index) => {
            const repeated = index >= galleryItems.length;

            return (
              <button
                className="memory-gallery-card"
                key={`${item.project.id}-${item.imageNumber}-${index}`}
                onClick={() => setOpen(item.project)}
                aria-label={`Explore ${item.project.title}`}
                aria-hidden={repeated}
                tabIndex={repeated ? -1 : 0}
              >
                <div className="memory-gallery-image">
                  <img
                    src={assetPath(item.image)}
                    alt={`${item.project.title} creative work`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="memory-gallery-index">
                    MEMORY {String(item.imageNumber).padStart(2, "0")}
                  </span>
                </div>

                <div className="memory-gallery-caption">
                  <span>{item.project.title}</span>
                  <span>EXPLORE MEMORY ↗</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="work-grid-new">
        {EXTRA.map((p) => (
          <article
            className="work-card-new work-card-missing"
            key={p.id}
          >
            <div className="work-missing-mark">
              INDEPENDENT AUDIT · ASSET PACKAGE NOT SUPPLIED
            </div>
            <div className="work-card-meta">
              <span>{p.category}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <span className="work-missing-note">
              Visual case study intentionally withheld rather than substituted with stock or generated imagery.
            </span>
          </article>
        ))}
      </div>

      {open && (
        <MemoryModal
          project={open}
          onClose={() => setOpen(null)}
        />
      )}
    </Section>
  );
}
