import styled from 'styled-components'
import { Blob as BaseBlob } from '@/styles/authPage'
import { Greeting as BaseGreeting } from '@/styles/tabPage'

export { Glow, Glows, Page } from '@/styles/tabPage'

export const Greeting = styled(BaseGreeting)`
  padding-right: 3.3rem;
`

export const Blob = styled(BaseBlob)`
  top: calc(100% + 3.6rem);
`

export const ProfileArea = styled.div`
  position: relative;
  margin-top: -10.9rem;
  pointer-events: none;

  > div {
    padding-bottom: 2rem;
  }
`

export const TopArea = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
`

export const SettingButton = styled.button`
  position: absolute;
  top: 3.4rem;
  right: 3.3rem;
  display: flex;
  width: 2.2rem;
  height: 2.2rem;
`

export const Divider = styled.hr`
  margin: 2rem 3rem 0;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

export const ProfileHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 1.9rem 3rem 0;
`

export const ProfileTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2rem;
  letter-spacing: 0.032rem;
  color: ${({ theme }) => theme.colors.textProfile};
`

export const HeaderAction = styled.button`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  line-height: 1.6rem;
  letter-spacing: 0.024rem;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`

export const Actions = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  pointer-events: auto;
`

export const MenuCard = styled.ul`
  margin-top: 2rem;
  overflow: hidden;
  border-radius: 1rem;
  background-color: #f6eaf1;
  pointer-events: auto;

  li + li {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 1.1rem;
  width: 100%;
  height: 4.4rem;
  padding: 0 1.6rem 0 1.4rem;
  text-align: left;
`

export const MenuIcon = styled.img`
  flex-shrink: 0;
`

export const MenuIconSlot = styled.span`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  width: 1.5rem;
`

export const MenuLabel = styled.span`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2rem;
  letter-spacing: 0.032rem;
  color: ${({ theme }) => theme.colors.textProfile};
`

export const MenuChevron = styled.span`
  display: flex;
  color: ${({ theme }) => theme.colors.textPlaceholder};

  svg {
    width: 0.6rem;
    height: 1rem;
  }
`

const ActionButton = styled.button`
  height: 3rem;
  padding: 0 1rem;
  border-radius: 100px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  line-height: 1.6rem;
  letter-spacing: 0.024rem;
  pointer-events: auto;
`

export const OutlineButton = styled(ActionButton)`
  outline: 1px solid ${({ theme }) => theme.colors.primary};
  outline-offset: -1px;
  color: ${({ theme }) => theme.colors.primary};
`

export const FilledButton = styled(ActionButton)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceWhite};
`
