// 하단 탭 페이지 코드 (router.tsx의 lazy와 같은 파일이라 한 번 받으면 탭을 누를 때 다시 받지 않는다)
const TAB_PAGES = [
  () => import('@/pages/home/HomePage'),
  () => import('@/pages/explore/ExplorePage'),
  () => import('@/pages/matching/MatchingPage'),
  () => import('@/pages/my/MyPage'),
]

let hasPreloaded = false

// 첫 화면을 다 그린 뒤 브라우저가 한가할 때 나머지 탭 코드를 미리 받아 둔다
export function preloadTabPages() {
  if (hasPreloaded) return
  hasPreloaded = true

  const run = () => TAB_PAGES.forEach((load) => load().catch(() => {}))
  if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 3000 })
  else setTimeout(run, 2000)
}
