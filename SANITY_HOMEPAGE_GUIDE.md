# Homepage Editing Guide - Sanity Studio

This guide explains how to edit your homepage sections in Sanity Studio.

## Accessing Sanity Studio

1. Start your development server: `pnpm dev`
2. Navigate to: `http://localhost:3000/studio`
3. Log in with your Sanity account

## Editing the Homepage

1. In Sanity Studio, find **"Homepage Content"** in the sidebar
2. Click to open the homepage editor
3. You'll see all your homepage sections listed

## Section Types

### 1. Hero (Top Banner)
- The main banner at the top of your homepage
- Configure badge text, heading, description, and buttons
- **Button Links**: Set "Primary Button Link" and "Secondary Button Link" fields
  - Use internal routes: `/insights`, `/community`
  - Use page sections: `#why-it-matters`, `#community`
  - Use external URLs: `https://example.com`
  - Toggle visibility with "Show Primary Button" and "Show Secondary Button"

### 2. Stats (Numbers/Metrics)
- Display key statistics or metrics
- Add multiple stat items with value, label, and description

### 3. Solutions (Feature Cards)
- Showcase your solutions or features
- Each solution has an icon, title, and description

### 4. Community
- Community section with features and discussion posts
- Configure heading, description, features, and button text
- **Button Link**: Set "Button Link" field (e.g., `/community`, `/insights`, `#section-id`)

### 5. Insights (Blog Posts)
- Display latest blog posts/insights
- Configure heading, description, and button text
- **Button Link**: Set "Button Link" field (e.g., `/insights`, `/community`, `#section-id`)
- Posts are pulled from your Insights content type

### 6. Call to Action (CTA)
- Conversion-focused section
- Configure heading, description, button text, and disclaimer
- **Button Link**: Set "Button Link" field (e.g., `/community`, `/insights`, `#section-id`)

### 7. Content (2-Column with Image) ⭐
- **This is the main flexible content section**

## Using the Content Section (2-Column Layout)

The Content section allows you to create flexible 2-column layouts with optional images.

### Layout Structure:
1. **Heading** - Displayed at the top center (required)
2. **Two Columns** - Content and optional image side-by-side

### Step-by-Step:

1. **Add a Content Section**
   - Click "Add item" in the sections array
   - Set Section Type to: **"Content (2-Column with Image)"**

2. **Configure the Heading**
   - Enter a **Heading** (required)
   - This appears centered at the top

3. **Add Body Text**
   - Enter **Body Text** in the text area
   - This appears in the content column

4. **Add List Items (Optional)**
   - Click "Add item" to add list items
   - Each item appears as a styled card with a bullet point
   - Great for goals, outcomes, features, etc.

5. **Choose Image Position**
   - **No Image (Text Only)**: Single column text layout
   - **Image on Left, Content on Right**: Image left, content right
   - **Image on Right, Content on Left**: Content left, image right

6. **Upload/Select Image** (if image position is selected)
   - Click the **Image** field
   - **Upload**: Click "Upload" to upload a new image
   - **Select**: Click "Select" to choose from existing images
   - Add **Image Alt Text** for accessibility

7. **Enable/Disable Section**
   - Toggle the **Enabled** checkbox to show/hide the section

### Reordering Sections

- Drag sections up or down to reorder them
- The order in Sanity Studio matches the order on your homepage

### Tips

- **Image Recommendations**: 
  - Use high-quality images (1200x800px or larger)
  - Images are automatically optimized
  - Supported formats: JPG, PNG, WebP

- **Content Best Practices**:
  - Keep headings concise and impactful
  - Use list items for key points or features
  - Add images to break up text-heavy sections

- **Layout Tips**:
  - Use "Image Left" for content that flows left-to-right
  - Use "Image Right" to draw attention to the content first
  - Use "No Image" for text-heavy sections or when images aren't needed

## Publishing Changes

1. After making changes, click **"Publish"** in the top right
2. Changes appear on your homepage immediately
3. You can also use **"Publish"** → **"Schedule"** to publish at a specific time

## Example: Creating a "Goals" Section

1. Add a new Content section
2. Set Heading: "Our Goals"
3. Add Body Text describing your goals
4. Add List Items:
   - "Goal 1: Create shared playbook"
   - "Goal 2: Identify challenges"
   - "Goal 3: Exchange methods"
5. Choose "Image on Right"
6. Upload/select an image (e.g., goal.jpg)
7. Add Alt Text: "Team working on goals"
8. Enable the section
9. Publish

The section will display with:
- "Our Goals" heading at the top (centered)
- Content on the left with body text and goal cards
- Image on the right with modern shadows and hover effects

## Troubleshooting

**Images not showing?**
- Make sure Image Position is set to "Image on Left" or "Image on Right"
- Verify the image is uploaded and published
- Check that Image Alt Text is filled in

**Section not appearing?**
- Check that the section is **Enabled**
- Make sure you've **Published** your changes
- Verify the Section Type is set correctly

**Layout not working?**
- Ensure you've selected an Image Position option
- If using an image, make sure an image is uploaded/selected
- Check that the Heading field is filled (required)

## Need Help?

- Check the Sanity documentation: https://www.sanity.io/docs
- Review the component code in `components/content.tsx`
- Check the schema in `sanity/schemaTypes/pageSection.ts`

