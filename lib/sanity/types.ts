export interface HeroConfig {
  badge?: string
  heading?: string
  description?: string
  primaryButton?: string
  secondaryButton?: string
}

export interface StatItem {
  value?: string
  label?: string
  description?: string
}

export interface SolutionItem {
  icon?: string
  title?: string
  description?: string
}

export interface CommunityFeature {
  icon?: string
  title?: string
  description?: string
}

export interface CommunityConfig {
  heading?: string
  description?: string
  buttonText?: string
  features?: CommunityFeature[]
}

export interface InsightsConfig {
  heading?: string
  description?: string
  buttonText?: string
}

export interface CTAConfig {
  heading?: string
  description?: string
  buttonText?: string
  disclaimer?: string
}

export interface PageSection {
  _key?: string
  sectionType: 'hero' | 'stats' | 'solutions' | 'community' | 'insights' | 'cta'
  enabled?: boolean
  hero?: HeroConfig
  stats?: StatItem[]
  solutions?: SolutionItem[]
  community?: CommunityConfig
  insights?: InsightsConfig
  cta?: CTAConfig
}

export interface PageContent {
  title?: string
  sections?: PageSection[]
}

export interface Insight {
  _id: string
  title: string
  slug: {
    current: string
  }
  category: string
  description: string
  image: any
  publishedAt: string
  author?: string
  content?: any[]
}

export interface CommunityPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  author: {
    name: string
    avatar?: any
  }
  content?: string
  replies?: number
  createdAt: string
  featured?: boolean
}
