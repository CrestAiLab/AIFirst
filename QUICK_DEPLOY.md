# Quick Deploy to Vercel - 5 Steps

## 🚀 Quick Start

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Import to Vercel
- Go to [vercel.com/new](https://vercel.com/new)
- Import your GitHub repository
- Click "Import"

### 3. Add Environment Variables
In Vercel project settings, add these 3 variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

**Where to find:**
- Project ID: [sanity.io/manage](https://sanity.io/manage) → Your Project → Settings
- API Token: Settings → API → Tokens → Create new token (Editor permissions)

### 4. Configure Sanity CORS
After deployment, add your Vercel URL to Sanity:
- Go to [sanity.io/manage](https://sanity.io/manage) → Your Project
- Settings → API → CORS origins
- Add: `https://your-project.vercel.app` ✅ (with credentials)

### 5. Deploy!
Click "Deploy" and wait 2-5 minutes.

## ✅ Done!

- **Website**: `https://your-project.vercel.app`
- **Studio**: `https://your-project.vercel.app/studio`

## 📝 Notes

- Vercel auto-deploys on every git push
- Environment variables are encrypted
- Preview deployments created for PRs

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

