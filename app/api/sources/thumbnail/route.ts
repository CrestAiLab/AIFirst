import { NextRequest, NextResponse } from "next/server"
import { isSafeHttpUrlForFetch } from "@/lib/url-safety"

export const runtime = "nodejs"

/**
 * Same-origin thumbnail for source cards: fetches the remote og:image on the server
 * so the browser doesn’t hit hotlink / referrer blocks that break images on Vercel.
 */
export async function GET(request: NextRequest) {
  const img = request.nextUrl.searchParams.get("img")
  if (!img) {
    return NextResponse.json({ error: "Missing img" }, { status: 400 })
  }

  let target: URL
  try {
    target = new URL(img)
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 })
  }

  if (!isSafeHttpUrlForFetch(target.href)) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 400 })
  }

  try {
    const res = await fetch(target.href, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        Referer: target.origin + "/",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(20_000),
    })

    if (!res.ok) {
      return NextResponse.redirect(new URL("/placeholder.svg", request.url))
    }

    const ct = res.headers.get("content-type") ?? ""
    if (!ct.startsWith("image/") && !ct.includes("octet-stream")) {
      return NextResponse.redirect(new URL("/placeholder.svg", request.url))
    }

    const buf = await res.arrayBuffer()
    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": ct.startsWith("image/") ? ct : "image/jpeg",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    })
  } catch {
    return NextResponse.redirect(new URL("/placeholder.svg", request.url))
  }
}
