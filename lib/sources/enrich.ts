import { urlFor } from '@/lib/sanity/image'
import type { Source, SourceDisplay } from '@/lib/sanity/types'
import { getOgImageUrl } from '@/lib/og-image'

/** Browser loads this route same-origin; server fetches remote image (avoids hotlink blocks on Vercel). */
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
  const og = await getOgImageUrl(source.url)
  return {
    ...source,
    displayImageUrl: og ? proxiedThumbnailUrl(og) : '/placeholder.svg',
  }
}

export async function enrichSources(sources: Source[]): Promise<SourceDisplay[]> {
  return Promise.all(sources.map(toSourceDisplay))
}
