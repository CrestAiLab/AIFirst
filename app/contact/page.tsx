import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Contact — AIDFest",
  description: "Get in touch with the AIDFest team.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-16 max-w-2xl">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Get in touch</h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          We&apos;d love to hear from practitioners, partners, and agencies interested in AIDFest. Reach out using the
          channels your team already uses, or connect through your organization&apos;s usual contact points.
        </p>
        <p className="text-foreground/90 leading-relaxed">
          For event and partnership inquiries, please use the same contact paths listed on official AIDFest announcements
          and materials.
        </p>
      </main>
      <Footer />
    </div>
  )
}
