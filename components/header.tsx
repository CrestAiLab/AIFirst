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
        <Link href="/" className="flex items-center gap-3 group transition-opacity">
          <div className="relative flex items-center justify-center w-10 h-10 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
            <div className="absolute inset-1 bg-gradient-to-tr from-emerald-500/20 to-teal-600/15 dark:from-emerald-500/12 dark:to-teal-600/10 blur-md rounded-full group-hover:opacity-90 transition-opacity duration-500" />
            <div className="absolute w-6 h-6 bg-gradient-to-br from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-800 rounded-[8px] rotate-45 border border-white/15 shadow-[0_0_12px_rgba(16,185,129,0.15)] dark:shadow-[0_0_14px_rgba(16,185,129,0.12)]" />
            <div className="absolute w-6 h-6 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-[8px] rotate-[75deg] border border-white/20 dark:border-emerald-500/15 group-hover:rotate-[90deg] transition-transform duration-700 shadow-lg" />
            <div className="absolute w-2.5 h-2.5 rounded-full bg-emerald-100 dark:bg-emerald-400/90 shadow-[0_0_8px_rgba(16,185,129,0.35)] dark:shadow-[0_0_8px_rgba(52,211,153,0.22)] border border-emerald-900/20 group-hover:scale-125 transition-transform duration-500" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-emerald-700/90 dark:to-emerald-500/75 bg-clip-text text-transparent transition-all duration-300">
            AIDFest
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {isHomePage ? (
            <>
              <a
                href="#background"
                className="text-sm font-medium text-muted-foreground hover:text-foreground dark:hover:text-emerald-400/85 transition-colors"
              >
                About
              </a>
              <Link
                href="/community"
                className="text-sm font-medium text-muted-foreground hover:text-foreground dark:hover:text-emerald-400/85 transition-colors"
              >
                Community
              </Link>
              <Link
                href="/insights"
                className="text-sm font-medium text-muted-foreground hover:text-foreground dark:hover:text-emerald-400/85 transition-colors"
              >
                Insights
              </Link>
              <Link
                href="/sources"
                className="text-sm font-medium text-muted-foreground hover:text-foreground dark:hover:text-emerald-400/85 transition-colors"
              >
                Sources
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/#background"
                className="text-sm font-medium text-muted-foreground hover:text-foreground dark:hover:text-emerald-400/85 transition-colors"
              >
                About
              </Link>
              <Link
                href="/community"
                className="text-sm font-medium text-muted-foreground hover:text-foreground dark:hover:text-emerald-400/85 transition-colors"
              >
                Community
              </Link>
              <Link
                href="/insights"
                className="text-sm font-medium text-muted-foreground hover:text-foreground dark:hover:text-emerald-400/85 transition-colors"
              >
                Insights
              </Link>
              <Link
                href="/sources"
                className="text-sm font-medium text-muted-foreground hover:text-foreground dark:hover:text-emerald-400/85 transition-colors"
              >
                Sources
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
          <Button variant="ghost" size="sm" className="shadow-sm dark:shadow-none" asChild>
            <Link href="/insights">Updates</Link>
          </Button>
          <Button variant="brand" size="sm" className="hover:-translate-y-0.5 transition-transform" asChild>
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
