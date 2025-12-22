import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SectionRenderer } from "@/components/section-renderer"
import { client } from "@/lib/sanity/client"
import { pageContentQuery, insightsQuery, featuredCommunityPostsQuery } from "@/lib/sanity/queries"
import { getDefaultSections } from "@/lib/defaultSections"
import type { PageSection } from "@/lib/sanity/types"

// Revalidate every hour as fallback (webhook handles instant updates)
export const revalidate = 3600

export default async function Home() {
  const [pageContent, insights, communityPosts] = await Promise.all([
    client.fetch(pageContentQuery, {}, {
      next: { tags: ['homepage', 'pageContent'] }
    }).catch((err) => {
      console.error('Error fetching pageContent:', err)
      return null
    }),
    client.fetch(insightsQuery, {}, {
      next: { tags: ['homepage', 'insights'] }
    }),
    client.fetch(featuredCommunityPostsQuery, {}, {
      next: { tags: ['homepage', 'community'] }
    }),
  ])

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('📄 Page Content from Sanity:', {
      exists: !!pageContent,
      sectionsCount: pageContent?.sections?.length || 0,
      hasSections: !!(pageContent?.sections && pageContent.sections.length > 0),
    })
  }

  // Use sections from Sanity if available, otherwise use default sections
  const sections = pageContent?.sections && pageContent.sections.length > 0
    ? pageContent.sections.filter((section: PageSection) => section.enabled !== false)
    : getDefaultSections()
  
  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('🎨 Final sections to render:', {
      count: sections.length,
      source: pageContent?.sections ? 'Sanity' : 'Defaults',
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
        />
      ))}
      <Footer />
    </main>
  )
}
