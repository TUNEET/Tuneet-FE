import styled from 'styled-components'
import { Checkbox as TermCheckbox, TermDetail as BaseTermDetail } from '@/styles/term'

export const CardArea = styled.div`
  position: relative;
  width: 100%;
  padding: 0 0.8rem;
`

export const Character = styled.img`
  position: absolute;
  top: -8.3rem;
  right: 2rem;
  width: 7.1rem;
  height: 8.8rem;
  object-fit: contain;
`

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.8rem 2rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.surfaceWhite};
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2rem;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 400;
  line-height: 2rem;
  letter-spacing: 0.02em;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`

export const Steps = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding-left: 0.4rem;
  list-style: decimal inside;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 600;
  line-height: 2rem;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Term = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.4rem;
  padding: 0 1.6rem;
`

export const TermLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.textHeading};
  cursor: pointer;
`

export const Checkbox = styled(TermCheckbox)`
  width: 1.4rem;
  height: 1.4rem;

  &:checked {
    box-shadow: inset 0 0 0 0.25rem ${({ theme }) => theme.colors.border};
  }
`

export const TermDetail = styled(BaseTermDetail)`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  line-height: normal;
  letter-spacing: 0.02em;
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const PrimaryButton = styled.button`
  height: 3.8rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.surfaceWhite};

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`

export const LaterButton = styled.button`
  align-self: center;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 400;
  line-height: 2rem;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`
