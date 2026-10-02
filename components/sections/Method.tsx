import Section from "./Section";

const STEPS = [
  ["01", "OBSERVE", "Study the brand, audience, culture and existing behaviour."],
  ["02", "UNDERSTAND", "Identify what people notice, ignore, remember and respond to."],
  ["03", "STRATEGISE", "Turn those observations into a practical social media strategy."],
  ["04", "CREATE", "Turn strategy into content people actually want to consume."],
  ["05", "TEST", "Observe performance and learn from real audience behaviour."],
  ["06", "GROW", "Build repeatable systems instead of relying on isolated viral posts."],
];

export default function Method() {
  return (
    <Section id="method" eyebrow="THE MINDFLUENCE METHOD" title="We don't start with what to post." description="We start with why people behave the way they do.">
      <div className="method-grid">
        {STEPS.map(([n, title, body]) => (
          <article className="method-card" key={n}>
            <span className="method-number">{n}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
