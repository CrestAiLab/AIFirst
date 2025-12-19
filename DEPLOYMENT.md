# Deployment Guide - Vercel + Sanity

This guide will help you deploy your AIFirst website to Vercel with Sanity CMS.

## Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **Sanity Account** - You should already have this set up

## Step 1: Prepare Your Repository

Make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## Step 2: Get Your Sanity Credentials

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **Settings** → **API** → **Tokens**
4. Note down:
   - **Project ID** (visible in project settings)
   - **Dataset name** (usually "production")
   - Create an **API Token** with **Editor** permissions (if you don't have one)

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Import Your Repository**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Click "Import"

2. **Configure Project**
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `pnpm build` (or leave default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `pnpm install` (or leave default)

3. **Add Environment Variables**
   Click "Environment Variables" and add:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token_here
   ```

   ⚠️ **Important**: 
   - Replace `your_project_id_here` with your actual Sanity Project ID
   - Replace `your_api_token_here` with your actual API Token
   - The `NEXT_PUBLIC_` prefix is required for client-side access

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 2-5 minutes)

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Add Environment Variables**:
   ```bash
   vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
   vercel env add NEXT_PUBLIC_SANITY_DATASET
   vercel env add SANITY_API_TOKEN
   ```

5. **Redeploy with environment variables**:
   ```bash
   vercel --prod
   ```

## Step 4: Configure Sanity CORS (Important!)

After deployment, you need to allow your Vercel domain to access Sanity:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **Settings** → **API** → **CORS origins**
4. Click **Add CORS origin**
5. Add your Vercel URL:
   - **Origin**: `https://your-project.vercel.app`
   - **Credentials**: ✅ Check this
   - **Allow requests from**: Leave blank
6. Click **Save**

If you have a custom domain, also add:
- `https://your-custom-domain.com`

## Step 5: Access Your Deployed Site

After deployment:

- **Your Website**: `https://your-project.vercel.app`
- **Sanity Studio**: `https://your-project.vercel.app/studio`

## Step 6: Seed Your Content (Optional)

If you want to populate Sanity with default content:

1. **Set up local environment** (if not already):
   ```bash
   # Create .env.local with your Sanity credentials
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token
   ```

2. **Run the seed script**:
   ```bash
   pnpm seed:sanity
   ```

3. **Or manually create content** in Sanity Studio at `/studio`

## Step 7: Set Up Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions
5. Update Sanity CORS to include your custom domain

## Troubleshooting

### Build Fails

- Check that all environment variables are set correctly
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
- Check build logs in Vercel dashboard

### Sanity Studio Not Loading

- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are set
- Check that CORS is configured in Sanity
- Ensure your Vercel URL is added to Sanity CORS origins

### Images Not Loading

- Verify Sanity image CDN is accessible
- Check that `next.config.js` has correct image configuration
- Ensure images are uploaded to Sanity (not external URLs)

### Content Not Showing

- Verify you've published content in Sanity Studio
- Check that environment variables match your Sanity project
- Clear Vercel cache and redeploy if needed

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ Yes | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ Yes | Your Sanity dataset (usually "production") |
| `SANITY_API_TOKEN` | ⚠️ Optional | Only needed for write operations (seeding) |

## Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to `main` branch
- Create preview deployments for pull requests
- Run builds automatically

## Next Steps

- Set up custom domain
- Configure analytics (Vercel Analytics is already included)
- Set up preview deployments for staging
- Configure webhooks if needed

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

