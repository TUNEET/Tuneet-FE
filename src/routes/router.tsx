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
          { path: ROUTES.home, element: <HomePage /> },
          { path: ROUTES.explore, element: <ExplorePage /> },
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
      { path: ROUTES.onboarding, element: <OnboardingPage /> },
      { path: ROUTES.signup, element: <SignupPage /> },
      { path: ROUTES.login, element: <LoginPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
