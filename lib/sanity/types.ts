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

export interface SourcesConfig {
  heading?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
}

export interface Source {
  _id: string
  title: string
  slug: {
    current: string
  }
  kind: 'paper' | 'podcast' | 'article' | 'link'
  /** Optional: when absent, card is not a link; no OG thumbnail unless custom image is set */
  url?: string | null
  /** One line under kind/date on the card: where the resource is from */
  sourceInfo?: string
  tags?: string[]
  /** Markdown-supported in Read more dialog */
  description?: string
  thumbnail?: any
  publishedAt: string
}

/** Resolved for UI: Sanity thumbnail, og:image from URL, or placeholder */
export interface SourceDisplay extends Source {
  displayImageUrl: string
}

export interface CyberSecurityFeature {
  title?: string
  description?: string
}

export interface CyberSecurityConfig {
  heading?: string
  description?: string
  buttonText?: string
  features?: CyberSecurityFeature[]
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
  /** One short line under the title (italic, muted) — sets up the paragraph */
  lead?: string
  body?: string
  items?: string[]
  layout?: 'default' | 'imageLeft' | 'imageRight'
  /** Sanity image asset */
  image?: any
  imageAlt?: string
  /** Public URL e.g. `/images/figure.svg` when not using Sanity */
  imageUrl?: string
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
  sectionType: 'hero' | 'stats' | 'solutions' | 'cyberSecurity' | 'community' | 'insights' | 'sources' | 'cta' | 'content'
  enabled?: boolean
  showMore?: ShowMoreConfig
  hero?: HeroConfig
  stats?: StatItem[]
  solutions?: SolutionItem[]
  community?: CommunityConfig
  insights?: InsightsConfig
  sources?: SourcesConfig
  cta?: CTAConfig
  content?: ContentConfig
  cyberSecurity?: CyberSecurityConfig
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
  tags?: string[]
  replies?: number
  createdAt: string
  featured?: boolean
}
