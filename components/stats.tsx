import { ShowMoreButton } from "@/components/show-more-button"
import type { StatItem, ShowMoreConfig } from "@/lib/sanity/types"

interface StatsProps {
  stats?: StatItem[]
  showMore?: ShowMoreConfig
}

export function Stats({ stats, showMore }: StatsProps) {
  const displayStats = stats && stats.length > 0 ? stats : []

  if (displayStats.length === 0) return null

  return (
    <section className="relative overflow-hidden border-y border-border/50 bg-card py-12 backdrop-blur-md">
      <div className="absolute inset-0 scanline opacity-30 mix-blend-overlay pointer-events-none" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border/50 justify-center items-center">
          {displayStats.map((stat, index) => (
            <div
              key={stat?.label || index}
              className="flex-1 w-full text-center py-6 md:py-0 px-8 group transition-all"
            >
              <div className="text-3xl md:text-4xl font-mono font-bold text-white mb-2 tracking-tight group-hover:text-primary transition-colors">
                {stat?.value}
              </div>
              <div className="text-sm uppercase tracking-widest text-primary font-bold mb-1">
                {stat?.label}
              </div>
              <div className="text-xs text-muted-foreground text-balance">
                {stat?.description}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <ShowMoreButton config={showMore} />
        </div>
      </div>
    </section>
  )
}
