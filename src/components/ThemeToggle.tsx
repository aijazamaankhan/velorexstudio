"use client";

import { useEffect, useState } from "react";
import { THEME_KEY as KEY } from "@/lib/theme";

type Theme = "dark" | "light";

/**
 * Dark is the brand experience and the default. Light is opt-in, remembered
 * per visitor in localStorage (wrapped in try/catch — private windows and
 * blocked storage simply fall back to dark).
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === "light" ? "light" : "dark",
    );
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    // Let canvas-based visuals (hero field) repaint in the new palette.
    window.dispatchEvent(new Event("resize"));
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* storage unavailable — the choice lasts for this page view only */
    }
  };

  const light = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      aria-pressed={light}
      className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-[var(--color-edge)] bg-white/[0.03] text-ink-dim transition-colors duration-300 hover:bg-white/[0.07] hover:text-ink"
    >
      {/* Moon */}
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        className="absolute transition-all duration-500 [transition-timing-function:var(--ease-swift)]"
        style={{
          transform: light ? "translateY(140%) rotate(40deg)" : "none",
          opacity: light ? 0 : 1,
        }}
      >
        <path
          d="M13.5 9.6A5.8 5.8 0 0 1 6.4 2.5a5.8 5.8 0 1 0 7.1 7.1Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
      {/* Sun */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        className="absolute transition-all duration-500 [transition-timing-function:var(--ease-swift)]"
        style={{
          transform: light ? "none" : "translateY(-140%) rotate(-40deg)",
          opacity: light ? 1 : 0,
        }}
      >
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.3" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line
            key={a}
            x1="8"
            y1="1.2"
            x2="8"
            y2="2.6"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            transform={`rotate(${a} 8 8)`}
          />
        ))}
      </svg>
    </button>
  );
}

