"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { triggerPathBurst } from "@/components/PathBurst";

// Paste your Formspree form ID here once you've created one for free at
// https://formspree.io (New Form -> copy the ID from the endpoint URL).
// The form below activates automatically the moment this isn't empty.
const FORMSPREE_ID = "";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const connected = FORMSPREE_ID.length > 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!connected || status === "sending") return;

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setStatus("sent");
        setValues({ name: "", email: "", message: "" });
        triggerPathBurst(0.5, 0.5);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="connect-form" onSubmit={handleSubmit}>
      <div className="connect-field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          required
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
        />
      </div>

      <div className="connect-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        />
      </div>

      <div className="connect-field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          rows={4}
          required
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
        />
      </div>

      <button
        type="submit"
        className="connect-submit"
        disabled={!connected || status === "sending" || status === "sent"}
      >
        {status === "sending" ? "Sending…" : status === "sent" ? "Sent" : "Send"}
      </button>

      <AnimatePresence mode="wait">
        {!connected && (
          <motion.p
            key="disconnected"
            className="connect-note"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            This form isn't connected yet, add a Formspree form ID in ContactForm.tsx to
            activate it.
          </motion.p>
        )}
        {status === "sent" && (
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
        {status === "error" && (
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
