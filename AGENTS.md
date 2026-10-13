# AGENTS.md — start here

For any AI coding agent or new developer opening this project. This file is
short on purpose: it tells you what to read and the rules that cannot wait.

## What this is

The official website of **Velorex Studio** (legal name *Velorex Design IT
Services*, founder Aijaz Khan). Next.js 15 App Router, React 19, TypeScript,
Tailwind CSS v4. No other runtime dependencies.

## Read these, in this order

| File | Read it for |
|---|---|
| [CLAUDE.md](CLAUDE.md) | The full guide: structure, systems, recipes, rules. **Read before editing.** |
| [docs/STATUS.md](docs/STATUS.md) | What is finished and what is still placeholder |
| [docs/PRODUCTS.md](docs/PRODUCTS.md) | Which real project on disk each product and venture comes from |
| [docs/CONTENT.md](docs/CONTENT.md) | How to change text, products, team, ventures |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Rendering, data flow, motion, theming, contact pipeline |
| [docs/SECURITY.md](docs/SECURITY.md) | Security headers, contact API protection, publishing installers |

## Seven rules that cannot wait

1. **Content lives in `src/data/`.** Change text there, not in components.
2. **Do not invent facts.** No made-up clients, numbers, awards, features or
   release dates. A product's `status` and each feature's `planned` flag must
   match the real project. Dummy data must be marked `sample: true`.
3. **The owned domain is velorexstudio.com; no company inbox is confirmed.**
   Do not invent an email address. `site.email` is `null` on purpose.
4. **Never run `npm run build` while a dev or production server is running.**
   They share `.next/` and the build corrupts the live server. Stop it first.
5. **Do not add runtime dependencies.** No animation, UI or icon libraries.
6. **Helpers called by server components must not live in a `"use client"`
   file** (see `src/lib/reveal.ts`, `src/lib/theme.ts`).
7. **Do not use the Tailwind class `text-base`.** This project has a colour
   token named `base`, so that class sets the text colour to the page
   background and the text disappears. Use an explicit size such as
   `text-[16px]`.

## Before you say a change is done

```bash
npm run typecheck
# stop any running server, then:
rm -rf .next && npm run build
npm run start      # check the routes listed in CLAUDE.md section 10
```

Then update [docs/STATUS.md](docs/STATUS.md) if you finished or added a to-do.
