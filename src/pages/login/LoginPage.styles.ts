import styled from 'styled-components'
import { Page as BasePage, shiftTop } from '@/pages/signup/SignupPage.styles'

export {
  Blob,
  Description,
  Field,
  Heading,
  Input,
  Label,
  Logo,
} from '@/pages/signup/SignupPage.styles'

/** 화면 높이 차이 중 입력칸 위 여백이 흡수하는 비율 (나머지는 하단 여백) */
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

export const SocialLogins = styled.div`
  position: absolute;
  top: ${shiftTop('72.5rem', LOGIN_SHIFT)};
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  gap: 2rem;
`

export const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  overflow: hidden;
  border-radius: 1000px;
  background-color: white;
`
