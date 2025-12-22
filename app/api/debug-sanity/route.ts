import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'
import { pageContentQuery } from '@/lib/sanity/queries'
import { getDefaultSections } from '@/lib/defaultSections'

export async function GET() {
  try {
    // Check connection first
    const allPageContent = await client.fetch(`*[_type == "pageContent"]`)
    const pageContent = await client.fetch(pageContentQuery)
    
    const sections = pageContent?.sections && pageContent.sections.length > 0
      ? pageContent.sections.filter((section: any) => section.enabled !== false)
      : getDefaultSections()

    return NextResponse.json({
      success: true,
      data: {
        connection: 'ok',
        totalDocuments: allPageContent?.length || 0,
        allDocuments: allPageContent?.map((doc: any) => ({
          _id: doc._id,
          title: doc.title,
          isDraft: doc._id?.startsWith('drafts.'),
          sectionsCount: doc.sections?.length || 0,
        })) || [],
        fromSanity: !!pageContent,
        pageContent: pageContent ? {
          _id: pageContent._id,
          isDraft: pageContent._id?.startsWith('drafts.'),
          title: pageContent.title,
          sectionsCount: pageContent.sections?.length || 0,
          sections: pageContent.sections?.map((s: any) => ({
            _key: s._key,
            sectionType: s.sectionType,
            enabled: s.enabled,
            hasHero: !!s.hero,
            hasContent: !!s.content,
            heroHeading: s.hero?.heading,
            contentTitle: s.content?.title,
          })) || [],
        } : null,
        finalSections: {
          count: sections.length,
          source: pageContent?.sections ? 'Sanity' : 'Defaults',
          types: sections.map((s: any) => s.sectionType),
        },
      },
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      connectionError: error.message.includes('project') || error.message.includes('dataset'),
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    }, { status: 500 })
  }
}

