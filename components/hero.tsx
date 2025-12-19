import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30 py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10" />
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 backdrop-blur-xl px-4 py-1.5 text-sm shadow-lg dark:shadow-xl shadow-accent/10 dark:shadow-accent/20">
            <Sparkles className="h-4 w-4 text-accent drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
            <span className="text-balance">Empowering tomorrow's infrastructure today</span>
          </div>

          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <span className="text-foreground">Build the future with </span>
            <span className="inline-block bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              AI-powered infrastructure
            </span>
          </h1>

          <p className="mb-10 text-pretty text-lg text-muted-foreground sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
            Transform your operations with cutting-edge AI solutions. Join a global community of innovators building
            scalable, intelligent infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="gap-2 text-base shadow-xl dark:shadow-2xl hover:shadow-2xl dark:hover:shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:shadow-accent/30 dark:hover:shadow-accent/40 transition-all hover:-translate-y-1"
            >
              Start Building
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base bg-card/60 backdrop-blur-xl border-border/50 shadow-lg dark:shadow-xl hover:shadow-xl dark:hover:shadow-2xl hover:shadow-accent/10 dark:hover:shadow-accent/20 transition-all hover:-translate-y-1"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </section>
  )
}
