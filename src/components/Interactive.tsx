"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/** True only on a fine pointer with motion allowed. Effects opt out otherwise. */
function useRichPointer() {
  const [rich, setRich] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setRich(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);
  return rich;
}

/* ── Magnetic button ────────────────────────────────────────
   The element drifts toward the cursor, then springs back.
   Pure transform — never triggers layout.
   ──────────────────────────────────────────────────────────── */

type MagneticProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  ariaLabel?: string;
  download?: boolean;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Magnetic({
  children,
  href,
  onClick,
  className = "",
  strength = 0.34,
  ariaLabel,
  download,
  external,
  type = "button",
  disabled,
}: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);
  const frame = useRef(0);
  const rich = useRichPointer();

  const move = useCallback(
    (e: React.MouseEvent) => {
      if (!rich) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    },
    [rich, strength],
  );

  const leave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.transform = "translate3d(0,0,0)";
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const shared = {
    ref: ref as never,
    onMouseMove: move,
    onMouseLeave: leave,
    className,
    "aria-label": ariaLabel,
  };

  if (href) {
    if (external || download) {
      return (
        <a
          {...shared}
          href={href}
          download={download}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer noopener" : undefined}
        >
          {children}
        </a>
      );
    }
    return (
      <Link {...shared} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button {...shared} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

/* ── Lumen: cursor-tracked border + wash on a card ─────────── */

export function Lumen({
  children,
  className = "",
  accent,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  accent?: string;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const frame = useRef(0);

  const move = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <As
      ref={ref as never}
      onMouseMove={move}
      className={`lumen ${className}`}
      style={accent ? ({ "--accent": accent } as React.CSSProperties) : undefined}
    >
      {children}
    </As>
  );
}

/* ── Tilt: subtle 3D response on product visuals ───────────── */

export function Tilt({
  children,
  className = "",
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const frame = useRef(0);
  const rich = useRichPointer();

  const move = useCallback(
    (e: React.MouseEvent) => {
      if (!rich) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `perspective(1200px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) scale(1.012)`;
      });
    },
    [rich, max],
  );

  const leave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={className}
      style={{
        transition: "transform 0.7s cubic-bezier(0.32,0.72,0,1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

export { useRichPointer };
