# 03 — Backend

> The "backend" is the code that runs on Vercel's servers, not in the visitor's browser. In Next.js this is mostly **API routes** plus the data-fetching that happens inside server components.

---

## 1. What counts as backend in this project?

We don't run a separate backend. Next.js does both jobs:

| Backend job | Where it happens |
|-------------|------------------|
| Render pages with fresh content | Server Components (the default — see [Frontend](./02-frontend.md) §8) |
| Receive webhooks and trigger cache refresh | `/app/api/revalidate/route.ts` |
| Health / diagnostic checks | `/app/api/check-setup/route.ts`, `/app/api/debug-sanity/route.ts` |
| Proxy external images for source cards | `/app/api/sources/thumbnail/route.ts` |

There is **no separate database** — all content lives in Sanity. There is **no auth system** — Studio uses Sanity's own login.

---

## 2. How API routes work in Next.js

Any file at `app/api/<name>/route.ts` becomes an API endpoint at `/api/<name>`. The file exports a function for each HTTP method (`GET`, `POST`, etc.) it supports.

Minimal example:

```ts
// app/api/hello/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'hello world' })
}
```

That's it. Visit `http://localhost:3000/api/hello` and you get `{"message":"hello world"}`.

---

## 3. The four API routes in this project

### `POST | GET /api/revalidate`

**Purpose:** receive Sanity's webhook and tell Next.js to refresh cached pages.

**How it's triggered:** Sanity calls this URL every time an editor publishes, updates, or deletes a document.

**Security:** the URL must include `?secret=...` matching `SANITY_REVALIDATE_SECRET`. If the secret is wrong, the request is rejected.

**What it revalidates:** depending on the document type that changed:
- `pageContent` → `/`
- `insight` → `/insights`, `/insights/[slug]`, `/`
- `source` → `/sources`, `/`
- `communityPost` → `/community`, `/`

**Manual test:** open `https://yoursite.com/api/revalidate?secret=THE_SECRET` in your browser. You should see a JSON success response.

### `GET /api/check-setup`

**Purpose:** a friendly diagnostic page. Visit it whenever the site looks broken.

**What it returns:**
- whether each environment variable is set,
- whether we can reach Sanity,
- a list of recommendations.

**Safe to share** — secret values are not printed.

### `GET /api/debug-sanity`

**Purpose:** runs a small Sanity query and returns the result. Used to verify the API token works.

**Note:** consider removing this endpoint (or putting it behind a check) before going live with sensitive content. Right now it is fine because we only have public content.

### `GET /api/sources/thumbnail?img=<url>`

**Purpose:** fetch an external image (the og:image of a source URL) on the server and return it to the browser. Avoids browser hotlink/CORS blocks.

**Why we need it:** when a source has only a URL but no uploaded thumbnail, the source card tries to use the page's og:image. Many sites refuse direct browser requests, but allow server-to-server fetches.

**Behaviour:** returns the image with a 1-day cache header, or a placeholder SVG if the fetch fails.

---

## 4. Where each route reads its data

| Route | Reads from |
|-------|-----------|
| `/api/revalidate` | Reads the JSON body of the webhook from Sanity |
| `/api/check-setup` | Reads env vars + makes a simple Sanity ping |
| `/api/debug-sanity` | Runs a GROQ query via `lib/sanity/client.ts` |
| `/api/sources/thumbnail` | Fetches an external HTTP URL (validated against an allowlist in `lib/url-safety.ts`) |

---

## 5. Environment variables used by the backend

| Variable | Used by | Public? |
|----------|---------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity client | Yes (safe to expose) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity client | Yes |
| `SANITY_API_TOKEN` | Server-only writes (e.g. `pnpm seed:sanity`) | **No — secret** |
| `SANITY_REVALIDATE_SECRET` | `/api/revalidate` security check | **No — secret** |

**Rule:** anything starting with `NEXT_PUBLIC_` is shipped to the browser. Everything else stays on the server.

---

## 6. How webhooks flow end-to-end

```
Editor clicks "Publish" in /studio
        │
        ▼
Sanity sends POST https://yoursite.com/api/revalidate?secret=…
        │
        ▼
/app/api/revalidate/route.ts validates the secret
        │
        ▼
It calls revalidatePath('/insights') etc.
        │
        ▼
Next.js drops the cached pages
        │
        ▼
Next visitor triggers a fresh fetch from Sanity → sees updated content
```

If the webhook fails, the page eventually refreshes anyway thanks to time-based cache, but it can take longer (hours).

---

## 7. Adding a new API route

Goal: create `/api/health` that returns `{ ok: true }`.

1. Create the file `app/api/health/route.ts`:
   ```ts
   import { NextResponse } from 'next/server'

   export async function GET() {
     return NextResponse.json({ ok: true, time: new Date().toISOString() })
   }
   ```
2. Save. Visit `http://localhost:3000/api/health` — you should see the JSON.
3. Commit and push — it will be live on Vercel automatically.

If your route reads request bodies, you'd add `POST`, `PUT`, etc. functions and read with `await req.json()`.

---

## 8. Server-side caching

Next.js caches `fetch()` results by default. To opt out (e.g. for an always-fresh route), add:

```ts
export const dynamic = 'force-dynamic'
// or
export const revalidate = 0
```

This is already handled in our existing routes; you only need it if you build something new that must always run fresh.

---

## 9. Logs & debugging

- **Locally:** `pnpm dev` shows logs in the terminal. Use `console.log()` freely.
- **Production:** open Vercel → AIFirst project → Logs tab → filter by route. Each call to an API route appears with its status code and any console output.

---

## 10. Common pitfalls

- **Webhook returns 401** → secret in the URL doesn't match `SANITY_REVALIDATE_SECRET`. Re-check both Sanity webhook config and Vercel env var.
- **Image proxy returns placeholder** → the source URL is on a domain not in the allowlist (`lib/url-safety.ts`), or the upstream site refused the request. Add the domain or upload a thumbnail manually in Sanity.
- **`/api/check-setup` says token missing** → set it in Vercel → Environment Variables → Redeploy.

---

Next: **[04 — Sanity](./04-sanity.md)** to understand the content side.
