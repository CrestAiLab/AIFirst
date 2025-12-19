import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { client } from "@/lib/sanity/client"
import { insightBySlugQuery, allInsightsQuery } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/image"
import { PortableText } from "@portabletext/react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { portableTextComponents } from "@/lib/portableTextComponents"
import Image from "next/image"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const insights = await client.fetch(allInsightsQuery)
    return insights.map((insight: any) => ({
      slug: insight.slug.current,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function InsightPage({ params }: PageProps) {
  const { slug } = await params
  const insight = await client.fetch(insightBySlugQuery, { slug })

  if (!insight) {
    notFound()
  }

  const imageUrl = insight.image
    ? urlFor(insight.image).width(1200).height(600).url()
    : "/placeholder.svg"
  const date = insight.publishedAt
    ? new Date(insight.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : ""

  return (
    <main className="min-h-screen">
      <Header />
      <article className="py-12 md:py-20">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/insights">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                All Insights
              </Button>
            </Link>
          </div>

          <div className="mb-8">
            <div className="text-sm font-semibold text-accent mb-4">
              {insight.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              {insight.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <span>{date}</span>
              {insight.author && <span>•</span>}
              {insight.author && <span>By {insight.author}</span>}
            </div>
          </div>

          {insight.image && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl relative aspect-[2/1]">
              <Image
                src={imageUrl}
                alt={insight.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          )}

          <div className="mb-12 text-foreground">
            {insight.content ? (
              <PortableText value={insight.content} components={portableTextComponents} />
            ) : (
              <div className="text-muted-foreground">
                <p className="text-lg leading-relaxed">{insight.description}</p>
              </div>
            )}
          </div>

          <div className="pt-8 border-t border-border">
            <Link href="/insights">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                View All Insights
              </Button>
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}

