"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import {
  COLOR_TEAL,
  COLOR_TEAL_DIM,
  COLOR_TEAL_HOT,
  REGION_ANCHORS,
  generateBrain,
  makeDotTexture,
} from "@/lib/brain";

const NEURON_COUNT = 190;
const PULSE_COUNT = 14;

function RegionLabels({ zoomed, onNavigate }: { zoomed: boolean; onNavigate: (id: string) => void }) {
  const entries = Object.entries(REGION_ANCHORS);
  return (
    <>
      {entries.map(([id, region], i) => (
        <Html key={id} position={region.position} center distanceFactor={5} zIndexRange={[20, 0]}>
          <button
            className={`region-html-label ${zoomed ? "is-visible" : ""}`}
            style={{ transitionDelay: zoomed ? `${300 + i * 110}ms` : "0ms" }}
            onClick={() => onNavigate(id)}
            tabIndex={zoomed ? 0 : -1}
          >
            <span className="region-html-rule" />
            <span className="region-html-name">{region.label}</span>
            <span className="region-html-sub">{region.sub}</span>
          </button>
        </Html>
      ))}
    </>
  );
}

function Brain({
  zoomed,
  entering,
  pulseTarget,
  onNavigate,
  onFirstInteract,
}: {
  zoomed: boolean;
  entering: boolean;
  pulseTarget: { x: number; y: number; ts: number } | null;
  onNavigate: (id: string) => void;
  onFirstInteract: () => void;
}) {
  const { points, edges, latentEdges } = useMemo(() => generateBrain(NEURON_COUNT), []);
  const dotTexture = useMemo(() => makeDotTexture(), []);
  const prefersReduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const groupRef = useRef<THREE.Group>(null!);
  const hasInteracted = useRef(false);

  const { camera, raycaster, pointer } = useThree();
  const targetPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const mouseWorld = useMemo(() => new THREE.Vector3(), []);
  const tmpA = useMemo(() => new THREE.Vector3(), []);
  const tmpB = useMemo(() => new THREE.Vector3(), []);

  const pointsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(NEURON_COUNT * 3);
    const colors = new Float32Array(NEURON_COUNT * 3);
    points.forEach((p, i) => {
      positions.set([p.x, p.y, p.z], i * 3);
      COLOR_TEAL_DIM.toArray(colors, i * 3);
    });
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [points]);

  function buildLineGeo(edgeList: typeof edges) {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(edgeList.length * 6);
    const colors = new Float32Array(edgeList.length * 6);
    edgeList.forEach((e, idx) => {
      const pa = points[e.a],
        pb = points[e.b];
      positions.set([pa.x, pa.y, pa.z, pb.x, pb.y, pb.z], idx * 6);
      colors.set([...COLOR_TEAL_DIM.toArray(), ...COLOR_TEAL_DIM.toArray()], idx * 6);
    });
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }

  const lineGeo = useMemo(() => buildLineGeo(edges), [edges, points]);
  const latentGeo = useMemo(() => buildLineGeo(latentEdges), [latentEdges, points]);

  const pulses = useMemo(
    () =>
      Array.from({ length: prefersReduced ? 0 : PULSE_COUNT }, () => ({
        edge: edges[Math.floor(Math.random() * edges.length)],
        t: Math.random(),
        speed: 0.25 + Math.random() * 0.35,
      })),
    [edges, prefersReduced]
  );
  const pulseMeshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const highlightRef = useRef<Float32Array>(new Float32Array(NEURON_COUNT));

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const group = groupRef.current;
    if (!group) return;

    const rotSpeed = (prefersReduced ? 0.03 : 0.09) * (entering ? 2.4 : 1);
    group.rotation.y += rotSpeed * delta;

    // subtle breathing
    const breathe = prefersReduced ? 1 : 1 + Math.sin(t * 0.6) * 0.018;
    group.scale.setScalar(breathe);

    if (!prefersReduced) {
      const targetTiltX = -pointer.y * 0.18;
      group.rotation.x += (targetTiltX - group.rotation.x) * 0.04;
    }

    const mouseActive = pointer.x !== 0 || pointer.y !== 0;
    if (mouseActive && !hasInteracted.current) {
      hasInteracted.current = true;
      onFirstInteract();
    }
    raycaster.setFromCamera(pointer, camera);
    raycaster.ray.intersectPlane(targetPlane, mouseWorld);

    const posAttr = pointsGeo.attributes.position as THREE.BufferAttribute;
    const colAttr = pointsGeo.attributes.color as THREE.BufferAttribute;
    const highlight = highlightRef.current;

    const pulseAge = pulseTarget ? (Date.now() - pulseTarget.ts) / 1000 : Infinity;
    const pulseActive = pulseAge < 0.8;
    const pulseDecay = pulseActive ? 1 - pulseAge / 0.8 : 0;

    for (let i = 0; i < NEURON_COUNT; i++) {
      tmpA.set(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
      tmpA.applyMatrix4(group.matrixWorld);
      let h = 0;
      if (mouseActive) {
        const d = tmpA.distanceTo(mouseWorld);
        h = Math.max(0, 1 - d / 1.4);
      }
      if (pulseActive && pulseTarget) {
        const ndc = tmpA.clone().project(camera);
        const dNdc = Math.hypot(ndc.x - pulseTarget.x, ndc.y - pulseTarget.y);
        const boost = Math.max(0, 1 - dNdc / 0.5) * pulseDecay;
        h = Math.max(h, boost);
      }
      highlight[i] = h;
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.6 + i * 0.37) * (entering ? 1.6 : 1);
      const mix = Math.min(1, h * 1.4 + pulse * 0.12);
      const c = COLOR_TEAL_DIM.clone().lerp(COLOR_TEAL, mix);
      if (h > 0.5) c.lerp(COLOR_TEAL_HOT, (h - 0.5) * 1.6);
      colAttr.setXYZ(i, c.r, c.g, c.b);
    }
    colAttr.needsUpdate = true;

    const lc = lineGeo.attributes.color as THREE.BufferAttribute;
    edges.forEach((e, idx) => {
      const hAvg = (highlight[e.a] + highlight[e.b]) / 2;
      const c = COLOR_TEAL_DIM.clone().lerp(COLOR_TEAL, Math.min(1, hAvg * 1.6 + 0.15));
      lc.setXYZ(idx * 2, c.r, c.g, c.b);
      lc.setXYZ(idx * 2 + 1, c.r, c.g, c.b);
    });
    lc.needsUpdate = true;

    // latent connections only appear when BOTH endpoints are actively highlighted
    const llc = latentGeo.attributes.color as THREE.BufferAttribute;
    latentEdges.forEach((e, idx) => {
      const strength = highlight[e.a] * highlight[e.b];
      const c = COLOR_TEAL_DIM.clone().lerp(COLOR_TEAL_HOT, Math.min(1, strength * 3));
      llc.setXYZ(idx * 2, c.r, c.g, c.b);
      llc.setXYZ(idx * 2 + 1, c.r, c.g, c.b);
    });
    llc.needsUpdate = true;

    pulses.forEach((p, idx) => {
      p.t += p.speed * delta;
      if (p.t > 1) {
        p.t = 0;
        p.edge = edges[Math.floor(Math.random() * edges.length)];
      }
      const mesh = pulseMeshRefs.current[idx];
      if (!mesh) return;
      tmpA.copy(points[p.edge.a]);
      tmpB.copy(points[p.edge.b]);
      mesh.position.copy(tmpA.lerp(tmpB, p.t));
      (mesh.material as THREE.MeshBasicMaterial).opacity = 0.9 * Math.sin(Math.PI * p.t) + 0.1;
    });

    const targetZ = zoomed ? 2.15 : 5.2;
    camera.position.z += (targetZ - camera.position.z) * Math.min(1, delta * 2.4);
  });

  return (
    <group ref={groupRef}>
      <points geometry={pointsGeo}>
        <pointsMaterial
          size={0.1}
          map={dotTexture}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      <lineSegments geometry={latentGeo}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      {pulses.map((_, idx) => (
        <mesh
          key={idx}
          ref={(m) => {
            pulseMeshRefs.current[idx] = m;
          }}
        >
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial
            color={COLOR_TEAL_HOT}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
      <RegionLabels zoomed={zoomed} onNavigate={onNavigate} />
    </group>
  );
}

function Dust() {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const DUST = 250;
    const pos = new Float32Array(DUST * 3);
    for (let i = 0; i < DUST; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 3;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  const texture = useMemo(() => makeDotTexture(), []);
  return (
    <points geometry={geo}>
      <pointsMaterial
        size={0.02}
        color="#2a5c58"
        transparent
        opacity={0.5}
        map={texture}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function BrainScene({
  zoomed,
  entering,
  pulseTarget,
  onNavigate,
  onFirstInteract,
}: {
  zoomed: boolean;
  entering: boolean;
  pulseTarget: { x: number; y: number; ts: number } | null;
  onNavigate: (id: string) => void;
  onFirstInteract: () => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <fogExp2 attach="fog" args={["#05080a", 0.09]} />
      <Brain
        zoomed={zoomed}
        entering={entering}
        pulseTarget={pulseTarget}
        onNavigate={onNavigate}
        onFirstInteract={onFirstInteract}
      />
      <Dust />
    </Canvas>
  );
}
