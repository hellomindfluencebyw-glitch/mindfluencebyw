"use client";

import { useRef, useState } from "react";
import { assetPath } from "@/lib/assetPath";

export default function CircularCarousel({
  slideCount,
  assetDir,
}: {
  slideCount: number;
  assetDir: string;
}) {
  const [active, setActive] = useState(0);
  const [missing, setMissing] = useState<Record<number, boolean>>({});
  const dragStartX = useRef<number | null>(null);

  function go(delta: number) {
    setActive((a) => (a + delta + slideCount) % slideCount);
  }

  function onPointerDown(e: React.PointerEvent) {
    dragStartX.current = e.clientX;
  }
  function onPointerUp(e: React.PointerEvent) {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 50) go(delta > 0 ? -1 : 1);
    dragStartX.current = null;
  }

  return (
    <div className="carousel">
      <div
        className="carousel-track"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        role="group"
        aria-label="Project visuals"
      >
        {Array.from({ length: slideCount }, (_, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          const isActive = offset === 0;
          const src = assetPath(`${assetDir}${String(i + 1).padStart(2, "0")}.jpg`);
          return (
            <button
              key={i}
              className={`carousel-slide ${isActive ? "is-active" : ""}`}
              style={{
                transform: `translateX(${offset * 78}px) scale(${isActive ? 1 : 0.78}) rotateY(${
                  offset * -18
                }deg)`,
                zIndex: 10 - abs,
                opacity: abs > 2 ? 0 : 1 - abs * 0.28,
              }}
              onClick={() => setActive(i)}
              aria-current={isActive}
              aria-label={`Slide ${i + 1} of ${slideCount}`}
            >
              {missing[i] ? (
                <>
                  <span className="carousel-slide-index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="carousel-slide-note">add {src}</span>
                </>
              ) : (
                <img
                  src={src}
                  alt=""
                  className="carousel-slide-img"
                  onError={() => setMissing((m) => ({ ...m, [i]: true }))}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="carousel-controls">
        <button className="carousel-arrow" onClick={() => go(-1)} aria-label="Previous slide">
          <span className="carousel-arrow-visual">←</span>
        </button>
        <span className="carousel-count">
          {active + 1} / {slideCount}
        </span>
        <button className="carousel-arrow" onClick={() => go(1)} aria-label="Next slide">
          <span className="carousel-arrow-visual">→</span>
        </button>
      </div>
    </div>
  );
}
