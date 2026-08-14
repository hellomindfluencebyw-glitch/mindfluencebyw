"use client";

import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import ThoughtCycle from "./ThoughtCycle";
import { triggerPathBurst } from "@/components/PathBurst";
import { playSound } from "@/lib/sound";

// BrainScene touches window/canvas — load client-side only.
const BrainScene = dynamic(() => import("./BrainScene"), { ssr: false });

type ZoomState = "idle" | "entering" | "inside";

export default function Hero() {
  const [zoomState, setZoomState] = useState<ZoomState>("idle");
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

  function handleNavigate(id: string) {
    setZoomState("idle");
    triggerPathBurst(0.5, 0.5);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  }

  const zoomed = zoomState !== "idle";
  const entering = zoomState === "entering";

  return (
    <section className="hero" id="hero" onClick={handleHeroClick}>
      <div className="canvas-wrap">
        <BrainScene
          zoomed={zoomed}
          entering={entering}
          pulseTarget={pulseTarget}
          onNavigate={handleNavigate}
          onFirstInteract={() => setHasInteracted(true)}
        />
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
        <div className="eyebrow">MINDFLUENCE&nbsp;BY&nbsp;W</div>
        <h1 className="headline">
          We don&apos;t market to people.
          <br />
          We market to the <em>mind</em>.
        </h1>
        <button className="cta" onClick={handleExplore}>
          Explore the Mind
          <span className="cta-arrow">→</span>
        </button>
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
