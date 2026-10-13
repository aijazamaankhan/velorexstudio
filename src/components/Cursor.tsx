"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only custom cursor: a dot that tracks exactly and a ring that lags
 * behind with a spring. Elements can declare `data-cursor="label"` plus
 * `data-cursor-label="EXPLORE"` to expand the ring into a contextual label.
 *
 * Never replaces the system cursor — the native one stays visible so the page
 * remains usable if this fails, and it is fully disabled for coarse pointers
 * and for prefers-reduced-motion.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const state = useRef<"idle" | "link" | "label">("idle");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ok = fine.matches && !reduce.matches;
    setEnabled(ok);
    if (!ok) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        if (dot.current) dot.current.style.opacity = "1";
        if (ring.current) ring.current.style.opacity = "1";
      }

      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button, input, textarea, select, [role='button']",
      );

      let next: "idle" | "link" | "label" = "idle";
      let nextLabel = "";

      if (target) {
        const declared = target.dataset.cursor;
        if (declared === "label") {
          next = "label";
          nextLabel = target.dataset.cursorLabel ?? "View";
        } else {
          next = "link";
        }
      }

      if (next !== state.current) {
        state.current = next;
        if (ring.current) ring.current.dataset.state = next;
        setLabel(nextLabel);
      } else if (next === "label" && nextLabel !== label) {
        setLabel(nextLabel);
      }
    };

    const tick = () => {
      // Exact for the dot, eased for the ring — the lag is the whole effect.
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      visible = false;
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
    // `label` is read inside onMove only to avoid redundant setState.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden>
      <div ref={dot} className="cursor-dot" style={{ opacity: 0 }} />
      <div
        ref={ring}
        className="cursor-ring"
        data-state="idle"
        style={{ opacity: 0, transitionProperty: "width,height,margin,background-color,border-color" }}
      >
        {label && <span className="cursor-label">{label}</span>}
      </div>
    </div>
  );
}
