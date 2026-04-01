import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShowMoreButton } from "@/components/show-more-button"
import type { CTAConfig, ShowMoreConfig } from "@/lib/sanity/types"
import Link from "next/link"

interface CTAProps {
  cta?: CTAConfig
  showMore?: ShowMoreConfig
}

export function CTA({ cta, showMore }: CTAProps) {
  const heading = cta?.heading || "Ready to transform your infrastructure?"
  const description = cta?.description || "Join thousands of forward-thinking companies building the future with AI-powered solutions"
  const buttonText = cta?.buttonText || "Get Started"
  const buttonUrl = cta?.buttonUrl || "#"
  const disclaimer = cta?.disclaimer || "No credit card required • Free 14-day trial"

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-teal-600/[0.03]" />
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="p-8 md:p-12 rounded-3xl bg-card/60 backdrop-blur-xl border border-border/50 dark:border-emerald-500/10 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance bg-gradient-to-r from-foreground via-emerald-600/80 to-foreground dark:via-emerald-500/60 bg-clip-text text-transparent">
              {heading}
            </h2>
            <p className="text-lg text-muted-foreground mb-10 text-pretty">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 shadow-lg dark:shadow-xl border-border/50 focus:border-emerald-500/40 dark:focus:border-emerald-500/25 focus:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:focus:shadow-[0_0_18px_rgba(16,185,129,0.08)] transition-all"
              />
              {buttonUrl.startsWith("/") || buttonUrl.startsWith("#") ? (
                <Link href={buttonUrl}>
                  <Button
                    variant="brand"
                    size="lg"
                    className="sm:w-auto hover:-translate-y-0.5 transition-transform"
                  >
                    {buttonText}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="brand"
                  size="lg"
                  className="sm:w-auto hover:-translate-y-0.5 transition-transform"
                  asChild
                >
                  <a href={buttonUrl} target="_blank" rel="noopener noreferrer">
                    {buttonText}
                  </a>
                </Button>
              )}
            </div>

            <p className="text-xs text-muted-foreground mt-4">{disclaimer}</p>
          </div>
        </div>
        <ShowMoreButton config={showMore} />
      </div>
    </section>
  )
}
