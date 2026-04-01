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
    <section id="infrastructure" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-background/50 z-0" />
      
      {/* Subtle background glow for the section */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.02)_0%,transparent_50%)] z-0 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-20 space-y-6">
          <h2 className="text-4xl md:text-6xl font-serif font-medium mb-6 text-foreground tracking-tight">
            The Infrastructure <span className="block mt-2 text-muted-foreground/80 italic font-light">Bento Grid</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Everything you need to build, deploy, and scale intelligent infrastructure gracefully. We handle the infrastructure. You handle the innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 lg:gap-6 max-w-6xl mx-auto auto-rows-[300px] md:auto-rows-auto md:h-[600px]">
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
                className={`group relative overflow-hidden rounded-3xl glass-card border border-foreground/5 p-8 flex flex-col justify-between transition-all duration-500 hover:border-foreground/20 hover:shadow-2xl hover:-translate-y-1 bg-card/40 ${bentoClasses}`}
              >
                {/* Background glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Main Content */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="p-3 rounded-xl bg-background/50 border border-foreground/10 text-foreground/80 shadow-sm backdrop-blur-md transition-colors group-hover:bg-foreground group-hover:text-background group-hover:border-foreground">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center bg-background/30 text-foreground/40 transition-all duration-500 group-hover:text-foreground group-hover:border-foreground/30 group-hover:bg-foreground/5">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <div className="relative z-10 mt-12 md:mt-auto">
                  <h3 className="text-2xl md:text-3xl font-serif font-medium text-foreground mb-3 tracking-tight">
                    {solution?.title}
                  </h3>
                  <p className="text-muted-foreground/80 text-base md:text-lg leading-relaxed max-w-sm font-light">
                    {solution?.description}
                  </p>
                </div>
                
              </div>
            )
          })}
        </div>
        
        <div className="flex justify-center mt-16">
          <ShowMoreButton config={showMore} />
        </div>
      </div>
    </section>
  )
}
