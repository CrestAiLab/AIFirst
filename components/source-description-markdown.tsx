"use client"

import type { Components } from "react-markdown"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

const components: Components = {
  h1: ({ className, ...props }) => (
    <h3 className={cn("text-lg font-semibold text-foreground mt-4 first:mt-0 mb-2", className)} {...props} />
  ),
  h2: ({ className, ...props }) => (
    <h4 className={cn("text-base font-semibold text-foreground mt-3 first:mt-0 mb-2", className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h5 className={cn("text-sm font-semibold text-foreground mt-3 first:mt-0 mb-1.5", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("text-sm leading-relaxed text-foreground mb-3 last:mb-0", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("list-disc pl-5 text-sm text-foreground mb-3 space-y-1", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("list-decimal pl-5 text-sm text-foreground mb-3 space-y-1", className)} {...props} />
  ),
  li: ({ className, ...props }) => <li className={cn("leading-relaxed", className)} {...props} />,
  a: ({ className, href, ...props }) => (
    <a
      className={cn(
        "text-emerald-600 underline underline-offset-2 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300",
        className
      )}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: ({ className, children, ...props }) => {
    const isFencedBlock = typeof className === "string" && /\blanguage-/.test(className)
    if (!isFencedBlock) {
      return (
        <code
          className={cn("rounded bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground", className)}
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <code className={cn("font-mono text-sm text-foreground", className)} {...props}>
        {children}
      </code>
    )
  },
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg border border-border bg-muted/80 p-3 text-sm font-mono text-foreground mb-3",
        className
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn("border-l-2 border-emerald-500/40 pl-3 text-sm text-muted-foreground italic mb-3", className)}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => <hr className={cn("my-4 border-border", className)} {...props} />,
  table: ({ className, ...props }) => (
    <div className="overflow-x-auto mb-3">
      <table className={cn("w-full text-sm border-collapse border border-border", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th className={cn("border border-border bg-muted/50 px-2 py-1.5 text-left font-semibold", className)} {...props} />
  ),
  td: ({ className, ...props }) => (
    <td className={cn("border border-border px-2 py-1.5", className)} {...props} />
  ),
}

export function SourceDescriptionMarkdown({ markdown, id }: { markdown: string; id?: string }) {
  return (
    <div id={id} className="source-markdown pb-0.5">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
