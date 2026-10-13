import { futureProducts } from "@/data/products";
import { IconTile } from "./Icons";
import { Lumen } from "./Interactive";
import { revealProps } from "@/lib/reveal";

/**
 * The expanding ecosystem. Deliberately unglamorous about status — every tile
 * says exactly how real it is, and none of them link anywhere, because there
 * is nothing to link to yet.
 */
export function FutureGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {futureProducts.map((p, i) => (
        <Lumen
          as="li"
          key={p.mark}
          accent="#7c5cff"
          className="panel group relative overflow-hidden"
        >
          <div className="relative p-7 sm:p-8" {...revealProps(i * 70)}>
            {/* Ghost mark */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-4 right-2 font-display text-[64px] font-bold text-white/[0.03] transition-all duration-700 [transition-timing-function:var(--ease-swift)] group-hover:text-white/[0.06]"
            >
              {p.mark}
            </span>

            <div className="relative flex items-center gap-2.5">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-violet/60"
                style={{ animation: `breathe ${3 + i * 0.4}s ease-in-out infinite` }}
              />
              <span className="font-mono text-[10px] tracking-[0.2em] text-ink-mute uppercase">
                {p.stage}
              </span>
            </div>

            <IconTile name={p.icon} className="relative mt-7" />

            <h3 className="mt-6 font-display text-xl font-bold tracking-tight">
              {p.title}
            </h3>
            <p className="mt-2.5 text-sm text-ink-dim">{p.blurb}</p>

            <div className="mt-8 h-px w-full bg-[var(--color-edge)]">
              <div
                className="h-full w-0 bg-[linear-gradient(90deg,var(--color-violet),transparent)] transition-[width] duration-700 [transition-timing-function:var(--ease-swift)] group-hover:w-full"
              />
            </div>
          </div>
        </Lumen>
      ))}

      {/* The honest last tile */}
      <li className="panel relative grid place-items-center border-dashed p-8">
        <div className="text-center" {...revealProps(futureProducts.length * 70)}>
          <span
            aria-hidden
            className="mx-auto mb-4 block h-8 w-8 rounded-full border border-dashed border-violet/40"
            style={{ animation: "spin-slow 14s linear infinite" }}
          />
          <p className="font-mono text-[10px] tracking-[0.2em] text-ink-mute uppercase">
            More to come
          </p>
        </div>
      </li>
    </ul>
  );
}
