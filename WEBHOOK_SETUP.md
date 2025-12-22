# Sanity Webhook Setup for Vercel Revalidation

This guide helps you set up on-demand revalidation so your Vercel site updates immediately when you publish content in Sanity.

## Quick Setup

### 1. Generate a Secret

```bash
openssl rand -hex 32
```

Copy the generated secret.

### 2. Add Secret to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - **Name**: `SANITY_REVALIDATE_SECRET`
   - **Value**: (paste the secret from step 1)
   - **Environment**: Production, Preview, Development (select all)
4. Click **Save**

### 3. Get Your Webhook URL

Your webhook URL format:
```
https://your-project.vercel.app/api/revalidate?secret=YOUR_SECRET_HERE
```

Replace:
- `your-project.vercel.app` with your actual Vercel domain
- `YOUR_SECRET_HERE` with the secret you generated

### 4. Configure Webhook in Sanity

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Navigate to **Settings** → **API** → **Webhooks**
4. Click **Create webhook**
5. Fill in:
   - **Name**: `Vercel Revalidation`
   - **URL**: `https://your-project.vercel.app/api/revalidate?secret=YOUR_SECRET`
   - **Dataset**: `production` (or your dataset name)
   - **Trigger on**: 
     - ✅ Create
     - ✅ Update  
     - ✅ Delete
   - **HTTP method**: `POST`
   - **API version**: `v2021-06-07` or later
6. Click **Save**

### 5. Test It

1. Make a change in Sanity Studio
2. Publish the change
3. Check your Vercel site - it should update within seconds!

## Troubleshooting

### Webhook Not Working

1. **Check the secret matches**: The secret in Vercel env vars must match the secret in the webhook URL
2. **Check webhook logs**: In Sanity, go to Settings → API → Webhooks → Click your webhook → View logs
3. **Check Vercel logs**: In Vercel dashboard → Functions → `/api/revalidate` → View logs
4. **Test manually**: Visit `https://your-project.vercel.app/api/revalidate?secret=YOUR_SECRET` in your browser (should return JSON)

### Content Still Not Updating

- **ISR Fallback**: Even without webhook, pages update every 60 seconds via ISR
- **Wait 60 seconds**: If webhook fails, wait up to 60 seconds for automatic revalidation
- **Clear cache**: In Vercel dashboard, you can clear cache and redeploy

## How It Works

1. **ISR (Incremental Static Regeneration)**: Pages are regenerated every 60 seconds automatically
2. **On-Demand Revalidation**: Webhook triggers immediate revalidation when you publish in Sanity
3. **Best of Both Worlds**: You get instant updates via webhook, with automatic fallback via ISR

## Security

The webhook endpoint is protected by a secret query parameter. Only requests with the correct secret can trigger revalidation. Keep your `SANITY_REVALIDATE_SECRET` secure and never commit it to git.

