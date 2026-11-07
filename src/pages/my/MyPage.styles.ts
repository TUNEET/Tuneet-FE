import styled from 'styled-components'
import { Blob as BaseBlob } from '@/pages/signup/SignupPage.styles'

export { Glow, Glows, Greeting, Page } from '@/pages/home/HomePage.styles'

export const Blob = styled(BaseBlob)`
  top: calc(100% + 3.6rem);
`

export const ProfileArea = styled.div`
  position: relative;
  margin-top: -10.9rem;
  pointer-events: none;

  > div {
    padding-bottom: 0;
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

export const BlockedHeader = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 2rem;
  pointer-events: auto;
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
