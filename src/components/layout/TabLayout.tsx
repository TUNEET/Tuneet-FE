import { Outlet } from 'react-router'
import styled from 'styled-components'
import { BottomNav } from './BottomNav'

export function TabLayout() {
  return (
    <>
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
