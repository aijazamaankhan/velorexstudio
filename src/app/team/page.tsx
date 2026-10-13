import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { IconTile, type IconName } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeader } from "@/components/Primitives";
import { ScrollWords } from "@/components/ScrollWords";
import { Team } from "@/components/Team";
import { VelocityBand } from "@/components/VelocityBand";
import { team } from "@/data/team";
import { revealProps } from "@/lib/reveal";

export const metadata: Metadata = pageMetadata({
  title: "Team",
  description:
    "The people behind Velorex Studio — the designers and engineers who build our products and client work.",
  alternates: { canonical: "/team" },
});

const WAYS: { icon: IconName; t: string; b: string }[] = [
  {
    icon: "build",
    t: "Makers, not managers",
    b: "The people who design a product are the people who build it. Nothing gets lost in a handoff.",
  },
  {
    icon: "users",
    t: "Small by choice",
    b: "A tight team moves faster and cares more. We bring in specialists when a project genuinely needs them.",
  },
  {
    icon: "cube",
    t: "Own products, real standards",
    b: "We ship our own software, so client work gets the same engineering we'd accept for ourselves.",
  },
];

export default function TeamPage() {
  const disciplines = Array.from(new Set(team.flatMap((m) => m.disciplines)));

  return (
    <>
      <PageHero
        eyebrow="Our team"
        title={
          <>
            THE PEOPLE
            <br />
            <span className="grad-text">BEHIND IT.</span>
          </>
        }
        lede="Designers and engineers building the Velorex ecosystem — and the products our clients rely on."
      />

      <Section className="!pt-4">
        <Container>
          <Team />
        </Container>
      </Section>

      <VelocityBand words={disciplines.map((d) => d.toUpperCase())} />

      {/* How the team works */}
      <Section tone="base">
        <Container>
          <SectionHeader eyebrow="How we work together" title="SMALL TEAM. FULL OWNERSHIP." />
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-edge)] bg-[var(--color-edge)] lg:grid-cols-3">
            {WAYS.map((w, i) => (
              <div key={w.t} className="group bg-base p-8 sm:p-10" {...revealProps(i * 80)}>
                <div className="flex items-start justify-between">
                  <IconTile name={w.icon} accent={i % 2 === 0 ? "#7c5cff" : "#2ad4ff"} />
                  <span className="font-mono text-[10px] text-ink-mute">0{i + 1}</span>
                </div>
                <h3 className="display mt-5 text-xl sm:text-2xl">{w.t}</h3>
                <p className="lede mt-3 text-[15px]">{w.b}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Statement */}
      <Section>
        <Container>
          <p className="display display-lg max-w-4xl !leading-[1.05]">
            <ScrollWords text="We'd rather build a few things properly than many things quickly." />
          </p>
        </Container>
      </Section>

      <CTA
        eyebrow="Work with the team"
        lines={["LET'S BUILD", "TOGETHER."]}
        body="Tell us what you're imagining."
        primary={{ label: "Start a Project", href: "/contact" }}
        secondary={{ label: "About the Studio", href: "/studio" }}
      />
    </>
  );
}
