import styled from 'styled-components'

export const Card = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: 6rem;
  padding: 0 1.1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.surfaceLavender};
`

export const Body = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
`

export const Thumbnail = styled.img`
  flex-shrink: 0;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
`

export const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-width: 0;
`

export const Name = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Description = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.colors.textBody};
`

export const EnterButton = styled.button`
  display: flex;
  flex-shrink: 0;
`
