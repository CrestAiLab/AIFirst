import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Insights() {
  const insights = [
    {
      category: "Research",
      title: "The Future of AI Infrastructure",
      description: "Explore emerging trends and technologies shaping the next generation of intelligent systems.",
      date: "Dec 15, 2024",
      image: "/ai-infrastructure-network.jpg",
    },
    {
      category: "Case Study",
      title: "Scaling to 10M Users",
      description: "How enterprises leverage our platform to build resilient, high-performance infrastructure.",
      date: "Dec 10, 2024",
      image: "/data-center-servers.jpg",
    },
    {
      category: "Guide",
      title: "Getting Started with AI Automation",
      description: "A comprehensive guide to implementing intelligent automation in your workflow.",
      date: "Dec 5, 2024",
      image: "/automation-technology.jpg",
    },
  ]

  return (
    <section id="insights" className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest insights</h2>
            <p className="text-lg text-muted-foreground">Stay ahead with industry trends and expert perspectives</p>
          </div>
          <Button variant="outline" className="hidden md:flex gap-2 bg-transparent">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {insights.map((insight) => (
            <Card
              key={insight.title}
              className="group cursor-pointer overflow-hidden bg-card/80 backdrop-blur-xl border-border/50 hover:border-accent/50 shadow-lg dark:shadow-xl hover:shadow-2xl dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:shadow-accent/15 dark:hover:shadow-accent/25 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-[2/1] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <img
                  src={insight.image || "/placeholder.svg"}
                  alt={insight.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <div className="text-xs font-semibold text-accent mb-2 drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                  {insight.category}
                </div>
                <CardTitle className="text-xl group-hover:text-accent transition-colors bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:via-accent group-hover:to-primary">
                  {insight.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-3 leading-relaxed">{insight.description}</CardDescription>
                <div className="text-xs text-muted-foreground">{insight.date}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center md:hidden">
          <Button variant="outline" className="gap-2 bg-transparent">
            View All Insights
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
