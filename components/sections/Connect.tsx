"use client";

import { useRef, useState } from "react";
import Section from "./Section";
import ContactForm from "./connect/ContactForm";
import FinalCTA from "./connect/FinalCTA";

// Fill these in once you're ready to have them public, then the row below
// will render automatically. Leave either one empty to hide just that link.
const CONTACT_EMAIL: string = "hellomindfluencebyw@gmail.com";
const INSTAGRAM_HANDLE: string = "@mindfluencebyw";

export default function Connect() {
  const hasDirect = CONTACT_EMAIL || INSTAGRAM_HANDLE;
  const [formRevealed, setFormRevealed] = useState(false);
  const [auditMode, setAuditMode] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  function handleStart(audit = false) {
    setAuditMode(audit);
    setFormRevealed(true);
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  }

  return (
    <Section id="connect" eyebrow="LET'S CONNECT" title="Let's Connect">
      <FinalCTA onStart={() => handleStart(false)} />

      <div className="audit-cta">
        <div>
          <span className="audit-label">THE FREE SOCIAL AUDIT</span>
          <h3>We&apos;ll look at your social presence through three lenses.</h3>
          <p><strong>ATTENTION</strong> — Are people stopping? &nbsp; <strong>MEMORY</strong> — Are they remembering you? &nbsp; <strong>ACTION</strong> — Are they doing anything?</p>
        </div>
        <button className="audit-button" onClick={() => handleStart(true)}>Request your audit →</button>
      </div>

      <div ref={formRef} className={`connect-grid ${formRevealed ? "is-revealed" : ""}`}>
        <div className="contact-form-wrap">
          {auditMode && <div className="audit-context">REQUESTING A SOCIAL AUDIT</div>}
          <ContactForm />
        </div>

        {hasDirect && (
          <div className="connect-direct">
            {CONTACT_EMAIL && (
              <a className="connect-direct-link" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            )}
            {INSTAGRAM_HANDLE && (
              <a
                className="connect-direct-link"
                href={`https://instagram.com/${INSTAGRAM_HANDLE.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
              >
                {INSTAGRAM_HANDLE}
              </a>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
