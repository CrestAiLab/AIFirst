import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SectionRenderer } from "@/components/section-renderer"
import { client } from "@/lib/sanity/client"
import { pageContentQuery, insightsQuery, featuredCommunityPostsQuery, sourcesPreviewQuery } from "@/lib/sanity/queries"
import { enrichSources } from "@/lib/sources/enrich"
import { getDefaultSections } from "@/lib/defaultSections"
import type { PageSection } from "@/lib/sanity/types"

// Revalidate every hour as fallback (webhook handles instant updates)
export const revalidate = 3600

export default async function Home() {
  const [pageContent, insights, communityPosts, rawSources] = await Promise.all([
    client.fetch(pageContentQuery, {}, {
      next: { tags: ['homepage', 'pageContent'] }
    }).catch((err) => {
      console.error('Error fetching pageContent:', err)
      return null
    }),
    client.fetch(insightsQuery, {}, {
      next: { tags: ['homepage', 'insights'] }
    }).catch((err) => {
      console.error('Error fetching insights:', err)
      return []
    }),
    client.fetch(featuredCommunityPostsQuery, {}, {
      next: { tags: ['homepage', 'community'] }
    }).catch((err) => {
      console.error('Error fetching community posts:', err)
      return []
    }),
    client.fetch(sourcesPreviewQuery, {}, {
      next: { tags: ['homepage', 'sources'] }
    }).catch((err) => {
      console.error('Error fetching sources:', err)
      return []
    }),
  ])

  const sources = await enrichSources(Array.isArray(rawSources) ? rawSources : [])

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('📄 Page Content from Sanity:', {
      exists: !!pageContent,
      sectionsCount: pageContent?.sections?.length || 0,
      hasSections: !!(pageContent?.sections && pageContent.sections.length > 0),
    })
  }

  // Temporarily force getDefaultSections to showcase the new design without wiping CMS 
  const sections = getDefaultSections()

  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('🎨 Final sections to render:', {
      count: sections.length,
      source: 'DefaultSections',
      types: sections.map((s: PageSection) => s.sectionType),
    })
  }

  return (
    <main className="min-h-screen">
      <Header />
      {sections.map((section: PageSection) => (
        <SectionRenderer
          key={section._key || section.sectionType}
          section={section}
          insights={insights || []}
          communityPosts={communityPosts || []}
          sources={sources}
        />
      ))}
      <Footer />
    </main>
  )
}
