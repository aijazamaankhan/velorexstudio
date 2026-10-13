import { techGroups } from "@/data/technologies";

/**
 * Two counter-rotating rows. Each row duplicates its contents exactly once so
 * the -50% keyframe loops seamlessly; the whole thing is one transform, so it
 * costs nothing to scroll past.
 */
export function TechnologyMarquee() {
  return (
    <div className="space-y-4">
      {techGroups.map((group, gi) => (
        <div key={group.label}>
          <p className="eyebrow mb-3 px-6 sm:px-8 lg:px-12">{group.label}</p>
          <div
            className={`marquee-host edge-fade overflow-hidden ${
              gi % 2 === 1 ? "marquee-reverse" : ""
            }`}
          >
            <div
              className="marquee-track"
              style={{ ["--speed" as string]: `${38 + gi * 12}s` }}
            >
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  className="flex shrink-0 items-center"
                  aria-hidden={copy === 1}
                >
                  {group.items.map((t) => (
                    <li key={t} className="flex items-center">
                      <span className="px-6 font-display text-xl font-medium tracking-tight text-ink-dim transition-colors duration-300 hover:text-ink sm:px-9 sm:text-2xl">
                        {t}
                      </span>
                      <span
                        aria-hidden
                        className="h-1 w-1 shrink-0 rounded-full bg-violet/40"
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
