import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Solutions } from "@/components/solutions"
import { Community } from "@/components/community"
import { Insights } from "@/components/insights"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { client } from "@/lib/sanity/client"
import { pageContentQuery, insightsQuery, featuredCommunityPostsQuery } from "@/lib/sanity/queries"

export default async function Home() {
  const [pageContent, insights, communityPosts] = await Promise.all([
    client.fetch(pageContentQuery),
    client.fetch(insightsQuery),
    client.fetch(featuredCommunityPostsQuery),
  ])

  return (
    <main className="min-h-screen">
      <Header />
      <Hero hero={pageContent?.hero} />
      <Stats stats={pageContent?.stats} />
      <Solutions solutions={pageContent?.solutions} />
      <Community community={pageContent?.community} featuredPosts={communityPosts || []} />
      <Insights insights={insights || []} sectionConfig={pageContent?.insights} />
      <CTA cta={pageContent?.cta} />
      <Footer />
    </main>
  )
}
