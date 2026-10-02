"use client";

import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  ["MIND", "hero"],
  ["WORK", "work"],
  ["SERVICES", "services"],
  ["BEHAVIOUR LAB", "behaviour-lab"],
  ["ABOUT", "about"],
  ["CONTACT", "connect"],
] as const;

export default function GlobalNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="global-nav">
      <a className="global-brand" href="#hero" aria-label="Mindfluence by W home" onClick={() => setOpen(false)}>MINDFLUENCE <span>/ BY W</span></a>
      <nav aria-label="Primary navigation">
        {LINKS.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <div className="global-nav-actions">
        <ThemeToggle />
        <button className={`mobile-menu-button${open ? " is-open" : ""}`} type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </div>
      {open && <div className="mobile-menu" id="mobile-menu">
        {LINKS.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      </div>}
    </header>
  );
}
