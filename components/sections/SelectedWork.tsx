"use client";

import { useState } from "react";
import { MEMORY_PROJECTS, MemoryProject } from "@/lib/memoryBank";
import { assetPath } from "@/lib/assetPath";
import Section from "./Section";
import MemoryModal from "./hippocampus/MemoryModal";

const EXTRA = [
  { id: "potato-treats", title: "Potato Treats", category: "INDEPENDENT BRAND AUDIT", desc: "Independent diagnostic work. No supplied visual asset package was found in the repository or CV." },
];

const CATEGORY: Record<string, string> = {
  "delightful-decor": "SOCIAL CREATIVE / CONTENT STRATEGY / VISUAL STORYTELLING",
  "basket-by-mama": "BRAND & CONTENT / PRODUCT COMMUNICATION / SOCIAL CREATIVE",
  muratish: "CAMPAIGN / SOCIAL CREATIVE / BRAND STORYTELLING",
  "murata-wakwa": "CAMPAIGN WORK",
  "testimony-of-three": "SOCIAL STRATEGY / CREATIVE DIRECTION",
  "aether-aura": "CREATIVE / SOCIAL",
};

const PROJECT_ORDER = [
  "delightful-decor",
  "basket-by-mama",
  "muratish",
  "murata-wakwa",
  "testimony-of-three",
  "aether-aura",
];

const real = PROJECT_ORDER
  .map((id) => MEMORY_PROJECTS.find((p) => p.id === id))
  .filter((p): p is MemoryProject => Boolean(p));

export default function SelectedWork() {
  const [open, setOpen] = useState<MemoryProject | null>(null);
  return (
    <Section id="work" eyebrow="SELECTED WORK" title="The portfolio is the proof." description="Real work, clearly labelled. Client work stays client work; independent audits stay independent audits.">
      <div className="work-grid-new">
        {real.map((p, index) => {
          const ext = p.assetExt ?? "jpg";
          const first = p.slideCount > 0 ? `${p.assetDir}${String(1).padStart(2, "0")}.${ext}` : "";
          return <button className="work-card-new" key={p.id} onClick={() => setOpen(p)}>
            <div className="work-card-image">
              {first ? <img src={assetPath(first)} alt={`${p.title} project preview`} loading="lazy" decoding="async" /> : <div className="work-image-fallback" aria-hidden="true" />}
              <span className="work-card-number">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="work-card-meta"><span>{p.status === "client work" ? "CLIENT WORK" : p.status.toUpperCase()}</span><span>{CATEGORY[p.id]}</span></div>
            <h3>{p.title}</h3><p>{p.tagline}</p><span className="work-open">OPEN CASE STUDY →</span>
          </button>;
        })}
        {EXTRA.map((p) => <article className="work-card-new work-card-missing" key={p.id}>
          <div className="work-missing-mark">INDEPENDENT AUDIT · ASSET PACKAGE NOT SUPPLIED</div>
          <div className="work-card-meta"><span>{p.category}</span></div>
          <h3>{p.title}</h3><p>{p.desc}</p>
          <span className="work-missing-note">Visual case study intentionally withheld rather than substituted with stock or generated imagery.</span>
        </article>)}
      </div>
      {open && <MemoryModal project={open} onClose={() => setOpen(null)} />}
    </Section>
  );
}
