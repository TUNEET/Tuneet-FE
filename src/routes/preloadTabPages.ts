const TAB_PAGES = [
  () => import('@/pages/home/HomePage'),
  () => import('@/pages/explore/ExplorePage'),
  () => import('@/pages/matching/MatchingPage'),
  () => import('@/pages/my/MyPage'),
]

let hasPreloaded = false

export function preloadTabPages() {
  if (hasPreloaded) return
  hasPreloaded = true

  const run = () => TAB_PAGES.forEach((load) => load().catch(() => {}))
  if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 3000 })
  else setTimeout(run, 2000)
}
