import { createBrowserRouter } from 'react-router'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { RouteErrorFallback } from '@/components/layout/RouteErrorFallback'
import { TabLayout } from '@/components/layout/TabLayout'
import { ROUTES } from '@/constants/routes'
import { ExplorePage } from '@/pages/explore/ExplorePage'
import { NotificationsPage } from '@/pages/explore/notifications/NotificationsPage'
import { ExploreWritePage } from '@/pages/explore/write/ExploreWritePage'
import { HomePage } from '@/pages/home/HomePage'
import { LoginPage } from '@/pages/login/LoginPage'
import { MatchingPage } from '@/pages/matching/MatchingPage'
import { MyPage } from '@/pages/my/MyPage'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { OnboardingPage } from '@/pages/onboarding/OnboardingPage'
import { ProfileSetupPage } from '@/pages/profile-setup/ProfileSetupPage'
import { SignupPage } from '@/pages/signup/SignupPage'
import { RequireAuth } from './RequireAuth'
import { CreateRoomPage } from '@/pages/matching/create-room/CreateRoomPage'
import { JoinRoomPage } from '@/pages/matching/join-room/JoinRoomPage'
import { LetterWritePage } from '@/pages/matching/letter-write/LetterWritePage'
import { LetterDetailPage } from '@/pages/matching/letter-detail/LetterDetailPage'
import { LetterboxPage } from '@/pages/matching/letterbox/LetterboxPage'
import { RecommendedUsersPage } from '@/pages/matching/recommended-users/RecommendedUsersPage'
import { RoomFeedsPage } from '@/pages/matching/room/feeds/RoomFeedsPage'
import { RoomMembersPage } from '@/pages/matching/room/members/RoomMembersPage'
import { RoomPlaylistPage } from '@/pages/matching/room/playlist/RoomPlaylistPage'
import { RoomHomePage } from '@/pages/matching/room/RoomHomePage'
import { UserProfilePage } from '@/pages/matching/user-profile/UserProfilePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MobileLayout />,
    // 레이아웃 자체에서 난 오류
    errorElement: <RouteErrorFallback />,
    children: [
      {
        // 페이지에서 난 오류는 모바일 프레임 안에서 보여준다
        errorElement: <RouteErrorFallback />,
        children: [
          {
            element: <RequireAuth />,
            children: [
              { path: ROUTES.profileSetup, element: <ProfileSetupPage /> },
              {
                element: <TabLayout />,
                children: [
                  {
                    // 탭 페이지에서 난 오류는 헤더·하단 탭을 유지한 채 보여준다
                    errorElement: <RouteErrorFallback />,
                    children: [
                      { path: ROUTES.home, element: <HomePage /> },
                      { path: ROUTES.explore, element: <ExplorePage /> },
                      { path: ROUTES.exploreWrite, element: <ExploreWritePage /> },
                      { path: ROUTES.exploreNotifications, element: <NotificationsPage /> },
                      { path: ROUTES.matching, element: <MatchingPage /> },
                      { path: ROUTES.recommendedUsers, element: <RecommendedUsersPage /> },
                      { path: ROUTES.userProfile, element: <UserProfilePage /> },
                      { path: ROUTES.letterWrite, element: <LetterWritePage /> },
                      { path: ROUTES.anonymousLetterWrite, element: <LetterWritePage /> },
                      { path: ROUTES.letterbox, element: <LetterboxPage /> },
                      { path: ROUTES.letter, element: <LetterDetailPage /> },
                      { path: ROUTES.createRoom, element: <CreateRoomPage /> },
                      { path: ROUTES.joinRoom, element: <JoinRoomPage /> },
                      { path: ROUTES.room, element: <RoomHomePage /> },
                      { path: ROUTES.roomMembers, element: <RoomMembersPage /> },
                      { path: ROUTES.roomFeeds, element: <RoomFeedsPage /> },
                      { path: ROUTES.roomPlaylist, element: <RoomPlaylistPage /> },
                      { path: ROUTES.my, element: <MyPage /> },
                    ],
                  },
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
    ],
  },
])
