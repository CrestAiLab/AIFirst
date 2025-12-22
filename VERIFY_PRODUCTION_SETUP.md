# Production Setup Verification Checklist

Use this checklist to verify your production setup is correct.

## ✅ Step 1: Verify Vercel Environment Variables

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables**

Check that ALL of these are set for **Production** environment:

- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- [ ] `NEXT_PUBLIC_SANITY_DATASET` - Usually "production"
- [ ] `SANITY_REVALIDATE_SECRET` - Random secret (generate with `openssl rand -hex 32`)

**Important:** 
- Make sure they're set for **Production** (not just Preview/Development)
- After adding/updating env vars, you MUST redeploy for changes to take effect

## ✅ Step 2: Test Revalidation Endpoint

Visit this URL in your browser (replace with your actual values):
```
https://your-project.vercel.app/api/revalidate?secret=YOUR_SECRET
```

**Expected Response:**
```json
{
  "revalidated": true,
  "now": 1234567890,
  "message": "All pages revalidated successfully",
  "paths": ["/", "/insights", "/community"]
}
```

**If you get errors:**
- `"Revalidation secret not configured"` → `SANITY_REVALIDATE_SECRET` is missing in Vercel
- `"Invalid secret"` → Secret in URL doesn't match Vercel env var
- `404 Not Found` → The route isn't deployed, check your deployment

## ✅ Step 3: Verify Sanity CORS Configuration

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **Settings** → **API** → **CORS origins**
4. Check that your Vercel URL is added:
   - `https://your-project.vercel.app`
   - If you have a custom domain, also add that

**If missing:**
- Click **Add CORS origin**
- Origin: `https://your-project.vercel.app`
- Credentials: ✅ Checked
- Click **Save**

## ✅ Step 4: Verify Sanity Webhook Configuration

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **Settings** → **API** → **Webhooks**
4. Check if a webhook exists

**If webhook doesn't exist, create it:**
- Click **Create webhook**
- Name: `Vercel Revalidation`
- URL: `https://your-project.vercel.app/api/revalidate?secret=YOUR_SECRET`
  - Replace `your-project.vercel.app` with your actual Vercel domain
  - Replace `YOUR_SECRET` with your `SANITY_REVALIDATE_SECRET` value
- Dataset: `production` (or your dataset name)
- Trigger on: ✅ Create, ✅ Update, ✅ Delete
- HTTP method: `POST`
- API version: `v2021-06-07` or later
- Click **Save**

**If webhook exists, verify:**
- URL is correct (matches your Vercel domain)
- Secret in URL matches `SANITY_REVALIDATE_SECRET` in Vercel
- Triggers are enabled (Create, Update, Delete)

## ✅ Step 5: Check Webhook Logs in Sanity

1. In Sanity, go to your webhook
2. Click **View logs** or **Recent deliveries**
3. Make a test change in Sanity Studio and publish it
4. Check the logs - you should see:
   - ✅ **200** status = Success
   - ❌ **401** = Secret mismatch
   - ❌ **500** = Server error

## ✅ Step 6: Check Vercel Function Logs

1. Go to **Vercel Dashboard → Your Project**
2. Navigate to **Functions** tab
3. Find `/api/revalidate`
4. Click on it to see logs
5. Make a test change in Sanity and publish
6. Check logs for:
   - `📦 Webhook payload received:` - Webhook is working
   - `✅ Revalidated homepage` - Success
   - `❌ Error revalidating:` - Error occurred

## ✅ Step 7: Verify Deployment

1. Check that your latest code is deployed:
   - Go to **Vercel Dashboard → Your Project → Deployments**
   - Latest deployment should have the webhook route code
2. If you just added env vars, **redeploy**:
   - Go to **Deployments**
   - Click the three dots on latest deployment
   - Click **Redeploy**

## ✅ Step 8: Test End-to-End

1. Make a small change in Sanity Studio (e.g., change homepage title)
2. **Publish** the change (not just save as draft)
3. Wait 5-10 seconds
4. Visit your Vercel site
5. Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
6. Check if the change appears

## Common Issues & Quick Fixes

### Issue: "Revalidation secret not configured"
**Fix:** Add `SANITY_REVALIDATE_SECRET` to Vercel env vars and redeploy

### Issue: "Invalid secret"
**Fix:** 
1. Check secret in webhook URL matches `SANITY_REVALIDATE_SECRET` in Vercel
2. Make sure there are no extra spaces
3. Regenerate secret and update both places

### Issue: Webhook never triggers
**Fix:**
1. Make sure you're **publishing** (not just saving drafts)
2. Check webhook is enabled in Sanity
3. Verify webhook URL is correct
4. Check webhook logs in Sanity

### Issue: Webhook triggers but site doesn't update
**Fix:**
1. Check Vercel function logs for errors
2. Try manual revalidation: `https://your-project.vercel.app/api/revalidate?secret=YOUR_SECRET`
3. Clear browser cache and hard refresh
4. Wait up to 1 hour for ISR fallback

### Issue: Works locally but not on Vercel
**Fix:**
1. Local dev doesn't use ISR, so it always fetches fresh data
2. On Vercel, you need the webhook for instant updates
3. Verify webhook is configured with your **production** Vercel URL
4. Check `SANITY_REVALIDATE_SECRET` is set in Vercel **Production** environment

## Still Not Working?

1. **Check deployment logs** for build errors
2. **Redeploy** the project
3. **Test manually**: Visit `https://your-project.vercel.app/api/revalidate?secret=YOUR_SECRET`
4. **Check Sanity webhook logs** for delivery status
5. **Check Vercel function logs** for runtime errors

## Quick Test Commands

Generate a new secret:
```bash
openssl rand -hex 32
```

Test revalidation endpoint:
```bash
curl "https://your-project.vercel.app/api/revalidate?secret=YOUR_SECRET"
```

