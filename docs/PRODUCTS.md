# Products and ventures: where each one comes from

Every product and venture on the website is described from a real project on
disk. This file maps each website entry to its source, so the website can be
kept true when a project changes.

All source projects live in **`Z:\AI-developed-softwares\`**. (Older copies of
some of them also exist under `C:\Users\aijaz\Downloads\`; the `Z:` copies are
the current ones.)

Last full sync of the website against these folders: **7 October 2026**.

---

## How to re-sync a product

1. Open the project's source-of-truth document (column 3 below).
2. Compare it with that product's entry in `src/data/products.ts`.
3. Update `features`, `stack`, `description` and `note`. Move a feature out of
   `planned: true` only when the source says it is built.
4. Change `status` only when reality changes (see "Status rules" below).
5. Run `npm run typecheck`.

Nothing else needs touching: the homepage rail, `/products`, the product page,
the ecosystem map, the homepage status list, the footer and the sitemap are all
generated from `products.ts`.

## Products on the website (16)

| # | Website name | Slug | Source folder in `Z:\AI-developed-softwares\` | Source of truth | Stack | Platform |
|---|---|---|---|---|---|---|
| 1 | Velora | `velora` | `velorex-velora-music-player` | `README.md` | Electron, React, SQLite, Capacitor | Windows, Android (soon) |
| 2 | Velorex Recovery Intelligence | `recover` | `Data recoveru toool by claude ai` | `README.md` | C++20, Qt 6, CMake | Windows |
| 3 | Velorex DiscStudio | `discstudio` | `Velorex Design DiscStudio` | `README.md` | C#, .NET 8, FFmpeg, tsMuxeR | Windows |
| 4 | Velorex Design OS | `design-os` | `Velorex-Design-OS` | `README.md` | Electron, JavaScript | Windows |
| 5 | Velorex Pixel Studio | `pixel-studio` | `Velorex-pixel-studio-by-Claude` | `CLAUDE.md` | React, Vite, WebGL2, FastAPI | Web |
| 6 | Velorex Sentinel | `sentinel` | `Velorex USB Hub` (folder keeps the old name) | `README.md` | C#, .NET 8, WPF | Windows |
| 7 | LanBeam | `lanbeam` | `Velorex-files-transfer-via-local-network` | `README.md` | Flutter, Dart | Windows, Android (soon) |
| 8 | SkillForge AI | `skillforge` | `Editing-AI-tool` | `README.md`, `ARCHITECTURE.md` | React, Vite, Node.js, Whisper, Tesseract, Ollama | Web + local server |
| 9 | AgentOS | `agentos` | `Velorex-AI-agents-control-center` | `README.md`, `docs/PROGRESS.md` | Next.js, PostgreSQL, Prisma | Web |
| 10 | Velorex AI for Sellers | `ai-for-sellers` | `Velorex-design-AI-for-sellers` | `README.md` | Next.js, NestJS, Claude API, Prisma | Web |
| 11 | Locora | `locora` | `Velorex-Ecommece-platform` | `README.md` | React, Vite, Fastify, Drizzle, PostgreSQL | Web |
| 12 | PhotoLab Connect | `photolab-connect` | `Velorex-Photography software for digital labs` | `README.md` | React, Vite, Zustand, face-api | Web |
| 13 | Qalb | `qalb` | `Velorex-Qalb-islamic prayer` | `AGENTS.md` | React, Vite, Expo, Express, SQLite | Web, Android (soon) |
| 14 | Ustad AI | `ustad-ai` | `Velorex-Digital Ustaad\ustad-ai` | `README.md` | Next.js, Python, Ollama (optional) | Web |
| 15 | VibeVault | `vibevault` | `Velorex-veloramovies-partners\veloramovies-partners` | `README.md` | React, Vite | Web (prototype) |
| 16 | Halden | `halden` | `Velorex-Shopify themes\ecommerce` | `ARCHITECTURE.md`, `IMPLEMENTATION_PLAN.md` | Shopify Liquid, CSS, vanilla JS | Shopify theme |

The first six are the ones the footer lists by name
(`FOOTER_PRODUCT_COUNT` in `products.ts`). Reorder the array to change that.

### Notes on individual products

- **Velora**: a Windows installer (`VELORA Setup 1.1.0.exe`, about 95 MB) is
  built in the source project's `dist\` folder. It is **not published** on the
  website; that is a release decision for the owner. The APKs in that folder are
  debug-signed and must not be published.
- **Velorex Sentinel** (called Velorex USB Hub before version 1.1.0; its
  project folder and code namespace still use the old name): version 1.1.0
  (7 October 2026) added the USB ports page with a record of every drop, and
  the PC watch: processor, memory and graphics-card monitoring with miner
  checks, plus startup, browser-extension and network audits. Its website copy must keep
  saying it is not an antivirus. A v1.1.0 exe is built in the project's
  `Release\` folder; it is unsigned and not published on the website.
- **Velorex Recovery Intelligence**: renamed from "Velorex Recovery Studio". The
  slug stays `recover` so links don't break. Its copy must never imply
  guaranteed recovery.
- **Velorex AI for Sellers**: the project's own README simply calls the product
  "Velorex". The website name is taken from the folder name so it can be told
  apart from the company. Rename it in `products.ts` if it gets a real name.
- **PhotoLab Connect, Locora, VibeVault**: these run on demonstration or sample
  data. Their `note` says so. Keep it until that changes.
- **Ustad AI**: the AI teacher, voices and Android app are listed as `planned`
  because the source project says they are switched off or untested.

## Shown on /work only (no product page)

| Name | Source folder | Why |
|---|---|---|
| Velorex Media Studio | `Velorex Design Media player` | Early foundation (C++20 / Qt 6 / libmpv). Listed in `experiments` in `src/data/caseStudies.ts`. |

## In the folder but deliberately not on the website

| Folder | Reason |
|---|---|
| `Velorex Design Blu ray-DVD-media studio-old` | Superseded by Velorex DiscStudio. |
| `velorex-AI` | Small Python prototype of an Urdu/Arabic teacher; superseded by Ustad AI. |
| `velorex-design - Copy` | The website of the Velorex Design **venture** (see below), not a software product. |
| `file-downloader` | A single helper script. |
| `Hidden program` | A text note from a PC check, not a project. |
| `dumped` | Discarded material. |
| `Velorex Studio` | This website. |

If one of these should be on the website after all, add it with the
"Add a product" recipe in [CLAUDE.md](../CLAUDE.md).

## Ventures (2)

Ventures are non-software businesses. They live in `src/data/ventures.ts` and
appear on the homepage, `/studio`, `/ventures` and the footer.

| Venture | Status | Source of truth | What the website says it sells |
|---|---|---|---|
| Velorex Music | **Live** at `https://velorexmusic.com` | The live store itself (checked 7 Oct 2026) | Original Bollywood and Hindi film vinyl LPs, new and pre-owned, plus audio cassettes, shipped across India |
| Velorex Design | Not live (`url: null`) | `Z:\AI-developed-softwares\velorex-design - Copy` | Handcrafted wood items, resin art, a wellness range, and graphic design services |

To make Velorex Design live, set its `url` in `ventures.ts`. The "Coming soon"
badge becomes "Live store" and the footer link points at the store.

## Status rules

`status` in `products.ts` drives every badge and button.

| Status | Use it when |
|---|---|
| `in-development` | It exists as working software but has not been released to the public. **Every product is here today.** |
| `beta` | People outside Velorex can get it, and it is labelled as unfinished. |
| `available` | There is a real download or a live URL, and `downloads[].url` is set. |
| `planned` | Nothing usable exists yet. |

A product must not be `available` while its `downloads[].url` is `null`.
