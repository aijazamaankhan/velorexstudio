import { Magnetic } from "./Interactive";
import { HeroField } from "./HeroField";
import { SignalFlow } from "./SignalFlow";
import { ArrowDown, ArrowRight, Container } from "./Primitives";

const LINES = ["WE BUILD", "DIGITAL PRODUCTS", "THAT MATTER."];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-32 pb-16 sm:pt-36">
      {/* Atmosphere: aurora lighting + node field + grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-1/3 left-[8%] h-[70vh] w-[70vh] rounded-full opacity-[0.55] blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgba(124,92,255,0.5), transparent 68%)",
            animation: "aurora-a 22s ease-in-out infinite",
          }}
        />
        <div
          className="absolute right-[4%] bottom-[-18%] h-[62vh] w-[62vh] rounded-full opacity-45 blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgba(42,212,255,0.4), transparent 68%)",
            animation: "aurora-b 26s ease-in-out infinite",
          }}
        />
        <div className="grid-texture absolute inset-0" />
        <div className="hero-spot absolute inset-0" />
      </div>

      {/* Node field sits above the blur, below the type */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <HeroField />
      </div>

      <Container className="hero-exit relative">
        {/* Eyebrow */}
        <div
          className="fade-up flex items-center gap-3"
          style={{ ["--d" as string]: "80ms" }}
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-violet"
            style={{ animation: "pulse-dot 2.8s ease-in-out infinite" }}
          />
          <p className="eyebrow">Velorex Studio</p>
          <span aria-hidden className="h-px w-12 bg-[var(--color-edge)] sm:w-20" />
          <p className="eyebrow hidden sm:block">Velorex Design IT Services</p>
        </div>

        {/* Headline */}
        <h1 className="display display-hero mt-8 sm:mt-10">
          <span className="sr-only">We build digital products that matter.</span>
          <span aria-hidden className="rise block">
            {LINES.map((line, i) => (
              <span
                key={line}
                className="block"
                style={{ ["--d" as string]: `${180 + i * 130}ms` }}
              >
                {i === 2 ? <span className="grad-text">{line}</span> : line}
              </span>
            ))}
          </span>
        </h1>

        {/* Supporting copy + CTAs */}
        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p
            className="lede fade-up max-w-md"
            style={{ ["--d" as string]: "620ms" }}
          >
            We design and engineer software, websites and digital experiences —
            for our own products and for ambitious clients.
          </p>

          <div
            className="fade-up flex flex-wrap items-center gap-3"
            style={{ ["--d" as string]: "740ms" }}
          >
            <Magnetic href="/products" className="btn btn-primary">
              Explore Products
              <ArrowRight />
            </Magnetic>
            <Magnetic href="/contact" className="btn btn-ghost">
              Build With Velorex
              <ArrowRight />
            </Magnetic>
          </div>
        </div>

        {/* Signature diagram */}
        <div
          className="fade-up edge-fade mt-16 sm:mt-20"
          style={{ ["--d" as string]: "880ms" }}
        >
          <SignalFlow className="opacity-90" />
        </div>
      </Container>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="fade-up pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
        style={{ ["--d" as string]: "1200ms" }}
      >
        <span
          className="flex items-center gap-2 font-mono text-[9px] tracking-[0.26em] text-ink-mute uppercase"
          style={{ animation: "float-y 3.4s ease-in-out infinite" }}
        >
          Scroll
          <ArrowDown className="opacity-60" />
        </span>
      </div>
    </section>
  );
}
