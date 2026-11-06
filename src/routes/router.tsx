import { createBrowserRouter } from 'react-router'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { TabLayout } from '@/components/layout/TabLayout'
import { ROUTES } from '@/constants/routes'
import { ExplorePage } from '@/pages/explore/ExplorePage'
import { HomePage } from '@/pages/home/HomePage'
import { LoginPage } from '@/pages/login/LoginPage'
import { MatchingPage } from '@/pages/matching/MatchingPage'
import { MyPage } from '@/pages/my/MyPage'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { OnboardingPage } from '@/pages/onboarding/OnboardingPage'
import { ProfileSetupPage } from '@/pages/profile-setup/ProfileSetupPage'
import { SignupPage } from '@/pages/signup/SignupPage'
import { RequireAuth } from './RequireAuth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MobileLayout />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: ROUTES.profileSetup, element: <ProfileSetupPage /> },
          {
            element: <TabLayout />,
            children: [
              { path: ROUTES.home, element: <HomePage /> },
              { path: ROUTES.explore, element: <ExplorePage /> },
              { path: ROUTES.matching, element: <MatchingPage /> },
              { path: ROUTES.my, element: <MyPage /> },
            ],
          },
        ],
      },
      { path: ROUTES.onboarding, element: <OnboardingPage /> },
      { path: ROUTES.signup, element: <SignupPage /> },
      { path: ROUTES.login, element: <LoginPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
