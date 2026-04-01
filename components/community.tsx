import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getIcon } from "@/lib/iconMap"
import { urlFor } from "@/lib/sanity/image"
import { ShowMoreButton } from "@/components/show-more-button"
import type { CommunityPost, CommunityConfig, ShowMoreConfig } from "@/lib/sanity/types"
import Image from "next/image"
import { Hash } from "lucide-react"

interface CommunityProps {
  community?: CommunityConfig
  featuredPosts?: CommunityPost[]
  showMore?: ShowMoreConfig
}

export function Community({ community, featuredPosts = [], showMore }: CommunityProps) {
  const heading = community?.heading || "Learning & Development Pathways"
  const description = community?.description || "Choose your journey and start building with enterprise-grade infrastructure today."
  const features = community?.features || []
  const displayPosts = featuredPosts.slice(0, 4)

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`
    return date.toLocaleDateString()
  }

  return (
    <section id="community" className="py-24 md:py-32 relative bg-card">
      <div className="container relative z-10 mx-auto px-4">
        
        {/* Top Section: Pathways */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-foreground">{heading}</h2>
          <p className="text-lg text-muted-foreground mx-auto max-w-2xl">{description}</p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = getIcon(feature?.icon)
              return (
                <div key={index} className="group glass-card rounded-2xl p-8 border border-border/40 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow-accent text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <IconComponent className="w-32 h-32" />
                  </div>
                  <div className="p-4 rounded-xl bg-primary/10 inline-flex border border-primary/20 text-primary mb-6 shadow-glow">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{feature?.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature?.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Section: Forum UI */}
        <div className="max-w-6xl mx-auto border-t border-border/50 pt-16">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3">
              <h3 className="text-3xl font-bold tracking-tight text-foreground mb-4">Latest Insights &amp; Discussion</h3>
              <p className="text-muted-foreground mb-6">
                Connect with practitioners, solution builders, and engineers working on data, #RAG, #CyberSecurity, and #Orchestration.
              </p>
              <button className="h-10 px-6 rounded-md bg-transparent border border-primary text-primary hover:bg-primary/10 transition-colors font-mono font-bold text-sm">
                Join Forum
              </button>
            </div>

            <div className="w-full md:w-2/3 space-y-4">
              {displayPosts.length > 0 ? (
                displayPosts.map((post) => {
                  const avatarUrl = post.author?.avatar
                    ? urlFor(post.author.avatar).width(40).height(40).url()
                    : undefined
                  return (
                    <Card key={post._id} className="bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all shadow-md group cursor-pointer overflow-hidden relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/0 group-hover:bg-primary transition-colors" />
                      <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          {avatarUrl ? (
                            <Image
                              src={avatarUrl}
                              alt={post.author?.name || "Avatar"}
                              width={48}
                              height={48}
                              className="rounded-full object-cover border border-primary/20"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-lg font-bold text-primary">
                              {post.author?.name?.[0]?.toUpperCase() || "U"}
                            </div>
                          )}
                          <div className="sm:hidden flex-1">
                            <div className="font-semibold text-foreground">{post.title}</div>
                            <div className="text-xs text-muted-foreground">{post.author?.name} • {formatTimeAgo(post.createdAt)}</div>
                          </div>
                        </div>

                        <div className="flex-1 hidden sm:block">
                          <h4 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{post.title}</h4>
                          <div className="flex gap-4 items-center mt-1 text-sm text-muted-foreground">
                            <span>{post.author?.name}</span>
                            <span>•</span>
                            <span>{formatTimeAgo(post.createdAt)}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto mt-2 sm:mt-0">
                          {post.tags?.map((tag, i) => (
                            <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-secondary/20 text-secondary-foreground text-xs font-mono font-medium border border-secondary/30">
                              <Hash className="w-3 h-3 text-secondary" />
                              {tag.replace(/^#/, '')}
                            </span>
                          ))}
                          <div className="ml-auto sm:ml-4 text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded border border-border/50 group-hover:border-primary/50 transition-colors">
                            {post.replies || 0} REPLIES
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              ) : (
                <div className="p-8 text-center rounded-xl border border-dashed border-border/50 text-muted-foreground bg-accent/5 backdrop-blur-sm">
                  <Hash className="w-8 h-8 text-muted/50 mx-auto mb-3" />
                  <p>No active discussions matched the criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <ShowMoreButton config={showMore} />
        </div>
      </div>
    </section>
  )
}
