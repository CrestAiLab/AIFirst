# How To Fix Production Not Updating

Follow these steps in order to get your production site updating from Sanity.

## Step 1: Check What's Missing

First, let's see what's configured:

1. **Deploy the diagnostic endpoint** (if you haven't already):
   - The file `app/api/check-setup/route.ts` should already be in your code
   - Push to GitHub or redeploy on Vercel

2. **Visit the diagnostic URL**:
   ```
   https://your-project.vercel.app/api/check-setup
   ```
   Replace `your-project.vercel.app` with your actual Vercel domain.

3. **Check the response** - it will tell you what's missing.

## Step 2: Add Environment Variables to Vercel

### Option A: Via Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and log in
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add these three variables one by one:

   **Variable 1:**
   - Name: `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - Value: Your Sanity project ID (get it from [sanity.io/manage](https://sanity.io/manage))
   - Environment: Select **Production** (and Preview/Development if you want)
   - Click **Save**

   **Variable 2:**
   - Name: `NEXT_PUBLIC_SANITY_DATASET`
   - Value: `production` (or your dataset name)
   - Environment: Select **Production**
   - Click **Save**

   **Variable 3:**
   - Name: `SANITY_REVALIDATE_SECRET`
   - Value: Generate a random secret:
     - On Mac/Linux: Open terminal and run `openssl rand -hex 32`
     - On Windows: Use PowerShell: `[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))`
     - Or use an online generator: https://randomkeygen.com/
   - Environment: Select **Production**
   - Click **Save**

6. **IMPORTANT:** After adding variables, you MUST redeploy:
   - Go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Click **Redeploy**
   - Wait for deployment to finish

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login
vercel login

# Add environment variables
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production
vercel env add NEXT_PUBLIC_SANITY_DATASET production
vercel env add SANITY_REVALIDATE_SECRET production

# Redeploy
vercel --prod
```

## Step 3: Get Your Sanity Project ID

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click on your project
3. Go to **Settings** → **API**
4. Your **Project ID** is shown at the top
5. Copy it and use it for `NEXT_PUBLIC_SANITY_PROJECT_ID`

## Step 4: Configure CORS in Sanity

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **Settings** → **API** → **CORS origins**
4. Click **Add CORS origin**
5. Fill in:
   - **Origin**: `https://your-project.vercel.app` (replace with your actual Vercel domain)
   - **Credentials**: ✅ Check this box
   - **Allow requests from**: Leave blank
6. Click **Save**

If you have a custom domain, also add that:
- **Origin**: `https://your-custom-domain.com`
- **Credentials**: ✅ Checked
- Click **Save**

## Step 5: Create Webhook in Sanity

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **Settings** → **API** → **Webhooks**
4. Click **Create webhook**
5. Fill in the form:

   **Name:**
   ```
   Vercel Revalidation
   ```

   **URL:**
   ```
   https://your-project.vercel.app/api/revalidate?secret=YOUR_SECRET_HERE
   ```
   - Replace `your-project.vercel.app` with your actual Vercel domain
   - Replace `YOUR_SECRET_HERE` with the same secret you used for `SANITY_REVALIDATE_SECRET` in Vercel
   - **Important:** The secret must match exactly (no spaces, same value)

   **Dataset:**
   ```
   production
   ```
   (or your dataset name)

   **Trigger on:**
   - ✅ **Create**
   - ✅ **Update**
   - ✅ **Delete**

   **HTTP method:**
   ```
   POST
   ```

   **API version:**
   ```
   v2021-06-07
   ```
   (or any recent version)

6. Click **Save**

## Step 6: Test the Setup

### Test 1: Check Configuration

Visit:
```
https://your-project.vercel.app/api/check-setup
```

You should see all checks passing (✅).

### Test 2: Manual Revalidation

Visit:
```
https://your-project.vercel.app/api/revalidate?secret=YOUR_SECRET
```

Replace `YOUR_SECRET` with your actual secret.

**Expected response:**
```json
{
  "revalidated": true,
  "now": 1234567890,
  "message": "All pages revalidated successfully",
  "paths": ["/", "/insights", "/community"]
}
```

If you get an error, check:
- `"Revalidation secret not configured"` → `SANITY_REVALIDATE_SECRET` not set in Vercel
- `"Invalid secret"` → Secret in URL doesn't match Vercel env var

### Test 3: Test Webhook from Sanity

1. Go to Sanity Studio (your Vercel site `/studio` or [sanity.io/manage](https://sanity.io/manage))
2. Make a small change (e.g., update homepage title)
3. **Publish** the change (click "Publish" button, not just save)
4. Wait 5-10 seconds
5. Check webhook logs:
   - In Sanity: Settings → API → Webhooks → Click your webhook → View logs
   - Should show **200** status
6. Check Vercel logs:
   - Vercel Dashboard → Your Project → Functions → `/api/revalidate`
   - Should show `📦 Webhook payload received` and `✅ Revalidated`
7. Visit your site and hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
8. The change should appear!

## Step 7: Verify Everything Works

1. Make another change in Sanity
2. Publish it
3. Wait 5-10 seconds
4. Visit your production site
5. Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
6. Change should be visible!

## Troubleshooting

### "Revalidation secret not configured"
- Add `SANITY_REVALIDATE_SECRET` to Vercel environment variables
- Make sure it's set for **Production** environment
- Redeploy after adding

### "Invalid secret"
- Secret in webhook URL must match `SANITY_REVALIDATE_SECRET` in Vercel
- Check for extra spaces or typos
- Regenerate secret and update both places

### Webhook shows 401 error
- Secret mismatch between webhook URL and Vercel env var
- Regenerate and update both

### Webhook shows 500 error
- Check Vercel function logs for details
- Make sure all environment variables are set
- Redeploy the project

### Changes not appearing
- Make sure you're **publishing** (not just saving drafts)
- Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
- Clear browser cache
- Wait up to 1 hour for ISR fallback if webhook isn't working

### Works locally but not production
- Localhost doesn't use caching, production does
- You need the webhook for instant updates in production
- Verify webhook is configured with your **production** Vercel URL

## Quick Checklist

Before testing, make sure:

- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` added to Vercel (Production)
- [ ] `NEXT_PUBLIC_SANITY_DATASET` added to Vercel (Production)
- [ ] `SANITY_REVALIDATE_SECRET` added to Vercel (Production)
- [ ] Redeployed after adding env vars
- [ ] CORS configured in Sanity with Vercel URL
- [ ] Webhook created in Sanity
- [ ] Webhook URL has correct domain and secret
- [ ] Manual revalidation test works
- [ ] Webhook logs show 200 status when publishing

## Need Help?

If you're still stuck:

1. Check `/api/check-setup` endpoint to see what's missing
2. Check Vercel function logs for errors
3. Check Sanity webhook logs for delivery status
4. Verify all environment variables are set correctly
5. Make sure you redeployed after adding env vars

