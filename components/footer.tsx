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
                <div className="absolute inset-1 bg-gradient-to-tr from-emerald-500/20 to-teal-600/15 dark:from-emerald-500/12 dark:to-teal-600/10 blur-md rounded-full group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute w-6 h-6 bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 rounded-[8px] rotate-45 border border-white/15 shadow-[0_0_12px_rgba(16,185,129,0.15)] dark:shadow-[0_0_14px_rgba(16,185,129,0.12)]" />
                <div className="absolute w-6 h-6 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-[8px] rotate-[75deg] border border-white/20 dark:border-emerald-500/15 group-hover:rotate-[90deg] transition-transform duration-700 shadow-lg" />
                <div className="absolute w-2.5 h-2.5 rounded-full bg-emerald-100 dark:bg-emerald-400/90 shadow-[0_0_8px_rgba(16,185,129,0.35)] dark:shadow-[0_0_8px_rgba(52,211,153,0.22)] border border-emerald-900/20 group-hover:scale-125 transition-transform duration-500" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-emerald-700/90 dark:to-emerald-500/75 bg-clip-text text-transparent transition-all duration-300">
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
