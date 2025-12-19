import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { CTAConfig } from "@/lib/sanity/types"

interface CTAProps {
  cta?: CTAConfig
}

export function CTA({ cta }: CTAProps) {
  const heading = cta?.heading || "Ready to transform your infrastructure?"
  const description = cta?.description || "Join thousands of forward-thinking companies building the future with AI-powered solutions"
  const buttonText = cta?.buttonText || "Get Started"
  const disclaimer = cta?.disclaimer || "No credit card required • Free 14-day trial"

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="p-8 md:p-12 rounded-3xl bg-card/60 backdrop-blur-xl border border-border/50 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] shadow-accent/5 dark:shadow-accent/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
              {heading}
            </h2>
            <p className="text-lg text-muted-foreground mb-10 text-pretty">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 shadow-lg dark:shadow-xl border-border/50 focus:border-accent/50 focus:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:focus:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all"
              />
              <Button
                size="lg"
                className="sm:w-auto shadow-lg dark:shadow-xl hover:shadow-xl dark:hover:shadow-2xl hover:shadow-accent/20 dark:hover:shadow-accent/30 transition-all hover:-translate-y-0.5"
              >
                {buttonText}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4">{disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
