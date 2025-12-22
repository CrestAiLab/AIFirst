# Quick Fix: Production Not Updating

If your Vercel production site isn't updating when you publish in Sanity, follow these steps in order:

## 🔍 Step 1: Check Your Setup

Visit this URL to see what's configured:
```
https://your-project.vercel.app/api/check-setup
```

This will show you:
- ✅ Which environment variables are set
- ✅ If Sanity connection works
- ✅ What's missing

## 🔧 Step 2: Most Common Issues (Fix These First)

### Issue 1: Missing Environment Variables

**Check:** Go to Vercel Dashboard → Your Project → Settings → Environment Variables

**Required variables:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Usually "production"  
- `SANITY_REVALIDATE_SECRET` - Random secret (generate: `openssl rand -hex 32`)

**Fix:**
1. Add missing variables
2. Make sure they're set for **Production** environment
3. **Redeploy** your project (env vars only apply to new deployments)

### Issue 2: Webhook Not Configured

**Check:** Go to [sanity.io/manage](https://sanity.io/manage) → Your Project → Settings → API → Webhooks

**Fix if missing:**
1. Click **Create webhook**
2. URL: `https://your-project.vercel.app/api/revalidate?secret=YOUR_SECRET`
   - Replace `your-project.vercel.app` with your actual Vercel domain
   - Replace `YOUR_SECRET` with your `SANITY_REVALIDATE_SECRET` value
3. Dataset: `production`
4. Trigger on: ✅ Create, ✅ Update, ✅ Delete
5. HTTP method: `POST`
6. Click **Save**

### Issue 3: Secret Mismatch

**Check:** The secret in your webhook URL must match `SANITY_REVALIDATE_SECRET` in Vercel

**Fix:**
1. Generate a new secret: `openssl rand -hex 32`
2. Update `SANITY_REVALIDATE_SECRET` in Vercel
3. Update webhook URL in Sanity with the new secret
4. Redeploy Vercel

### Issue 4: CORS Not Configured

**Check:** Go to [sanity.io/manage](https://sanity.io/manage) → Your Project → Settings → API → CORS origins

**Fix if missing:**
1. Click **Add CORS origin**
2. Origin: `https://your-project.vercel.app`
3. Credentials: ✅ Checked
4. Click **Save**

## 🧪 Step 3: Test the Webhook

### Test 1: Manual Revalidation

Visit in browser:
```
https://your-project.vercel.app/api/revalidate?secret=YOUR_SECRET
```

**Expected:** JSON response with `revalidated: true`

**If error:**
- `"Revalidation secret not configured"` → Add `SANITY_REVALIDATE_SECRET` to Vercel
- `"Invalid secret"` → Secret doesn't match

### Test 2: Webhook from Sanity

1. Make a small change in Sanity Studio
2. **Publish** it (not just save)
3. Check webhook logs in Sanity (Settings → API → Webhooks → View logs)
4. Check Vercel function logs (Functions → `/api/revalidate`)

**Expected:**
- Sanity webhook log shows **200** status
- Vercel logs show `📦 Webhook payload received` and `✅ Revalidated`

## 🚀 Step 4: Quick Fixes

### Fix 1: Redeploy After Adding Env Vars

After adding environment variables, you MUST redeploy:
1. Go to Vercel Dashboard → Deployments
2. Click three dots on latest deployment
3. Click **Redeploy**

### Fix 2: Clear Cache

1. Go to Vercel Dashboard → Your Project
2. Settings → Domains
3. Click **Purge Cache** (if available)

Or manually revalidate:
```
https://your-project.vercel.app/api/revalidate?secret=YOUR_SECRET
```

### Fix 3: Verify Webhook URL

Make sure webhook URL in Sanity:
- Uses `https://` (not `http://`)
- Matches your actual Vercel domain
- Has the correct secret in query parameter
- No extra spaces or characters

## 📋 Complete Checklist

Run through this checklist:

- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` set in Vercel (Production)
- [ ] `NEXT_PUBLIC_SANITY_DATASET` set in Vercel (Production)
- [ ] `SANITY_REVALIDATE_SECRET` set in Vercel (Production)
- [ ] Redeployed after adding env vars
- [ ] Webhook created in Sanity
- [ ] Webhook URL matches Vercel domain
- [ ] Webhook secret matches `SANITY_REVALIDATE_SECRET`
- [ ] CORS configured in Sanity with Vercel URL
- [ ] Manual revalidation test works (`/api/revalidate?secret=...`)
- [ ] Webhook logs in Sanity show 200 status
- [ ] Vercel function logs show successful revalidation

## 🆘 Still Not Working?

1. **Check deployment logs** for errors
2. **Check Vercel function logs** for runtime errors
3. **Check Sanity webhook logs** for delivery issues
4. **Test manually**: Visit `/api/revalidate?secret=...` in browser
5. **Wait 1 hour**: Even without webhook, ISR will update pages every hour

## 💡 Why Localhost Works But Production Doesn't

**Localhost:**
- Always fetches fresh data (no caching)
- No ISR (Incremental Static Regeneration)
- No webhook needed

**Production (Vercel):**
- Uses ISR (pages cached for 1 hour)
- Needs webhook for instant updates
- Requires environment variables to be set
- Requires CORS configuration

This is why you need the webhook setup for production!

