import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getIcon } from "@/lib/iconMap"
import { urlFor } from "@/lib/sanity/image"
import type { CommunityPost, CommunityConfig } from "@/lib/sanity/types"
import Image from "next/image"

interface CommunityProps {
  community?: CommunityConfig
  featuredPosts?: CommunityPost[]
}

const defaultFeatures = [
  {
    icon: "Users",
    title: "Global Network",
    description: "Connect with 500K+ professionals",
  },
  {
    icon: "MessageSquare",
    title: "Discussions",
    description: "Join expert-led conversations",
  },
  {
    icon: "BookOpen",
    title: "Resources",
    description: "Access exclusive learning materials",
  },
  {
    icon: "Calendar",
    title: "Events",
    description: "Attend workshops and webinars",
  },
]

export function Community({ community, featuredPosts = [] }: CommunityProps) {
  const heading = community?.heading || "Join a thriving community of innovators"
  const description = community?.description || "Connect with like-minded professionals, share knowledge, and collaborate on groundbreaking projects. Our community is where innovation happens."
  const buttonText = community?.buttonText || "Join Community"
  const features = community?.features && community.features.length > 0 ? community.features : defaultFeatures
  const displayPosts = featuredPosts.slice(0, 3)

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
    return date.toLocaleDateString()
  }

  return (
    <section id="community" className="py-20 md:py-28">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              {heading}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => {
                const IconComponent = getIcon(feature?.icon)
                return (
                  <div
                    key={feature?.title || index}
                    className="flex gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl hover:shadow-accent/10 dark:hover:shadow-accent/20 hover:-translate-y-0.5"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 shadow-md dark:shadow-lg border border-accent/20">
                        <IconComponent className="h-5 w-5 text-accent drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">{feature?.title}</div>
                      <div className="text-sm text-muted-foreground">{feature?.description}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            <Button
              size="lg"
              className="shadow-lg dark:shadow-xl hover:shadow-xl dark:hover:shadow-2xl hover:shadow-accent/20 dark:hover:shadow-accent/30 transition-all hover:-translate-y-0.5"
            >
              {buttonText}
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
                {displayPosts.length > 0 ? (
                  displayPosts.map((post) => {
                    const avatarUrl = post.author?.avatar
                      ? urlFor(post.author.avatar).width(40).height(40).url()
                      : undefined
                    return (
                      <div
                        key={post._id}
                        className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all cursor-pointer border border-transparent hover:border-border/50 hover:shadow-md dark:hover:shadow-lg"
                      >
                        {avatarUrl ? (
                          <Image
                            src={avatarUrl}
                            alt={post.author?.name || "Avatar"}
                            width={40}
                            height={40}
                            className="rounded-full object-cover border border-accent/30"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-accent/20 shadow-sm border border-accent/30 flex items-center justify-center text-xs font-semibold text-accent">
                            {post.author?.name?.[0]?.toUpperCase() || "U"}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-medium text-sm mb-1">{post.title}</div>
                          <div className="text-xs text-muted-foreground">
                            Started {formatTimeAgo(post.createdAt)} • {post.replies || 0} replies
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No discussions yet. Be the first to start one!
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
