import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'

// GET endpoint for testing
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET

  if (!expectedSecret) {
    return NextResponse.json(
      { 
        message: 'Revalidation secret not configured',
        configured: false 
      },
      { status: 500 }
    )
  }

  if (secret !== expectedSecret) {
    return NextResponse.json(
      { 
        message: 'Invalid secret',
        configured: true,
        secretProvided: !!secret
      },
      { status: 401 }
    )
  }

  // Manual revalidation for testing
  try {
    revalidatePath('/', 'layout')
    revalidatePath('/')
    revalidatePath('/insights', 'layout')
    revalidatePath('/insights')
    revalidatePath('/community', 'layout')
    revalidatePath('/community')
    revalidatePath('/sources', 'layout')
    revalidatePath('/sources')
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      message: 'All pages revalidated successfully',
      paths: ['/', '/insights', '/community', '/sources']
    })
  } catch (error) {
    return NextResponse.json(
      { 
        message: 'Error revalidating', 
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Sanity
    const secret = request.nextUrl.searchParams.get('secret')
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET

    if (!expectedSecret) {
      console.error('❌ SANITY_REVALIDATE_SECRET is not set')
      return NextResponse.json(
        { message: 'Revalidation secret not configured' },
        { status: 500 }
      )
    }

    if (secret !== expectedSecret) {
      console.error('❌ Invalid secret provided')
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Parse the webhook payload
    let body
    try {
      body = await request.json()
      console.log('📦 Webhook payload received:', JSON.stringify(body, null, 2))
    } catch (e) {
      // If body is empty or invalid, revalidate everything
      console.log('⚠️ No body or invalid JSON, revalidating all pages')
      revalidatePath('/', 'layout')
      revalidatePath('/')
      revalidatePath('/insights', 'layout')
      revalidatePath('/insights')
      revalidatePath('/community', 'layout')
      revalidatePath('/community')
      revalidatePath('/sources', 'layout')
      revalidatePath('/sources')
      return NextResponse.json({ 
        revalidated: true, 
        now: Date.now(),
        message: 'Revalidated all pages (no body)' 
      })
    }

    // Sanity webhooks can send different formats
    // Format 1: Direct mutation object with _type
    // Format 2: Array of mutations
    // Format 3: Object with ids (created/updated/deleted)
    
    let documentTypes: string[] = []
    let slugs: Record<string, string> = {}

    // Handle Sanity webhook format with ids
    if (body.ids) {
      // This is the standard Sanity webhook format
      const allIds = [
        ...(body.ids.created || []),
        ...(body.ids.updated || []),
        ...(body.ids.deleted || [])
      ]
      
      if (allIds.length > 0) {
        console.log('📋 Sanity webhook with IDs:', allIds)
        
        // Fetch document types from Sanity to know what to revalidate
        try {
          const documents = await client.fetch(
            `*[_id in $ids]{_id, _type, slug}`,
            { ids: allIds }
          )
          
          const typesFound = new Set<string>()
          const slugsFound: Record<string, string> = {}
          
          documents.forEach((doc: any) => {
            typesFound.add(doc._type)
            if (doc.slug?.current) {
              slugsFound[doc._type] = doc.slug.current
            }
          })
          
          console.log('📄 Document types found:', Array.from(typesFound))
          
          // Revalidate based on document types
          const revalidatedPaths: string[] = []
          
          typesFound.forEach((_type) => {
            if (_type === 'pageContent') {
              revalidatePath('/', 'layout')
              revalidatePath('/')
              revalidateTag('homepage')
              revalidatedPaths.push('/')
              console.log('✅ Revalidated homepage (pageContent)')
            } else if (_type === 'insight') {
              // Revalidate insights pages first
              revalidatePath('/insights', 'layout')
              revalidatePath('/insights')
              revalidateTag('insights')
              revalidatedPaths.push('/insights')
              
              // Revalidate individual insight page if slug is available
              if (slugsFound[_type]) {
                revalidatePath(`/insights/${slugsFound[_type]}`)
                revalidatedPaths.push(`/insights/${slugsFound[_type]}`)
              }
              
              // CRITICAL: Always revalidate homepage since it displays insights
              // Use multiple methods to ensure it works
              revalidatePath('/', 'layout')
              revalidatePath('/')
              revalidatePath('/', 'page') // Also revalidate as page type
              revalidateTag('homepage')
              revalidateTag('insights') // Homepage uses insights, so invalidate that tag too
              if (!revalidatedPaths.includes('/')) {
                revalidatedPaths.push('/')
              }
              console.log('✅ Revalidated insights pages and homepage (multiple methods)')
            } else if (_type === 'communityPost') {
              revalidatePath('/community', 'layout')
              revalidatePath('/community')
              revalidatedPaths.push('/community')
              
              // Always revalidate homepage since it shows community posts
              revalidatePath('/', 'layout')
              revalidatePath('/')
              if (!revalidatedPaths.includes('/')) {
                revalidatedPaths.push('/')
              }
              console.log('✅ Revalidated community pages and homepage')
            } else if (_type === 'source') {
              revalidatePath('/sources', 'layout')
              revalidatePath('/sources')
              revalidateTag('sources')
              revalidatedPaths.push('/sources')
              revalidatePath('/', 'layout')
              revalidatePath('/')
              revalidateTag('homepage')
              if (!revalidatedPaths.includes('/')) {
                revalidatedPaths.push('/')
              }
              console.log('✅ Revalidated sources pages and homepage')
            }
          })
          
          // If we couldn't determine types, revalidate everything as fallback
          if (typesFound.size === 0) {
            console.log('⚠️ Could not fetch document types, revalidating all pages')
            revalidatePath('/', 'layout')
            revalidatePath('/')
            revalidatePath('/insights', 'layout')
            revalidatePath('/insights')
            revalidatePath('/community', 'layout')
            revalidatePath('/community')
            revalidatePath('/sources', 'layout')
            revalidatePath('/sources')
            revalidatedPaths.push('/', '/insights', '/community', '/sources')
          }
          
          return NextResponse.json({ 
            revalidated: true, 
            now: Date.now(),
            ids: allIds,
            types: Array.from(typesFound),
            paths: revalidatedPaths
          })
        } catch (fetchError) {
          // If fetching fails, revalidate everything as fallback
          console.error('❌ Error fetching document types:', fetchError)
          console.log('⚠️ Falling back to revalidating all pages')
          revalidatePath('/', 'layout')
          revalidatePath('/')
          revalidatePath('/insights', 'layout')
          revalidatePath('/insights')
          revalidatePath('/community', 'layout')
          revalidatePath('/community')
          revalidatePath('/sources', 'layout')
          revalidatePath('/sources')
          return NextResponse.json({ 
            revalidated: true, 
            now: Date.now(),
            ids: allIds,
            error: 'Could not fetch document types, revalidated all pages'
          })
        }
      }
    }

    // Handle direct mutation object
    if (body._type) {
      documentTypes.push(body._type)
      if (body.slug?.current) {
        slugs[body._type] = body.slug.current
      }
    }

    // Handle array of mutations
    if (Array.isArray(body)) {
      body.forEach((mutation: any) => {
        if (mutation._type) {
          documentTypes.push(mutation._type)
          if (mutation.slug?.current) {
            slugs[mutation._type] = mutation.slug.current
          }
        }
      })
    }

    // Handle mutations array in body
    if (body.mutations && Array.isArray(body.mutations)) {
      body.mutations.forEach((mutation: any) => {
        if (mutation.create || mutation.update) {
          const doc = mutation.create || mutation.update
          if (doc._type) {
            documentTypes.push(doc._type)
            if (doc.slug?.current) {
              slugs[doc._type] = doc.slug.current
            }
          }
        }
      })
    }

    // If we couldn't determine types, revalidate everything
    if (documentTypes.length === 0) {
      console.log('⚠️ Could not determine document type, revalidating all pages')
      revalidatePath('/', 'layout')
      revalidatePath('/')
      revalidatePath('/insights', 'layout')
      revalidatePath('/insights')
      revalidatePath('/community', 'layout')
      revalidatePath('/community')
      revalidatePath('/sources', 'layout')
      revalidatePath('/sources')
      return NextResponse.json({ 
        revalidated: true, 
        now: Date.now(),
        message: 'Revalidated all pages (unknown type)' 
      })
    }

    // Revalidate based on document types found
    const revalidatedPaths: string[] = []
    
    documentTypes.forEach((_type) => {
      if (_type === 'pageContent') {
        revalidatePath('/', 'layout')
        revalidatePath('/')
        revalidateTag('homepage')
        revalidatedPaths.push('/')
        console.log('✅ Revalidated homepage')
      } else if (_type === 'insight') {
        // Revalidate insights pages first
        revalidatePath('/insights', 'layout')
        revalidatePath('/insights')
        revalidateTag('insights')
        revalidatedPaths.push('/insights')
        
        // Revalidate individual insight page if slug is available
        if (slugs[_type]) {
          revalidatePath(`/insights/${slugs[_type]}`)
          revalidatedPaths.push(`/insights/${slugs[_type]}`)
        }
        
        // CRITICAL: Always revalidate homepage since it displays insights
        // Use multiple methods to ensure it works
        revalidatePath('/', 'layout')
        revalidatePath('/')
        revalidatePath('/', 'page') // Also revalidate as page type
        revalidateTag('homepage')
        revalidateTag('insights') // Homepage uses insights, so invalidate that tag too
        if (!revalidatedPaths.includes('/')) {
          revalidatedPaths.push('/')
        }
        console.log('✅ Revalidated insights pages and homepage (multiple methods)')
      } else if (_type === 'communityPost') {
        revalidatePath('/community', 'layout')
        revalidatePath('/community')
        revalidatedPaths.push('/community')
        
        // Also revalidate homepage if it shows community posts
        revalidatePath('/')
        console.log('✅ Revalidated community pages')
      } else if (_type === 'source') {
        revalidatePath('/sources', 'layout')
        revalidatePath('/sources')
        revalidateTag('sources')
        revalidatedPaths.push('/sources')
        revalidatePath('/', 'layout')
        revalidatePath('/')
        revalidateTag('homepage')
        if (!revalidatedPaths.includes('/')) {
          revalidatedPaths.push('/')
        }
        console.log('✅ Revalidated sources pages and homepage')
      }
    })

    // Always revalidate homepage since it might show insights/community posts
    if (!revalidatedPaths.includes('/')) {
      revalidatePath('/', 'layout')
      revalidatePath('/')
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      types: documentTypes,
      paths: revalidatedPaths,
      message: `Revalidated ${revalidatedPaths.length} path(s)`
    })
  } catch (error) {
    console.error('❌ Error revalidating:', error)
    return NextResponse.json(
      { 
        message: 'Error revalidating', 
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

