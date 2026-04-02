/**
 * Resolve YouTube video thumbnails without fetching youtube.com HTML.
 * Server-side HTML fetch often fails on Vercel (bot/consent pages) while local dev works.
 * @see https://developers.google.com/youtube/v3/docs/thumbnails
 */

const VIDEO_ID_RE = /^[a-zA-Z0-9_-]{11}$/

/** Public CDN — works from browsers and most server fetches; hqdefault is always present. */
export function youtubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

/**
 * Extract 11-char video id from common YouTube URL shapes.
 */
export function getYouTubeVideoIdFromUrl(urlString: string): string | null {
  try {
    const u = new URL(urlString)
    const host = u.hostname.toLowerCase().replace(/^www\./, "")

    if (host === "youtu.be") {
      const id = u.pathname.split("/").filter(Boolean)[0] ?? ""
      return VIDEO_ID_RE.test(id) ? id : null
    }

    const isYoutube =
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "music.youtube.com" ||
      host === "youtube-nocookie.com"

    if (!isYoutube) return null

    const v = u.searchParams.get("v")
    if (v && VIDEO_ID_RE.test(v)) return v

    const path = u.pathname
    const embed = path.match(/\/embed\/([a-zA-Z0-9_-]{11})/)
    if (embed?.[1]) return embed[1]

    const shorts = path.match(/\/shorts\/([a-zA-Z0-9_-]{11})/)
    if (shorts?.[1]) return shorts[1]

    const live = path.match(/\/live\/([a-zA-Z0-9_-]{11})/)
    if (live?.[1]) return live[1]

    return null
  } catch {
    return null
  }
}
