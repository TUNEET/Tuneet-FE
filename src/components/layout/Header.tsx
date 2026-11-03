import { Link } from 'react-router'
import styled from 'styled-components'
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
}

export function Header({ action, onActionClick }: HeaderProps) {
  const { icon, label } = ACTIONS[action]

  return (
    <Wrapper>
      <Link to={ROUTES.home}>
        <img src={logo} alt="TUNEET" width={113} height={20} />
      </Link>
      <ActionButton type="button" aria-label={label} onClick={onActionClick}>
        <img src={icon} alt="" width={28} height={30} />
      </ActionButton>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6rem;
  margin: 0 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const ActionButton = styled.button`
  display: flex;
`
