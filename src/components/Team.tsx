import { hiring, team, teamNote } from "@/data/team";
import { site } from "@/data/site";
import { Lumen } from "./Interactive";
import { ArrowRight, SampleTag } from "./Primitives";
import { revealProps } from "@/lib/reveal";

/**
 * The team. Portraits are optional by design — a generated monogram keeps the
 * section looking deliberate without resorting to stock headshots, and the
 * layout stays honest whether there is one person or ten.
 */
export function Team() {
  const solo = team.length === 1;

  return (
    <div>
      <ul
        className={`grid gap-4 ${
          solo ? "lg:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {team.map((member, i) => (
          <Lumen
            as="li"
            key={member.name}
            accent={member.accent}
            className={`panel group ${!solo && i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}`}
          >
            <div className="relative p-8 sm:p-10" {...revealProps(i * 80)}>
              {/* Monogram / portrait */}
              <div className="flex items-center gap-5">
                <span
                  aria-hidden
                  className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border transition-transform duration-700 [transition-timing-function:var(--ease-swift)] group-hover:scale-105"
                  style={{
                    borderColor: `${member.accent}44`,
                    background: `radial-gradient(circle at 30% 25%, ${member.accent}40, transparent 70%)`,
                  }}
                >
                  {member.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photo}
                      alt=""
                      width={64}
                      height={64}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span
                      className="font-display text-lg font-bold tracking-tight"
                      style={{ color: member.accent }}
                    >
                      {member.initials}
                    </span>
                  )}
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="display text-xl sm:text-2xl">{member.name}</h3>
                    <SampleTag show={member.sample} />
                  </div>
                  <p className="mt-1.5 font-mono text-[10px] tracking-[0.16em] text-ink-mute uppercase">
                    {member.role}
                  </p>
                </div>
              </div>

              <p className="lede mt-6 max-w-sm text-[15px]">{member.focus}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {member.disciplines.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-[var(--color-edge)] px-3 py-1.5 text-[11px] text-ink-dim"
                  >
                    {d}
                  </li>
                ))}
              </ul>

              {/* Links with an empty href are placeholders — hidden, never broken */}
              {member.links && member.links.some((l) => l.href) && (
                <ul className="mt-7 flex gap-5">
                  {member.links.filter((l) => l.href).map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="lnk font-mono text-[10px] tracking-[0.16em] uppercase"
                        style={{ color: member.accent }}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Lumen>
        ))}

        {/* Position statement / open role slot */}
        <li className="panel relative border-dashed">
          <div
            className="flex h-full flex-col justify-between gap-8 p-8 sm:p-10"
            {...revealProps(team.length * 80)}
          >
            <div>
              <span
                aria-hidden
                className="mb-6 block h-16 w-16 rounded-2xl border border-dashed border-violet/35"
                style={{ animation: "spin-slow 20s linear infinite" }}
              />
              <p className="eyebrow">
                {hiring ? "Open roles" : "How we work"}
              </p>
              <p className="lede mt-5 max-w-sm text-[15px]">
                {hiring
                  ? "We're looking for people who care about how software is made, not just that it ships."
                  : teamNote}
              </p>
            </div>

            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="lnk inline-flex font-mono text-[11px] tracking-[0.12em] text-ink uppercase"
              >
                {hiring ? "Get in touch" : "Work with us"}
                <ArrowRight />
              </a>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}
