import Section from "./Section";
import ServiceNetwork from "./ServiceNetwork";
import { STRATEGY_SERVICES } from "@/lib/services";

export default function FrontalLobe() {
  return (
    <Section
      id="frontal-lobe"
      eyebrow="FRONTAL LOBE · WHAT WE DO — STRATEGY"
      title="Where every campaign begins"
      description="Strategy is the part of the mind that plans, weighs and decides. This is where Mindfluence works before a single post gets written."
    >
      <ServiceNetwork hubLabel="Strategy" services={STRATEGY_SERVICES} />
    </Section>
  );
}
