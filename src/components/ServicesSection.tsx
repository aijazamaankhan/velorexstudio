import { pipeline, pipelineIcons, services } from "@/data/services";
import { Icon, IconTile } from "./Icons";
import { Lumen } from "./Interactive";
import { revealProps } from "@/lib/reveal";

/**
 * Services as an index, not a card grid: a numbered list where each row opens
 * on hover. Reads like a studio's capability sheet rather than a template.
 */
export function ServiceList() {
  return (
    <ul className="mt-16 border-t border-[var(--color-edge)]">
      {services.map((s, i) => (
        <Lumen as="li" key={s.slug} accent="#7c5cff" className="group border-b border-[var(--color-edge)]">
          <div
            className="relative grid gap-6 py-9 transition-[padding] duration-500 [transition-timing-function:var(--ease-swift)] group-hover:px-5 lg:grid-cols-[auto_1fr_1.1fr] lg:items-start lg:gap-12"
            {...revealProps(i * 60)}
          >
            <span className="font-mono text-[11px] text-ink-mute lg:pt-2">{s.index}</span>

            <div className="flex items-center gap-5">
              <IconTile name={s.icon} accent={i % 2 === 0 ? "#7c5cff" : "#2ad4ff"} />
              <h3 className="display text-2xl transition-transform duration-500 [transition-timing-function:var(--ease-swift)] group-hover:translate-x-1 sm:text-3xl">
                {s.title}
              </h3>
            </div>

            <div>
              <p className="lede max-w-xl text-[15px]">{s.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[var(--color-edge)] px-3 py-1.5 text-[12px] text-ink-dim transition-colors duration-300 group-hover:border-violet/25 group-hover:text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Lumen>
      ))}
    </ul>
  );
}

/**
 * The lifecycle line: idea → grow. One SVG path that draws itself on scroll,
 * with a pulse travelling the whole route.
 */
export function PipelineDiagram() {
  const n = pipeline.length;

  return (
    <div className="relative" {...revealProps()}>
      {/* Desktop: horizontal track */}
      <div className="hidden lg:block">
        <svg viewBox="0 0 1200 120" className="w-full" role="img" aria-label={`Delivery lifecycle: ${pipeline.join(", ")}`}>
          <defs>
            <linearGradient id="pl-g" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#9d85ff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#2ad4ff" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          <path
            d="M 60 60 H 1140"
            stroke="url(#pl-g)"
            strokeWidth="1.25"
            fill="none"
            className="draw-line"
            style={{ ["--len" as string]: 1080 }}
          />

          <circle
            r="3.5"
            fill="#c3b4ff"
            style={{
              offsetPath: 'path("M 60 60 H 1140")',
              animation: "pl-run 7s linear infinite",
            }}
          />

          {pipeline.map((label, i) => {
            const x = 60 + (i * 1080) / (n - 1);
            return (
              <g key={label}>
                {/* Stage icon sits opposite its label */}
                <g
                  transform={`translate(${x - 9}, ${i % 2 === 0 ? 74 : 28})`}
                  className="text-[var(--color-ink-mute)]"
                >
                  <Icon name={pipelineIcons[label]} size={18} strokeWidth={1.4} />
                </g>
                <circle
                  cx={x}
                  cy="60"
                  r="4.5"
                  fill="#090a0f"
                  stroke={i === n - 1 ? "#2ad4ff" : "#7c5cff"}
                  strokeWidth="1.4"
                />
                <text
                  x={x}
                  y={i % 2 === 0 ? 38 : 88}
                  textAnchor="middle"
                  className="fill-[var(--color-ink-dim)] font-mono"
                  fontSize="10"
                  letterSpacing="2.4"
                >
                  {label.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
        <style>{`
          @keyframes pl-run {
            0%   { offset-distance: 0%;   opacity: 0; }
            6%   { opacity: 1; }
            94%  { opacity: 1; }
            100% { offset-distance: 100%; opacity: 0; }
          }
        `}</style>
      </div>

      {/* Mobile: vertical ladder — rethought, not shrunk */}
      <ol className="relative space-y-6 pl-8 lg:hidden">
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[5px] w-px bg-[linear-gradient(180deg,var(--color-violet),transparent)]"
        />
        {pipeline.map((label, i) => (
          <li key={label} className="relative flex items-center gap-3">
            <span
              aria-hidden
              className="absolute -left-8 h-2.5 w-2.5 rounded-full border border-violet/60 bg-void"
              style={{ animation: `pulse-dot ${2.6 + i * 0.2}s ease-in-out infinite` }}
            />
            <Icon name={pipelineIcons[label]} size={16} className="text-violet" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-ink-dim uppercase">
              {label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
