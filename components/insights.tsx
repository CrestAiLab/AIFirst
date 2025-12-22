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
  const heading = sectionConfig?.heading || "Latest insights"
  const description = sectionConfig?.description || "Stay ahead with industry trends and expert perspectives"
  const buttonText = sectionConfig?.buttonText || "View All"
  const buttonUrl = sectionConfig?.buttonUrl || "/insights"

  const displayInsights = insights.slice(0, 3)

  const renderButton = () => {
    if (buttonUrl.startsWith("/") || buttonUrl.startsWith("#")) {
      return (
        <Link href={buttonUrl}>
          <Button variant="outline" className="hidden md:flex gap-2 bg-transparent">
            {buttonText}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      )
    } else {
      return (
        <Button variant="outline" className="hidden md:flex gap-2 bg-transparent" asChild>
          <a href={buttonUrl} target="_blank" rel="noopener noreferrer">
            {buttonText}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      )
    }
  }

  return (
    <section id="insights" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>
          {renderButton()}
        </div>

        {displayInsights.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
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
                  className="block"
                >
                  <Card className="group cursor-pointer overflow-hidden bg-card/80 backdrop-blur-xl border-border/50 hover:border-accent/50 shadow-lg dark:shadow-xl hover:shadow-2xl dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:shadow-accent/15 dark:hover:shadow-accent/25 transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="aspect-[2/1] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                    <Image
                      src={imageUrl}
                      alt={insight.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader>
                    <div className="text-xs font-semibold text-accent mb-2 drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                      {insight.category}
                    </div>
                    <CardTitle className="text-xl group-hover:text-accent transition-colors bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:via-accent group-hover:to-primary">
                      {insight.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-3 leading-relaxed">{insight.description}</CardDescription>
                    <div className="text-xs text-muted-foreground">{date}</div>
                  </CardContent>
                </Card>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No insights available yet. Check back soon!</p>
          </div>
        )}

        <div className="text-center md:hidden">
          {buttonUrl.startsWith("/") || buttonUrl.startsWith("#") ? (
            <Link href={buttonUrl}>
              <Button variant="outline" className="gap-2 bg-transparent">
                {buttonText}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button variant="outline" className="gap-2 bg-transparent" asChild>
              <a href={buttonUrl} target="_blank" rel="noopener noreferrer">
                {buttonText}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
        <ShowMoreButton config={showMore} />
      </div>
    </section>
  )
}
