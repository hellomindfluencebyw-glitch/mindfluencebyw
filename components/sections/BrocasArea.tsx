import Section from "./Section";
import ServiceNetwork from "./ServiceNetwork";
import { CONTENT_SERVICES } from "@/lib/services";

export default function BrocasArea() {
  return (
    <Section
      id="brocas-area"
      eyebrow="BROCA'S AREA · WHAT WE DO — CONTENT STUDIO"
      title="Where the mind finds language"
      description="Everything connected through language: the words that carry the strategy and the psychology into what people actually read."
    >
      <ServiceNetwork hubLabel="Content Studio" services={CONTENT_SERVICES} />
    </Section>
  );
}
