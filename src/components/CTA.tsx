import { Magnetic } from "./Interactive";
import { ArrowRight, Container } from "./Primitives";
import { revealProps } from "@/lib/reveal";

/** The closing section — sized and lit like the end of a product launch. */
export function CTA({
  eyebrow = "Start here",
  lines = ["HAVE SOMETHING", "WORTH BUILDING?"],
  body = "Tell us what you're imagining.",
  primary = { label: "Start a Project", href: "/contact" },
  secondary = { label: "Explore Products", href: "/products" },
}: {
  eyebrow?: string;
  lines?: string[];
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-void py-32 sm:py-44">
      {/* Lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute bottom-[-40%] left-1/2 h-[80vh] w-[110vw] -translate-x-1/2 rounded-full opacity-50 blur-[120px]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(124,92,255,0.4), rgba(42,212,255,0.14) 45%, transparent 70%)",
            animation: "aurora-a 24s ease-in-out infinite",
          }}
        />
        <div className="grid-texture absolute inset-0 opacity-70" />
      </div>

      <Container className="relative text-center">
        <p className="eyebrow" {...revealProps()}>
          {eyebrow}
        </p>

        <h2 className="display display-xl mt-8">
          {lines.map((line, i) => (
            <span key={line} className="block" {...revealProps(80 + i * 90)}>
              {i === lines.length - 1 ? <span className="grad-text">{line}</span> : line}
            </span>
          ))}
        </h2>

        <p className="lede mx-auto mt-8 max-w-md" {...revealProps(280)}>
          {body}
        </p>

        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
          {...revealProps(360)}
        >
          <Magnetic href={primary.href} className="btn btn-primary !px-8 !py-4">
            {primary.label}
            <ArrowRight />
          </Magnetic>
          <Magnetic href={secondary.href} className="btn btn-ghost !px-8 !py-4">
            {secondary.label}
            <ArrowRight />
          </Magnetic>
        </div>
      </Container>
    </section>
  );
}
