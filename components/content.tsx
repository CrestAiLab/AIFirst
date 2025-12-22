import type { ContentConfig, ShowMoreConfig } from "@/lib/sanity/types"
import { urlFor } from "@/lib/sanity/image"
import Image from "next/image"
import { slugify } from "@/lib/utils"
import { ShowMoreButton } from "@/components/show-more-button"

interface ContentProps {
  content?: ContentConfig
  showMore?: ShowMoreConfig
}

export function Content({ content, showMore }: ContentProps) {
  if (!content) return null

  const title = content.title || ""
  const body = content.body || ""
  const items = content.items || []
  const layout = content.layout || 'default'
  const image = content.image
  const imageAlt = content.imageAlt || ""
  const sectionId = title ? slugify(title) : undefined

  // Check if image exists and layout allows it
  const hasImage = layout !== 'default' && image && image.asset
  
  // Build image URL if image exists
  let imageUrl: string | null = null
  if (hasImage && image.asset) {
    try {
      imageUrl = urlFor(image).width(1200).height(800).url()
    } catch (error) {
      console.error('Error building image URL:', error, image)
      imageUrl = null
    }
  }

  const renderContent = () => (
    <div className={hasImage ? "flex-1" : ""}>
      {body && (
        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed text-lg">
            {body}
          </div>
          <ShowMoreButton config={showMore} />
        </div>
      )}
      {items.length > 0 && (
        <ul className="space-y-4 mt-6">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl hover:shadow-accent/10 dark:hover:shadow-accent/20">
              <div className="flex-shrink-0 mt-1.5 h-2 w-2 rounded-full bg-accent shadow-md dark:shadow-lg shadow-accent/50" />
              <span className="text-foreground leading-relaxed flex-1 font-medium">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  const renderImage = () => {
    if (!hasImage || !imageUrl) return null
    
    return (
      <div className="flex-1 relative group">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-border/50 hover:border-accent/50 transition-all duration-300 group-hover:shadow-[0_25px_70px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_25px_70px_rgba(0,0,0,0.7)] group-hover:shadow-accent/15 dark:group-hover:shadow-accent/25">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    )
  }

  return (
    <section id={sectionId} className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
      <div className="container relative z-10">
        {/* Heading First */}
        {title && (
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
              {title}
            </h2>
          </div>
        )}

        {/* Two Column Layout */}
        {hasImage ? (
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {layout === 'imageLeft' ? (
              <>
                {renderImage()}
                {renderContent()}
              </>
            ) : (
              <>
                {renderContent()}
                {renderImage()}
              </>
            )}
          </div>
        ) : (
          <div className="mx-auto max-w-4xl">
            {renderContent()}
          </div>
        )}
      </div>
    </section>
  )
}

