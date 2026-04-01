import { Button } from "@/components/ui/button"
import { ArrowRight, Terminal } from "lucide-react"
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

  return (
    <section className="relative overflow-hidden bg-background py-32 md:py-48 flex items-center min-h-[90vh]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 scanline opacity-20" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center space-y-10">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-2 shadow-glow-accent shadow-primary/20 backdrop-blur-md transition-all hover:bg-primary/20">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono tracking-wider text-primary font-medium uppercase">{badge}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            <span className="block mb-2">{heading.split('.')[0]}.</span>
            <span className="gradient-text-safe text-transparent">{heading.split('.').slice(1).join('.').trim()}</span>
          </h1>

          <p className="mx-auto max-w-3xl text-lg md:text-2xl text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            {showPrimaryButton && (
              <Button
                size="lg"
                asChild
                className="group relative h-14 overflow-hidden rounded-full bg-primary px-8 text-lg font-bold text-black transition-all hover:bg-primary/90 shadow-glow hover:shadow-glow-accent"
              >
                <Link href={primaryButtonUrl}>
                  <span className="relative z-10 flex items-center gap-2 font-mono">
                    {primaryButton}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
            )}

            {showSecondaryButton && (
              <Button
                size="lg"
                variant="outline"
                asChild
                className="group h-14 rounded-full border-border/50 bg-card/40 backdrop-blur-xl px-8 text-lg font-medium text-white transition-all hover:bg-white/10 hover:border-white/20"
              >
                <Link href={secondaryButtonUrl}>
                  {secondaryButton}
                </Link>
              </Button>
            )}
          </div>
          
        </div>
      </div>
      
      {/* Decorative Grid */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-background via-background/90 to-transparent z-0" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  )
}
