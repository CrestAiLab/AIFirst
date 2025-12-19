import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { client } from "@/lib/sanity/client"
import { allInsightsQuery } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/image"
import Link from "next/link"

export default async function InsightsPage() {
  const insights = await client.fetch(allInsightsQuery)

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Latest Insights
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Stay ahead with industry trends and expert perspectives
            </p>
          </div>

          {insights && insights.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insights.map((insight: any) => {
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
                        <img
                          src={imageUrl}
                          alt={insight.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
        </div>
      </section>
      <Footer />
    </main>
  )
}

