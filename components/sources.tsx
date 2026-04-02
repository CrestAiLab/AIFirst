import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ShowMoreButton } from "@/components/show-more-button"
import Link from "next/link"
import type { SourceDisplay, SourcesConfig, ShowMoreConfig } from "@/lib/sanity/types"
import { SourceCard } from "@/components/source-card"

interface SourcesProps {
  sources?: SourceDisplay[]
  sectionConfig?: SourcesConfig
  showMore?: ShowMoreConfig
}

export function Sources({ sources = [], sectionConfig, showMore }: SourcesProps) {
  const heading = sectionConfig?.heading || "Curated sources"
  const description =
    sectionConfig?.description || "Recommended reading and listening."
  const buttonText = sectionConfig?.buttonText || "Browse sources"
  const buttonUrl = sectionConfig?.buttonUrl || "/sources"

  const displaySources = sources.slice(0, 3)

  const renderButton = () => {
    if (buttonUrl.startsWith("/") || buttonUrl.startsWith("#")) {
      return (
        <Link href={buttonUrl}>
          <Button variant="outlineBrand" className="hidden md:flex gap-2 rounded-full">
            {buttonText}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      )
    }
    return (
      <Button variant="outlineBrand" className="hidden md:flex gap-2 rounded-full" asChild>
        <a href={buttonUrl} target="_blank" rel="noopener noreferrer">
          {buttonText}
          <ArrowRight className="h-4 w-4" />
        </a>
      </Button>
    )
  }

  return (
    <section id="sources" className="py-24 md:py-32 bg-background relative border-t border-foreground/5 overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.06)_0%,transparent_55%)] -z-10 rounded-full blur-[90px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-4 tracking-tight text-foreground">{heading}</h2>
            <p className="text-lg text-muted-foreground/80 font-light">{description}</p>
          </div>
          {renderButton()}
        </div>

        {displaySources.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {displaySources.map((item) => (
              <SourceCard key={item._id} item={item} variant="home" />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl border border-dashed border-foreground/10 text-muted-foreground/50">
            <p className="font-light">No sources yet. Add some in the studio.</p>
          </div>
        )}

        <div className="text-center md:hidden">
          {buttonUrl.startsWith("/") || buttonUrl.startsWith("#") ? (
            <Link href={buttonUrl}>
              <Button variant="outlineBrand" className="gap-2 rounded-full">
                {buttonText}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button variant="outlineBrand" className="gap-2 rounded-full" asChild>
              <a href={buttonUrl} target="_blank" rel="noopener noreferrer">
                {buttonText}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>

        <div className="flex justify-center">
          <ShowMoreButton config={showMore} />
        </div>
      </div>
    </section>
  )
}
