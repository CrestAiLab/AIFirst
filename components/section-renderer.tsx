import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Solutions } from "@/components/solutions"
import { Community } from "@/components/community"
import { Insights } from "@/components/insights"
import { Sources } from "@/components/sources"
import { CTA } from "@/components/cta"
import { Content } from "@/components/content"
import { CyberSecurity } from "@/components/cyber-security"
import type { PageSection, Insight, CommunityPost, SourceDisplay } from "@/lib/sanity/types"

interface SectionRendererProps {
  section: PageSection
  insights?: Insight[]
  communityPosts?: CommunityPost[]
  sources?: SourceDisplay[]
}

export function SectionRenderer({ section, insights = [], communityPosts = [], sources = [] }: SectionRendererProps) {
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
    
    case 'cyberSecurity':
      return <CyberSecurity config={section.cyberSecurity} />
    
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

    case 'sources':
      return (
        <Sources
          sources={sources || []}
          sectionConfig={section.sources}
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

