import { pageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { Container, Section } from "@/components/Primitives";
import { site } from "@/data/site";
import { isDeliveryConfigured } from "@/lib/contact";
import { revealProps } from "@/lib/reveal";

/* Read delivery env vars per request, not frozen at build time. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell Velorex Studio what you're imagining — websites, applications, desktop software, AI products and more.",
  alternates: { canonical: "/contact" },
});

export default function ContactPage() {
  const configured = isDeliveryConfigured();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            HAVE SOMETHING
            <br />
            <span className="grad-text">WORTH BUILDING?</span>
          </>
        }
        lede="Tell us what you're imagining. The rougher the idea, the more interesting the conversation."
      />

      <Section className="!pt-4">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
            {/* Side panel */}
            <div {...revealProps()}>
              <dl className="space-y-8">
                <div>
                  <dt className="eyebrow mb-3 flex items-center gap-2.5">
                    <Icon name="mail" size={15} className="text-violet" />
                    Email
                  </dt>
                  <dd>
                    {site.email ? (
                      <a
                        href={`mailto:${site.email}`}
                        className="lnk font-mono text-sm text-ink"
                      >
                        {site.email}
                      </a>
                    ) : (
                      <span className="text-sm text-ink-mute">
                        No public address configured yet.
                      </span>
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="eyebrow mb-3 flex items-center gap-2.5">
                    <Icon name="cube" size={15} className="text-violet" />
                    What we build
                  </dt>
                  <dd className="text-[15px] leading-relaxed text-ink-dim">
                    Websites, web applications, desktop software, AI products,
                    automation, cloud backends and product design.
                  </dd>
                </div>

                <div>
                  <dt className="eyebrow mb-3 flex items-center gap-2.5">
                    <Icon name="chat" size={15} className="text-violet" />
                    What happens next
                  </dt>
                  <dd>
                    <ol className="space-y-3">
                      {[
                        "We read it properly.",
                        "We reply with questions or a direction.",
                        "If it's a fit, we scope it together.",
                      ].map((s, i) => (
                        <li
                          key={s}
                          className="flex gap-3 text-[15px] text-ink-dim"
                        >
                          <span className="font-mono text-[10px] text-ink-mute">
                            0{i + 1}
                          </span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </dd>
                </div>

                <div>
                  <dt className="eyebrow mb-3 flex items-center gap-2.5">
                    <Icon name="building" size={15} className="text-violet" />
                    Studio
                  </dt>
                  <dd className="text-[15px] text-ink-dim">
                    {site.legalName}
                    {site.location && <> · {site.location}</>}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Form */}
            <div {...revealProps(120)}>
              <ContactForm deliveryConfigured={configured} email={site.email} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
