/**
 * Script to check what data is actually in Sanity
 * Run with: npx tsx scripts/check-sanity-data.ts
 */

import { client } from '../lib/sanity/client'
import { pageContentQuery } from '../lib/sanity/queries'

async function checkSanityData() {
  try {
    console.log('🔍 Checking Sanity data...\n')
    
    const pageContent = await client.fetch(pageContentQuery)
    
    if (!pageContent) {
      console.log('❌ No pageContent document found in Sanity')
      console.log('💡 You need to create a "Homepage Content" document in Sanity Studio')
      console.log('   Go to: http://localhost:3000/studio')
      return
    }
    
    console.log('✅ Found pageContent document:')
    console.log(`   Title: ${pageContent.title}`)
    console.log(`   Sections: ${pageContent.sections?.length || 0}\n`)
    
    if (!pageContent.sections || pageContent.sections.length === 0) {
      console.log('⚠️  No sections found in pageContent')
      console.log('💡 Add sections in Sanity Studio or the site will use default sections\n')
      return
    }
    
    console.log('📋 Sections found:\n')
    pageContent.sections.forEach((section: any, index: number) => {
      console.log(`${index + 1}. ${section.sectionType} (${section.enabled !== false ? 'Enabled' : 'Disabled'})`)
      
      if (section.sectionType === 'content') {
        console.log(`   Title: ${section.content?.title || 'N/A'}`)
        console.log(`   Layout: ${section.content?.layout || 'default'}`)
        console.log(`   Has Image: ${section.content?.image ? 'Yes' : 'No'}`)
        if (section.content?.image) {
          console.log(`   Image Asset ID: ${section.content.image.asset?._id || 'N/A'}`)
        }
        console.log(`   Body Text: ${section.content?.body ? 'Yes' : 'No'}`)
        console.log(`   List Items: ${section.content?.items?.length || 0}`)
      }
      console.log('')
    })
    
    // Check for content sections with images
    const contentSections = pageContent.sections.filter((s: any) => s.sectionType === 'content')
    const sectionsWithImages = contentSections.filter((s: any) => s.content?.image)
    
    console.log(`\n📊 Summary:`)
    console.log(`   Total sections: ${pageContent.sections.length}`)
    console.log(`   Content sections: ${contentSections.length}`)
    console.log(`   Content sections with images: ${sectionsWithImages.length}`)
    
  } catch (error) {
    console.error('❌ Error checking Sanity data:', error)
    console.log('\n💡 Make sure:')
    console.log('   1. NEXT_PUBLIC_SANITY_PROJECT_ID is set in .env.local')
    console.log('   2. NEXT_PUBLIC_SANITY_DATASET is set in .env.local')
    console.log('   3. Your Sanity project exists and is accessible')
  }
}

checkSanityData()

