import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { getApiError } from '@/apis/error'
import { addRoomPlaylistSong, clearRoomPlaylist, getRoomPlaylist } from '@/apis/room'
import { Button } from '@/components/common/Button/Button'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { SectionHeader } from '@/components/common/SectionHeader/SectionHeader'
import { SongSearchSheet } from '@/components/common/SongSearchSheet/SongSearchSheet'
import { SheetPage } from '@/components/layout/SheetPage/SheetPage'
import { getRoomPath, ROUTES } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import type { SearchedSong } from '@/types/music'
import type { PlaylistSong } from '@/types/room'
import { Playlist } from '../components/Playlist/Playlist'
import { RoomHeader } from '../components/RoomHeader/RoomHeader'
import { useRoomHome } from '../hooks/useRoomHome'
import * as S from './RoomPlaylistPage.styles'

export function RoomPlaylistPage() {
  const navigate = useNavigate()
  const showToast = useToast()
  const { roomId, room, isLoading } = useRoomHome()

  // undefined: 불러오는 중
  const [songs, setSongs] = useState<PlaylistSong[] | undefined>(undefined)
  const [isClearOpen, setIsClearOpen] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  const clearButtonRef = useRef<HTMLButtonElement>(null)
  const closeClear = useCallback(() => setIsClearOpen(false), [])
  const [isSongSearchOpen, setIsSongSearchOpen] = useState(false)
  const closeSongSearch = useCallback(() => setIsSongSearchOpen(false), [])

  useEffect(() => {
    if (!room) return
    let isStale = false

    getRoomPlaylist(room.id)
      .then((data) => {
        if (!isStale) setSongs(data)
      })
      .catch((error) => {
        if (isStale) return
        setSongs([])
        showToast(getApiError(error).message)
      })

    return () => {
      isStale = true
    }
  }, [room, showToast])

  if (isLoading) return <SheetPage>{null}</SheetPage>

  if (!room) {
    return (
      <SheetPage>
        <SectionHeader
          title="플레이리스트"
          actionLabel="나가기"
          onActionClick={() => navigate(ROUTES.matching)}
        />
        <S.Empty>방을 찾을 수 없어요</S.Empty>
      </SheetPage>
    )
  }

  const isOwner = room.myRole === 'owner'
  const isEmpty = !songs || songs.length === 0

  const handleClear = async () => {
    if (isClearing) return
    closeClear()
    setIsClearing(true)
    try {
      await clearRoomPlaylist(roomId)
      setSongs([])
      showToast('플레이리스트를 비웠어요')
    } catch (error) {
      showToast(getApiError(error).message)
    } finally {
      setIsClearing(false)
    }
  }

  // 실패하면 false를 돌려서 검색 시트의 '추가되었습니다' 팝오버를 띄우지 않는다
  const handleAddSong = async ({ musicId }: SearchedSong) => {
    try {
      const song = await addRoomPlaylistSong(roomId, musicId)
      setSongs((prev) => [...(prev ?? []), song])
      return true
    } catch (error) {
      showToast(getApiError(error).message)
      return false
    }
  }

  return (
    <SheetPage>
      <RoomHeader
        name={room.name}
        description={room.description}
        onBackClick={() => navigate(getRoomPath(room.id))}
      />
      <SectionHeader title="플레이리스트" />
      <S.Content>
        {songs &&
          (songs.length > 0 ? (
            <Playlist songs={songs} />
          ) : (
            <S.Empty>아직 담긴 노래가 없어요</S.Empty>
          ))}
        <S.Actions>
          {isOwner && (
            <Button
              ref={clearButtonRef}
              variant="outline"
              aria-expanded={isClearOpen}
              disabled={isEmpty || isClearing}
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
