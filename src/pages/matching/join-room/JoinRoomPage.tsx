import { useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { Divider } from '@/components/common/Divider/Divider'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getApiError } from '@/apis/error'
import { enterRoom } from '@/apis/room'
import { getRoomPath, ROUTES } from '@/constants/routes'
import { useGoBack } from '@/hooks/useGoBack'
import { useToast } from '@/hooks/useToast'
import { getInviteUrl, isValidInviteCode, parseInviteCode } from '@/utils/invite'
import { decodeQrFromImage } from '@/utils/qr'
import { LinkJoinSection } from './components/LinkJoinSection/LinkJoinSection'
import { QrJoinSection } from './components/QrJoinSection/QrJoinSection'
import { RoomPasswordModal } from './components/RoomPasswordModal/RoomPasswordModal'

const PASSWORD_REQUIRED_CODE = 'R4002'
const PASSWORD_MISMATCH_CODE = 'R4003'

export function JoinRoomPage() {
  const navigate = useNavigate()
  const goBack = useGoBack(ROUTES.matching)
  const showToast = useToast()
  const [searchParams] = useSearchParams()
  const [link, setLink] = useState(() => {
    const code = searchParams.get('code')
    return isValidInviteCode(code) ? getInviteUrl(code) : ''
  })
  const [qrInviteCode, setQrInviteCode] = useState<string | null>(null)
  const [lockedInviteCode, setLockedInviteCode] = useState<string | null>(null)
  const [isEntering, setIsEntering] = useState(false)
  const enteringRef = useRef(false)
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

  const startEntering = () => {
    if (enteringRef.current) return false
    enteringRef.current = true
    setIsEntering(true)
    return true
  }

  const finishEntering = () => {
    enteringRef.current = false
    setIsEntering(false)
  }

  const handleJoin = async (inviteCode: string) => {
    if (!startEntering()) return
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
      finishEntering()
    }
  }

  const handlePasswordSubmit = async (password: string) => {
    if (!lockedInviteCode || !startEntering()) return
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
      finishEntering()
    }
  }

  return (
    <SheetPage>
      <SectionHeader title="방 입장하기" actionLabel="나가기" onActionClick={goBack} />
      <LinkJoinSection
        link={link}
        isEntering={isEntering}
        onLinkChange={setLink}
        onJoin={handleJoin}
      />
      <Divider />
      <QrJoinSection
        inviteCode={qrInviteCode}
        isEntering={isEntering}
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
