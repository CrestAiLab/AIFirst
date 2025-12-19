import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, BookOpen, Calendar } from "lucide-react"

export function Community() {
  const features = [
    {
      icon: Users,
      title: "Global Network",
      description: "Connect with 500K+ professionals",
    },
    {
      icon: MessageSquare,
      title: "Discussions",
      description: "Join expert-led conversations",
    },
    {
      icon: BookOpen,
      title: "Resources",
      description: "Access exclusive learning materials",
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Attend workshops and webinars",
    },
  ]

  return (
    <section id="community" className="py-20 md:py-28">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Join a thriving community of innovators
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Connect with like-minded professionals, share knowledge, and collaborate on groundbreaking projects. Our
              community is where innovation happens.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl hover:shadow-accent/10 dark:hover:shadow-accent/20 hover:-translate-y-0.5"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 shadow-md dark:shadow-lg border border-accent/20">
                      <feature.icon className="h-5 w-5 text-accent drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">{feature.title}</div>
                    <div className="text-sm text-muted-foreground">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="shadow-lg dark:shadow-xl hover:shadow-xl dark:hover:shadow-2xl hover:shadow-accent/20 dark:hover:shadow-accent/30 transition-all hover:-translate-y-0.5"
            >
              Join Community
            </Button>
          </div>

          <div className="relative">
            <Card className="bg-card/80 backdrop-blur-xl border-border/50 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] shadow-accent/5 dark:shadow-accent/10">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                  Latest Discussion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all cursor-pointer border border-transparent hover:border-border/50 hover:shadow-md dark:hover:shadow-lg"
                  >
                    <div className="h-10 w-10 rounded-full bg-accent/20 shadow-sm border border-accent/30" />
                    <div className="flex-1">
                      <div className="font-medium text-sm mb-1">Discussion Topic {i}</div>
                      <div className="text-xs text-muted-foreground">Started 2 hours ago • 24 replies</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
