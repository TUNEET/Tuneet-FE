import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { ROUTES } from '@/constants/routes'
import { isProfileSetupPending } from '@/utils/auth'

/** 가입 후 프로필·취향 설정을 끝내기 전에는 탭 화면에 들어오지 못하게 설정으로 돌려보낸다 */
export function RequireProfileSetupDone({ children }: { children: ReactNode }) {
  return isProfileSetupPending() ? <Navigate to={ROUTES.profileSetup} replace /> : children
}
