const DOTS = [
  { x: 50, y: 38, delay: 0 },
  { x: 42, y: 46, delay: 0.3 },
  { x: 58, y: 44, delay: 0.6 },
  { x: 46, y: 55, delay: 0.9 },
  { x: 54, y: 58, delay: 0.2 },
  { x: 50, y: 30, delay: 1.1 },
  { x: 38, y: 40, delay: 0.5 },
  { x: 62, y: 40, delay: 0.8 },
  { x: 44, y: 64, delay: 1.4 },
  { x: 56, y: 64, delay: 1.7 },
  { x: 50, y: 70, delay: 0.4 },
  { x: 34, y: 50, delay: 1.9 },
  { x: 66, y: 50, delay: 1.2 },
];

export default function HeroLoadingPlaceholder() {
  return (
    <div className="hero-loading" aria-hidden="true">
      <div className="hero-loading-glow" />
      {DOTS.map((d, i) => (
        <span
          key={i}
          className="hero-loading-dot drift"
          style={{ left: `${d.x}%`, top: `${d.y}%`, animationDelay: `${d.delay}s` }}
        />
      ))}
    </div>
  );
}
