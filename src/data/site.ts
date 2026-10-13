/**
 * Global brand + contact configuration.
 *
 * ⚠️ PLACEHOLDERS — replace the values marked `TODO` with real Velorex details.
 * Anything left empty/null is hidden by the UI rather than faked.
 */

export const site = {
  name: "Velorex Studio",
  legalName: "Velorex Design IT Services",
  shortName: "Velorex",
  tagline: "All products, software, and digital experiences are designed and developed by Velorex Studio.",
  description:
    "Velorex Studio (Velorex Design IT Services) designs, engineers, and launches software products, e-commerce ventures, and digital experiences.",

  /**
   * Owned production domain. Set NEXT_PUBLIC_SITE_URL before building to override.
   */
  // `||` (not `??`) so an empty value copied from .env.example also falls back.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://velorexstudio.com").replace(/\/+$/, ""),

  /**
   * No company inbox has been confirmed yet, so this is
   * null and every mailto link is hidden.
   * TODO: set to the real address once there is one.
   */
  email: null as string | null,

  /** TODO: add a real phone number, or leave null to hide it. */
  phone: null as string | null,

  /** TODO: add a real location, or leave null. No invented offices. */
  location: null as string | null,

  founder: "Aijaz Khan",

  /**
   * Only list profiles that actually exist — an empty array renders nothing,
   * and the footer hides any entry with an empty href.
   *
   * TODO: paste the real URLs, e.g.
   *   { label: "LinkedIn",  href: "https://www.linkedin.com/company/..." },
   *   { label: "Portfolio", href: "https://..." },
   *   { label: "GitHub",    href: "https://github.com/..." },
   */
  // Empty until real profiles exist — the old placeholder URLs pointed at
  // pages Velorex does not control.
  socials: [] as { label: string; href: string }[],

  /**
   * While true, every entry flagged `sample: true` (dummy team members,
   * dummy case studies) shows a small "Sample" tag. Set to false only once
   * the dummy data has been replaced — or deliberately, if you accept the risk.
   */
  showSampleLabels: true,
} as const;

export type Site = typeof site;
