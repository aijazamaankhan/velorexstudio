import type { CSSProperties, ReactNode } from "react";

/**
 * The Velorex icon set.
 *
 * One consistent drawing language: 24×24 grid, 1.5px strokes, round caps,
 * no fills except small accent dots. Inline SVG — no icon font, no library,
 * no network request — and every icon inherits `currentColor`.
 *
 * TO ADD AN ICON: add a key + its paths to `PATHS`. It becomes available to
 * every data file (products, services, …) through the `IconName` type.
 */

const PATHS = {
  /* ── Disciplines / services ───────────────────────────── */
  web: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9h18" />
      <circle cx="6.2" cy="6.75" r=".6" fill="currentColor" stroke="none" />
      <circle cx="8.4" cy="6.75" r=".6" fill="currentColor" stroke="none" />
      <path d="M7 13.5h6M7 16h4" />
    </>
  ),
  code: (
    <>
      <path d="M8.5 7.5 4 12l4.5 4.5M15.5 7.5 20 12l-4.5 4.5M13.5 5.5l-3 13" />
    </>
  ),
  desktop: (
    <>
      <rect x="3" y="4" width="18" height="12.5" rx="2" />
      <path d="M9 20h6M12 16.5V20" />
    </>
  ),
  ai: (
    <>
      <path d="M12 3.5c.5 3.6 2.4 5.5 6 6-3.6.5-5.5 2.4-6 6-.5-3.6-2.4-5.5-6-6 3.6-.5 5.5-2.4 6-6Z" />
      <path d="M18.5 15.5c.2 1.4.9 2.1 2.3 2.3-1.4.2-2.1.9-2.3 2.3-.2-1.4-.9-2.1-2.3-2.3 1.4-.2 2.1-.9 2.3-2.3Z" />
    </>
  ),
  automation: (
    <>
      <path d="M4.5 12a7.5 7.5 0 0 1 13-5.1M19.5 12a7.5 7.5 0 0 1-13 5.1" />
      <path d="M17.8 3.5v3.6h-3.6M6.2 20.5v-3.6h3.6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  design: (
    <>
      <path d="M4 20l1.2-4.6L15.6 5a2 2 0 0 1 2.8 0l.6.6a2 2 0 0 1 0 2.8L8.6 18.8 4 20Z" />
      <path d="M14 6.6 17.4 10" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5Z" />
      <path d="M3.5 12 12 16.5 20.5 12M3.5 16 12 20.5 20.5 16" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18.5h10.2a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7.2 9.1 4.7 4.7 0 0 0 7 18.5Z" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.5" />
      <path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6v5.5c0 4.3-3 7.7-7 9-4-1.3-7-4.7-7-9V6l7-2.5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.8-.8 1.8-1.7 0-1.3-1.2-1.6-1.2-2.8 0-1 .8-1.7 1.8-1.7h2.1a4 4 0 0 0 4-4c0-3.9-3.8-6.8-8.5-6.8Z" />
      <circle cx="7.8" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  terminal: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="m7 10 3 2.5L7 15M12.5 15.5H17" />
    </>
  ),
  cube: (
    <>
      <path d="M12 3.2 19.8 7.6v8.8L12 20.8l-7.8-4.4V7.6L12 3.2Z" />
      <path d="M4.2 7.6 12 12l7.8-4.4M12 12v8.8" />
    </>
  ),

  /* ── Process ──────────────────────────────────────────── */
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5" />
    </>
  ),
  build: (
    <>
      <path d="M14.6 6.3a3.8 3.8 0 0 0 4.9 4.9l-8.6 8.6a2.1 2.1 0 0 1-3-3l8.6-8.6a3.8 3.8 0 0 1-1.9-1.9Z" />
      <path d="M14.6 6.3 17.6 3.3M19.5 11.2l1.2-1.2" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.2 12.2 2.6 2.6 5-5.2" />
    </>
  ),
  rocket: (
    <>
      <path d="M14.5 4.5c2.8-.9 5-.5 5 0s.9 2.2 0 5L13 16l-5-5 6.5-6.5Z" />
      <path d="M8 11 4.5 10.5 7 8h4M13 16l.5 3.5L16 17v-4" />
      <path d="M7.5 16.5c-1 .3-2.3 1.6-2.5 3 1.4-.2 2.7-1.5 3-2.5" />
      <circle cx="15.5" cy="8.5" r="1.3" />
    </>
  ),
  grow: (
    <>
      <path d="M4 19.5h16" />
      <path d="m5 15 4.5-4.5 3 3L19 7" />
      <path d="M15 7h4v4" />
    </>
  ),
  idea: (
    <>
      <path d="M9 17.5h6M10 20.5h4" />
      <path d="M12 3.5a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V17h5.2v-.7c0-.8.4-1.5 1-2A6 6 0 0 0 12 3.5Z" />
    </>
  ),

  /* ── Principles ───────────────────────────────────────── */
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  blocks: (
    <>
      <rect x="4" y="13" width="7" height="7" rx="1.2" />
      <rect x="13" y="13" width="7" height="7" rx="1.2" />
      <rect x="8.5" y="4" width="7" height="7" rx="1.2" />
    </>
  ),
  cpu: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx=".8" />
      <path d="M9.5 3.5v3M14.5 3.5v3M9.5 17.5v3M14.5 17.5v3M3.5 9.5h3M3.5 14.5h3M17.5 9.5h3M17.5 14.5h3" />
    </>
  ),
  human: (
    <>
      <circle cx="12" cy="7.5" r="3.2" />
      <path d="M5.5 20c.6-3.7 3.2-6 6.5-6s5.9 2.3 6.5 6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19.5c.5-3.3 2.7-5.3 5.5-5.3s5 2 5.5 5.3" />
      <circle cx="16.5" cy="9" r="2.4" />
      <path d="M16 14.3c2.4 0 4.1 1.7 4.5 4.4" />
    </>
  ),
  flask: (
    <>
      <path d="M9.5 3.5h5M10.5 3.5v5.2L5.3 17.9a1.8 1.8 0 0 0 1.6 2.6h10.2a1.8 1.8 0 0 0 1.6-2.6L13.5 8.7V3.5" />
      <path d="M7.5 14h9" />
    </>
  ),

  /* ── Media (Velora) ───────────────────────────────────── */
  music: (
    <>
      <path d="M9 17.5V5.5l10-2v12" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <circle cx="16.5" cy="15.5" r="2.5" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10 8.8v6.4l5.2-3.2L10 8.8Z" />
    </>
  ),
  disc: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 6.2a5.8 5.8 0 0 1 5.8 5.8" />
    </>
  ),
  library: (
    <>
      <path d="M5 4v16M9 4v16" />
      <path d="m13 4.6 3.9-1 4.1 15.5-3.9 1L13 4.6Z" />
    </>
  ),
  queue: (
    <>
      <path d="M4 6.5h11M4 11.5h11M4 16.5h7" />
      <path d="M15.5 14.5v5l4-2.5-4-2.5Z" />
    </>
  ),
  convert: (
    <>
      <path d="M4.5 8.5h13l-3.5-3.5M19.5 15.5h-13l3.5 3.5" />
    </>
  ),
  record: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" />
    </>
  ),
  wave: (
    <>
      <path d="M3.5 12h1.5M7 8v8M10.5 5v14M14 9v6M17.5 7v10M20.5 12H19" />
    </>
  ),
  sliders: (
    <>
      <path d="M6 4v16M12 4v16M18 4v16" />
      <circle cx="6" cy="14" r="2" fill="var(--color-void)" />
      <circle cx="12" cy="8" r="2" fill="var(--color-void)" />
      <circle cx="18" cy="15.5" r="2" fill="var(--color-void)" />
    </>
  ),
  visualizer: (
    <>
      <path d="M4 20V14M8 20V8M12 20V11M16 20V5M20 20v-9" />
    </>
  ),
  sparkles: (
    <>
      <path d="M10 4c.4 3.2 2 4.8 5.2 5.2C12 9.6 10.4 11.2 10 14.4 9.6 11.2 8 9.6 4.8 9.2 8 8.8 9.6 7.2 10 4Z" />
      <path d="M17 13.5c.3 1.9 1.1 2.7 3 3-1.9.3-2.7 1.1-3 3-.3-1.9-1.1-2.7-3-3 1.9-.3 2.7-1.1 3-3Z" />
    </>
  ),
  hires: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2.5" />
      <path d="M7 9.5v5M7 12h3M10 9.5v5M13.5 9.5v5h1.5a2.5 2.5 0 0 0 0-5h-1.5Z" />
    </>
  ),

  /* ── Recovery ─────────────────────────────────────────── */
  restore: (
    <>
      <path d="M13.5 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-5.5-5.5Z" />
      <path d="M13.5 3.5V9H19" />
      <path d="M9.3 15.3a3 3 0 1 0 .7-3.3M9 10.8v2h2" />
    </>
  ),
  drive: (
    <>
      <rect x="3" y="12.5" width="18" height="7" rx="2" />
      <path d="M5 12.5 7.4 5.8A2 2 0 0 1 9.3 4.5h5.4a2 2 0 0 1 1.9 1.3l2.4 6.7" />
      <circle cx="16.8" cy="16" r=".9" fill="currentColor" stroke="none" />
      <path d="M6.5 16h5" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8.5V6a2 2 0 0 1 2-2h2.5M15.5 4H18a2 2 0 0 1 2 2v2.5M20 15.5V18a2 2 0 0 1-2 2h-2.5M8.5 20H6a2 2 0 0 1-2-2v-2.5" />
      <path d="M4 12h16" />
    </>
  ),
  partition: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5V12l6 6" />
    </>
  ),
  eye: (
    <>
      <path d="M2.8 12S6.2 5.5 12 5.5 21.2 12 21.2 12 17.8 18.5 12 18.5 2.8 12 2.8 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  hex: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M7 9.5h2M11 9.5h2M15 9.5h2M7 12h2M11 12h2M15 12h2M7 14.5h2M11 14.5h2" />
    </>
  ),
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2" />
      <path d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5" />
    </>
  ),
  usb: (
    <>
      <rect x="7" y="9" width="10" height="11.5" rx="2" />
      <path d="M9 9V4h6v5M10.5 6h.01M13.5 6h.01" />
    </>
  ),

  /* ── Writing ──────────────────────────────────────────── */
  feather: (
    <>
      <path d="M19.5 4.5c-6.5 0-12 5-12 11.5v4" />
      <path d="M7.5 16h6.5c3.3 0 5.5-3.5 5.5-11.5" />
      <path d="M10 12.5h5.5" />
    </>
  ),
  markdown: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
      <path d="M6 15V9l2.5 3L11 9v6M16.5 9v6M14.5 13l2 2 2-2" />
    </>
  ),
  note: (
    <>
      <path d="M5.5 4.5h13a1 1 0 0 1 1 1v9l-5 5h-9a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1Z" />
      <path d="M19.5 14.5h-4a1 1 0 0 0-1 1v4M8.5 9h7M8.5 12h4" />
    </>
  ),
  document: (
    <>
      <path d="M13.5 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-5.5-5.5Z" />
      <path d="M13.5 3.5V9H19M8.5 13h7M8.5 16.5h5" />
    </>
  ),
  focus: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  folder: (
    <>
      <path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-10Z" />
    </>
  ),
  export: (
    <>
      <path d="M12 14.5V3.5M8 7.5l4-4 4 4" />
      <path d="M5.5 12.5v6a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-6" />
    </>
  ),
  text: (
    <>
      <path d="M5 6.5V5h14v1.5M12 5v14M9.5 19h5" />
    </>
  ),

  image: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <circle cx="9" cy="9.5" r="1.8" />
      <path d="m4 17.5 5-5 3.5 3.5 2.5-2.5 5 5" />
    </>
  ),

  /* ── Platforms ────────────────────────────────────────── */
  phone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  android: (
    <>
      <path d="M5.5 16.5v-4a6.5 6.5 0 0 1 13 0v4Z" />
      <path d="M8 7.2 6.5 5M16 7.2 17.5 5" />
      <circle cx="9.5" cy="12.5" r=".8" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="12.5" r=".8" fill="currentColor" stroke="none" />
    </>
  ),

  /* ── Industries ───────────────────────────────────────── */
  store: (
    <>
      <path d="M4 10V20h16V10" />
      <path d="M2 10l3-6h14l3 6" />
      <path d="M2 10c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  wood: (
    <>
      <path d="M12 3c-2 3-5 5-5 8a5 5 0 0 0 10 0c0-3-3-5-5-8Z" />
      <path d="M12 11v9M9 17l3-3 3 3" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.5h11v9.5h-11zM13.5 9.5h4l3 3.5v3h-7" />
      <circle cx="6.5" cy="17.5" r="1.8" fill="var(--color-void)" />
      <circle cx="16.5" cy="17.5" r="1.8" fill="var(--color-void)" />
    </>
  ),
  health: (
    <>
      <path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10Z" />
      <path d="M7.5 12.5h2.5l1.2-2 1.8 4 1.2-2h2.3" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8.5h14l-1 11a1.5 1.5 0 0 1-1.5 1.4h-9A1.5 1.5 0 0 1 6 19.5l-1-11Z" />
      <path d="M9 10.5V7a3 3 0 0 1 6 0v3.5" />
    </>
  ),

  /* ── Contact / utility ────────────────────────────────── */
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m3.8 7 8.2 6 8.2-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 20.5s-6.5-5.4-6.5-10.5a6.5 6.5 0 0 1 13 0c0 5.1-6.5 10.5-6.5 10.5Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  chat: (
    <>
      <path d="M4.5 17.5V7a2.5 2.5 0 0 1 2.5-2.5h10A2.5 2.5 0 0 1 19.5 7v6.5A2.5 2.5 0 0 1 17 16H8.5l-4 3.5v-2Z" />
      <path d="M8.5 9h7M8.5 12h4.5" />
    </>
  ),
  building: (
    <>
      <path d="M4.5 20.5v-15a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v15M15.5 9.5h2a2 2 0 0 1 2 2v9M3 20.5h18" />
      <path d="M8 7.5h4M8 11h4M8 14.5h4" />
    </>
  ),
  download: (
    <>
      <path d="M12 3.5v11M8 10.5l4 4 4-4" />
      <path d="M5 16.5v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  size = 20,
  className = "",
  strokeWidth = 1.5,
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={className}
      style={style}
    >
      {PATHS[name]}
    </svg>
  );
}

/**
 * The standard framed icon: a soft tile lit in the section's accent. Inside
 * any `.group`, hovering lifts the tile, brightens the glow and rotates the
 * inner ring — so every icon on the site responds the same way.
 */
export function IconTile({
  name,
  accent = "#7c5cff",
  size = "md",
  className = "",
}: {
  name: IconName;
  accent?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const box = size === "lg" ? "h-14 w-14" : size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const icon = size === "lg" ? 24 : size === "sm" ? 16 : 20;

  return (
    <span
      aria-hidden
      className={`icon-tile relative grid shrink-0 place-items-center rounded-xl border ${box} ${className}`}
      style={
        {
          "--accent": accent,
          borderColor: `${accent}40`,
          color: accent,
          background: `radial-gradient(circle at 30% 20%, ${accent}2e, ${accent}08 70%)`,
        } as CSSProperties
      }
    >
      <span className="icon-tile-ring pointer-events-none absolute inset-[-1px] rounded-[inherit]" />
      <Icon name={name} size={icon} className="relative" />
    </span>
  );
}
