import { createBrowserRouter, redirect } from 'react-router'
import { PAGE_DATA, warmMyProfile } from '@/apis/pageData'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { RouteErrorFallback } from '@/components/layout/RouteErrorFallback'
import { TabLayout } from '@/components/layout/TabLayout'
import { ROUTES } from '@/constants/routes'
import { isLoggedIn, isProfileSetupPending } from '@/utils/auth'
import { getInviteJoinPath, isValidInviteCode, savePendingInviteCode } from '@/utils/invite'
import { prefetch } from '@/utils/prefetch'
import { RequireAuth } from './RequireAuth'
import { RequireProfileSetupDone } from './RequireProfileSetupDone'

const prefetchWhenLoggedIn = (run: () => void) => () => {
  if (isLoggedIn()) run()
  return null
}

const pageFallback = <></>

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MobileLayout />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        errorElement: <RouteErrorFallback />,
        hydrateFallbackElement: pageFallback,
        children: [
          {
            element: <RequireAuth />,
            children: [
              {
                path: ROUTES.youtubeMusicCallback,
                lazy: () =>
                  import('@/pages/oauth/YoutubeMusicCallbackPage').then((m) => ({
                    Component: m.YoutubeMusicCallbackPage,
                  })),
              },
              {
                path: ROUTES.profileSetup,
                lazy: () =>
                  import('@/pages/profile-setup/ProfileSetupPage').then((m) => ({
                    Component: m.ProfileSetupPage,
                  })),
              },
              {
                element: (
                  <RequireProfileSetupDone>
                    <TabLayout />
                  </RequireProfileSetupDone>
                ),
                children: [
                  {
                    errorElement: <RouteErrorFallback />,
                    hydrateFallbackElement: pageFallback,
                    children: [
                      {
                        path: ROUTES.home,
                        loader: prefetchWhenLoggedIn(() => {
                          warmMyProfile()
                          prefetch(PAGE_DATA.homeFeeds)
                        }),
                        lazy: () =>
                          import('@/pages/home/HomePage').then((m) => ({ Component: m.HomePage })),
                      },
                      {
                        path: ROUTES.explore,
                        loader: prefetchWhenLoggedIn(() => prefetch(PAGE_DATA.exploreFeeds)),
                        lazy: () =>
                          import('@/pages/explore/ExplorePage').then((m) => ({
                            Component: m.ExplorePage,
                          })),
                        children: [{ path: ROUTES.feed, element: null }],
                      },
                      {
                        path: ROUTES.exploreWrite,
                        lazy: () =>
                          import('@/pages/explore/write/ExploreWritePage').then((m) => ({
                            Component: m.ExploreWritePage,
                          })),
                      },
                      {
                        path: ROUTES.exploreEdit,
                        lazy: () =>
                          import('@/pages/explore/write/ExploreWritePage').then((m) => ({
                            Component: m.ExploreWritePage,
                          })),
                      },
                      {
                        path: ROUTES.exploreNotifications,
                        lazy: () =>
                          import('@/pages/explore/notifications/NotificationsPage').then((m) => ({
                            Component: m.NotificationsPage,
                          })),
                      },
                      {
                        path: ROUTES.matching,
                        loader: prefetchWhenLoggedIn(() => {
                          prefetch(PAGE_DATA.myRooms)
                          prefetch(PAGE_DATA.letterQuota)
                        }),
                        lazy: () =>
                          import('@/pages/matching/MatchingPage').then((m) => ({
                            Component: m.MatchingPage,
                          })),
                      },
                      {
                        path: ROUTES.recommendedUsers,
                        lazy: () =>
                          import('@/pages/matching/recommended-users/RecommendedUsersPage').then(
                            (m) => ({ Component: m.RecommendedUsersPage }),
                          ),
                      },
                      {
                        path: ROUTES.userProfile,
                        lazy: () =>
                          import('@/pages/matching/user-profile/UserProfilePage').then((m) => ({
                            Component: m.UserProfilePage,
                          })),
                      },
                      {
                        path: ROUTES.letterWrite,
                        lazy: () =>
                          import('@/pages/matching/letter-write/LetterWritePage').then((m) => ({
                            Component: m.LetterWritePage,
                          })),
                      },
                      {
                        path: ROUTES.anonymousLetterWrite,
                        lazy: () =>
                          import('@/pages/matching/letter-write/LetterWritePage').then((m) => ({
                            Component: m.LetterWritePage,
                          })),
                      },
                      {
                        path: ROUTES.letterbox,
                        lazy: () =>
                          import('@/pages/matching/letterbox/LetterboxPage').then((m) => ({
                            Component: m.LetterboxPage,
                          })),
                      },
                      {
                        path: ROUTES.welcomeLetter,
                        lazy: () =>
                          import('@/pages/matching/welcome-letter/WelcomeLetterPage').then((m) => ({
                            Component: m.WelcomeLetterPage,
                          })),
                      },
                      {
                        path: ROUTES.letter,
                        lazy: () =>
                          import('@/pages/matching/letter-detail/LetterDetailPage').then((m) => ({
                            Component: m.LetterDetailPage,
                          })),
                      },
                      {
                        path: ROUTES.sentLetter,
                        lazy: () =>
                          import('@/pages/matching/letter-detail/SentLetterDetailPage').then(
                            (m) => ({ Component: m.SentLetterDetailPage }),
                          ),
                      },
                      {
                        path: ROUTES.letterReply,
                        lazy: () =>
                          import('@/pages/matching/letter-write/LetterWritePage').then((m) => ({
                            Component: m.LetterWritePage,
                          })),
                      },
                      {
                        path: ROUTES.createRoom,
                        lazy: () =>
                          import('@/pages/matching/create-room/CreateRoomPage').then((m) => ({
                            Component: m.CreateRoomPage,
                          })),
                      },
                      {
                        path: ROUTES.joinRoom,
                        lazy: () =>
                          import('@/pages/matching/join-room/JoinRoomPage').then((m) => ({
                            Component: m.JoinRoomPage,
                          })),
                      },
                      {
                        path: ROUTES.room,
                        lazy: () =>
                          import('@/pages/matching/room/RoomHomePage').then((m) => ({
                            Component: m.RoomHomePage,
                          })),
                      },
                      {
                        path: ROUTES.roomMembers,
                        lazy: () =>
                          import('@/pages/matching/room/members/RoomMembersPage').then((m) => ({
                            Component: m.RoomMembersPage,
                          })),
                      },
                      {
                        path: ROUTES.roomFeeds,
                        lazy: () =>
                          import('@/pages/matching/room/feeds/RoomFeedsPage').then((m) => ({
                            Component: m.RoomFeedsPage,
                          })),
                      },
                      {
                        path: ROUTES.roomFeedWrite,
                        lazy: () =>
                          import('@/pages/matching/room/feed-write/RoomFeedWritePage').then(
                            (m) => ({ Component: m.RoomFeedWritePage }),
                          ),
                      },
                      {
                        path: ROUTES.roomPlaylist,
                        lazy: () =>
                          import('@/pages/matching/room/playlist/RoomPlaylistPage').then((m) => ({
                            Component: m.RoomPlaylistPage,
                          })),
                      },
                      {
                        path: ROUTES.my,
                        lazy: () =>
                          import('@/pages/my/MyPage').then((m) => ({ Component: m.MyPage })),
                      },
                      {
                        path: '*',
                        lazy: () =>
                          import('@/pages/not-found/NotFoundPage').then((m) => ({
                            Component: m.NotFoundPage,
                          })),
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: ROUTES.invite,
            loader: ({ params }) => {
              const { inviteCode } = params
              if (!isValidInviteCode(inviteCode)) return redirect(ROUTES.joinRoom)
              if (!isLoggedIn() || isProfileSetupPending()) savePendingInviteCode(inviteCode)
              return redirect(getInviteJoinPath(inviteCode))
            },
          },
          {
            path: ROUTES.onboarding,
            lazy: () =>
              import('@/pages/onboarding/OnboardingPage').then((m) => ({
                Component: m.OnboardingPage,
              })),
          },
          {
            path: ROUTES.signup,
            lazy: () =>
              import('@/pages/signup/SignupPage').then((m) => ({ Component: m.SignupPage })),
          },
          {
            path: ROUTES.login,
            lazy: () => import('@/pages/login/LoginPage').then((m) => ({ Component: m.LoginPage })),
          },
        ],
      },
    ],
  },
])
