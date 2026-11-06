import type { ChangeEvent } from 'react'
import editWhiteIcon from '@/assets/icons/edit-white.svg'
import * as S from './RoomInfoEditor.styles'

const NAME_MAX_LENGTH = 20
const DESCRIPTION_MAX_LENGTH = 40

type RoomInfoEditorProps = {
  imageUrl: string
  name: string
  description: string
  onImageChange: (file: File) => void
  onNameChange: (name: string) => void
  onDescriptionChange: (description: string) => void
}

export function RoomInfoEditor({
  imageUrl,
  name,
  description,
  onImageChange,
  onNameChange,
  onDescriptionChange,
}: RoomInfoEditorProps) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) onImageChange(file)
    event.target.value = ''
  }

  return (
    <S.Card>
      <S.ImagePicker aria-label="방 대표 이미지 변경">
        <S.Preview src={imageUrl} alt="" />
        <S.EditIcon src={editWhiteIcon} alt="" width={20} height={20} />
        <S.FileInput type="file" accept="image/*" onChange={handleFileChange} />
      </S.ImagePicker>
      <S.Texts>
        <S.NameInput
          value={name}
          placeholder="방 이름"
          aria-label="방 이름"
          maxLength={NAME_MAX_LENGTH}
          onChange={(event) => onNameChange(event.target.value)}
        />
        <S.DescriptionInput
          value={description}
          placeholder="방 소개"
          aria-label="방 소개"
          maxLength={DESCRIPTION_MAX_LENGTH}
          onChange={(event) => onDescriptionChange(event.target.value)}
        />
      </S.Texts>
    </S.Card>
  )
}
