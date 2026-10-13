import { principles, process } from "@/data/services";
import { IconTile } from "./Icons";
import { Lumen } from "./Interactive";
import { revealProps } from "@/lib/reveal";

/** Five steps, revealed in sequence as the section scrolls into view. */
export function ProcessTimeline() {
  return (
    <ol className="relative mt-16">
      {/* Spine */}
      <span
        aria-hidden
        className="absolute top-0 bottom-0 left-[7px] w-px bg-[linear-gradient(180deg,transparent,var(--color-edge)_8%,var(--color-edge)_92%,transparent)] lg:left-1/2"
      />
      {/* Progress fill — grows with scroll where scroll timelines exist */}
      <span
        aria-hidden
        className="spine-fill absolute top-0 bottom-0 left-[7px] w-px bg-[linear-gradient(180deg,var(--color-violet),var(--color-electric)_80%,transparent)] shadow-[0_0_12px_var(--color-violet)] lg:left-1/2"
      />

      {process.map((p, i) => (
        <li key={p.step} className="relative" {...revealProps(i * 90)}>
          <div
            className={`flex gap-6 py-8 lg:w-1/2 lg:gap-10 lg:py-12 ${
              i % 2 === 0
                ? "lg:ml-auto lg:pl-16"
                : "lg:mr-auto lg:flex-row-reverse lg:pr-16 lg:text-right"
            }`}
          >
            {/* Marker */}
            <span
              aria-hidden
              className={`absolute top-10 left-0 grid h-[15px] w-[15px] place-items-center rounded-full border border-violet/50 bg-void lg:left-1/2 lg:-translate-x-1/2 ${
                i % 2 === 0 ? "" : ""
              }`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-violet"
                style={{ animation: `pulse-dot ${2.8 + i * 0.25}s ease-in-out infinite` }}
              />
            </span>

            <span className="pl-8 font-mono text-[11px] tracking-[0.2em] text-ink-mute lg:pl-0">
              {p.step}
            </span>

            <div className="group min-w-0">
              <div
                className={`flex items-center gap-4 ${
                  i % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
              >
                <IconTile name={p.icon} accent={i % 2 === 0 ? "#7c5cff" : "#2ad4ff"} />
                <h3 className="display text-2xl sm:text-3xl">{p.title}</h3>
              </div>
              <p className="mt-2 text-[15px] text-ink">{p.body}</p>
              <p className="lede mt-3 max-w-sm text-[14px]">{p.detail}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Principles — stated as positions, not marketing adjectives. */
export function Principles() {
  return (
    <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {principles.map((p, i) => (
        <Lumen
          as="li"
          key={p.title}
          accent={i % 2 === 0 ? "#7c5cff" : "#2ad4ff"}
          className={`panel group ${i === 0 ? "lg:col-span-2" : ""}`}
        >
          <div className="relative p-8 sm:p-10" {...revealProps(i * 70)}>
            <div className="flex items-start justify-between">
              <IconTile name={p.icon} accent={i % 2 === 0 ? "#7c5cff" : "#2ad4ff"} size="lg" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-ink-mute">
                0{i + 1}
              </span>
            </div>
            <h3 className="display mt-7 text-xl sm:text-2xl">{p.title}</h3>
            <p className="lede mt-3 max-w-sm text-[15px]">{p.body}</p>
          </div>
        </Lumen>
      ))}
    </ul>
  );
}
