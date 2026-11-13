import styled, { css } from 'styled-components'
import frameImage from '@/assets/icons/profile-Frame.svg'

const FRAME_IMAGE_URL = `url("${frameImage}")`
const RAY_LENGTH = '11.2rem'

type BoxProps = {
  $width: number
  $height: number
  $left: number
  $top: number
  $rotate: number
}

export const Stage = styled.div`
  position: relative;
  width: 39.3rem;
  /* 화면이 39.3rem보다 좁아도 가운데 정렬되도록 음수 여백 허용 (auto는 0으로 계산됨) */
  margin: 0 calc(50% - 19.65rem);
  /* 넘친 만큼 좌우 여백을 늘려 콘텐츠는 항상 화면 양끝에서 3rem 떨어지게 */
  padding: 26.6rem calc(3rem + max(0rem, 19.65rem - 50%)) 5rem;
  pointer-events: none;
`

export const Card = styled.div`
  position: relative;
  min-height: 37.4rem;
  padding: 24.4rem 0 2.4rem 4.1rem;
`

export const Frame = styled.div`
  position: absolute;
  inset: -3rem;
  border-style: solid;
  border-width: 6rem;
  border-image: ${FRAME_IMAGE_URL} 60 stretch;
  pointer-events: none;
`

export const PlainFrame = styled.div`
  position: absolute;
  inset: 0;
  border: 2px solid ${({ theme }) => theme.colors.surfaceWhite};
  border-radius: 2.4rem;
  background-color: rgba(242, 235, 242, 0.4);
  pointer-events: none;
`

export const Tags = styled.div<{ $clickable: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 25.1rem;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  pointer-events: ${({ $clickable }) => ($clickable ? 'auto' : 'none')};
`

export const StartButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 15.9rem;
  height: 4rem;
  margin: 2.1rem 0 0 auto;
  padding: 0 1.6rem;
  border-radius: 10000px;
  background-color: ${({ theme }) => theme.colors.textHeading};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.surfaceWhite};
  pointer-events: auto;
`

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`

export const ArtistTag = styled.span`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.8rem;
  border-radius: 1000px;
  background-color: ${({ theme }) => theme.colors.surfacePink};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  letter-spacing: 0.02rem;
  color: ${({ theme }) => theme.colors.textPlaceholder};

  img {
    border-radius: 9999px;
  }
`

export const GenreTag = styled.span`
  padding: 0.8rem;
  border-radius: 1000px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  letter-spacing: 0.02rem;
  color: ${({ theme }) => theme.colors.surfaceWhite};
`

export const Glow = styled.div`
  position: absolute;
  top: 34.8rem;
  left: 14.7rem;
  width: 10rem;
  height: 10rem;
  border-radius: 9999px;
  background-color: #ffa2d7;
  filter: blur(60px);
  pointer-events: none;
`

export const Ray = styled.div<{ $angle: number; $spread: number }>`
  --ray-width: calc(
    2 * ${RAY_LENGTH} * ${({ $spread }) => Math.tan((($spread / 2) * Math.PI) / 180)}
  );
  position: absolute;
  top: 39.8rem;
  left: calc(19.7rem - var(--ray-width) / 2);
  width: var(--ray-width);
  height: ${RAY_LENGTH};
  background: linear-gradient(180deg, white 38%, rgba(255, 255, 255, 0) 100%);
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
  transform: rotate(${({ $angle }) => $angle - 180}deg);
  transform-origin: top center;
  pointer-events: none;
`

export const Nickname = styled.p`
  position: absolute;
  top: 46.3rem;
  right: 0;
  left: 0;
  z-index: 1;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  letter-spacing: 0.04rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const NicknameInput = styled.input`
  position: absolute;
  top: 46.3rem;
  left: 7.1rem;
  z-index: 1;
  width: 25.1rem;
  height: 2.4rem;
  padding: 0;
  border: none;
  background: transparent;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  letter-spacing: 0.04rem;
  text-align: center;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.textPlaceholder};
  pointer-events: auto;

  &:focus {
    outline: none;
  }
`

const avatarSurface = css`
  position: absolute;
  top: 34.8rem;
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

export const Avatar = styled.div`
  ${avatarSurface}
`

export const AvatarButton = styled.button`
  ${avatarSurface}
  pointer-events: auto;
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

export const Decoration = styled.img<BoxProps>`
  position: absolute;
  top: ${({ $top }) => $top / 10}rem;
  left: ${({ $left }) => $left / 10}rem;
  width: ${({ $width }) => $width / 10}rem;
  height: ${({ $height }) => $height / 10}rem;
  transform: rotate(${({ $rotate }) => $rotate}deg);
  pointer-events: none;
`

export { CoverFallback as ArtistFallback } from '@/components/common/SongSearchSheet/SongSearchSheet.styles'
