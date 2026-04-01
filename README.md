# AIFirst

A Next.js application with shadcn/ui, configured for Vercel deployment and Sanity CMS integration.

## Setup

### Prerequisites

Make sure you have [pnpm](https://pnpm.io) installed. If not, install it:

```bash
npm install -g pnpm
```

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment variables (local dev)

Create `.env.local` from the example file:

```bash
cp .env.local.example .env.local
```

**Already deployed on Vercel?** You do not need to remember which Sanity account created the project for day-to-day dev:

1. Open [vercel.com](https://vercel.com) → your project → **Settings** → **Environment Variables**.
2. Copy the same names into `.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and optionally `SANITY_API_TOKEN`, `SANITY_REVALIDATE_SECRET`).

Values are plain text in the Vercel UI (click to reveal). **Self-hosting later** uses the same variables; configure them on your host instead of Vercel.

If `.env.local` is missing or wrong, `pnpm dev` still runs: the homepage falls back to **default sections** and empty insights/community until Sanity is reachable.

**New project / no Vercel yet:** see [SANITY_SETUP.md](./SANITY_SETUP.md) or create a project at [sanity.io/manage](https://sanity.io/manage) and paste ID + dataset + token into `.env.local`.

### 3. Optional: shadcn components

Add components as needed, for example:

```bash
pnpm dlx shadcn@latest add button
```

### 4. Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Quick Deploy to Vercel

See **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** for a 5-step deployment guide.

### Detailed Deployment Guide

For comprehensive deployment instructions, see **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

### Quick Summary

1. Push your code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN` (optional)
4. Configure Sanity CORS with your Vercel URL
5. Deploy!

The project is pre-configured for Vercel with `vercel.json`.

## Project Structure

```
├── app/              # Next.js app directory
│   ├── globals.css   # Global styles with shadcn/ui theme
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Home page
├── components/       # React components (shadcn/ui components will be added here)
├── lib/              # Utility functions
│   ├── utils.ts      # Utility functions (cn helper)
│   └── sanity/       # Sanity client and image utilities
│       ├── client.ts # Sanity client configuration
│       └── image.ts  # Image URL builder
├── components.json   # shadcn/ui configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── next.config.js    # Next.js configuration
```

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript
- ✅ shadcn/ui components
- ✅ Tailwind CSS with dark mode support
- ✅ Sanity CMS integration
- ✅ Vercel-ready configuration
- ✅ Image optimization for Sanity images

## Usage

### Using Sanity Client

```typescript
import { client } from '@/lib/sanity/client'

// Fetch data
const data = await client.fetch(`*[_type == "post"]`)
```

### Using Sanity Images

```typescript
import { urlFor } from '@/lib/sanity/image'
import Image from 'next/image'

// In your component
<Image
  src={urlFor(image).width(800).height(600).url()}
  alt="Description"
  width={800}
  height={600}
/>
```

## License

MIT
