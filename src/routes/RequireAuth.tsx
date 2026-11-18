import { lazy, Suspense } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { ROUTES } from '@/constants/routes'
import { isLoggedIn } from '@/utils/auth'

const OnboardingPage = lazy(() =>
  import('@/pages/onboarding/OnboardingPage').then((m) => ({ default: m.OnboardingPage })),
)

export function RequireAuth() {
  const { pathname } = useLocation()

  if (isLoggedIn()) return <Outlet />

  if (pathname === ROUTES.home) {
    return (
      <Suspense fallback={null}>
        <OnboardingPage />
      </Suspense>
    )
  }

  return <Navigate to={ROUTES.onboarding} replace />
}
