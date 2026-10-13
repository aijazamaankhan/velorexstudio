import Link from "next/link";
import { ArrowRight, Container } from "@/components/Primitives";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[80svh] place-items-center overflow-hidden pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-[10%] left-1/2 h-[55vh] w-[55vh] -translate-x-1/2 rounded-full opacity-40 blur-[110px]"
          style={{
            background: "radial-gradient(circle, rgba(124,92,255,0.45), transparent 70%)",
            animation: "aurora-a 24s ease-in-out infinite",
          }}
        />
        <div className="grid-texture absolute inset-0" />
      </div>

      <Container className="relative text-center">
        <p className="eyebrow fade-up" style={{ ["--d" as string]: "60ms" }}>
          Error 404
        </p>

        <h1
          className="display display-xl fade-up mt-8"
          style={{ ["--d" as string]: "140ms" }}
        >
          THIS PAGE
          <br />
          <span className="grad-text">DOESN&rsquo;T EXIST.</span>
        </h1>

        <p
          className="lede fade-up mx-auto mt-8 max-w-sm"
          style={{ ["--d" as string]: "260ms" }}
        >
          The link is broken or the page has moved. Everything else is still
          where you left it.
        </p>

        <div
          className="fade-up mt-12 flex flex-wrap items-center justify-center gap-3"
          style={{ ["--d" as string]: "360ms" }}
        >
          <Link href="/" className="btn btn-primary">
            Back to home
            <ArrowRight />
          </Link>
          <Link href="/products" className="btn btn-ghost">
            Explore products
            <ArrowRight />
          </Link>
        </div>
      </Container>
    </section>
  );
}
