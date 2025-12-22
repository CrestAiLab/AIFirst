import { ShowMoreButton } from "@/components/show-more-button"
import type { StatItem, ShowMoreConfig } from "@/lib/sanity/types"

interface StatsProps {
  stats?: StatItem[]
  showMore?: ShowMoreConfig
}

const defaultStats = [
  {
    value: "500K+",
    label: "Active Users",
    description: "Professionals worldwide trust our platform",
  },
  {
    value: "99.9%",
    label: "Uptime",
    description: "Industry-leading reliability",
  },
  {
    value: "150+",
    label: "Countries",
    description: "Global reach and impact",
  },
  {
    value: "10M+",
    label: "API Calls",
    description: "Processed daily across infrastructure",
  },
]

export function Stats({ stats, showMore }: StatsProps) {
  const displayStats = stats && stats.length > 0 ? stats : defaultStats

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {displayStats.map((stat, index) => (
            <div
              key={stat?.label || index}
              className="group text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-accent/10 dark:hover:shadow-accent/20 hover:-translate-y-1"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 text-foreground">
                {stat?.value}
              </div>
              <div className="text-sm md:text-base font-semibold mb-1 text-foreground">{stat?.label}</div>
              <div className="text-xs md:text-sm text-muted-foreground text-balance">{stat?.description}</div>
            </div>
          ))}
        </div>
        <ShowMoreButton config={showMore} />
      </div>
    </section>
  )
}
