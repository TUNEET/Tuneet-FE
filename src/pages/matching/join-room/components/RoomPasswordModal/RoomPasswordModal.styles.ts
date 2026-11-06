import styled from 'styled-components'

export const CardArea = styled.div`
  position: relative;
  width: 100%;
`

export const Character = styled.img`
  position: absolute;
  top: -6.7rem;
  left: 3rem;
  width: 5.8rem;
  height: 7.1rem;
`

export const Card = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0.9rem 2.8rem 2rem;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.surfaceLavender};
`

export const Title = styled.h2`
  display: flex;
  align-items: center;
  height: 3rem;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const PasswordInput = styled.input`
  width: 100%;
  margin-top: 1.6rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.lavenderLight};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.lavender};
  caret-color: ${({ theme }) => theme.colors.lavender};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 1;
    transition: opacity 0.2s;
  }

  &:focus {
    outline: none;
  }

  &:focus::placeholder {
    opacity: 0.4;
  }
`

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  width: 2.6rem;
  height: 2.6rem;
  margin-top: 1rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.lavender};
  transition: background-color 0.15s;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.lavenderLight};
    cursor: default;
  }
`
