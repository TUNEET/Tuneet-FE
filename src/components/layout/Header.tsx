import { Link } from 'react-router'
import styled, { keyframes } from 'styled-components'
import messageIcon from '@/assets/icons/message.svg'
import notificationIcon from '@/assets/icons/notification.svg'
import logo from '@/assets/images/logo.svg'
import { ROUTES } from '@/constants/routes'

const ACTIONS = {
  message: { icon: messageIcon, label: '메시지' },
  notification: { icon: notificationIcon, label: '알림' },
}

type HeaderProps = {
  action: keyof typeof ACTIONS
  onActionClick?: () => void
  hint?: string
  onHintClose?: () => void
}

export function Header({ action, onActionClick, hint, onHintClose }: HeaderProps) {
  const { icon, label } = ACTIONS[action]

  return (
    <Wrapper>
      <Link to={ROUTES.home}>
        <img src={logo} alt="TUNEET" width={113} height={20} />
      </Link>
      <ActionButton type="button" aria-label={label} onClick={onActionClick}>
        <img src={icon} alt="" width={28} height={30} />
      </ActionButton>
      {hint && (
        <Hint role="status">
          <HintText type="button" onClick={onActionClick}>
            {hint}
          </HintText>
          <HintClose type="button" aria-label="안내 닫기" onClick={onHintClose}>
            ✕
          </HintClose>
        </Hint>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  margin: 0 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const ActionButton = styled.button`
  display: flex;
`

const popIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-0.4rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Hint = styled.div`
  position: absolute;
  top: calc(100% - 0.6rem);
  right: -0.6rem;
  z-index: 60;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.8rem 0.8rem 0.8rem 1.2rem;
  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0.4rem 1.2rem rgba(207, 143, 184, 0.35);
  animation: ${popIn} 0.25s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: -0.5rem;
    right: 1.6rem;
    width: 1rem;
    height: 1rem;
    border-radius: 0.2rem;
    background-color: inherit;
    transform: rotate(45deg);
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const HintText = styled.button`
  position: relative;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 600;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.surfaceWhite};
`

const HintClose = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
  height: 1.8rem;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ theme }) => theme.colors.surfaceWhite};
`
