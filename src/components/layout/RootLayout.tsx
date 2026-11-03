import { Outlet } from 'react-router'
import styled from 'styled-components'

export function RootLayout() {
  return (
    <Main>
      <Outlet />
    </Main>
  )
}

const Main = styled.main`
  min-height: 100vh;
`
