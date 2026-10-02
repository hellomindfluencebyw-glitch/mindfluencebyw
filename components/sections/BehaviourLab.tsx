import Section from "./Section";
import { PRINCIPLES } from "@/lib/psychology";
import { assetPath } from "@/lib/assetPath";

export default function BehaviourLab() {
  return (
    <Section id="behaviour-lab" eyebrow="BEHAVIOUR LAB" title="Study the behaviour. Then make the creative." description="An ongoing editorial space for psychology, social media behaviour, digital culture and the strategy behind brands becoming noticed, remembered, discussed and embedded in behaviour.">
      <div className="lab-layout">
        <div className="lab-feature">
          <img src={assetPath("/work/mindfluence-content/03.jpg")} alt="Mindfluence Investigative Series — Issue 001" loading="lazy" />
          <div className="lab-feature-copy">
            <span>INVESTIGATIVE SERIES · ISSUE 001</span>
            <h3>Psychology × marketing, examined through real cultural behaviour.</h3>
            <p>Observation / evidence → psychological mechanism → marketing strategy → why it works → application for brands.</p>
          </div>
        </div>
        <div className="lab-principles">
          {PRINCIPLES.slice(0, 8).map((p) => <div className="lab-principle" key={p.id}><span>{p.name}</span><p>{p.definition}</p></div>)}
        </div>
      </div>
    </Section>
  );
}
