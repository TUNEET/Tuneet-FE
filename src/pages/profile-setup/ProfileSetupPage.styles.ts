import styled from 'styled-components'
import { Description } from '@/pages/signup/SignupPage.styles'

export { Blob, Heading, Logo, Page } from '@/pages/signup/SignupPage.styles'

export const SetupDescription = styled(Description)`
  top: 20.6rem;
`

export const PlatformDescription = styled(SetupDescription)`
  line-height: 2rem;
`

export const BackButton = styled.button`
  position: absolute;
  top: 6.4rem;
  left: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 3rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const TasteNextButton = styled.button`
  position: absolute;
  top: 66.1rem;
  right: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 10000px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceWhite};

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textPlaceholder};
    cursor: default;
  }
`

export const Stage = styled.div`
  position: absolute;
  top: 0;
  left: calc(50% - 19.65rem);
  width: 39.3rem;
  height: 85.2rem;
`

export const AvatarGlow = styled.div<{ $color?: string }>`
  position: absolute;
  top: 35.2rem;
  left: 14.7rem;
  width: 10rem;
  height: 10rem;
  border-radius: 9999px;
  background-color: ${({ theme, $color }) => $color ?? theme.colors.border};
  filter: blur(50px);
`

export const NicknameInput = styled.input`
  position: absolute;
  top: 50.8rem;
  left: 9.9rem;
  width: 19.5rem;
  height: 3.8rem;
  padding: 0 1.6rem;
  border: none;
  border-radius: 1000px;
  background-color: ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  letter-spacing: 0.028rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textHeading};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textPlaceholder};
  }
`

export const MusicButton = styled.button`
  position: absolute;
  top: 50.8rem;
  left: 9.9rem;
  width: 19.5rem;
  height: 3.8rem;
  border-radius: 1000px;
  background-color: ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`

export const SelectedMusicButton = styled(MusicButton)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 0 0 1.1rem;
  outline: 1.4px solid ${({ theme }) => theme.colors.primary};
  outline-offset: -1.4px;
  background-color: ${({ theme }) => theme.colors.surfaceWhite};
  color: ${({ theme }) => theme.colors.primary};

  img {
    flex-shrink: 0;
    border-radius: 9999px;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const Nickname = styled.p`
  position: absolute;
  top: 46.4rem;
  right: 0;
  left: 0;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  letter-spacing: 0.04rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Avatar = styled.div`
  position: absolute;
  top: 35.2rem;
  left: 14.7rem;
  width: 10rem;
  height: 10rem;
  overflow: hidden;
  border-radius: 1000px;
  background: radial-gradient(
    ellipse 127.62% 133.72% at 24% 4.5%,
    ${({ theme }) => theme.colors.primary} 0%,
    #946884 100%
  );
`

export const AvatarButton = styled.button`
  position: absolute;
  top: 35.2rem;
  left: 14.7rem;
  width: 10rem;
  height: 10rem;
  overflow: hidden;
  border-radius: 1000px;
  background-color: ${({ theme }) => theme.colors.border};
`

export const AvatarCharacter = styled.img`
  position: absolute;
  top: 2.9rem;
  left: 1.6rem;
  width: 6.7rem;
  height: 8.6rem;
  object-fit: contain;
`

export const AvatarPreview = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const AvatarOverlay = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background-color: rgba(0, 0, 0, 0.4);
`

export const AvatarIcon = styled.img`
  position: absolute;
  top: 4rem;
  left: 4rem;
  width: 2rem;
  height: 2rem;
`

export const Heart = styled.img`
  position: absolute;
  top: 24.9rem;
  left: -7.8rem;
  width: 56.1rem;
  max-width: none;
  height: 39rem;
  pointer-events: none;
`

export const Decoration = styled.img<{
  $width: string
  $height: string
  $left: string
  $top: string
}>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  pointer-events: none;
`

export const StepButtons = styled.div`
  position: absolute;
  top: 66.1rem;
  right: 3rem;
  left: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const PrevButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 10000px;
  outline: 1.8px solid ${({ theme }) => theme.colors.border};
  outline-offset: -1.8px;
  background-color: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPlaceholder};

  &:disabled {
    background: none;
    color: ${({ theme }) => theme.colors.border};
    cursor: default;
  }
`

export const NextButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 10000px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceWhite};
`

export const LaterButton = styled.button`
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
