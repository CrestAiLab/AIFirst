# 05 — Vercel (Hosting)

> Vercel is the company that hosts the site on the internet. It also automatically rebuilds and redeploys the site every time we push code.

---

## 1. What Vercel does for us

| Job | How |
|-----|-----|
| **Hosts the website** | Serves `https://aifirst...vercel.app` (or your custom domain) |
| **Builds the code** | Runs `pnpm install && pnpm build` whenever we push to GitHub |
| **Auto-deploys** | If the build succeeds, the new version replaces the old one |
| **Preview URLs** | Every branch / PR gets its own temporary URL for review |
| **Environment variables** | Stores secrets (Sanity tokens, etc.) so the code can read them at build/run time |
| **Logs & analytics** | Shows requests, errors, and performance |
| **Domains** | Connects custom domains and handles SSL |

You do **not** need to log into a server, install Node.js, or copy files. Push to GitHub → Vercel does the rest.

---

## 2. The Vercel dashboard

Go to [vercel.com](https://vercel.com) → log in → select the **AIFirst** project. The main tabs:

| Tab | What you do there |
|-----|-------------------|
| **Overview** | See the latest production deployment + recent activity |
| **Deployments** | History of every build (production and previews). Click any to inspect, view logs, or **rollback** |
| **Settings → Environment Variables** | Add / edit `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_TOKEN`, `SANITY_REVALIDATE_SECRET`, etc. |
| **Settings → Domains** | Connect a custom domain (e.g. `aifirst.com`). Vercel handles SSL automatically |
| **Settings → Git** | Which GitHub repo + branch is connected (currently `CrestAiLab/AIFirst`, branch `main`) |
| **Logs (Runtime Logs)** | Live output of API routes and server components — useful for debugging production |
| **Analytics** | Traffic & Web Vitals (we use `@vercel/analytics`) |

---

## 3. Environment variables

Vercel needs the same env vars as `.env.local` to talk to Sanity.

### Add or edit a variable
1. Project → **Settings → Environment Variables**.
2. Type the name (e.g. `SANITY_API_TOKEN`) and value.
3. Choose where it applies:
   - **Production** — the `main` branch
   - **Preview** — any other branch / PR
   - **Development** — when someone uses `vercel dev` locally (rare; we use `pnpm dev`)
4. Click **Save**.
5. **Important:** existing deployments won't pick up the new variable until you **redeploy**. Either push a new commit or click **Redeploy** on the latest deployment.

### Naming rule
- `NEXT_PUBLIC_*` → safe to ship to the browser.
- Anything else → kept secret on the server.

### Required values

| Variable | Required? | Notes |
|----------|-----------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Public |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes (`production`) | Public |
| `SANITY_API_TOKEN` | Optional | Needed if any server code writes to Sanity |
| `SANITY_REVALIDATE_SECRET` | Strongly recommended | Webhooks won't work without it |

---

## 4. Deployments

Each push to GitHub creates a deployment.

### Production deployment (the live site)
- Triggered by a push to **`main`**.
- URL: the production domain (custom or `aifirst.vercel.app`).
- A failed build keeps the previous version live — no broken site.

### Preview deployment (per branch / PR)
- Triggered by a push to any other branch or by opening a PR.
- URL: something like `aifirst-git-feature-x-crestailab.vercel.app`.
- Useful for sharing in-progress work without merging.

### Rollback
1. **Deployments** tab → find a previous successful production deployment.
2. Click the **⋯** menu → **Promote to Production**.
3. The site instantly serves that older build.

This is the safest "undo" for a bad deploy. You don't have to revert in Git.

---

## 5. Domains

To connect a custom domain (e.g. `aifirst.com`):

1. **Settings → Domains → Add**.
2. Type the domain.
3. Vercel shows DNS instructions (an A record or CNAME). Add them at the domain registrar (GoDaddy, Cloudflare, etc.).
4. Wait a few minutes. Vercel auto-issues an SSL certificate.

---

## 6. Logs & debugging

When the production site misbehaves:

1. **Logs** tab → filter by route (e.g. `/api/revalidate`).
2. You'll see every request with status code and any `console.log()` output from the route.
3. For build errors → **Deployments** tab → click the failed deployment → **Build Logs**.

Health check shortcut: `https://yoursite.com/api/check-setup`.

---

## 7. Limits & cost

The free **Hobby** plan covers small projects. Watch out for:

- 100 GB bandwidth / month
- 100 hours of build time / month
- 12 serverless function invocations per second
- Heavy images can blow through bandwidth — see `public/*.jpg` files (some are 7–20 MB; consider compressing)

Upgrade to **Pro** if traffic grows.

---

## 8. Team access

To invite a teammate:
1. **Settings → Team** (or your team's Vercel dashboard → Members).
2. Invite by email.
3. Choose role:
   - **Member** — can deploy and view logs
   - **Owner** — can change billing and domains

---

## 9. Common issues

| Symptom | Likely fix |
|---------|------------|
| Build fails with "Module not found" | A dependency was added locally but not committed. Run `pnpm install` and commit `package.json` + `pnpm-lock.yaml` |
| Build fails with "Type error" | TypeScript error — fix in code, push again. Tip: run `pnpm build` locally before pushing |
| Site shows but content empty | Env vars not set in Vercel. Check **Settings → Environment Variables** |
| Webhook returns 401 in Sanity logs | `SANITY_REVALIDATE_SECRET` mismatch. Update Vercel and redeploy |
| Images don't load | Sanity CORS doesn't include the Vercel URL. Add it in Sanity Manage |
| Custom domain not resolving | DNS not propagated yet. Wait, or check `dig` |

---

Next: **[06 — Git & GitHub](./06-git.md)**.
