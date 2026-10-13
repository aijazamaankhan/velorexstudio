import type { ReactNode } from "react";
import { revealProps } from "@/lib/reveal";
import { Container } from "./Primitives";

/**
 * Inner-page opening. Shares the homepage's lighting language at a smaller
 * scale so navigating between pages feels like one continuous surface.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  accent = "#7c5cff",
  aside,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  accent?: string;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-40 pb-20 sm:pt-48 sm:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-[-30%] left-[10%] h-[60vh] w-[60vh] rounded-full opacity-40 blur-[110px]"
          style={{
            background: `radial-gradient(circle, ${accent}66, transparent 68%)`,
            animation: "aurora-a 24s ease-in-out infinite",
          }}
        />
        <div className="grid-texture absolute inset-0" />
      </div>

      <Container className="relative">
        <div className={aside ? "grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-end" : ""}>
          <div>
            <p
              className="eyebrow fade-up flex items-center gap-3"
              style={{ ["--d" as string]: "60ms" }}
            >
              <span
                aria-hidden
                className="h-1 w-1 rounded-full"
                style={{ background: accent, animation: "pulse-dot 3s ease-in-out infinite" }}
              />
              {eyebrow}
            </p>

            <h1
              className="display display-xl fade-up mt-7"
              style={{ ["--d" as string]: "140ms" }}
            >
              {title}
            </h1>

            {lede && (
              <p
                className="lede fade-up mt-8 max-w-xl"
                style={{ ["--d" as string]: "260ms" }}
              >
                {lede}
              </p>
            )}

            {children && (
              <div className="fade-up mt-10" style={{ ["--d" as string]: "360ms" }}>
                {children}
              </div>
            )}
          </div>

          {aside && (
            <div className="fade-up" style={{ ["--d" as string]: "440ms" }}>
              {aside}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

/** Key/value spec table used on product and studio pages. */
export function SpecList({
  items,
  accent,
}: {
  items: [string, ReactNode][];
  accent?: string;
}) {
  return (
    <dl className="divide-y divide-[var(--color-edge)] border-y border-[var(--color-edge)]">
      {items.map(([k, v], i) => (
        <div
          key={k}
          className="grid gap-1 py-4 sm:grid-cols-[150px_1fr] sm:gap-6"
          {...revealProps(i * 50)}
        >
          <dt className="font-mono text-[10px] tracking-[0.18em] text-ink-mute uppercase">
            {k}
          </dt>
          <dd className="text-[15px] text-ink-dim" style={accent ? { color: undefined } : undefined}>
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
}
