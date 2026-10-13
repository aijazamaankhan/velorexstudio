"use client";

import Link from "next/link";
import { useState } from "react";
import { products, statusLabel } from "@/data/products";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  kind: "core" | "product" | "future";
  href?: string;
  meta: string;
};

const CX = 400;
const CY = 280;

/** Directions that are not products yet — the dashed inner ring. */
const FUTURE: { id: string; label: string; meta: string }[] = [
  { id: "f-ai", label: "AI", meta: "In exploration" },
  { id: "f-cloud", label: "CLOUD", meta: "In exploration" },
  { id: "f-future", label: "FUTURE", meta: "Unannounced" },
];

/**
 * Evenly space `count` points on an ellipse, starting at `start` degrees
 * (0 = right, -90 = top). Coordinates are rounded so server and client markup
 * match exactly.
 */
const ring = (count: number, rx: number, ry: number, start: number) =>
  Array.from({ length: count }, (_, i) => {
    const a = ((start + (360 / count) * i) * Math.PI) / 180;
    return {
      x: Math.round(CX + rx * Math.cos(a)),
      y: Math.round(CY + ry * Math.sin(a)),
    };
  });

/* Every product in data/products.ts gets a node on the outer ring — nothing
   here needs editing when a product is added. The half-step offset keeps a
   node off the exact top and bottom, where neighbouring labels are closest. */
const productRing = ring(products.length, 330, 205, -90 + 180 / products.length);
const futureRing = ring(FUTURE.length, 118, 92, -90);

const NODES: Node[] = [
  { id: "core", label: "VELOREX", x: CX, y: CY, kind: "core", meta: "The studio" },
  ...products.map((p, i) => ({
    id: p.slug,
    label: p.mark,
    ...productRing[i],
    kind: "product" as const,
    href: `/products/${p.slug}`,
    meta: `${p.name} · ${statusLabel[p.status]}`,
  })),
  ...FUTURE.map((f, i) => ({ ...f, ...futureRing[i], kind: "future" as const })),
];

const EDGES: [string, string][] = NODES.filter((n) => n.kind !== "core").map((n) => [
  "core",
  n.id,
]);

const byId = new Map(NODES.map((n) => [n.id, n]));

const colourFor = (kind: Node["kind"]) =>
  kind === "core" ? "#ffffff" : kind === "product" ? "#9d85ff" : "#2ad4ff";

/**
 * The ecosystem map. Hovering or focusing a node dims everything it is not
 * connected to — the graph explains itself by responding.
 */
export function Constellation() {
  const [active, setActive] = useState<string | null>(null);

  const connected = (id: string) =>
    active === null ||
    active === id ||
    EDGES.some(([a, b]) => (a === active && b === id) || (b === active && a === id));

  const edgeLive = ([a, b]: [string, string]) =>
    active === null || a === active || b === active;

  const activeNode = active ? byId.get(active) : undefined;

  return (
    <div className="relative">
      <svg
        viewBox="0 0 800 560"
        className="w-full"
        role="group"
        aria-label="The Velorex product ecosystem"
      >
        <defs>
          <radialGradient id="cn-glow">
            <stop offset="0%" stopColor="#9d85ff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9d85ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Edges */}
        {EDGES.map(([a, b]) => {
          const na = byId.get(a)!;
          const nb = byId.get(b)!;
          const live = edgeLive([a, b]);
          return (
            <line
              key={`${a}-${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="#9d85ff"
              strokeWidth={live && active ? 1.4 : 1}
              strokeOpacity={live ? (active ? 0.7 : 0.26) : 0.07}
              style={{ transition: "stroke-opacity 0.45s var(--ease-swift), stroke-width 0.45s var(--ease-swift)" }}
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((n) => {
          const on = connected(n.id);
          const colour = colourFor(n.kind);
          const r = n.kind === "core" ? 9 : n.kind === "product" ? 6 : 4.5;
          // Labels sit outside the ring: above nodes in the top half, below in the bottom half.
          const below = n.kind !== "core" && n.y > CY;

          const body = (
            <g
              style={{
                opacity: on ? 1 : 0.22,
                transition: "opacity 0.45s var(--ease-swift)",
                cursor: n.href ? "pointer" : "default",
              }}
              onMouseEnter={() => setActive(n.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(n.id)}
              onBlur={() => setActive(null)}
            >
              {n.kind === "core" && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="52"
                  fill="url(#cn-glow)"
                  style={{ animation: "breathe 6s ease-in-out infinite" }}
                />
              )}

              {/* Larger invisible hit area, so small nodes are easy to hover */}
              <circle cx={n.x} cy={n.y} r={r + 14} fill="transparent" />

              {/* Halo ring on the active node */}
              <circle
                cx={n.x}
                cy={n.y}
                r={r + 10}
                fill="none"
                stroke={colour}
                strokeOpacity={active === n.id ? 0.5 : 0}
                strokeWidth="1"
                style={{ transition: "stroke-opacity 0.4s var(--ease-swift)" }}
              />

              <circle
                cx={n.x}
                cy={n.y}
                r={r}
                fill={n.kind === "future" ? "#090a0f" : colour}
                stroke={colour}
                strokeWidth={n.kind === "future" ? 1.3 : 0}
                strokeDasharray={n.kind === "future" ? "3 3" : undefined}
                style={{
                  animation:
                    n.kind === "future"
                      ? "breathe 4.5s ease-in-out infinite"
                      : undefined,
                }}
              />

              <text
                x={n.x}
                y={below ? n.y + r + 22 : n.y - r - 14}
                textAnchor="middle"
                className="font-mono"
                fontSize={n.kind === "core" ? 13 : 10.5}
                letterSpacing={n.kind === "core" ? 2.8 : 2}
                fill={n.kind === "core" ? "#f5f6fa" : "#a4a8b8"}
              >
                {n.label}
              </text>
            </g>
          );

          return n.href ? (
            <Link key={n.id} href={n.href} aria-label={`${n.label} — ${n.meta}`}>
              {body}
            </Link>
          ) : (
            <g key={n.id} tabIndex={0} role="img" aria-label={`${n.label} — ${n.meta}`}>
              {body}
            </g>
          );
        })}
      </svg>

      {/* Readout */}
      <div className="mt-2 flex min-h-[2.5rem] items-center justify-center" aria-live="polite">
        <p className="text-center font-mono text-[11px] tracking-[0.2em] text-ink-mute uppercase">
          {activeNode ? `${activeNode.label} — ${activeNode.meta}` : "Hover a node"}
        </p>
      </div>
    </div>
  );
}
