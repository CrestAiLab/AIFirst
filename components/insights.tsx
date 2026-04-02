import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { urlFor } from "@/lib/sanity/image"
import { ShowMoreButton } from "@/components/show-more-button"
import Link from "next/link"
import type { Insight, InsightsConfig, ShowMoreConfig } from "@/lib/sanity/types"
import Image from "next/image"

interface InsightsProps {
  insights?: Insight[]
  sectionConfig?: InsightsConfig
  showMore?: ShowMoreConfig
}

export function Insights({ insights = [], sectionConfig, showMore }: InsightsProps) {
  const heading = sectionConfig?.heading || "Resources & ongoing collaboration"
  const description =
    sectionConfig?.description ||
    "Follow updates on working groups, playbooks, pilots, and reusable artifacts—plus ways to stay involved after the event."
  const buttonText = sectionConfig?.buttonText || "Browse insights"
  const buttonUrl = sectionConfig?.buttonUrl || "/insights"

  const displayInsights = insights.slice(0, 3)

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
    } else {
      return (
        <Button variant="outlineBrand" className="hidden md:flex gap-2 rounded-full" asChild>
          <a href={buttonUrl} target="_blank" rel="noopener noreferrer">
            {buttonText}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      )
    }
  }

  return (
    <section id="insights" className="py-24 md:py-32 bg-background relative border-t border-foreground/5 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.02)_0%,transparent_60%)] -z-10 rounded-full blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-4 tracking-tight text-foreground">{heading}</h2>
            <p className="text-lg text-muted-foreground/80 font-light">{description}</p>
          </div>
          {renderButton()}
        </div>

        {displayInsights.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {displayInsights.map((insight) => {
              const imageUrl = insight.image
                ? urlFor(insight.image).width(800).height(400).url()
                : "/placeholder.svg"
              const date = insight.publishedAt
                ? new Date(insight.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : ""

              return (
                <Link
                  key={insight._id}
                  href={`/insights/${insight.slug.current}`}
                  className="block group"
                >
                  <Card className="h-full bg-transparent border-none shadow-none overflow-hidden relative">
                    <div className="aspect-[16/9] overflow-hidden rounded-2xl relative mb-6">
                      <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none mix-blend-overlay" />
                      <Image
                        src={imageUrl}
                        alt={insight.title}
                        fill
                        className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <CardHeader className="p-0 mb-3">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-mono uppercase tracking-widest text-foreground/60 group-hover:text-emerald-700 dark:group-hover:text-emerald-400/85 transition-colors">
                          {insight.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-emerald-500/35" />
                        <span className="text-xs font-mono text-muted-foreground/60">{date}</span>
                      </div>
                      <CardTitle className="text-2xl font-serif font-medium leading-tight group-hover:text-foreground/80 transition-colors text-foreground tracking-tight">
                        {insight.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <CardDescription className="text-base font-light leading-relaxed text-muted-foreground/80 line-clamp-3">
                        {insight.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl border border-dashed border-foreground/10 text-muted-foreground/50">
            <p className="font-light">No insights available yet. Check back soon!</p>
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
