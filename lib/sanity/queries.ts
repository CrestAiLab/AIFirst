export const pageContentQuery = `*[_type == "pageContent"][0]{
  title,
  sections[]{
    _key,
    sectionType,
    enabled,
    hero{
      badge,
      heading,
      description,
      primaryButton,
      secondaryButton
    },
    stats[]{
      value,
      label,
      description
    },
    solutions[]{
      icon,
      title,
      description
    },
    community{
      heading,
      description,
      buttonText,
      features[]{
        icon,
        title,
        description
      }
    },
    insights{
      heading,
      description,
      buttonText
    },
    cta{
      heading,
      description,
      buttonText,
      disclaimer
    }
  }
}`

export const insightsQuery = `*[_type == "insight"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  description,
  image,
  publishedAt,
  author
}[0...3]`

export const allInsightsQuery = `*[_type == "insight"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  description,
  image,
  publishedAt,
  author
}`

export const insightBySlugQuery = `*[_type == "insight" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  category,
  description,
  image,
  publishedAt,
  author,
  content
}`

export const featuredCommunityPostsQuery = `*[_type == "communityPost" && featured == true] | order(createdAt desc) [0...3]{
  _id,
  title,
  slug,
  author{
    name,
    avatar
  },
  replies,
  createdAt
}`

export const communityPostsQuery = `*[_type == "communityPost"] | order(createdAt desc) {
  _id,
  title,
  slug,
  author{
    name,
    avatar
  },
  content,
  replies,
  createdAt,
  featured
}`
