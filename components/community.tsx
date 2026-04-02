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
  const heading = community?.heading || "Who the festival is for"
  const description =
    community?.description ||
    "A community event for people who build, buy, regulate, or operate AI systems—and care that the data behind them is intentional, evaluable, and governable."
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
    <section id="community" className="py-24 md:py-32 relative bg-background border-t border-foreground/5">
      <div className="container relative z-10 mx-auto px-4">
        
        {/* Top Section: Pathways */}
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-medium mb-6 tracking-tight text-foreground">{heading}</h2>
          <p className="text-lg md:text-xl font-light text-muted-foreground/80 mx-auto max-w-2xl">{description}</p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = getIcon(feature?.icon)
              return (
                <div key={index} className="group rounded-2xl p-8 bg-card/40 border border-foreground/5 hover:border-emerald-500/22 dark:hover:border-emerald-500/15 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:bg-card/80 text-left relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity duration-500 text-emerald-600/80 dark:text-emerald-500/50">
                    <IconComponent className="w-32 h-32" />
                  </div>
                  <div className="p-3 rounded-xl brand-surface inline-flex mb-6 transition-colors group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500/40 dark:group-hover:bg-emerald-800/90 text-emerald-900/80 dark:text-emerald-400/75 shadow-sm">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-serif font-medium text-foreground mb-3">{feature?.title}</h3>
                  <p className="text-muted-foreground/80 font-light leading-relaxed">{feature?.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Section: Forum UI */}
        <div className="max-w-6xl mx-auto border-t border-foreground/5 pt-20">
          <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
            <div className="w-full md:w-1/3">
              <h3 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-foreground mb-6">Collaboration &<br/>discussion</h3>
              <p className="text-muted-foreground/80 font-light leading-relaxed mb-8">
                Connect on data readiness, governance, labeling and ground truth, evaluation design, monitoring, and cross-agency pilots—aligned with the festival outcomes and working groups.
              </p>
              <button
                type="button"
                className="h-12 px-8 rounded-full border border-emerald-600/28 bg-transparent text-foreground hover:bg-emerald-500/[0.08] hover:border-emerald-500/38 dark:border-emerald-500/22 dark:hover:bg-emerald-950/45 dark:hover:border-emerald-500/32 transition-all font-medium text-sm tracking-wide"
              >
                Join the conversation
              </button>
            </div>

            <div className="w-full md:w-2/3 space-y-4">
              {displayPosts.length > 0 ? (
                displayPosts.map((post) => {
                  const avatarUrl = post.author?.avatar
                    ? urlFor(post.author.avatar).width(40).height(40).url()
                    : undefined
                  return (
                    <Card key={post._id} className="bg-transparent border border-foreground/5 hover:border-emerald-500/22 dark:hover:border-emerald-500/14 transition-all shadow-none hover:shadow-xl group cursor-pointer overflow-hidden relative rounded-xl">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-emerald-500/70 dark:group-hover:bg-emerald-500/50 transition-colors" />
                      <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          {avatarUrl ? (
                            <Image
                              src={avatarUrl}
                              alt={post.author?.name || "Avatar"}
                              width={48}
                              height={48}
                              className="rounded-full object-cover border border-foreground/10 grayscale group-hover:grayscale-0 transition-all"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-lg font-medium text-foreground/60 transition-colors group-hover:bg-foreground group-hover:text-background">
                              {post.author?.name?.[0]?.toUpperCase() || "U"}
                            </div>
                          )}
                          <div className="sm:hidden flex-1">
                            <div className="font-medium text-foreground text-lg mb-1 leading-tight">{post.title}</div>
                            <div className="text-xs text-muted-foreground/80 font-mono tracking-tight">{post.author?.name} • {formatTimeAgo(post.createdAt)}</div>
                          </div>
                        </div>

                        <div className="flex-1 hidden sm:block pl-2">
                          <h4 className="font-medium text-lg lg:text-xl text-foreground group-hover:translate-x-1 transition-transform leading-tight tracking-tight">{post.title}</h4>
                          <div className="flex gap-3 items-center mt-2 text-xs font-mono text-muted-foreground/60 tracking-tight">
                            <span>{post.author?.name}</span>
                            <span>•</span>
                            <span>{formatTimeAgo(post.createdAt)}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto mt-2 sm:mt-0 justify-end">
                          {post.tags?.map((tag, i) => (
                            <span key={i} className="brand-tag-chip inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono">
                              <Hash className="w-3 h-3 opacity-60" />
                              {tag.replace(/^#/, '')}
                            </span>
                          ))}
                          <div className="ml-auto sm:ml-4 text-[10px] font-mono text-muted-foreground/70 brand-tag-chip px-2.5 py-1 rounded group-hover:border-emerald-500/25 dark:group-hover:border-emerald-500/18 group-hover:text-foreground/90 transition-colors">
                            {post.replies || 0} REPLIES
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              ) : (
                <div className="p-12 text-center rounded-2xl border border-dashed border-foreground/10 text-muted-foreground/60 bg-foreground/[0.02]">
                  <Hash className="w-8 h-8 opacity-20 mx-auto mb-4" />
                  <p className="font-light">No active discussions matched the criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <ShowMoreButton config={showMore} />
        </div>
      </div>
    </section>
  )
}

