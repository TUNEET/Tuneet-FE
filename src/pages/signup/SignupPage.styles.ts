import styled from 'styled-components'

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
