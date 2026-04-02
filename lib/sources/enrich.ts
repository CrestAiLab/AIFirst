import { urlFor } from '@/lib/sanity/image'
import type { Source, SourceDisplay } from '@/lib/sanity/types'
import { getOgImageUrl } from '@/lib/og-image'

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
    displayImageUrl: og ?? '/placeholder.svg',
  }
}

export async function enrichSources(sources: Source[]): Promise<SourceDisplay[]> {
  return Promise.all(sources.map(toSourceDisplay))
}
