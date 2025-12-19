# Sanity Seeding Script

This script will populate your Sanity CMS with the default page sections so you can edit them in Sanity Studio.

## Prerequisites

1. Make sure you have your Sanity environment variables set in `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token
   ```

2. Get your API token from [sanity.io/manage](https://sanity.io/manage):
   - Go to your project
   - API → Tokens
   - Create a new token with **Editor** permissions

## Option 1: Using the Script (Recommended)

### Install tsx (if not already installed):
```bash
pnpm add -D tsx
```

### Run the seed script:
```bash
pnpm seed:sanity
```

This will:
- Create a new "Page Content" document in Sanity (or update existing one)
- Add all 6 default sections (Hero, Stats, Solutions, Community, Insights, CTA)
- Make them editable in Sanity Studio

## Option 2: Manual Setup in Sanity Studio

If you prefer to set it up manually:

1. Go to `http://localhost:3000/studio`
2. Click **"Page Content"** in the sidebar
3. Click **"Create"** (or edit existing)
4. Set **Title** to "Home Page"
5. In **"Page Sections"**, click **"Add item"** for each section:

   **Hero Section:**
   - Section Type: `hero`
   - Enabled: ✓
   - Badge: "Empowering tomorrow's infrastructure today"
   - Heading: "Build the future with AI-powered infrastructure"
   - Description: "Transform your operations with cutting-edge AI solutions..."
   - Primary Button: "Start Building"
   - Secondary Button: "Watch Demo"

   **Stats Section:**
   - Section Type: `stats`
   - Enabled: ✓
   - Add 4 stat items:
     - Value: "500K+", Label: "Active Users", Description: "Professionals worldwide trust our platform"
     - Value: "99.9%", Label: "Uptime", Description: "Industry-leading reliability"
     - Value: "150+", Label: "Countries", Description: "Global reach and impact"
     - Value: "10M+", Label: "API Calls", Description: "Processed daily across infrastructure"

   **Solutions Section:**
   - Section Type: `solutions`
   - Enabled: ✓
   - Add 4 solution items:
     - Icon: "Brain", Title: "AI-Powered Analytics", Description: "Harness the power of machine learning..."
     - Icon: "Cloud", Title: "Cloud Infrastructure", Description: "Scalable, resilient cloud solutions..."
     - Icon: "Database", Title: "Data Management", Description: "Intelligent data orchestration..."
     - Icon: "Zap", Title: "Automation", Description: "Streamline operations with intelligent automation..."

   **Community Section:**
   - Section Type: `community`
   - Enabled: ✓
   - Heading: "Join a thriving community of innovators"
   - Description: "Connect with like-minded professionals..."
   - Button Text: "Join Community"
   - Add 4 features:
     - Icon: "Users", Title: "Global Network", Description: "Connect with 500K+ professionals"
     - Icon: "MessageSquare", Title: "Discussions", Description: "Join expert-led conversations"
     - Icon: "BookOpen", Title: "Resources", Description: "Access exclusive learning materials"
     - Icon: "Calendar", Title: "Events", Description: "Attend workshops and webinars"

   **Insights Section:**
   - Section Type: `insights`
   - Enabled: ✓
   - Heading: "Latest insights"
   - Description: "Stay ahead with industry trends and expert perspectives"
   - Button Text: "View All"

   **CTA Section:**
   - Section Type: `cta`
   - Enabled: ✓
   - Heading: "Ready to transform your infrastructure?"
   - Description: "Join thousands of forward-thinking companies..."
   - Button Text: "Get Started"
   - Disclaimer: "No credit card required • Free 14-day trial"

6. Click **"Publish"**

## After Setup

Once you've seeded Sanity (either via script or manually):
- Your home page will use the content from Sanity instead of defaults
- You can edit everything at `http://localhost:3000/studio`
- Changes will appear on your home page after publishing

