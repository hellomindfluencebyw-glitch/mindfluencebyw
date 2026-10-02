"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import ThoughtCycle from "./ThoughtCycle";
import HeroLoadingPlaceholder from "./HeroLoadingPlaceholder";
import { triggerPathBurst } from "@/components/PathBurst";
import { playSound } from "@/lib/sound";

// BrainScene touches window/canvas — load client-side only. The chunk is
// unavoidably large (three.js's renderer + shader system, needed by
// @react-three/fiber regardless of scene complexity), so show an instant,
// lightweight neural presence while it loads rather than a blank hero.
const BrainScene = dynamic(() => import("./BrainScene"), {
  ssr: false,
  loading: () => <HeroLoadingPlaceholder />,
});

type ZoomState = "idle" | "entering" | "inside";

export default function Hero() {
  const [zoomState, setZoomState] = useState<ZoomState>("idle");
  const [staticBrain, setStaticBrain] = useState(false);

  // Avoid initializing WebGL on reduced-motion and constrained devices.
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowMemory = typeof (navigator as Navigator & { deviceMemory?: number }).deviceMemory === "number"
      && (navigator as Navigator & { deviceMemory?: number }).deviceMemory! <= 2;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const smallScreen = window.matchMedia("(max-width: 640px)").matches;
    let webglAvailable = false;
    try {
      const canvas = document.createElement("canvas");
      webglAvailable = Boolean(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch {
      webglAvailable = false;
    }
    setStaticBrain(reducedMotion || lowMemory || (coarsePointer && smallScreen) || !webglAvailable);
  }, []);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [pulseTarget, setPulseTarget] = useState<{ x: number; y: number; ts: number } | null>(
    null
  );
  const soundTouched = useRef(false);

  const handleThought = useCallback((ndc: { x: number; y: number }) => {
    setPulseTarget({ ...ndc, ts: Date.now() });
  }, []);

  // Browsers only treat discrete gestures (click/tap/key) as valid for
  // unlocking audio — mousemove (which drives the "Move to interact" cue
  // below) does not reliably count. So the hero's sound uses its own
  // click-based trigger, first genuine tap/click anywhere on the brain.
  function handleHeroClick() {
    if (soundTouched.current) return;
    soundTouched.current = true;
    playSound("heroTouch");
  }

  function handleExplore() {
    // 1. headline fades (handled by zoomState !== "idle" below)
    setZoomState("entering");
    soundTouched.current = true; // avoid double-firing heroTouch via bubbling
    playSound("heroExplore");
    // 2-6. brain enlarges / activity increases / regions illuminate — BrainScene
    // reacts to zoomState via the `entering` and `zoomed` props.
    window.setTimeout(() => setZoomState("inside"), 450);
  }

  function handleNavigate(regionId: string) {
    // Brain-region labels are conceptual navigation, mapped to sections that
    // actually exist in the current agency-led page architecture.
    const destinations: Record<string, string> = {
      "frontal-lobe": "services",
      "brocas-area": "work",
      "limbic-system": "behaviour-lab",
      hippocampus: "work",
      "occipital-lobe": "work",
    };
    const targetId = destinations[regionId] ?? "work";
    setZoomState("idle");
    triggerPathBurst(0.5, 0.5);
    playSound("navClick");
    window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  }

  const zoomed = zoomState !== "idle";
  const entering = zoomState === "entering";

  return (
    <section className="hero" id="hero" onClick={handleHeroClick}>
      <div className="canvas-wrap">
        {staticBrain ? (
          <div className="static-brain" aria-hidden="true">
            <HeroLoadingPlaceholder />
            <div className="static-brain-caption">STRATEGY STARTS WITH PEOPLE</div>
          </div>
        ) : (
          <BrainScene
            zoomed={zoomed}
            entering={entering}
            pulseTarget={pulseTarget}
            onNavigate={handleNavigate}
            onExplore={handleExplore}
            onFirstInteract={() => setHasInteracted(true)}
          />
        )}
      </div>
      <div className="vignette" />
      <motion.div
        className="enter-darken"
        animate={{ opacity: zoomed ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />

      <ThoughtCycle paused={zoomed} onThought={handleThought} />

      <motion.div
        className="interact-cue"
        animate={{ opacity: zoomed ? 0 : hasInteracted ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      >
        <span className="interact-cue-dot" />
        Move to interact
      </motion.div>

      <motion.button
        className="back-to-surface"
        animate={{ opacity: zoomed ? 1 : 0 }}
        style={{ pointerEvents: zoomed ? "auto" : "none" }}
        onClick={() => setZoomState("idle")}
        transition={{ duration: 0.4 }}
      >
        ← Back
      </motion.button>

      <motion.div
        className="hero-content"
        animate={{ opacity: zoomed ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        style={{ pointerEvents: zoomed ? "none" : "auto" }}
      >
        <div className="eyebrow">MINDFLUENCE / BY W</div>
        <h1 className="headline">SOCIAL MEDIA,<br /><em>UNDERSTOOD DIFFERENTLY.</em></h1>
        <p className="hero-copy">We create social media strategy, content and creative systems built around how people actually think, feel, notice, remember and behave online.</p>
        <div className="hero-positioning">PSYCHOLOGY-BACKED. CREATIVE-LED. STRATEGY-FIRST.</div>
        <div className="hero-actions">
          <a className="cta cta-primary" href="#work">Explore our work <span>→</span></a>
          <a className="cta cta-secondary" href="#connect">Work with us <span>↗</span></a>
        </div>
      </motion.div>

      <motion.div
        className="zoomed-hint"
        animate={{ opacity: zoomState === "inside" ? 1 : 0 }}
        transition={{ duration: 0.6, delay: zoomState === "inside" ? 0.9 : 0 }}
      >
        Where should we begin?
      </motion.div>
    </section>
  );
}
