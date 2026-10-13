# Deploy to Hostinger

Repository: https://github.com/aijazamaankhan/velorexstudio

Production domain: https://velorexstudio.com

## Hosting requirement

Use Hostinger Node.js Web Apps (Business or Cloud), or a separately configured
VPS. This application needs a Next.js server for contact delivery and security
headers. Uploading HTML into public_html does not deploy the complete app.
Do not switch to a static export.

The three HTML files already uploaded to GitHub are preserved historical files.
The active application is the Next.js project at the repository root.

## GitHub deployment

1. Open Hostinger Websites → Create Website → Web App → Import Git Repository.
2. Authorize access to aijazamaankhan/velorexstudio and select main.
3. Select the Next.js preset and repository root.
4. Select Node.js 22 (24 is also supported by this project).
5. Configure the settings below and add environment variables before building.
6. Deploy, inspect build/runtime logs, then connect velorexstudio.com using
   Hostinger's domain flow and supplied DNS records. Preserve unrelated records.
7. Enable HTTPS and redirect www.velorexstudio.com to velorexstudio.com using
   the hosting/domain controls.

| Setting | Value |
|---|---|
| Framework | Next.js server application |
| Root directory | Repository root (.) |
| Install command, if configurable | npm ci |
| Build command | npm run build |
| Output directory, if requested | .next |
| Start command, if requested | npm run start |

Keep the platform-assigned PORT; next start reads it automatically. Do not
select a historical HTML file as the entry point. With the Next.js preset,
Hostinger may manage startup settings itself.

## Environment

Set NEXT_PUBLIC_SITE_URL=https://velorexstudio.com before the build. This owned
domain is also the source fallback. Rebuild after changing public environment
variables: canonical metadata and sitemap pages are prerendered.

Configure one contact delivery option in Hostinger:

- CONTACT_WEBHOOK_URL: an HTTPS endpoint accepting the application's JSON payload.
- Or RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL: use an actual
  recipient and a sender verified with the email provider.

Keep credentials in hosting settings, never in Git or chat. Domain registration
does not create a mailbox. Set site.email only after an inbox is confirmed.
Without delivery settings the form reports it cannot send, and the API returns
501 rather than claiming success.

## Before public launch

- Replace/remove sample people and fictional case studies.
- Complete and review the placeholder legal pages.
- Send a real contact message and confirm receipt.
- Check all routes from CLAUDE.md section 10, both themes and phone layouts.
- Verify sitemap.xml, robots.txt, icon and opengraph-image. Canonicals and
  sitemap URLs must use the production domain, never localhost.
- Verify HTTPS, www redirects and response security headers on the host.
- Enable host-level bot/rate protection where available. The contact limiter
  is in memory and resets on restart; see SECURITY.md.
- Run npm audit and review unresolved advisories before release.

For local verification, stop this project's servers, run npm run typecheck,
remove only this project's .next directory, run npm run build, then npm run start
and check routes. Never build underneath a running dev/production server.

## Updates

Push reviewed commits to the connected branch. With automatic deployment enabled,
Hostinger builds each push. For rollback use the hosting control if available,
or revert the affected commit and redeploy. Do not overwrite Git history.

Official reference checked 13 October 2026:
[Hostinger Node.js deployment guide](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/).

Security validation: see [SECURITY-REVIEW.md](SECURITY-REVIEW.md). Production
contact submissions must use the configured NEXT_PUBLIC_SITE_URL origin; a
separate preview domain requires that origin to be set before building.
