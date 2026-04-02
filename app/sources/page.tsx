import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ListPagination } from "@/components/list-pagination"
import { SourceCard } from "@/components/source-card"
import { client } from "@/lib/sanity/client"
import { sourcesCountQuery, sourcesPaginatedQuery } from "@/lib/sanity/queries"
import { enrichSources } from "@/lib/sources/enrich"
import type { Source } from "@/lib/sanity/types"
import { LIST_PAGE_SIZE, clampPage, parsePageParam } from "@/lib/pagination"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const revalidate = 3600

type Props = {
  searchParams: Promise<{ page?: string }>
}

export default async function SourcesPage({ searchParams }: Props) {
  const pageParam = parsePageParam((await searchParams).page)

  const total = await client
    .fetch(sourcesCountQuery, {}, { next: { tags: ["sources"] } })
    .catch(() => 0)
  const totalPages = Math.max(1, Math.ceil(Number(total) / LIST_PAGE_SIZE))
  const page = clampPage(pageParam, totalPages)
  const from = (page - 1) * LIST_PAGE_SIZE
  const to = page * LIST_PAGE_SIZE

  const raw = await client
    .fetch(sourcesPaginatedQuery, { start: from, end: to }, { next: { tags: ["sources"] } })
    .catch(() => [])
  const list = Array.isArray(raw) ? (raw as Source[]) : []
  const sources = await enrichSources(list)

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-20 md:py-32">
        <div className="container">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="mx-auto max-w-4xl mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Sources</h1>
          </div>

          {sources.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sources.map((item) => (
                  <SourceCard key={item._id} item={item} variant="page" />
                ))}
              </div>
              <ListPagination page={page} totalPages={totalPages} path="/sources" />
            </>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No sources yet. Add them in Sanity Studio.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
