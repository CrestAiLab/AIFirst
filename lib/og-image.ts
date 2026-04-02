import { unstable_cache } from 'next/cache'

async function fetchOgImageFromPage(pageUrl: string): Promise<string | null> {
  try {
    const normalized = new URL(pageUrl)
    const res = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AIDFestBot/1.0)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null
    const html = await res.text()
    const patterns = [
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
      /<meta[^>]+property=["']og:image:secure_url["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
      /<meta[^>]+name=["']twitter:image:src["'][^>]+content=["']([^"']+)["']/i,
    ]
    let raw: string | undefined
    for (const p of patterns) {
      const m = html.match(p)
      if (m?.[1]) {
        raw = m[1].trim()
        break
      }
    }
    if (!raw) return null
    const abs = new URL(raw, normalized.origin).href
    return abs
  } catch {
    return null
  }
}

/** Cached Open Graph / Twitter image URL for a page (24h). */
export function getOgImageUrl(pageUrl: string): Promise<string | null> {
  return unstable_cache(
    async () => fetchOgImageFromPage(pageUrl),
    ['og-image', pageUrl],
    { revalidate: 86400 }
  )()
}
