import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { ShowMoreConfig } from "@/lib/sanity/types"

interface ShowMoreButtonProps {
  config?: ShowMoreConfig
}

export function ShowMoreButton({ config }: ShowMoreButtonProps) {
  if (!config?.enabled || !config.text) {
    return null
  }

  const href = config.linkType === 'external' 
    ? config.externalUrl || '#' 
    : config.internalPage || '#'

  const isExternal = config.linkType === 'external'

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-bold text-muted-foreground hover:text-foreground transition-colors group"
      >
        {config.text}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    )
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 font-bold text-muted-foreground hover:text-foreground transition-colors group"
    >
      {config.text}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  )
}

