"use client";

import { useEffect, useRef } from "react";

/**
 * Giant marquee type that reacts to scrolling: it drifts on its own, speeds
 * up with scroll velocity, flips direction with scroll direction, and skews
 * slightly while moving fast. One rAF loop, transform-only, stopped entirely
 * when off-screen or under prefers-reduced-motion.
 */
export function VelocityBand({
  words,
  reverse = false,
}: {
  words: string[];
  reverse?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    const root = host.current;
    if (!el || !root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let dir = reverse ? 1 : -1;
    let velocity = 0;
    let lastY = window.scrollY;
    let raf = 0;
    let visible = false;

    const loop = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;

      // Ease velocity toward the latest scroll delta.
      velocity += (dy - velocity) * 0.12;
      if (Math.abs(dy) > 0.5) dir = (dy > 0 ? -1 : 1) * (reverse ? -1 : 1);

      const speed = 0.45 + Math.min(Math.abs(velocity) * 0.35, 14);
      x += dir * speed;

      // One copy's width is half the track, so wrap at -50%.
      const half = el.scrollWidth / 2;
      if (x <= -half) x += half;
      if (x > 0) x -= half;

      const skew = Math.max(-10, Math.min(10, -velocity * 0.35));
      el.style.transform = `translate3d(${x}px,0,0) skewX(${skew}deg)`;

      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) {
        lastY = window.scrollY;
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(root);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reverse]);

  const row = (copy: number) => (
    <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
      {words.map((w, i) => (
        <span key={`${copy}-${i}`} className="flex items-center">
          <span
            className={`vband px-6 text-[13vw] sm:text-[9vw] ${
              i % 2 === 1 ? "vband-outline" : "text-ink/90"
            }`}
          >
            {w}
          </span>
          <span
            aria-hidden
            className="mx-2 h-3 w-3 shrink-0 rounded-full sm:h-5 sm:w-5"
            style={{
              background:
                i % 2 === 0
                  ? "linear-gradient(135deg, var(--color-violet), var(--color-electric))"
                  : "transparent",
              border: i % 2 === 1 ? "1px solid var(--color-violet)" : undefined,
            }}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={host}
      className="edge-fade relative overflow-hidden border-y border-[var(--color-edge)] py-8 sm:py-12"
    >
      <p className="sr-only">{words.join(", ")}</p>
      <div ref={track} className="flex w-max" aria-hidden>
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
