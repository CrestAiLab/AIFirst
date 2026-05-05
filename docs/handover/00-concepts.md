# 00 — Concepts & Glossary

> Audience: anyone new to web development. Read this first.

Every word in **bold** here is a word you will see again and again in the codebase, in Sanity, in Vercel, or in error messages. You don't need to memorise them — just know where to look them up.

---

## 1. The big picture in one paragraph

The AIFirst website is built with **Next.js** (a website framework). Editors write content inside **Sanity** (a content management system). The code is stored on **GitHub**. **Vercel** takes the code from GitHub, builds the website, and hosts it on the internet. When a content editor publishes something in Sanity, Sanity sends a **webhook** (a notification) to Vercel telling it "refresh the page now".

That's it. Everything else in this folder is detail.

---

## 2. The four moving parts

| Part | What it is | Where it lives |
|------|-----------|----------------|
| **Code** | The recipe for the website | GitHub repo `CrestAiLab/AIFirst` |
| **Content** | Words and images shown on pages | Sanity Studio (`/studio`) |
| **Hosting** | The computer that serves the website | Vercel |
| **Build pipeline** | The robot that turns code into a live site | Vercel + Sanity webhooks |

---

## 3. Glossary

### Web basics

- **Frontend** — The part you see in the browser (buttons, text, images, layout).
- **Backend** — The hidden code that runs on a server. It fetches data, handles forms, talks to other services.
- **Server** — A computer somewhere on the internet that runs your code.
- **Client** — Your browser (Chrome, Safari) on your laptop or phone.
- **Browser** — The program you use to visit websites.
- **URL / route** — The address of a page (e.g. `/insights`, `/sources/my-article`).
- **API** — A way for one program to ask another program for data. An **API route** in this project is a URL that returns data instead of a web page (e.g. `/api/revalidate`).
- **HTTP request** — When the browser asks a server for something. Common methods: **GET** (fetch), **POST** (send/save).

### Code & tools

- **JavaScript** — The programming language web browsers understand.
- **TypeScript** — JavaScript with type safety (it warns you when you put a number where a string should go). Files end in `.ts` or `.tsx`.
- **React** — A library for building reusable pieces of UI called **components**.
- **Component** — A self-contained, reusable piece of UI (e.g. a button, a card, a header).
- **Next.js** — A framework built on top of React that handles pages, routing, server-side rendering, and API routes. We use **version 15** with the **App Router**.
- **App Router** — Next.js's modern way of defining pages: each folder under `/app` becomes a URL.
- **Tailwind CSS** — A way of styling pages by writing short **utility classes** (e.g. `text-lg font-bold text-white`) directly in your HTML/JSX, instead of writing separate CSS files.
- **shadcn/ui** — A collection of pre-built, copy-pasteable components (button, card, input, tooltip) that use Tailwind. Lives in `components/ui/`.
- **Radix UI** — Low-level accessible UI primitives (we use it for tooltips). shadcn/ui is built on top of Radix.
- **Lucide** — An icon library. We use it for all icons (`lucide-react`).
- **Node.js** — A program that lets you run JavaScript outside a browser. Needed to run Next.js locally.
- **pnpm** — A package manager (like `npm` or `yarn`). It downloads and installs the libraries the project needs. We require **pnpm 9 or higher**.
- **Package** / **dependency** — A library someone else wrote that we use. Listed in `package.json`.
- **Lockfile** (`pnpm-lock.yaml`) — Records the exact version of every dependency, so everyone gets the same install.
- **Build** — The process of turning source code into the optimised files that get served to users (`pnpm build`).
- **Dev server** — A local-only website that runs on your laptop while you're coding (`pnpm dev` → `http://localhost:3000`).

### Content management

- **CMS** — Content Management System. A friendly editor for non-developers to add/edit content without touching code.
- **Sanity** — The specific CMS we use. Two parts: **Sanity Studio** (the editor UI you visit at `/studio`) and **Sanity Content Lake** (the cloud database where content is stored).
- **Schema** — The shape of a piece of content (which fields it has). Schemas live in `/sanity/schemaTypes/`.
- **Document** — A single saved item (one blog post, one source link, etc.).
- **Document type** — The kind of document. Our types are: `pageContent` (homepage), `insight` (blog post), `source` (curated link), `communityPost`, and `pageSection` (re-usable building block).
- **GROQ** — Sanity's query language. It looks like `*[_type == "insight"]`. You'll see GROQ in `lib/sanity/queries.ts`.
- **Portable Text** — Sanity's rich-text format (it's not raw HTML or Markdown — it's a structured tree). We render it with `@portabletext/react`.
- **Dataset** — A collection of documents inside a Sanity project. We use the dataset called `production`.
- **Project ID** — A short string that identifies our Sanity project (e.g. `abc123def`). Public — safe to expose.
- **API token** — A secret string used by code or scripts to write to Sanity. **Never share it publicly.**

### Hosting & deployment

- **Vercel** — The hosting platform we use. It takes our Next.js code and serves it to visitors worldwide.
- **Deployment** — A specific version of the website that has been built and pushed live. Vercel keeps a history of every deployment.
- **Production** — The version of the site that real users see (the `main` branch on Vercel).
- **Preview deployment** — A temporary version of the site Vercel creates for any other branch or pull request, so you can test before merging.
- **Environment variable** — A setting (or secret) loaded at runtime, e.g. `NEXT_PUBLIC_SANITY_PROJECT_ID`. Stored in `.env.local` for local dev and in Vercel's dashboard for production.
- **`.env.local`** — A local file (NOT committed to Git) containing your local environment variables.
- **Secret** — Any value you should not share publicly (API tokens, webhook secrets). Anything **without** the `NEXT_PUBLIC_` prefix is treated as a secret.
- **Webhook** — A "phone call" from one service to another when something happens. Sanity calls our `/api/revalidate` URL whenever an editor publishes content.
- **Revalidation** — Throwing away the old cached page and fetching the latest content. Done with Next.js's `revalidatePath()`.

### Code collaboration

- **Git** — The tool that tracks every change to the code over time.
- **GitHub** — The website where the Git repository is hosted.
- **Repository / repo** — A project's code + history. Ours: `CrestAiLab/AIFirst`.
- **Branch** — A parallel version of the code. We use `main` for production and `renovate` for the dependency bot.
- **Commit** — A saved snapshot of changes with a message describing them.
- **Push** — Upload your local commits to GitHub.
- **Pull / fetch** — Download the latest commits from GitHub.
- **Pull Request (PR)** — A proposal to merge a branch into another (usually into `main`). Reviewed before merging.
- **Merge** — Combine one branch into another.
- **Renovate** — A bot that opens PRs to update outdated dependencies.
- **CI/CD** — Continuous Integration / Continuous Deployment — short for "automatic checks and automatic deploy". Vercel does the CD part for us.

### Project-specific words

- **Section** — A horizontal block on the homepage (Hero, Stats, Solutions, etc.). Editors can reorder them in Sanity.
- **Insight** — A blog post / long-form article. Lives at `/insights/[slug]`.
- **Source** — A curated external link or piece of media (paper, podcast, article). Lives at `/sources`.
- **Community post** — A short discussion item shown on `/community` and (if `featured`) on the homepage.
- **Slug** — The URL-friendly version of a title. "My First Post" → `my-first-post`.
- **Default sections** — A hard-coded fallback homepage used when Sanity is unreachable, so the site never goes blank. See `lib/defaultSections.ts`.

---

## 4. Mental model: what happens when a visitor opens the site?

1. Visitor types `aifirst.example.com` → DNS sends them to Vercel.
2. Vercel has the latest **build** of the Next.js app ready and serves the page.
3. The page may include data fetched from Sanity (e.g. the latest 3 insights).
4. The browser displays the page.

## 5. Mental model: what happens when an editor publishes a new article?

1. Editor opens `/studio`, fills in fields, clicks **Publish**.
2. Sanity saves the document and sends a **webhook** to `https://oursite.com/api/revalidate`.
3. Our `/api/revalidate` route tells Next.js: "throw away cached `/insights` and `/`".
4. Next time someone visits, Next.js fetches the new content from Sanity and shows it.

## 6. Mental model: what happens when a developer pushes code?

1. Developer commits and pushes to GitHub.
2. GitHub notifies Vercel.
3. Vercel runs `pnpm install && pnpm build`.
4. If the build succeeds, Vercel switches `main` deployment to the new version.
5. If it fails, the previous version stays live and Vercel emails the team.

---

You now have the vocabulary. The next chapter will get the project running on your computer.
