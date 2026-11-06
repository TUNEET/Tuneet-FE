import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import roomDefaultImage from '@/assets/images/room-default.png'
import { Button } from '@/components/common/Button/Button'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { ROUTES } from '@/constants/routes'
import { mockCreateRoom } from '@/mocks/room'
import type { CreatedRoom, CreateRoomRequest } from '@/types/room'
import { PasswordSetting } from './components/PasswordSetting/PasswordSetting'
import { RoomCreatedModal } from './components/RoomCreatedModal/RoomCreatedModal'
import { RoomInfoEditor } from './components/RoomInfoEditor/RoomInfoEditor'
import * as S from './CreateRoomPage.styles'

export function CreateRoomPage() {
  const navigate = useNavigate()

  const [image, setImage] = useState<{ file: File; url: string } | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [usePassword, setUsePassword] = useState(false)
  const [password, setPassword] = useState('')
  const [createdRoom, setCreatedRoom] = useState<CreatedRoom | null>(null)

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

  const isValid =
    name.trim() !== '' && description.trim() !== '' && (!usePassword || password.trim() !== '')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!isValid) return

    const request: CreateRoomRequest = {
      name: name.trim(),
      description: description.trim(),
      image: image?.file ?? null,
      password: usePassword ? password.trim() : null,
    }
    setCreatedRoom(await mockCreateRoom(request))
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
          <Button type="submit" disabled={!isValid}>
            방 만들기
          </Button>
        </S.Actions>
      </S.Form>
      <RoomCreatedModal
        room={createdRoom}
        onClose={() => navigate(ROUTES.matching)}
        onEdit={() => setCreatedRoom(null)}
        onDelete={() => navigate(ROUTES.matching)}
      />
    </SheetPage>
  )
}
