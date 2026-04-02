/** Items per page on /insights, /community, /sources listing pages */
export const LIST_PAGE_SIZE = 9

export function parsePageParam(raw: string | string[] | undefined): number {
  const s = Array.isArray(raw) ? raw[0] : raw
  const n = parseInt(s ?? "1", 10)
  if (Number.isNaN(n) || n < 1) return 1
  return n
}

export function clampPage(page: number, totalPages: number): number {
  if (totalPages < 1) return 1
  return Math.min(Math.max(1, page), totalPages)
}
