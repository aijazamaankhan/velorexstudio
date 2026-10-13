import Link from "next/link";
import { statusLabel, type Product } from "@/data/products";
import { Lumen, Tilt } from "./Interactive";
import { Icon, IconTile } from "./Icons";
import { ProductMockup } from "./mockups";
import { ArrowRight, Badge } from "./Primitives";

/**
 * A product card is a miniature launch: chrome-accurate mockup, accent
 * lighting that tracks the cursor, and a CTA that only promises what exists.
 */
export function ProductCard({
  product,
  width = "w-[86vw] sm:w-[520px] lg:w-[600px]",
}: {
  product: Product;
  width?: string;
}) {
  const shipping = product.status === "available";

  return (
    <Lumen
      as="article"
      accent={product.accent}
      className={`panel group ${width} overflow-hidden`}
    >
      <Link
        href={`/products/${product.slug}`}
        className="block focus-visible:outline-offset-[-3px]"
        data-cursor="label"
        data-cursor-label={shipping ? "View product" : "Explore"}
      >
        {/* Visual */}
        <div className="relative overflow-hidden px-6 pt-8 sm:px-10 sm:pt-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[130%] -translate-x-1/2 opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
            style={{
              background: `radial-gradient(ellipse at 50% 50%, ${product.accent}55, transparent 70%)`,
            }}
          />
          <Tilt className="relative transition-transform duration-700 group-hover:scale-[1.02]">
            <div className="relative overflow-hidden rounded-xl">
              <ProductMockup product={product} />
              <span aria-hidden className="shine" />
            </div>
          </Tilt>
        </div>

        {/* Meta */}
        <div className="relative p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge accent={product.accent}>{statusLabel[product.status]}</Badge>
            <span className="font-mono text-[10px] tracking-[0.2em] text-ink-mute uppercase">
              {product.category}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] text-ink-mute uppercase">
              <span aria-hidden className="h-3 w-px bg-[var(--color-edge)]" />
              {product.downloads.map((d) => (d.soon ? `${d.platform} soon` : d.platform)).join(" · ")}
            </span>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <IconTile name={product.icon} accent={product.accent} />
            <h3 className="display display-md">{product.name}</h3>
          </div>
          <p className="lede mt-4 max-w-md text-[15px]">{product.tagline}</p>

          {/* Feature chips — planned items are labelled, never implied */}
          <ul className="mt-7 flex flex-wrap gap-2">
            {product.features.slice(0, 5).map((f) => (
              <li
                key={f.label}
                className="flex items-center gap-1.5 rounded-full border border-[var(--color-edge)] px-3 py-1.5 text-[11px] text-ink-dim"
              >
                <Icon
                  name={f.icon}
                  size={13}
                  style={{ color: f.planned ? "var(--color-ink-mute)" : product.accent }}
                />
                {f.label}
                {f.planned && (
                  <span className="font-mono text-[8px] tracking-[0.14em] text-ink-mute uppercase">
                    Planned
                  </span>
                )}
              </li>
            ))}
            {product.features.length > 5 && (
              <li className="rounded-full border border-[var(--color-edge)] px-3 py-1.5 font-mono text-[10px] text-ink-mute">
                +{product.features.length - 5}
              </li>
            )}
          </ul>

          <span
            className="lnk mt-8 inline-flex font-mono text-xs tracking-[0.12em] uppercase"
            style={{ color: product.accent }}
          >
            Explore {product.shortName}
            <ArrowRight />
          </span>
        </div>
      </Link>
    </Lumen>
  );
}
