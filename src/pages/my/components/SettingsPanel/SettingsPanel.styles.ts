import styled from 'styled-components'
import { Sheet } from '@/styles/tabPage'
import { FilledButton, HeaderAction, ProfileTitle } from '../../MyPage.styles'

export { Checkbox, Term, TermDetail, TermLabel } from '@/styles/term'

export const SettingsSheet = styled(Sheet)`
  gap: 0;
`

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

export const Title = ProfileTitle

export const ExitButton = HeaderAction

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 4rem;
`

export const Option = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

export const OptionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const OptionDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  line-height: 1.6rem;
  letter-spacing: 0.024rem;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`

export const Toggle = styled.button<{ $isOn: boolean }>`
  display: flex;
  flex-direction: ${({ $isOn }) => ($isOn ? 'row' : 'row-reverse')};
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  width: 4.4rem;
  height: 2rem;
  padding: ${({ $isOn }) => ($isOn ? '0 0.3rem 0 0.6rem' : '0 0.5rem 0 0.3rem')};
  border-radius: 1000px;
  background-color: ${({ theme, $isOn }) => ($isOn ? theme.colors.primary : theme.colors.border)};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  line-height: 1.6rem;
  letter-spacing: 0.02rem;
  color: ${({ theme, $isOn }) => ($isOn ? theme.colors.border : theme.colors.textPlaceholder)};
`

export const ToggleKnob = styled.span`
  flex-shrink: 0;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.surfaceWhite};
`

export const Terms = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const SaveArea = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-top: 8.4rem;
`

export const SaveButton = FilledButton
