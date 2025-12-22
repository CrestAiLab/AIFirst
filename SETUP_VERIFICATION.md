# Sanity Studio & Page Layout Setup Verification

## ✅ Current Setup Status

### 1. Sanity Studio Configuration
**File:** `sanity.config.ts`
- ✅ Project ID: Uses `NEXT_PUBLIC_SANITY_PROJECT_ID` from env
- ✅ Dataset: `production` (default)
- ✅ Base Path: `/studio` (accessible at `http://localhost:3000/studio`)
- ✅ Plugins: Structure Tool + Vision Tool
- ✅ Schema Types: All registered correctly

### 2. Schema Types Registered
**File:** `sanity/schemaTypes/index.ts`
- ✅ `pageContent` - Main homepage document
- ✅ `pageSection` - Individual section configuration
- ✅ `insight` - Blog posts/articles
- ✅ `communityPost` - Community discussions

### 3. Page Content Schema
**File:** `sanity/schemaTypes/pageContent.ts`
- ✅ Document type: `pageContent`
- ✅ Title field: "Home Page" (internal)
- ✅ Sections array: Array of `pageSection` objects
- ✅ Validation: Requires at least 1 section

### 4. Page Section Schema
**File:** `sanity/schemaTypes/pageSection.ts`
- ✅ Section Types Available:
  - `hero` - Top banner section
  - `stats` - Numbers/metrics
  - `solutions` - Feature cards
  - `community` - Community section
  - `insights` - Blog posts section
  - `cta` - Call to action
  - `content` - 2-column with image
- ✅ Each section has:
  - `enabled` toggle
  - `showMore` button configuration (with enabled, text, linkType, internalPage, externalUrl)
  - Section-specific fields

### 5. Default Sections (Seed Data)
**File:** `lib/defaultSections.ts`

The seed script will populate these 8 sections:

1. **Hero Section** (`default-hero`)
   - Badge: "Community Event"
   - Heading: "Artificial Intelligence and Data Festival"
   - Description: About bringing together practitioners...
   - Primary Button: "Join the Community"
   - Secondary Button: "Learn More"

2. **Background Section** (`default-background`)
   - Type: `content`
   - Title: "Background"
   - Body: About AI adoption and data-centric approach
   - Layout: `default` (text only)

3. **Purpose Section** (`default-purpose`)
   - Type: `content`
   - Title: "Purpose of the Community Event"
   - Body: About strengthening shared capability on data for AI
   - Layout: `default` (text only)

4. **Why it Matters Section** (`default-why-matters`)
   - Type: `content`
   - Title: "Why it Matters"
   - Body: About model improvements and data practices
   - Layout: `default` (text only)

5. **Goals Section** (`default-goals`)
   - Type: `content`
   - Title: "Goals"
   - Items: 4 bullet points about goals
   - Layout: `default` (text only)

6. **Expected Outcomes Section** (`default-outcomes`)
   - Type: `content`
   - Title: "Expected Outcomes"
   - Items: 7 bullet points about outcomes
   - Layout: `default` (text only)

7. **Insights Section** (`default-insights`)
   - Type: `insights`
   - Heading: "Latest insights"
   - Description: "Stay ahead with industry trends..."
   - Button Text: "View All"

8. **CTA Section** (`default-cta`)
   - Type: `cta`
   - Heading: "Join the Community"
   - Description: "Connect with practitioners..."
   - Button Text: "Get Started"
   - Disclaimer: "Open to all practitioners..."

### 6. Page Rendering Logic
**File:** `app/page.tsx`

```typescript
// Flow:
1. Fetches pageContent from Sanity
2. If pageContent exists with sections → uses Sanity data
3. If no pageContent or empty sections → falls back to getDefaultSections()
4. Filters out disabled sections (enabled !== false)
5. Renders each section via SectionRenderer
```

### 7. Seed Script
**File:** `scripts/seed-sanity.ts`
- ✅ Command: `pnpm seed:sanity`
- ✅ Checks if pageContent exists
- ✅ Updates existing OR creates new document
- ✅ Uses `getDefaultSections()` to populate sections
- ✅ Requires env vars:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET` (defaults to 'production')
  - `SANITY_API_TOKEN`

### 8. Sanity Query
**File:** `lib/sanity/queries.ts`
- ✅ `pageContentQuery` fetches:
  - All section types
  - All section fields
  - **✅ `showMore` field** (recently fixed)
  - Hero, stats, solutions, community, insights, cta, content configs

## 🔄 Data Flow

```
Sanity Studio (/studio)
    ↓
User edits pageContent document
    ↓
Publishes changes
    ↓
app/page.tsx fetches via pageContentQuery
    ↓
SectionRenderer renders each section
    ↓
Components (Hero, Content, Insights, etc.) display
    ↓
ShowMoreButton appears if enabled in Sanity
```

## 📋 To Run Seed (Default Setup)

1. **Set up environment variables** in `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_with_editor_permissions
```

2. **Run the seed script**:
```bash
pnpm seed:sanity
```

3. **Verify in Studio**:
   - Go to `http://localhost:3000/studio`
   - Click "Homepage Content"
   - Should see 8 sections populated

4. **Verify on Homepage**:
   - Go to `http://localhost:3000`
   - Should see all 8 sections rendered
   - If no Sanity data, it falls back to defaults automatically

## ✅ Verification Checklist

- [x] Sanity config is set up correctly
- [x] All schema types are registered
- [x] Page content schema includes sections array
- [x] Page section schema includes all section types
- [x] Default sections match the AI/Data Festival content
- [x] Seed script uses default sections
- [x] Page rendering falls back to defaults if no Sanity data
- [x] showMore field is included in query (recently fixed)
- [x] ShowMoreButton component renders correctly

## 🎯 Current Default Layout

The default sections create this page structure:

1. **Hero** - Festival banner with CTA buttons
2. **Background** - Text content about AI/data approach
3. **Purpose** - Text content about event purpose
4. **Why it Matters** - Text content explaining importance
5. **Goals** - Bullet list of 4 goals
6. **Expected Outcomes** - Bullet list of 7 outcomes
7. **Insights** - Latest blog posts section
8. **CTA** - Join community call-to-action

All sections support the "Explore More" button that can be enabled in Sanity Studio.

