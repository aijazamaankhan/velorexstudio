import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

async function load(name) {
  const source = await readFile(new URL(`../src/lib/${name}.ts`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}
const { readBoundedBody, isAllowedOrigin } = await load('requestSecurity');
const { rateLimit } = await load('rateLimit');
const { validateContact, isDeliveryConfigured } = await load('contact');
const request = body => new Request('https://velorexstudio.com/api/contact', { method: 'POST', body, duplex: 'half' });

test('body accepts exactly the byte limit and preserves split UTF-8', async () => {
  const bytes = new TextEncoder().encode('a\u20ac');
  const stream = new ReadableStream({ start(c) { c.enqueue(bytes.slice(0, 2)); c.enqueue(bytes.slice(2)); c.close(); } });
  assert.equal(await readBoundedBody(request(stream), 4), 'a\u20ac');
});
test('oversized chunked request is cancelled before the rest is read', async () => {
  let cancelled = false;
  const stream = new ReadableStream({ pull(c) { c.enqueue(new Uint8Array(17)); }, cancel() { cancelled = true; } });
  await assert.rejects(readBoundedBody(request(stream), 16), { status: 413 });
  assert.equal(cancelled, true);
});
test('declared oversized body is rejected', async () => {
  const r = new Request('https://velorexstudio.com', { method: 'POST', body: 'small', headers: { 'content-length': '99999' } });
  await assert.rejects(readBoundedBody(r, 16), { status: 413 });
});
test('stalled body reaches deadline and cancels', async () => {
  let cancelled = false;
  const stream = new ReadableStream({ cancel() { cancelled = true; } });
  await assert.rejects(readBoundedBody(request(stream), 16, 20), { status: 408 });
  assert.equal(cancelled, true);
});
test('invalid UTF-8 is rejected', async () => {
  await assert.rejects(readBoundedBody(request(new Uint8Array([255])), 16), { status: 400 });
});
test('origins require matching scheme, host and port', () => {
  const allowed = 'https://velorexstudio.com';
  assert.equal(isAllowedOrigin(allowed, allowed), true);
  assert.equal(isAllowedOrigin(null, allowed), true);
  for (const bad of ['null', 'https://evil.example', 'http://velorexstudio.com', 'https://velorexstudio.com:8443', 'https://velorexstudio.com.evil.example', 'https://velorexstudio.com/path']) {
    assert.equal(isAllowedOrigin(bad, allowed), false, bad);
  }
});
test('address saturation cannot reset an existing rate limit', () => {
  for (let i=0;i<5;i++) assert.equal(rateLimit('victim', 5, 60000).ok, true);
  assert.equal(rateLimit('victim', 5, 60000).ok, false);
  for (let i=0;i<6000;i++) rateLimit(`flood-${i}`, 5, 60000);
  assert.equal(rateLimit('victim', 5, 60000).ok, false);
  assert.equal(rateLimit('new-address', 5, 60000).ok, false);
});
test('malformed field types and unlisted options never pass', () => {
  const errors = validateContact({ name: {}, email: [], message: 3, projectType: 'injected', timeline: 'never', budget: 'invalid' });
  for (const key of ['name', 'email', 'message', 'projectType', 'timeline', 'budget']) assert.ok(errors[key]);
});
test('delivery configuration requires a complete provider or HTTPS webhook', () => {
  const keys = ['CONTACT_WEBHOOK_URL', 'RESEND_API_KEY', 'CONTACT_TO_EMAIL', 'CONTACT_FROM_EMAIL'];
  const old = Object.fromEntries(keys.map(k => [k, process.env[k]]));
  try {
    for (const k of keys) delete process.env[k];
    assert.equal(isDeliveryConfigured(), false);
    process.env.RESEND_API_KEY = 'test-only';
    assert.equal(isDeliveryConfigured(), false);
    process.env.CONTACT_TO_EMAIL = 'recipient@example.test';
    process.env.CONTACT_FROM_EMAIL = 'sender@example.test';
    assert.equal(isDeliveryConfigured(), true);
    process.env.CONTACT_WEBHOOK_URL = 'http://example.test';
    assert.equal(isDeliveryConfigured(), false);
    process.env.CONTACT_WEBHOOK_URL = 'https://example.test';
    assert.equal(isDeliveryConfigured(), true);
  } finally {
    for (const k of keys) { if (old[k] === undefined) delete process.env[k]; else process.env[k] = old[k]; }
  }
});
