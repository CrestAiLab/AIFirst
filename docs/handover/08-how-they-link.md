# 08 — How They Link Together

> A picture of the whole system. Read this once and you'll always know "where does that thing live?".

---

## 1. The big diagram

```
                        ┌──────────────────────┐
                        │     EDITOR (you)     │
                        │ logs into /studio    │
                        └──────────┬───────────┘
                                   │ publishes a doc
                                   ▼
        ┌─────────────────────────────────────────────────┐
        │             SANITY (CMS in the cloud)           │
        │  - stores documents (insights, sources, …)      │
        │  - hosts Studio UI                              │
        │  - sends a webhook when content changes         │
        └────────────────┬─────────────────────┬──────────┘
                         │                     │
                         │ webhook             │ GROQ queries
                         │ POST                │ (read content)
                         ▼                     │
        ┌────────────────────────────┐         │
        │  VERCEL (hosting)          │◀────────┘
        │  - runs the Next.js app    │
        │  - /api/revalidate         │
        │  - serves pages to users   │
        └────────────┬───────────────┘
                     │ HTML / JSON
                     ▼
              ┌──────────────┐
              │   VISITOR    │
              │   (browser)  │
              └──────────────┘


              ┌──────────────┐
              │   DEVELOPER  │
              │   git push   │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐                ┌────────────┐
              │   GITHUB     │ ─── notify ──▶ │  VERCEL    │
              │ CrestAiLab/  │                │  rebuilds  │
              │  AIFirst     │                │  & deploys │
              └──────────────┘                └────────────┘
```

---

## 2. Service-by-service: who talks to whom

| From | To | What they exchange |
|------|----|--------------------|
| **Visitor's browser** | **Vercel** | HTTP requests for HTML pages, images, API responses |
| **Vercel** (Next.js server) | **Sanity** (Content Lake) | GROQ queries to fetch content (insights, sections, etc.) |
| **Editor's browser** | **Vercel → /studio** | Loads the Studio interface from our site |
| **Editor's browser** (in Studio) | **Sanity** (Content Lake) | Reads/writes documents directly via Sanity's API |
| **Sanity** | **Vercel → /api/revalidate** | Webhook POST when a document changes |
| **Developer's laptop** | **GitHub** | `git push` uploads commits |
| **GitHub** | **Vercel** | Notifies Vercel of new commits → triggers build |
| **Vercel** | **GitHub** | Posts deployment status / preview URL on PRs |
| **Renovate bot** | **GitHub** | Opens PRs to update dependencies |

---

## 3. Where each "thing" actually lives

| Thing | Lives in | How to access |
|-------|----------|---------------|
| The website code | GitHub: `CrestAiLab/AIFirst` | `git clone …` |
| The website itself (deployed) | Vercel | Production URL (e.g. `aifirst.vercel.app` or your custom domain) |
| Content (insights, sources, sections) | Sanity Content Lake | `/studio` to edit, GROQ to read |
| Studio (the editor UI) | Inside our Next.js app | Visit `/studio` on whichever site is running the code |
| Static images (decoration, logos) | `public/` folder in the repo | Served by Vercel from `/icon.svg` etc. |
| Editor-uploaded images | Sanity's CDN | `cdn.sanity.io` URLs (built via `urlFor()`) |
| Secrets (API tokens) | Vercel env vars (production) and `.env.local` (your laptop) | Never in Git |

---

## 4. The three flows that explain everything

### Flow A — A visitor opens the homepage
1. Browser → `https://oursite.com/` → Vercel.
2. Vercel runs the Next.js homepage (`app/page.tsx`).
3. Inside the page, server code calls `client.fetch(pageContentQuery)` → Sanity.
4. Sanity returns the page sections.
5. Each section is rendered by `section-renderer.tsx` into HTML.
6. Vercel sends the HTML to the browser.
7. Browser shows the page.

If Sanity is unreachable, step 3 fails silently and the page falls back to `getDefaultSections()` from `lib/defaultSections.ts` — the site never goes blank.

### Flow B — An editor publishes a new article
1. Editor opens `/studio` → fills in fields → clicks **Publish**.
2. Studio writes the document to Sanity Content Lake.
3. Sanity sees there's a webhook configured → fires `POST https://oursite.com/api/revalidate?secret=…`.
4. Our `/api/revalidate` route validates the secret, reads which document type changed, and calls `revalidatePath()` for the affected pages.
5. Next.js drops those pages from its cache.
6. Next visitor → Flow A re-runs and fetches the new content.

### Flow C — A developer ships a code change
1. Developer creates a branch, edits files, commits, pushes to GitHub.
2. Developer opens a Pull Request.
3. Vercel sees the new branch → builds it → posts a **preview URL** in the PR.
4. Reviewer clicks the preview, sees the change, approves.
5. PR is merged into `main`.
6. Vercel sees the new `main` commit → builds → if green, switches the production URL to it.
7. Old version stays available in **Deployments** for instant rollback.

---

## 5. Where each environment variable is read

| Env var | Read by | Used for |
|---------|---------|----------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Browser + Server (`lib/sanity/client.ts`, `sanity.config.ts`) | Telling the Sanity client which project to talk to |
| `NEXT_PUBLIC_SANITY_DATASET` | Browser + Server | Same — which dataset (always `production`) |
| `SANITY_API_TOKEN` | Server only (scripts, server components if writing) | Authenticated reads/writes |
| `SANITY_REVALIDATE_SECRET` | Server only (`/api/revalidate`) | Validating that a webhook is genuinely from Sanity |

`NEXT_PUBLIC_*` values are *baked into* the JavaScript that ships to the browser. Don't put secrets there.

---

## 6. What can go wrong, where to look

| Symptom | First place to check |
|---------|---------------------|
| Site is down | Vercel → Deployments (was the last build red?) |
| Site is up but content is wrong/stale | Sanity → Webhooks → recent deliveries, then `/api/check-setup` |
| Studio (`/studio`) shows blank or errors | Sanity → Manage → CORS Origins (is your domain listed?) |
| Build is failing | Vercel → Deployments → click the failing build → Build Logs |
| Editor can't log into Studio | Sanity → Manage → Members (are they invited?) |
| Image links broken | Sanity → Manage → CORS, or check `next.config.js` `remotePatterns` |
| Secret leaked | Sanity → Manage → API → Tokens → revoke + create new + update Vercel + redeploy |

---

## 7. Mental shortcut

Whenever you're confused, ask: **"Is this about code, content, hosting, or version control?"**

| If… | …go to |
|-----|--------|
| The behaviour or layout is wrong | **Code** → GitHub repo, edit files, push |
| The text or images are wrong | **Content** → Sanity Studio |
| The site is down or env vars are off | **Hosting** → Vercel dashboard |
| You need history or to roll back | **Version control** → Git / GitHub for code, Sanity timeline for content, Vercel deployments for live site |

---

Next: **[09 — How To Deploy](./09-how-to-deploy.md)** for the deploy walkthrough.
