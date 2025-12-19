export interface PageContent {
  title?: string
  hero?: {
    badge?: string
    heading?: string
    description?: string
    primaryButton?: string
    secondaryButton?: string
  }
  stats?: Array<{
    value?: string
    label?: string
    description?: string
  }>
  solutions?: Array<{
    icon?: string
    title?: string
    description?: string
  }>
  community?: {
    heading?: string
    description?: string
    buttonText?: string
    features?: Array<{
      icon?: string
      title?: string
      description?: string
    }>
  }
  insights?: {
    heading?: string
    description?: string
    buttonText?: string
  }
  cta?: {
    heading?: string
    description?: string
    buttonText?: string
    disclaimer?: string
  }
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
