import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/common/Button/Button'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getRoomPath } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import { MOCK_ROOM_DETAIL } from '@/mocks/room'
import type { PlaylistSong } from '@/types/room'
import { Playlist } from '../components/Playlist/Playlist'
import { RoomHeader } from '../components/RoomHeader/RoomHeader'
import { SongSearchSheet } from './components/SongSearchSheet/SongSearchSheet'
import * as S from './RoomPlaylistPage.styles'

export function RoomPlaylistPage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const room = MOCK_ROOM_DETAIL
  const isOwner = room.myRole === 'owner'
  const goToRoom = () => navigate(getRoomPath(room.id))

  const [songs, setSongs] = useState(room.playlist)
  const [isClearOpen, setIsClearOpen] = useState(false)
  const clearButtonRef = useRef<HTMLButtonElement>(null)
  const closeClear = useCallback(() => setIsClearOpen(false), [])
  const [isSongSearchOpen, setIsSongSearchOpen] = useState(false)
  const closeSongSearch = useCallback(() => setIsSongSearchOpen(false), [])

  const handleClear = () => {
    closeClear()
    setSongs([])
    showToast('플레이리스트를 비웠어요')
  }

  const handleAddSong = (song: PlaylistSong) => {
    setSongs((prev) => [...prev, { ...song, id: Date.now() }])
  }

  return (
    <SheetPage>
      <RoomHeader name={room.name} description={room.description} onBackClick={goToRoom} />
      <SectionHeader title="플레이리스트" />
      <S.Content>
        <Playlist songs={songs} />
        <S.Actions>
          {isOwner && (
            <Button
              ref={clearButtonRef}
              variant="outline"
              aria-expanded={isClearOpen}
              disabled={songs.length === 0}
              onClick={() => setIsClearOpen((prev) => !prev)}
            >
              전체삭제
            </Button>
          )}
          <Button onClick={() => setIsSongSearchOpen(true)}>노래 추가하기</Button>
          <ConfirmPopover
            open={isClearOpen}
            message="모든 노래를 삭제하시겠어요?"
            confirmLabel="모든 노래 삭제"
            onConfirm={handleClear}
            onClose={closeClear}
            anchorRef={clearButtonRef}
            placement="top"
          />
        </S.Actions>
      </S.Content>
      {isSongSearchOpen && <SongSearchSheet onAdd={handleAddSong} onClose={closeSongSearch} />}
    </SheetPage>
  )
}
