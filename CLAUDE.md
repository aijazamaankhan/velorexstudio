# CLAUDE.md — Velorex Studio website

Guide for AI assistants (and developers) working on this codebase. Read this
first; it explains how the site is put together, the rules it follows, and
the recipes for the changes people ask for most often.

Deeper references:
- [docs/STATUS.md](docs/STATUS.md) — what is done, what is still placeholder, change log
- [docs/PRODUCTS.md](docs/PRODUCTS.md) — which project on disk each product and venture comes from
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — rendering, data flow, motion, theming
- [docs/CONTENT.md](docs/CONTENT.md) — editing products, ventures, team, work, links, downloads
- [docs/SECURITY.md](docs/SECURITY.md) — security headers, contact API protection, publishing installers
- [AGENTS.md](AGENTS.md) — one-page entry point for other AI agents

---

## 1. What this is

The official website of **Velorex Studio** (legal name *Velorex Design IT
Services*, founder & CEO **Aijaz Khan**, who is also a senior graphic designer). Velorex is a *product studio*: it
builds its own software **and** builds software for clients. The site has to
make both halves obvious.

It also runs **ventures**: non-software businesses under the Velorex brand
(an online record store, and a handcrafted goods store that is not live yet).

**Velorex Studio owns velorexstudio.com.** The production URL defaults to
`https://velorexstudio.com`; no company inbox is confirmed and `site.email`
is still `null`. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for Hostinger setup.

Own products (real, on disk). All source projects live in
`Z:\AI-developed-softwares\`. The full mapping, with the document to read for
each one, is in [docs/PRODUCTS.md](docs/PRODUCTS.md).

| Product | Slug | Source folder | What it is |
|---|---|---|---|
| Velora | `velora` | `velorex-velora-music-player` | Electron + React music player; Capacitor Android / Android TV app in `mobile/` |
| Velorex Recovery Intelligence | `recover` | `Data recoveru toool by claude ai` | C++20 / Qt 6 raw-disk recovery (NTFS/FAT32/exFAT, carving, imaging, hex viewer), Free and Pro editions |
| Velorex DiscStudio | `discstudio` | `Velorex Design DiscStudio` | C# / .NET 8 disc authoring & burning |
| Velorex Design OS | `design-os` | `Velorex-Design-OS` | Electron desktop environment ("ELYSIAN" shell); bootable OS is roadmap only |
| Velorex Pixel Studio | `pixel-studio` | `Velorex-pixel-studio-by-Claude` | Browser image editor + design platform (React/Vite + FastAPI) |
| Velorex Sentinel | `sentinel` | `Velorex USB Hub` (old name) | C# / .NET 8 USB port, drive and PC-use watch for Windows |
| LanBeam | `lanbeam` | `Velorex-files-transfer-via-local-network` | Flutter local-network file transfer (Windows, Android) |
| SkillForge AI | `skillforge` | `Editing-AI-tool` | Learns editing skills from tutorials; local AI |
| AgentOS | `agentos` | `Velorex-AI-agents-control-center` | Control center for a company's AI agents (Next.js, PostgreSQL) |
| Velorex AI for Sellers | `ai-for-sellers` | `Velorex-design-AI-for-sellers` | AI operating system for online sellers (Next.js, NestJS) |
| Locora | `locora` | `Velorex-Ecommece-platform` | Hyperlocal multi-vendor marketplace |
| PhotoLab Connect | `photolab-connect` | `Velorex-Photography software for digital labs` | Wedding photography marketplace and delivery tools |
| Qalb | `qalb` | `Velorex-Qalb-islamic prayer` | Islamic daily companion: web app, mosque display, phone app |
| Ustad AI | `ustad-ai` | `Velorex-Digital Ustaad\ustad-ai` | Urdu and Arabic teacher |
| VibeVault | `vibevault` | `Velorex-veloramovies-partners` | Private media network (interface prototype) |
| Halden | `halden` | `Velorex-Shopify themes\ecommerce` | Shopify Online Store 2.0 theme |
| *(experiment only)* Velorex Media Studio | — | `Velorex Design Media player` | C++20 / Qt 6 / libmpv suite. Shown on /work, no product page |

Every product is `in-development` today: none has a published download or a
live URL. Desktop products are distributed as **Windows `.exe` installers**;
browser products use platform `"Web"` (button says "Open in browser"). A
product can list several `downloads[]` (one per platform).

Ventures (in `src/data/ventures.ts`):

| Venture | State | Source of truth |
|---|---|---|
| Velorex Music | Live at `https://velorexmusic.com` | The live store |
| Velorex Design | Not live (`url: null`) | `Z:\AI-developed-softwares\velorex-design - Copy` |

## 2. Stack

- **Next.js 15 (App Router)** + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first config — tokens live in `src/app/globals.css` `@theme`, there is no `tailwind.config`)
- Fonts via `next/font/google`: Space Grotesk (display), Inter (body), JetBrains Mono (labels)
- **Zero runtime dependencies** beyond next/react/react-dom. No animation library, no UI kit, no icon library. Keep it that way.

## 3. Commands

```bash
npm run dev         # dev server on :3000
npm run build       # production build (also type-checks + lints)
npm run start       # serve the production build on :3000
npm run typecheck   # tsc --noEmit — run after every change
```

⚠️ **Never run `npm run build` while a dev or prod server is running.** Both
use `.next/`; building underneath a live server corrupts it (symptoms: every
route returns 500, `Cannot find module './611.js'`). Stop the server, then
`rm -rf .next && npm run build`. On Windows a stopped `npx` wrapper can leave
an orphaned `node.exe` holding port 3000 — check with
`Get-NetTCPConnection -LocalPort 3000` and stop that PID.

## 4. Directory map

```
src/
├── app/                        ROUTES (App Router). Each folder = a URL.
│   ├── layout.tsx              Root shell: fonts, metadata, theme boot script, Navbar, Footer, Cursor, RevealObserver
│   ├── template.tsx            Wraps every page in .page-enter → route transition animation
│   ├── globals.css             THE design system: tokens, light theme, every animation/keyframe
│   ├── page.tsx                Home
│   ├── products/page.tsx       /products — all products, alternating layout
│   ├── products/[slug]/page.tsx  /products/:slug — generated from data/products.ts
│   ├── ventures/page.tsx       /ventures — generated from data/ventures.ts
│   ├── services/page.tsx       /services
│   ├── work/page.tsx           /work — client case studies, then own "experiments"
│   ├── studio/page.tsx         /studio — about / story / principles / team / ecosystem
│   ├── team/page.tsx           /team
│   ├── contact/page.tsx        /contact — force-dynamic (reads env per request)
│   ├── legal/[slug]/page.tsx   /legal/privacy|terms|cookies — placeholder copy, noindex
│   ├── api/contact/route.ts    POST handler for the contact form
│   ├── sitemap.ts, robots.ts   SEO, generated from data
│   ├── icon.tsx, opengraph-image.tsx  Generated favicon + social card (no binary assets)
│   └── not-found.tsx           404
├── components/                 UI. Server components unless marked "use client".
├── data/                       ALL CONTENT. Edit here, not in components.
└── lib/                        Framework-free helpers shared by server + client
                                (reveal, theme, contact validation, rateLimit).
public/                         Static files. Installers go in public/downloads/ (create it when needed).
next.config.ts                  Security headers + Content-Security-Policy (docs/SECURITY.md).
```

### Components — what each one is

| File | Client? | Purpose |
|---|---|---|
| `Primitives.tsx` | no | `Container`, `Section` (tone `void`/`base`), `SectionHeader`, `Rule`, `Badge`, `SampleTag`, `ArrowRight/Down`, `TextLink` |
| `PageHero.tsx` | no | Opening block for every inner page; `SpecList` |
| `Hero.tsx` | no | Homepage hero (composes `HeroField`, `SignalFlow`, `Magnetic`) |
| `HeroField.tsx` | yes | Canvas node constellation behind the hero; drives the cursor spotlight vars `--hx/--hy` |
| `SignalFlow.tsx` | no | Idea → disciplines → VELOREX SVG diagram (CSS offset-path pulses) |
| `Navbar.tsx` | yes | Sticky nav, compact-on-scroll, mobile drawer (focus trap), scroll progress, 5-click logo easter egg ("studio mode") |
| `Footer.tsx` | no | Footer columns from `data/navigation.ts`, socials from `data/site.ts` |
| `Interactive.tsx` | yes | `Magnetic` (magnetic buttons/links), `Lumen` (cursor-tracked card glow), `Tilt` (3D tilt), `useRichPointer` |
| `Cursor.tsx` | yes | Custom cursor. Opt-in label: `data-cursor="label" data-cursor-label="Explore"` |
| `Reveal.tsx` | yes | `RevealObserver` — one global IntersectionObserver for all scroll reveals |
| `Icons.tsx` | no | The icon set (`Icon`, `IconTile`, `IconName` type) |
| `mockups/index.tsx` | no | CSS/SVG app mockups per product (`ProductMockup` picks by `product.mockup`). `GenericMockup` builds an identity card from the product's own data |
| `ProductCard.tsx` | no* | Product "mini launch" card (*rendered inside the client `ProductShowcase`) |
| `ProductShowcase.tsx` | yes | Horizontal snap rail: drag, keyboard, dots, prev/next |
| `Download.tsx` | no | `DownloadButton`, `DownloadPanel` — honest disabled state until an installer exists |
| `StudioSplit.tsx` | no | "Our Products" vs "Client Work" split cards |
| `Ventures.tsx` | no | Venture cards (home, /studio, /ventures) from `data/ventures.ts` |
| `FutureGrid.tsx` | no | Not-yet-built product directions |
| `ServicesSection.tsx` | no | `ServiceList` (home), `PipelineDiagram` (Idea→Grow) |
| `ProcessTimeline.tsx` | no | `ProcessTimeline` (5 steps, scroll-filled spine), `Principles` |
| `WorkPreview.tsx` | no | `WorkPreview` (home) + `CaseRow` (shared with /work) |
| `Team.tsx` | no | Team grid from `data/team.ts` |
| `TechnologyMarquee.tsx` | no | CSS marquee rows from `data/technologies.ts` |
| `VelocityBand.tsx` | yes | Giant marquee text reacting to scroll speed/direction |
| `ScrollWords.tsx` | no | Splits text into words lit by CSS scroll timelines |
| `ScrambleText.tsx` | yes | Decode-on-hover text (nav links) |
| `Constellation.tsx` | yes | Interactive ecosystem graph. Product nodes are generated from `data/products.ts` (label = `product.mark`) |
| `CTA.tsx` | no | Closing call-to-action section (props for lines/buttons) |
| `ContactForm.tsx` | yes | Validated form with idle/sending/success/error/unconfigured states, plus a hidden honeypot field |
| `ThemeToggle.tsx` | yes | Dark/light switch |

## 5. How data flows

```
src/data/*.ts  ──►  components  ──►  src/app/**/page.tsx  ──►  static HTML at build
     ▲
     └── the ONLY place content should be edited
```

- Pages are **server components** and are prerendered at build time
  (everything except `/contact` and `/api/contact`).
- Product pages come from `generateStaticParams()` over `products`.
- `sitemap.ts` reads `products`, so new products are indexed automatically.
- `navigation.ts` builds the footer's Products and Ventures columns from data.
- `Constellation.tsx` and the status list at the bottom of the homepage read
  `products` too. Nothing about a product is hard-coded outside `products.ts`.
- Client components are leaf-level islands (nav, cursor, canvas, rail, form).

## 6. Recipes

### Add a product
1. Append an object to `products` in `src/data/products.ts` (type `Product`).
   Required: `name, shortName, slug, mark, category, icon, status, tagline, description,
   features[] (each with icon, optional planned), stack, accent, accentSoft,
   mockup, downloads[]`. Write every field from the real project's own docs.
2. `mark`: one word, 7 letters or fewer. It is the node label on the ecosystem map.
3. `mockup`: reuse `"audio" | "recovery" | "disc" | "os" | "pixel"`, use `"generic"`
   (an identity card built from the product's data), or add a new mockup component
   to `components/mockups/index.tsx` + a case in `ProductMockup`.
4. `accent`: prefer a colour already in the palette (`#7c5cff #9d85ff #2ad4ff
   #ff5c8a #ffb547 #34d399 #ff6b35 #c4915e`). If it is a **new hex colour**, add
   its light-mode remap in `globals.css` (section "Light-mode contrast fixes") —
   both the `color:#hex` and `color: rgb(r, g, b)` forms.
5. Add a row to [docs/PRODUCTS.md](docs/PRODUCTS.md) and the table in section 1.

Automatic: homepage rail, `/products`, `/products/[slug]`, "Other products",
ecosystem map, homepage status list, footer, sitemap. The footer names the
first `FOOTER_PRODUCT_COUNT` products in the array, so order matters.

### Update a product when its project changes
Follow "How to re-sync a product" in [docs/PRODUCTS.md](docs/PRODUCTS.md).

### Add or change a venture
Edit `ventures` in `src/data/ventures.ts`. `url: null` renders "Coming soon";
a real URL renders "Live store" and links out. The homepage, `/studio`,
`/ventures` (one section per venture, anchored by `slug`) and the footer all
update. Only describe what the store really sells.

### Publish a downloadable `.exe`
1. Put the installer in `public/downloads/` (e.g. `velora-setup.exe`).
2. In `products.ts`, set that product's `downloads[0].url` to `"/downloads/velora-setup.exe"`, and fill `version` / `size`.
3. Fill `sha256` (`Get-FileHash file -Algorithm SHA256`) so the page shows a checksum.
4. Set the product's `status` to `"available"`.
5. The disabled "coming soon" button becomes a live download everywhere.

Never set `url` to a path that does not exist. Sign the installer first — see
[docs/SECURITY.md](docs/SECURITY.md) section 5. For a browser app, set `url` to
its live address instead (platform `"Web"`).

### Add a team member
Append to `team` in `src/data/team.ts`. `initials` drives the monogram; `photo`
(path under `public/`) is optional. Links with an empty `href` are hidden.
Dummy people must have `sample: true`.

### Add a client case study
Append to `clientWork` in `src/data/caseStudies.ts` (include `icon`). While
`clientWork` is non-empty, /work and the home section show "Selected Work";
if it is emptied they fall back to "Selected Experiments" automatically.

### Add an icon
Add a key to `PATHS` in `src/components/Icons.tsx` — 24×24 grid, strokes only
(`currentColor`), round caps. The key becomes part of the `IconName` type and is
usable from any data file. Keep path lengths under ~160 units (the draw-in
animation uses `stroke-dasharray: 160`).

### Add a page
1. Create `src/app/<route>/page.tsx`; export `metadata` with `title`,
   `description`, `alternates.canonical`.
2. Open with `<PageHero>`, build from `<Section tone>` + `<Container>` +
   `<SectionHeader>`, end with `<CTA>`.
3. Add it to `primaryNav` / `footerNav` in `data/navigation.ts` and to
   `staticRoutes` in `src/app/sitemap.ts`.

### Add a service
Append to `services` in `src/data/services.ts` (with `icon`). Appears on the
homepage list and /services.

### Change site-wide details
`src/data/site.ts`: domain (env `NEXT_PUBLIC_SITE_URL`), `email`,
`location`, `socials`, and `showSampleLabels`. `null` / empty values are hidden
by the UI, never faked.

## 7. Systems you must understand before editing

### Scroll reveal
- Server components opt in with `{...revealProps(delayMs)}` from **`@/lib/reveal`**.
- `RevealObserver` (in the layout) flips `data-reveal="pending"` → `"in"`.
- ⚠️ `revealProps` must stay in `src/lib/reveal.ts` (a plain module). Exporting
  it from a `"use client"` file breaks every server component that calls it
  ("Attempted to call revealProps() from the server"). The same rule applies to
  any helper that server components call — see `lib/theme.ts`.
- `h2.display` elements with `data-reveal` get a mask "wipe" instead of a fade.

### Motion
- Only `transform` and `opacity` are animated (plus `clip-path` for heading
  wipes). No layout-triggering animation.
- All keyframes live in `globals.css`. Scroll-driven effects
  (`.hero-exit`, `.sw`, `.spine-fill`, `.parallax`) use CSS scroll timelines
  inside `@supports (animation-timeline: scroll())` — other browsers show the
  final state.
- JS loops (`HeroField`, `VelocityBand`, `Cursor`) use one rAF each and stop
  when off-screen / tab hidden.
- **`prefers-reduced-motion` is honoured everywhere**: a global CSS block
  neutralises animation, and every JS effect checks the media query.

### Theming
- Dark is default and the brand experience. Light is opt-in via
  `ThemeToggle`, stored in `localStorage["velorex-theme"]`, applied before
  first paint by `themeBootScript` (`lib/theme.ts`) in `<head>`.
- Tokens: `--color-void/base/raise/panel/edge/ink/ink-dim/ink-mute/violet/violet-hi/electric/plasma`.
  Use Tailwind classes (`bg-void`, `text-ink-dim`, …) or `var(--color-*)`.
- Accents written as inline hex (product colours) are remapped for light mode
  by attribute selectors in `globals.css`.
- `.dark-island` (app mockups) keeps the dark palette in both themes.

### Typography rule
- `.display` + `.display-hero|xl|lg|md` → **headlines only** (a few words, 700
  weight, tight tracking).
- `.statement` → any sentence-length display copy (500 weight, normal tracking).
- `.lede` → body paragraphs. `.eyebrow` → mono labels.
Putting a paragraph in `.display` produces a cramped wall of heavy text.

### Section rhythm
Consecutive sections alternate `tone="void"` / `tone="base"` backgrounds. When
inserting a section, re-check the alternation of its neighbours.

### Typography gotcha: never use `text-base`
The theme defines a colour token `--color-base`, so Tailwind compiles
`text-base` to `color: var(--color-base)` — the page background — and the text
disappears. Use an explicit size (`text-[16px]`) instead.

### Security
`next.config.ts` sends a Content-Security-Policy and other security headers on
every response. Anything loaded from another origin (script, font, image,
embed) is blocked until it is allowed there. Details: [docs/SECURITY.md](docs/SECURITY.md).

### Contact form
- Client + server share `validateContact()` in `lib/contact.ts`. It must accept
  `unknown` values: the API receives arbitrary JSON.
- The API (`api/contact/route.ts`) checks same-origin, rate limit, content
  type, body size and a honeypot before validating.
- Delivery needs `CONTACT_WEBHOOK_URL` **or** `RESEND_API_KEY` (+
  `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`). See `.env.example`.
- Unconfigured → API returns **501** and the form says so up front. It must
  never show "success" for a message that went nowhere.

## 8. Content rules (non-negotiable)

These come from the original brief and protect the company's credibility.

- **Don't invent** clients, testimonials, awards, revenue, user counts,
  downloads, employees, locations or partnerships as if they were real.
- Product `status` and `features[].planned` must reflect reality.
- Recovery copy must never imply guaranteed recovery.
- Technologies in `data/technologies.ts` must actually be used.
- **Dummy data** is allowed only when marked: `sample: true` on team members
  and case studies (renders a "Sample" tag while `site.showSampleLabels` is
  true) and `// DUMMY` comments on placeholder URLs/values.

## 9. Placeholders still to replace before launch

Search for `DUMMY` and `TODO` in `src/`.

The maintained list is [docs/STATUS.md](docs/STATUS.md). In short:

- `site.ts`: owned domain configured; email (`null`), location (`null`), socials (empty)
- `team.ts`: three sample members; Aijaz Khan's links (empty)
- `caseStudies.ts`: no published client case studies; own-project experiments are shown.
- `products.ts`: `downloads[].url/version/size` (all `null`)
- `legal/[slug]/page.tsx`: placeholder legal copy
- Contact delivery env vars

## 10. Before you say a change is done

1. `npm run typecheck` passes.
2. Stop servers → `rm -rf .next && npm run build` passes.
3. `npm run start` and every route returns 200 (`/nope` → 404):
   `/ /products /ventures /services /work /studio /team /contact /legal/privacy /sitemap.xml /robots.txt`
   and every `/products/<slug>` (slugs are in section 1).
4. Check both themes (toggle in the nav) and a ~375px-wide viewport.
5. No new runtime dependency was added.
6. [docs/STATUS.md](docs/STATUS.md) is updated if a to-do was finished or added.
