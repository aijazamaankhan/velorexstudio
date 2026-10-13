"use client";

import { useEffect, useRef } from "react";

const NODE_LABELS = [
  "MUSIC",
  "RECOVERY",
  "DISCS",
  "OS",
  "DESIGN",
  "AI",
  "WEB",
  "CLOUD",
  "APPS",
];

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  label?: string;
  hue: number;
};

/**
 * The Velorex ecosystem field: named product nodes plus anonymous points,
 * drifting slowly and linking when they come close.
 *
 * Performance guarantees:
 *  • capped device pixel ratio (max 2) and a node count scaled to viewport
 *  • single rAF, paused when the tab is hidden or the hero scrolls away
 *  • one static frame and no loop under prefers-reduced-motion
 */
export function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const parent = canvas.parentElement!;
    // Track the pointer across the whole hero, not just the empty background —
    // pointer events over the headline never reach the background layer.
    const surface = (canvas.closest("section") as HTMLElement | null) ?? parent;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    let running = true;
    let pointer = { x: -9999, y: -9999 };

    const build = () => {
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale the field with the viewport so phones do far less work.
      const extra = Math.round(Math.min(26, Math.max(8, (w * h) / 42000)));
      const total = NODE_LABELS.length + extra;

      nodes = Array.from({ length: total }, (_, i) => {
        const named = i < NODE_LABELS.length;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.14,
          r: named ? 2.6 : 1.2,
          label: named ? NODE_LABELS[i] : undefined,
          hue: named ? (i % 2 === 0 ? 262 : 192) : 250,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // Theme-aware lightness: pale tints vanish on a white background.
      const light = document.documentElement.dataset.theme === "light";
      const nodeL = light ? 48 : 72;
      const labelL = light ? 38 : 80;
      const linkL = light ? 55 : 72;
      const linkDist = Math.min(190, Math.max(120, w / 8));

      // Links first, so nodes sit on top.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > linkDist * linkDist) continue;
          const d = Math.sqrt(d2);
          const alpha = (1 - d / linkDist) * 0.3;
          ctx.strokeStyle = `hsla(250, 80%, ${linkL}%, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        // Cursor proximity lifts a node's presence.
        const pdx = n.x - pointer.x;
        const pdy = n.y - pointer.y;
        const near = Math.max(0, 1 - Math.sqrt(pdx * pdx + pdy * pdy) / 170);

        ctx.fillStyle = `hsla(${n.hue}, 90%, ${nodeL + near * (light ? -10 : 18)}%, ${0.4 + near * 0.5})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 1.6, 0, Math.PI * 2);
        ctx.fill();

        if (n.label) {
          ctx.font = "500 9px ui-monospace, SFMono-Regular, monospace";
          ctx.fillStyle = `hsla(${n.hue}, 60%, ${labelL}%, ${(light ? 0.45 : 0.22) + near * 0.45})`;
          ctx.letterSpacing = "1.6px";
          ctx.fillText(n.label, n.x + 9, n.y + 3);
          ctx.letterSpacing = "0px";
        }
      }
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -40) n.x = w + 40;
        if (n.x > w + 40) n.x = -40;
        if (n.y < -40) n.y = h + 40;
        if (n.y > h + 40) n.y = -40;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (raf || reduce.matches) return;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    build();
    draw();
    if (!reduce.matches) start();

    // Stop entirely once the hero leaves the viewport.
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(parent);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (running) start();
    };

    const onPointer = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      // Feeds the CSS spotlight (.hero-spot) — no React state, no re-render.
      surface.style.setProperty("--hx", `${pointer.x}px`);
      surface.style.setProperty("--hy", `${pointer.y}px`);
    };
    const onPointerOut = () => {
      pointer = { x: -9999, y: -9999 };
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        draw();
      }, 180);
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);
    surface.addEventListener("pointermove", onPointer, { passive: true });
    surface.addEventListener("pointerleave", onPointerOut);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      surface.removeEventListener("pointermove", onPointer);
      surface.removeEventListener("pointerleave", onPointerOut);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  );
}
