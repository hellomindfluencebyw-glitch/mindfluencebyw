import Section from "./Section";
import ServiceCategoryList from "./ServiceCategoryList";
import { SERVICE_CATEGORIES } from "@/lib/services";

const CATEGORY_IDS = ["content-system", "growth-engine", "campaign-studio"];
const categories = SERVICE_CATEGORIES.filter((c) => CATEGORY_IDS.includes(c.id));

export default function BrocasArea() {
  return (
    <Section
      id="brocas-area"
      eyebrow="BROCA'S AREA · WHAT WE DO — CONTENT STUDIO"
      title="Where the mind finds language"
      description="Everything connected through language: the words that carry the strategy and the psychology into what people actually read."
    >
      <ServiceCategoryList categories={categories} />
    </Section>
  );
}
