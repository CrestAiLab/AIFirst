# 09 — How To Deploy

> Two flavours: **(A)** routine deploy of an existing site, and **(B)** first-time deploy from scratch.

---

## A. Routine deploy (the common case)

You have an existing Vercel + Sanity setup and you want to ship a code change.

```bash
# 1. Make sure your local main is up-to-date
git checkout main
git pull

# 2. Branch off
git checkout -b feature/short-description

# 3. Edit code. Verify locally.
pnpm dev                   # check in browser
pnpm build                 # ensure it builds clean

# 4. Commit and push
git add .
git commit -m "Add short description"
git push -u origin feature/short-description
```

Then on GitHub:

1. Open the PR (a banner appears after pushing).
2. Wait ~1 minute for the **Vercel preview URL** to appear in a comment.
3. Click the preview, click around, verify your change works.
4. Get a review (or self-merge if you're solo).
5. **Merge pull request** → choose **Squash and merge** (cleanest history).
6. Vercel auto-deploys to production within ~2 minutes.

### Smoke-test after deploy

Open these in order:
- `https://yoursite.com/` — homepage loads, sections render.
- `https://yoursite.com/insights` — list shows.
- `https://yoursite.com/api/check-setup` — JSON shows everything green.

If anything is red, **rollback first, debug second** (Vercel → Deployments → ⋯ → Promote previous to Production).

---

## B. First-time deploy from scratch

Use this if you're setting up a brand-new copy of the site (new Vercel project, new Sanity dataset).

### Step 1 — Create the Sanity project
1. Sign in at [sanity.io/manage](https://sanity.io/manage).
2. **Create new project**. Pick a name. Choose dataset name `production`.
3. Note the **Project ID** (you'll need it next).
4. **API → CORS Origins** → add `http://localhost:3000` and your future production URL. Tick **Allow credentials**.
5. **API → Tokens** → create a token named "server" with **Editor** permission (only if you'll run write scripts). Copy and save the token — you can't view it again.

### Step 2 — Push the code to GitHub
1. Create an empty repo at github.com under your org.
2. From your local copy:
   ```bash
   git remote set-url origin git@github.com:YOUR_ORG/your-repo.git
   git push -u origin main
   ```

### Step 3 — Connect Vercel
1. [vercel.com](https://vercel.com) → **Add New Project** → Import the GitHub repo.
2. Framework: Next.js (auto-detected).
3. Build & install commands: leave defaults — `vercel.json` already says `pnpm install` / `pnpm run build`.
4. **Environment Variables** — add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `<from step 1>`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `SANITY_API_TOKEN` = `<token from step 1>` (optional)
   - `SANITY_REVALIDATE_SECRET` = output of `openssl rand -hex 32`
5. Click **Deploy**. Wait for the first build to finish.

You now have a live URL like `your-repo.vercel.app`.

### Step 4 — Configure the Sanity webhook (so publishes refresh the site)
1. [sanity.io/manage](https://sanity.io/manage) → your project → **API → Webhooks → Create webhook**.
2. **Name:** Vercel revalidate
3. **URL:** `https://your-repo.vercel.app/api/revalidate?secret=<the same secret>`
4. **Trigger on:** Create, Update, Delete
5. **Filter:** leave blank (or `_type in ["pageContent","insight","source","communityPost"]`)
6. **Projection:** `{ _type, _id, slug }`
7. **HTTP method:** POST
8. Save.

Test it: open `https://your-repo.vercel.app/api/revalidate?secret=<the secret>` in a browser — you should see `{"revalidated":true,...}`.

### Step 5 — Seed the homepage
On your laptop, with `.env.local` filled in:
```bash
pnpm seed:sanity
```
This creates the `pageContent` document with the default sections. You can now visit `/studio` and customise.

### Step 6 — Add your custom domain (optional)
1. Vercel → **Settings → Domains → Add** → type your domain.
2. Vercel shows DNS records. Add them at your registrar.
3. Wait 5–30 minutes for DNS + SSL.
4. Update Sanity CORS to include the new domain.
5. Update the Sanity webhook URL to use the new domain (or keep the `vercel.app` URL — both work).

### Step 7 — Final verification
- Open `https://your-domain/api/check-setup` — all green.
- Open `/studio`, log in, edit something, publish, watch the homepage update.
- Open the live URL on your phone to confirm responsive layout.

---

## C. Hot-fixing a production bug

When something is on fire and you need to ship a fix immediately:

```bash
git checkout main
git pull
git checkout -b hotfix/short-name
# …edit…
pnpm build                                # must succeed locally
git add . && git commit -m "Hotfix: …"
git push -u origin hotfix/short-name
```

Open PR → if you're confident, merge straight away (skip review). Vercel deploys in ~2 minutes.

If you can't wait for the build:
1. Vercel → Deployments → find the last-known-good production deployment.
2. **⋯ → Promote to Production** → instant rollback.
3. Then take your time fixing.

---

## D. Reverting a code change

If a merged PR caused the problem:

```bash
git checkout main && git pull
git revert <bad-commit-hash>            # creates a new commit that undoes it
git push
```

A new "Revert" commit goes through the normal pipeline → Vercel deploys it.

Alternative (faster): use Vercel's **Promote to Production** on the previous good deployment — no Git change needed.

---

## E. Pre-deploy checklist (before merging)

- [ ] `pnpm build` succeeds locally
- [ ] `pnpm lint` passes (or warnings are intentional)
- [ ] Vercel preview URL works in a browser
- [ ] No new env var is required (or it's been added in Vercel for **both** Production and Preview scopes)
- [ ] No `console.log` debugging left behind
- [ ] No `.env*` file committed by accident
- [ ] Description on the PR explains the *why*, not just the *what*

---

Next: **[10 — How To Develop A New Feature](./10-how-to-develop-new.md)** — concrete recipes.
