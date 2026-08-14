"use client";

import { useEffect, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion, AnimatePresence } from "framer-motion";
import { triggerPathBurst } from "@/components/PathBurst";

const FORMSPREE_ID = "xvkprlpd";

type FormFields = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [state, handleSubmit] = useForm<FormFields>(FORMSPREE_ID);
  const hasBurst = useRef(false);

  useEffect(() => {
    if (state.succeeded && !hasBurst.current) {
      hasBurst.current = true;
      triggerPathBurst(0.5, 0.5);
    }
    if (!state.succeeded) {
      hasBurst.current = false;
    }
  }, [state.succeeded]);

  const hasGeneralError = !state.submitting && !state.succeeded && !!state.errors;

  return (
    <form className="connect-form" onSubmit={handleSubmit}>
      <div className="connect-field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required disabled={state.submitting} />
        <ValidationError prefix="Name" field="name" errors={state.errors} className="connect-field-error" />
      </div>

      <div className="connect-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required disabled={state.submitting} />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="connect-field-error" />
      </div>

      <div className="connect-field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={4} required disabled={state.submitting} />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="connect-field-error" />
      </div>

      <button
        type="submit"
        className="connect-submit"
        disabled={state.submitting || state.succeeded}
      >
        {state.submitting ? "Sending…" : state.succeeded ? "Sent" : "Send"}
      </button>

      <AnimatePresence mode="wait">
        {state.succeeded && (
          <motion.p
            key="sent"
            className="connect-note connect-note--sent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Message sent. I'll be in touch soon.
          </motion.p>
        )}
        {hasGeneralError && (
          <motion.p
            key="error"
            className="connect-note connect-note--error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Something went wrong sending that, try again in a moment.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
