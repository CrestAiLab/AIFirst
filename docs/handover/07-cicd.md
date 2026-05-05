# 07 — CI/CD

> CI/CD = **Continuous Integration / Continuous Deployment**: the robots that build and ship our site automatically when something changes.

---

## 1. The short version

We have **two** automated pipelines:

| Pipeline | Trigger | Result |
|----------|---------|--------|
| **Code → Live site** | Push to GitHub | Vercel rebuilds and deploys |
| **Content → Refreshed pages** | Editor publishes in Sanity | Webhook hits `/api/revalidate`, Next.js drops cached pages |

There is **no GitHub Actions workflow yet**. All the CI/CD is provided by Vercel + the Sanity webhook.

---

## 2. The code pipeline (Git → Vercel)

```
You push to GitHub          Vercel runs                 Result
────────────────────        ───────────                 ──────
git push origin main  ───▶  pnpm install         ───▶  ✅ build OK   → promote to production
                            pnpm build                 ❌ build fail → email/notify, prev version stays
```

### Per-branch behaviour

| Branch | What Vercel does |
|--------|------------------|
| `main` | Build → deploy to **production** URL |
| Any other branch | Build → publish a **preview** URL (e.g. `aifirst-git-feature-x.vercel.app`) |
| Pull Request | Same as branch above; Vercel comments the preview URL on the PR |

### What "build" actually means
1. Vercel checks out your commit.
2. Reads `vercel.json` → runs `pnpm install`.
3. Runs `pnpm run build` (which is `next build`).
4. If the exit code is 0, Vercel uploads the `.next/` output and switches the URL to it.
5. If non-zero, Vercel keeps the previous deployment live.

You can watch the build live: **Vercel → Deployments → click the running deployment → Build Logs**.

---

## 3. The content pipeline (Sanity → Vercel)

```
Editor clicks Publish     Sanity sends webhook            Next.js drops cache
─────────────────────     ─────────────────────           ──────────────────
                                                          
        ┌─►   POST https://yoursite.com/api/revalidate   ─►   revalidatePath('/')
                ?secret=…                                       revalidatePath('/insights')
                                                                etc.
```

If the webhook isn't configured, content still updates eventually because Next.js caches expire on a timer — but it can take hours instead of seconds.

How to set up the webhook: see **[04 — Sanity §6](./04-sanity.md#6-the-webhook-so-content-updates-show-instantly)**.

---

## 4. The Renovate dependency bot

Renovate is a third-party bot that watches `package.json` and opens PRs to update outdated libraries (e.g. `next: 15.0.3 → 15.0.4`).

| What you see | What to do |
|--------------|-----------|
| A PR from `renovate[bot]` | Wait for Vercel preview, click around, merge if OK |
| Many PRs at once | Renovate batches by ecosystem; review them in order, easiest first |
| A PR fails the Vercel build | Close it. Renovate will retry on its schedule, or you can investigate the breakage |

The `renovate` branch you may see in `git branch -a` is created by the bot.

---

## 5. There is no separate test suite

The codebase has no automated tests right now. The "test" before deploy is:

1. `pnpm build` succeeds locally (TypeScript + ESLint).
2. The Vercel preview URL works when you click around.
3. Code review on the PR catches obvious mistakes.

If you add tests later, the natural place is a GitHub Action — see §6.

---

## 6. Adding a GitHub Action (optional, future)

If you want to enforce checks **before** Vercel even tries to build (e.g. linting, type-checking, tests), add a workflow file:

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [ main ]
  push:
    branches: [ main ]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm build
        env:
          NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_SANITY_PROJECT_ID }}
          NEXT_PUBLIC_SANITY_DATASET: production
```

Place this at `.github/workflows/ci.yml`. GitHub will pick it up automatically. Add the relevant secrets in **GitHub → Settings → Secrets and variables → Actions**.

This is **not currently required** — Vercel covers the same build step.

---

## 7. Health checks after a deploy

After every production deploy, do this 1-minute smoke test:

1. Open `https://yoursite.com/` — homepage loads, sections show.
2. Open `https://yoursite.com/insights` — list shows.
3. Open `https://yoursite.com/api/check-setup` — JSON says all env vars set, Sanity reachable.
4. Edit any insight in `/studio` → publish → wait 5s → reload — change is visible.

If any step fails, check **Vercel → Logs** and **Sanity → Webhooks → recent deliveries**.

---

## 8. Rollback

The fastest rollback uses Vercel directly:
1. Vercel → **Deployments** tab.
2. Find the last good production deployment.
3. **⋯** → **Promote to Production**.

That's it — no Git revert needed. Then fix the bug at your leisure.

---

## 9. CI/CD failure modes & fixes

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Vercel build fails: "Cannot find module X" | New dependency not committed | Commit `package.json` and `pnpm-lock.yaml` |
| Vercel build fails: TypeScript error | Code error not caught locally | Reproduce with `pnpm build` locally, fix, push |
| Build succeeds but page is blank | Env var missing in Vercel | Add it in **Settings → Environment Variables** → redeploy |
| Sanity publish doesn't refresh site | Webhook not firing or wrong secret | Sanity Manage → Webhooks → check delivery log; verify secret matches Vercel env var |
| Preview URL works, production broken | Different env vars between Production and Preview scopes | Compare in Vercel **Settings → Environment Variables** |

---

Next: **[08 — How They Link Together](./08-how-they-link.md)** — the architecture diagram.
