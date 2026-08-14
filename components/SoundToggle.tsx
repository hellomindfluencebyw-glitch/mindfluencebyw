"use client";

import { useEffect, useState } from "react";
import { isSoundEnabled, setSoundEnabled, playSound } from "@/lib/sound";

export default function SoundToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(isSoundEnabled());
  }, []);

  function toggle() {
    const next = !on;
    setOn(next);
    setSoundEnabled(next);
    if (next) playSound("navClick");
  }

  return (
    <button
      className="sound-toggle"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Turn interface sound off" : "Turn interface sound on"}
      title={on ? "Sound on" : "Sound off"}
    >
      {on ? "♪ Sound" : "♪ Sound off"}
    </button>
  );
}
