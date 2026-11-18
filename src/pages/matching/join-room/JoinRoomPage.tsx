import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Divider } from '@/components/common/Divider/Divider'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getApiError } from '@/apis/error'
import { enterRoom } from '@/apis/room'
import { getRoomPath } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import { parseInviteCode } from '@/utils/invite'
import { decodeQrFromImage } from '@/utils/qr'
import { LinkJoinSection } from './components/LinkJoinSection/LinkJoinSection'
import { QrJoinSection } from './components/QrJoinSection/QrJoinSection'
import { RoomPasswordModal } from './components/RoomPasswordModal/RoomPasswordModal'

const PASSWORD_REQUIRED_CODE = 'R4002'
const PASSWORD_MISMATCH_CODE = 'R4003'

export function JoinRoomPage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const [link, setLink] = useState('')
  const [qrInviteCode, setQrInviteCode] = useState<string | null>(null)
  const [lockedInviteCode, setLockedInviteCode] = useState<string | null>(null)
  const [isEntering, setIsEntering] = useState(false)
  const [mismatchCount, setMismatchCount] = useState(0)

  const handleQrImageSelect = async (file: File) => {
    const text = await decodeQrFromImage(file).catch(() => null)
    const inviteCode = text ? parseInviteCode(text) : null

    setQrInviteCode(inviteCode)
    showToast(inviteCode ? 'QR 코드를 인식했어요' : '초대 QR 코드를 찾지 못했어요')
  }

  const goToRoom = (roomId: number, alreadyJoined: boolean) => {
    showToast(alreadyJoined ? '이미 참여 중인 방이에요' : '방에 입장했어요')
    navigate(getRoomPath(roomId))
  }

  const handleJoin = async (inviteCode: string) => {
    if (isEntering) return
    setIsEntering(true)
    try {
      const { roomId, alreadyJoined } = await enterRoom(inviteCode)
      goToRoom(roomId, alreadyJoined)
    } catch (error) {
      const { code, message } = getApiError(error)
      if (code === PASSWORD_REQUIRED_CODE) {
        setMismatchCount(0)
        setLockedInviteCode(inviteCode)
      } else showToast(message)
    } finally {
      setIsEntering(false)
    }
  }

  const handlePasswordSubmit = async (password: string) => {
    if (!lockedInviteCode || isEntering) return
    setIsEntering(true)
    try {
      const { roomId, alreadyJoined } = await enterRoom(lockedInviteCode, password)
      setLockedInviteCode(null)
      goToRoom(roomId, alreadyJoined)
    } catch (error) {
      const { code, message } = getApiError(error)
      if (code === PASSWORD_MISMATCH_CODE) {
        setMismatchCount((count) => count + 1)
        return
      }
      setLockedInviteCode(null)
      showToast(message)
    } finally {
      setIsEntering(false)
    }
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
      {lockedInviteCode && (
        <RoomPasswordModal
          mismatchCount={mismatchCount}
          isSubmitting={isEntering}
          onClose={() => setLockedInviteCode(null)}
          onSubmit={handlePasswordSubmit}
        />
      )}
    </SheetPage>
  )
}
