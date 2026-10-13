# Velorex Studio: official website

The website of **Velorex Studio** (Velorex Design IT Services), a product and
technology studio that builds its own software and builds software for clients.

**Status:** owned domain `velorexstudio.com`; Hostinger deployment preparation.
See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for settings and
[docs/STATUS.md](docs/STATUS.md) for remaining launch work.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4.
There are no other runtime dependencies.

## Run it

Use Node.js 22 or 24 (Hostinger: select 22).

```bash
npm ci
npm run dev          # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

> Don't run `build` while `dev` or `start` is running. They share `.next/`,
> and a live server corrupts the build (every page returns 500). If it happens:
> stop the server, delete `.next`, then build again.

## Configure

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_SITE_URL`: `https://velorexstudio.com` (also the default)
- `CONTACT_WEBHOOK_URL` **or** `RESEND_API_KEY` + `CONTACT_TO_EMAIL` + `CONTACT_FROM_EMAIL`: makes the contact form deliver messages. Without them, the form says it isn't connected and says so up front.

## Pages

| URL | Page |
|---|---|
| `/` | Home |
| `/products` | All products |
| `/products/<slug>` | 16 product pages, generated from data ([list](docs/PRODUCTS.md)) |
| `/ventures` | Velorex Music and Velorex Design |
| `/services` | Client services |
| `/work` | Case studies + own product work |
| `/studio` | About the studio |
| `/team` | Team |
| `/contact` | Contact form |
| `/legal/privacy`, `/legal/terms`, `/legal/cookies` | Legal (placeholder copy) |

Inventory and decisions: [docs/INVENTORY.md](docs/INVENTORY.md).
SEO setup: [docs/SEO.md](docs/SEO.md).

## Editing content

All content lives in `src/data/`. You never need to touch components to add
a product, a venture, a team member, a case study or a download. See
**[docs/CONTENT.md](docs/CONTENT.md)**.

## Documentation

| File | For |
|---|---|
| [AGENTS.md](AGENTS.md) | One-page starting point for AI agents and new developers |
| [CLAUDE.md](CLAUDE.md) | Developers and AI assistants: structure, rules, recipes, gotchas |
| [docs/STATUS.md](docs/STATUS.md) | What is done, what is left, change log |
| [docs/PRODUCTS.md](docs/PRODUCTS.md) | Which project on disk each product and venture comes from |
| [docs/SECURITY.md](docs/SECURITY.md) | Security headers, contact API protection, publishing installers safely |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | How rendering, data, motion, theming and the contact pipeline work |
| [docs/CONTENT.md](docs/CONTENT.md) | Editing content, publishing installers, pre-launch checklist |

## Before launch

The site still contains **clearly marked sample team members**. Fictional client
case studies have been removed; the portfolio shows real own-project work. There
is no confirmed company email or social link yet, so none is shown. Work through
[docs/STATUS.md](docs/STATUS.md) and the security list in
[docs/SECURITY.md](docs/SECURITY.md).
