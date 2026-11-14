import { QRCodeCanvas } from 'qrcode.react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import editPurpleIcon from '@/assets/icons/edit-purple.svg'
import trashIcon from '@/assets/icons/trash.svg'
import characterCheer from '@/assets/images/character-cheer.png'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { Modal } from '@/components/common/Modal/Modal'
import { useToast } from '@/hooks/useToast'
import { theme } from '@/styles/theme'
import type { CreatedRoom } from '@/types/room'
import * as S from './RoomCreatedModal.styles'

const QR_IMAGE_SIZE = 336

type RoomCreatedModalProps = {
  room: CreatedRoom | null
  onClose: () => void
  // 방 정보 수정 API가 없어 넘기지 않으면 수정 버튼을 숨긴다
  onEdit?: () => void
  onDelete: () => void
}

export function RoomCreatedModal({ room, onClose, onEdit, onDelete }: RoomCreatedModalProps) {
  const titleId = useId()
  const showToast = useToast()
  const trashButtonRef = useRef<HTMLButtonElement>(null)
  const qrCanvasRef = useRef<HTMLCanvasElement>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [qrImageUrl, setQrImageUrl] = useState('')

  const inviteUrl = room?.inviteUrl

  useEffect(() => {
    if (inviteUrl && qrCanvasRef.current) {
      setQrImageUrl(qrCanvasRef.current.toDataURL('image/png'))
    }
  }, [inviteUrl])

  const closeDelete = useCallback(() => setIsDeleteOpen(false), [])

  if (!room) return null

  const handleCopyQr = async () => {
    if (!qrImageUrl) return
    try {
      const blob = fetch(qrImageUrl).then((response) => response.blob())
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      showToast('QR 코드가 복사되었어요')
    } catch {
      showToast('QR 코드를 복사하지 못했어요. 꾹 눌러서 저장해 주세요')
    }
  }

  const handleQrKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleCopyQr()
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: room.name,
          text: `${room.name} 방에 초대해요!`,
          url: room.inviteUrl,
        })
      } catch {
        // 사용자가 공유 창을 닫은 경우
      }
      return
    }

    await navigator.clipboard.writeText(room.inviteUrl)
    showToast('초대 링크가 복사되었어요')
  }

  const handleDelete = () => {
    closeDelete()
    onDelete()
  }

  return (
    <Modal open onClose={onClose} labelledBy={titleId}>
      <S.CardArea>
        <S.Character src={characterCheer} alt="" />
        <S.Card>
          <S.Title id={titleId}>방이 생성되었어요!</S.Title>
          <S.RoomInfo>
            <S.QrBox>
              <QRCodeCanvas
                ref={qrCanvasRef}
                value={room.inviteUrl}
                size={QR_IMAGE_SIZE}
                marginSize={2}
                fgColor={theme.colors.textHeading}
                style={{ display: 'none' }}
              />
              {qrImageUrl && (
                <S.QrImage
                  src={qrImageUrl}
                  alt={`${room.name} 초대 QR 코드. 누르면 이미지가 복사돼요`}
                  role="button"
                  tabIndex={0}
                  onClick={handleCopyQr}
                  onKeyDown={handleQrKeyDown}
                />
              )}
            </S.QrBox>
            <S.Texts>
              <S.Name>{room.name}</S.Name>
              <S.Description>{room.description}</S.Description>
            </S.Texts>
          </S.RoomInfo>
          <S.InviteLink href={room.inviteUrl} target="_blank" rel="noreferrer">
            {room.inviteUrl.replace(/^https?:\/\//, '')}
          </S.InviteLink>
          <S.ShareButton type="button" onClick={handleShare}>
            공유하고 초대하기
          </S.ShareButton>
          <S.Divider />
          <S.Footer>
            {onEdit && (
              <S.IconButton type="button" aria-label="방 정보 수정" onClick={onEdit}>
                <img src={editPurpleIcon} alt="" width={26} height={26} />
              </S.IconButton>
            )}
            <S.IconButton
              ref={trashButtonRef}
              type="button"
              aria-label="방 삭제"
              aria-expanded={isDeleteOpen}
              onClick={() => setIsDeleteOpen((prev) => !prev)}
            >
              <img src={trashIcon} alt="" width={26} height={26} />
            </S.IconButton>
          </S.Footer>
        </S.Card>
        <ConfirmPopover
          open={isDeleteOpen}
          message="방을 삭제하시겠어요?"
          confirmLabel="방 삭제"
          onConfirm={handleDelete}
          onClose={closeDelete}
          anchorRef={trashButtonRef}
          surface="dim"
        />
      </S.CardArea>
    </Modal>
  )
}
