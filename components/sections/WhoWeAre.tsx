
import Section from "./Section";

export default function WhoWeAre() {
  return (
    <Section
      id="who-we-are"
      eyebrow="THE DIFFERENCE / 001"
      title="People are not algorithms. They are people."
    >
      <div className="who-editorial-layout">
        <div className="who-editorial-copy">
          <div className="who-editorial-index">
            <span>01 — THE HUMAN FACTOR</span>
            <span>INSIGHT / CREATIVITY</span>
          </div>

          <h3>
            Behaviour is
            <span> the brief.</span>
          </h3>

          <p>
            People don't connect with brands because a content calendar
            says they should. They connect because something makes them
            notice, feel, think or act.
          </p>

          <p>
            We study those moments and translate them into strategy,
            creative and communication that gives brands a reason
            to matter.
          </p>

          <div className="who-editorial-signoff">
            <span className="who-signoff-line" />
            <span>UNDERSTAND PEOPLE. CREATE WITH PURPOSE.</span>
          </div>
        </div>

        <div className="who-behaviour-art" aria-hidden="true">
          <div className="who-art-topline">
            <span>FIG. 01</span>
            <span>THE CONNECTION STUDY</span>
          </div>

          <div className="who-art-stage">
            <div className="who-art-ring who-art-ring-one" />
            <div className="who-art-ring who-art-ring-two" />
            <div className="who-art-ring who-art-ring-three" />

            <div className="who-art-cross who-art-cross-one">+</div>
            <div className="who-art-cross who-art-cross-two">+</div>

            <div className="who-art-node who-art-node-one" />
            <div className="who-art-node who-art-node-two" />
            <div className="who-art-node who-art-node-three" />

            <div className="who-art-core">
              <span>HUMAN</span>
              <strong>BEHAVIOUR</strong>
            </div>

            <div className="who-art-label who-art-label-one">
              <span>01</span>
              ATTENTION
            </div>

            <div className="who-art-label who-art-label-two">
              <span>02</span>
              PERCEPTION
            </div>

            <div className="who-art-label who-art-label-three">
              <span>03</span>
              CONNECTION
            </div>
          </div>

          <div className="who-art-footer">
            <span>INSIGHT</span>
            <span>→</span>
            <span>STRATEGY</span>
            <span>→</span>
            <span>CREATIVE</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
