/**
 * THE TEAM
 * ────────────────────────────────────────────────────────────
 * TO ADD A PERSON: append an entry below. The section re-flows on its own.
 *
 * HONESTY RULES:
 *   • Only add people who actually work on Velorex. No filler headshots,
 *     no invented job titles, no fake headcount.
 *   • `focus` should describe what the person genuinely does.
 *   • `initials` drives the generated monogram — no photography required.
 *     Add `photo` (a path in /public) later if you want real portraits.
 *   • Leave `links` empty unless the profile actually exists.
 */

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  /** Short line about what they actually work on. */
  focus: string;
  /** Disciplines — rendered as small tags. */
  disciplines: string[];
  accent: string;
  /** Optional: path to a portrait in /public, e.g. "/team/name.webp". */
  photo?: string;
  links?: { label: string; href: string }[];
  /** DUMMY entry — shows a "Sample" tag while site.showSampleLabels is on. */
  sample?: boolean;
};

export const team: TeamMember[] = [
  {
    name: "Aijaz Khan",
    role: "Founder & CEO · Senior Graphic Designer",
    initials: "AK",
    focus:
      "Leads Velorex and shapes its visual identity — a senior graphic designer who also builds the products end to end, from the native C++ engines underneath to the interface on top.",
    disciplines: ["Graphic Design", "Brand", "Product", "Engineering"],
    accent: "#7c5cff",
    // TODO: add the real portfolio / LinkedIn URLs. Left empty rather than
    // linking to placeholder pages.
    links: [],
  },

  /* ── DUMMY TEAM MEMBERS — replace or delete before launch ── */
  {
    name: "Sara Mehta",
    role: "Lead Product Designer",
    initials: "SM",
    focus:
      "Shapes how Velorex products look and feel — interface systems, motion and the details in between.",
    disciplines: ["UI/UX", "Design systems", "Motion"],
    accent: "#ff5c8a",
    links: [
      { label: "Portfolio", href: "https://portfolio.example.com/sara" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/example-sara" },
    ],
    sample: true,
  },
  {
    name: "Daniel Okafor",
    role: "Senior Software Engineer",
    initials: "DO",
    focus:
      "Works on the native engines — playback, file systems and the performance-critical paths.",
    disciplines: ["C++", "Qt", "Systems"],
    accent: "#2ad4ff",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/example-daniel" },
    ],
    sample: true,
  },
  {
    name: "Lena Varga",
    role: "Full-Stack Engineer",
    initials: "LV",
    focus:
      "Builds web products and backends for client projects, from API design to deployment.",
    disciplines: ["TypeScript", "Next.js", "Cloud"],
    accent: "#9d85ff",
    links: [
      { label: "Portfolio", href: "https://portfolio.example.com/lena" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/example-lena" },
    ],
    sample: true,
  },
];

/**
 * Shown alongside the team when the studio is small — states the position
 * openly rather than padding the grid with invented people.
 */
export const teamNote =
  "Velorex Studio is deliberately small. Work is done by the people who designed it, and we bring in trusted specialists when a project genuinely needs them.";

/** Set to true once there is a real careers process to point people at. */
export const hiring = false;
