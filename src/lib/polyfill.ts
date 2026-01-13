// Polyfill for Edge Runtime to prevent Supabase/Realtime crashes
// This needs to be imported before any Supabase clients
if (typeof process === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).process = { env: {} }
}

if (!process.version) {
  Object.assign(process, { version: 'v18.0.0' })
}

if (!process.versions) {
  Object.assign(process, { versions: { node: '18.0.0' } })
}
