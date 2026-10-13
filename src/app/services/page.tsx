import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { IconTile } from "@/components/Icons";
import { Lumen } from "@/components/Interactive";
import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeader } from "@/components/Primitives";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { PipelineDiagram } from "@/components/ServicesSection";
import { TechnologyMarquee } from "@/components/TechnologyMarquee";
import { services } from "@/data/services";
import { revealProps } from "@/lib/reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, software development, AI and automation, product design, and cloud and backend engineering — built by Velorex Studio.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we build for clients"
        accent="#2ad4ff"
        title={
          <>
            HAVE AN IDEA?
            <br />
            <span className="grad-text">WE CAN BUILD IT.</span>
          </>
        }
        lede="From the first sketch to production, Velorex Studio helps businesses turn ideas into working digital products."
      />

      {/* Service detail blocks — asymmetric, not a card grid */}
      <Section className="!pt-4">
        <Container>
          <ul className="space-y-4">
            {services.map((s, i) => (
              <Lumen
                as="li"
                key={s.slug}
                accent={i % 2 === 0 ? "#7c5cff" : "#2ad4ff"}
                className="panel group"
              >
                <div
                  className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[auto_1fr_1.2fr] lg:gap-16"
                  {...revealProps(i * 70)}
                >
                  <span className="font-mono text-[11px] text-ink-mute">{s.index}</span>

                  <div>
                    <IconTile
                      name={s.icon}
                      accent={i % 2 === 0 ? "#7c5cff" : "#2ad4ff"}
                      size="lg"
                      className="mb-6"
                    />
                    <h2 className="display text-2xl sm:text-3xl lg:text-4xl">
                      {s.title}
                    </h2>
                    <p className="lede mt-4 max-w-sm text-[15px] lg:hidden">
                      {s.summary}
                    </p>
                  </div>

                  <div>
                    <p className="lede hidden max-w-xl text-[15px] lg:block">
                      {s.summary}
                    </p>
                    <ul className="mt-0 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:mt-7">
                      {s.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 border-b border-[var(--color-edge)] py-2.5 text-[14px] text-ink-dim transition-colors duration-300 group-hover:text-ink"
                        >
                          <span
                            aria-hidden
                            className="h-1 w-1 shrink-0 rounded-full"
                            style={{ background: i % 2 === 0 ? "#7c5cff" : "#2ad4ff" }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Lumen>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Lifecycle */}
      <Section tone="base">
        <Container>
          <SectionHeader
            eyebrow="The route"
            title="HOW AN IDEA BECOMES A PRODUCT."
            align="center"
          />
          <div className="mt-20">
            <PipelineDiagram />
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section>
        <Container>
          <SectionHeader eyebrow="How we work" title="FROM IDEA TO PRODUCT." align="center" />
          <ProcessTimeline />
        </Container>
      </Section>

      {/* Technology */}
      <Section tone="base">
        <Container>
          <SectionHeader
            eyebrow="Technology"
            title="WHAT WE BUILD WITH."
            lede="Only what we genuinely use, grouped by where it runs."
          />
        </Container>
        <div className="mt-16" {...revealProps()}>
          <TechnologyMarquee />
        </div>
      </Section>

      <CTA
        eyebrow="Start here"
        lines={["TELL US WHAT", "YOU'RE BUILDING."]}
        body="Send over the idea — however rough it is."
        primary={{ label: "Start a Project", href: "/contact" }}
        secondary={{ label: "See Our Work", href: "/work" }}
      />
    </>
  );
}
