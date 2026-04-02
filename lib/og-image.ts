import { ensureHttpsUrl } from "@/lib/normalize-url"
import { getYouTubeVideoIdFromUrl, youtubeThumbnailUrl } from "@/lib/youtube"

/** Decode common HTML entities in meta tag content */
function decodeMetaContent(raw: string): string {
  return raw
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
}

async function fetchOgImageFromPage(pageUrl: string): Promise<string | null> {
  try {
    const normalized = new URL(pageUrl)
    if (normalized.protocol !== "http:" && normalized.protocol !== "https:") return null

    const res = await fetch(pageUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(18_000),
      next: { revalidate: 3600 },
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
    const decoded = decodeMetaContent(raw)
    const abs = new URL(decoded, normalized.origin).href
    if (!abs.startsWith("http://") && !abs.startsWith("https://")) return null
    return abs
  } catch {
    return null
  }
}

/** Resolve Open Graph / Twitter image URL for a page (no unstable_cache — avoids caching null on Vercel for 24h after a transient failure). */
export async function getOgImageUrl(pageUrl: string): Promise<string | null> {
  const normalized = ensureHttpsUrl(pageUrl)
  if (!normalized) return null
  const ytId = getYouTubeVideoIdFromUrl(normalized)
  if (ytId) {
    return youtubeThumbnailUrl(ytId)
  }
  return fetchOgImageFromPage(normalized)
}
