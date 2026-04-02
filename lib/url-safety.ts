/**
 * Block obviously unsafe URLs for server-side fetch (SSRF mitigation).
 * Not a full private-range audit; good enough for public OG/thumbnail proxy.
 */
function isPrivateOrLoopbackIPv4(hostname: string): boolean {
  const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(hostname)
  if (!m) return false
  const a = Number(m[1])
  const b = Number(m[2])
  const c = Number(m[3])
  const d = Number(m[4])
  if ([a, b, c, d].some((n) => n > 255)) return false
  if (a === 127) return true
  if (a === 0) return true
  if (a === 10) return true
  if (a === 172 && b >= 16 && b <= 31) return true
  if (a === 192 && b === 168) return true
  if (a === 169 && b === 254) return true
  return false
}

export function isSafeHttpUrlForFetch(urlString: string): boolean {
  try {
    const u = new URL(urlString)
    if (u.protocol !== "https:" && u.protocol !== "http:") return false
    const host = u.hostname.toLowerCase()
    if (host === "localhost" || host === "::1") return false
    if (host.endsWith(".local") || host.endsWith(".localhost")) return false
    if (host === "metadata.google.internal") return false
    if (isPrivateOrLoopbackIPv4(host)) return false
    return true
  } catch {
    return false
  }
}
