import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { CTA } from "@/components/CTA";
import { DownloadButton } from "@/components/Download";
import { FutureGrid } from "@/components/FutureGrid";
import { Lumen, Tilt } from "@/components/Interactive";
import { Icon, IconTile } from "@/components/Icons";
import { ProductMockup } from "@/components/mockups";
import { PageHero } from "@/components/PageHero";
import {
  ArrowRight,
  Badge,
  Container,
  Section,
  SectionHeader,
} from "@/components/Primitives";
import { products, statusLabel } from "@/data/products";
import { revealProps } from "@/lib/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "The Velorex software ecosystem — desktop apps, web platforms, AI tools and mobile apps, each listed with exactly where it stands, plus what we're building next.",
  alternates: { canonical: "/products" },
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="The ecosystem"
        title={
          <>
            SOFTWARE
            <br />
            <span className="grad-text">BY VELOREX.</span>
          </>
        }
        lede="Products we design, engineer and maintain ourselves. Each one is listed with exactly where it stands — nothing here claims to be finished before it is."
      />

      {/* Alternating full-width product blocks */}
      <Section className="!pt-4">
        <Container>
          <ul className="space-y-24 lg:space-y-36">
            {products.map((product, i) => {
              const flip = i % 2 === 1;
              return (
                <li key={product.slug}>
                  <div
                    className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                      flip ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* Visual */}
                    <Link
                      href={`/products/${product.slug}`}
                      className="relative block"
                      data-cursor="label"
                      data-cursor-label="View product"
                      {...revealProps()}
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -z-10 opacity-50 blur-3xl"
                        style={{
                          background: `radial-gradient(ellipse at 50% 40%, ${product.accent}55, transparent 68%)`,
                        }}
                      />
                      <div className="parallax">
                        <Tilt>
                          <div className="group relative overflow-hidden rounded-xl">
                            <ProductMockup product={product} />
                            <span aria-hidden className="shine" />
                          </div>
                        </Tilt>
                      </div>
                    </Link>

                    {/* Copy */}
                    <div {...revealProps(100)}>
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge accent={product.accent}>
                          {statusLabel[product.status]}
                        </Badge>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-ink-mute uppercase">
                          {product.category}
                        </span>
                      </div>

                      <div className="group mt-6 flex items-center gap-5">
                        <IconTile name={product.icon} accent={product.accent} size="lg" />
                        <h2 className="display display-lg">{product.name}</h2>
                      </div>
                      <p className="lede mt-5 max-w-lg">{product.tagline}</p>

                      <ul className="mt-8 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                        {product.features.slice(0, 6).map((f) => (
                          <li
                            key={f.label}
                            className="flex items-start gap-2.5 text-[14px] text-ink-dim"
                          >
                            <Icon
                              name={f.icon}
                              size={16}
                              className="mt-[1px] shrink-0"
                              style={{
                                color: f.planned
                                  ? "var(--color-ink-mute)"
                                  : product.accent,
                              }}
                            />
                            <span>
                              {f.label}
                              {f.planned && (
                                <span className="ml-2 font-mono text-[9px] tracking-[0.14em] text-ink-mute uppercase">
                                  Planned
                                </span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-10 flex flex-wrap items-center gap-3">
                        <Link
                          href={`/products/${product.slug}`}
                          className="btn btn-ghost"
                        >
                          Explore {product.shortName}
                          <ArrowRight />
                        </Link>
                        {product.downloads[0] && (
                          <DownloadButton
                            download={product.downloads[0]}
                            accent={product.accent}
                            variant="ghost"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* What's next */}
      <Section tone="base" id="future">
        <Container>
          <SectionHeader
            eyebrow="Coming next"
            title={<>AND WE&rsquo;RE JUST GETTING STARTED.</>}
            lede="Directions we're exploring. None of these exist as software yet."
          />
          <div className="mt-16">
            <FutureGrid />
          </div>
        </Container>
      </Section>

      <CTA
        eyebrow="Work with us"
        lines={["NEED SOMETHING", "LIKE THIS?"]}
        body="We build products for clients with the same standards we hold our own to."
        primary={{ label: "Start a Project", href: "/contact" }}
        secondary={{ label: "See Services", href: "/services" }}
      />
    </>
  );
}
