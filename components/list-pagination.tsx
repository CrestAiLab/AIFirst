import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

function hrefForPath(path: string, page: number): string {
  const base = path.endsWith("/") ? path.slice(0, -1) : path
  return page <= 1 ? base : `${base}?page=${page}`
}

interface ListPaginationProps {
  page: number
  totalPages: number
  /** Route path without query, e.g. "/insights" */
  path: string
}

export function ListPagination({ page, totalPages, path }: ListPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      {page > 1 ? (
        <Button variant="outline" size="sm" asChild>
          <Link href={hrefForPath(path, page - 1)} className="gap-1">
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Previous
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled className="pointer-events-none gap-1 opacity-50">
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Previous
        </Button>
      )}
      <span className="px-2 text-sm tabular-nums text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Button variant="outline" size="sm" asChild>
          <Link href={hrefForPath(path, page + 1)} className="gap-1">
            Next
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled className="pointer-events-none gap-1 opacity-50">
          Next
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Button>
      )}
    </nav>
  )
}
