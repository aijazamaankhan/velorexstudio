import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeader } from "@/components/Primitives";
import { CaseRow } from "@/components/WorkPreview";
import { clientWork, experiments } from "@/data/caseStudies";
import { revealProps } from "@/lib/reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work and experiments from Velorex Studio — the product engineering behind our own software.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const hasClients = clientWork.length > 0;

  return (
    <>
      <PageHero
        eyebrow={hasClients ? "Selected work" : "Selected experiments"}
        accent="#ff5c8a"
        title={
          hasClients ? (
            <>
              WORK
              <br />
              <span className="grad-text">WE&rsquo;VE SHIPPED.</span>
            </>
          ) : (
            <>
              WHAT WE&rsquo;VE
              <br />
              <span className="grad-text">BEEN BUILDING.</span>
            </>
          )
        }
        lede={
          hasClients
            ? "A selection of projects built with clients."
            : "We haven't published client case studies yet — so rather than invent a portfolio, here is our own product engineering. It's the most honest evidence of how we work."
        }
      />

      {/* Client work, when it exists */}
      {hasClients && (
        <Section className="!pt-4">
          <Container>
            <ul className="space-y-4">
              {clientWork.map((item, i) => (
                <CaseRow key={item.slug} item={item} index={i} />
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* Experiments */}
      <Section className={hasClients ? "" : "!pt-4"} tone={hasClients ? "base" : "void"}>
        <Container>
          {hasClients && (
            <SectionHeader
              eyebrow="Selected experiments"
              title="OUR OWN PRODUCT WORK."
              lede="The software we build for the Velorex ecosystem."
            />
          )}
          <ul className={`space-y-4 ${hasClients ? "mt-16" : ""}`}>
            {experiments.map((item, i) => (
              <CaseRow key={item.slug} item={item} index={i} />
            ))}
          </ul>
        </Container>
      </Section>

      {/* Honest empty-state note */}
      {!hasClients && (
        <Section tone="base" className="!py-20">
          <Container>
            <div
              className="panel mx-auto max-w-2xl border-dashed p-10 text-center"
              {...revealProps()}
            >
              <span
                aria-hidden
                className="mx-auto mb-6 block h-10 w-10 rounded-full border border-dashed border-violet/40"
                style={{ animation: "spin-slow 16s linear infinite" }}
              />
              <p className="eyebrow">Client case studies</p>
              <p className="lede mx-auto mt-5 max-w-md text-[15px]">
                As client projects ship and we have permission to publish them,
                they will appear here with the real challenge, approach and
                outcome — no invented metrics.
              </p>
            </div>
          </Container>
        </Section>
      )}

      <CTA
        eyebrow="Next project"
        lines={["YOURS COULD BE", "THE NEXT ONE."]}
        body="Tell us what you're imagining."
        primary={{ label: "Start a Project", href: "/contact" }}
        secondary={{ label: "See Services", href: "/services" }}
      />
    </>
  );
}
