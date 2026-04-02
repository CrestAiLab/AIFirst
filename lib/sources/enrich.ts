import { urlFor } from '@/lib/sanity/image'
import type { Source, SourceDisplay } from '@/lib/sanity/types'
import { getOgImageUrl } from '@/lib/og-image'
import { ensureHttpsUrl } from '@/lib/normalize-url'

/** Browser loads this route same-origin; server fetches remote image (avoids hotlink / referrer blocks on Vercel). */
function proxiedThumbnailUrl(ogImageUrl: string): string {
  return `/api/sources/thumbnail?img=${encodeURIComponent(ogImageUrl)}`
}

export async function toSourceDisplay(source: Source): Promise<SourceDisplay> {
  if (source.thumbnail) {
    return {
      ...source,
      displayImageUrl: urlFor(source.thumbnail).width(800).height(400).url(),
    }
  }
  const pageUrl = ensureHttpsUrl(source.url?.trim() ?? '')
  const og = pageUrl ? await getOgImageUrl(pageUrl) : null
  if (!og) {
    return { ...source, displayImageUrl: '/placeholder.svg' }
  }
  /** Always proxy remote thumbs (incl. img.youtube.com) so the API can send Referer headers YouTube expects. */
  return {
    ...source,
    displayImageUrl: proxiedThumbnailUrl(og),
  }
}

export async function enrichSources(sources: Source[]): Promise<SourceDisplay[]> {
  return Promise.all(sources.map(toSourceDisplay))
}
