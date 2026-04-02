import type { ContentConfig, ShowMoreConfig } from "@/lib/sanity/types"
import { urlFor } from "@/lib/sanity/image"
import Image from "next/image"
import { cn, slugify } from "@/lib/utils"
import { ShowMoreButton } from "@/components/show-more-button"

interface ContentProps {
  content?: ContentConfig
  showMore?: ShowMoreConfig
}

function eyebrowForTitle(title: string): string | null {
  const map: Record<string, string> = {
    Background: "Context",
    "Purpose of the Community Event": "Intent",
    "Expected Outcomes": "Deliverables",
  }
  return map[title] ?? null
}

export function Content({ content, showMore }: ContentProps) {
  if (!content) return null

  const title = content.title || ""
  const lead = content.lead?.trim() || ""
  const body = content.body || ""
  const items = content.items || []
  const layout = content.layout || "default"
  const image = content.image
  const imageAlt = content.imageAlt || ""
  const staticImageUrl = content.imageUrl?.trim()
  const sectionId = title ? slugify(title) : undefined
  const eyebrow = eyebrowForTitle(title)

  let resolvedImageSrc: string | null = null
  if (layout !== "default") {
    if (image?.asset) {
      try {
        resolvedImageSrc = urlFor(image).width(1200).height(800).url()
      } catch (error) {
        console.error("Error building image URL:", error, image)
      }
    }
    if (!resolvedImageSrc && staticImageUrl) {
      resolvedImageSrc = staticImageUrl
    }
  }

  const hasSplitLayout = layout !== "default" && !!resolvedImageSrc

  const renderLead = (align: "center" | "left") =>
    lead ? (
      <p
        className={cn(
          "text-lg md:text-xl text-muted-foreground/85 font-light italic leading-relaxed text-pretty",
          align === "center" ? "mt-6 text-center mx-auto max-w-2xl" : "mt-4 text-left max-w-2xl",
        )}
      >
        {lead}
      </p>
    ) : null

  const renderBody = () =>
    body ? (
      <div className="rounded-3xl glass-card border border-foreground/5 bg-card/40 p-8 md:p-10 backdrop-blur-sm">
        <p className="text-lg md:text-xl text-muted-foreground/90 font-light leading-relaxed text-pretty">
          {body}
        </p>
        <ShowMoreButton config={showMore} />
      </div>
    ) : null

  const renderItems = () =>
    items.length > 0 ? (
      <div
        className={
          body
            ? "mt-8 rounded-3xl glass-card border border-foreground/5 bg-card/40 p-6 md:p-8 backdrop-blur-sm"
            : "rounded-3xl glass-card border border-foreground/5 bg-card/40 p-6 md:p-8 backdrop-blur-sm"
        }
      >
        <ul className="space-y-0 divide-y divide-foreground/5">
          {items.map((item, index) => (
            <li key={index} className="flex gap-4 py-5 first:pt-0 last:pb-0">
              <div
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/80 dark:bg-emerald-500/55 shadow-[0_0_8px_rgba(16,185,129,0.25)] dark:shadow-[0_0_8px_rgba(52,211,153,0.15)]"
                aria-hidden
              />
              <span className="text-base md:text-lg text-muted-foreground/90 font-light leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
        {!body && <ShowMoreButton config={showMore} />}
      </div>
    ) : null

  const renderTextColumn = () => (
    <div className="flex flex-col justify-center space-y-8 min-w-0">
      {title && (
        <div className="text-left space-y-6">
          {eyebrow && (
            <div className="brand-tag inline-flex items-center gap-2 rounded-full px-5 py-1.5 backdrop-blur-md transition-opacity hover:opacity-95 cursor-default">
              <span className="brand-tag-dot h-1.5 w-1.5 rounded-full animate-pulse-slow font-mono" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-emerald-900 dark:text-emerald-300/85">
                {eyebrow}
              </span>
            </div>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground tracking-tight text-balance leading-[1.1]">
            {title}
          </h2>
          {renderLead("left")}
        </div>
      )}
      {renderBody()}
      {renderItems()}
    </div>
  )

  const renderFigure = () => {
    if (!resolvedImageSrc) return null
    const isSvg = resolvedImageSrc.endsWith(".svg")

    return (
      <div className="relative w-full aspect-[4/3] rounded-3xl glass-card border border-foreground/5 bg-card/30 backdrop-blur-sm overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08)_0%,transparent_55%)] pointer-events-none z-[1]" />
        <div className="absolute inset-0 z-[2] p-6 md:p-8 lg:p-10">
          <Image
            src={resolvedImageSrc}
            alt={imageAlt || title || "Section illustration"}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={
              isSvg
                ? "object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                : "object-cover transition-transform duration-500 group-hover:scale-105"
            }
            unoptimized={isSvg}
          />
        </div>
      </div>
    )
  }

  /** Centered heading + single column (e.g. Expected Outcomes) */
  const renderStackedLayout = () => (
    <>
      {title && (
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-14">
          {eyebrow && (
            <div className="brand-tag inline-flex items-center gap-2 rounded-full px-5 py-1.5 backdrop-blur-md transition-opacity hover:opacity-95 cursor-default mb-8">
              <span className="brand-tag-dot h-1.5 w-1.5 rounded-full animate-pulse-slow font-mono" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-emerald-900 dark:text-emerald-300/85">
                {eyebrow}
              </span>
            </div>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground tracking-tight text-balance leading-[1.1]">
            {title}
          </h2>
          {renderLead("center")}
        </div>
      )}
      <div className="mx-auto max-w-3xl">
        {renderBody()}
        {renderItems()}
      </div>
    </>
  )

  return (
    <section id={sectionId} className="relative overflow-hidden border-t border-emerald-500/[0.07] dark:border-emerald-500/[0.08] bg-background py-24 md:py-32">
      <div className="absolute inset-0 bg-background/50 z-0" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.02)_0%,transparent_50%)] z-0 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        {hasSplitLayout ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center max-w-6xl mx-auto">
            {layout === "imageLeft" ? (
              <>
                {renderFigure()}
                {renderTextColumn()}
              </>
            ) : (
              <>
                {renderTextColumn()}
                {renderFigure()}
              </>
            )}
          </div>
        ) : (
          renderStackedLayout()
        )}
      </div>
    </section>
  )
}
