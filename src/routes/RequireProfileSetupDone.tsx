import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { ROUTES } from '@/constants/routes'
import { isProfileSetupPending } from '@/utils/auth'

export function RequireProfileSetupDone({ children }: { children: ReactNode }) {
  return isProfileSetupPending() ? <Navigate to={ROUTES.profileSetup} replace /> : children
}
