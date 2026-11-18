import styled from 'styled-components'
import { Page as BasePage, Description, shiftTop } from '@/styles/authPage'

export { Blob, Heading, Logo } from '@/styles/authPage'

export const SETUP_SHIFT = {
  stage: 0.17,
  platform: 0.44,
  bottom: 0.5,
}

/* $hasNote: 설명 아래 안내 문구가 붙으면 그만큼 아래 선택 영역을 내린다 */
export const Page = styled(BasePage)<{ $hasNote?: boolean }>`
  --max-shrink: 18rem;
  --setup-note-space: ${({ $hasNote }) => ($hasNote ? '2.2rem' : '0rem')};
`

/** 설명 바로 아래에 붙는 작은 안내 문구 */
export const StepNote = styled.span`
  display: block;
  margin-top: 0.6rem;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 400;
  line-height: 1.6rem;
  letter-spacing: 0.024rem;
  color: ${({ theme }) => theme.colors.textPlaceholder};
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
