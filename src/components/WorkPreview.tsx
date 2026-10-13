import Link from "next/link";
import { clientWork, experiments, type CaseStudy, type Experiment } from "@/data/caseStudies";
import { IconTile } from "./Icons";
import { Lumen } from "./Interactive";
import { ArrowRight, Container, SampleTag, SectionHeader } from "./Primitives";
import { revealProps } from "@/lib/reveal";

/**
 * Falls back honestly: with no client case studies on file, the section
 * becomes "Selected Experiments" and shows Velorex's own engineering instead
 * of inventing a portfolio.
 */
export function WorkPreview() {
  const hasClients = clientWork.length > 0;
  const items: (CaseStudy | Experiment)[] = hasClients ? clientWork : experiments;

  return (
    <Container>
      <SectionHeader
        eyebrow={hasClients ? "Selected work" : "Selected experiments"}
        title={hasClients ? "WORK WE'VE SHIPPED." : "WHAT WE'VE BEEN BUILDING."}
        lede={
          hasClients
            ? "A selection of projects built with clients."
            : "No client case studies are published yet. Until then, here is our own product engineering — the work this studio is actually made of."
        }
        action={
          <Link href="/work" className="lnk font-mono text-xs tracking-[0.12em] uppercase">
            {hasClients ? "All work" : "All experiments"}
            <ArrowRight />
          </Link>
        }
      />

      <ul className="mt-16 space-y-4">
        {items.slice(0, 3).map((item, i) => (
          <CaseRow key={item.slug} item={item} index={i} />
        ))}
      </ul>
    </Container>
  );
}

export function CaseRow({
  item,
  index,
}: {
  item: CaseStudy | Experiment;
  index: number;
}) {
  const meta = "industry" in item ? item.industry : item.kind;
  const href = "href" in item && item.href ? item.href : undefined;

  const content = (
    <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
      <div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-ink-mute">
            0{index + 1}
          </span>
          <span
            className="h-1 w-1 rounded-full"
            style={{ background: item.accent }}
          />
          <span className="font-mono text-[10px] tracking-[0.18em] text-ink-mute uppercase">
            {meta}
          </span>
          <span className="ml-auto flex items-center gap-2.5 font-mono text-[10px] text-ink-mute">
            <SampleTag show={"sample" in item && item.sample} />
            {item.year}
          </span>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <IconTile name={item.icon} accent={item.accent} size="lg" />
          <h3 className="display text-2xl sm:text-3xl">{item.name}</h3>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {item.technology.map((t) => (
            <li
              key={t}
              className="rounded-full border border-[var(--color-edge)] px-2.5 py-1 font-mono text-[10px] text-ink-mute"
            >
              {t}
            </li>
          ))}
        </ul>

        {href && (
          <span
            className="lnk mt-8 inline-flex font-mono text-[11px] tracking-[0.12em] uppercase"
            style={{ color: item.accent }}
          >
            View product
            <ArrowRight />
          </span>
        )}
      </div>

      <dl className="space-y-6">
        <Field label="Challenge" value={item.challenge} />
        <Field label="Solution" value={item.solution} />
        {item.result && <Field label="Result" value={item.result} />}
      </dl>
    </div>
  );

  return (
    <Lumen as="li" accent={item.accent} className="panel group">
      <div {...revealProps(index * 90)}>
        {href ? (
          <Link href={href} data-cursor="label" data-cursor-label="View">
            {content}
          </Link>
        ) : (
          content
        )}
      </div>
    </Lumen>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[110px_1fr] sm:gap-6">
      <dt className="font-mono text-[10px] tracking-[0.18em] text-ink-mute uppercase">
        {label}
      </dt>
      <dd className="text-[15px] leading-relaxed text-ink-dim">{value}</dd>
    </div>
  );
}
