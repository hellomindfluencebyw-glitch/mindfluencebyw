const DOTS = [
  { left: "8%", top: "12%", delay: 0 },
  { left: "22%", top: "68%", delay: 0.6 },
  { left: "35%", top: "30%", delay: 1.2 },
  { left: "48%", top: "82%", delay: 0.3 },
  { left: "61%", top: "18%", delay: 1.8 },
  { left: "74%", top: "55%", delay: 0.9 },
  { left: "86%", top: "35%", delay: 1.5 },
  { left: "15%", top: "90%", delay: 2.1 },
  { left: "92%", top: "78%", delay: 0.4 },
  { left: "55%", top: "48%", delay: 1.1 },
];

export default function AmbientTrail() {
  return (
    <div className="ambient-trail" aria-hidden="true">
      {DOTS.map((d, i) => (
        <span
          key={i}
          className="ambient-trail-dot drift"
          style={{ left: d.left, top: d.top, animationDelay: `${d.delay}s` }}
        />
      ))}
    </div>
  );
}
