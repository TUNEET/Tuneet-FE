import styled from 'styled-components'
import { Page as BasePage, shiftTop } from '@/styles/authPage'

export {
  Blob,
  Description,
  EyeButton,
  Field,
  FieldError,
  Heading,
  Input,
  InputBox,
  Label,
  LabelRow,
  Logo,
  PasswordInput,
} from '@/styles/authPage'

const LOGIN_SHIFT = 0.6

export const Page = styled(BasePage)`
  --max-shrink: 23rem;
`

export const Fields = styled.div`
  position: absolute;
  top: ${shiftTop('43.9rem', LOGIN_SHIFT)};
  right: 3rem;
  left: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const SubmitButton = styled.button`
  position: absolute;
  top: ${shiftTop('62.5rem', LOGIN_SHIFT)};
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

export const SignupButton = styled.button`
  position: absolute;
  top: ${shiftTop('68.5rem', LOGIN_SHIFT)};
  left: 50%;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 400;
  letter-spacing: 0.024rem;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.textPlaceholder};
  transform: translateX(-50%);
`

export const YoutubeMusicButton = styled.button`
  position: absolute;
  top: ${shiftTop('73.8rem', LOGIN_SHIFT)};
  left: 50%;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.4rem 1.8rem 0.4rem 1rem;
  overflow: hidden;
  border-radius: 1000px;
  background-color: white;
  font-size: 1.3rem;
  font-weight: 500;
  color: #555555;
  white-space: nowrap;
  transform: translateX(-50%);
`
