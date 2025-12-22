import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Solutions } from "@/components/solutions"
import { Community } from "@/components/community"
import { Insights } from "@/components/insights"
import { CTA } from "@/components/cta"
import { Content } from "@/components/content"
import type { PageSection, Insight, CommunityPost } from "@/lib/sanity/types"

interface SectionRendererProps {
  section: PageSection
  insights?: Insight[]
  communityPosts?: CommunityPost[]
}

export function SectionRenderer({ section, insights = [], communityPosts = [] }: SectionRendererProps) {
  if (!section.enabled) {
    return null
  }

  switch (section.sectionType) {
    case 'hero':
      return <Hero hero={section.hero} showMore={section.showMore} />
    
    case 'stats':
      return <Stats stats={section.stats} showMore={section.showMore} />
    
    case 'solutions':
      return <Solutions solutions={section.solutions} showMore={section.showMore} />
    
    case 'community':
      return (
        <Community 
          community={section.community} 
          featuredPosts={communityPosts || []}
          showMore={section.showMore}
        />
      )
    
    case 'insights':
      return (
        <Insights 
          insights={insights || []} 
          sectionConfig={section.insights}
          showMore={section.showMore}
        />
      )
    
    case 'cta':
      return <CTA cta={section.cta} showMore={section.showMore} />
    
    case 'content':
      return <Content content={section.content} showMore={section.showMore} />
    
    default:
      return null
  }
}

