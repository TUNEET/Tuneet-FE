import { createBrowserRouter } from 'react-router'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { TabLayout } from '@/components/layout/TabLayout'
import { ROUTES } from '@/constants/routes'
import { ExplorePage } from '@/pages/explore/ExplorePage'
import { HomePage } from '@/pages/home/HomePage'
import { MatchingPage } from '@/pages/matching/MatchingPage'
import { MyPage } from '@/pages/my/MyPage'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { CreateRoomPage } from '@/pages/matching/create-room/CreateRoomPage'
import { JoinRoomPage } from '@/pages/matching/join-room/JoinRoomPage'
import { RecommendedUsersPage } from '@/pages/matching/recommended-users/RecommendedUsersPage'
import { UserProfilePage } from '@/pages/matching/user-profile/UserProfilePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MobileLayout />,
    children: [
      {
        element: <TabLayout />,
        children: [
          { path: ROUTES.home, element: <HomePage /> },
          { path: ROUTES.explore, element: <ExplorePage /> },
          { path: ROUTES.matching, element: <MatchingPage /> },
          { path: ROUTES.recommendedUsers, element: <RecommendedUsersPage /> },
          { path: ROUTES.userProfile, element: <UserProfilePage /> },
          { path: ROUTES.createRoom, element: <CreateRoomPage /> },
          { path: ROUTES.joinRoom, element: <JoinRoomPage /> },
          { path: ROUTES.my, element: <MyPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
