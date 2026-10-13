/** Shared contact-form contract between the client form and the API route. */

export const PROJECT_TYPES = [
  "Website",
  "Web application",
  "Desktop software",
  "AI product",
  "Automation",
  "Cloud / backend",
  "UI/UX design",
  "Something else",
] as const;

export const BUDGET_RANGES = [
  "Not sure yet",
  "Under $5k",
  "$5k – $15k",
  "$15k – $50k",
  "$50k+",
] as const;

export const TIMELINES = [
  "As soon as possible",
  "1–3 months",
  "3–6 months",
  "Just exploring",
] as const;

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

/**
 * Hidden form field real visitors never see or fill. Bots that fill every
 * input give themselves away; the API rejects any submission where it is set.
 */
export const HONEYPOT_FIELD = "website";

/** Largest request body the API will read. A full, valid form is well under this. */
export const MAX_BODY_BYTES = 16 * 1024;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Anything that is not a string is treated as empty. The API receives
 * arbitrary JSON, so a number, array or object must never reach `.trim()`.
 */
const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

/** Strips control characters (incl. CR/LF) so a value is safe on a single line, e.g. an email subject. */
export const singleLine = (value: string) =>
  value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();

/** Validated identically on the client and on the server. */
export function validateContact(
  data: Partial<Record<keyof ContactPayload, unknown>>,
): FieldErrors {
  const errors: FieldErrors = {};

  const name = text(data.name);
  if (!name) errors.name = "Please tell us your name.";
  else if (name.length > 120) errors.name = "That name is too long.";

  const email = text(data.email);
  if (!email) errors.email = "We need an email to reply to.";
  else if (email.length > 254 || !EMAIL_RE.test(email))
    errors.email = "That doesn't look like a valid email.";

  if (text(data.company).length > 160) errors.company = "That's too long.";

  // Select fields only accept the options the form offers.
  const projectType = text(data.projectType);
  if (!projectType || !(PROJECT_TYPES as readonly string[]).includes(projectType))
    errors.projectType = "Pick the closest option.";

  const budget = text(data.budget);
  if (budget && !(BUDGET_RANGES as readonly string[]).includes(budget))
    errors.budget = "Pick one of the listed ranges.";

  const timeline = text(data.timeline);
  if (!timeline || !(TIMELINES as readonly string[]).includes(timeline))
    errors.timeline = "Roughly when do you need this?";

  const message = text(data.message);
  if (!message) errors.message = "Tell us a little about the project.";
  else if (message.length < 20)
    errors.message = "A bit more detail helps — 20 characters minimum.";
  else if (message.length > 5000) errors.message = "That's over 5,000 characters.";

  return errors;
}

/** The cleaned values to deliver. Call only after `validateContact` returns no errors. */
export function normaliseContact(
  data: Partial<Record<keyof ContactPayload, unknown>>,
): ContactPayload {
  return {
    name: singleLine(text(data.name)),
    email: singleLine(text(data.email)),
    company: singleLine(text(data.company)),
    projectType: text(data.projectType),
    budget: text(data.budget),
    timeline: text(data.timeline),
    message: text(data.message),
  };
}

/**
 * Delivery is configured only when there is somewhere real to send the message.
 * Without this the API route refuses to accept submissions rather than
 * pretending they were sent.
 */
export function isDeliveryConfigured() {
  return Boolean(process.env.CONTACT_WEBHOOK_URL || process.env.RESEND_API_KEY);
}
