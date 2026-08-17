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
  const formRef = useRef<HTMLDivElement | null>(null);

  function handleStart() {
    setFormRevealed(true);
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  }

  return (
    <Section id="connect" eyebrow="LET'S CONNECT" title="Let's Connect">
      <FinalCTA onStart={handleStart} />

      <div ref={formRef} className={`connect-grid ${formRevealed ? "is-revealed" : ""}`}>
        <ContactForm />

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
