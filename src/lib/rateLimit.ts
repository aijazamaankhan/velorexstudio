/**
 * Small in-memory, fixed-window rate limiter for the contact API.
 *
 * It lives in the server process's memory, so it protects a single running
 * server (`next start`, a VPS, a container). On serverless hosting each
 * instance keeps its own counters, which weakens it — put the host's own rate
 * limiting or a shared store in front if the site is deployed that way.
 * See docs/SECURITY.md.
 */

type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();
const MAX_KEYS = 5000;

/** Returns whether this call is allowed, and how long to wait if it is not. */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { ok: boolean; retryAfterSeconds: number } {
  const now = Date.now();

  // Prune expired entries, but never erase active limits under an address flood.
  if (windows.size >= MAX_KEYS) {
    for (const [k, w] of windows) if (w.resetAt <= now) windows.delete(k);
  }
  const current = windows.get(key);
  if (!current && windows.size >= MAX_KEYS) {
    return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil(windowMs / 1000)) };
  }
  if (!current || current.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSeconds: 0 };
  }

  current.count += 1;
  if (current.count > limit) {
    return { ok: false, retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfterSeconds: 0 };
}
