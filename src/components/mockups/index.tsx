import type { ReactNode } from "react";
import type { Product } from "@/data/products";
import { Icon } from "../Icons";

/**
 * Product visuals are drawn, not photographed — every mockup below is CSS and
 * inline SVG. That keeps the page free of image payload entirely, lets each
 * mockup animate on the GPU, and means they re-theme with the design tokens.
 */

/* ── Shared window chrome ───────────────────────────────── */

function AppWindow({
  title,
  accent,
  children,
  className = "",
}: {
  title: string;
  accent: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`dark-island relative overflow-hidden rounded-xl border border-[#24263180] bg-[#0b0c11] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-[var(--color-edge)] bg-white/[0.02] px-3 py-2">
        <span className="flex gap-1.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span
              key={c}
              className="h-[7px] w-[7px] rounded-full opacity-60"
              style={{ background: c }}
            />
          ))}
        </span>
        <span className="ml-2 font-mono text-[9px] tracking-[0.16em] text-ink-mute uppercase">
          {title}
        </span>
        <span
          className="ml-auto h-1 w-1 rounded-full"
          style={{ background: accent, animation: "pulse-dot 2.6s ease-in-out infinite" }}
        />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

const Bar = ({ w, o = 0.18 }: { w: string; o?: number }) => (
  <span
    className="block h-[5px] rounded-full bg-white"
    style={{ width: w, opacity: o }}
  />
);

/* ── 1. Velora — audio ──────────────────────────────────── */

export function AudioMockup({ accent }: { accent: string }) {
  const tracks = [
    { n: "01", w: "62%", live: true },
    { n: "02", w: "44%" },
    { n: "03", w: "71%" },
    { n: "04", w: "38%" },
    { n: "05", w: "56%" },
  ];

  return (
    <AppWindow title="Velora" accent={accent}>
      <div className="grid grid-cols-[92px_1fr] gap-0">
        {/* Sidebar */}
        <aside className="space-y-2.5 border-r border-[var(--color-edge)] p-3">
          {["Home", "Library", "Radio", "Playlists", "Today"].map((s, i) => (
            <div
              key={s}
              className="flex items-center gap-1.5 rounded px-1.5 py-1"
              style={
                i === 1
                  ? { background: `${accent}1f`, boxShadow: `inset 2px 0 0 ${accent}` }
                  : undefined
              }
            >
              <span
                className="h-1 w-1 shrink-0 rounded-full"
                style={{ background: i === 1 ? accent : "#ffffff30" }}
              />
              <span
                className="font-mono text-[7.5px] tracking-wide"
                style={{ color: i === 1 ? accent : "#ffffff44" }}
              >
                {s}
              </span>
            </div>
          ))}
        </aside>

        {/* Now playing */}
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div
              className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md"
              style={{
                background: `conic-gradient(from 210deg at 50% 50%, ${accent}, #2ad4ff, ${accent})`,
              }}
            >
              <div className="absolute inset-[30%] rounded-full bg-[#0b0c11]" />
            </div>
            <div className="min-w-0 flex-1 space-y-1.5">
              <Bar w="58%" o={0.55} />
              <Bar w="34%" o={0.2} />
            </div>
          </div>

          {/* Equaliser */}
          <div className="mt-4 flex h-11 items-end gap-[3px]">
            {Array.from({ length: 28 }).map((_, i) => (
              <span
                key={i}
                className="flex-1 origin-bottom rounded-sm"
                style={{
                  height: "100%",
                  background: `linear-gradient(to top, ${accent}, ${accent}22)`,
                  animation: `eq-bar ${0.75 + (i % 6) * 0.17}s ${(i % 9) * 0.08}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </div>

          {/* Seek bar */}
          <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[43%] rounded-full" style={{ background: accent }} />
          </div>

          {/* Queue */}
          <ul className="mt-4 space-y-2">
            {tracks.map((t) => (
              <li key={t.n} className="flex items-center gap-2.5">
                <span className="font-mono text-[7.5px] text-white/25">{t.n}</span>
                <Bar w={t.w} o={t.live ? 0.5 : 0.14} />
                {t.live && (
                  <span
                    className="ml-auto h-1 w-1 rounded-full"
                    style={{ background: accent }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppWindow>
  );
}

/* ── 2. Recover — recovery dashboard ────────────────────── */

export function RecoveryMockup({ accent }: { accent: string }) {
  const rows = [
    { t: "NTFS", w: "54%", ok: true },
    { t: "exFAT", w: "38%", ok: true },
    { t: "CARVE", w: "67%", ok: false },
    { t: "FAT32", w: "45%", ok: true },
    { t: "CARVE", w: "29%", ok: false },
  ];

  return (
    <AppWindow title="Velorex Recovery Studio" accent={accent}>
      <div className="relative p-4">
        {/* Scan sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-16 opacity-60"
          style={{
            background: `linear-gradient(180deg, transparent, ${accent}22, transparent)`,
            animation: "scan-y 4.5s linear infinite",
          }}
        />

        {/* Drive map */}
        <div className="grid grid-cols-[1fr_auto] items-start gap-4">
          <div className="space-y-2">
            <p className="font-mono text-[8px] tracking-[0.2em] text-white/35 uppercase">
              Sector map
            </p>
            <div className="grid grid-cols-[repeat(22,1fr)] gap-[2px]">
              {Array.from({ length: 88 }).map((_, i) => {
                const found = i % 11 === 3 || i % 17 === 5;
                const scanned = i < 62;
                return (
                  <span
                    key={i}
                    className="aspect-square rounded-[1px]"
                    style={{
                      background: found
                        ? accent
                        : scanned
                          ? "#ffffff1c"
                          : "#ffffff08",
                      animation: found
                        ? `pulse-dot ${2 + (i % 5) * 0.4}s ${(i % 7) * 0.15}s ease-in-out infinite`
                        : undefined,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Radial progress */}
          <div className="relative grid h-[68px] w-[68px] place-items-center">
            <svg viewBox="0 0 68 68" className="absolute inset-0 -rotate-90">
              <circle cx="34" cy="34" r="28" fill="none" stroke="#ffffff12" strokeWidth="3" />
              <circle
                cx="34"
                cy="34"
                r="28"
                fill="none"
                stroke={accent}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="176"
                strokeDashoffset="62"
              />
            </svg>
            <span className="font-mono text-[11px] font-medium" style={{ color: accent }}>
              65%
            </span>
          </div>
        </div>

        {/* Found files */}
        <ul className="mt-4 space-y-2 border-t border-[var(--color-edge)] pt-3">
          {rows.map((r, i) => (
            <li key={i} className="flex items-center gap-2.5">
              <span
                className="rounded-[3px] px-1.5 py-[2px] font-mono text-[7px] tracking-wider"
                style={{
                  color: r.ok ? accent : "#ffffff40",
                  background: r.ok ? `${accent}18` : "#ffffff0a",
                }}
              >
                {r.t}
              </span>
              <Bar w={r.w} o={r.ok ? 0.34 : 0.14} />
            </li>
          ))}
        </ul>
      </div>
    </AppWindow>
  );
}

/* ── 3. DiscStudio — authoring + burn ───────────────────── */

export function DiscMockup({ accent }: { accent: string }) {
  const formats = ["DVD", "BD", "4K UHD", "VCD", "CD"];
  const steps = ["Media", "Edit", "Menus", "Audio", "Preview", "Burn"];

  return (
    <AppWindow title="Velorex DiscStudio" accent={accent}>
      <div className="p-4">
        {/* Format badges — DiscStudio names formats with its own badges */}
        <div className="flex flex-wrap gap-1.5">
          {formats.map((f, i) => (
            <span
              key={f}
              className="rounded-[3px] border px-1.5 py-[2px] font-mono text-[7px] tracking-wider"
              style={
                i === 0
                  ? { borderColor: accent, color: accent, background: `${accent}1a` }
                  : { borderColor: "#ffffff1a", color: "#ffffff55" }
              }
            >
              {f}
            </span>
          ))}
        </div>

        {/* Step rail */}
        <div className="mt-3.5 flex items-center">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: i < 5 ? accent : "transparent",
                    border: i === 5 ? `1px solid ${accent}` : undefined,
                    animation: i === 5 ? "pulse-dot 1.6s ease-in-out infinite" : undefined,
                  }}
                />
                <span className="font-mono text-[6px] text-white/35">{s}</span>
              </div>
              {i < steps.length - 1 && (
                <span
                  className="mx-1 mb-2.5 h-px flex-1"
                  style={{ background: i < 4 ? `${accent}88` : "#ffffff1a" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Disc + burn status */}
        <div className="mt-4 grid grid-cols-[auto_1fr] items-center gap-4">
          <div className="relative h-[76px] w-[76px]">
            {/* Burn progress ring */}
            <svg viewBox="0 0 76 76" className="absolute inset-0 -rotate-90">
              <circle cx="38" cy="38" r="35" fill="none" stroke="#ffffff10" strokeWidth="2" />
              <circle
                cx="38"
                cy="38"
                r="35"
                fill="none"
                stroke={accent}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="220"
                strokeDashoffset="84"
              />
            </svg>
            {/* The disc — iridescent, spinning */}
            <div
              className="absolute inset-[6px] rounded-full"
              style={{
                background: `conic-gradient(from 0deg, #1a1b22, ${accent}55, #2ad4ff44, #1a1b22, #9d85ff44, ${accent}33, #1a1b22)`,
                animation: "spin-slow 3.2s linear infinite",
              }}
            >
              <div className="absolute inset-[34%] rounded-full border border-white/10 bg-[#0b0c11]" />
            </div>
          </div>

          <div className="min-w-0 space-y-2.5">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[8px] tracking-[0.18em] text-white/45 uppercase">
                Burning
              </span>
              <span className="font-mono text-[11px] font-medium" style={{ color: accent }}>
                62%
              </span>
            </div>

            {/* Capacity: video · menus · personal files */}
            <div className="flex h-[5px] w-full overflow-hidden rounded-full bg-white/10">
              <span className="h-full w-[58%]" style={{ background: accent }} />
              <span className="h-full w-[9%]" style={{ background: "#9d85ff" }} />
              <span className="h-full w-[14%]" style={{ background: "#2ad4ff" }} />
            </div>
            <div className="flex justify-between font-mono text-[6.5px] text-white/35">
              <span>Video · Menus · Personal</span>
              <span>3.8 / 4.7 GB</span>
            </div>

            <div className="space-y-1.5 pt-0.5">
              <Bar w="72%" o={0.2} />
              <Bar w="48%" o={0.12} />
            </div>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

/* ── 4. Design OS — desktop environment ────────────────── */

export function OSMockup({ accent }: { accent: string }) {
  const tasks = [
    { w: "64%", done: true },
    { w: "48%", done: false },
    { w: "56%", done: false },
  ];
  return (
    <AppWindow title="Velorex Design OS" accent={accent}>
      <div
        className="relative p-3.5"
        style={{
          background: `radial-gradient(120% 80% at 15% 0%, ${accent}26, transparent 60%), radial-gradient(90% 70% at 100% 100%, #7c5cff22, transparent 60%)`,
        }}
      >
        {/* Command Center */}
        <div className="mx-auto flex w-[78%] items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5">
          <span className="font-mono text-[7px] text-white/40">Ctrl K</span>
          <span className="h-2.5 w-px bg-white/15" />
          <span className="font-mono text-[7.5px] text-white/50">+ call Mira tomorrow 3pm !high</span>
          <span
            className="ml-auto inline-block h-[9px] w-[1.5px]"
            style={{ background: accent, animation: "caret 1.1s steps(1) infinite" }}
          />
        </div>

        <div className="mt-3 grid grid-cols-[1.3fr_1fr] gap-2.5">
          {/* Today widget */}
          <div className="rounded-lg border border-white/10 bg-black/30 p-2.5">
            <p className="font-mono text-[7px] tracking-[0.18em] uppercase" style={{ color: accent }}>
              Today
            </p>
            <ul className="mt-2 space-y-1.5">
              {tasks.map((t, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span
                    className="grid h-2 w-2 shrink-0 place-items-center rounded-[2px] border"
                    style={{
                      borderColor: t.done ? accent : "#ffffff33",
                      background: t.done ? accent : "transparent",
                    }}
                  />
                  <Bar w={t.w} o={t.done ? 0.14 : 0.32} />
                </li>
              ))}
            </ul>
          </div>

          {/* System + focus */}
          <div className="space-y-2 rounded-lg border border-white/10 bg-black/30 p-2.5">
            {["CPU", "GPU", "MEM"].map((k, i) => (
              <div key={k} className="flex items-center gap-1.5">
                <span className="w-4 font-mono text-[6px] text-white/35">{k}</span>
                <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
                  <span
                    className="block h-full origin-left rounded-full"
                    style={{
                      width: `${[38, 62, 47][i]}%`,
                      background: i === 1 ? accent : "#ffffff55",
                      animation: `eq-bar ${1.6 + i * 0.4}s ease-in-out infinite alternate`,
                    }}
                  />
                </span>
              </div>
            ))}
            <p className="pt-0.5 font-mono text-[6.5px] text-white/40">Focus · 25:00</p>
          </div>
        </div>

        {/* Dock */}
        <div className="mx-auto mt-3 flex w-fit gap-1.5 rounded-xl border border-white/10 bg-black/40 px-2 py-1.5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className="h-4 w-4 rounded-[5px]"
              style={{
                background: i === 0 ? `linear-gradient(135deg, ${accent}, ${accent}66)` : "#ffffff14",
                boxShadow: i === 0 ? `0 0 10px ${accent}66` : undefined,
              }}
            />
          ))}
        </div>
      </div>
    </AppWindow>
  );
}

/* ── 5. Pixel Studio — image editor ─────────────────────── */

export function PixelMockup({ accent }: { accent: string }) {
  return (
    <AppWindow title="Velorex Pixel Studio" accent={accent}>
      <div className="grid grid-cols-[22px_1fr_78px]">
        {/* Tool rail */}
        <aside className="space-y-1.5 border-r border-white/10 p-1.5">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <span
              key={i}
              className="block h-3 w-3 rounded-[3px]"
              style={{
                background: i === 2 ? accent : "#ffffff14",
                boxShadow: i === 2 ? `0 0 8px ${accent}88` : undefined,
              }}
            />
          ))}
        </aside>

        {/* Canvas on a transparency checkerboard */}
        <div
          className="relative p-3"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #ffffff08 25%, transparent 25%, transparent 75%, #ffffff08 75%), linear-gradient(45deg, #ffffff08 25%, transparent 25%, transparent 75%, #ffffff08 75%)",
            backgroundSize: "10px 10px",
            backgroundPosition: "0 0, 5px 5px",
          }}
        >
          <div
            className="relative h-[96px] overflow-hidden rounded-[3px]"
            style={{ background: "linear-gradient(180deg, #1e1b3a, #3b1f4a 55%, #f59e7b)" }}
          >
            {/* Sun + hills */}
            <span
              className="absolute top-[26%] left-[58%] h-7 w-7 rounded-full"
              style={{ background: "radial-gradient(circle, #ffd29a, #ff8a65)" }}
            />
            <span
              className="absolute inset-x-0 bottom-0 h-[46%]"
              style={{
                background: "#111827",
                clipPath: "polygon(0 60%, 22% 20%, 40% 55%, 62% 10%, 82% 45%, 100% 25%, 100% 100%, 0 100%)",
              }}
            />
            {/* Selection with marching ants */}
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <rect
                x="50"
                y="14"
                width="30"
                height="42"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.8"
                strokeDasharray="3 2"
                vectorEffect="non-scaling-stroke"
                style={{ animation: "ants 0.8s linear infinite" }}
              />
            </svg>
          </div>

          {/* AI chip */}
          <span
            className="absolute right-4 bottom-1.5 flex items-center gap-1 rounded-full border px-1.5 py-[2px] font-mono text-[6.5px]"
            style={{ borderColor: `${accent}66`, color: accent, background: "#0b0c11cc" }}
          >
            <span
              className="h-1 w-1 rounded-full"
              style={{ background: accent, animation: "pulse-dot 1.4s ease-in-out infinite" }}
            />
            AI · Remove background
          </span>
        </div>

        {/* Layers panel */}
        <aside className="space-y-1.5 border-l border-white/10 p-2">
          <p className="font-mono text-[6.5px] tracking-[0.16em] text-white/40 uppercase">Layers</p>
          {["Sun", "Hills", "Sky", "Adjust"].map((l, i) => (
            <div
              key={l}
              className="flex items-center gap-1 rounded-[3px] px-1 py-[3px]"
              style={i === 0 ? { background: `${accent}22`, boxShadow: `inset 1.5px 0 0 ${accent}` } : undefined}
            >
              <span className="h-2.5 w-2.5 rounded-[2px] bg-white/15" />
              <span className="font-mono text-[6.5px] text-white/55">{l}</span>
            </div>
          ))}
        </aside>
      </div>
    </AppWindow>
  );
}

/* ── 6. Generic fallback ────────────────────────────────── */

/**
 * Used by every product without a hand-drawn mockup. It is built from the
 * product's own data (name, icon, mark, category, first features), so it is an
 * identity card rather than a pretend screenshot of an interface.
 */
export function GenericMockup({ product }: { product: Product }) {
  const accent = product.accent;
  return (
    <AppWindow title={product.name} accent={accent}>
      <div className="grid grid-cols-[auto_1fr] items-center gap-5 p-6 sm:gap-7 sm:p-8">
        <div
          className="grid h-20 w-20 place-items-center rounded-2xl border sm:h-24 sm:w-24"
          style={{
            borderColor: `${accent}55`,
            background: `radial-gradient(circle at 30% 25%, ${accent}33, transparent 70%)`,
            animation: "float-y 6s ease-in-out infinite",
            color: accent,
          }}
        >
          <Icon name={product.icon} size={34} />
        </div>

        <div className="min-w-0">
          <p className="font-mono text-[9px] tracking-[0.22em] uppercase" style={{ color: accent }}>
            {product.mark}
          </p>
          <p className="mt-1.5 truncate font-mono text-[10px] tracking-[0.14em] text-ink-mute uppercase">
            {product.category}
          </p>
          <ul className="mt-4 space-y-2.5">
            {product.features.slice(0, 3).map((f, i) => (
              <li key={f.label} className="flex items-center gap-2.5">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: accent, opacity: f.planned ? 0.3 : 0.9 }}
                />
                <Bar w={["82%", "64%", "73%"][i]} o={f.planned ? 0.08 : 0.16} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppWindow>
  );
}

/* ── Registry ───────────────────────────────────────────── */

export function ProductMockup({ product }: { product: Product }) {
  const accent = product.accent;
  switch (product.mockup) {
    case "audio":
      return <AudioMockup accent={accent} />;
    case "recovery":
      return <RecoveryMockup accent={accent} />;
    case "disc":
      return <DiscMockup accent={accent} />;
    case "os":
      return <OSMockup accent={accent} />;
    case "pixel":
      return <PixelMockup accent={accent} />;
    default:
      return <GenericMockup product={product} />;
  }
}
