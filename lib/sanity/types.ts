export interface HeroConfig {
  badge?: string
  heading?: string
  description?: string
  primaryButton?: string
  primaryButtonUrl?: string
  secondaryButton?: string
  secondaryButtonUrl?: string
  showPrimaryButton?: boolean
  showSecondaryButton?: boolean
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
  buttonUrl?: string
  features?: CommunityFeature[]
}

export interface InsightsConfig {
  heading?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
}

export interface CTAConfig {
  heading?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
  disclaimer?: string
}

export interface ContentConfig {
  title?: string
  body?: string
  items?: string[]
  layout?: 'default' | 'imageLeft' | 'imageRight'
  image?: any
  imageAlt?: string
}

export interface ShowMoreConfig {
  enabled?: boolean
  text?: string
  linkType?: 'internal' | 'external'
  internalPage?: string
  externalUrl?: string
}

export interface PageSection {
  _key?: string
  sectionType: 'hero' | 'stats' | 'solutions' | 'community' | 'insights' | 'cta' | 'content'
  enabled?: boolean
  showMore?: ShowMoreConfig
  hero?: HeroConfig
  stats?: StatItem[]
  solutions?: SolutionItem[]
  community?: CommunityConfig
  insights?: InsightsConfig
  cta?: CTAConfig
  content?: ContentConfig
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
