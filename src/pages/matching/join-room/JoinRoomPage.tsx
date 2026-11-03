import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Divider } from '@/components/common/Divider/Divider'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getRoomPath } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import { mockGetInvitedRoom, mockJoinRoom } from '@/mocks/room'
import { parseInviteCode } from '@/utils/invite'
import { decodeQrFromImage } from '@/utils/qr'
import { LinkJoinSection } from './components/LinkJoinSection/LinkJoinSection'
import { QrJoinSection } from './components/QrJoinSection/QrJoinSection'
import { RoomPasswordModal } from './components/RoomPasswordModal/RoomPasswordModal'

export function JoinRoomPage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const [link, setLink] = useState('')
  const [qrInviteCode, setQrInviteCode] = useState<string | null>(null)
  const [lockedRoom, setLockedRoom] = useState<{ roomId: number; inviteCode: string } | null>(null)

  const handleQrImageSelect = async (file: File) => {
    const text = await decodeQrFromImage(file).catch(() => null)
    const inviteCode = text ? parseInviteCode(text) : null

    setQrInviteCode(inviteCode)
    showToast(inviteCode ? 'QR 코드를 인식했어요' : '초대 QR 코드를 찾지 못했어요')
  }

  const enterRoom = (roomId: number) => {
    showToast('방에 입장했어요')
    navigate(getRoomPath(roomId))
  }

  const handleJoin = async (inviteCode: string) => {
    const room = await mockGetInvitedRoom(inviteCode)
    if (room.hasPassword) {
      setLockedRoom(room)
      return
    }
    enterRoom(room.roomId)
  }

  const handlePasswordSubmit = async (password: string) => {
    if (!lockedRoom) return

    const isCorrect = await mockJoinRoom(lockedRoom.inviteCode, password)
    if (!isCorrect) {
      showToast('비밀번호가 맞지 않아요')
      return
    }
    setLockedRoom(null)
    enterRoom(lockedRoom.roomId)
  }

  return (
    <SheetPage>
      <SectionHeader title="방 입장하기" actionLabel="나가기" onActionClick={() => navigate(-1)} />
      <LinkJoinSection link={link} onLinkChange={setLink} onJoin={handleJoin} />
      <Divider />
      <QrJoinSection
        inviteCode={qrInviteCode}
        onImageSelect={handleQrImageSelect}
        onJoin={handleJoin}
      />
      {lockedRoom && (
        <RoomPasswordModal onClose={() => setLockedRoom(null)} onSubmit={handlePasswordSubmit} />
      )}
    </SheetPage>
  )
}
