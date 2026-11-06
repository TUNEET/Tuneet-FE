import { Navigate, Outlet } from 'react-router'
import { ROUTES } from '@/constants/routes'
import { isLoggedIn } from '@/utils/auth'

export function RequireAuth() {
  return isLoggedIn() ? <Outlet /> : <Navigate to={ROUTES.onboarding} replace />
}
