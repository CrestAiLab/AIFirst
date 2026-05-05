# AIFirst — Handover Documentation

Welcome! This folder contains everything a new team member needs to take over the **AIFirst** website. It is written for **non-technical people and junior developers** — no prior knowledge of Next.js, React, or Sanity is assumed.

If you only have time to read one document, read **[HANDOVER_FULL.md](./HANDOVER_FULL.md)** (or the PDF version). It contains all of the chapters below stitched together.

---

## How to use this folder

1. Start with **00 — Concepts**. It explains the words you will see everywhere.
2. Read **01 — Dev Environment** and follow the steps on your own laptop.
3. Skim the per-service chapters (02–07) so you know where things live.
4. Read **08 — How They Link** to see the big picture.
5. Use **09 — How To Deploy** and **10 — How To Develop New** as recipes when you need to do work.

---

## Table of contents

| # | Document | What it covers |
|---|----------|----------------|
| 00 | [Concepts & Glossary](./00-concepts.md) | Plain-language explanation of every technical word used in this project |
| 01 | [Dev Environment](./01-dev-environment.md) | How to install everything and run the website on your own computer |
| 02 | [Frontend](./02-frontend.md) | The visible website — pages, components, styling |
| 03 | [Backend](./03-backend.md) | The hidden server functions — API routes, webhooks |
| 04 | [Sanity (CMS)](./04-sanity.md) | Where editors create and update content |
| 05 | [Vercel (Hosting)](./05-vercel.md) | The service that puts the website on the internet |
| 06 | [Git & GitHub](./06-git.md) | How code is saved, shared, and versioned |
| 07 | [CI/CD](./07-cicd.md) | Automatic build and deploy when code or content changes |
| 08 | [How They Link Together](./08-how-they-link.md) | The big-picture architecture diagram |
| 09 | [How To Deploy](./09-how-to-deploy.md) | Step-by-step deploy instructions |
| 10 | [How To Develop A New Feature](./10-how-to-develop-new.md) | Recipes for common changes (new page, new section, new field) |
| ★ | [HANDOVER_FULL.md](./HANDOVER_FULL.md) | All chapters combined — also available as **HANDOVER_FULL.pdf** |

---

## Quick facts

- **Website framework:** Next.js 15 + React 19 + TypeScript
- **Content management:** Sanity CMS (editors use `/studio`)
- **Hosting:** Vercel (auto-deploys from GitHub `main` branch)
- **Source code:** GitHub — `CrestAiLab/AIFirst`
- **Package manager:** pnpm (>= 9)
- **Live URL:** see Vercel dashboard

---

## Who to ask

- **Sanity content questions** → editor / content lead
- **Code questions** → developer team
- **Deploy / domain questions** → whoever owns the Vercel and GitHub accounts (CrestAiLab org)

---

## Older reference docs

The repo root also contains older deploy / fix guides that pre-date this handover folder. They are still useful for very specific troubleshooting:

- `DEPLOYMENT.md`, `QUICK_DEPLOY.md` — original deploy walkthroughs
- `SANITY_SETUP.md`, `SANITY_HOMEPAGE_GUIDE.md` — Sanity setup details
- `WEBHOOK_SETUP.md`, `WEBHOOK_TROUBLESHOOTING.md` — webhook configuration
- `HOW_TO_FIX.md`, `QUICK_FIX_PRODUCTION.md`, `VERIFY_PRODUCTION_SETUP.md`, `SETUP_VERIFICATION.md` — incident playbooks

Treat the **handover** folder as the canonical, up-to-date guide; treat the older files as deeper-dive references.
