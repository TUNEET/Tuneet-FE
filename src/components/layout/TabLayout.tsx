import { Outlet, useLocation, useNavigate } from 'react-router'
import styled from 'styled-components'
import { ROUTES } from '@/constants/routes'
import { BottomNav } from './BottomNav'
import { Header } from './Header'

export function TabLayout() {
  const { pathname, key } = useLocation()
  const navigate = useNavigate()
  const isExplore = pathname.startsWith(ROUTES.explore)

  // 열려 있는 페이지의 아이콘을 다시 누르면 이전 화면으로 닫기
  const toggle = (target: string, fallback: string) => {
    if (pathname !== target) {
      navigate(target)
      return
    }

    if (key !== 'default') {
      navigate(-1)
      return
    }

    navigate(fallback, { replace: true })
  }

  return (
    <>
      {isExplore ? (
        <Header
          action="notification"
          onActionClick={() => toggle(ROUTES.exploreNotifications, ROUTES.explore)}
        />
      ) : (
        <Header action="message" onActionClick={() => toggle(ROUTES.letterbox, ROUTES.matching)} />
      )}
      <Content>
        <Outlet />
      </Content>
      <BottomNav />
    </>
  )
}

const Content = styled.div`
  padding-bottom: var(--bottom-nav-height);
`
