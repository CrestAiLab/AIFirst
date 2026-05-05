# 02 — Frontend

> Audience: junior developers. The "frontend" is everything a visitor sees in their browser.

---

## 1. What runs the frontend?

- **Next.js 15** (App Router) — handles routing and rendering.
- **React 19** — builds the UI out of components.
- **TypeScript** — adds type-safety on top of JavaScript.
- **Tailwind CSS** — styling via short utility classes (`text-lg font-bold`).
- **shadcn/ui + Radix UI + lucide-react** — pre-built buttons, cards, tooltips, icons.

You don't need to know any of these in depth before contributing — copy an existing example and tweak it.

---

## 2. Where things live

```
app/                ← Pages (one folder per URL)
components/         ← Reusable building blocks
  └── ui/           ← Generic primitives (Button, Card, Input, Tooltip)
lib/                ← Helper code (queries, utils, types)
  └── sanity/       ← Talking to the Sanity CMS
public/             ← Static images and icons
```

---

## 3. The pages (URLs)

Every folder under `app/` with a `page.tsx` file becomes a URL. Here is the full list:

| URL | File | What it shows |
|-----|------|---------------|
| `/` | `app/page.tsx` | Homepage — renders sections fetched from Sanity (Hero, Stats, Solutions, Insights preview, etc.) |
| `/insights` | `app/insights/page.tsx` | All blog posts, paginated 10 per page |
| `/insights/[slug]` | `app/insights/[slug]/page.tsx` | A single blog post (rich text) |
| `/sources` | `app/sources/page.tsx` | All curated links (papers, podcasts, articles), paginated |
| `/community` | `app/community/page.tsx` | Community posts/discussions, paginated |
| `/contact` | `app/contact/page.tsx` | Contact info |
| `/studio` | `app/studio/[[...index]]/page.tsx` | Sanity Studio (the editor) embedded in the site |

The square brackets `[slug]` mean **dynamic route** — the value in the URL is passed as a parameter (e.g. `/insights/why-ai-matters` → `slug = "why-ai-matters"`).

The double square brackets `[[...index]]` mean **catch-all** route — Sanity Studio uses internal routing.

---

## 4. The root layout

`app/layout.tsx` wraps every page. It is the HTML skeleton: `<html>`, `<body>`, fonts, providers, analytics, header, footer.

If you want a change to apply to **every** page (e.g. a new font, a global notification banner), edit `layout.tsx`.

---

## 5. Components (`/components`)

Components are reusable pieces of UI. Each is a `.tsx` file that exports a React function.

### Layout chrome
- `header.tsx` — top navigation
- `footer.tsx` — page footer
- `app-tooltip-provider.tsx` — wires up tooltips globally

### Homepage section components
The homepage is a list of "sections" (Hero, Stats, Solutions, etc.) configured in Sanity. `section-renderer.tsx` reads each section's `sectionType` and renders the matching component:

- `hero.tsx`
- `stats.tsx`
- `solutions.tsx`
- `cyber-security.tsx`
- `community.tsx`
- `insights.tsx`
- `sources.tsx`
- `cta.tsx`
- `content.tsx`

### Listing helpers
- `source-card.tsx` — card for a single source on the listing
- `source-description-markdown.tsx` — renders Markdown descriptions
- `list-pagination.tsx` — Prev / Page numbers / Next controls
- `show-more-button.tsx` — the "Explore more →" link

### UI primitives (`/components/ui`)
Generic, project-agnostic components from shadcn/ui:
- `button.tsx`, `card.tsx`, `input.tsx`, `tooltip.tsx`

> **Rule of thumb:** if a piece of UI is used in more than one place, make it a component.

---

## 6. Styling with Tailwind

Tailwind lets you style by adding class names directly:

```tsx
<button className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200">
  Click me
</button>
```

That single line gives you padding, rounded corners, white background, dark text, and a hover state. No separate CSS file needed.

### Useful conventions in this project
- **Dark mode** is on by default. We use `bg-black` / `text-white` as the base.
- **Responsive prefixes:** `sm:` (≥640px), `md:` (≥768px), `lg:` (≥1024px). Example: `text-base md:text-lg`.
- **`cn()` helper** in `lib/utils.ts` merges class names safely. Use it when conditionally applying classes:
  ```tsx
  className={cn("p-4 rounded", isActive && "bg-blue-500")}
  ```

The full Tailwind reference: [tailwindcss.com/docs](https://tailwindcss.com/docs).

---

## 7. Where data comes from

Components don't talk to Sanity directly. They receive props from a page, and pages fetch data using helpers in `lib/sanity/`:

- `lib/sanity/client.ts` — the Sanity client object
- `lib/sanity/queries.ts` — all GROQ queries (one per use case)
- `lib/sanity/image.ts` — `urlFor(image)` to build optimised image URLs
- `lib/sanity/types.ts` — TypeScript types for everything Sanity returns

Example from `app/insights/page.tsx` (simplified):

```tsx
import { client } from '@/lib/sanity/client'
import { insightsPaginatedQuery } from '@/lib/sanity/queries'

export default async function InsightsPage({ searchParams }) {
  const insights = await client.fetch(insightsPaginatedQuery, { start: 0, end: 10 })
  return <InsightsList items={insights} />
}
```

The `await client.fetch(...)` happens **on the server** during the request, so the visitor gets a fully-rendered page.

---

## 8. Server vs Client components

Next.js App Router defaults to **Server Components** — they run on the server, can fetch data directly, and never ship JavaScript to the browser. Lighter, faster.

If a component needs **interactivity** (state, click handlers, hooks like `useState` / `useEffect`), it must be a **Client Component**. Mark it by adding `'use client'` at the very top of the file:

```tsx
'use client'
import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

**Rule of thumb:** start with a server component. Only convert to a client component when you need interactivity.

---

## 9. Adding a new page

To add a page at `/about`:

1. Create the folder: `app/about/`.
2. Create `app/about/page.tsx`:
   ```tsx
   export default function AboutPage() {
     return (
       <main className="container mx-auto px-4 py-16">
         <h1 className="text-4xl font-bold">About us</h1>
         <p className="mt-4 text-lg">We build the AIFirst platform...</p>
       </main>
     )
   }
   ```
3. Save. Visit `http://localhost:3000/about` — done.

To add a navigation link to the new page, edit `components/header.tsx`.

---

## 10. Adding a new component

1. Create the file: `components/my-new-card.tsx`.
2. Define a function that returns JSX:
   ```tsx
   type Props = { title: string; description: string }

   export function MyNewCard({ title, description }: Props) {
     return (
       <div className="rounded-xl border border-white/10 p-6">
         <h3 className="text-xl font-semibold">{title}</h3>
         <p className="mt-2 text-white/70">{description}</p>
       </div>
     )
   }
   ```
3. Import it where you need it: `import { MyNewCard } from '@/components/my-new-card'`.

The `@/` prefix is an alias for the project root (configured in `tsconfig.json`).

---

## 11. Images

- **Static images** (decorations, backgrounds) → put in `public/` and reference as `/my-image.jpg`.
- **Sanity images** (uploaded by editors) → use `urlFor(image).width(800).url()` from `lib/sanity/image.ts`.
- **External images** (e.g. og:image of a source URL) → fetched via the proxy at `/api/sources/thumbnail` to avoid hotlink blocks.

Always pair an image with descriptive `alt` text for accessibility.

---

## 12. Common gotchas

- **Forgot `'use client'`** → error about hooks not allowed in server components. Add `'use client'` at the top of the file.
- **Edited a Sanity schema, page still shows old fields** → restart the dev server.
- **Tailwind class doesn't take effect** → make sure the file path is in `tailwind.config.ts` `content` array, and that the class is a literal string (Tailwind can't see `text-${size}` dynamic strings).
- **Image loads slowly** → use `next/image` (the `<Image>` component) which auto-optimises.

---

Next: see **[03 — Backend](./03-backend.md)** for the API routes, or **[04 — Sanity](./04-sanity.md)** for content schemas.
