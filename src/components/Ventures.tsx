import { ventures, type Venture } from "@/data/ventures";
import { IconTile } from "./Icons";
import { Lumen } from "./Interactive";
import { ArrowRight, Badge } from "./Primitives";
import { revealProps } from "@/lib/reveal";

export function Ventures() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {ventures.map((v, i) => (
        <VentureCard key={v.name} venture={v} delay={i * 120} />
      ))}
    </div>
  );
}

function VentureCard({ venture, delay }: { venture: Venture; delay: number }) {
  const isLive = Boolean(venture.url);

  const CardContent = (
    <div className="flex h-full flex-col justify-between p-8 sm:p-10">
      <div>
        <div className="flex items-start justify-between gap-4">
          <IconTile name={venture.icon} accent={venture.accent} size="lg" />
          <Badge accent={venture.accent} dot={isLive}>
            {isLive ? "Live Store" : "Coming Soon"}
          </Badge>
        </div>

        <h3 className="display display-md mt-6">{venture.name}</h3>
        <p className="statement mt-2 text-[15px]" style={{ color: venture.accent }}>
          {venture.tagline}
        </p>

        <p className="lede mt-4 text-sm leading-relaxed">{venture.description}</p>
      </div>

      <div className="mt-8 border-t border-[var(--color-edge)] pt-6">
        <div className="mb-6 flex flex-wrap gap-2">
          {venture.categories.map((cat) => (
            <span
              key={cat}
              className="rounded-md border border-[var(--color-edge)] bg-[var(--color-raise)] px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-ink-mute uppercase"
            >
              {cat}
            </span>
          ))}
        </div>

        {isLive ? (
          <span
            className="lnk font-mono text-xs tracking-[0.12em] uppercase"
            style={{ color: venture.accent }}
          >
            Visit Store
            <ArrowRight />
          </span>
        ) : (
          <span className="font-mono text-xs tracking-[0.12em] text-ink-mute uppercase">
            Store Launching Soon
          </span>
        )}
      </div>
    </div>
  );

  return (
    <Lumen as="article" accent={venture.accent} className="panel group">
      <div {...revealProps(delay)}>
        {isLive ? (
          <a
            href={venture.url!}
            target="_blank"
            rel="noreferrer noopener"
            className="block h-full"
            data-cursor="label"
            data-cursor-label="Visit store"
          >
            {CardContent}
          </a>
        ) : (
          <div className="h-full">{CardContent}</div>
        )}
      </div>
    </Lumen>
  );
}
