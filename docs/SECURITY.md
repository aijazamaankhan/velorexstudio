# Security

What protects the Velorex Studio website, what does not, and what to do before
it goes online. Read this before changing `next.config.ts`, the contact API, or
anything that loads content from another origin.

No website or app can be made impossible to attack. The aim here is a small
attack surface, safe defaults, and no secrets in the code.

---

## 1. Why the attack surface is small

- **Static pages.** Every page except `/contact` is plain HTML built ahead of
  time. There is no database, no login, no user accounts and no admin panel.
- **One endpoint takes input:** `POST /api/contact`.
- **No third-party scripts.** No analytics, no embeds, no CDN. Fonts are
  self-hosted by `next/font`.
- **Three runtime dependencies:** `next`, `react`, `react-dom`. Fewer packages
  means fewer supply-chain risks. Keep it that way.

## 2. Security headers (`next.config.ts`)

Sent on every response.

| Header | What it stops |
|---|---|
| `Content-Security-Policy` | Scripts, styles, images, fonts, frames and form posts are limited to this site's own origin. Injected markup cannot load an attacker's script or send form data elsewhere. |
| `X-Frame-Options: DENY` + `frame-ancestors 'none'` | Clickjacking: no other site can show this one inside a frame. |
| `X-Content-Type-Options: nosniff` | The browser guessing a file is a script when it is not. |
| `Strict-Transport-Security` (production only) | Downgrade to plain HTTP once a visitor has loaded the site over HTTPS. |
| `Referrer-Policy` | Full page URLs leaking to other sites. |
| `Permissions-Policy` | Any script asking for camera, microphone, location, payment, USB or sensors. |
| `Cross-Origin-Opener-Policy` | Other windows keeping a handle on this one. |
| `/downloads/*` → `Content-Disposition: attachment` | Installers opening or running in the browser instead of downloading. |
| `/api/*` → `Cache-Control: no-store` | Form responses being cached. |

`X-Powered-By` is switched off, so the server does not announce its framework.

### Known limit of the CSP

`script-src` includes `'unsafe-inline'`. Next.js prerendering emits inline
bootstrap scripts, and the theme boot script in `<head>` is inline too. A
stricter nonce-based policy needs middleware and would make every page
dynamic. This is an accepted trade-off while the site renders no user-supplied
content anywhere.

### If you add something from another origin

A new analytics script, video embed, map, font or image host will be **blocked**
until it is added to the matching CSP directive in `next.config.ts`. Add the
exact origin, never `*`.

## 3. Contact API (`src/app/api/contact/route.ts`)

Checks run in this order. Each one was tested against the production build.

| Check | Response |
|---|---|
| Request comes from another website (`Origin` does not match) | 403 |
| More than 5 submissions in 10 minutes from one address | 429 with `Retry-After` |
| Delivery is not configured | 501 (the form says so up front) |
| Body is not JSON | 415 |
| Body is larger than 16 KB | 413 |
| Body is not a JSON object | 400 |
| Hidden honeypot field is filled (bots) | 400 |
| A field is missing, too long, not text, or a select value is not one of the form's options | 422 |
| Delivery provider fails or takes longer than 10 seconds | 502 |

Also:

- Values are trimmed and control characters are stripped from single-line
  fields, so nothing can inject extra lines into the email subject.
- A webhook URL must be `https://`.
- On failure only the error reason is logged, never the visitor's message or
  email address.
- Shared validation lives in `src/lib/contact.ts` and runs on both the browser
  and the server. The server never trusts the browser's check.

### Limit of the rate limiter

`src/lib/rateLimit.ts` counts in the server's memory. That works for one
running server (`next start`, a VPS, a container). On serverless hosting every
instance has its own counter, so the limit is looser. In that case turn on the
host's own rate limiting or bot protection as well.

It reads the visitor's address from `X-Forwarded-For`. That header is only
trustworthy behind a proxy or host that sets it. Do not expose the Node server
directly to the internet without one.

## 4. Secrets

- Secrets go in `.env.local`, which is git-ignored. `.env.example` lists the
  names with no values.
- Only variables starting with `NEXT_PUBLIC_` reach the browser. **Never** give
  a secret that prefix.
- `RESEND_API_KEY` and `CONTACT_WEBHOOK_URL` are read only in the server route.
- Nothing secret is stored in `src/`.

## 5. Publishing installers safely

People will run these files on their own computers, so this matters more than
anything on the website itself.

1. **Build on a clean, trusted machine** from a known state of the source.
2. **Sign the installer** with a code-signing certificate. Unsigned installers
   trigger Windows SmartScreen warnings and cannot be told apart from a
   tampered copy.
3. **Scan the file** before publishing.
4. **Publish its SHA-256** next to the download. Compute it with
   `Get-FileHash .\installer.exe -Algorithm SHA256` and put the value in that
   download's `sha256` field in `src/data/products.ts`. The product page shows
   it so people can verify what they downloaded.
5. **Android:** publish only a release-signed APK. Never a debug build.
6. Serve downloads over HTTPS only.

## 6. Dependencies

Run `npm audit` before each release.

- `next` was updated from 15.5.4 to **15.5.27** on 7 October 2026, which cleared
  a critical advisory.
- One advisory remains: an old `postcss` bundled **inside** Next.js 15. It is
  used at build time on this project's own CSS, not on visitor input. Clearing
  it means moving to Next.js 16, which is a breaking upgrade and should be done
  as its own task.

## 7. Before the site goes online

- [ ] Host it behind HTTPS (the HSTS header assumes this).
- [ ] Host it behind a proxy or platform that sets `X-Forwarded-For`.
- [ ] Turn on the host's rate limiting / bot protection for `/api/contact`.
- [ ] Set contact delivery secrets in the host's environment, not in a file in the repository.
- [ ] Put the project in a **private** git repository, so changes are tracked and reviewable. The local project is connected to the owner-created GitHub repository; confirm its visibility before publishing.
- [ ] Sign installers and publish their SHA-256 (section 5).
- [ ] Have the legal pages written properly; a privacy policy must describe the contact form.
- [ ] Run `npm audit`.

## 8. The other Velorex apps

This document covers the website only. Each product in
`Z:\AI-developed-softwares\` is its own codebase with its own risks, and none
of them has had a security review as part of this work. Things noticed while
reading their folders, to deal with before any of them is published or hosted:

- Several projects have a real **`.env` file** in their folder
  (`Velorex-AI-agents-control-center`, `Velorex-design-AI-for-sellers`,
  `velorex-design - Copy`). Make sure these are git-ignored, never copied into
  a release, and that any key in them is rotated if the folder has ever been
  shared or zipped.
- Several READMEs document **demo logins and fixed one-time codes**. Those
  accounts and codes must be disabled in any hosted version.
- Apps that take payments, hold accounts or touch raw disks (Locora, PhotoLab
  Connect, AgentOS, AI for Sellers, Recovery Intelligence) each need their own
  review before real users or real money are involved.

## 9. Reporting a problem

There is no public security contact yet because no company inbox is confirmed. When one exists, add a `public/.well-known/security.txt` with the
address.
