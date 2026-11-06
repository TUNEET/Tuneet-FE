import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.surfaceWhite};
`

export const ExitButton = styled.button`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.letterMuted};
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.letterDivider};
`

export const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`

export const IntroTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  line-height: 1.6rem;
`

export const IntroSub = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.letterAccent};
`

export const IntroMain = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.surfaceWhite};
`

export const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 1rem;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 600;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.letterAccent};
`

const whiteInput = `
  width: 100%;
  border: none;
  border-radius: 1rem;
  font-weight: 500;
  line-height: 1.6rem;

  &:focus {
    outline: none;
  }
`

export const MessageInput = styled.textarea`
  ${whiteInput}
  height: 7.6rem;
  padding: 1.4rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.surfaceWhite};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ theme }) => theme.colors.letterText};
  caret-color: ${({ theme }) => theme.colors.letterBackground};
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.letterMuted};
    opacity: 1;
    transition: opacity 0.2s;
  }

  &:focus::placeholder {
    opacity: 0.4;
  }
`

export const SenderBox = styled.p`
  display: flex;
  align-items: center;
  height: 4.4rem;
  padding: 0 1.5rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.surfaceWhite};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.letterText};
`

export const SendRow = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
`

export const SendButton = styled.button`
  display: flex;
  border-radius: 50%;

  &:disabled {
    cursor: default;
  }
`
