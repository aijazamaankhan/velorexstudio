"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_#";

/**
 * Text that "decodes" into place when its parent is hovered or focused.
 * Width is locked to the final string so nothing around it shifts, and the
 * real label is always what assistive tech reads.
 */
export function ScrambleText({ text, trigger }: { text: string; trigger: number }) {
  const [out, setOut] = useState(text);
  const raf = useRef(0);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const duration = 420;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const settled = Math.floor(p * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        if (i < settled || text[i] === " ") s += text[i];
        else s += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setOut(s);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text]);

  useEffect(() => {
    if (trigger > 0) run();
  }, [trigger, run]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <span className="relative inline-block">
      {/* Invisible sizer keeps the width fixed during the scramble */}
      <span className="invisible">{text}</span>
      <span aria-hidden className="absolute inset-0">
        {out}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
