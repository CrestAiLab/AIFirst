import Link from "next/link"

export function Footer() {
  const links = {
    About: [
      { label: "Background", href: "/#background" },
      { label: "Why it Matters", href: "/#why-it-matters" },
      { label: "Goals", href: "/#goals" },
      { label: "Expected Outcomes", href: "/#expected-outcomes" },
    ],
    "Resources": [
      { label: "Events & Insights", href: "/insights" },
      { label: "Community", href: "/community" },
      { label: "Contact", href: "#contact" },
    ],
    Legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Code of Conduct", href: "#" },
      { label: "Accessibility", href: "#" },
    ],
  }

  return (
    <footer className="border-t border-border/50 bg-muted/30 backdrop-blur-sm shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4 group cursor-default">
              <div className="relative flex items-center justify-center w-10 h-10 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                {/* Ambient Base Glow */}
                <div className="absolute inset-1 bg-gradient-to-tr from-primary/40 to-accent/40 blur-md rounded-full group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Layer 1: Abstract Shape */}
                <div className="absolute w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-[8px] rotate-45 border border-white/20 shadow-glow" />
                
                {/* Layer 2: Glass Overlay */}
                <div className="absolute w-6 h-6 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-[8px] rotate-[75deg] border border-white/30 group-hover:rotate-[90deg] transition-transform duration-700 shadow-lg" />
                
                {/* Central Energy Core */}
                <div className="absolute w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] border border-primary/20 group-hover:scale-125 transition-transform duration-500" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent group-hover:text-neon transition-all duration-300">
                AIDFest
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Bringing together practitioners, solution builders, and government agencies to strengthen shared capability on data for AI.
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-semibold mb-3">{category}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith("/") ? (
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 AIDFest. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
