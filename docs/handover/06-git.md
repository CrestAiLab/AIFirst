# 06 — Git & GitHub

> Git tracks every change to the code. GitHub stores the code in the cloud and lets the team collaborate.

---

## 1. The repository

| Field | Value |
|-------|-------|
| **Owner** | `CrestAiLab` (GitHub organisation) |
| **Repo** | `AIFirst` |
| **URL** | https://github.com/CrestAiLab/AIFirst |
| **Default branch** | `main` (production) |
| **Other branches** | `renovate/*` (created automatically by the Renovate bot to update dependencies) |

To get access, ask an admin to invite your GitHub account to the **CrestAiLab** organisation.

---

## 2. The 15-second mental model

```
Your laptop          GitHub             Vercel
──────────           ──────             ──────
git commit ──push──▶ main branch ──▶ auto-deploy ──▶ live site
```

You make changes locally → save them as a **commit** → **push** to GitHub → Vercel notices and deploys.

---

## 3. The commands you'll use 95% of the time

| Command | What it does |
|---------|--------------|
| `git status` | What's changed locally (your safety check before doing anything) |
| `git pull` | Download the latest commits from GitHub into your branch |
| `git checkout -b feature/my-thing` | Create and switch to a new branch |
| `git add .` | Stage all changed files for the next commit |
| `git add path/to/file` | Stage one specific file |
| `git commit -m "describe change"` | Save the staged changes as a commit |
| `git push` | Upload your commits to GitHub |
| `git checkout main` | Switch back to the main branch |
| `git log --oneline -10` | See the last 10 commits |

---

## 4. The standard workflow for a change

> Never push directly to `main` for a non-trivial change. Use a branch + Pull Request.

```bash
# 1. Make sure you're up-to-date
git checkout main
git pull

# 2. Create a branch for your change
git checkout -b feature/add-about-page

# 3. Make your edits, then save as a commit
git status                          # see what changed
git add .                           # stage everything (or pick specific files)
git commit -m "Add about page with team bios"

# 4. Push the branch to GitHub
git push -u origin feature/add-about-page
```

Then open a **Pull Request** on GitHub:
1. Go to the repo on GitHub. You'll see a yellow banner: "Compare & pull request" → click it.
2. Write a short title and description (what & why).
3. Request a reviewer.
4. Vercel will post a **preview URL** in the PR — share it for testing.
5. After approval, click **Merge pull request**.

Once merged, your branch is in `main`, and Vercel auto-deploys to production.

---

## 5. Things you should never do

- ❌ **Don't commit `.env.local`** — it has secrets. (It's already in `.gitignore`, but double-check before `git add`.)
- ❌ **Don't `git push --force` on `main`** — it rewrites history for everyone. If you really need a force push, do it on your own branch only.
- ❌ **Don't commit `node_modules/` or `.next/`** — these are build artefacts, not source. Already gitignored.
- ❌ **Don't commit huge binary files** — keep large images outside the repo if possible.

---

## 6. Reading commit history

```bash
git log --oneline -20            # last 20 commits, one line each
git log --stat                   # commits with files changed and counts
git show <commit-hash>           # full diff of a specific commit
git blame path/to/file           # who last changed each line
```

In VS Code, **GitLens** shows blame info inline.

---

## 7. Undoing things safely

| You want to… | Run |
|--------------|-----|
| Discard unstaged changes to a file | `git checkout -- path/to/file` |
| Unstage a file (you ran `git add` by mistake) | `git restore --staged path/to/file` |
| Undo your last commit (keep the changes locally) | `git reset --soft HEAD~1` |
| Restore a file from main | `git checkout main -- path/to/file` |
| Find a lost commit | `git reflog` |

When in doubt, **commit before experimenting**. Commits are cheap; you can always rewind.

---

## 8. The `.gitignore` file

Already configured to skip:
- `node_modules/` (downloaded packages)
- `.next/` (build output)
- `.env*.local` (secrets)
- `.DS_Store` (macOS metadata)
- `tsconfig.tsbuildinfo` (TS incremental cache)
- `pnpm-store/`

If you're ever unsure whether a file should be committed, ask the team.

---

## 9. SSH vs HTTPS for cloning

- **SSH** (`git@github.com:CrestAiLab/AIFirst.git`) — set up an SSH key once, no password prompts.
- **HTTPS** (`https://github.com/CrestAiLab/AIFirst.git`) — easier to start; needs a Personal Access Token (PAT) when pushing.

Setup guide: GitHub Docs → "Adding a new SSH key to your GitHub account".

---

## 10. The Renovate bot

You'll occasionally see PRs from `renovate[bot]` proposing dependency upgrades. To handle one:

1. Open the PR — it lists what changed (e.g. `next: 15.0.3 → 15.0.4`).
2. Wait for the Vercel preview to build.
3. Visit the preview URL → click around, make sure nothing is broken.
4. Merge if it looks good. The bot squashes its own commits and keeps things tidy.

If a Renovate PR breaks the build or preview, close the PR and the bot will retry on the next schedule.

---

## 11. Quick reference: solo branch workflow on a small team

```bash
git checkout main && git pull              # start fresh
git checkout -b fix/typo-in-hero            # branch off main
# …edit files…
git add . && git commit -m "Fix typo in hero copy"
git push -u origin fix/typo-in-hero         # push to GitHub
# open PR, get review, merge
git checkout main && git pull               # local main is now up-to-date
git branch -d fix/typo-in-hero              # delete the local branch
```

---

Next: **[07 — CI/CD](./07-cicd.md)**.
