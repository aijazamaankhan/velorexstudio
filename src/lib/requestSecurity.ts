/** Stop reading untrusted input as soon as the byte or time budget is exceeded. */
export class BodyReadError extends Error {
  constructor(public readonly status: 400 | 408 | 413) {
    super("Request body rejected");
  }
}

export async function readBoundedBody(request: Request, maxBytes: number, timeoutMs = 5000): Promise<string> {
  const declared = request.headers.get("content-length");
  if (declared !== null) {
    if (!/^\d+$/.test(declared)) throw new BodyReadError(400);
    if (Number(declared) > maxBytes) throw new BodyReadError(413);
  }
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new BodyReadError(408)), timeoutMs);
  });
  try {
    while (true) {
      const { done, value } = await Promise.race([reader.read(), deadline]);
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBytes) throw new BodyReadError(413);
      chunks.push(value);
    }
    const combined = new Uint8Array(bytes);
    let offset = 0;
    for (const chunk of chunks) {
      combined.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return new TextDecoder("utf-8", { fatal: true }).decode(combined);
  } catch (error) {
    // Do not let an unresponsive sender delay rejection while cancellation finishes.
    void reader.cancel().catch(() => {});
    throw error instanceof BodyReadError ? error : new BodyReadError(400);
  } finally {
    clearTimeout(timer);
    reader.releaseLock();
  }
}

/** Compare full origins against configuration, never client-supplied proxy headers. */
export function isAllowedOrigin(origin: string | null, allowedOrigin: string): boolean {
  if (origin === null) return true; // Non-browser clients still face validation/rate limits.
  try {
    const parsed = new URL(origin);
    return (parsed.protocol === "https:" || parsed.protocol === "http:") &&
      origin === parsed.origin && parsed.origin === new URL(allowedOrigin).origin;
  } catch {
    return false;
  }
}
