import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { HeroConfig, ShowMoreConfig } from "@/lib/sanity/types"
import Link from "next/link"

interface HeroProps {
  hero?: HeroConfig
  showMore?: ShowMoreConfig
}

export function Hero({ hero }: HeroProps) {
  const badge = hero?.badge || "Artificial Intelligence and Data Festival (AIDFest)"
  const heading = hero?.heading || "Artificial Intelligence and Data Festival. Data for AI in practice."
  const description =
    hero?.description ||
    "One place to align on what \"good data\" means for AI: from labeling and evaluation sets to governance and production monitoring—so pilots turn into repeatable practice across teams and sectors."

  const primaryButton = hero?.primaryButton || "Get in touch"
  const primaryButtonUrl = hero?.primaryButtonUrl || "#"

  const secondaryButton = hero?.secondaryButton || "Events & insights"
  const secondaryButtonUrl = hero?.secondaryButtonUrl || "#"

  const showPrimaryButton = hero?.showPrimaryButton !== false
  const showSecondaryButton = hero?.showSecondaryButton !== false

  // Split heading into two parts for typographic contrast
  const firstSentenceIdx = heading.indexOf('.')
  const part1 = firstSentenceIdx !== -1 ? heading.slice(0, firstSentenceIdx + 1) : heading
  const part2 = firstSentenceIdx !== -1 ? heading.slice(firstSentenceIdx + 1).trim() : ''

  return (
    <section className="relative overflow-hidden bg-background py-32 md:py-52 flex items-center min-h-[95vh] selection:bg-emerald-500/15 selection:text-foreground dark:selection:bg-emerald-500/12">
      {/* Ambient (dark: toned down) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] z-0 rounded-full blur-[110px] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.14)_0%,rgba(45,212,191,0.06)_35%,transparent_65%)] dark:bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06)_0%,rgba(45,212,191,0.03)_38%,transparent_68%)]"
        aria-hidden
      />
      <div
        className="absolute top-[42%] left-1/2 -translate-x-1/2 w-[640px] h-[480px] z-0 rounded-full blur-[80px] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(163,230,53,0.09)_0%,transparent_62%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.035)_0%,transparent_62%)]"
        aria-hidden
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025)_0%,transparent_58%)] z-0 rounded-full blur-[100px]" />
      <div className="absolute inset-0 scanline opacity-[0.03] z-0 mix-blend-overlay" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center space-y-12">
          
          <div className="brand-tag inline-flex items-center gap-2 rounded-full px-5 py-1.5 backdrop-blur-md transition-opacity hover:opacity-95 cursor-default">
            <span className="brand-tag-dot h-1.5 w-1.5 rounded-full animate-pulse-slow font-mono" />
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-emerald-900 dark:text-emerald-300/85">{badge}</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-serif tracking-tight leading-[1.08]">
            <span className="hero-headline-solid block mb-2 font-semibold tracking-[-0.03em]">{part1}</span>
            {part2 && (
              <span className="hero-headline-gradient block font-sans font-semibold tracking-[-0.03em] mt-4 md:mt-5 text-6xl md:text-8xl">
                {part2}
              </span>
            )}
          </h1>

          <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground/90 font-light leading-relaxed tracking-wide">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {showPrimaryButton && (
              <Button
                variant="brand"
                size="lg"
                asChild
                className="group relative h-14 overflow-hidden rounded-full px-8 text-base font-medium transition-transform hover:scale-[1.01]"
              >
                <Link href={primaryButtonUrl}>
                  <span className="relative z-10 flex items-center gap-2">
                    {primaryButton}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
            )}

            {showSecondaryButton && (
              <Button
                size="lg"
                variant="outlineBrand"
                asChild
                className="group h-14 rounded-full backdrop-blur-sm px-8 text-base font-medium"
              >
                <Link href={secondaryButtonUrl}>
                  {secondaryButton}
                </Link>
              </Button>
            )}
          </div>
          
        </div>
      </div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-0 pointer-events-none" />
    </section>
  )
}
