# Content guide

How to change what the website says, with no knowledge of React needed.
Every edit below happens in **one file** under `src/data/`. After editing, run
`npm run typecheck`: if you made a typo, it tells you the exact line.

---

## Company details: `src/data/site.ts`

| Field | What it controls | Current value |
|---|---|---|
| `url` | Canonical links, sitemap, share previews | `https://velorexstudio.com`; env `NEXT_PUBLIC_SITE_URL` can override before building |
| `email` | Footer, contact page, mailto fallbacks. `null` hides it everywhere | `null` — no company inbox yet |
| `location` | Contact page. `null` hides it | `null` |
| `socials` | Footer links. An empty list shows nothing | empty — add `{ label, href }` entries for real profiles only |
| `showSampleLabels` | Shows a "Sample" tag on every dummy team member and case study | `true` |

## Products: `src/data/products.ts`

Each product is one object. The fields you'll edit most:

```ts
{
  name: "Velora",
  shortName: "Velora",            // used in buttons: "Explore Velora"
  slug: "velora",                 // URL: /products/velora — don't change after launch
  category: "Music & Media",
  icon: "music",                  // any name from src/components/Icons.tsx
  status: "in-development",       // "available" | "beta" | "in-development" | "planned"
  tagline: "One line for cards.",
  description: "First sentence becomes the lead statement. The rest becomes body text.",
  features: [
    { label: "Native libmpv playback engine", icon: "play" },
    { label: "Advanced equaliser", icon: "sliders", planned: true },  // shows as "Planned"
  ],
  stack: ["C++20", "Qt 6"],
  mark: "MUSIC",                  // one short word: its label on the ecosystem map
  accent: "#7c5cff",              // the product's colour
  mockup: "generic",              // or "audio" | "recovery" | "disc" | "os" | "pixel"
  downloads: [{ platform: "Windows", requirement: "...", url: null, version: null, size: null }],
  note: "Optional small print on the product page.",
}
```

The 16 products and the project each one is written from are listed in
[PRODUCTS.md](PRODUCTS.md). Keep each entry true to its project.

Order matters: the footer names the first six products in the list.

### Making a download live
1. Copy the installer into `public/downloads/`, e.g. `public/downloads/velora-setup.exe`.
2. Set `url: "/downloads/velora-setup.exe"`, plus `version: "1.1.0"`, `size: "95 MB"` and
   `sha256: "…"` (from `Get-FileHash file -Algorithm SHA256`).
3. Rebuild. The "coming soon" button becomes "Download for Windows".

Sign the installer before publishing it; see [SECURITY.md](SECURITY.md) section 5.
For a browser app (platform `"Web"`), set `url` to its live address instead and
the button reads "Open in browser".

### When a product ships
Change `status` to `"available"`, remove `planned: true` from features that now
exist, and make the download live.

## Coming-next products: `futureProducts` in `products.ts`

These are directions only (no product page). Each has a `mark`, `icon`,
`title`, `blurb` and a `stage` of `"Coming next"` or `"In exploration"`.

## Ventures: `src/data/ventures.ts`

Non-software businesses (currently Velorex Music and Velorex Design).

```ts
{
  slug: "music",                  // anchor on the page: /ventures#music
  name: "Velorex Music",
  tagline: "One line under the name.",
  description: "Card text.",
  icon: "music",
  accent: "#ff6b35",
  url: "https://velorexmusic.com", // null = not live → shows "Coming soon"
  categories: ["Vinyl LPs", "Audio Cassettes"],
  headline: "Heading of the long section on /ventures",
  story: "Paragraph under that heading.",
  highlights: [{ title: "Vinyl LPs", desc: "One sentence." }],  // the four small cards
}
```

Describe only what the store really sells. No shipping, sourcing or health
claims the store itself doesn't make.

## Team: `src/data/team.ts`

```ts
{
  name: "Aijaz Khan",
  role: "Founder & CEO · Senior Graphic Designer",
  initials: "AK",                 // shown in the monogram
  focus: "What they actually work on.",
  disciplines: ["Graphic Design", "Brand", "Product", "Engineering"],
  accent: "#7c5cff",
  photo: "/team/aijaz.webp",      // optional; put the image in public/team/
  links: [{ label: "LinkedIn", href: "https://…" }],   // empty href = hidden
  sample: true,                   // ONLY for dummy people; remove for real ones
}
```

The first person gets the wide card. The team shows on the homepage, `/studio`
and `/team`.

## Work: `src/data/caseStudies.ts`

- `clientWork`: empty after removing the three fictional samples on 13 October 2026. Add only real, approved client projects. Home and /work currently show own-project experiments.
- `experiments`: Velorex's own product work (real).

Each entry has `name`, `industry` (or `kind`), `year`, `icon`, `challenge`,
`solution`, `technology[]`, `result` (use `null` if there's no measured
result), `accent`.

## Services, process, principles: `src/data/services.ts`

- `services`: the five client service categories (title, icon, summary, items).
- `pipeline` + `pipelineIcons`: the Idea → Grow diagram.
- `process`: the five "How we work" steps.
- `principles`: the five "Why Velorex" positions.

## Technology: `src/data/technologies.ts`

Two marquee rows. Only list technology that is genuinely used.

## Navigation: `src/data/navigation.ts`

- `primaryNav`: header links.
- `footerNav`: footer columns. The "Products" and "Ventures" columns are generated from the data files; the others are edited by hand.

## Icons

Available icon names are the keys in `src/components/Icons.tsx`, grouped as:
disciplines (`web code desktop ai automation design layers cloud database shield palette terminal cube`),
process (`search build check rocket grow idea`),
principles (`compass blocks cpu human users flask`),
media (`music play disc library queue convert record wave sliders visualizer sparkles hires`),
recovery (`restore drive scan partition eye hex copy usb`),
writing (`feather markdown note document focus folder export text`),
industries (`truck health bag store wood`),
platforms (`phone android image`),
utility (`mail clock pin chat building download`).

## Before launch checklist

The maintained version of this list, with more detail, is [STATUS.md](STATUS.md).

- [ ] A registered domain (`NEXT_PUBLIC_SITE_URL`), a real email and social URLs in `site.ts`
- [ ] Real portfolio / LinkedIn for Aijaz Khan in `team.ts`
- [ ] Sample team members replaced or removed
- [ ] Sample case studies replaced or removed
- [ ] `showSampleLabels` still `true` until the above are done
- [ ] Installers published, or downloads left as "coming soon"
- [ ] Legal pages rewritten and reviewed
- [ ] Contact delivery configured (see `.env.example`)
- [ ] Security list in [SECURITY.md](SECURITY.md) section 7 done
