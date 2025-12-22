"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = stored || (prefersDark ? "dark" : "light")
    setTheme(initialTheme)
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    
    // Force remove/add to ensure it works
    const html = document.documentElement
    if (newTheme === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-lg dark:shadow-xl shadow-black/5 dark:shadow-black/20">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 rounded-lg bg-primary shadow-md dark:shadow-lg border border-primary/20" />
          <span className="text-xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            AIDFest
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {isHomePage ? (
            <>
              <a
                href="#why-it-matters"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              >
                About
              </a>
              <Link
                href="/community"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              >
                Community
              </Link>
              <Link
                href="/insights"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              >
                Insights
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/#why-it-matters"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              >
                About
              </Link>
              <Link
                href="/community"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              >
                Community
              </Link>
              <Link
                href="/insights"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              >
                Insights
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="shadow-sm dark:shadow-md hover:shadow-md dark:hover:shadow-lg transition-all"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="shadow-sm dark:shadow-md hover:shadow-md dark:hover:shadow-lg transition-all"
          >
            Sign In
          </Button>
          <Button
            size="sm"
            className="shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl hover:shadow-accent/20 dark:hover:shadow-accent/30 transition-all hover:-translate-y-0.5"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}
