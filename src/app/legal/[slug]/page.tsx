import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/Primitives";
import { site } from "@/data/site";
import { revealProps } from "@/lib/reveal";

/**
 * Legal pages.
 *
 * ⚠️ These are STRUCTURED PLACEHOLDERS, not legal advice and not a finished
 * policy. Each section states plainly that it needs completing, so the site
 * never publishes a policy that misrepresents what Velorex actually does with
 * data. Replace the `sections` content with reviewed copy before launch.
 */

type Doc = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

const DOCS: Doc[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    eyebrow: "Legal",
    intro:
      "How Velorex Studio handles information collected through this website.",
    sections: [
      {
        heading: "What this page needs",
        body: "This is a placeholder. A complete privacy policy must describe the personal data actually collected, the legal basis for processing it, how long it is kept, who it is shared with, and how to request deletion — reviewed against the regulations that apply where Velorex operates and where its visitors are.",
      },
      {
        heading: "Information collected through this site",
        body: "The contact form collects the name, email address, company, project type, budget range, timeline and message that a visitor chooses to submit, for the sole purpose of replying to the enquiry. If message delivery has not been configured on this deployment, the form does not transmit or store anything.",
      },
      {
        heading: "Analytics and cookies",
        body: "No analytics or tracking scripts are included in this website as built. If any are added later, this section must be updated to name them and describe what they collect.",
      },
      {
        heading: "Contact",
        body: "Questions about this policy can be sent to the studio using the contact details on this site.",
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    eyebrow: "Legal",
    intro: "The terms under which this website is made available.",
    sections: [
      {
        heading: "What this page needs",
        body: "This is a placeholder. Complete terms should cover acceptable use of the site, intellectual property in the content and software, the licence attached to any downloadable installers, disclaimers of warranty, limitation of liability and the governing jurisdiction — all reviewed by a qualified adviser.",
      },
      {
        heading: "Content and trademarks",
        body: "The content, design and source code of this website are the property of Velorex Design IT Services unless stated otherwise.",
      },
      {
        heading: "Software downloads",
        body: "Any software offered for download from this site is provided under the licence that accompanies it. Velorex products under development are provided without warranty of any kind. Data recovery outcomes in particular depend on the condition of the storage media and cannot be guaranteed.",
      },
      {
        heading: "Changes",
        body: "These terms may be updated. Continued use of the site after a change constitutes acceptance of the revised terms.",
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    eyebrow: "Legal",
    intro: "How this website uses cookies and similar storage.",
    sections: [
      {
        heading: "Current position",
        body: "This website as built does not set advertising or analytics cookies. If a theme preference is stored, it is kept in the browser's own local storage on the visitor's device and is never transmitted to Velorex or to any third party.",
      },
      {
        heading: "What this page needs",
        body: "This is a placeholder. If cookies, analytics, embedded media or third-party scripts are introduced, this page must list each one, state its purpose and lifespan, and explain how to withdraw consent — alongside a consent mechanism where the applicable law requires one.",
      },
      {
        heading: "Contact",
        body: "Questions about cookies can be sent to the studio using the contact details on this site.",
      },
    ],
  },
];

export function generateStaticParams() {
  return DOCS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = DOCS.find((d) => d.slug === slug);
  if (!doc) return { title: "Not found" };
  return {
    title: doc.title,
    description: doc.intro,
    alternates: { canonical: `/legal/${doc.slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = DOCS.find((d) => d.slug === slug);
  if (!doc) notFound();

  return (
    <>
      <PageHero
        eyebrow={doc.eyebrow}
        accent="#2ad4ff"
        title={doc.title}
        lede={doc.intro}
      />

      <Section className="!pt-4">
        <Container>
          <div className="max-w-2xl">
            <div
              className="mb-12 rounded-xl border border-dashed border-[var(--color-edge)] p-5"
              {...revealProps()}
            >
              <p className="font-mono text-[10px] tracking-[0.18em] text-ink-mute uppercase">
                Placeholder — requires review
              </p>
              <p className="mt-2.5 text-[13px] leading-relaxed text-ink-dim">
                This document is a structured starting point provided with the
                website, not reviewed legal copy. {site.legalName} should have it
                completed and checked before launch.
              </p>
            </div>

            <div className="space-y-12">
              {doc.sections.map((s, i) => (
                <section key={s.heading} {...revealProps(i * 60)}>
                  <h2 className="display text-xl sm:text-2xl">{s.heading}</h2>
                  <p className="lede mt-4 text-[15px]">{s.body}</p>
                </section>
              ))}
            </div>

            <p className="mt-16 font-mono text-[10px] tracking-[0.16em] text-ink-mute uppercase">
              Last updated — pending publication
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
