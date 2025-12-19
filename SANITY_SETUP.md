# Sanity CMS Setup Guide

This guide will walk you through setting up Sanity CMS for your AIFirst website, allowing content editors to manage page content, insights (blog posts), and community posts through the Sanity Studio.

## Prerequisites

- A Sanity account (sign up at [sanity.io](https://www.sanity.io))
- Node.js and pnpm installed
- Your project dependencies installed

## Step 1: Create a Sanity Project

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click "Create new project"
3. Name your project (e.g., "AI First Website")
4. Choose a dataset name (usually "production")
5. Save your **Project ID** and **Dataset name**

## Step 2: Install Dependencies

If you haven't already, install the required dependencies:

```bash
pnpm install
```

This will install:
- `sanity` - Sanity Studio
- `@sanity/vision` - Vision tool for testing GROQ queries
- `next-sanity` - Next.js integration for Sanity
- Other existing dependencies

## Step 3: Configure Environment Variables

Create a `.env.local` file in your project root (if it doesn't exist):

```bash
cp .env.local.example .env.local
# or create it manually
```

Add the following environment variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

### Getting Your API Token

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **API** → **Tokens**
4. Click **Add API token**
5. Name it (e.g., "Website Token")
6. Set permissions to **Editor** (read and write)
7. Copy the token and add it to `.env.local`

**Note:** The `SANITY_API_TOKEN` is optional for read-only operations but required if you want to write data from your Next.js app.

## Step 4: Start the Development Server

Start your Next.js development server:

```bash
pnpm dev
```

## Step 5: Access Sanity Studio

Once your dev server is running, navigate to:

```
http://localhost:3000/studio
```

You'll be prompted to authenticate with Sanity. Log in with your Sanity account.

## Step 6: Set Up Initial Content

### Create Page Content

1. In Sanity Studio, click **"Page Content"** in the sidebar
2. Click **"Create"** → **"Page Content"**
3. Fill in the following sections:
   - **Hero Section**: Badge text, heading, description, button texts
   - **Statistics**: Add your stats (value, label, description)
   - **Solutions**: Add solutions with icon names (Brain, Cloud, Database, Zap, etc.)
   - **Community**: Heading, description, features, button text
   - **Insights Section**: Heading, description, button text
   - **CTA Section**: Heading, description, button text, disclaimer

**Important:** You must create at least one Page Content document. The homepage will use the first document it finds.

### Create Insights (Blog Posts)

1. Click **"Insight"** in the sidebar
2. Click **"Create"** → **"Insight"**
3. Fill in:
   - **Title**: The blog post title
   - **Slug**: Will auto-generate from title (or customize it)
   - **Category**: Select from Research, Case Study, Guide, News, Tutorial
   - **Description**: Short description (shown in preview cards)
   - **Image**: Upload a featured image
   - **Published At**: Set the publication date
   - **Content**: Add full blog post content (optional - for future blog post pages)
   - **Author**: Author name (defaults to "AI First Team")

4. Click **"Publish"**

### Create Community Posts

1. Click **"Community Post"** in the sidebar
2. Click **"Create"** → **"Community Post"**
3. Fill in:
   - **Title**: Discussion topic title
   - **Slug**: Auto-generated from title
   - **Author**: Name and optional avatar image
   - **Content**: Discussion content
   - **Replies**: Number of replies (defaults to 0)
   - **Created At**: Post date
   - **Featured**: Check this to show in the homepage featured discussions section

4. Click **"Publish"**

## Step 7: Verify Content on Your Website

1. Go to `http://localhost:3000` (your homepage)
2. You should see your content from Sanity displayed
3. Make changes in Sanity Studio and refresh the page to see updates

## Content Types Overview

### Page Content

This is the main content document that controls your homepage. Only one document is needed (the app uses the first one it finds).

**Sections:**
- Hero: Main banner section
- Stats: Statistics/metrics display
- Solutions: Feature cards
- Community: Community section info and features
- Insights: Section configuration (actual insights are separate documents)
- CTA: Call-to-action section

### Insights

Blog posts/articles that appear in the insights section. The homepage shows the 3 most recent posts.

**Features:**
- Categories (Research, Case Study, Guide, News, Tutorial)
- Featured images
- Rich text content support
- Publication dates
- Slug-based URLs (for future blog post pages)

### Community Posts

Discussion posts that can be featured on the homepage. Currently shows up to 3 featured posts.

**Features:**
- Author information with avatars
- Reply counts
- Featured flag to show on homepage
- Creation dates

## Icon Names Reference

When adding icons to Solutions or Community features, use these exact names:

- `Brain`
- `Cloud`
- `Database`
- `Zap`
- `Users`
- `MessageSquare`
- `BookOpen`
- `Calendar`

These correspond to icons from the `lucide-react` library.

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN` (optional)

4. Deploy

### Accessing Studio in Production

After deployment, you can access Sanity Studio at:

```
https://your-domain.com/studio
```

## Troubleshooting

### "Project ID not found" error

- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is set correctly in `.env.local`
- Restart your dev server after adding environment variables
- Check that the project ID matches your Sanity project

### Content not showing

- Verify you've created and published content in Sanity Studio
- Check browser console for errors
- Ensure your GROQ queries are correct (see `lib/sanity/queries.ts`)
- Verify dataset name matches your Sanity dataset

### Images not loading

- Ensure images are uploaded to Sanity (not external URLs)
- Check that `@sanity/image-url` is properly configured
- Verify image references in your content

### Studio not loading

- Check that all dependencies are installed: `pnpm install`
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are set
- Check browser console for errors
- Try accessing `/studio` path directly

## Next Steps

- **Add more content types**: Create schemas for additional content types as needed
- **Customize schemas**: Modify schemas in `sanity/schemaTypes/` to match your needs
- **Add blog post pages**: Create dynamic routes for individual insight/blog posts
- **Add community pages**: Create pages for individual community discussions
- **Add search**: Implement search functionality for insights and community posts

## File Structure

```
sanity/
  schemaTypes/
    index.ts          # Schema exports
    pageContent.ts    # Homepage content schema
    insight.ts        # Blog post schema
    communityPost.ts  # Community discussion schema

app/
  studio/
    [[...index]]/
      page.tsx        # Sanity Studio route

lib/
  sanity/
    client.ts         # Sanity client configuration
    queries.ts        # GROQ queries
    types.ts          # TypeScript types
    image.ts          # Image URL builder

sanity.config.ts      # Sanity Studio configuration
```

## Support

For Sanity-specific questions, check:
- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/docs/nextjs)
- [GROQ Query Documentation](https://www.sanity.io/docs/groq)

