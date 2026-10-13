# Architecture

How the Velorex Studio website works internally. For the quick orientation and
change recipes, start with [CLAUDE.md](../CLAUDE.md).

---

## 1. Request → page

```
Browser ──► Next.js App Router
              │
              ├─ layout.tsx ............ <html>, fonts, <head> theme boot script
              │    ├─ Cursor ........... (client) custom cursor
              │    ├─ RevealObserver ... (client) scroll reveals for the whole page
              │    ├─ Navbar ........... (client)
              │    ├─ <main>
              │    │    └─ template.tsx  .page-enter wrapper → route transition
              │    │         └─ page.tsx  (server) the route itself
              │    └─ Footer ........... (server)
              │
              └─ api/contact/route.ts .. POST only, runs on the server
```

Build output (from `npm run build`):

| Route | Rendering |
|---|---|
| `/`, `/products`, `/ventures`, `/services`, `/work`, `/studio`, `/team` | Static (prerendered) |
| `/products/[slug]`, `/legal/[slug]` | SSG via `generateStaticParams` |
| `/contact` | Dynamic (`force-dynamic`) so it reads delivery env vars per request |
| `/api/contact` | Dynamic route handler |
| `/sitemap.xml`, `/robots.txt`, `/icon`, `/opengraph-image` | Generated metadata routes |

Homepage first-load JS is about 129 kB, of which about 103 kB is the shared
framework chunk.

## 2. Data layer

Everything a visitor reads comes from `src/data/`:

```
site.ts ............ brand, domain, email, socials, showSampleLabels
products.ts ........ Product[] + FutureProduct[] + statusLabel + FOOTER_PRODUCT_COUNT
ventures.ts ........ Venture[] (non-software businesses)
services.ts ........ Service[], pipeline stages + icons, process steps, principles
caseStudies.ts ..... clientWork: CaseStudy[] + experiments: Experiment[]
team.ts ............ TeamMember[], teamNote, hiring flag
technologies.ts .... techGroups (marquee rows)
navigation.ts ...... primaryNav (header), footerNav (footer columns; Products and Ventures generated)
```

Who consumes what:

```
products.ts ──► ProductShowcase/ProductCard (home rail)
            ├─► products/page.tsx, products/[slug]/page.tsx
            ├─► FutureGrid (futureProducts)
            ├─► Constellation (one node per product, label = mark)
            ├─► app/page.tsx (status list: Shipping / In development / Planned)
            ├─► navigation.ts (footer Products column)
            └─► sitemap.ts

ventures.ts ──► Ventures (home, /studio, /ventures), ventures/page.tsx, navigation.ts (footer)

services.ts ──► ServiceList, PipelineDiagram, ProcessTimeline, Principles
caseStudies ──► WorkPreview (home), work/page.tsx
team.ts ──────► Team (home, /studio, /team), team/page.tsx (disciplines band)
site.ts ──────► layout metadata, Footer, Contact, SampleTag, robots, sitemap, API
navigation ───► Navbar, Footer
```

Hard-coded exceptions to keep in sync by hand:
- `HeroField.tsx` `NODE_LABELS` (generic discipline words, not product names)
- `Constellation.tsx` `FUTURE` (the three dashed "direction" nodes)

`Constellation.tsx` places product nodes evenly on an ellipse, so it copes with
any number of products. Labels come from `product.mark`; keep marks to one
short word or neighbouring labels will collide.

## 3. Server/client boundary

Default is **server components** (zero JS shipped). Client components exist
only where the browser is needed:

| Needs the browser for… | Component |
|---|---|
| scroll position, drawer state, focus trap | `Navbar` |
| pointer tracking | `Cursor`, `Interactive` (`Magnetic`, `Lumen`, `Tilt`) |
| canvas | `HeroField` |
| scroll/drag rail | `ProductShowcase` |
| rAF animation | `VelocityBand`, `ScrambleText` |
| hover state graph | `Constellation` |
| form state + fetch | `ContactForm` |
| localStorage | `ThemeToggle` |
| IntersectionObserver | `RevealObserver` |

**Rule:** a server component may *render* a client component, but may not
*call a function* exported from a `"use client"` module. That's why
`revealProps` lives in `lib/reveal.ts` and `themeBootScript` in `lib/theme.ts`.

## 4. Motion system

Motion is split into three layers, all in `src/app/globals.css`.

**Layer 1: entrances (CSS, time-based)**
- `.rise`: hero headline lines (staggered with the `--d` custom property)
- `.fade-up`: page-hero elements
- `[data-reveal]`: scroll reveals, toggled by `RevealObserver`; stagger via `--reveal-delay`
- `h2.display[data-reveal]`: clip-path "wipe" for headings
- `.page-enter`: route transition (`template.tsx`)
- `.draw-line`: SVG lines drawing themselves when their reveal fires
- Icon tiles: strokes draw in on reveal

**Layer 2: ambient loops (CSS)**
- `aurora-a/b` lighting, `pulse-dot`, `breathe`, `float-y`, `grad-drift`, marquees, and the mockup animations (`eq-bar`, `scan-y`, `caret`)

**Layer 3: interactive and scroll-driven**
- CSS scroll timelines (progressive enhancement): `.hero-exit`, `.sw` (ScrollWords), `.spine-fill`, `.parallax`
- JS: `HeroField` (canvas), `VelocityBand` (scroll velocity), `Cursor`, `Magnetic`, `Tilt`, `Lumen` (`--mx/--my`), `ScrambleText`

Performance contract:
- Animate `transform` and `opacity` only (`clip-path` for heading wipes).
- Each JS effect has one rAF loop, paused off-screen (IntersectionObserver) and when the tab is hidden.
- Pointer effects only run with `(pointer: fine)`, so touch devices skip them.
- The canvas caps its DPR at 2 and scales its node count with the viewport.

Accessibility contract:
- The `@media (prefers-reduced-motion: reduce)` block neutralises CSS motion and forces reveals visible.
- Every JS effect checks `matchMedia("(prefers-reduced-motion: reduce)")`.
- Decorative layers are `aria-hidden`. Split or scrambled text always has an `sr-only` copy.
- Focus is always visible (`:focus-visible`); there's a skip link, the mobile drawer traps focus and closes on Escape, and nav links carry `aria-current`.

## 5. Theme system

```
<head> themeBootScript ─► reads localStorage["velorex-theme"]
                          └─ "light" → <html data-theme="light"> before first paint
ThemeToggle ─► flips data-theme, saves it, dispatches "resize" so the canvas repaints
```

- `@theme { … }` defines the dark tokens, which Tailwind v4 turns into utilities.
- `:root[data-theme="light"] { … }` overrides the same tokens.
- **Inline accent hex remap:** product and section colours are passed as inline
  styles (`style="color:#2ad4ff"`). Light mode matches those with attribute
  selectors and swaps in darker shades. Both serialisations must be listed:
  SSR produces `color:#2ad4ff`, while client-rendered React produces
  `color: rgb(42, 212, 255)`.
- **`.dark-island`:** app mockups re-declare the dark tokens so they look
  identical in both themes. They're excluded from the accent remap with `:not(.dark-island *)`.
- The canvas (`HeroField`) reads `data-theme` every frame to pick node and label lightness.

## 6. Contact pipeline

```
ContactForm (client)
  ├─ validateContact() ── field errors inline, focus moves to first error
  └─ POST /api/contact   (body includes the hidden honeypot field)
        ├─ other origin ───► 403
        ├─ > 5 in 10 min ──► 429 + Retry-After
        ├─ not configured ─► 501 {reason:"not-configured"} ─► form says it cannot send
        ├─ not JSON ───────► 415      body > 16 KB ─► 413      honeypot filled ─► 400
        ├─ invalid ────────► 422 {errors}                   ─► field errors
        ├─ webhook set ────► POST JSON to CONTACT_WEBHOOK_URL
        ├─ resend set ─────► Resend email API
        ├─ delivery fails ─► 502                            ─► error banner + mailto
        └─ ok ─────────────► 200                            ─► success state
```

`/contact` also renders a "Setup required" notice up front when delivery isn't
configured, so visitors aren't surprised after typing a message.

## 7. SEO

- The owned production domain is `https://velorexstudio.com`; `NEXT_PUBLIC_SITE_URL` can override it before building.
- The root `metadata` in `layout.tsx` sets the title template (`%s — Velorex Studio`), OG, Twitter, robots and `metadataBase` (`site.url`).
- Each page exports its own `metadata` with a canonical URL. Inner pages use `lib/metadata.ts` for matching social titles, descriptions and URLs. The homepage includes factual Organization JSON-LD from `data/seo.ts`.
- `sitemap.ts` combines the static routes with every product. `robots.ts` disallows `/api/`; legal pages remain crawlable with explicit noindex metadata.
- The favicon (`icon.tsx`) and share card (`opengraph-image.tsx`) are generated with `next/og`, so there are no binary assets to maintain.

## 8. Security

`next.config.ts` adds a Content-Security-Policy, `X-Frame-Options: DENY`,
`nosniff`, HSTS (production), a Permissions-Policy and download/API-specific
headers. The contact route layers same-origin, rate-limit, size, honeypot and
strict validation checks. The full description, known limits and the
pre-launch list are in [SECURITY.md](SECURITY.md).

## 9. Design decisions (and why)

| Decision | Reason |
|---|---|
| No animation or UI library | Keeps JS minimal. Everything needed is CSS transforms plus a few small rAF loops |
| Mockups drawn in CSS/SVG, not screenshots | No image weight, themeable, animatable, never out of date with a stale screenshot |
| Content in `src/data/` only | Non-developers (and AI) can add products or people without touching UI code |
| Honest states everywhere (planned features, disabled downloads, 501 contact) | The brief forbids fake claims, and the site represents a real company |
| `sample: true` + visible tag for dummy data | Dummy content can't silently ship as if real |
| Ecosystem map, status list and footer generated from data | Adding a product is one edit; nothing can drift out of sync |
| No placeholder domain, email or social links | A made-up address can end up pointing at someone else's property |
| CSS scroll timelines as enhancement | Zero JS for scroll effects; unsupported browsers still get a complete static page |
