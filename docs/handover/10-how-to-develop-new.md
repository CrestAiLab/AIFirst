# 10 — How To Develop A New Feature

> Recipes for the most common kinds of changes. Each recipe ends with "ship it" — meaning push the branch, open a PR, merge.

---

## Recipe 1 — Change copy or styling on the homepage (no code)

If the change is just text, an image, or reordering sections — **don't touch code**, do it in Sanity.

1. Open `/studio`.
2. **Page Content** → edit fields, drag sections, toggle visibility.
3. **Publish**.
4. Wait ~5 seconds → homepage updates.

If the change is a Tailwind class tweak (e.g. spacing, colour) — that's a code change; see Recipe 6.

---

## Recipe 2 — Add a new homepage section type

Goal: introduce a new section like "Testimonials" that editors can add in Sanity.

1. **Add a frontend component** at `components/testimonials.tsx`:
   ```tsx
   type Testimonial = { quote: string; author: string }
   type Props = { heading: string; items: Testimonial[] }

   export function Testimonials({ heading, items }: Props) {
     return (
       <section className="py-16">
         <h2 className="text-3xl font-bold">{heading}</h2>
         <ul className="mt-6 grid md:grid-cols-3 gap-4">
           {items.map((t, i) => (
             <li key={i} className="rounded-lg border p-6">
               <blockquote className="italic">"{t.quote}"</blockquote>
               <p className="mt-2 text-sm">— {t.author}</p>
             </li>
           ))}
         </ul>
       </section>
     )
   }
   ```

2. **Wire it into `section-renderer.tsx`**: import the component and add a case for the new `sectionType`.

3. **Update the Sanity schema** at `sanity/schemaTypes/pageSection.ts`:
   - Add `'testimonials'` to the list of allowed `sectionType` values.
   - Add fields (`heading`, `items` array of `{quote, author}`) and conditionally show them only when `sectionType === 'testimonials'`.

4. **Update the GROQ query** in `lib/sanity/queries.ts` so the new fields are returned.

5. **Update the type** in `lib/sanity/types.ts` to include the new section shape.

6. Run `pnpm dev`, open `/studio`, add a Testimonials section, publish, verify it appears.

7. Ship it.

---

## Recipe 3 — Add a new field to an existing document

Example: add an "estimated reading time" field to insights.

1. Edit `sanity/schemaTypes/insight.ts` and add:
   ```ts
   defineField({
     name: 'readingTime',
     title: 'Reading time (minutes)',
     type: 'number',
   }),
   ```
2. Reload `/studio` — the new field appears.
3. Update `lib/sanity/queries.ts` queries that fetch insights to include `readingTime`.
4. Update `lib/sanity/types.ts` `Insight` type to add `readingTime?: number`.
5. Render it in `app/insights/[slug]/page.tsx`:
   ```tsx
   {insight.readingTime && <span>{insight.readingTime} min read</span>}
   ```
6. Ship it. Backfill old insights via Studio if needed.

---

## Recipe 4 — Add a new page

Example: `/about`.

1. Create `app/about/page.tsx`:
   ```tsx
   export const metadata = { title: 'About — AIFirst' }

   export default function AboutPage() {
     return (
       <main className="container mx-auto px-4 py-16">
         <h1 className="text-4xl font-bold">About</h1>
         <p className="mt-4 text-white/70">…</p>
       </main>
     )
   }
   ```
2. Optional: add a link in `components/header.tsx`.
3. Visit `http://localhost:3000/about` to verify.
4. Ship it.

---

## Recipe 5 — Add a new API route

Example: `/api/health` returns `{ ok: true }`.

1. Create `app/api/health/route.ts`:
   ```ts
   import { NextResponse } from 'next/server'

   export async function GET() {
     return NextResponse.json({ ok: true, time: new Date().toISOString() })
   }
   ```
2. Visit `http://localhost:3000/api/health`.
3. Ship it.

For a route that talks to Sanity, import `client` from `@/lib/sanity/client` and use `client.fetch(...)`.

---

## Recipe 6 — Style change

Find the component, add/remove Tailwind classes, save, reload.

If the same class repeats everywhere, consider extracting a helper or component. If it's project-wide (e.g. font, base colour), edit `app/globals.css` or `tailwind.config.ts`.

Tip: use the **Tailwind CSS IntelliSense** VS Code extension for autocomplete.

---

## Recipe 7 — Add an environment variable

1. Add it to `.env.local.example` (with an empty value and a comment explaining what it's for).
2. Add it to your `.env.local` with the real value.
3. Add it in Vercel → **Settings → Environment Variables** for **Production** AND **Preview**.
4. Reference it in code: `process.env.MY_VAR`.
   - If it must reach the browser, prefix it `NEXT_PUBLIC_MY_VAR`.
5. Redeploy (push any commit) so Vercel picks it up.

---

## Recipe 8 — Adding a shadcn/ui component

```bash
pnpm dlx shadcn@latest add dialog
```

This adds `components/ui/dialog.tsx`. Import and use it like the existing `Button`, `Card`, etc.

---

## Recipe 9 — Update a dependency

If Renovate hasn't proposed it yet:

```bash
pnpm up next                       # latest minor/patch
pnpm up next@15.1                  # specific version
pnpm up --latest                   # update everything to latest (risky)
```

Always run `pnpm build` and click around the dev server before committing.

---

## Recipe 10 — Debugging "the page won't update"

1. **Locally:** restart `pnpm dev` (sometimes the cache is sticky).
2. **In production:**
   - Visit `/api/check-setup` — env vars OK?
   - Sanity → Manage → Webhooks → recent deliveries — are they 2xx?
   - Manually fire: `https://yoursite.com/api/revalidate?secret=…` — does it return `{revalidated:true}`?
   - Vercel Logs — any error from `/api/revalidate`?

---

## Recipe 11 — Testing a Sanity change before publishing

Sanity has **drafts** built in. **Save** without publishing → only Studio sees it. The public site only reads published documents.

If you want a "draft preview" on the website itself, you'd need to add Sanity's preview mode (not currently set up). Ask the team before adding this — it's a meaningful feature.

---

## Recipe 12 — Removing something safely

To delete a feature:

1. Remove the component file and any references.
2. Remove the GROQ query and the type if nothing else uses them.
3. If a Sanity field is being dropped, **don't delete it from the schema right away** — first deploy the code that ignores it, then remove the schema field, then optionally clean up old document data.

This avoids "the field exists in Studio but the code crashes" or vice versa.

---

## Universal "ship it" checklist

Before opening a PR:

- [ ] `pnpm dev` works, change is visible
- [ ] `pnpm build` finishes with no errors
- [ ] No secrets committed
- [ ] No `console.log` debugging left
- [ ] PR description explains *why*, not just *what*
- [ ] If a new env var was added, it's added to **both** Vercel scopes

After merging:

- [ ] Vercel deployment is green
- [ ] Production site loads and behaves as expected
- [ ] `/api/check-setup` is green
