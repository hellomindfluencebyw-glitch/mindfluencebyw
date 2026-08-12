import * as THREE from "three";

// ---- Mindfluence design tokens (electric teal / near-black) ----
// See /docs/design-tokens.md for the full rationale.
export const TOKENS = {
  bg: "#05080a",
  tealDim: "#0f4a47",
  teal: "#3fe9d6",
  tealHot: "#aefff2",
  ink: "#F4F8F7",
} as const;

export const COLOR_TEAL = new THREE.Color(TOKENS.teal);
export const COLOR_TEAL_DIM = new THREE.Color(TOKENS.tealDim);
export const COLOR_TEAL_HOT = new THREE.Color(TOKENS.tealHot);

export type Edge = { key: string; a: number; b: number };

/**
 * Illustrative anchor points for each brain region, in the same local
 * coordinate space as sampleBrainPoint(). Not anatomically accurate —
 * just plausible positions on the abstract brain surface, used to place
 * the drei <Html> region labels once the user zooms in.
 */
export const REGION_ANCHORS: Record<
  string,
  { label: string; sub: string; position: [number, number, number] }
> = {
  "frontal-lobe": { label: "Frontal Lobe", sub: "Strategy", position: [0.95, 0.55, 0.7] },
  "brocas-area": { label: "Broca's Area", sub: "Content", position: [-0.85, -0.1, 0.7] },
  "limbic-system": { label: "Limbic System", sub: "Emotion", position: [0, -0.05, 0.05] },
  hippocampus: { label: "Hippocampus", sub: "Memory", position: [-1.05, -0.4, -0.15] },
  "occipital-lobe": { label: "Occipital Lobe", sub: "Creative", position: [0, 0.2, -1.05] },
};

/**
 * Sample a point inside a two-lobe, brain-like volume.
 * Deliberately abstract, not anatomical: two offset ellipsoid
 * lobes with a longitudinal gap, per the creative brief.
 */
export function sampleBrainPoint(): THREE.Vector3 {
  const rx = 1.55,
    ry = 1.05,
    rz = 1.15;
  let x = 0,
    y = 0,
    z = 0;
  for (let tries = 0; tries < 40; tries++) {
    x = Math.random() * 2 - 1;
    y = Math.random() * 2 - 1;
    z = Math.random() * 2 - 1;
    if (x * x + y * y + z * z <= 1) break;
  }
  const sign = x >= 0 ? 1 : -1;
  const gap = 0.16;
  x = sign * (Math.abs(x) * rx + gap);
  y = y * ry - Math.abs(z) * 0.12;
  z = z * rz;
  if (y < -0.55) y = -0.55 - Math.random() * 0.15;
  return new THREE.Vector3(x, y, z);
}

export function generateBrain(count: number) {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) points.push(sampleBrainPoint());

  const edges: Edge[] = [];
  const K = 3;
  for (let i = 0; i < count; i++) {
    const dists: [number, number][] = [];
    for (let j = 0; j < count; j++) {
      if (i === j) continue;
      dists.push([j, points[i].distanceTo(points[j])]);
    }
    dists.sort((a, b) => a[1] - b[1]);
    for (let k = 0; k < K; k++) {
      const [j, d] = dists[k];
      if (d < 0.75) {
        const key = i < j ? `${i}_${j}` : `${j}_${i}`;
        if (!edges.find((e) => e.key === key)) edges.push({ key, a: i, b: j });
      }
    }
  }

  // A wider ring of "latent" connections: not drawn by default, only lit up
  // when both endpoints are cursor-highlighted, to simulate "hovering creates
  // new neural connections" rather than the brain being fully wired already.
  const existingKeys = new Set(edges.map((e) => e.key));
  const latentEdges: Edge[] = [];
  const K2 = 3;
  for (let i = 0; i < count; i++) {
    const dists: [number, number][] = [];
    for (let j = 0; j < count; j++) {
      if (i === j) continue;
      dists.push([j, points[i].distanceTo(points[j])]);
    }
    dists.sort((a, b) => a[1] - b[1]);
    let added = 0;
    for (let k = K; k < dists.length && added < K2; k++) {
      const [j, d] = dists[k];
      if (d < 1.05) {
        const key = i < j ? `${i}_${j}` : `${j}_${i}`;
        if (!existingKeys.has(key) && !latentEdges.find((e) => e.key === key)) {
          latentEdges.push({ key, a: i, b: j });
          added++;
        }
      }
    }
  }

  return { points, edges, latentEdges };
}

/** Soft radial-gradient sprite used for every glowing particle in the site. */
export function makeDotTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(180,255,245,0.7)");
  g.addColorStop(1, "rgba(180,255,245,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}
