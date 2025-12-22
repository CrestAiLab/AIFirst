import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Sanity
    const secret = request.nextUrl.searchParams.get('secret')
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET

    if (!expectedSecret) {
      console.error('SANITY_REVALIDATE_SECRET is not set')
      return NextResponse.json(
        { message: 'Revalidation secret not configured' },
        { status: 500 }
      )
    }

    if (secret !== expectedSecret) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Parse the webhook payload
    const body = await request.json()
    const { _type } = body

    // Revalidate based on document type
    if (_type === 'pageContent') {
      revalidatePath('/', 'layout')
      revalidatePath('/')
      console.log('✅ Revalidated homepage')
    } else if (_type === 'insight') {
      revalidatePath('/insights', 'layout')
      revalidatePath('/insights')
      // Revalidate individual insight pages
      if (body.slug?.current) {
        revalidatePath(`/insights/${body.slug.current}`)
      }
      // Also revalidate homepage if it shows insights
      revalidatePath('/')
      console.log('✅ Revalidated insights pages')
    } else if (_type === 'communityPost') {
      revalidatePath('/community', 'layout')
      revalidatePath('/community')
      // Also revalidate homepage if it shows community posts
      revalidatePath('/')
      console.log('✅ Revalidated community pages')
    } else {
      // Revalidate all pages for unknown types
      revalidatePath('/', 'layout')
      revalidatePath('/insights', 'layout')
      revalidatePath('/community', 'layout')
      console.log('✅ Revalidated all pages')
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      type: _type 
    })
  } catch (error) {
    console.error('Error revalidating:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}

