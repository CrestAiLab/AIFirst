/** Ensure absolute URL so `new URL()` and parsers work (Sanity sometimes stores URLs without a scheme). */
export function ensureHttpsUrl(url: string): string | null {
  const t = url.trim()
  if (!t) return null
  if (/^https?:\/\//i.test(t)) return t
  return `https://${t}`
}
