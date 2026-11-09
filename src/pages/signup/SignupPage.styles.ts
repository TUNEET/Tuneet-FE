import styled from 'styled-components'
import { Page as BasePage, Input, shiftTop } from '@/styles/authPage'
import { glass } from '@/styles/glass'

export { Blob, Description, Field, Heading, Input, Label, Logo } from '@/styles/authPage'
export { Checkbox, Term, TermDetail, TermLabel } from '@/styles/term'

const SIGNUP_SHIFT = 0.2

export const Page = styled(BasePage)`
  --max-shrink: 11rem;
`

export const Fields = styled.div`
  position: absolute;
  top: ${shiftTop('31.1rem', SIGNUP_SHIFT)};
  right: 3rem;
  left: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const InputBox = styled.div`
  position: relative;
`

export const PasswordInput = styled(Input)`
  padding-right: 5rem;
  font-family:
    'PasswordMask',
    'Pretendard Variable',
    Pretendard,
    -apple-system,
    BlinkMacSystemFont,
    system-ui,
    'Apple SD Gothic Neo',
    'Malgun Gothic',
    sans-serif;

  &::-ms-reveal {
    display: none;
  }
`

export const EyeButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
`

export const Terms = styled.div`
  position: absolute;
  top: ${shiftTop('59rem', SIGNUP_SHIFT)};
  right: 3rem;
  left: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const SubmitButton = styled.button`
  position: absolute;
  top: ${shiftTop('70.1rem', SIGNUP_SHIFT)};
  right: 3rem;
  left: 3rem;
  height: 5rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  letter-spacing: 0.032rem;
  color: ${({ theme }) => theme.colors.surfaceWhite};
`

export const LoginButton = styled.button`
  position: absolute;
  top: ${shiftTop('76.1rem', SIGNUP_SHIFT)};
  left: 50%;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 400;
  letter-spacing: 0.024rem;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.textPlaceholder};
  transform: translateX(-50%);
`

export const ErrorPopup = styled.div`
  ${glass}
  position: absolute;
  top: ${shiftTop('63.2rem', SIGNUP_SHIFT)};
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 24.5rem;
  height: 10rem;
  padding: 1.5rem 1rem;
  border-radius: 2.4rem;
  background: rgba(250, 250, 250, 0.55);
  -webkit-backdrop-filter: blur(0.4rem);
  backdrop-filter: blur(0.4rem);
  transform: translateX(-50%);
`

export const ErrorMessage = styled.p`
  padding-left: 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const ErrorCloseButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 100px;
  background-color: rgba(233.92, 233.92, 233.92, 0.7);
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`
