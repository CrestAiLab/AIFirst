import { PortableTextComponents } from '@portabletext/react'
import { urlFor } from './sanity/image'

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const imageUrl = urlFor(value).width(800).url()
      return (
        <div className="my-8">
          <img
            src={imageUrl}
            alt={value.alt || 'Image'}
            className="w-full h-auto rounded-lg"
          />
          {value.alt && (
            <p className="text-sm text-muted-foreground mt-2 text-center">
              {value.alt}
            </p>
          )}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mt-4 mb-2">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold mt-4 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 my-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-accent hover:underline"
        >
          {children}
        </a>
      )
    },
  },
}

