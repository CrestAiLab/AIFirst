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

### 2. Add v0 Component

Run the following command to add the v0 component:

```bash
pnpm dlx shadcn@latest add "https://v0.app/chat/b/b_sbp1IYzXvoQ?token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..-hR4wWFFqsq0Z1Z4.iT-NxjMD3zkcE-Xxl3xs3x1BZNx1riv685jXQC9sRb9rumdODGpCGaQlp9s.SvIAPGO8MC19NLx9cL8VJQ"
```

**Note:** When prompted to overwrite `globals.css`, choose **N** (No) since it's already configured correctly.

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Then update the following variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token
```

### 4. Sanity Setup

1. Create a new Sanity project at [sanity.io](https://www.sanity.io)
2. Get your Project ID and Dataset name
3. Create an API token with read/write permissions
4. Add these to your `.env.local` file

### 5. Development

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
