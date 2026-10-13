import { NextResponse } from "next/server";
import { site } from "@/data/site";
import {
  HONEYPOT_FIELD,
  MAX_BODY_BYTES,
  isDeliveryConfigured,
  normaliseContact,
  singleLine,
  validateContact,
} from "@/lib/contact";
import { rateLimit } from "@/lib/rateLimit";
import { BodyReadError, isAllowedOrigin, readBoundedBody } from "@/lib/requestSecurity";

/**
 * Contact submissions.
 *
 * Delivery requires one of:
 *   CONTACT_WEBHOOK_URL  — any endpoint accepting a JSON POST (Slack, Zapier,
 *                          a Google Apps Script, your own server…)
 *   RESEND_API_KEY       — plus CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL
 *
 * With neither configured the route returns 501 and the form tells the visitor
 * to email directly. It never reports success for a message that went nowhere.
 *
 * Abuse protection, in order (see docs/SECURITY.md):
 *   same-origin check → rate limit → JSON content type → body size cap →
 *   honeypot → validation against the form's own option lists.
 */

/** Submissions allowed per visitor address per window. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

/** Upstream delivery must answer within this, so a slow provider cannot hang the request. */
const DELIVERY_TIMEOUT_MS = 10_000;

const fail = (status: number, reason: string, message: string, extra?: object) =>
  NextResponse.json({ ok: false, reason, message, ...extra }, { status });

/** A browser form post always sends Origin; when present it must be this site. */
function isSameOrigin(request: Request) {
  const allowedOrigin = process.env.NODE_ENV === "production"
    ? site.url
    : new URL(request.url).origin;
  return isAllowedOrigin(request.headers.get("origin"), allowedOrigin);
}

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return fail(403, "forbidden", "Cross-site requests are not accepted.");
  }

  const limited = rateLimit(`contact:${clientKey(request)}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limited.ok) {
    return NextResponse.json(
      {
        ok: false,
        reason: "rate-limited",
        message: "Too many messages from this connection. Please try again a little later.",
      },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSeconds) } },
    );
  }

  if (!isDeliveryConfigured()) {
    return fail(
      501,
      "not-configured",
      "Message delivery isn't configured on this deployment yet.",
      { email: site.email },
    );
  }

  if (!(request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() === "application/json")) {
    return fail(415, "bad-request", "Send the form as JSON.");
  }

  // Enforce the limit while streaming, including chunked requests without Content-Length.
  let raw: string;
  try {
    raw = await readBoundedBody(request, MAX_BODY_BYTES);
  } catch (error) {
    const status = error instanceof BodyReadError ? error.status : 400;
    return fail(status, status === 413 ? "too-large" : "bad-request",
      status === 413 ? "That message is too large." : "Request body could not be read.");
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return fail(400, "bad-request", "Malformed request.");
  }

  // Real visitors never see this field; anything that fills it is automated.
  if (typeof body[HONEYPOT_FIELD] === "string" && body[HONEYPOT_FIELD].trim() !== "") {
    return fail(400, "bad-request", "Malformed request.");
  }

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, reason: "validation", errors }, { status: 422 });
  }

  const clean = normaliseContact(body);
  const payload = {
    ...clean,
    company: clean.company || "—",
    budget: clean.budget || "Not specified",
    receivedAt: new Date().toISOString(),
  };

  try {
    const webhook = process.env.CONTACT_WEBHOOK_URL;
    if (webhook) {
      // Messages contain personal data — only ever send them over HTTPS.
      if (new URL(webhook).protocol !== "https:") {
        throw new Error("CONTACT_WEBHOOK_URL must be an https:// URL.");
      }
      const res = await fetch(webhook, {
        method: "POST",
        redirect: "error",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else {
      const to = process.env.CONTACT_TO_EMAIL ?? site.email;
      const from = process.env.CONTACT_FROM_EMAIL;
      if (!to || !from) {
        throw new Error("CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL must both be set.");
      }

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: payload.email,
          subject: singleLine(`New project enquiry — ${payload.name}`),
          text: [
            `Name:      ${payload.name}`,
            `Email:     ${payload.email}`,
            `Company:   ${payload.company}`,
            `Project:   ${payload.projectType}`,
            `Budget:    ${payload.budget}`,
            `Timeline:  ${payload.timeline}`,
            "",
            payload.message,
          ].join("\n"),
        }),
        signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
      });
      if (!res.ok) throw new Error(`Email provider responded ${res.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Log the reason only — never the visitor's message or address.
    console.error("[contact] delivery failed");
    return fail(
      502,
      "delivery",
      site.email
        ? "We couldn't send that just now. Please try again, or email us directly."
        : "We couldn't send that just now. Please try again in a little while.",
      { email: site.email },
    );
  }
}
