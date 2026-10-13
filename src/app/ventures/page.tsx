import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { IconTile } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { Badge, Container, Rule, Section } from "@/components/Primitives";
import { Ventures } from "@/components/Ventures";
import { ventures } from "@/data/ventures";
import { revealProps } from "@/lib/reveal";

export const metadata: Metadata = {
  title: "Ventures",
  description: `Velorex Studio's ventures beyond software: ${ventures
    .map((v) => `${v.name} (${v.tagline.replace(/\.$/, "").toLowerCase()})`)
    .join(" and ")}.`,
  alternates: { canonical: "/ventures" },
};

/** Host shown on the "Visit …" button, e.g. "velorexmusic.com". */
const hostOf = (url: string) => new URL(url).host.replace(/^www\./, "");

export default function VenturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our ventures"
        title={
          <>
            ONLINE STORES &amp;
            <br />
            <span className="grad-text">LIFESTYLE BRANDS.</span>
          </>
        }
        lede="Beyond software, Velorex runs ventures of its own — a record store that is live today, and a handcrafted goods store on the way."
      />

      {/* Overview cards */}
      <Section className="!pt-4">
        <Container>
          <Ventures />
        </Container>
      </Section>

      {/* One deep-dive per venture, generated from data/ventures.ts */}
      {ventures.map((v, i) => (
        <div key={v.slug}>
          <Rule />
          <Section tone={i % 2 === 0 ? "base" : "void"} id={v.slug}>
            <Container>
              <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
                <div {...revealProps()}>
                  <div className="flex items-center gap-3">
                    <IconTile name={v.icon} accent={v.accent} size="md" />
                    <span
                      className="font-mono text-xs tracking-[0.2em] uppercase"
                      style={{ color: v.accent }}
                    >
                      Venture {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="display display-lg mt-6">{v.name}</h2>
                  <p className="statement mt-3 text-lg" style={{ color: v.accent }}>
                    {v.tagline}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge accent={v.accent} dot={Boolean(v.url)}>
                      {v.url ? "Live Store" : "Coming Soon"}
                    </Badge>
                    <Badge accent={v.accent} dot={false}>
                      {v.categories[0]}
                    </Badge>
                  </div>

                  {v.url && (
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="btn btn-ghost mt-8 inline-flex font-mono text-xs tracking-[0.14em] uppercase"
                      style={{ borderColor: `${v.accent}40`, color: v.accent }}
                    >
                      Visit {hostOf(v.url)} ↗
                    </a>
                  )}
                </div>

                <div className="space-y-8" {...revealProps(120)}>
                  <h3 className="display text-2xl">{v.headline}</h3>
                  <p className="lede text-[16px] leading-relaxed">{v.story}</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {v.highlights.map((item) => (
                      <div
                        key={item.title}
                        className="panel p-5"
                        style={{ borderColor: `${v.accent}25` }}
                      >
                        <h4 className="font-display text-[16px] font-bold text-ink">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-xs leading-relaxed text-ink-dim">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </Section>
        </div>
      ))}

      <CTA
        eyebrow="Get in touch"
        lines={["WANT TO PARTNER", "OR LEARN MORE?"]}
        body="Have a question about the stores or a partnership in mind? Send us a message."
        primary={{ label: "Contact Us", href: "/contact" }}
        secondary={{ label: "Explore Products", href: "/products" }}
      />
    </>
  );
}
