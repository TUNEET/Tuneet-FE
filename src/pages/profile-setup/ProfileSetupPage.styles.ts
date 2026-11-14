import styled from 'styled-components'
import { Page as BasePage, Description, shiftTop } from '@/styles/authPage'

export { Blob, Heading, Logo } from '@/styles/authPage'

export const SETUP_SHIFT = {
  stage: 0.17,
  platform: 0.44,
  bottom: 0.5,
}

export const Page = styled(BasePage)`
  --max-shrink: 18rem;
`

export const SetupDescription = styled(Description)`
  top: 20.6rem;
`

export const PlatformDescription = styled(SetupDescription)`
  line-height: 2rem;
`

export const BackButton = styled.button`
  position: absolute;
  top: 6.4rem;
  left: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 3rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const TasteNextButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  margin: 0 3rem 3rem auto;
  border-radius: 10000px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceWhite};

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textPlaceholder};
    cursor: default;
  }
`

export const LaterButton = styled.button`
  position: absolute;
  top: ${shiftTop('76.1rem', SETUP_SHIFT.bottom)};
  left: 50%;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 400;
  letter-spacing: 0.024rem;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.textPlaceholder};
  transform: translateX(-50%);
`
