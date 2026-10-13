import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/data/site";
import { revealProps } from "@/lib/reveal";

/* ── Layout ─────────────────────────────────────────────── */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
  tone = "void",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "void" | "base";
}) {
  return (
    <section
      id={id}
      className={`relative py-24 sm:py-32 lg:py-40 ${
        tone === "base" ? "bg-base" : "bg-void"
      } ${className}`}
    >
      {children}
    </section>
  );
}

/** Hairline rule with a soft gradient centre — used between sections. */
export function Rule({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-px w-full bg-[linear-gradient(90deg,transparent,var(--color-edge)_15%,var(--color-edge)_85%,transparent)] ${className}`}
    />
  );
}

/* ── Section heading ────────────────────────────────────── */

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  size = "lg",
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  size?: "lg" | "xl";
  action?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-8 ${
        centered ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between"
      }`}
    >
      <div className={`${centered ? "max-w-3xl" : "max-w-3xl"}`}>
        {eyebrow && (
          <p className="eyebrow mb-6 flex items-center gap-3" {...revealProps()}>
            <span
              aria-hidden
              className="inline-block h-1 w-1 rounded-full bg-violet"
              style={{ animation: "pulse-dot 3s ease-in-out infinite" }}
            />
            {eyebrow}
          </p>
        )}
        <h2
          className={`display ${size === "xl" ? "display-xl" : "display-lg"}`}
          {...revealProps(60)}
        >
          {title}
        </h2>
        {lede && (
          <p className={`lede mt-7 ${centered ? "mx-auto" : ""} max-w-2xl`} {...revealProps(140)}>
            {lede}
          </p>
        )}
      </div>
      {action && (
        <div className="shrink-0" {...revealProps(200)}>
          {action}
        </div>
      )}
    </div>
  );
}

/* ── Badges ─────────────────────────────────────────────── */

export function Badge({
  children,
  accent,
  dot = true,
}: {
  children: ReactNode;
  accent?: string;
  dot?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.18em] uppercase"
      style={{
        borderColor: accent ? `${accent}44` : "var(--color-edge)",
        color: accent ?? "var(--color-ink-dim)",
        background: accent ? `${accent}0f` : "transparent",
      }}
    >
      {dot && (
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: accent ?? "currentColor",
            animation: "pulse-dot 2.4s ease-in-out infinite",
          }}
        />
      )}
      {children}
    </span>
  );
}

/* ── Links / buttons ────────────────────────────────────── */

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`arr ${className}`}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
    >
      <path
        d="M1 7h11M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`arr-down ${className}`}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
    >
      <path
        d="M7 1v11M3 8l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`lnk font-mono text-xs tracking-[0.12em] uppercase ${className}`}>
      {children}
      <ArrowRight />
    </Link>
  );
}

/* ── Sample tag: marks dummy data while site.showSampleLabels is on ── */

export function SampleTag({ show }: { show?: boolean }) {
  if (!show || !site.showSampleLabels) return null;
  return (
    <span
      title="Placeholder content — replace before launch"
      className="inline-flex items-center rounded-full border border-dashed border-[var(--color-edge)] px-2 py-0.5 font-mono text-[8.5px] tracking-[0.18em] text-ink-mute uppercase"
    >
      Sample
    </span>
  );
}
