# 04 — Sanity (CMS)

> Audience: editors and junior developers. Sanity is where the content lives. The website reads from it; the code is just the wrapper.

---

## 1. What Sanity is

Sanity has two parts:

| Part | What it is | Where it runs |
|------|-----------|---------------|
| **Sanity Studio** | The friendly editor UI | Embedded in our site at `/studio` (no separate URL) |
| **Sanity Content Lake** | The cloud database storing every document | sanity.io's servers |

The website reads from Content Lake using **GROQ** queries. Editors write to Content Lake by clicking **Publish** in Studio.

---

## 2. Project identifiers

| Field | Value | Where to find |
|-------|-------|---------------|
| **Project ID** | A short opaque string (e.g. `abc123def`) | [sanity.io/manage](https://sanity.io/manage) → AIFirst → top-left, or copy from Vercel env vars |
| **Dataset** | `production` | Same place |
| **Studio URL** | `/studio` on whatever site is serving the code | e.g. `http://localhost:3000/studio` in dev, `https://yoursite.com/studio` in production |
| **Manage dashboard** | [sanity.io/manage](https://sanity.io/manage) | Where you set CORS, webhooks, and tokens |

---

## 3. Logging into Studio

1. Go to `/studio`.
2. Click **Sign in with Google** (or your team's chosen provider).
3. If you don't see content, your account isn't a member of the Sanity project — ask the project owner to invite you at sanity.io/manage → Members.

---

## 4. The content schemas (document types)

A schema defines what fields a document has. Schemas live in `/sanity/schemaTypes/`. There are five:

### 4.1 `pageContent` — the homepage configuration
Single document. The whole homepage layout is configured here.

| Field | What it does |
|-------|--------------|
| `title` | Internal name (not shown on the site) |
| `sections` | An ordered list of **page sections** (Hero, Stats, Solutions, etc.) — drag to reorder, toggle to hide |

> If this document doesn't exist yet, the site falls back to defaults from `lib/defaultSections.ts`. Run `pnpm seed:sanity` to create it.

### 4.2 `pageSection` — a building block (used inside `pageContent`)
Not a standalone document. Each section has a `sectionType` field that controls which other fields appear:

| `sectionType` | Component on the homepage |
|---------------|---------------------------|
| `hero` | Big headline + 2 buttons |
| `stats` | Row of metrics |
| `solutions` | Bento grid of feature cards |
| `cyberSecurity` | Security hub block |
| `community` | Community pathways block |
| `insights` | Latest 3 blog posts |
| `sources` | Latest 3 curated links |
| `cta` | Call-to-action banner |
| `content` | 2-column text + image block |

Each section also has:
- `enabled` — toggle visibility
- `showMore` — optional "Explore more →" link (internal or external)

### 4.3 `insight` — a blog post
| Field | Notes |
|-------|-------|
| `title` | The headline |
| `slug` | Auto-generated from the title (becomes the URL: `/insights/<slug>`) |
| `category` | One of: Research, Case Study, Guide, News, Tutorial |
| `description` | Short preview shown in cards |
| `image` | Cover image (uploaded to Sanity) |
| `publishedAt` | Date — defaults to "now" |
| `content` | Rich text + inline images (Portable Text editor) |
| `author` | Defaults to "AI First Team" |

Listed at `/insights`, individually at `/insights/[slug]`, last 3 on the homepage.

### 4.4 `source` — a curated external link
| Field | Notes |
|-------|-------|
| `title` | Display title |
| `slug` | URL slug (used internally even if the card links externally) |
| `kind` | `paper`, `podcast`, `article`, or `link` |
| `url` | Where the card links to. If set, the card opens this URL. |
| `sourceInfo` | "From The Verge", "MIT Press", etc. |
| `tags` | Small chips on the card |
| `description` | Markdown supported |
| `thumbnail` | Optional — overrides the auto-fetched og:image |
| `publishedAt` | Date |

Listed at `/sources`, last 3 on the homepage. If `thumbnail` is empty and `url` is set, the site fetches the og:image via `/api/sources/thumbnail`.

### 4.5 `communityPost` — a discussion item
| Field | Notes |
|-------|-------|
| `title` | Headline |
| `slug` | URL slug |
| `author` | `{ name, avatar }` |
| `content` | Plain text |
| `tags` | e.g. `#RAG`, `#CyberSecurity` |
| `replies` | Count (defaults to 0) |
| `createdAt` | Date |
| `featured` | If `true`, shown on the homepage community section (max 3) |

Listed at `/community`.

---

## 5. Editor workflows

### Edit the homepage layout
1. Open `/studio` → **Page Content**.
2. Click on the **Sections** array. Drag to reorder, toggle `enabled`, or click a section to edit its fields.
3. Click **Publish** (bottom-right). Within a few seconds the homepage updates.

### Add a new blog post (insight)
1. `/studio` → **Insights** → **New Insight**.
2. Fill in title (slug auto-generates), description, upload a cover image, pick category, write content in the rich-text editor.
3. **Publish** → live at `/insights/your-slug` and on `/insights` listing.

### Add a curated source
1. `/studio` → **Sources** → **New Source**.
2. Choose `kind`, paste `url`, fill `title`, `sourceInfo`, add tags.
3. (Optional) upload a custom `thumbnail`. Otherwise the site grabs the page's preview image.
4. **Publish**.

### Add a community post
1. `/studio` → **Community Posts** → **New Community Post**.
2. Fill author name, optional avatar, content, tags.
3. Tick `featured` if you want it on the homepage.
4. **Publish**.

---

## 6. The webhook (so content updates show instantly)

When an editor publishes, Sanity calls `https://yoursite.com/api/revalidate?secret=...`. This drops Next.js's cache and the next visitor sees the new content.

### Setup (one-time, by an admin)
1. [sanity.io/manage](https://sanity.io/manage) → AIFirst → **API → Webhooks** → **Create webhook**.
2. Fill in:
   - **URL:** `https://yoursite.com/api/revalidate?secret=THE_SECRET`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** leave empty (or restrict to specific document types)
   - **Projection:** `{ _type, _id, slug }`
3. The `THE_SECRET` value must equal Vercel's `SANITY_REVALIDATE_SECRET` env var. If you don't have one yet:
   ```bash
   openssl rand -hex 32
   ```
   Paste the result into both Sanity webhook URL and Vercel env vars.

### Verifying the webhook works
- Edit any insight → publish → watch the website refresh within ~5 seconds.
- Or check the Sanity webhook log (Manage → Webhooks → click the webhook → see recent deliveries).
- Or call manually: `https://yoursite.com/api/revalidate?secret=THE_SECRET` should return `{ "revalidated": true, ... }`.

---

## 7. CORS setup (so Studio works)

Sanity blocks browsers from talking to it unless your site's URL is on the **CORS Origins** list.

[sanity.io/manage](https://sanity.io/manage) → AIFirst → **API → CORS Origins** → add:
- `http://localhost:3000` (for local dev)
- `https://yoursite.vercel.app` (the Vercel production URL)
- any custom domain you use

Tick **Allow credentials** for each.

---

## 8. API tokens

For scripts that need to **write** to Sanity (e.g. `pnpm seed:sanity`):

1. [sanity.io/manage](https://sanity.io/manage) → AIFirst → **API → Tokens** → **Add API token**.
2. Choose the right permission:
   - **Viewer** — read only (safe for fetches)
   - **Editor** — read + write (for seed scripts)
   - **Admin** — full control (avoid unless needed)
3. Copy the token. **It is shown only once.**
4. Paste into `.env.local` as `SANITY_API_TOKEN`, and into Vercel env vars if needed in production.

---

## 9. The seed script

`pnpm seed:sanity` (file: `scripts/seed-sanity.ts`) creates the initial homepage configuration. Run it once when setting up a brand-new dataset. It:
- checks if a `pageContent` document exists,
- if not, creates one with the default sections from `lib/defaultSections.ts`,
- if yes, optionally updates it.

Other scripts in `/scripts/`:
- `init-homepage.ts` — interactive variant of seed
- `check-sanity-data.ts` — validates Sanity content is present and well-formed

See `scripts/README.md` for details.

---

## 10. Common questions

**Q: I published a change but the site still shows the old content.**
A: Wait 5 seconds. Then check `/api/check-setup` and the Sanity webhook log. If the webhook isn't firing, see [WEBHOOK_TROUBLESHOOTING.md](../../WEBHOOK_TROUBLESHOOTING.md).

**Q: I deleted a document by accident.**
A: Sanity keeps a history. Open the document in Studio → click the timeline (clock icon, top-right) → restore.

**Q: Can I have draft content that's not yet public?**
A: Yes — Studio's "Save Draft" doesn't publish. Drafts aren't visible to the public site (which only reads published documents).

**Q: Where do I see all changes ever made to a document?**
A: Same timeline (clock icon) in Studio.

**Q: Can two editors work at once?**
A: Yes. Studio is real-time collaborative.

---

Next: **[05 — Vercel](./05-vercel.md)** for the hosting side.
