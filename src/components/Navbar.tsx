"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { primaryNav } from "@/data/navigation";
import { ArrowRight } from "./Primitives";
import { ScrambleText } from "./ScrambleText";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [studioMode, setStudioMode] = useState(false);
  const clicks = useRef(0);
  const clickTimer = useRef<number>(0);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Compact + translucent after the first scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the drawer on navigation */
  useEffect(() => setOpen(false), [pathname]);

  /* Drawer: lock scroll, trap focus, close on Escape */
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    drawerRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Easter egg: five taps on the wordmark lights up studio mode */
  const onLogoClick = useCallback(() => {
    clicks.current += 1;
    window.clearTimeout(clickTimer.current);
    clickTimer.current = window.setTimeout(() => {
      clicks.current = 0;
    }, 900);

    if (clicks.current >= 5) {
      clicks.current = 0;
      setStudioMode(true);
      window.setTimeout(() => setStudioMode(false), 2600);
    }
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[120] transition-all duration-500 [transition-timing-function:var(--ease-swift)] ${
          scrolled
            ? "border-b border-[var(--color-edge)] bg-[color-mix(in_oklab,var(--color-void)_72%,transparent)] backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 transition-all duration-500 [transition-timing-function:var(--ease-swift)] sm:px-8 lg:px-12 ${
            scrolled ? "h-16" : "h-20 sm:h-24"
          }`}
        >
          {/* Wordmark */}
          <Link
            href="/"
            onClick={onLogoClick}
            aria-label="Velorex Studio — home"
            className="group flex items-center gap-3"
          >
            <Mark active={studioMode} />
            <span className="flex items-baseline gap-2">
              <span className="font-display text-[15px] font-bold tracking-[0.16em] uppercase">
                Velorex
              </span>
              <span className="hidden font-mono text-[10px] tracking-[0.22em] text-ink-mute uppercase transition-colors duration-300 group-hover:text-ink-dim sm:inline">
                Studio
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex xl:gap-10"
          >
            {primaryNav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                active={pathname.startsWith(item.href)}
              />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="btn btn-ghost hidden !px-5 !py-2.5 !text-[11px] sm:inline-flex"
            >
              Contact
              <ArrowRight />
            </Link>

            {/* Drawer toggle */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-[var(--color-edge)] bg-white/[0.03] transition-colors duration-300 hover:bg-white/[0.07] lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className="absolute left-0 block h-px w-full bg-ink transition-all duration-400 [transition-timing-function:var(--ease-swift)]"
                  style={{
                    top: open ? "50%" : "2px",
                    transform: open ? "rotate(45deg)" : "none",
                  }}
                />
                <span
                  className="absolute left-0 block h-px w-full bg-ink transition-all duration-400 [transition-timing-function:var(--ease-swift)]"
                  style={{
                    bottom: open ? "auto" : "2px",
                    top: open ? "50%" : "auto",
                    transform: open ? "rotate(-45deg)" : "none",
                  }}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Scroll progress hairline */}
        <ScrollProgress />
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-[110] flex flex-col bg-[color-mix(in_oklab,var(--color-void)_96%,transparent)] backdrop-blur-2xl lg:hidden"
      >
        <div className="grid-texture pointer-events-none absolute inset-0 opacity-50" />
        <nav
          aria-label="Mobile"
          className="relative mt-28 flex flex-1 flex-col justify-center gap-2 px-8"
        >
          {[...primaryNav, { label: "Contact", href: "/contact" }].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="drawer-item group flex items-baseline justify-between border-b border-[var(--color-edge)] py-5"
              style={{ ["--d" as string]: `${80 + i * 70}ms` }}
            >
              <span className="display display-md">{item.label}</span>
              <span className="font-mono text-[10px] text-ink-mute">
                0{i + 1}
              </span>
            </Link>
          ))}
        </nav>
        <div
          className="drawer-item relative px-8 pb-12"
          style={{ ["--d" as string]: "460ms" }}
        >
          <p className="eyebrow">Designed &amp; Developed by Velorex Studio (Velorex Design IT Services)</p>
        </div>
      </div>

      {/* Easter egg overlay */}
      {studioMode && <StudioMode />}
    </>
  );
}

/* ── Nav link with a decode-on-hover label ────────────────── */

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  const [trigger, setTrigger] = useState(0);
  const fire = () => setTrigger((n) => n + 1);
  return (
    <Link
      href={href}
      onMouseEnter={fire}
      onFocus={fire}
      className="nav-item font-mono text-[11px] tracking-[0.16em] uppercase"
      data-active={active}
      aria-current={active ? "page" : undefined}
    >
      <ScrambleText text={label} trigger={trigger} />
    </Link>
  );
}

/* ── The mark: a rotating aperture that locks on hover ────── */

function Mark({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className="relative grid h-8 w-8 place-items-center"
      style={active ? { animation: "spin-slow 1.3s linear infinite" } : undefined}
    >
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path
          d="M15 3 L25.4 21 H4.6 Z"
          stroke="url(#mark-grad)"
          strokeWidth="1.3"
          strokeLinejoin="round"
          className="origin-center transition-transform duration-700 [transition-timing-function:var(--ease-swift)] group-hover:rotate-180"
        />
        <circle
          cx="15"
          cy="15"
          r="2.4"
          fill="#9d85ff"
          className="transition-all duration-500 group-hover:fill-[#2ad4ff]"
        />
        <defs>
          <linearGradient id="mark-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c5cff" />
            <stop offset="100%" stopColor="#2ad4ff" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

/* ── Studio mode: brief, tasteful, then gone ──────────────── */

function StudioMode() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[130] grid place-items-center"
      style={{ animation: "fade-up 0.5s var(--ease-out-expo)" }}
    >
      <div className="absolute inset-0 bg-void/70 backdrop-blur-sm" />
      <div className="relative text-center">
        <div
          className="mx-auto mb-6 h-24 w-24 rounded-full border border-violet/40"
          style={{ animation: "spin-slow 2.4s linear infinite" }}
        >
          <div className="h-full w-full rounded-full border-t-2 border-electric" />
        </div>
        <p className="font-mono text-[10px] tracking-[0.42em] text-electric uppercase">
          Studio mode
        </p>
        <p className="mt-3 font-display text-2xl font-bold tracking-tight">
          Built by people who like building.
        </p>
      </div>
    </div>
  );
}

/* ── Scroll progress ──────────────────────────────────────── */

function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? doc.scrollTop / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
      <div
        ref={bar}
        className="h-full w-full origin-left bg-[linear-gradient(90deg,var(--color-violet),var(--color-electric))]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
