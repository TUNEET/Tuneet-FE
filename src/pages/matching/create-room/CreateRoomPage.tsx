import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import roomDefaultImage from '@/assets/images/room-default.png'
import { Button } from '@/components/common/Button/Button'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getApiError } from '@/apis/error'
import { uploadImage } from '@/apis/image'
import { createRoom, deleteRoom } from '@/apis/room'
import { ROUTES } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import type { CreatedRoom } from '@/types/room'
import { PasswordSetting } from './components/PasswordSetting/PasswordSetting'
import { RoomCreatedModal } from './components/RoomCreatedModal/RoomCreatedModal'
import { RoomInfoEditor } from './components/RoomInfoEditor/RoomInfoEditor'
import * as S from './CreateRoomPage.styles'

const PASSWORD_PATTERN = /^\d{4}$/

export function CreateRoomPage() {
  const navigate = useNavigate()
  const showToast = useToast()

  const [image, setImage] = useState<{ file: File; url: string } | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [usePassword, setUsePassword] = useState(false)
  const [password, setPassword] = useState('')
  const [createdRoom, setCreatedRoom] = useState<CreatedRoom | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const imageUrlRef = useRef<string | null>(null)

  useEffect(() => {
    return () => {
      if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current)
    }
  }, [])

  const handleImageChange = (file: File) => {
    if (image) URL.revokeObjectURL(image.url)
    const url = URL.createObjectURL(file)
    imageUrlRef.current = url
    setImage({ file, url })
  }

  // 비밀번호는 숫자 4자리
  const isValid =
    name.trim() !== '' &&
    description.trim() !== '' &&
    (!usePassword || PASSWORD_PATTERN.test(password.trim()))

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!isValid || isSubmitting) return

    setIsSubmitting(true)
    try {
      const imageUrl = image ? await uploadImage(image.file, 'ROOM') : null
      const room = await createRoom({
        name: name.trim(),
        description: description.trim(),
        imageUrl,
        password: usePassword ? password.trim() : null,
      })
      setCreatedRoom(room)
    } catch (error) {
      showToast(getApiError(error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!createdRoom) return
    try {
      await deleteRoom(createdRoom.id)
      showToast('방을 삭제했어요')
      navigate(ROUTES.matching)
    } catch (error) {
      showToast(getApiError(error).message)
    }
  }

  return (
    <SheetPage>
      <SectionHeader title="방 만들기" actionLabel="나가기" onActionClick={() => navigate(-1)} />
      <S.Form onSubmit={handleSubmit}>
        <RoomInfoEditor
          imageUrl={image?.url ?? roomDefaultImage}
          name={name}
          description={description}
          onImageChange={handleImageChange}
          onNameChange={setName}
          onDescriptionChange={setDescription}
        />
        <S.Divider />
        <PasswordSetting
          enabled={usePassword}
          password={password}
          onEnabledChange={setUsePassword}
          onPasswordChange={setPassword}
        />
        <S.Actions>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            방 만들기
          </Button>
        </S.Actions>
      </S.Form>
      <RoomCreatedModal
        room={createdRoom}
        onClose={() => navigate(ROUTES.matching)}
        onDelete={handleDelete}
      />
    </SheetPage>
  )
}
