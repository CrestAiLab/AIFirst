import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getIcon } from "@/lib/iconMap"
import { ShowMoreButton } from "@/components/show-more-button"
import type { SolutionItem, ShowMoreConfig } from "@/lib/sanity/types"
import { ArrowUpRight } from "lucide-react"

interface SolutionsProps {
  solutions?: SolutionItem[]
  showMore?: ShowMoreConfig
}

export function Solutions({ solutions, showMore }: SolutionsProps) {
  const displaySolutions = solutions && solutions.length > 0 ? solutions : []

  return (
    <section id="infrastructure" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-background/50 z-0" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            The Infrastructure <span className="text-primary text-neon tracking-widest block mt-2">BENTO GRID</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Everything you need to build, deploy, and scale intelligent infrastructure gracefully. We handle the infrastructure. You handle the innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 lg:gap-6 max-w-6xl mx-auto h-auto md:h-[600px]">
          {displaySolutions.map((solution, index) => {
            const IconComponent = getIcon(solution?.icon)
            
            // Bento Grid styling logic based on index
            let bentoClasses = "md:col-span-1 md:row-span-1"
            if (index === 0) bentoClasses = "md:col-span-2 md:row-span-1"
            if (index === 1) bentoClasses = "md:col-span-1 md:row-span-2"
            if (index === 2) bentoClasses = "md:col-span-1 md:row-span-1"
            if (index === 3) bentoClasses = "md:col-span-1 md:row-span-1"

            return (
              <div 
                key={solution?.title || index} 
                className={`group relative overflow-hidden rounded-2xl glass-card border-border/40 p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-glow-accent hover:-translate-y-1 ${bentoClasses}`}
              >
                {/* Background glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex justify-between items-start">
                  <div className="p-3 rounded-lg bg-card/80 border border-primary/20 text-primary shadow-glow">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center bg-card/30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 text-primary">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="relative z-10 mt-12 md:mt-auto">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {solution?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                    {solution?.description}
                  </p>
                </div>
                
                {/* Hover Reveal Card Layer */}
                <div className="absolute inset-0 bg-card/95 backdrop-blur-xl border border-primary/30 p-6 flex flex-col justify-center items-center text-center opacity-0 hover:opacity-100 transition-all duration-300 z-20 translate-y-4 hover:translate-y-0">
                  <div className="p-3 rounded-full bg-primary/20 mb-4 animate-pulse">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">One-Click Deployment</h4>
                  <p className="text-sm text-primary font-mono bg-primary/10 px-3 py-1 rounded">
                    terraform apply -target={solution?.title?.replace(" ", "_").toLowerCase() || "module"}
                  </p>
                  <button className="mt-6 text-xs text-muted-foreground border-b border-muted-foreground hover:text-white transition-colors">
                    View Documentation
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="flex justify-center mt-12">
          <ShowMoreButton config={showMore} />
        </div>
      </div>
    </section>
  )
}
