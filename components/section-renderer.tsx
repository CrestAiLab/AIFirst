import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Solutions } from "@/components/solutions"
import { Community } from "@/components/community"
import { Insights } from "@/components/insights"
import { CTA } from "@/components/cta"
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
      return <Hero hero={section.hero} />
    
    case 'stats':
      return <Stats stats={section.stats} />
    
    case 'solutions':
      return <Solutions solutions={section.solutions} />
    
    case 'community':
      return (
        <Community 
          community={section.community} 
          featuredPosts={communityPosts || []} 
        />
      )
    
    case 'insights':
      return (
        <Insights 
          insights={insights || []} 
          sectionConfig={section.insights} 
        />
      )
    
    case 'cta':
      return <CTA cta={section.cta} />
    
    default:
      return null
  }
}

