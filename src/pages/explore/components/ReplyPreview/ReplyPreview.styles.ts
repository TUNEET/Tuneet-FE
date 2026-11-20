import styled from 'styled-components'

const ellipsis = `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Reply = styled.div<{ $indent: string; $clickable: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
  margin: 0.6rem 0 0 ${({ $indent }) => $indent};
  padding: 0.8rem 1rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.blueSoft};
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
`

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.016rem;
  color: ${({ theme }) => theme.colors.blue};
`

export const Arrow = styled.span`
  margin-right: 0.3rem;
`

export const Body = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.6rem;
`

export const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
`

export const Song = styled.p`
  ${ellipsis}
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 600;
  line-height: 1.6rem;
  letter-spacing: 0.02rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Message = styled.p`
  ${ellipsis}
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.4rem;
  letter-spacing: 0.016rem;
  color: ${({ theme }) => theme.colors.textBody};
`

export const Like = styled.button`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  width: 1rem;
  padding: 0.4rem 0.1rem 0.1rem;
  color: ${({ theme }) => theme.colors.blue};
`
