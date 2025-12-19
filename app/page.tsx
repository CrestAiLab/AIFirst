import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Solutions } from "@/components/solutions"
import { Community } from "@/components/community"
import { Insights } from "@/components/insights"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <Solutions />
      <Community />
      <Insights />
      <CTA />
      <Footer />
    </main>
  )
}
