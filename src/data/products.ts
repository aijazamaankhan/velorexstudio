/**
 * THE VELOREX PRODUCT REGISTRY
 * ────────────────────────────────────────────────────────────
 * This file is the single source of truth for every Velorex product.
 *
 * TO ADD A NEW PRODUCT:
 *   1. Append an entry to `products` below.
 *   2. Pick a `mockup` key (see components/mockups/index.tsx) or use "generic".
 *   3. Done — the homepage rail, /products, /products/[slug], the sitemap,
 *      the ecosystem constellation, the homepage status list and the footer
 *      (first FOOTER_PRODUCT_COUNT entries) all pick it up automatically.
 *
 * ORDER MATTERS: the first entries are the ones the footer lists by name.
 * Source projects live in Z:\AI-developed-softwares — see docs/PRODUCTS.md.
 *
 * HONESTY RULES BAKED INTO THE TYPES:
 *   • `status` drives every badge and CTA. Nothing claims to be shipping
 *     unless status === "available".
 *   • `features[].planned` marks a capability as not-yet-built, so the UI
 *     labels it instead of implying it exists.
 *   • `download.url` must be null until a real installer is published.
 *     A null URL renders a disabled "Coming soon" button, never a dead link.
 */

import type { IconName } from "@/components/Icons";

export type ProductStatus = "available" | "beta" | "in-development" | "planned";

export type ProductFeature = {
  label: string;
  icon: IconName;
  /** true = on the roadmap, not yet shipping. Rendered with a "Planned" tag. */
  planned?: boolean;
};

export type ProductDownload = {
  platform: string;
  /** e.g. "Windows 10/11 · x64" */
  requirement: string;
  /**
   * Public path to the installer, e.g. "/downloads/velora-setup.exe".
   * Drop the .exe into `public/downloads/` and set this string.
   * Keep it null until the binary actually exists.
   */
  url: string | null;
  /** Display-only. Leave null until there is a real build to describe. */
  version: string | null;
  size: string | null;
  /**
   * SHA-256 of the published file, shown on the product page so people can
   * verify the file they downloaded is the one Velorex published.
   */
  sha256?: string | null;
  /** Platform announced but not released yet — shown as "Android soon" on cards. */
  soon?: boolean;
};

export type Product = {
  name: string;
  /** Used in buttons and compact headings ("Explore DiscStudio"). */
  shortName: string;
  slug: string;
  /** Short mark (one word, 7 letters or fewer) used in the constellation + mockup. */
  mark: string;
  category: string;
  /** Icon for the product itself (cards, constellation, footer). */
  icon: IconName;
  status: ProductStatus;
  /** One line. Shown on cards. */
  tagline: string;
  /** Two or three sentences. Shown on the product page hero. */
  description: string;
  features: ProductFeature[];
  /** Real, verifiable implementation details. Shown as a spec table. */
  stack: string[];
  /** Accent colour — each product owns a subtle hue of the Velorex system. */
  accent: string;
  accentSoft: string;
  mockup: "audio" | "recovery" | "disc" | "os" | "pixel" | "generic";
  downloads: ProductDownload[];
  /** Optional caveat rendered in a muted note on the product page. */
  note?: string;
};

export const statusLabel: Record<ProductStatus, string> = {
  available: "Available",
  beta: "Beta",
  "in-development": "In Development",
  planned: "Planned",
};

export const products: Product[] = [
  {
    // Source of truth: Z:\AI-developed-softwares\velorex-velora-music-player (README.md)
    // Desktop = Electron app, Android / Android TV = Capacitor app in mobile/.
    name: "Velora",
    shortName: "Velora",
    slug: "velora",
    mark: "MUSIC",
    category: "Music Player",
    icon: "music",
    status: "in-development",
    tagline:
      "Your music. Your universe. A local-first music player for the music you actually own.",
    description:
      "Velora is a music player for your own files. It reads the music already on your disks, plays it, and keeps everything it learns about your library on your device — no account, no sync, no telemetry. It also plays audio CDs and free internet radio, and lets you see the player as a cassette deck, a reel-to-reel, a turntable or a clean modern panel. Built for Windows first, with an Android and Android TV app in development.",
    features: [
      { label: "Indexes your folders, tags and cover art — and watches them for changes", icon: "library" },
      { label: "Plays MP3, AAC, OGG, Opus, WebM, FLAC and WAV", icon: "play" },
      { label: "Audio CD playback at full CD quality, straight from the disc", icon: "disc" },
      { label: "Crossfade between songs, gapless within an album", icon: "convert" },
      { label: "10-band equaliser with presets, preamp and volume levelling", icon: "sliders" },
      { label: "Direct mode for an untouched, unprocessed signal", icon: "wave" },
      { label: "Free internet radio with now-playing lookup and five receiver designs", icon: "chat" },
      { label: "Fifteen player decks — cassette, reel-to-reel, vinyl, VU meters, jukebox and more", icon: "record" },
      { label: "Classic and Cosmos layouts, seven themes, accent from album art", icon: "palette" },
      { label: "Playlists, favourites, listening stats and a daily Today list", icon: "queue" },
      { label: "Compact floating player strip and a sleep timer", icon: "visualizer" },
      { label: "Command palette, media keys and keyboard shortcuts", icon: "terminal" },
      { label: "Private by design — nothing about your library leaves the device", icon: "shield" },
      { label: "Android and Android TV app — release build", icon: "phone", planned: true },
      { label: "AI-powered discovery", icon: "sparkles", planned: true },
    ],
    stack: [
      "Electron",
      "React 19",
      "TypeScript",
      "SQLite",
      "Tailwind CSS",
      "Capacitor (Android)",
    ],
    accent: "#7c5cff",
    accentSoft: "#7c5cff",
    mockup: "audio",
    downloads: [
      {
        platform: "Windows",
        requirement: "Windows 10/11 · x64 · Installer (.exe)",
        // TODO: a v1.1.0 installer is built in the source project's dist/ folder.
        // To publish: copy it to public/downloads/velora-setup.exe, then set
        // url "/downloads/velora-setup.exe", version "1.1.0", size and sha256.
        url: null,
        version: null,
        size: null,
      },
      {
        platform: "Android",
        requirement: "Coming soon · Android phone and Android TV · APK",
        soon: true,
        // TODO: set to "/downloads/velora.apk" once a signed RELEASE build exists.
        // Do not publish the debug APKs from dist/ — they are debug-signed.
        url: null,
        version: null,
        size: null,
      },
    ],
    note: "Velora plays files you own, audio CDs and free internet radio. Streaming services such as Spotify and Apple Music don't license third-party players, so their catalogues aren't supported. The Android app exists as a test build; it is listed as planned until a signed release is ready.",
  },

  {
    // Source of truth: Z:\AI-developed-softwares\Data recoveru toool by claude ai (README.md)
    name: "Velorex Recovery Intelligence",
    shortName: "Recovery Intelligence",
    slug: "recover",
    mark: "RECOVER",
    category: "Data Recovery",
    icon: "restore",
    status: "in-development",
    tagline:
      "Find and recover lost files with a guided Source → Scan → Recover flow.",
    description:
      "Velorex Recovery Intelligence is a Windows data recovery application built on direct raw disk access. It parses filesystems at the structure level, carves files by signature when the structures are gone, and lets you image a failing drive before touching anything else. A three-step flow — Source, Scan, Recover — keeps a stressful job readable, with a tools page for drive health and low-level inspection.",
    features: [
      { label: "Three-step flow: Source → Scan → Recover", icon: "compass" },
      { label: "Quick, Deep and Formatted-drive scan modes", icon: "scan" },
      { label: "NTFS, FAT32 and exFAT filesystem parsing", icon: "database" },
      { label: "Signature carving for unformatted or corrupted media", icon: "search" },
      { label: "Browse and preview results while the scan is still running", icon: "eye" },
      { label: "Hard drives, volumes, USB drives and memory cards", icon: "usb" },
      { label: "Drive health, bad-sector scan and lost-partition search", icon: "partition" },
      { label: "Disk imaging — work from a copy, not the original", icon: "copy" },
      { label: "Built-in hex viewer for low-level inspection", icon: "hex" },
      { label: "Saved sessions and recover-to-ZIP", icon: "folder" },
      { label: "AI Copilot panel for guidance", icon: "sparkles" },
      { label: "Free and Pro editions with offline, signed licence keys", icon: "shield" },
      { label: "Online customer accounts — built, not yet hosted", icon: "cloud", planned: true },
    ],
    stack: [
      "C++20",
      "Qt 6",
      "Raw disk I/O",
      "NTFS / FAT32 / exFAT",
      "Signature carving",
      "CMake",
      "Windows x64",
    ],
    accent: "#2ad4ff",
    accentSoft: "#2ad4ff",
    mockup: "recovery",
    downloads: [
      {
        platform: "Windows",
        requirement: "Windows 10/11 · x64 · Administrator rights · Installer (.exe)",
        url: null, // TODO: set to "/downloads/velorex-recovery-setup.exe" once published.
        version: null,
        size: null,
      },
    ],
    note: "No recovery tool can guarantee that lost data is recoverable — outcomes depend on the state of the media and on what has been written since the loss. Imaging a failing drive before any recovery attempt is recommended. The Free edition recovers up to 1 GB in total; Pro plans are not on sale yet.",
  },

  {
    // Source of truth: Z:\AI-developed-softwares\Velorex Design DiscStudio (README.md)
    name: "Velorex DiscStudio",
    shortName: "DiscStudio",
    slug: "discstudio",
    mark: "DISC",
    category: "Disc Authoring & Burning",
    icon: "disc",
    status: "in-development",
    tagline:
      "Author, burn, image and verify optical discs — DVD, Blu-ray, 4K UHD, VCD, bootable and personal discs.",
    description:
      "Velorex DiscStudio is a Windows studio for authoring, burning, imaging and verifying optical discs. Its core engines are built in-house: a DVD-Video engine that writes real VIDEO_TS structures with menus, and a Video CD / SVCD mastering engine. It turns movies, photos, music and documents into discs that play on a TV — and says plainly when something won't fit or isn't supported.",
    features: [
      { label: "DVD-Video authoring — chapters, up to 8 audio languages, subtitles, PAL/NTSC", icon: "disc" },
      { label: "DVD menu designer with 12 templates and scene selection", icon: "layers" },
      { label: "Blu-ray (BDMV) up to 1080p", icon: "play" },
      { label: "4K UHD Blu-ray — HEVC Main10 with HDR10, BD-50 / 66 / 100", icon: "hires" },
      { label: "Video CD 2.0 and Super Video CD mastering", icon: "record" },
      { label: "Audio CD with track gaps and CD-Text", icon: "music" },
      { label: "Data discs and ISO images — ISO 9660, Joliet, UDF", icon: "database" },
      { label: "Bootable discs — El Torito, BIOS or UEFI", icon: "cpu" },
      { label: "Personal discs — photos, videos, music and documents alongside the movie", icon: "folder" },
      { label: "Photo-album slideshows and bonus videos on the TV menu", icon: "visualizer" },
      { label: "Disc Library — finds the real main movie, writes as-is or a selection", icon: "library" },
      { label: "Burn ISO, copy, image and verify discs", icon: "check" },
      { label: "GPU video compression — NVENC, Quick Sync, AMF", icon: "sliders" },
      { label: "Offline licence keys — no account, nothing sent anywhere", icon: "shield" },
      { label: "Interactive Blu-ray / 4K UHD menus", icon: "layers", planned: true },
    ],
    stack: [
      "C#",
      ".NET 8",
      "FFmpeg",
      "tsMuxeR",
      "Windows IMAPI2",
      "libmpv",
      "Windows x64",
    ],
    accent: "#ff5c8a",
    accentSoft: "#ff5c8a",
    mockup: "disc",
    downloads: [
      {
        platform: "Windows",
        requirement: "Windows 10/11 · x64 · .NET 8 Desktop Runtime · Installer (.exe)",
        url: null, // TODO: set to "/downloads/velorex-discstudio-setup.exe" once published.
        version: null,
        size: null,
      },
    ],
    note: "DiscStudio has a Free plan with no time limit and no watermark; Pro and Studio plans are not on sale yet. Copy-protected (CSS / AACS) discs are detected and refused — nothing is decrypted. Blu-ray and 4K UHD discs start playback directly, without an interactive menu, for now.",
  },
  {
    // Source of truth: Z:\AI-developed-softwares\Velorex-Design-OS (README.md, package.json)
    name: "Velorex Design OS",
    shortName: "Design OS",
    slug: "design-os",
    mark: "OS",
    category: "Desktop Environment",
    icon: "desktop",
    status: "in-development",
    tagline:
      "Built for what comes next. Your tasks, notes, calendar, files and saved sites in one fast, private workspace.",
    description:
      "Velorex Design OS is a desktop environment for real daily work, running today as a Windows app with its ELYSIAN interface. It brings your day, your tasks, your notes and your files onto one screen, understands plain-language commands, and keeps every byte of your data on your own machine. The longer-term path is a bootable, installable system.",
    features: [
      { label: "Today — due tasks, agenda, focus minutes and live CPU / GPU / memory", icon: "clock" },
      { label: "Command Center (Ctrl K) — search everything, add tasks and events in plain language", icon: "search" },
      { label: "Tasks with natural-language capture, repeats and spoken reminders", icon: "check" },
      { label: "Markdown notes with live checklists, pinning and read-aloud", icon: "note" },
      { label: "Calendar with events, due tasks and reminders", icon: "clock" },
      { label: "Focus sessions that silence notifications and track streaks", icon: "focus" },
      { label: "Solver — calculator, units, percentages, loans and date maths", icon: "cpu" },
      { label: "Built-in browser with tracker blocking and offline reader copies", icon: "web" },
      { label: "Files, safe terminal, settings and a Performance power mode", icon: "folder" },
      { label: "Private by design — data stored locally, written atomically, never sent", icon: "shield" },
      { label: "Bootable, installable OS — Linux base, Wayland session, installer and A/B updates", icon: "rocket", planned: true },
    ],
    stack: ["Electron", "JavaScript", "Node.js", "HTML / CSS", "Windows x64"],
    accent: "#ffb547",
    accentSoft: "#ffb547",
    mockup: "os",
    downloads: [
      {
        platform: "Windows",
        requirement: "Windows 10/11 · x64 · Installer or portable (.exe)",
        url: null, // TODO: set to "/downloads/velorex-design-os-setup.exe" once published.
        version: null,
        size: null,
      },
    ],
    note: "Velorex Design OS currently runs as an application on Windows. A standalone, bootable operating system is on the roadmap and is not available yet.",
  },

  {
    // Source of truth: Z:\AI-developed-softwares\Velorex-pixel-studio-by-Claude (CLAUDE.md)
    name: "Velorex Pixel Studio",
    shortName: "Pixel Studio",
    slug: "pixel-studio",
    mark: "PIXEL",
    category: "Image Editing & Design",
    icon: "image",
    status: "in-development",
    tagline:
      "Create. Edit. Design. Without limits. A professional image editor and design platform that runs in your browser.",
    description:
      "Velorex Pixel Studio brings raster editing, design templates and a vector canvas together in the browser. Editing is non-destructive by default — adjustments are layers, masks are separate, and AI results arrive as new layers instead of overwriting your work. Its AI runs in your browser or on Velorex's own servers, never through third-party AI services, and the editor works fully without it.",
    features: [
      { label: "Layer-based raster editing with 36 tools", icon: "layers" },
      { label: "Non-destructive adjustment layers, masks and blend modes", icon: "sliders" },
      { label: "GPU-accelerated filters and adjustments (WebGL2)", icon: "cpu" },
      { label: "Design templates and a brand kit", icon: "palette" },
      { label: "Vector design canvas", icon: "design" },
      { label: "PSD import and export", icon: "export" },
      { label: "Self-hosted AI — background removal, segmentation, upscaling and more", icon: "sparkles" },
      { label: "Works offline — every AI feature has a local fallback", icon: "shield" },
      { label: "Local-first projects stored in your browser; optional account", icon: "database" },
      { label: "Step-by-step editing recipes from the tutorial library", icon: "note" },
    ],
    stack: ["React", "TypeScript", "Vite", "WebGL2", "ONNX Runtime Web", "FastAPI", "Python"],
    accent: "#34d399",
    accentSoft: "#34d399",
    mockup: "pixel",
    downloads: [
      {
        platform: "Web",
        requirement: "Runs in a modern browser — nothing to install",
        url: null, // TODO: set to the live app URL once the app is deployed (no domain exists yet).
        version: null,
        size: null,
      },
    ],
    note: "Velorex Pixel Studio is in development. Paid plans are not connected yet, and nothing you edit is used to train models unless you explicitly opt in for that result.",
  },

  {
    // Source of truth: Z:\AI-developed-softwares\Velorex USB Hub (README.md).
    // The project folder keeps its old name; the product was renamed in v1.1.0.
    name: "Velorex Sentinel",
    shortName: "Sentinel",
    slug: "sentinel",
    mark: "SENTRY",
    category: "USB & PC Watch",
    icon: "usb",
    status: "in-development",
    tagline:
      "Watches your USB ports, drives and what is using your PC, explains problems in plain words, and helps fix them.",
    description:
      "Velorex Sentinel is a Windows utility that keeps watch in the background. It reads Windows' own disk and power events and explains why drives disconnect — power cuts, drives dropping while the PC stays on, file-system corruption. It records every time a keyboard, mouse or hub drops and reconnects, so an unstable port or hub shows up as a number. Its PC watch measures what every program is using of the processor, memory and graphics card, and points out behaviour a hidden miner or unwanted program cannot avoid. It explains what it finds and never removes anything by itself.",
    features: [
      { label: "Drive overview — drops and power cuts over the last 14 days, explained", icon: "drive" },
      { label: "Every USB port — hubs, keyboards, mice and devices, with each drop recorded", icon: "usb" },
      { label: "Health check with advice and one-click fixes you confirm first", icon: "check" },
      { label: "What is using this PC — processor, memory and graphics card per program", icon: "visualizer" },
      { label: "Flags programs that work hard only while you are away", icon: "clock" },
      { label: "Flags programs that go quiet when Task Manager opens", icon: "eye" },
      { label: "Shows whether each program's file is digitally signed, and by whom", icon: "shield" },
      { label: "Startup audit — Run entries, services and scheduled tasks", icon: "rocket" },
      { label: "Browser extension audit across Chrome, Edge, Brave, Opera, Vivaldi and Firefox", icon: "web" },
      { label: "Spots remote-control tools, proxies and hosts-file redirects", icon: "scan" },
      { label: "Keeps watching from the system tray, with a saved text report", icon: "document" },
      { label: "Per-program graphics-card use on AMD and Intel cards when Windows' counters are damaged", icon: "cpu", planned: true },
    ],
    stack: ["C#", ".NET 8", "WPF", "Windows event log", "Windows Storage API", "Windows x64"],
    accent: "#ffb547",
    accentSoft: "#ffb547",
    mockup: "generic",
    downloads: [
      {
        platform: "Windows",
        requirement: "Windows 10/11 · x64 · Single file, no installation",
        url: null, // TODO: set to "/downloads/velorex-sentinel.exe" once published (v1.1.0 is built in the project's Release folder).
        version: null,
        size: null,
      },
    ],
    note: "Sentinel's PC watch is a second pair of eyes, not an antivirus: it has no malware database and cannot see software hidden inside Windows itself, so a finding is a reason to look, not a verdict. It cannot repair failing hardware. Fixes and ending a program only happen after you confirm.",
  },

  {
    // Source of truth: Z:\AI-developed-softwares\Velorex-files-transfer-via-local-network (README.md)
    name: "LanBeam",
    shortName: "LanBeam",
    slug: "lanbeam",
    mark: "BEAM",
    category: "Local File Transfer",
    icon: "export",
    status: "in-development",
    tagline:
      "Private, serverless file transfer between your phone and computer over the local network.",
    description:
      "LanBeam sends files directly between your devices over Wi-Fi. Files travel device to device over an encrypted connection; nothing is uploaded anywhere and no internet connection is needed. Pair once with a QR code or a PIN, then send files and folders in either direction.",
    features: [
      { label: "Direct device-to-device transfer — nothing is uploaded", icon: "export" },
      { label: "Encrypted connection between paired devices", icon: "shield" },
      { label: "Pair by QR code, PIN or IP address", icon: "scan" },
      { label: "Finds nearby devices on the same network", icon: "search" },
      { label: "Send files and whole folders, or drag them onto the window", icon: "folder" },
      { label: "Works with no internet connection", icon: "cloud" },
      { label: "Windows and Android apps from one codebase", icon: "phone" },
    ],
    stack: ["Flutter", "Dart", "Windows", "Android"],
    accent: "#2ad4ff",
    accentSoft: "#2ad4ff",
    mockup: "generic",
    downloads: [
      {
        platform: "Windows",
        requirement: "Windows 10/11 · x64",
        url: null, // TODO: set once a Windows build is published.
        version: null,
        size: null,
      },
      {
        platform: "Android",
        requirement: "Coming soon · APK",
        soon: true,
        url: null, // TODO: set once a signed release APK exists.
        version: null,
        size: null,
      },
    ],
    note: "Both devices need to be on the same local network. LanBeam is in development and has not been released.",
  },

  {
    // Source of truth: Z:\AI-developed-softwares\Editing-AI-tool (README.md, ARCHITECTURE.md)
    name: "SkillForge AI",
    shortName: "SkillForge",
    slug: "skillforge",
    mark: "SKILL",
    category: "AI Creative Editing",
    icon: "sparkles",
    status: "in-development",
    tagline:
      "Teach it how to do an edit once, and it can apply what it learned to future work.",
    description:
      "SkillForge AI learns how people do creative tasks from tutorials. It records the intent, target and relative parameters of each step — not pixels or mouse coordinates — and stores the result as versioned, evidence-backed skills. It then performs those skills in its own Image and Video Studios, with the AI running locally on your machine.",
    features: [
      { label: "Learns editing skills from tutorial videos and playlists", icon: "play" },
      { label: "Local AI — Whisper speech-to-text, Tesseract OCR, Ollama reasoning", icon: "cpu" },
      { label: "Image and Video Studios that perform the learned skills", icon: "image" },
      { label: "Quick tasks — remove background, product shot, auto captions, clean up audio", icon: "sparkles" },
      { label: "Image and video templates built from your brand kit", icon: "palette" },
      { label: "Workflow chains and batch edits of up to 100 images", icon: "automation" },
      { label: "Text-based video editing, auto chapters and highlight detection", icon: "text" },
      { label: "Preview and approve before any skill changes your project", icon: "check" },
      { label: "Versions you can save, compare and restore", icon: "copy" },
    ],
    stack: ["React", "TypeScript", "Vite", "Node.js", "FFmpeg", "Whisper", "Tesseract", "Ollama"],
    accent: "#9d85ff",
    accentSoft: "#9d85ff",
    mockup: "generic",
    downloads: [
      {
        platform: "Web",
        requirement: "Runs in a browser with a local companion server · needs FFmpeg",
        url: null, // TODO: set once there is a hosted or packaged build.
        version: null,
        size: null,
      },
    ],
    note: "SkillForge AI currently runs from source on your own machine with a local server; there is no hosted version or installer yet.",
  },

  {
    // Source of truth: Z:\AI-developed-softwares\Velorex-AI-agents-control-center (README.md)
    name: "AgentOS",
    shortName: "AgentOS",
    slug: "agentos",
    mark: "AGENTS",
    category: "AI Agent Control Center",
    icon: "ai",
    status: "in-development",
    tagline: "Your AI workforce. One control center.",
    description:
      "AgentOS is a multi-tenant control plane and observability platform for a company's AI agents. Connect the agents you already run, organise them by department, trace every task, and account for every token and dollar. Approvals, budgets and alerts keep people in control of what the agents do.",
    features: [
      { label: "Connect existing agents and organise them by department", icon: "blocks" },
      { label: "Live dashboard and task tracing from ingested events", icon: "visualizer" },
      { label: "Usage and cost tracking with versioned pricing", icon: "grow" },
      { label: "Human approvals for sensitive actions", icon: "check" },
      { label: "Budgets and alerts", icon: "shield" },
      { label: "Multi-tenant — each company sees only its own agents", icon: "building" },
      { label: "Desktop app", icon: "desktop" },
      { label: "Mobile app — first version", icon: "phone" },
    ],
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Zod", "Docker"],
    accent: "#7c5cff",
    accentSoft: "#7c5cff",
    mockup: "generic",
    downloads: [
      {
        platform: "Web",
        requirement: "Runs in a modern browser — self-hosted for now",
        url: null, // TODO: set to the live app URL once deployed.
        version: null,
        size: null,
      },
    ],
    note: "AgentOS is in development and is not hosted publicly yet. The remaining phases of its plan are still to be built.",
  },

  {
    // Source of truth: Z:\AI-developed-softwares\Velorex-design-AI-for-sellers (README.md)
    name: "Velorex AI for Sellers",
    shortName: "AI for Sellers",
    slug: "ai-for-sellers",
    mark: "SELLER",
    category: "AI for E-commerce",
    icon: "store",
    status: "in-development",
    tagline:
      "An AI operating system for online sellers — chat that actually operates the business.",
    description:
      "Velorex AI for Sellers is a chat-first control plane for an online store. An agent plans and carries out business operations through real tools bound to commerce data, watches the store for problems on its own, and puts anything that costs money behind human approval. Every tool call it makes is shown, with its inputs and result.",
    features: [
      { label: "Chat agent with 20 tools bound to live commerce data", icon: "chat" },
      { label: "Plan → confirm → execute, with a before/after diff for risky actions", icon: "check" },
      { label: "Proactive monitoring — stock cover, revenue, margin, refunds, dead stock", icon: "eye" },
      { label: "Real-time dashboard without polling", icon: "visualizer" },
      { label: "Workflows described in English, compiled to reviewable steps", icon: "automation" },
      { label: "Shopify connector for products, orders and customers", icon: "bag" },
      { label: "Role-based access with an audit log of every action", icon: "shield" },
      { label: "Works without an AI key — falls back to a keyword planner", icon: "cpu" },
    ],
    stack: ["Next.js", "NestJS", "TypeScript", "Claude API", "Prisma", "SQLite / PostgreSQL", "Tailwind CSS"],
    accent: "#34d399",
    accentSoft: "#34d399",
    mockup: "generic",
    downloads: [
      {
        platform: "Web",
        requirement: "Runs in a modern browser",
        url: null, // TODO: set to the live app URL once deployed.
        version: null,
        size: null,
      },
    ],
    note: "In development and not hosted yet. Price changes, refunds and ad spend always pause for approval; unattended schedules cannot run them.",
  },

  {
    // Source of truth: Z:\AI-developed-softwares\Velorex-Ecommece-platform (README.md)
    name: "Locora",
    shortName: "Locora",
    slug: "locora",
    mark: "LOCAL",
    category: "Hyperlocal Marketplace",
    icon: "pin",
    status: "in-development",
    tagline: "Your city. Your shops. Your marketplace.",
    description:
      "Locora is a hyperlocal multi-vendor marketplace. Local shops sell online and deliver themselves, and buyers only see shops that can actually reach them. Buyers, sellers and administrators each get their own interface, on top of shared business rules for delivery eligibility, pricing and orders.",
    features: [
      { label: "Buyers only see shops that can deliver to them", icon: "pin" },
      { label: "Multi-vendor — each shop manages its own catalogue and delivery", icon: "store" },
      { label: "Buyer, seller and admin interfaces", icon: "users" },
      { label: "Server-side pricing and transactional checkout", icon: "bag" },
      { label: "Order, payment and shop-verification workflows", icon: "check" },
      { label: "Returns, reviews, inventory and search ranking", icon: "search" },
      { label: "OTP sign-in, notifications and an audit log", icon: "shield" },
      { label: "Light and dark themes in two visual styles", icon: "palette" },
      { label: "Mobile app", icon: "phone", planned: true },
    ],
    stack: ["React", "Vite", "TypeScript", "Fastify", "Drizzle ORM", "PostgreSQL", "Razorpay"],
    accent: "#ff6b35",
    accentSoft: "#ff6b35",
    mockup: "generic",
    downloads: [
      {
        platform: "Web",
        requirement: "Runs in a modern browser",
        url: null, // TODO: set to the live marketplace URL once launched.
        version: null,
        size: null,
      },
    ],
    note: "Locora is in development and runs on demonstration data. It has not launched in any city.",
  },

  {
    // Source of truth: Z:\AI-developed-softwares\Velorex-Photography software for digital labs (README.md)
    name: "PhotoLab Connect",
    shortName: "PhotoLab Connect",
    slug: "photolab-connect",
    mark: "PHOTO",
    category: "Wedding Photography Platform",
    icon: "image",
    status: "in-development",
    tagline:
      "Every wedding, delivered. A marketplace for couples, studios and print labs — with the tools to deliver the work.",
    description:
      "PhotoLab Connect connects couples, photography studios and print labs. Couples find and book studios; studios deliver the work and send albums to labs; the platform sits in the middle with listings, quotes, shared media and delivery tracking. AI tools cull and sort photos against the package that was booked.",
    features: [
      { label: "Marketplace — search, studio and lab profiles, enquiries, quotes, e-sign", icon: "search" },
      { label: "AI culling — blur, exposure, closed eyes and bursts", icon: "sparkles" },
      { label: "Face grouping and selfie search for guests", icon: "users" },
      { label: "AI-drafted album, sorted against the booked package", icon: "library" },
      { label: "Couple tools — shared media, album choice, print picker, Delivery Clock", icon: "human" },
      { label: "Studio tools — culling, light table, send to lab, crew and inventory", icon: "layers" },
      { label: "Lab tools — production board, soft proofs, capacity planner and ETA", icon: "build" },
      { label: "Admin — verification, disputes and payout screens", icon: "shield" },
      { label: "Real payments, SMS and a backend", icon: "database", planned: true },
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "face-api", "Vitest"],
    accent: "#ff5c8a",
    accentSoft: "#ff5c8a",
    mockup: "generic",
    downloads: [
      {
        platform: "Web",
        requirement: "Runs in a modern browser",
        url: null, // TODO: set to the live app URL once launched.
        version: null,
        size: null,
      },
    ],
    note: "PhotoLab Connect is a working prototype: data lives in the browser, no SMS is sent and no money moves. The studios, labs and people shown inside it are fictional sample data.",
  },

  {
    // Source of truth: Z:\AI-developed-softwares\Velorex-Qalb-islamic prayer (AGENTS.md)
    name: "Qalb",
    shortName: "Qalb",
    slug: "qalb",
    mark: "QALB",
    category: "Islamic Daily Companion",
    icon: "compass",
    status: "in-development",
    tagline: "Your heart. Your deen. Your day.",
    description:
      "Qalb is an Islamic daily-life companion built as three surfaces sharing one core: a web app, a mosque wall display, and a phone app. It keeps prayer times, a personal practice log, notes and learning in one place — and keeps that worship data on your own device.",
    features: [
      { label: "Prayer times and a prayer log", icon: "clock" },
      { label: "Mosque wall display — jama'at times, announcements, events, Ramadan", icon: "desktop" },
      { label: "Dhikr, Quran progress, goals and tasks", icon: "check" },
      { label: "Notes, journal, Quran notes and voice notes", icon: "note" },
      { label: "Lessons and vocabulary with progress tracking", icon: "library" },
      { label: "Hadith and duas", icon: "feather" },
      { label: "Classic and Futuristic interfaces, light and dark", icon: "palette" },
      { label: "Worship data stays on the device — accounts hold identity only", icon: "shield" },
      { label: "Phone app", icon: "phone" },
    ],
    stack: ["React", "TypeScript", "Vite", "Expo (React Native)", "Node.js", "Express", "SQLite"],
    accent: "#34d399",
    accentSoft: "#34d399",
    mockup: "generic",
    downloads: [
      {
        platform: "Web",
        requirement: "Runs in a modern browser",
        url: null, // TODO: set to the live app URL once deployed.
        version: null,
        size: null,
      },
      {
        platform: "Android",
        requirement: "Coming soon",
        soon: true,
        url: null, // TODO: set once a signed release build exists.
        version: null,
        size: null,
      },
    ],
    note: "Qalb is in development and has not been released. Prayer times are calculated; always follow your local mosque where they differ.",
  },

  {
    // Source of truth: Z:\AI-developed-softwares\Velorex-Digital Ustaad\ustad-ai (README.md)
    name: "Ustad AI",
    shortName: "Ustad AI",
    slug: "ustad-ai",
    mark: "USTAD",
    category: "Language Learning",
    icon: "feather",
    status: "in-development",
    tagline: "Your personal Urdu and Arabic teacher.",
    description:
      "Ustad AI teaches Urdu and Arabic from the alphabet up. The course answers first: anything the curriculum can judge is judged by the curriculum, and answers from an AI model are labelled as such. Lessons, the alphabet, writing exercises, vocabulary, grammar and quizzes all work without any AI model running.",
    features: [
      { label: "39 Urdu and 28 Arabic letters — sound, joined shapes, example word", icon: "text" },
      { label: "10 lessons per language with script, transliteration and translation", icon: "library" },
      { label: "Writing exercises, vocabulary, grammar and quizzes", icon: "feather" },
      { label: "Dashboard — daily goal, course progress and your recent mistakes", icon: "grow" },
      { label: "Scripted teacher that works with no AI model", icon: "chat" },
      { label: "Choose your explanation language and level", icon: "human" },
      { label: "Local AI teacher through Ollama", icon: "cpu", planned: true },
      { label: "Natural voices", icon: "wave", planned: true },
      { label: "Android app", icon: "phone", planned: true },
    ],
    stack: ["Next.js", "TypeScript", "Python", "Ollama (optional)"],
    accent: "#ffb547",
    accentSoft: "#ffb547",
    mockup: "generic",
    downloads: [
      {
        platform: "Web",
        requirement: "Runs in a modern browser",
        url: null, // TODO: set to the live app URL once deployed.
        version: null,
        size: null,
      },
    ],
    note: "The lessons and translations have not yet been reviewed by a native speaker. The AI teacher and voices are switched off in the current build, and the Android build has not been tested on a phone.",
  },

  {
    // Source of truth: Z:\AI-developed-softwares\Velorex-veloramovies-partners\veloramovies-partners (README.md)
    name: "VibeVault",
    shortName: "VibeVault",
    slug: "vibevault",
    mark: "VAULT",
    category: "Private Media Network",
    icon: "play",
    status: "in-development",
    tagline:
      "A private media network for your own library and trusted friends' libraries.",
    description:
      "VibeVault is a design for a private, living-room-style media network: your own films, shows and music, plus the libraries trusted friends choose to share with you. Today it is an interface prototype — every screen is built and navigable, running on sample data.",
    features: [
      { label: "Interface prototype — films, shows, music and video screens", icon: "play" },
      { label: "Profiles, favourites and My List", icon: "users" },
      { label: "Friends' libraries with per-library permissions", icon: "shield" },
      { label: "TV layout with remote-style D-pad navigation", icon: "desktop" },
      { label: "Music mini-player and now-playing view", icon: "music" },
      { label: "Real libraries, streaming and accounts", icon: "database", planned: true },
      { label: "Desktop and TV apps", icon: "cube", planned: true },
    ],
    stack: ["React", "TypeScript", "Vite"],
    accent: "#ff5c8a",
    accentSoft: "#ff5c8a",
    mockup: "generic",
    downloads: [
      {
        platform: "Web",
        requirement: "Interface prototype — not released",
        url: null, // TODO: set once there is something real to open.
        version: null,
        size: null,
      },
    ],
    note: "VibeVault is a front-end prototype with sample data. There is no backend, account system, file access or streaming yet.",
  },

  {
    // Source of truth: Z:\AI-developed-softwares\Velorex-Shopify themes\ecommerce (ARCHITECTURE.md, IMPLEMENTATION_PLAN.md)
    name: "Halden",
    shortName: "Halden",
    slug: "halden",
    mark: "THEME",
    category: "Shopify Theme",
    icon: "bag",
    status: "in-development",
    tagline: "A premium Shopify Online Store 2.0 theme, built without a single library.",
    description:
      "Halden is a storefront theme for Shopify. It is built the native Online Store 2.0 way — Liquid, JSON templates, sections and blocks — with small vanilla-JavaScript custom elements and no build step. Motion is CSS-driven, and stays out of the way for people who prefer reduced motion.",
    features: [
      { label: "Native Online Store 2.0 — sections, blocks and JSON templates", icon: "blocks" },
      { label: "23 content sections for the homepage", icon: "layers" },
      { label: "Cart drawer, predictive search and collection filters", icon: "bag" },
      { label: "Product gallery, lightbox and sticky add-to-cart bar", icon: "image" },
      { label: "Colour schemes and design tokens editable in the theme editor", icon: "palette" },
      { label: "No JavaScript libraries and no build step", icon: "code" },
      { label: "Reduced-motion support and a no-JavaScript fallback", icon: "human" },
      { label: "Verified on a live Shopify store", icon: "check", planned: true },
    ],
    stack: ["Shopify Liquid", "JSON templates", "CSS", "Vanilla JavaScript"],
    accent: "#c4915e",
    accentSoft: "#c4915e",
    mockup: "generic",
    downloads: [
      {
        platform: "Shopify",
        requirement: "Shopify Online Store 2.0",
        url: null, // TODO: set once the theme is packaged for release.
        version: null,
        size: null,
      },
    ],
    note: "Halden has been checked with Shopify's Theme Check and browser tests against a static preview. It has not yet been verified on a live Shopify store, and is not listed on the Shopify Theme Store.",
  },
];

/** Products the ecosystem is expanding into. Explicitly not-yet-real. */
export type FutureProduct = {
  mark: string;
  icon: IconName;
  title: string;
  blurb: string;
  stage: "Coming next" | "In exploration";
};

export const futureProducts: FutureProduct[] = [
  {
    mark: "AI",
    icon: "ai",
    title: "AI Tools",
    blurb: "Applied intelligence built into the products people already use.",
    stage: "In exploration",
  },
  {
    mark: "CLOUD",
    icon: "cloud",
    title: "Cloud",
    blurb: "Sync, storage and the backend layer beneath the desktop apps.",
    stage: "In exploration",
  },
  {
    mark: "SECURE",
    icon: "shield",
    title: "Security",
    blurb: "Protecting the data our tools are trusted with.",
    stage: "In exploration",
  },
  {
    mark: "DEV",
    icon: "terminal",
    title: "Developer Tools",
    blurb: "The internal tooling we build for ourselves, opened up.",
    stage: "In exploration",
  },
];

/** How many products (from the top of the list) the footer names individually. */
export const FOOTER_PRODUCT_COUNT = 6;

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const productSlugs = () => products.map((p) => ({ slug: p.slug }));
