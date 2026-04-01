import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { HeroConfig, ShowMoreConfig } from "@/lib/sanity/types"
import Link from "next/link"

interface HeroProps {
  hero?: HeroConfig
  showMore?: ShowMoreConfig
}

export function Hero({ hero }: HeroProps) {
  const badge = hero?.badge || "Next-Gen AI Platform"
  const heading = hero?.heading || "AI Infrastructure Made Simple. Zero to Production in Minutes."
  const description = hero?.description || "From students to enterprise researchers—we provide the Dagster orchestration, Vector/Graph databases, and RAG support so you can focus on the work that matters."
  
  const primaryButton = hero?.primaryButton || "Book a Consultation"
  const primaryButtonUrl = hero?.primaryButtonUrl || "#"
  
  const secondaryButton = hero?.secondaryButton || "Explore the Knowledge Hub"
  const secondaryButtonUrl = hero?.secondaryButtonUrl || "#"

  const showPrimaryButton = hero?.showPrimaryButton !== false
  const showSecondaryButton = hero?.showSecondaryButton !== false

  // Split heading into two parts for typographic contrast
  const firstSentenceIdx = heading.indexOf('.')
  const part1 = firstSentenceIdx !== -1 ? heading.slice(0, firstSentenceIdx + 1) : heading
  const part2 = firstSentenceIdx !== -1 ? heading.slice(firstSentenceIdx + 1).trim() : ''

  return (
    <section className="relative overflow-hidden bg-background py-32 md:py-52 flex items-center min-h-[95vh] selection:bg-foreground/20 selection:text-foreground">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] z-0 rounded-full blur-[100px]" />
      <div className="absolute inset-0 scanline opacity-[0.03] z-0 mix-blend-overlay" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center space-y-12">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-5 py-1.5 backdrop-blur-md transition-all hover:bg-foreground/10 hover:border-foreground/20 cursor-default">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse-slow font-mono"></span>
            <span className="text-xs font-mono tracking-[0.2em] text-foreground/80 uppercase">{badge}</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-serif tracking-tight text-foreground leading-[1.1]">
            <span className="block mb-2 text-foreground/90">{part1}</span>
            {part2 && <span className="block text-muted-foreground/80 text-5xl md:text-7xl font-sans font-semibold tracking-[-0.02em] mt-6">{part2}</span>}
          </h1>

          <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground/80 font-light leading-relaxed tracking-wide">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {showPrimaryButton && (
              <Button
                size="lg"
                asChild
                className="group relative h-14 overflow-hidden rounded-full bg-foreground px-8 text-base font-medium text-background transition-all hover:bg-foreground/90 hover:scale-[1.02]"
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
                variant="outline"
                asChild
                className="group h-14 rounded-full border-border/40 bg-transparent backdrop-blur-sm px-8 text-base font-medium text-foreground transition-all hover:bg-foreground/5 hover:border-foreground/20"
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
