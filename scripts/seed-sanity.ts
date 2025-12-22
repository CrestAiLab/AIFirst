import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve } from 'path'
import { getDefaultSections } from '../lib/defaultSections'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not set')
  console.error('Please add it to your .env.local file:')
  console.error('NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function seedSanity() {
  try {
    console.log('🌱 Seeding Sanity with default page content...')

    // Get the default sections that match what's displayed on the homepage
    const defaultSections = getDefaultSections()

    // Check if pageContent already exists
    const existing = await client.fetch(`*[_type == "pageContent"][0]`)

    if (existing) {
      console.log('📄 Page Content already exists. Updating with default sections...')
      console.log(`   Found ${defaultSections.length} sections to sync`)
      
      // Update existing document
      await client
        .patch(existing._id)
        .set({
          title: 'Home Page',
          sections: defaultSections,
        })
        .commit()

      console.log('✅ Successfully updated Page Content with default sections!')
    } else {
      console.log('📝 Creating new Page Content document...')
      console.log(`   Adding ${defaultSections.length} sections`)
      
      // Create new document
      await client.create({
        _type: 'pageContent',
        title: 'Home Page',
        sections: defaultSections,
      })

      console.log('✅ Successfully created Page Content with default sections!')
    }

    console.log('\n🎉 Done! Your home page is now editable in Sanity Studio.')
    console.log('👉 Visit http://localhost:3000/studio to edit your content')
    console.log('   The sections in Sanity Studio now match what appears on your homepage!')
  } catch (error) {
    console.error('❌ Error seeding Sanity:', error)
    process.exit(1)
  }
}

seedSanity()

