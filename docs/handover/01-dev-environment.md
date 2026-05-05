# 01 — Dev Environment Setup

> Goal: get the website running on your own laptop in under 30 minutes.

---

## 1. What you need installed

| Tool | Why | How to install |
|------|-----|----------------|
| **Git** | Download the code from GitHub | macOS: comes pre-installed (run `git --version`). Otherwise: [git-scm.com](https://git-scm.com) |
| **Node.js** (v20 LTS or newer) | Runs JavaScript outside the browser | [nodejs.org](https://nodejs.org) — download the LTS version |
| **pnpm** (v9 or newer) | Installs the project's libraries | After Node.js: `npm install -g pnpm` |
| **Visual Studio Code** | Recommended code editor | [code.visualstudio.com](https://code.visualstudio.com) |
| **GitHub account** | To clone and push code | [github.com](https://github.com) — ask the team to add you to the **CrestAiLab** organisation |

### Verify everything works

Open a terminal and run:

```bash
git --version       # → git version 2.x
node --version      # → v20.x or higher
pnpm --version      # → 9.x or higher
```

If any of these print "command not found", install that tool first.

---

## 2. Recommended VS Code extensions

Open VS Code → Extensions panel (left sidebar) → install:

- **ESLint** — flags code problems while you type
- **Tailwind CSS IntelliSense** — autocompletes Tailwind class names
- **Prettier** (optional) — auto-formats code on save
- **GitLens** — shows who changed what and when

---

## 3. Clone the repository

```bash
# pick a folder where you keep code projects
cd ~/GitHub

# download the code
git clone git@github.com:CrestAiLab/AIFirst.git
# OR if you don't use SSH keys yet:
git clone https://github.com/CrestAiLab/AIFirst.git

cd AIFirst
```

> If `git clone` says "Permission denied", you need to either set up an SSH key (see GitHub docs → "Adding a new SSH key") or use the HTTPS URL and log in with a Personal Access Token.

---

## 4. Install the dependencies

```bash
pnpm install
```

This takes 1–3 minutes the first time. It downloads everything listed in `package.json` into a `node_modules/` folder.

> **Common error:** `ERR_PNPM_UNSUPPORTED_ENGINE` — your pnpm is too old. Run `npm install -g pnpm@latest`.

---

## 5. Set up environment variables

The website needs a few secrets to talk to Sanity. They are kept out of Git.

### Step 5a — Copy the template

```bash
cp .env.local.example .env.local
```

This creates a new file `.env.local` (gitignored) with empty values.

### Step 5b — Fill in the values

Open `.env.local` in your editor. You'll see:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
SANITY_REVALIDATE_SECRET=
```

**Where to get the values:**

| Variable | Where to find it |
|----------|------------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | **Easiest:** Vercel → AIFirst project → Settings → Environment Variables → click the eye icon to reveal. **Or:** [sanity.io/manage](https://sanity.io/manage) → AIFirst project → Project ID at the top. |
| `NEXT_PUBLIC_SANITY_DATASET` | Almost always `production`. Same Vercel page. |
| `SANITY_API_TOKEN` | **Optional for local dev** if you only read content. Required if you run `pnpm seed:sanity`. Get from Sanity → Manage → API → Tokens. Use a **Read** token unless you need to write. |
| `SANITY_REVALIDATE_SECRET` | Optional locally — only needed if you want to test the webhook. Copy from Vercel. |

> **Don't have access to Vercel yet?** Ask the team owner to invite you to the Vercel team, then to the Sanity project at [sanity.io/manage](https://sanity.io/manage).

> **Reminder:** never commit `.env.local` to Git. It's in `.gitignore` for a reason.

---

## 6. Run the dev server

```bash
pnpm dev
```

You should see:

```
▲ Next.js 15.x
- Local:   http://localhost:3000
- Ready in 1.2s
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser. The homepage should load.

> **If env vars are missing**, the homepage still loads — it falls back to the **default sections** defined in `lib/defaultSections.ts`. You'll see the layout but data-driven sections (Insights, Sources) will be empty.

### Visit Sanity Studio

Open **[http://localhost:3000/studio](http://localhost:3000/studio)**. You'll see Sanity's editor running inside your local site. Log in with the same Sanity account that has access to the project.

---

## 7. The four most useful commands

| Command | What it does |
|---------|--------------|
| `pnpm dev` | Start the local dev server (live reload as you save) |
| `pnpm build` | Build the production bundle — run this before pushing if you changed config |
| `pnpm start` | Run the production build locally (mainly to debug build issues) |
| `pnpm lint` | Run ESLint to catch code style problems |
| `pnpm seed:sanity` | Push the default homepage sections into Sanity (run once per new dataset) |

---

## 8. Folder map cheat sheet

```
AIFirst/
├── app/            ← Pages & API routes (every folder = a URL)
├── components/     ← Reusable React UI pieces
├── lib/            ← Utilities + Sanity queries + types
├── sanity/         ← CMS schema definitions
├── public/         ← Static assets (images, icons)
├── scripts/        ← One-off scripts you run from the terminal
├── docs/           ← Documentation (you are here)
└── package.json    ← Project metadata + dependency list
```

---

## 9. Troubleshooting common errors

| Error | Likely cause | Fix |
|-------|--------------|-----|
| `Cannot find module 'next'` | `pnpm install` was skipped or failed | Re-run `pnpm install` |
| `Port 3000 is already in use` | Another app is on port 3000 | `pnpm dev -- -p 3001` to use a different port, or kill the other process |
| `Configuration must contain 'projectId'` | `NEXT_PUBLIC_SANITY_PROJECT_ID` is missing in `.env.local` | Add it (see step 5) |
| `/studio` shows blank screen | Browser cache, or you're not logged into Sanity | Hard refresh (Cmd+Shift+R), then log in |
| Images broken in dev | Sanity CORS doesn't allow `localhost:3000` | Add it in Sanity Manage → API → CORS Origins |
| `EACCES` on macOS during `npm install -g pnpm` | Permission issue with global install | Use `sudo`, or use [Volta](https://volta.sh) to manage Node |

For deeper diagnosis: visit **[http://localhost:3000/api/check-setup](http://localhost:3000/api/check-setup)** — it returns a JSON report of what's configured and what's missing.

---

## 10. You're set up. What now?

- Read **[02 — Frontend](./02-frontend.md)** to learn the codebase structure.
- Read **[10 — How To Develop A New Feature](./10-how-to-develop-new.md)** when you're ready to make a change.
