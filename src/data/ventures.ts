import type { IconName } from "@/components/Icons";

/**
 * Non-software ventures under the Velorex brand.
 *
 * These are online stores / businesses outside the software product line.
 * Each venture shows up on the homepage, /studio, /ventures and in the footer
 * — all generated from this file.
 *
 * HONESTY RULES (same as products):
 *   • `url` is null until the store is really live. A null URL renders
 *     "Coming soon"; a set URL renders "Live store" and a link.
 *   • Copy must describe what the store actually sells. No shipping, sourcing,
 *     health or quality claims the store itself does not make.
 */

export type VentureHighlight = { title: string; desc: string };

export type Venture = {
  /** Anchor on /ventures, e.g. /ventures#music. */
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: IconName;
  accent: string;
  /** Full external URL. `null` = not yet live (renders "Coming soon"). */
  url: string | null;
  categories: string[];
  /** Heading + longer copy for the deep-dive section on /ventures. */
  headline: string;
  story: string;
  highlights: VentureHighlight[];
};

export const ventures: Venture[] = [
  {
    // Source of truth: the live store at https://velorexmusic.com
    // (checked 2026-10-07: responds, title "Buy Vinyl Records & Cassettes Online in India").
    slug: "music",
    name: "Velorex Music",
    shortName: "Music",
    tagline: "Vinyl records and audio cassettes, shipped across India.",
    description:
      "An online record store for original Bollywood and Hindi film vinyl LPs — new and pre-owned — plus audio cassettes. Music you can hold.",
    icon: "music",
    accent: "#ff6b35",
    url: "https://velorexmusic.com",
    categories: ["Vinyl LPs", "Audio Cassettes", "Bollywood & Hindi Film"],
    headline: "Music You Can Hold",
    story:
      "Velorex Music is for people who still want the record in their hands. The store sells original Bollywood and Hindi film soundtracks on vinyl, alongside audio cassettes.",
    highlights: [
      {
        title: "Vinyl LPs",
        desc: "Original Bollywood and Hindi film soundtrack LPs, both new and pre-owned.",
      },
      {
        title: "Audio Cassettes",
        desc: "Cassette releases alongside the vinyl catalogue.",
      },
      {
        title: "Hand-checked",
        desc: "Records are checked by hand before they are listed.",
      },
      {
        title: "Ships Across India",
        desc: "Orders are placed on the store's own website and shipped within India.",
      },
    ],
  },
  {
    // Source of truth: Z:\AI-developed-softwares\velorex-design - Copy (the store's site, not yet live)
    slug: "design",
    name: "Velorex Design",
    shortName: "Design",
    tagline: "Handcrafted wood items, resin art and graphic design services.",
    description:
      "A store for handcrafted wooden products and resin art — Vijaysar wood glasses, neem combs and other home pieces — alongside Velorex's graphic design services.",
    icon: "wood",
    accent: "#c4915e",
    url: null, // not yet live
    categories: ["Wood", "Resin Art", "Wellness Range", "Graphic Design"],
    headline: "Handcrafted Wood & Resin",
    story:
      "Velorex Design brings together handmade objects and the studio's design practice. The store is being built now and has not opened yet.",
    highlights: [
      {
        title: "Wood",
        desc: "Handcrafted wooden items for the home, including Vijaysar wood glasses.",
      },
      {
        title: "Resin Art",
        desc: "Handmade resin art pieces.",
      },
      {
        title: "Wellness Range",
        desc: "Traditional everyday items such as neem wood combs and acupressure sticks.",
      },
      {
        title: "Graphic Design Services",
        desc: "Design work from the studio's founder, a senior graphic designer.",
      },
    ],
  },
];
