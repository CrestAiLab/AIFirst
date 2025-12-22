import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { client } from "@/lib/sanity/client"
import { communityPostsQuery } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

// Revalidate every hour as fallback (webhook handles instant updates)
export const revalidate = 3600

export default async function CommunityPage() {
  const communityPosts = await client.fetch(communityPostsQuery)

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
    <main className="min-h-screen">
      <Header />
      <section className="py-20 md:py-32">
        <div className="container">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="mx-auto max-w-4xl mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Community Posts & Events
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Join discussions, share insights, and connect with the community
            </p>
          </div>

          {communityPosts && communityPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityPosts.map((post: any) => {
                const avatarUrl = post.author?.avatar
                  ? urlFor(post.author.avatar).width(60).height(60).url()
                  : undefined
                
                return (
                  <Card
                    key={post._id}
                    className="group cursor-pointer overflow-hidden bg-card/80 backdrop-blur-xl border-border/50 hover:border-accent/50 shadow-lg dark:shadow-xl hover:shadow-2xl dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:shadow-accent/15 dark:hover:shadow-accent/25 transition-all duration-300 hover:-translate-y-2 h-full"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-3">
                        {avatarUrl ? (
                          <Image
                            src={avatarUrl}
                            alt={post.author?.name || "Avatar"}
                            width={48}
                            height={48}
                            className="rounded-full object-cover border border-accent/30"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-accent/20 shadow-sm border border-accent/30 flex items-center justify-center text-lg font-semibold text-accent">
                            {post.author?.name?.[0]?.toUpperCase() || "U"}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{post.author?.name || "Anonymous"}</div>
                          <div className="text-xs text-muted-foreground">
                            {formatTimeAgo(post.createdAt)}
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-accent transition-colors bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:via-accent group-hover:to-primary">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {post.content && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                          {post.content}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.replies || 0} replies</span>
                        {post.featured && (
                          <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                            Featured
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No community posts available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}

