import styled from 'styled-components'
import { glass } from '@/styles/glass'

export const Page = styled.div`
  position: relative;
  min-height: max(85.2rem, var(--frame-height));
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Blob = styled.div`
  position: absolute;
  top: calc(100% - 3.8rem);
  left: -10.2rem;
  width: 61.7rem;
  height: 61.3rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  box-shadow: 800px 800px 800px;
  filter: blur(400px);
`

export const Heading = styled.h1`
  position: absolute;
  top: 16rem;
  left: 3rem;
  font-family: ${({ theme }) => theme.fontFamily.display};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 800;
  line-height: 4rem;
  letter-spacing: 0.06rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Logo = styled.img`
  position: absolute;
  top: 12rem;
  left: 3rem;
  width: 11.3rem;
  height: 2rem;
`

export const Description = styled.p`
  position: absolute;
  top: 24.6rem;
  left: 3rem;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 400;
  letter-spacing: 0.032rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Fields = styled.div`
  position: absolute;
  top: 31.1rem;
  right: 3rem;
  left: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  line-height: 1.7rem;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Input = styled.input`
  width: 100%;
  height: 5rem;
  padding: 0 2rem;
  border: none;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textHeading};

  &::placeholder {
    font-weight: 400;
    color: ${({ theme }) => theme.colors.textPlaceholder};
  }

  &:-webkit-autofill {
    box-shadow: inset 0 0 0 5rem ${({ theme }) => theme.colors.border};
    -webkit-text-fill-color: ${({ theme }) => theme.colors.textHeading};
  }
`

export const InputBox = styled.div`
  position: relative;
`

export const PasswordInput = styled(Input)`
  padding-right: 5rem;
  font-family: 'PasswordMask', 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont,
    system-ui, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;

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
  top: 59rem;
  right: 3rem;
  left: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const Term = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TermLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textHeading};
  cursor: pointer;
`

export const Checkbox = styled.input`
  flex-shrink: 0;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.border};
  appearance: none;
  cursor: pointer;

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: inset 0 0 0 0.3rem ${({ theme }) => theme.colors.border};
  }
`

export const TermDetail = styled.button`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
  letter-spacing: 0.028rem;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`

export const SubmitButton = styled.button`
  position: absolute;
  top: 70.1rem;
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
  top: 76.1rem;
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
  top: 63.2rem;
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

export const TermModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
`

export const TermModal = styled.div<{ $height: string }>`
  ${glass}
  position: absolute;
  bottom: 12rem;
  left: 50%;
  display: flex;
  flex-direction: column;
  width: 29.3rem;
  height: ${({ $height }) => $height};
  padding: 1.5rem 1rem;
  border: none;
  border-radius: 2.4rem;
  background: rgba(250, 250, 250, 0.7);
  -webkit-backdrop-filter: blur(0.4rem);
  backdrop-filter: blur(0.4rem);
  transform: translateX(-50%);
`

export const TermModalTitle = styled.h2`
  margin-bottom: 1rem;
  padding: 0 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  line-height: 2rem;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const TermSections = styled.div<{ $gap: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap};
  padding: 0 1rem;
`

export const TermSection = styled.section`
  font-size: 1rem;
  line-height: 1.6rem;
  letter-spacing: 0.02rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const TermSectionHeading = styled.h3`
  font-size: inherit;
  font-weight: 500;
`

export const TermSectionBody = styled.p`
  font-weight: 400;
  white-space: pre-line;
`

export const TermModalCloseButton = styled(ErrorCloseButton)`
  margin-top: auto;
`

export const TermCharacter = styled.img<{ $modalHeight: string }>`
  position: absolute;
  bottom: calc(12rem + ${({ $modalHeight }) => $modalHeight} - 0.2rem);
  left: calc(50% - 11.65rem);
  width: 4.3rem;
  height: 6rem;
  pointer-events: none;
`
