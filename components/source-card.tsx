"use client"

import { useCallback, useEffect, useId, useState } from "react"
import { createPortal } from "react-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Link2, Mic, Newspaper, ScrollText, type LucideIcon } from "lucide-react"
import type { SourceDisplay } from "@/lib/sanity/types"
import { cn } from "@/lib/utils"

const KIND_LABEL: Record<string, string> = {
  paper: "Paper",
  podcast: "Podcast",
  article: "Article",
  link: "Link",
}

const KIND_ICONS: Record<string, LucideIcon> = {
  paper: ScrollText,
  podcast: Mic,
  article: Newspaper,
  link: Link2,
}

/** Never depends on /placeholder.svg (avoids broken img if static asset 404s in prod). */
const IMG_FALLBACK_DATA =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><defs><linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#fafafa"/><stop offset="100%" stop-color="#e4e4e7"/></linearGradient></defs><rect width="800" height="400" fill="url(#g)"/><rect width="800" height="400" fill="#09090b" fill-opacity="0.04"/></svg>`
  )

function KindIcon({ kind, className }: { kind: string; className?: string }) {
  const Icon = KIND_ICONS[kind] ?? Link2
  return <Icon className={cn("shrink-0", className)} aria-hidden />
}

interface SourceCardProps {
  item: SourceDisplay
  variant?: "home" | "page"
}

export function SourceCard({ item, variant = "home" }: SourceCardProps) {
  const titleId = useId()
  const desc = item.description?.trim()
  const hasDetails = Boolean(desc)
  const sourceInfo = item.sourceInfo?.trim()

  const [mounted, setMounted] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)

  const date = item.publishedAt
    ? new Date(item.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : ""
  const kind = KIND_LABEL[item.kind] ?? item.kind

  const closeModal = useCallback(() => {
    setModalOpen(false)
    document.body.style.overflow = ""
  }, [])

  const openModal = () => {
    setModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setImgFailed(false)
  }, [item.displayImageUrl])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [modalOpen, closeModal])

  const isHome = variant === "home"

  const modalContent =
    hasDetails && mounted && modalOpen ? (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-md dark:bg-black/60 dark:backdrop-blur-lg"
          aria-hidden
          onClick={closeModal}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={hasDetails ? `${titleId}-desc` : undefined}
          className="relative z-10 flex min-h-0 w-full max-w-[min(100vw-2rem,28rem)] max-h-[85vh] flex-col overflow-hidden rounded-2xl border border-border bg-background p-0 text-foreground shadow-2xl"
        >
          <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border/60 px-6 pb-3 pt-6">
            <h2 id={titleId} className="pr-2 text-lg font-semibold leading-snug text-foreground">
              {item.title}
            </h2>
            <button
              type="button"
              onClick={closeModal}
              className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <span aria-hidden className="text-xl leading-none">
                ×
              </span>
            </button>
          </div>
          <div className="shrink-0 space-y-1.5 px-6 pb-3 pt-3">
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <KindIcon kind={item.kind} className="h-4 w-4 text-emerald-700 dark:text-emerald-400/85" />
              <span>
                {kind}
                {date ? ` · ${date}` : null}
              </span>
            </p>
            {sourceInfo ? (
              <p className="text-sm text-muted-foreground leading-snug pl-6">{sourceInfo}</p>
            ) : null}
          </div>
          <div className="dialog-body-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-6">
            <p id={`${titleId}-desc`} className="text-sm leading-relaxed text-foreground whitespace-pre-wrap pb-0.5">
              {desc}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-border/60 bg-background px-6 pb-6 pt-4">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="border border-border/80 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              onClick={closeModal}
            >
              Close
            </Button>
            <Button variant="brand" size="sm" asChild>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                Open link
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    ) : null

  const imageSrc = imgFailed ? IMG_FALLBACK_DATA : item.displayImageUrl

  return (
    <>
      <Card
        className={cn(
          "group h-full overflow-hidden relative",
          isHome
            ? "bg-transparent border-none shadow-none"
            : "cursor-default bg-card/80 backdrop-blur-xl border-border/50 shadow-lg dark:shadow-xl [@media(hover:hover)]:hover:border-accent/50 [@media(hover:hover)]:hover:shadow-2xl dark:[@media(hover:hover)]:hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] [@media(hover:hover)]:hover:shadow-accent/15 dark:[@media(hover:hover)]:hover:shadow-accent/25 transition-all duration-300 [@media(hover:hover)]:hover:-translate-y-2"
        )}
      >
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          aria-label={`Open ${item.title} in a new tab`}
        >
          <div
            className={cn(
              "overflow-hidden relative bg-muted/40",
              isHome ? "aspect-[16/9] rounded-2xl mb-6" : "aspect-[2/1]"
            )}
          >
            <div
              className={cn(
                "absolute inset-0 z-10 pointer-events-none mix-blend-overlay",
                isHome
                  ? "bg-foreground/10 group-hover:bg-transparent transition-colors duration-500"
                  : "bg-gradient-to-t from-black/60 via-transparent to-transparent"
              )}
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- og:image / proxy / Sanity CDN */}
            <img
              src={imageSrc}
              alt=""
              onError={() => setImgFailed(true)}
              className={cn(
                "absolute inset-0 w-full h-full object-cover",
                isHome
                  ? "scale-105 group-hover:scale-100 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0"
                  : "transition-transform duration-500 motion-reduce:transform-none"
              )}
            />
            <div
              className={cn(
                "absolute z-20 rounded-full bg-background/85 backdrop-blur-sm p-1.5 shadow-sm border border-border/50",
                isHome ? "top-3 right-3 opacity-90 group-hover:opacity-100 transition-opacity" : "top-2 right-2 bg-background/90"
              )}
            >
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
            </div>
            <div
              className={cn(
                "absolute z-20 rounded-full bg-background/85 backdrop-blur-sm p-1.5 shadow-sm border border-border/50 text-emerald-700 dark:text-emerald-400/90",
                isHome ? "bottom-3 left-3" : "bottom-2 left-2"
              )}
              title={kind}
            >
              <KindIcon kind={item.kind} className="h-3.5 w-3.5" />
            </div>
          </div>
        </a>

        <CardHeader className={cn(isHome ? "p-0 mb-3" : "")}>
          {isHome ? (
            <div className="mb-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <KindIcon
                  kind={item.kind}
                  className="h-4 w-4 text-emerald-700 dark:text-emerald-400/85"
                />
                <span className="text-xs font-mono uppercase tracking-widest text-foreground/60 group-hover:text-emerald-700 dark:group-hover:text-emerald-400/85 transition-colors">
                  {kind}
                </span>
                <span className="w-1 h-1 rounded-full bg-emerald-500/35" />
                <span className="text-xs font-mono text-muted-foreground/60">{date}</span>
              </div>
              {sourceInfo ? (
                <p className="text-xs leading-snug text-muted-foreground line-clamp-2 border-l-2 border-emerald-500/25 pl-2.5 font-light">
                  {sourceInfo}
                </p>
              ) : null}
            </div>
          ) : (
            <div className="mb-2 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <KindIcon kind={item.kind} className="h-4 w-4 shrink-0" />
                <span>
                  {kind}
                  {date ? <span className="text-muted-foreground font-normal"> · {date}</span> : null}
                </span>
              </div>
              {sourceInfo ? (
                <p className="text-xs text-muted-foreground leading-snug line-clamp-2 border-l-2 border-emerald-500/25 pl-2.5">
                  {sourceInfo}
                </p>
              ) : null}
            </div>
          )}
          <CardTitle
            className={cn(
              isHome
                ? "text-2xl font-serif font-medium leading-tight group-hover:text-foreground/80 transition-colors text-foreground tracking-tight"
                : "text-xl font-semibold text-foreground transition-colors [@media(hover:hover)]:group-hover:text-emerald-700 dark:[@media(hover:hover)]:group-hover:text-emerald-300"
            )}
          >
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4 decoration-emerald-600/40"
            >
              {item.title}
            </a>
          </CardTitle>
        </CardHeader>

        {hasDetails ? (
          <CardContent className={cn(isHome ? "p-0" : "")}>
            <CardDescription
              className={cn(
                "leading-relaxed",
                isHome
                  ? "text-base font-light line-clamp-3 text-muted-foreground"
                  : "line-clamp-3 text-foreground/80 dark:text-zinc-400"
              )}
            >
              {desc}
            </CardDescription>
            <Button
              type="button"
              variant="link"
              className="mt-1 h-auto p-0 font-semibold text-emerald-700 underline-offset-4 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
              onClick={openModal}
            >
              Read more
            </Button>
          </CardContent>
        ) : null}
      </Card>

      {modalContent ? createPortal(modalContent, document.body) : null}
    </>
  )
}
