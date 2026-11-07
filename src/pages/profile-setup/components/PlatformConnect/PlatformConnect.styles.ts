import styled, { css } from 'styled-components'
import { SETUP_SHIFT } from '@/pages/profile-setup/ProfileSetupPage.styles'
import { shiftTop } from '@/pages/signup/SignupPage.styles'

export const glassSurface = css`
  background-color: rgba(227, 210, 221, 0.2);
  box-shadow:
    inset 0 0 0 0.7px rgba(255, 255, 255, 0.8),
    inset 5px 5px 12px rgba(150, 130, 145, 0.14),
    inset -5px -5px 12px rgba(255, 255, 255, 0.3);
`

export const Card = styled.div`
  position: absolute;
  top: ${shiftTop('41.7rem', SETUP_SHIFT.platform)};
  right: 3rem;
  left: 3rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.surfaceWhite};
  box-shadow: 4px 4px 10px rgba(227, 214, 225, 0.3);
`

export const Avatar = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 5rem;
  height: 5rem;
  overflow: hidden;
  border-radius: 500px;
  background: radial-gradient(
    ellipse 127.62% 133.72% at 24% 4.5%,
    ${({ theme }) => theme.colors.primary} 0%,
    #946884 100%
  );
`

export const AvatarCharacter = styled.img`
  position: absolute;
  top: 1.45rem;
  left: 0.8rem;
  width: 3.382rem;
  height: 4.3rem;
  object-fit: contain;
`

export const AvatarPreview = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  min-width: 0;
`

export const Nickname = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  line-height: 1.7rem;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const MusicChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 13.5rem;
  height: 2.6rem;
  padding-left: 0.6rem;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.surfacePink};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  letter-spacing: 0.02rem;
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

export const Platforms = styled.div`
  position: absolute;
  top: ${shiftTop('51.7rem', SETUP_SHIFT.platform)};
  right: 3rem;
  left: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const PlatformButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 4.8rem;
  padding: 0 1rem;
  border-radius: 1000px;
  ${glassSurface}
`

export const PlatformIcon = styled.span`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  border-radius: 1000px;
  background-color: white;
`

export const PlatformLabel = styled.span`
  padding: 0 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  letter-spacing: 0.028rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
`

const Popup = styled.div`
  position: absolute;
  bottom: 15.1rem;
  left: 50%;
  width: 31.6rem;
  padding: 0 2rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.surfaceWhite};
  transform: translateX(-50%);
`

export const SuccessPopup = styled(Popup)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 8rem;
`

export const FailurePopup = styled(Popup)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 12.8rem;
  padding-top: 1.8rem;
`

export const PopupTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

export const PopupTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  line-height: 2rem;
  letter-spacing: 0.032rem;
  color: ${({ theme }) => theme.colors.textHeading};
`

export const PopupDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 400;
  line-height: 2rem;
  letter-spacing: 0.024rem;
  color: ${({ theme }) => theme.colors.textPlaceholder};
`

export const FailureCharacter = styled.img`
  position: absolute;
  top: -8.3rem;
  left: 23.3rem;
  width: 7.1rem;
  height: 8.8rem;
  pointer-events: none;
`

export const FailureButtons = styled.div`
  display: flex;
  gap: 1rem;
`

const FailureButton = styled.button`
  flex: 1;
  height: 3.8rem;
  border-radius: 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  letter-spacing: 0.028rem;
`

export const RetryButton = styled(FailureButton)`
  background-color: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPlaceholder};
`

export const ManualButton = styled(FailureButton)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceWhite};
`

export const SuccessButton = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 1000px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceWhite};
`

export const SleepingCharacter = styled.img`
  position: absolute;
  top: ${shiftTop('35.9rem', SETUP_SHIFT.platform)};
  right: 4.7rem;
  width: 7.7rem;
  height: 6rem;
  pointer-events: none;
`
