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
    <section className="relative overflow-hidden border-y border-emerald-500/[0.07] dark:border-emerald-500/[0.08] bg-background py-16 md:py-24">
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-emerald-500/[0.08] dark:divide-emerald-500/[0.1] justify-center items-center">
          {displayStats.map((stat, index) => (
            <div
              key={stat?.label || index}
              className="flex-1 w-full text-center py-10 md:py-0 px-8 group transition-all"
            >
              <div className="text-5xl md:text-6xl font-serif font-medium text-foreground mb-4 tracking-tight group-hover:scale-105 transition-transform duration-500">
                {stat?.value}
              </div>
              <div className="text-sm tracking-[0.2em] text-foreground/60 font-mono mb-2 uppercase">
                {stat?.label}
              </div>
              <div className="text-sm text-muted-foreground/80 text-balance font-light">
                {stat?.description}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <ShowMoreButton config={showMore} />
        </div>
      </div>
    </section>
  )
}
