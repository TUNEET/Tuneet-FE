import { NavLink } from 'react-router'
import styled from 'styled-components'
import exploreActiveIcon from '@/assets/icons/explore-active.svg'
import exploreIcon from '@/assets/icons/explore.svg'
import homeActiveIcon from '@/assets/icons/home-active.svg'
import homeIcon from '@/assets/icons/home.svg'
import matchingActiveIcon from '@/assets/icons/matching-active.svg'
import matchingIcon from '@/assets/icons/matching.svg'
import myActiveIcon from '@/assets/icons/my-active.svg'
import myIcon from '@/assets/icons/my.svg'
import { ROUTES } from '@/constants/routes'

const NAV_ITEMS = [
  { to: ROUTES.home, label: '홈', icon: homeIcon, activeIcon: homeActiveIcon },
  { to: ROUTES.explore, label: '탐색', icon: exploreIcon, activeIcon: exploreActiveIcon },
  { to: ROUTES.matching, label: '매칭', icon: matchingIcon, activeIcon: matchingActiveIcon },
  { to: ROUTES.my, label: '마이', icon: myIcon, activeIcon: myActiveIcon },
]

export function BottomNav() {
  return (
    <Nav>
      {NAV_ITEMS.map(({ to, label, icon, activeIcon }) => (
        <Item key={to} to={to} end={to === ROUTES.home}>
          {({ isActive }) => (
            <>
              <img src={isActive ? activeIcon : icon} alt="" width={24} height={24} />
              <span>{label}</span>
            </>
          )}
        </Item>
      ))}
    </Nav>
  )
}

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 50;
  display: flex;
  width: 100%;
  height: var(--bottom-nav-height);
  background-color: ${({ theme }) => theme.colors.background};
`

const Item = styled(NavLink)`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.textPlaceholder};

  &.active {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }
`
