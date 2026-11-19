
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

function NeuralNetwork() {
  return (
    <svg
      className="neural-network"
      viewBox="0 0 1400 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="neural-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="neural-depth">
  <path d="M0 250 C180 80 300 420 480 220 S760 80 920 250 S1200 420 1400 210" />
  <path d="M100 500 C250 300 400 480 570 300 S850 100 1050 300 S1250 450 1400 280" />
  <path d="M250 0 C350 160 280 300 450 420 S700 480 850 500" />
</g>
      
      <g className="neural-pathways">
        <path d="M0 130 C150 40 180 260 330 170 S520 40 650 160 S850 300 1000 170 S1220 40 1400 130" />
        <path d="M0 390 C170 300 220 460 390 340 S600 180 760 310 S980 450 1130 320 S1290 250 1400 360" />
        <path d="M150 0 C220 130 310 100 390 220 S520 390 650 500" />
        <path d="M900 0 C820 130 930 190 1030 260 S1170 390 1250 500" />
        <path d="M450 0 C500 100 430 170 520 260 S700 350 780 500" />
      </g>

      <g className="neural-nodes" filter="url(#neural-glow)">
        <circle cx="150" cy="85" r="5" />
        <circle cx="330" cy="170" r="7" />
        <circle cx="520" cy="110" r="5" />
        <circle cx="650" cy="160" r="8" />
        <circle cx="850" cy="270" r="5" />
        <circle cx="1000" cy="170" r="8" />
        <circle cx="1200" cy="90" r="5" />
        <circle cx="390" cy="340" r="6" />
        <circle cx="760" cy="310" r="7" />
        <circle cx="1130" cy="320" r="6" />
      </g>

      <g className="neural-pulses">
        <circle r="5">
          <animateMotion dur="7s" repeatCount="indefinite">
            <mpath href="#neural-route-one" />
          </animateMotion>
        </circle>
        <circle r="4">
          <animateMotion dur="9s" begin="-4s" repeatCount="indefinite">
            <mpath href="#neural-route-two" />
          </animateMotion>
        </circle>
      </g>

      <path id="neural-route-one" d="M0 130 C150 40 180 260 330 170 S520 40 650 160 S850 300 1000 170 S1220 40 1400 130" fill="none" />
      <path id="neural-route-two" d="M0 390 C170 300 220 460 390 340 S600 180 760 310 S980 450 1130 320 S1290 250 1400 360" fill="none" />
    </svg>
  );
}
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
        <NeuralNetwork />

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
