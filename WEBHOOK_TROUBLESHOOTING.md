# Webhook Troubleshooting Guide

If your Vercel site isn't updating when you publish content in Sanity, follow these steps:

## Step 1: Verify Environment Variable

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Check that `SANITY_REVALIDATE_SECRET` exists and has a value
3. Make sure it's set for **Production** environment (and Preview/Development if needed)

## Step 2: Test the Webhook Endpoint Manually

Visit this URL in your browser (replace with your actual values):
```
https://your-project.vercel.app/api/revalidate?secret=YOUR_SECRET
```

**Expected response:**
```json
{
  "revalidated": true,
  "now": 1234567890,
  "message": "All pages revalidated successfully",
  "paths": ["/", "/insights", "/community"]
}
```

**If you get an error:**
- `"Revalidation secret not configured"` → Add `SANITY_REVALIDATE_SECRET` to Vercel
- `"Invalid secret"` → The secret in the URL doesn't match the one in Vercel

## Step 3: Check Sanity Webhook Configuration

1. Go to [sanity.io/manage](https://sanity.io/manage) → Your Project
2. Navigate to **Settings** → **API** → **Webhooks**
3. Click on your webhook
4. Check:
   - **URL** matches: `https://your-project.vercel.app/api/revalidate?secret=YOUR_SECRET`
   - **HTTP method** is `POST`
   - **Trigger on** includes: Create, Update, Delete
   - **Dataset** matches your dataset name

## Step 4: Check Webhook Logs in Sanity

1. In Sanity, go to your webhook
2. Click **View logs** or **Recent deliveries**
3. Look for:
   - ✅ **200** status = Success
   - ❌ **401** = Secret mismatch
   - ❌ **500** = Server error

**If you see 401:**
- The secret in the webhook URL doesn't match `SANITY_REVALIDATE_SECRET` in Vercel

**If you see 500:**
- Check Vercel function logs (see Step 5)

## Step 5: Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project
2. Navigate to **Functions** tab
3. Find `/api/revalidate`
4. Click on it to see logs
5. Look for:
   - `📦 Webhook payload received:` - Shows what Sanity sent
   - `✅ Revalidated homepage` - Success messages
   - `❌ Error revalidating:` - Error messages

**Common log messages:**
- `📦 Webhook payload received:` - Webhook is working, check the payload format
- `⚠️ Could not determine document type` - Webhook sent unexpected format (but still revalidates all pages)
- `❌ Invalid secret` - Secret mismatch
- `❌ SANITY_REVALIDATE_SECRET is not set` - Environment variable missing

## Step 6: Test Publishing in Sanity

1. Make a small change in Sanity Studio (e.g., change homepage title)
2. **Publish** the change (not just save as draft)
3. Wait 5-10 seconds
4. Check Vercel function logs to see if webhook was triggered
5. Visit your site - it should show the update

## Step 7: Verify CDN is Disabled

The Sanity client is now configured to bypass CDN caching. This ensures fresh data is fetched.

Check `lib/sanity/client.ts`:
```typescript
useCdn: false,  // Should be false
```

## Common Issues & Solutions

### Issue: Webhook never triggers

**Solution:**
- Make sure you're **publishing** (not just saving drafts)
- Check webhook is enabled in Sanity
- Verify webhook URL is correct
- Check webhook logs in Sanity

### Issue: Webhook triggers but site doesn't update

**Solution:**
- Check Vercel function logs for errors
- Verify `SANITY_REVALIDATE_SECRET` is set correctly
- Try manual revalidation: `https://your-project.vercel.app/api/revalidate?secret=YOUR_SECRET`
- Clear browser cache and hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

### Issue: 401 Unauthorized

**Solution:**
- Secret in webhook URL must match `SANITY_REVALIDATE_SECRET` in Vercel
- Regenerate secret and update both places
- Make sure secret doesn't have extra spaces or characters

### Issue: 500 Server Error

**Solution:**
- Check Vercel function logs for detailed error
- Verify environment variables are set
- Make sure the function deployed successfully
- Try redeploying the project

### Issue: Works locally but not on Vercel

**Solution:**
- Local development doesn't use ISR, so it always fetches fresh data
- On Vercel, you need the webhook for instant updates
- Make sure webhook is configured with your **production** Vercel URL
- Verify `SANITY_REVALIDATE_SECRET` is set in Vercel production environment

## Still Not Working?

1. **Check deployment**: Make sure latest code is deployed to Vercel
2. **Redeploy**: Try redeploying the project in Vercel
3. **Check network**: Verify Vercel can reach Sanity (check CORS settings)
4. **Fallback**: Even without webhook, pages update every hour via ISR

## Manual Revalidation

You can manually trigger revalidation anytime by visiting:
```
https://your-project.vercel.app/api/revalidate?secret=YOUR_SECRET
```

This is useful for testing or if the webhook isn't working.

