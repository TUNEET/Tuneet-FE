import styled from 'styled-components'

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0.9rem 2.8rem 2rem;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.surfaceBlue};
`

export const Character = styled.img`
  position: absolute;
  top: -5.9rem;
  left: 3.1rem;
  width: 5.3rem;
  height: 6.3rem;
  pointer-events: none;
`

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
`

export const Author = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
`

export const AuthorIcon = styled.span`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
`

export const AuthorName = styled.span`
  overflow: hidden;
  padding: 0 1rem;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 400;
  letter-spacing: 0.02rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.blue};
`

export const Time = styled.span`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 400;
  line-height: 1.4rem;
  letter-spacing: 0.02rem;
  color: ${({ theme }) => theme.colors.blue};
`

export const Album = styled.img`
  width: 10rem;
  height: 10rem;
  margin-top: 1rem;
  border-radius: 0.4rem;
  object-fit: cover;
`

export const SongTitle = styled.h2`
  max-width: 100%;
  margin-top: 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  line-height: 1.7rem;
  letter-spacing: 0.028rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Artist = styled.p`
  max-width: 100%;
  margin-top: 0.1rem;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  line-height: 1.2rem;
  letter-spacing: 0.02rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textBody};
`

export const Comment = styled.p`
  width: 100%;
  margin-top: 1.6rem;
  padding: 0.8rem 1.5rem;
  border-radius: 2.4rem;
  background-color: ${({ theme }) => theme.colors.inputBlue};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  line-height: 1.2rem;
  letter-spacing: 0.02rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textBody};
`

export const Listen = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
  margin-top: 1rem;
`

export const ListenLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Platforms = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const PlatformButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  overflow: hidden;
  border-radius: 526px;
  background-color: white;

  img {
    width: 1.579rem;
    height: 1.579rem;
  }
`

export const Divider = styled.hr`
  width: 100%;
  margin-top: 1rem;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.inputBlue};
`

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.9rem;

  &:has(> :only-child) {
    justify-content: flex-end;
  }
`

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
`
