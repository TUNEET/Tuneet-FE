import styled from 'styled-components'

export {
  Blob,
  Description,
  Field,
  Heading,
  Input,
  Label,
  Logo,
  Page,
} from '@/pages/signup/SignupPage.styles'

export const Fields = styled.div`
  position: absolute;
  top: 43.9rem;
  right: 3rem;
  left: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const SubmitButton = styled.button`
  position: absolute;
  top: 62.5rem;
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
  top: 68.5rem;
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
  top: 72.5rem;
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
