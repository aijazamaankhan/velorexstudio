import { showTeam } from "@/data/team";
import { organizationSchema } from "@/data/seo";
import Link from "next/link";
import { Constellation } from "@/components/Constellation";
import { CTA } from "@/components/CTA";
import { FutureGrid } from "@/components/FutureGrid";
import { Hero } from "@/components/Hero";
import { Magnetic } from "@/components/Interactive";
import { Container, Section, SectionHeader, TextLink } from "@/components/Primitives";
import { Principles, ProcessTimeline } from "@/components/ProcessTimeline";
import { ProductShowcase } from "@/components/ProductShowcase";
import { revealProps } from "@/lib/reveal";
import { PipelineDiagram, ServiceList } from "@/components/ServicesSection";
import { StudioSplit } from "@/components/StudioSplit";
import { ScrollWords } from "@/components/ScrollWords";
import { Team } from "@/components/Team";
import { VelocityBand } from "@/components/VelocityBand";
import { TechnologyMarquee } from "@/components/TechnologyMarquee";
import { WorkPreview } from "@/components/WorkPreview";
import { ArrowRight } from "@/components/Primitives";
import { Ventures } from "@/components/Ventures";
import { products, type ProductStatus } from "@/data/products";

/** Product names for one status, straight from the registry. */
const namesWith = (...statuses: ProductStatus[]) =>
  products.filter((p) => statuses.includes(p.status)).map((p) => p.name);

export default function Home() {
  const shipping = namesWith("available", "beta");
  const building = namesWith("in-development");
  const planned = namesWith("planned");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }} />
      <Hero />

      <VelocityBand words={["DESIGN", "ENGINEERING", "PRODUCTS", "AI", "WEB", "SOFTWARE"]} />

      {/* ── 2. The studio ─────────────────────────────── */}
      <Section tone="base" id="studio">
        <Container>
          <SectionHeader
            eyebrow="The studio"
            title="NOT JUST AN IT COMPANY."
            lede="Velorex Studio is a product and technology studio creating software for our own ecosystem and for clients around the world."
          />
          <div className="mt-16">
            <StudioSplit />
          </div>
        </Container>
      </Section>

      {/* ── 3. Software universe ──────────────────────── */}
      <Section id="products">
        <Container>
          <SectionHeader
            eyebrow="Our software universe"
            title={<>SOFTWARE WE&rsquo;RE BUILDING.</>}
            lede="A growing collection of products designed to make digital life better."
            action={<TextLink href="/products">All products</TextLink>}
          />
        </Container>

        {/* Full-bleed rail */}
        <div className="mt-16">
          <ProductShowcase />
        </div>
      </Section>

      {/* ── Future products ───────────────────────────── */}
      <Section tone="base" id="future">
        <Container>
          <SectionHeader
            eyebrow="The ecosystem is expanding"
            title={<>AND WE&rsquo;RE JUST GETTING STARTED.</>}
            lede="Directions we are actively exploring. Nothing here has shipped — when it does, it will appear above."
          />
          <div className="mt-16">
            <FutureGrid />
          </div>
        </Container>
      </Section>

      {/* ── 4. Client services ────────────────────────── */}
      <Section id="services">
        <Container>
          <SectionHeader
            eyebrow="What we build for clients"
            size="xl"
            title={
              <>
                HAVE AN IDEA?
                <br />
                <span className="grad-text">WE CAN BUILD IT.</span>
              </>
            }
            lede="From the first sketch to production, Velorex Studio helps businesses turn ideas into working digital products."
            action={
              <Magnetic href="/services" className="btn btn-ghost">
                All services
                <ArrowRight />
              </Magnetic>
            }
          />

          <ServiceList />

          <div className="mt-24">
            <p className="eyebrow mb-10 text-center" {...revealProps()}>
              How an idea becomes a product
            </p>
            <PipelineDiagram />
          </div>
        </Container>
      </Section>

      {/* ── 5. Process ────────────────────────────────── */}
      <Section tone="base" id="process">
        <Container>
          <SectionHeader
            eyebrow="How we work"
            title="FROM IDEA TO PRODUCT."
            align="center"
          />
          <ProcessTimeline />
        </Container>
      </Section>

      {/* ── 6. Principles ─────────────────────────────── */}
      <Section id="principles">
        <Container>
          <SectionHeader
            eyebrow="Why Velorex"
            title="WHAT WE ACTUALLY BELIEVE."
            lede="Not claims about being the best — positions we design and engineer from."
          />
          <Principles />
        </Container>
      </Section>

      {/* ── 7. Selected work ──────────────────────────── */}
      <Section tone="base" id="work">
        <WorkPreview />
      </Section>

      {/* ── Team ──────────────────────────────────────── */}
      {showTeam && (
      <Section id="team">
        <Container>
          <SectionHeader
            eyebrow="Our team"
            title="THE PEOPLE BEHIND IT."
            lede="The people who design the products are the people who build them."
            action={<TextLink href="/team">Meet the team</TextLink>}
          />
          <div className="mt-16">
            <Team />
          </div>
        </Container>
      </Section>
      )}

      {/* ── Other ventures ───────────────────────────── */}
      <Section tone="base" id="ventures">
        <Container>
          <SectionHeader
            eyebrow="Other ventures"
            title={<>BEYOND SOFTWARE.</>}
            lede="Online stores and lifestyle products created and curated under the Velorex brand."
          />
          <div className="mt-16">
            <Ventures />
          </div>
        </Container>
      </Section>

      {/* ── 8. Technology ─────────────────────────────── */}
      <Section id="technology">
        <Container>
          <SectionHeader
            eyebrow="Technology"
            title="WHAT WE BUILD WITH."
            lede="Only what we genuinely use — grouped by where it is actually in production."
          />
        </Container>
        <div className="mt-16" {...revealProps()}>
          <TechnologyMarquee />
        </div>
      </Section>

      {/* ── 9. Philosophy ─────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-void py-36 sm:py-52">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute top-[10%] left-[-10%] h-[60vh] w-[60vh] rounded-full opacity-40 blur-[120px]"
            style={{
              background: "radial-gradient(circle, rgba(124,92,255,0.45), transparent 70%)",
              animation: "aurora-a 28s ease-in-out infinite",
            }}
          />
          <div
            className="absolute right-[-8%] bottom-[5%] h-[52vh] w-[52vh] rounded-full opacity-35 blur-[120px]"
            style={{
              background: "radial-gradient(circle, rgba(42,212,255,0.4), transparent 70%)",
              animation: "aurora-b 32s ease-in-out infinite",
            }}
          />
        </div>

        <Container className="relative">
          <p className="eyebrow" {...revealProps()}>
            Studio philosophy
          </p>
          <blockquote className="display display-xl mt-10 max-w-5xl">
            {["GOOD SOFTWARE", "SHOULD DISAPPEAR", "INTO THE EXPERIENCE."].map((l, i) => (
              <span key={l} className="block" {...revealProps(i * 110)}>
                {i === 2 ? (
                  <span className="grad-text">
                    <ScrollWords text={l} />
                  </span>
                ) : (
                  <ScrollWords text={l} />
                )}
              </span>
            ))}
          </blockquote>
          <p className="lede mt-12 max-w-xl" {...revealProps(380)}>
            <ScrollWords text="The best technology doesn’t make people think about the technology. It simply helps them accomplish something better." />
          </p>
        </Container>
      </section>

      {/* ── 10. The future ────────────────────────────── */}
      <Section tone="base" id="ecosystem">
        <Container>
          <SectionHeader
            eyebrow="The future"
            size="xl"
            title={
              <>
                THIS IS ONLY
                <br />
                <span className="grad-text">THE BEGINNING.</span>
              </>
            }
            lede="Velorex Studio is building an expanding ecosystem of software across productivity, media, data, AI and beyond."
          />

          <div className="mt-16 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
            <div className="panel p-4 sm:p-8" {...revealProps()}>
              <Constellation />
            </div>

            <div {...revealProps(140)}>
              <p className="lede max-w-sm">
                {building.length} products are in active development today. The dashed
                nodes are directions we haven&rsquo;t announced — they exist as
                direction, not yet as software.
              </p>
              <ul className="mt-10 space-y-4">
                {[
                  [
                    "Shipping",
                    shipping.length > 0
                      ? `${shipping.join(", ")}.`
                      : "Nothing yet — first releases are in progress.",
                  ],
                  ["In development", `${building.join(", ")}.`],
                  ...(planned.length > 0 ? [["Planned", `${planned.join(", ")}.`]] : []),
                  ["Exploring", "AI, cloud, security and developer tools."],
                ].map(([k, v]) => (
                  <li
                    key={k}
                    className="flex flex-col gap-1 border-b border-[var(--color-edge)] pb-4 sm:flex-row sm:justify-between sm:gap-6"
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-ink-mute uppercase">
                      {k}
                    </span>
                    <span className="text-sm text-ink-dim sm:text-right">{v}</span>
                  </li>
                ))}
              </ul>
              <Link href="/products" className="lnk mt-8 inline-flex font-mono text-xs tracking-[0.12em] uppercase">
                See the products
                <ArrowRight />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <VelocityBand reverse words={["IDEA", "RESEARCH", "DESIGN", "BUILD", "LAUNCH", "GROW"]} />

      {/* ── 11. Contact CTA ───────────────────────────── */}
      <CTA />
    </>
  );
}
