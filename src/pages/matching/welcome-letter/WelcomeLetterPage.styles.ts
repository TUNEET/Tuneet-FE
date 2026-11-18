import styled from 'styled-components'

export const Paper = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: 2rem;
  padding: 2.8rem 2.2rem 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.colors.surfacePink};
  word-break: keep-all;
  overflow-wrap: anywhere;
`

export const Character = styled.img`
  position: absolute;
  top: -4.4rem;
  right: 1.6rem;
  width: 5.6rem;
  height: 5.6rem;
  object-fit: contain;
`

export const Title = styled.h1`
  padding-right: 5rem;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px dashed ${({ theme }) => theme.colors.primaryLight};
`

export const Greeting = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.handwriting};
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: 1.3;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Paragraphs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 400;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Question = styled.p`
  padding: 1.4rem 1.2rem;
  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.surfaceWhite};
  font-family: ${({ theme }) => theme.fontFamily.handwriting};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-style: italic;
  line-height: 1.3;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`

export const GuideTitle = styled.h2`
  margin-top: 0.4rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Guides = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const Guide = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.2rem 1.4rem;
  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.surfaceWhite};
`

export const GuideEmoji = styled.span`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.surfacePink};
  font-size: ${({ theme }) => theme.fontSize.md};
`

export const GuideTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
`

export const GuideName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const GuideDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 400;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textBody};
`

export const Closing = styled.p`
  margin-top: 0.8rem;
  font-family: ${({ theme }) => theme.fontFamily.handwriting};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`

export const From = styled.p`
  align-self: flex-end;
  font-family: ${({ theme }) => theme.fontFamily.handwriting};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textPlaceholder};
`

export const StartButton = styled.button`
  height: 4.4rem;
  margin-top: 0.4rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.surfaceWhite};
`
