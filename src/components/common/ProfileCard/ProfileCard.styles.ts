import styled, { css } from 'styled-components'

export type ProfileCardTone = 'pink' | 'purple'

const AVATAR_GRADIENTS = {
  pink: 'radial-gradient(ellipse 127.62% 133.72% at 24% 4.5%, #cf8fb8 0%, #946884 100%)',
  purple: 'radial-gradient(ellipse 127.62% 133.72% at 24% 4.5%, #c68fcf 0%, #8b6894 100%)',
}

export const Card = styled.section<{ $tone: ProfileCardTone }>`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 2rem;
  overflow: hidden;
  border-radius: 2.4rem;

  ${({ $tone, theme }) =>
    $tone === 'pink'
      ? css`
          border: 1px solid rgba(255, 255, 255, 0.6);
          background-color: rgba(255, 255, 255, 0.3);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.5),
            0 0.8rem 2.4rem rgba(207, 143, 184, 0.12);
          -webkit-backdrop-filter: blur(2rem);
          backdrop-filter: blur(2rem);
        `
      : css`
          background-color: ${theme.colors.surfaceLavender};
        `}
`

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1.6rem;
  min-width: 0;
`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`

export const Avatar = styled.div<{ $tone: ProfileCardTone }>`
  position: relative;
  flex-shrink: 0;
  width: 6rem;
  height: 6rem;
  overflow: hidden;
  border-radius: 50%;
  background: ${({ $tone }) => AVATAR_GRADIENTS[$tone]};
`

export const AvatarCharacter = styled.img`
  position: absolute;
  top: 1.74rem;
  left: 0.96rem;
  width: 4.1rem;
  height: auto;
`

export const AvatarPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  min-width: 0;
`

export const Nickname = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Song = styled.p`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Tags = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const TagRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  & > img {
    flex-shrink: 0;
  }
`

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem 1rem;
  min-width: 0;
`

export const EditButton = styled.button`
  display: flex;
  flex-shrink: 0;
  align-self: flex-start;
`

export const Meta = styled.span`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  line-height: 1.4rem;
  color: ${({ theme }) => theme.colors.purple};
`
