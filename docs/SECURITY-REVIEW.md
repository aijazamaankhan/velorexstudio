# Security review - 13 October 2026

Scope: local Next.js source, dependency tree, tracked Git history, local
production HTTP checks. This is not a Hostinger infrastructure assessment or
proof that the site cannot be compromised. No attack testing was run against
third-party services, and no contact messages were sent externally.

## Findings addressed

| Finding | Impact | Change |
|---|---|---|
| Body size checked only after reading the entire request | A large contact request could consume excess memory before rejection | Stream input with a 16 KiB byte limit; cancel on overflow; enforce a five-second read deadline |
| Rate limiter erased active counters after address saturation | A flood of distinct keys could reset existing submission limits | Prune expired entries only; reject new keys when capacity is full |
| Origin validation trusted forwarded host and ignored scheme | Forged proxy headers could defeat the check when the server/proxy allowed them | Compare the complete browser origin against the configured site origin in production |
| Next.js pinned vulnerable PostCSS 8.4.31 | Known CSS-processing advisories; this site does not process visitor-supplied CSS | Override only Next.js's PostCSS dependency to 8.5.30; retain Next.js 15 |
| Incomplete provider settings counted as configured | Form could accept input despite an unusable email setup | Require complete email configuration or a valid HTTPS webhook |

Additional hardening: reject redirects from the configured webhook, avoid
logging upstream exception strings that could contain sensitive configuration,
and require an exact application/json media type (parameters are permitted).

## Validation

- Nine regression tests cover size boundaries, split UTF-8, invalid UTF-8,
  oversized streams, stalled reads, origin checks, limiter saturation, malformed
  form fields and delivery configuration. Run npm run test:security.
- npm audit reports zero known vulnerabilities after the override.
- TypeScript and clean production build pass. All 31 production routes pass,
  along with nine HTTP rejection cases, 429/Retry-After checks and sensitive
  path 404 checks.
- Pattern scan of 84 tracked historical Git blobs found no matching private keys or common
  provider token formats. This is a limited scan, not a guarantee that every
  possible credential format is absent.
- User input is not rendered as raw HTML. Raw HTML insertion is limited to a fixed theme initialization script and
  escaped, internally generated Organization JSON-LD (added during the SEO pass). No database, login, upload endpoint
  or shell execution is present in the application routes reviewed.

## Remaining limits and deployment checks

- Hostinger access has not been connected. TLS, DNS, account security, host
  firewall, logs and hosted response headers have not been independently checked.
- The contact limiter uses process memory and X-Forwarded-For. Confirm the host
  overwrites untrusted IP headers and blocks direct origin access. Multiple
  processes and restarts weaken application-only rate limiting; use host-level
  protection. Origin checks and honeypots do not stop non-browser spam clients.
- CSP permits inline scripts for static Next.js bootstrap/theme code. This
  limits protection if an HTML injection bug is introduced. No such injection
  path was identified in this review.
- Body limits here apply to the application reader; the hosting proxy/framework
  may buffer earlier. Configure upstream body size/time limits where supported.
- Use account MFA for GitHub, Hostinger and the domain registrar. Store delivery
  secrets only in the hosting environment and test actual receipt before launch.
- Dependency audits are a point-in-time check. Review the PostCSS override when
  upgrading Next.js; remove it once the framework itself uses a patched version.

The production contact form accepts the configured NEXT_PUBLIC_SITE_URL origin.
When testing a separate preview domain, set that origin before building, or
expect browser submissions from that preview origin to be rejected.
