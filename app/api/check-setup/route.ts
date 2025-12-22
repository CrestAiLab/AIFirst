import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'

export async function GET(request: NextRequest) {
  const checks = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    sanity: {
      projectId: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      projectIdValue: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? '***' + process.env.NEXT_PUBLIC_SANITY_PROJECT_ID.slice(-4) : null,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      revalidateSecret: !!process.env.SANITY_REVALIDATE_SECRET,
    },
    connectivity: {
      canConnectToSanity: false,
      error: null as string | null,
    },
    webhook: {
      endpoint: '/api/revalidate',
      secretConfigured: !!process.env.SANITY_REVALIDATE_SECRET,
    }
  }

  // Test Sanity connection
  try {
    const testQuery = '*[_type == "pageContent"][0]{_id}'
    await client.fetch(testQuery)
    checks.connectivity.canConnectToSanity = true
  } catch (error) {
    checks.connectivity.canConnectToSanity = false
    checks.connectivity.error = error instanceof Error ? error.message : String(error)
  }

  // Determine status
  const allGood = 
    checks.sanity.projectId &&
    checks.sanity.revalidateSecret &&
    checks.connectivity.canConnectToSanity

  return NextResponse.json({
    status: allGood ? '✅ All checks passed' : '⚠️ Some checks failed',
    checks,
    recommendations: [
      !checks.sanity.projectId && 'Add NEXT_PUBLIC_SANITY_PROJECT_ID to Vercel environment variables',
      !checks.sanity.revalidateSecret && 'Add SANITY_REVALIDATE_SECRET to Vercel environment variables',
      !checks.connectivity.canConnectToSanity && 'Check Sanity CORS settings and verify project ID/dataset are correct',
      checks.sanity.revalidateSecret && 'Make sure webhook in Sanity uses the same secret as SANITY_REVALIDATE_SECRET',
    ].filter(Boolean),
  }, {
    status: allGood ? 200 : 200, // Always return 200, but show status in body
  })
}

