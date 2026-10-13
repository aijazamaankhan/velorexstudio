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

/** Hide all team presentation until the owner is ready to publish it. */
export const showTeam = false;

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

  // Confirmed names; roles and biographies await the owner's details.
  { name: "Shiraz", role: "", initials: "S", focus: "", disciplines: [], accent: "#ff5c8a", links: [] },
  { name: "Aftaab", role: "", initials: "A", focus: "", disciplines: [], accent: "#2ad4ff", links: [] },
  { name: "Zubair", role: "", initials: "Z", focus: "", disciplines: [], accent: "#9d85ff", links: [] },
];

/**
 * Shown alongside the team when the studio is small — states the position
 * openly rather than padding the grid with invented people.
 */
export const teamNote =
  "Velorex Studio is deliberately small. Work is done by the people who designed it, and we bring in trusted specialists when a project genuinely needs them.";

/** Set to true once there is a real careers process to point people at. */
export const hiring = false;
