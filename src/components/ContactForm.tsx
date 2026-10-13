"use client";

import { useRef, useState } from "react";
import {
  BUDGET_RANGES,
  HONEYPOT_FIELD,
  PROJECT_TYPES,
  TIMELINES,
  validateContact,
  type ContactPayload,
  type FieldErrors,
} from "@/lib/contact";
import { Magnetic } from "./Interactive";
import { ArrowRight } from "./Primitives";

type Status = "idle" | "sending" | "success" | "error" | "unconfigured";

const EMPTY: ContactPayload = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
};

export function ContactForm({
  deliveryConfigured,
  email,
}: {
  deliveryConfigured: boolean;
  email: string | null;
}) {
  const [data, setData] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const firstErrorRef = useRef<string | null>(null);
  // Bot trap: hidden from people, so it only ever has a value when a script filled it.
  const [trap, setTrap] = useState("");

  const set = (key: keyof ContactPayload) => (value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const found = validateContact(data);
    setErrors(found);

    const keys = Object.keys(found) as (keyof ContactPayload)[];
    if (keys.length > 0) {
      firstErrorRef.current = keys[0];
      document.getElementById(`field-${keys[0]}`)?.focus();
      return;
    }

    setStatus("sending");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, [HONEYPOT_FIELD]: trap }),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        setStatus("success");
        setData(EMPTY);
        return;
      }

      if (res.status === 501) {
        setStatus("unconfigured");
        setServerMessage(json.message ?? "");
        return;
      }

      if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        setStatus("idle");
        return;
      }

      setStatus("error");
      setServerMessage(json.message ?? "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setServerMessage(
        "We couldn't reach the server. Check your connection and try again.",
      );
    }
  };

  /* Prefilled mailto, so a visitor is never stuck */
  const mailtoHref = (() => {
    if (!email) return null;
    const subject = `Project enquiry${data.name ? ` — ${data.name}` : ""}`;
    const body = [
      `Name: ${data.name || ""}`,
      `Company: ${data.company || ""}`,
      `Project type: ${data.projectType || ""}`,
      `Budget: ${data.budget || ""}`,
      `Timeline: ${data.timeline || ""}`,
      "",
      data.message || "",
    ].join("\n");
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  })();

  /* ── Success state ── */
  if (status === "success") {
    return (
      <div className="panel p-10 text-center sm:p-14" role="status" aria-live="polite">
        <span
          aria-hidden
          className="mx-auto mb-7 grid h-14 w-14 place-items-center rounded-full border border-violet/50"
          style={{ animation: "fade-up 0.6s var(--ease-out-expo)" }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M4 10.5l4 4 8-9"
              stroke="#9d85ff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="display text-2xl sm:text-3xl">Message sent.</h2>
        <p className="lede mx-auto mt-4 max-w-sm text-[15px]">
          Thanks — we&rsquo;ve got it. We&rsquo;ll get back to you at the address
          you gave us.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-ghost mt-9"
        >
          Send another
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="panel p-7 sm:p-10">
      {/* Delivery not configured — stated up front, never after a fake send */}
      {!deliveryConfigured && (
        <div
          className="mb-8 rounded-xl border border-dashed border-[var(--color-edge)] p-5"
          role="note"
        >
          <p className="font-mono text-[10px] tracking-[0.18em] text-ink-mute uppercase">
            Setup required
          </p>
          <p className="mt-2.5 text-[13px] leading-relaxed text-ink-dim">
            This form isn&rsquo;t connected to a delivery service yet, so it
            can&rsquo;t send messages.{" "}
            {email ? (
              <>
                Please email{" "}
                <a href={`mailto:${email}`} className="lnk text-ink">
                  {email}
                </a>{" "}
                directly in the meantime.
              </>
            ) : (
              <>We&rsquo;re still setting this up — please check back soon.</>
            )}
          </p>
        </div>
      )}

      {/* Honeypot — off-screen, skipped by keyboard and screen readers */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input
            type="text"
            name={HONEYPOT_FIELD}
            tabIndex={-1}
            autoComplete="off"
            value={trap}
            onChange={(e) => setTrap(e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          required
          value={data.name}
          onChange={set("name")}
          error={errors.name}
          placeholder="Your name"
          autoComplete="name"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          required
          value={data.email}
          onChange={set("email")}
          error={errors.email}
          placeholder="you@company.com"
          autoComplete="email"
        />
        <Field
          id="company"
          label="Company"
          value={data.company}
          onChange={set("company")}
          error={errors.company}
          placeholder="Optional"
          autoComplete="organization"
        />
        <SelectField
          id="projectType"
          label="Project type"
          required
          value={data.projectType}
          onChange={set("projectType")}
          error={errors.projectType}
          options={PROJECT_TYPES}
          placeholder="Choose one"
        />
        <SelectField
          id="budget"
          label="Budget range"
          value={data.budget}
          onChange={set("budget")}
          error={errors.budget}
          options={BUDGET_RANGES}
          placeholder="Optional"
        />
        <SelectField
          id="timeline"
          label="Timeline"
          required
          value={data.timeline}
          onChange={set("timeline")}
          error={errors.timeline}
          options={TIMELINES}
          placeholder="Choose one"
        />
      </div>

      <div className="mt-5">
        <Field
          id="message"
          label="Message"
          required
          textarea
          value={data.message}
          onChange={set("message")}
          error={errors.message}
          placeholder="What are you trying to build? Even a rough description helps."
          hint={`${data.message.length}/5000`}
        />
      </div>

      {/* Error banner */}
      {(status === "error" || status === "unconfigured") && (
        <div
          role="alert"
          aria-live="assertive"
          className="mt-6 rounded-xl border p-4"
          style={{ borderColor: "#ff5c8a55", background: "#ff5c8a0f" }}
        >
          <p className="text-[13px] leading-relaxed text-ink">
            {serverMessage || "Something went wrong."}
          </p>
          {mailtoHref && (
            <a href={mailtoHref} className="lnk mt-3 inline-flex font-mono text-[11px] tracking-[0.12em] text-ink uppercase">
              Email us instead
              <ArrowRight />
            </a>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Magnetic type="submit" disabled={sending} className="btn btn-primary">
          {sending ? (
            <>
              <Spinner />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight />
            </>
          )}
        </Magnetic>

        <p className="font-mono text-[10px] tracking-[0.14em] text-ink-mute uppercase">
          Required fields marked ·
        </p>
      </div>
    </form>
  );
}

/* ── Field primitives ───────────────────────────────────── */

function Label({
  id,
  label,
  required,
  hint,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <label
        htmlFor={`field-${id}`}
        className="font-mono text-[10px] tracking-[0.18em] text-ink-dim uppercase"
      >
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-violet">
            ·
          </span>
        )}
      </label>
      {hint && <span className="font-mono text-[9px] text-ink-mute">{hint}</span>}
    </div>
  );
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p
      id={`error-${id}`}
      className="mt-2 font-mono text-[10px] tracking-[0.1em]"
      style={{ color: "#ff5c8a" }}
    >
      {error}
    </p>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  required,
  textarea,
  autoComplete,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  autoComplete?: string;
  hint?: string;
}) {
  const shared = {
    id: `field-${id}`,
    name: id,
    value,
    placeholder,
    required,
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `error-${id}` : undefined,
    className: "field",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
  };

  return (
    <div className={textarea ? "" : ""}>
      <Label id={id} label={label} required={required} hint={hint} />
      {textarea ? (
        <textarea {...shared} rows={6} maxLength={5000} className="field resize-y" />
      ) : (
        <input {...shared} type={type} maxLength={type === "email" ? 254 : 160} />
      )}
      <ErrorText id={id} error={error} />
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  error,
  options,
  placeholder,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  options: readonly string[];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label id={id} label={label} required={required} />
      <select
        id={`field-${id}`}
        name={id}
        value={value}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `error-${id}` : undefined}
        className="field"
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ErrorText id={id} error={error} />
    </div>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block h-3 w-3 rounded-full border-[1.5px] border-current border-t-transparent"
      style={{ animation: "spin-slow 0.7s linear infinite" }}
    />
  );
}
