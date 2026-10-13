# Project status

What is finished, what is still placeholder, and what has to happen before the
website can go online. Update this file when any of it changes.

Last updated: **13 October 2026**.

---

## Where things stand

The owner has registered **velorexstudio.com** and created
https://github.com/aijazamaankhan/velorexstudio. The local project is connected
to that history and configured for Hostinger Node.js hosting. Hosting access,
plan, DNS and deployment have not been verified. No company inbox is confirmed.
See [DEPLOYMENT.md](DEPLOYMENT.md).

Verified on 7 October 2026 against a clean production build:

- `npm run typecheck` passes.
- `npm run build` passes (34 static pages).
- All 31 routes return 200; unknown URLs return 404.
- The contact API rejects every malformed request it was tested with.

Not verified by a person: a visual pass of every page in both themes and at
phone width after the 7 October changes.

## Done

| Area | State |
|---|---|
| Pages | Home, `/products`, 16 product pages, `/ventures`, `/services`, `/work`, `/studio`, `/team`, `/contact`, 3 legal pages, 404 |
| Products | 16 real products, each synced with its source project ([PRODUCTS.md](PRODUCTS.md)) |
| Ventures | Velorex Music (live store) and Velorex Design (coming soon), driven from `src/data/ventures.ts` |
| Design system | Dark and light themes, scroll reveals, custom cursor, hero canvas, CSS/SVG mockups, reduced-motion support |
| Automatic content | Product rail, product pages, ecosystem map, homepage status list, footer product and venture links, sitemap |
| Contact form | Validation, honeypot, rate limit, same-origin check, webhook or Resend delivery |
| Security | Security headers and a Content-Security-Policy, hardened contact API, patched Next.js ([SECURITY.md](SECURITY.md)) |
| SEO | Per-page metadata, generated sitemap, robots, favicon and share card |

## Left to do before launch

### Needs a decision or real information from the owner

| # | Item | Where |
|---|---|---|
| 1 | Domain registered; verify Hostinger DNS and set `NEXT_PUBLIC_SITE_URL=https://velorexstudio.com` | `.env.local` / host environment |
| 2 | **Company email address** (currently `null`, so no email is shown anywhere) | `src/data/site.ts` |
| 3 | **Social profile links** (currently empty, so none are shown) | `src/data/site.ts` |
| 4 | **Aijaz Khan's portfolio / LinkedIn links** (currently empty) | `src/data/team.ts` |
| 5 | **Three sample team members** (Sara Mehta, Daniel Okafor, Lena Varga): replace with real people or delete | `src/data/team.ts` |
| 6 | **Three fictional case studies** (Northwind, Lumen Health, Atelier Rowe): replace with real client work or delete | `src/data/caseStudies.ts` |
| 7 | **Location** (currently `null`) and phone, if wanted | `src/data/site.ts` |
| 8 | **Publish Velora 1.1.0?** The installer is built but not on the website | [PRODUCTS.md](PRODUCTS.md), `src/data/products.ts` |
| 9 | **Legal pages**: privacy, terms and cookies are placeholder text and need to be written and reviewed | `src/app/legal/[slug]/page.tsx` |

Items 5 and 6 show a visible "Sample" tag on the page while
`site.showSampleLabels` is `true`. Do not turn that off until they are replaced.

### Technical

| # | Item | Notes |
|---|---|---|
| 10 | Contact delivery | Set `CONTACT_WEBHOOK_URL`, or `RESEND_API_KEY` + `CONTACT_TO_EMAIL` + `CONTACT_FROM_EMAIL`. Until then the form says it cannot send. |
| 11 | Hosting | Pick a host. Follow the "Before the site goes online" list in [SECURITY.md](SECURITY.md). |
| 12 | Version control | Source pushed to the owner-created repository (47c325d). Confirm repository visibility. |
| 13 | Downloads | Every product's `downloads[].url` is `null` and `public/downloads/` does not exist. Sign and checksum installers before publishing ([SECURITY.md](SECURITY.md) section 5). |
| 14 | Hand-drawn mockups | Only the first five products have their own mockup. The other eleven use the generic identity card. Optional polish. |
| 15 | Next.js 16 | Needed to clear the last `npm audit` advisory. A breaking upgrade; do it separately. |
| 16 | Visual check | Both themes, ~375px width, all pages. |

## Change log

### 13 October 2026

- Configured the owned production domain and documented Hostinger Node.js deployment.
- Declared Node.js 22/24 support and excluded all environment files except the example from Git.
- Connected local Git to existing main history, preserving the three uploaded HTML files.
- Added GitHub Actions checks on Node.js 22 (typecheck and production build).
- Local verification passed: typecheck, clean production build (34 pages), 31 route responses, 404 handling, canonical/sitemap domain, CSP headers, cross-origin contact rejection (403), and unconfigured delivery response (501).
- npm audit reports 2 unresolved findings (1 moderate, 1 high) involving bundled PostCSS; its proposed automatic fix upgrades Next.js to 16.
- Visual checks, actual email receipt, hosting access, DNS and live deployment remain unverified.


### 7 October 2026

- **Products:** added 11 products from `Z:\AI-developed-softwares\` (USB Hub,
  LanBeam, SkillForge AI, AgentOS, AI for Sellers, Locora, PhotoLab Connect,
  Qalb, Ustad AI, VibeVault, Halden). Updated Velora (crossfade and gapless now
  built, audio CD playback, 15 decks) and renamed Recovery Studio to Velorex
  Recovery Intelligence with its current feature set.
- **Ventures:** rewrote the copy from the live Velorex Music store and the
  Velorex Design site. Removed claims that could not be verified (worldwide
  shipping, sourcing, wellness benefits). The `/ventures` page is now generated
  from data.
- **No domain:** removed the placeholder domain, email address and social links
  that pointed at addresses Velorex does not own.
- **Automatic content:** the ecosystem map, homepage status list and footer
  links are now generated from data instead of being hand-edited.
- **Security:** added security headers and a CSP, hardened the contact API,
  updated Next.js 15.5.4 → 15.5.27.
- **Bugs fixed:**
  - The contact API crashed with a 500 when a field was not text.
  - Select fields accepted any value, not just the listed options.
  - Two lines of text on `/ventures` used a class that set the text to the
    background colour.
  - Browser-app products were told there was "no installer to download".
  - The footer's Velorex Design link pointed at the homepage instead of its section.
  - `/ventures` showed a hard-coded "Live Store" badge and store address
    regardless of the data.
  - Stale comments in `caseStudies.ts` and `products.ts` said the opposite of
    what the code did.
- **Docs:** added `AGENTS.md`, `docs/PRODUCTS.md`, `docs/SECURITY.md` and this file.
- **Velorex Sentinel 1.1.0** (a separate project, in the folder
  `Z:\AI-developed-softwares\Velorex USB Hub`): renamed from Velorex USB Hub,
  added the USB ports page and the PC watch. Its product page here was renamed
  to match and moved from `/products/usb-hub` to `/products/sentinel`.

### 20–21 September 2026

- Added the Ventures page, component and data.

### 18–19 September 2026

- Initial build of the website with five products.
