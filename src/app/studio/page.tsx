import type { Metadata } from "next";
import { Constellation } from "@/components/Constellation";
import { IconTile, type IconName } from "@/components/Icons";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { Container, Rule, Section, SectionHeader, TextLink } from "@/components/Primitives";
import { Principles } from "@/components/ProcessTimeline";
import { Team } from "@/components/Team";
import { TechnologyMarquee } from "@/components/TechnologyMarquee";
import { site } from "@/data/site";
import { revealProps } from "@/lib/reveal";
import { Ventures } from "@/components/Ventures";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Velorex Studio is a product and technology studio — how we think about software, engineering and what we're building next.",
  alternates: { canonical: "/studio" },
};

export default function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow="The studio"
        title={
          <>
            A STUDIO THAT
            <br />
            <span className="grad-text">BUILDS ITS OWN.</span>
          </>
        }
        lede={`${site.name} is a product and technology studio. We design and engineer software for our own ecosystem — and bring the same standards to the work we do for clients.`}
      />

      {/* Story */}
      <Section className="!pt-4">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div {...revealProps()}>
              <p className="eyebrow">Why we exist</p>
            </div>

            <div className="space-y-8">
              <p className="statement max-w-xl" {...revealProps(80)}>
                Most software is built to be sold. We&rsquo;re more interested in
                software that is built to be used.
              </p>

              <div className="lede space-y-6" {...revealProps(160)}>
                <p>
                  Velorex Studio started from a simple frustration: the tools we
                  wanted didn&rsquo;t quite exist. Media players that treat a real
                  library seriously. Recovery software that explains what it is
                  doing to your drive instead of hiding it behind a progress bar.
                  Writing tools that get out of the way.
                </p>
                <p>
                  So we build them. Our products are native where native matters —
                  compiled C++ talking directly to playback engines and raw disk
                  structures, not a browser wrapped in a window. That choice costs
                  us development time and buys our users speed, control and
                  honesty about what the software actually does.
                </p>
                <p>
                  The same thinking goes into client work. We don&rsquo;t ship
                  templates. We work out what a product needs to be, design it
                  properly, and engineer it so that it survives contact with the
                  real world — and with the developer who inherits it.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Rule />

      {/* How we think */}
      <Section tone="base">
        <Container>
          <SectionHeader
            eyebrow="How we think"
            title="THE POSITIONS WE WORK FROM."
            lede="Not claims about being the best — the actual principles behind the decisions."
          />
          <Principles />
        </Container>
      </Section>

      {/* Practice */}
      <Section>
        <Container>
          <SectionHeader eyebrow="The practice" title="FOUR THINGS WE DO." />

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-edge)] bg-[var(--color-edge)] sm:grid-cols-2">
            {[
              {
                icon: "compass" as IconName,
                t: "Product philosophy",
                b: "We start from the problem and the person, not the feature list. What should exist, and why — before a line of code.",
              },
              {
                icon: "code" as IconName,
                t: "Engineering",
                b: "Clean architecture, readable code and maintainable systems. We write software that can still be changed a year from now.",
              },
              {
                icon: "layers" as IconName,
                t: "Design",
                b: "Interface, motion and hierarchy treated as part of the engineering, not decoration applied afterwards.",
              },
              {
                icon: "flask" as IconName,
                t: "Experimentation",
                b: "We prototype constantly. Some of it becomes product; the rest teaches us what not to build.",
              },
            ].map((x, i) => (
              <div key={x.t} className="group bg-void p-8 sm:p-10" {...revealProps(i * 70)}>
                <div className="flex items-start justify-between">
                  <IconTile name={x.icon} accent={i % 2 === 0 ? "#7c5cff" : "#2ad4ff"} />
                  <span className="font-mono text-[10px] text-ink-mute">0{i + 1}</span>
                </div>
                <h3 className="display mt-5 text-xl sm:text-2xl">{x.t}</h3>
                <p className="lede mt-3 text-[15px]">{x.b}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section tone="base" id="team">
        <Container>
          <SectionHeader
            eyebrow="Our team"
            title="THE PEOPLE BEHIND IT."
            lede="Small on purpose. The people who design the products are the people who build them."
            action={<TextLink href="/team">Meet the team</TextLink>}
          />
          <div className="mt-16">
            <Team />
          </div>
        </Container>
      </Section>

      {/* Future vision */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Where this goes"
            title={<>AN EXPANDING ECOSYSTEM.</>}
            lede="Every product we build shares the same foundations — so the ecosystem compounds rather than fragments."
          />
          <div className="mt-16 panel p-4 sm:p-10" {...revealProps()}>
            <Constellation />
          </div>
        </Container>
      </Section>

      {/* Other ventures */}
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

      {/* Technology */}
      <Section>
        <Container>
          <SectionHeader eyebrow="Technology" title="WHAT WE BUILD WITH." />
        </Container>
        <div className="mt-16" {...revealProps()}>
          <TechnologyMarquee />
        </div>
      </Section>

      <CTA
        eyebrow="Get in touch"
        lines={["LET'S BUILD", "SOMETHING GOOD."]}
        body="Products, client work, or just a conversation."
        primary={{ label: "Start a Project", href: "/contact" }}
        secondary={{ label: "Explore Products", href: "/products" }}
      />
    </>
  );
}
