/**
 * Script to initialize the Homepage Content document in Sanity
 * Run with: npx tsx scripts/init-homepage.ts
 */

import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve } from 'path'
import { getDefaultSections } from '../lib/defaultSections'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('❌ NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token, // Only needed if you want to write data
})

async function initHomepage() {
  try {
    console.log('🔍 Checking for existing Homepage Content document...\n')
    
    // Check if document exists
    const existing = await client.fetch(`*[_type == "pageContent"][0]`)
    
    if (existing) {
      console.log('✅ Homepage Content document already exists!')
      console.log(`   Title: ${existing.title}`)
      console.log(`   Sections: ${existing.sections?.length || 0}`)
      console.log(`   ID: ${existing._id}`)
      console.log(`\n💡 If you want to reset it, delete it in Sanity Studio first.`)
      return
    }

    if (!token) {
      console.log('⚠️  SANITY_API_TOKEN not set. Cannot create document automatically.')
      console.log('\n📝 To create the document manually:')
      console.log('   1. Go to http://localhost:3000/studio')
      console.log('   2. Click "Create" → "Homepage Content"')
      console.log('   3. Add sections using the default sections as reference')
      console.log('\n   Or set SANITY_API_TOKEN in .env.local and run this script again.')
      return
    }

    console.log('📝 Creating Homepage Content document with default sections...\n')
    
    const defaultSections = getDefaultSections()
    
    const document = {
      _type: 'pageContent',
      title: 'Home Page',
      sections: defaultSections,
    }

    const result = await client.create(document)
    
    console.log('✅ Successfully created Homepage Content document!')
    console.log(`   ID: ${result._id}`)
    console.log(`   Sections: ${defaultSections.length}`)
    console.log('\n📋 Next steps:')
    console.log('   1. Go to http://localhost:3000/studio')
    console.log('   2. Open "Homepage Content"')
    console.log('   3. Review and customize the sections')
    console.log('   4. Click "Publish" to make it live')
    console.log('\n🎉 Your homepage is now editable in Sanity Studio!')
    
  } catch (error: any) {
    console.error('❌ Error:', error.message)
    if (error.message.includes('token')) {
      console.log('\n💡 Make sure SANITY_API_TOKEN is set in .env.local')
      console.log('   Get your token from: https://sanity.io/manage')
    }
  }
}

initHomepage()

