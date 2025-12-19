import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SectionRenderer } from "@/components/section-renderer"
import { client } from "@/lib/sanity/client"
import { pageContentQuery, insightsQuery, featuredCommunityPostsQuery } from "@/lib/sanity/queries"
import { getDefaultSections } from "@/lib/defaultSections"
import type { PageSection } from "@/lib/sanity/types"

export default async function Home() {
  const [pageContent, insights, communityPosts] = await Promise.all([
    client.fetch(pageContentQuery),
    client.fetch(insightsQuery),
    client.fetch(featuredCommunityPostsQuery),
  ])

  // Use sections from Sanity if available, otherwise use default sections
  const sections = pageContent?.sections && pageContent.sections.length > 0
    ? pageContent.sections.filter((section: PageSection) => section.enabled !== false)
    : getDefaultSections()

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
