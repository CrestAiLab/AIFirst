/** Strip common Markdown for short plain-text previews (cards, excerpts). */
export function markdownToPlainText(md: string): string {
  return (
    md
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/^\s*[-*+]\s+/gm, "")
      .replace(/^\s*\d+\.\s+/gm, "")
      .replace(/[*_~]+/g, "")
      .replace(/\s+/g, " ")
      .trim()
  )
}
