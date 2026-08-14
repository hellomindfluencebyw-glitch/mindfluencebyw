import Section from "./Section";
import ServiceCategoryList from "./ServiceCategoryList";
import { SERVICE_CATEGORIES } from "@/lib/services";

const CATEGORY_IDS = ["strategy", "brand-identity", "behaviour-lab"];
const categories = SERVICE_CATEGORIES.filter((c) => CATEGORY_IDS.includes(c.id));

export default function FrontalLobe() {
  return (
    <Section
      id="frontal-lobe"
      eyebrow="FRONTAL LOBE · WHAT WE DO — STRATEGY"
      title="Where every campaign begins"
      description="Strategy is the part of the mind that plans, weighs and decides. This is where Mindfluence works before a single post gets written."
    >
      <ServiceCategoryList categories={categories} />
    </Section>
  );
}
