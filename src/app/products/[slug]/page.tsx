import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { DownloadButton, DownloadPanel } from "@/components/Download";
import { Lumen, Tilt } from "@/components/Interactive";
import { Icon, IconTile } from "@/components/Icons";
import { ProductMockup } from "@/components/mockups";
import { PageHero } from "@/components/PageHero";
import {
  ArrowRight,
  Badge,
  Container,
  Rule,
  Section,
  SectionHeader,
} from "@/components/Primitives";
import { getProduct, productSlugs, products, statusLabel } from "@/data/products";
import { revealProps } from "@/lib/reveal";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productSlugs();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };

  return pageMetadata({
    title: product.name,
    description: product.tagline,
    alternates: { canonical: `/products/${product.slug}` },
  });
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug);
  // First sentence leads as a statement; the rest reads as body copy.
  const [lead, ...restSentences] = product.description.split(/(?<=\.)\s+/);
  const rest = restSentences.join(" ");
  const shipped = product.features.filter((f) => !f.planned);
  const planned = product.features.filter((f) => f.planned);

  return (
    <>
      <PageHero
        eyebrow={`${product.category} · ${statusLabel[product.status]}`}
        accent={product.accent}
        title={product.name}
        lede={product.tagline}
        aside={
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-60 blur-3xl"
              style={{
                background: `radial-gradient(ellipse at 50% 40%, ${product.accent}66, transparent 68%)`,
              }}
            />
            <Tilt>
              <ProductMockup product={product} />
            </Tilt>
          </div>
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          {product.downloads.map((d, i) => (
            <DownloadButton
              key={d.platform}
              download={d}
              accent={product.accent}
              variant={i === 0 ? "primary" : "ghost"}
            />
          ))}
          <Link href="#features" className="btn btn-ghost">
            See features
            <ArrowRight />
          </Link>
        </div>
      </PageHero>

      {/* Overview */}
      <Section className="!pt-8" id="overview">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <div {...revealProps()}>
              <p className="eyebrow">Overview</p>
              <p className="statement mt-6 max-w-xl">{lead}</p>
              {rest && <p className="lede mt-6 max-w-xl">{rest}</p>}
            </div>

            <div {...revealProps(120)}>
              <p className="eyebrow mb-6">Built with</p>
              <ul className="flex flex-wrap gap-2">
                {product.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-[var(--color-edge)] px-3.5 py-2 font-mono text-[11px] text-ink-dim"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <dl className="mt-10 divide-y divide-[var(--color-edge)] border-y border-[var(--color-edge)]">
                {[
                  ["Category", product.category],
                  ["Status", statusLabel[product.status]],
                  ["Platform", product.downloads.map((d) => d.platform).join(", ")],
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-4 sm:grid-cols-[130px_1fr] sm:gap-6">
                    <dt className="font-mono text-[10px] tracking-[0.18em] text-ink-mute uppercase">
                      {k}
                    </dt>
                    <dd className="text-[15px] text-ink-dim">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features */}
      <Section tone="base" id="features">
        <Container>
          <SectionHeader
            eyebrow="Capabilities"
            title="WHAT IT DOES."
            lede={
              planned.length > 0
                ? "Shipping capabilities are listed first. Anything still on the roadmap is marked as planned — we don't blur the line."
                : undefined
            }
          />

          <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shipped.map((f, i) => (
              <Lumen
                as="li"
                key={f.label}
                accent={product.accent}
                className="panel group"
              >
                <div className="p-7" {...revealProps(i * 50)}>
                  <IconTile name={f.icon} accent={product.accent} className="mb-6" />
                  <p className="text-[15px] text-ink">{f.label}</p>
                </div>
              </Lumen>
            ))}
          </ul>

          {planned.length > 0 && (
            <div className="mt-12" {...revealProps()}>
              <p className="eyebrow mb-6">On the roadmap — not yet built</p>
              <ul className="flex flex-wrap gap-2">
                {planned.map((f) => (
                  <li
                    key={f.label}
                    className="flex items-center gap-2 rounded-full border border-dashed border-[var(--color-edge)] px-3.5 py-2 text-[13px] text-ink-mute"
                  >
                    <Icon name={f.icon} size={14} />
                    {f.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>

      {/* Download */}
      <Section id="download">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
            <div {...revealProps()}>
              <SectionHeader
                eyebrow="Availability"
                title={<>GET {product.shortName.toUpperCase()}.</>}
              />
            </div>
            <DownloadPanel product={product} />
          </div>
        </Container>
      </Section>

      <Rule />

      {/* Other products */}
      <Section tone="base">
        <Container>
          <SectionHeader eyebrow="More from the studio" title="OTHER PRODUCTS." />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2">
            {others.map((p, i) => (
              <Lumen as="li" key={p.slug} accent={p.accent} className="panel group">
                <Link
                  href={`/products/${p.slug}`}
                  className="block p-8 sm:p-10"
                  data-cursor="label"
                  data-cursor-label="View"
                  {...revealProps(i * 80)}
                >
                  <Badge accent={p.accent}>{statusLabel[p.status]}</Badge>
                  <div className="mt-6 flex items-center gap-4">
                    <IconTile name={p.icon} accent={p.accent} />
                    <h3 className="display text-2xl sm:text-3xl">{p.name}</h3>
                  </div>
                  <p className="lede mt-3 max-w-sm text-[15px]">{p.tagline}</p>
                  <span
                    className="lnk mt-8 inline-flex font-mono text-[11px] tracking-[0.12em] uppercase"
                    style={{ color: p.accent }}
                  >
                    Explore
                    <ArrowRight />
                  </span>
                </Link>
              </Lumen>
            ))}
          </ul>
        </Container>
      </Section>

      <CTA
        eyebrow="Build with us"
        lines={["WANT SOMETHING", "BUILT LIKE THIS?"]}
        body="We bring the same engineering to client work."
        primary={{ label: "Start a Project", href: "/contact" }}
        secondary={{ label: "All Products", href: "/products" }}
      />
    </>
  );
}
