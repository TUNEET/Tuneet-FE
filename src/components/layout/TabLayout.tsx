import { Outlet, useLocation, useNavigate } from 'react-router'
import styled from 'styled-components'
import { ROUTES } from '@/constants/routes'
import { BottomNav } from './BottomNav'
import { Header } from './Header'

export function TabLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isExplore = pathname.startsWith(ROUTES.explore)

  return (
    <>
      {isExplore ? (
        <Header action="notification" />
      ) : (
        <Header action="message" onActionClick={() => navigate(ROUTES.letterbox)} />
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
