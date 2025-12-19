import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getIcon } from "@/lib/iconMap"
import type { PageContent } from "@/lib/sanity/types"

interface SolutionsProps {
  solutions?: PageContent['solutions']
}

const defaultSolutions = [
  {
    icon: "Brain",
    title: "AI-Powered Analytics",
    description:
      "Harness the power of machine learning to gain actionable insights from your infrastructure data in real-time.",
  },
  {
    icon: "Cloud",
    title: "Cloud Infrastructure",
    description:
      "Scalable, resilient cloud solutions designed for the modern enterprise. Deploy anywhere, scale infinitely.",
  },
  {
    icon: "Database",
    title: "Data Management",
    description: "Intelligent data orchestration and management systems that grow with your business needs.",
  },
  {
    icon: "Zap",
    title: "Automation",
    description:
      "Streamline operations with intelligent automation that learns and adapts to your workflow patterns.",
  },
]

export function Solutions({ solutions }: SolutionsProps) {
  const displaySolutions = solutions && solutions.length > 0 ? solutions : defaultSolutions

  return (
    <section id="solutions" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Powerful solutions for modern infrastructure
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Everything you need to build, deploy, and scale intelligent infrastructure
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displaySolutions.map((solution, index) => {
            const IconComponent = getIcon(solution?.icon)
            return (
              <Card
                key={solution?.title || index}
                className="bg-card/80 backdrop-blur-xl border-border/50 hover:border-accent/50 shadow-lg dark:shadow-xl hover:shadow-2xl dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:shadow-accent/15 dark:hover:shadow-accent/25 transition-all duration-300 hover:-translate-y-2 group"
              >
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 shadow-md dark:shadow-lg border border-accent/20 group-hover:border-accent/50 group-hover:shadow-lg dark:group-hover:shadow-xl transition-all">
                    <IconComponent className="h-6 w-6 text-accent drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]" />
                  </div>
                  <CardTitle className="text-xl bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                    {solution?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{solution?.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
