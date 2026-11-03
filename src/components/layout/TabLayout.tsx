import { Outlet, useLocation } from 'react-router'
import styled from 'styled-components'
import { ROUTES } from '@/constants/routes'
import { BottomNav } from './BottomNav'
import { Header } from './Header'

export function TabLayout() {
  const { pathname } = useLocation()
  const isExplore = pathname.startsWith(ROUTES.explore)

  return (
    <>
      <Header action={isExplore ? 'notification' : 'message'} />
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
