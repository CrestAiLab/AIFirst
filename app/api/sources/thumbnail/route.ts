import { NextRequest, NextResponse } from "next/server"
import { isSafeHttpUrlForFetch } from "@/lib/url-safety"

export const runtime = "nodejs"

/** Inline fallback so thumbnails never depend on /placeholder.svg being deployed. */
const PLACEHOLDER_SVG = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"><defs><linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#fafafa"/><stop offset="100%" style="stop-color:#e4e4e7"/></linearGradient></defs><rect width="800" height="400" fill="url(#g)"/><rect width="800" height="400" fill="#09090b" fill-opacity="0.04"/></svg>`,
  "utf8"
)

function placeholderResponse() {
  return new NextResponse(PLACEHOLDER_SVG, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}

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

  const host = target.hostname.toLowerCase()
  /** ytimg often rejects requests whose Referer is the wrong origin (e.g. site URL or img.youtube.com itself). */
  const isYouTubeImageCdn = host === "img.youtube.com" || host === "i.ytimg.com"
  const fetchHeaders: Record<string, string> = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    ...(isYouTubeImageCdn
      ? { Referer: "https://www.youtube.com/" }
      : { Referer: `${target.origin}/` }),
  }

  try {
    const res = await fetch(target.href, {
      headers: fetchHeaders,
      redirect: "follow",
      signal: AbortSignal.timeout(20_000),
    })

    if (!res.ok) {
      return placeholderResponse()
    }

    const ct = res.headers.get("content-type") ?? ""
    if (!ct.startsWith("image/") && !ct.includes("octet-stream")) {
      return placeholderResponse()
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
    return placeholderResponse()
  }
}
