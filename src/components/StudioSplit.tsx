import Link from "next/link";
import { products, statusLabel } from "@/data/products";
import { IconTile } from "./Icons";
import { Lumen } from "./Interactive";
import { ArrowRight } from "./Primitives";
import { revealProps } from "@/lib/reveal";

/**
 * The two halves of the company, made visually distinct: our own products
 * (violet, dense, product-shaped) vs. client work (electric, structural).
 */
export function StudioSplit() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <SplitCard
        href="/products"
        accent="#7c5cff"
        eyebrow="01 · Our software"
        title="Our Products"
        body="Software designed, engineered and refined by Velorex."
        cta="Explore Products"
        cursorLabel="Explore"
        delay={0}
        art={<ProductsArt />}
      />
      <SplitCard
        href="/services"
        accent="#2ad4ff"
        eyebrow="02 · For clients"
        title="Client Work"
        body="Websites, applications and custom software built around real business needs."
        cta="Work With Us"
        cursorLabel="Hire us"
        delay={120}
        art={<ClientArt />}
      />
    </div>
  );
}

function SplitCard({
  href,
  accent,
  eyebrow,
  title,
  body,
  cta,
  art,
  delay,
  cursorLabel,
}: {
  cursorLabel: string;
  href: string;
  accent: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  art: React.ReactNode;
  delay: number;
}) {
  return (
    <Lumen as="article" accent={accent} className="panel group">
      <div {...revealProps(delay)}>
        <Link
          href={href}
          className="flex h-full flex-col justify-between gap-12 p-8 sm:p-12"
          data-cursor="label"
          data-cursor-label={cursorLabel}
        >
          <div className="relative">
            <p className="eyebrow" style={{ color: accent }}>
              {eyebrow}
            </p>
            <h3 className="display display-lg mt-6">{title}</h3>
            <p className="lede mt-5 max-w-sm">{body}</p>
          </div>

          <div className="relative">
            <div className="mb-10 h-[140px] sm:h-[180px]">{art}</div>
            <span
              className="lnk font-mono text-xs tracking-[0.12em] uppercase"
              style={{ color: accent }}
            >
              {cta}
              <ArrowRight />
            </span>
          </div>
        </Link>
      </div>
    </Lumen>
  );
}

/* Our products: the real product line-up as a fanned stack that spreads on hover */
function ProductsArt() {
  const stack = products.slice(0, 3);
  return (
    <div aria-hidden className="relative h-full w-full">
      {stack.map((p, i) => {
        const depth = stack.length - 1 - i; // 0 = front
        return (
          <div
            key={p.slug}
            className="absolute left-0 flex w-[78%] items-center gap-3 rounded-xl border bg-[var(--color-raise)] p-3 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)] transition-transform duration-700 [transition-timing-function:var(--ease-swift)] sm:w-[70%]"
            style={
              {
                top: `${i * 30}px`,
                zIndex: i + 1,
                borderColor: `${p.accent}40`,
                transform: `translateX(${i * 9}%)`,
                opacity: 1 - depth * 0.18,
                "--fan": `translateX(${i * 18}%) rotate(${(i - 1) * 2.5}deg)`,
              } as React.CSSProperties
            }
          >
            <IconTile name={p.icon} accent={p.accent} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-ink">{p.name}</p>
              <p className="font-mono text-[9px] tracking-[0.14em] text-ink-mute uppercase">
                {statusLabel[p.status]}
              </p>
            </div>
            <span
              className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: p.accent, animation: `pulse-dot ${2.4 + i * 0.4}s ease-in-out infinite` }}
            />
          </div>
        );
      })}
      <div
        className="absolute inset-x-8 bottom-0 h-16 blur-2xl"
        style={{ background: "radial-gradient(ellipse, #7c5cff44, transparent 70%)" }}
      />
    </div>
  );
}

/* Client work: a brief converging into a build */
function ClientArt() {
  return (
    <div aria-hidden className="relative h-full w-full">
      <svg viewBox="0 0 320 180" className="h-full w-full">
        <defs>
          <linearGradient id="cw-g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2ad4ff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#2ad4ff" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {[40, 70, 100, 130].map((y, i) => (
          <path
            key={y}
            d={`M 20 ${y} C 120 ${y}, 160 90, 260 90`}
            stroke="url(#cw-g)"
            strokeWidth="1.2"
            fill="none"
            className="draw-line"
            style={{
              ["--len" as string]: 320,
              transitionDelay: `${i * 110}ms`,
            }}
          />
        ))}
        {[40, 70, 100, 130].map((y) => (
          <circle key={y} cx="20" cy={y} r="2.4" fill="#2ad4ff" opacity="0.5" />
        ))}
        <rect
          x="256"
          y="70"
          width="44"
          height="40"
          rx="6"
          stroke="#2ad4ff"
          strokeOpacity="0.55"
          fill="#2ad4ff10"
        />
        <circle
          cx="278"
          cy="90"
          r="4"
          fill="#2ad4ff"
          style={{ animation: "pulse-dot 2.6s ease-in-out infinite", transformOrigin: "278px 90px" }}
        />
      </svg>
    </div>
  );
}
