import type { IconName } from "@/components/Icons";

/**
 * CASE STUDIES / SELECTED WORK
 * ────────────────────────────────────────────────────────────
 * `clientWork` currently holds THREE FICTIONAL SAMPLES (`sample: true`), shown
 * with a "Sample" tag. Replace them with real projects — only ones the client
 * has agreed to be named for — or delete them all: while `clientWork` is
 * empty, /work renders "Selected Experiments" from `experiments` instead,
 * which is Velorex's own, verifiable product engineering.
 */

export type CaseStudy = {
  slug: string;
  name: string;
  industry: string;
  year: string;
  challenge: string;
  solution: string;
  technology: string[];
  /** Only include a measured, verifiable result. Leave null otherwise. */
  result: string | null;
  accent: string;
  /** Industry icon shown on the case study row. */
  icon: IconName;
  /** DUMMY entry — shows a "Sample" tag while site.showSampleLabels is on. */
  sample?: boolean;
};

/* ── DUMMY CLIENT WORK — fictional companies, replace before launch ── */
export const clientWork: CaseStudy[] = [
  {
    slug: "northwind-logistics",
    name: "Northwind Logistics — Fleet Dashboard",
    industry: "Logistics",
    icon: "truck",
    year: "2026",
    challenge:
      "Dispatchers tracked 200+ vehicles across four disconnected tools and a shared spreadsheet, so delays were spotted hours late.",
    solution:
      "A single real-time web dashboard with live vehicle positions, delay alerts and a dispatcher workflow designed around the busiest hour of the day.",
    technology: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    result: "Replaced four tools with one; delay alerts now surface in minutes rather than hours.",
    accent: "#2ad4ff",
    sample: true,
  },
  {
    slug: "lumen-health",
    name: "Lumen Health — Patient Intake Assistant",
    industry: "Healthcare",
    icon: "health",
    year: "2026",
    challenge:
      "Clinic staff spent the first ten minutes of every appointment re-typing information patients had already written on paper forms.",
    solution:
      "An AI-assisted intake flow that turns a patient's own words into structured notes for staff to review, with every field editable before it is saved.",
    technology: ["React", "Python", "AI APIs", "PostgreSQL"],
    result: "Intake moved before the appointment, giving that time back to the consultation.",
    accent: "#9d85ff",
    sample: true,
  },
  {
    slug: "atelier-rowe",
    name: "Atelier Rowe — E-commerce Relaunch",
    industry: "Retail · Fashion",
    icon: "bag",
    year: "2025",
    challenge:
      "A slow, template-based storefront that looked like every competitor and was painful to use on a phone.",
    solution:
      "A custom storefront with an editorial product presentation, a mobile-first checkout and a design system the in-house team can extend.",
    technology: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    result: "A faster, mobile-first store the brand team can update without a developer.",
    accent: "#ff5c8a",
    sample: true,
  },
];

export type Experiment = {
  slug: string;
  name: string;
  kind: string;
  year: string;
  challenge: string;
  solution: string;
  technology: string[];
  /** Verifiable engineering outcome — no invented metrics. */
  result: string | null;
  accent: string;
  icon: IconName;
  href?: string;
};

export const experiments: Experiment[] = [
  {
    slug: "velora-app",
    icon: "music",
    name: "Velora — local-first music player",
    kind: "Own product · Desktop & Android",
    year: "2026",
    challenge:
      "Build a music player for people's own libraries that feels crafted and personal, while keeping every byte of listening data on the device.",
    solution:
      "An Electron + React desktop app with a SQLite library index, a 10-band EQ pipeline with a bypass Direct mode, audio CD playback, internet radio, and fifteen skinnable player decks — plus a Capacitor-based Android app sharing the same interface.",
    technology: ["Electron", "React", "TypeScript", "SQLite", "Capacitor"],
    result:
      "Honest format handling: files the engine can't decode are indexed with an explanation instead of failing silently.",
    accent: "#7c5cff",
    href: "/products/velora",
  },
  {
    slug: "media-studio",
    icon: "play",
    name: "Velorex Media Studio — native multimedia suite",
    kind: "Own product · Desktop",
    year: "2026",
    challenge:
      "Build a media application that behaves like a real desktop program — instant startup, native windowing, no bundled browser runtime — across playback, conversion and recording.",
    solution:
      "A C++20 / Qt 6 application embedding libmpv for playback and driving FFmpeg for probing and transcoding, with an SQLite catalogue. Audio CD support reads the table of contents through libcdio and rips tracks to exact Red Book copies.",
    technology: ["C++20", "Qt 6", "libmpv", "FFmpeg", "SQLite", "CMake"],
    result:
      "Playback, library, conversion, compression, recording and download modules run on real backends rather than placeholders.",
    accent: "#9d85ff",
  },
  {
    slug: "recover-engine",
    icon: "restore",
    name: "Velorex Recovery Intelligence — filesystem forensics",
    kind: "Own product · Desktop",
    year: "2026",
    challenge:
      "Make low-level data recovery approachable without hiding what the tool is doing to a damaged drive.",
    solution:
      "Read-only raw disk access with dedicated NTFS, FAT32 and exFAT parsers, a signature carver for when metadata is unrecoverable, disk imaging so work happens on a copy, and a hex editor for inspecting structures directly.",
    technology: ["C++20", "Qt 6", "Raw disk I/O", "NTFS", "FAT32", "exFAT"],
    result:
      "Modular engine split across Core, Disk, FileSystems, Recovery, Imaging and HexEditor, packaged as a Windows build.",
    accent: "#2ad4ff",
    href: "/products/recover",
  },
  {
    slug: "discstudio-engines",
    icon: "disc",
    name: "Velorex DiscStudio — in-house disc engines",
    kind: "Own product · Desktop",
    year: "2026",
    challenge:
      "Author discs that play on real TV players, across formats with decades of strict, unforgiving specifications.",
    solution:
      "A DVD-Video engine written from scratch (IFO/BUP/VOB, cells, chapters, NAV packs, menus with remote-control navigation) and a Video CD / SVCD mastering engine (Mode 2 sectors, ISO 9660 + CD-XA), with FFmpeg and tsMuxeR handling Blu-ray and 4K UHD.",
    technology: ["C#", ".NET 8", "FFmpeg", "tsMuxeR", "IMAPI2"],
    result:
      "DVD menu structure and navigation verified with libdvdnav and an independent disassembler.",
    accent: "#ff5c8a",
    href: "/products/discstudio",
  },
  {
    slug: "velorex-studio-site",
    icon: "web",
    name: "Velorex Studio — this website",
    kind: "Own product · Web",
    year: "2026",
    challenge:
      "Present a product studio with cinematic motion and a full product system, without shipping a heavy JavaScript bundle to do it.",
    solution:
      "Next.js App Router with server components by default. Every animation is CSS transform/opacity or a single small canvas; scroll reveals run on IntersectionObserver. No animation library, no UI kit, and reduced-motion is honoured throughout.",
    technology: ["TypeScript", "Next.js", "React", "Tailwind CSS"],
    result: null,
    accent: "#ff5c8a",
  },
];
