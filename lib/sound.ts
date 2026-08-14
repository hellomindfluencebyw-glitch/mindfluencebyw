"use client";

type SoundName =
  | "navClick"
  | "memoryActivate"
  | "caseStudyOpen"
  | "heroTouch"
  | "heroExplore";

let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
  }
  // Browsers suspend AudioContext until a user gesture resumes it — every
  // call site for this only ever fires from inside a click handler, so this
  // resume is always inside a real gesture, never on page load.
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

function tone(
  audioCtx: AudioContext,
  freq: number,
  startOffset: number,
  duration: number,
  peakGain: number,
  type: OscillatorType = "sine"
) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;

  const start = audioCtx.currentTime + startOffset;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(peakGain, start + duration * 0.25);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("mindfluence-sound") === "on";
}

export function setSoundEnabled(value: boolean) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("mindfluence-sound", value ? "on" : "off");
  }
  if (value) getContext();
}

export function playSound(name: SoundName) {
  if (typeof window === "undefined") return;
  if (!isSoundEnabled()) return;
  const audioCtx = getContext();
  if (!audioCtx) return;

  switch (name) {
    case "navClick":
      // A very short, soft click — interface acknowledgment, not a beep.
      tone(audioCtx, 640, 0, 0.07, 0.05);
      break;
    case "memoryActivate":
      // A gentle two-step rise — reads as "retrieval", not a notification.
      tone(audioCtx, 480, 0, 0.14, 0.045);
      tone(audioCtx, 720, 0.05, 0.16, 0.04);
      break;
    case "caseStudyOpen":
      // Deeper and slightly longer — a fuller activation.
      tone(audioCtx, 260, 0, 0.28, 0.05, "triangle");
      tone(audioCtx, 390, 0.03, 0.24, 0.03, "sine");
      break;
    case "heroTouch":
      // First touch on the brain: low pulse -> tiny shimmer -> settle.
      // Extremely quiet, meant to be felt more than heard.
      tone(audioCtx, 180, 0, 0.3, 0.03, "sine");
      tone(audioCtx, 900, 0.12, 0.2, 0.012, "sine");
      tone(audioCtx, 1200, 0.16, 0.15, 0.008, "sine");
      break;
    case "heroExplore":
      // "Explore the Mind" click: the same idea, slightly fuller —
      // low pulse -> shimmer -> a soft network-wide activation.
      tone(audioCtx, 160, 0, 0.35, 0.045, "sine");
      tone(audioCtx, 480, 0.08, 0.3, 0.025, "sine");
      tone(audioCtx, 960, 0.16, 0.25, 0.015, "sine");
      tone(audioCtx, 1440, 0.22, 0.2, 0.008, "sine");
      break;
  }
}
