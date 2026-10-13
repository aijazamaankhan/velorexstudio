import Link from "next/link";
import { footerNav } from "@/data/navigation";
import { site } from "@/data/site";
import { Container, Rule } from "./Primitives";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-base">
      <Rule />
      <Container className="relative py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand */}
          <div>
            <p className="display text-2xl tracking-[0.1em] uppercase">
              Velorex Studio
            </p>
            <p className="mt-4 font-mono text-[11px] tracking-[0.2em] text-ink-mute uppercase">
              Design · Engineering · Products
            </p>
            <p className="lede mt-6 max-w-sm text-[15px]">{site.tagline}</p>

            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="lnk mt-8 inline-flex font-mono text-xs tracking-[0.12em] text-ink"
              >
                {site.email}
              </a>
            )}

            {/* Entries without a real URL are hidden rather than linked nowhere */}
            {site.socials.some((s) => s.href) && (
              <ul className="mt-8 flex gap-5">
                {site.socials.filter((s) => s.href).map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="lnk font-mono text-[11px] tracking-[0.16em] text-ink-dim uppercase"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 xl:grid-cols-5">
            {footerNav.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h2 className="eyebrow mb-5">{col.heading}</h2>
                <ul className="space-y-3">
                  {col.links.map((l) => {
                    const isExternal = l.href.startsWith("http");
                    return (
                      <li key={l.href + l.label}>
                        {isExternal ? (
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-sm text-ink-dim transition-colors duration-300 hover:text-ink"
                          >
                            {l.label} ↗
                          </a>
                        ) : (
                          <Link
                            href={l.href}
                            className="text-sm text-ink-dim transition-colors duration-300 hover:text-ink"
                          >
                            {l.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-[var(--color-edge)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] tracking-[0.16em] text-ink-mute uppercase">
            © {year} {site.legalName} · All rights reserved
          </p>
          <p className="font-mono text-[10px] tracking-[0.16em] text-ink-mute uppercase">
            Designed &amp; Developed by {site.name} ({site.legalName})
          </p>
        </div>
      </Container>

      {/* Oversized watermark */}
      <div
        aria-hidden
        className="pointer-events-none relative -mb-[3vw] select-none overflow-hidden"
      >
        <p className="display whitespace-nowrap text-center text-[19vw] leading-[0.8] text-[color-mix(in_oklab,var(--color-ink)_3%,transparent)]">
          VELOREX
        </p>
      </div>
    </footer>
  );
}
