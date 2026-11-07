import { useCallback, useEffect, useId, useState } from 'react'
import plusCircleIcon from '@/assets/icons/plus-circle.svg'
import characterMusicSearch from '@/assets/images/character-music-search.png'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { mockSearchPlaylistSongs } from '@/mocks/room'
import type { PlaylistSong } from '@/types/room'
import * as S from './SongSearchSheet.styles'

const SEARCH_DEBOUNCE_MS = 200
const PAGE_SIZE = 5

function PageArrow() {
  return (
    <svg width="4" height="7" viewBox="0 0 6 10" fill="currentColor" aria-hidden="true">
      <path d="M0.229482 9.77964C0.0825448 9.63852 2.41668e-08 9.44713 3.28898e-08 9.24757C4.16128e-08 9.04801 0.0825449 8.85662 0.229482 8.7155L4.10882 4.9904L0.229482 1.26531C0.0912136 1.12269 0.0159468 0.934126 0.0195188 0.739299C0.0230903 0.544471 0.105222 0.358569 0.248632 0.220709C0.392043 0.0828474 0.585552 0.00377536 0.788442 0.000130426C0.991332 -0.00351451 1.18778 0.0685518 1.33646 0.201165L5.77052 4.45774C5.91745 4.59887 6 4.79026 6 4.98982C6 5.18937 5.91745 5.38076 5.77052 5.52189L1.33769 9.77964C1.19072 9.92074 0.991408 10 0.783586 10C0.575763 10 0.37645 9.92074 0.229482 9.77964Z" />
    </svg>
  )
}

type SongSearchSheetProps = {
  onAdd: (song: PlaylistSong) => void
  onClose: () => void
}

export function SongSearchSheet({ onAdd, onClose }: SongSearchSheetProps) {
  const titleId = useId()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<PlaylistSong[] | null>(null)
  const [page, setPage] = useState(1)
  const [addedSongId, setAddedSongId] = useState<number | null>(null)
  const closeAddedPopover = useCallback(() => setAddedSongId(null), [])
  const keyword = query.trim()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    if (!keyword) return

    let isStale = false
    const timer = setTimeout(() => {
      mockSearchPlaylistSongs(keyword).then((songs) => {
        if (!isStale) setResults(songs)
      })
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      isStale = true
      clearTimeout(timer)
    }
  }, [keyword])

  const handleAdd = (song: PlaylistSong) => {
    onAdd(song)
    setAddedSongId(song.id)
  }

  const hasResults = keyword !== '' && results !== null && results.length > 0
  const isNoResult = keyword !== '' && results !== null && results.length === 0
  const totalPages = Math.ceil((results?.length ?? 0) / PAGE_SIZE)

  return (
    <S.Overlay>
      <S.Content role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <S.CloseButton type="button" onClick={onClose}>
          닫기
        </S.CloseButton>
        <S.Sheet>
          <S.Title id={titleId}>플레이리스트</S.Title>
          <S.SearchInput
            type="text"
            enterKeyHint="search"
            value={query}
            placeholder="노래, 아티스트 검색하기"
            aria-label="노래, 아티스트 검색하기"
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
          />
          {hasResults && (
            <S.ResultList>
              {results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((song) => (
                <S.ResultItem key={song.id}>
                  <S.ResultSong>
                    <img src={song.albumImageUrl} alt="" />
                    <span>
                      {song.title} - {song.artist}
                    </span>
                  </S.ResultSong>
                  <S.AddButton
                    type="button"
                    aria-label={`${song.title} 추가`}
                    onClick={() => handleAdd(song)}
                  >
                    <img src={plusCircleIcon} alt="" width={16} height={16} />
                  </S.AddButton>
                  <ConfirmPopover
                    open={addedSongId === song.id}
                    message="노래가 추가되었습니다."
                    confirmLabel="플레이리스트로 이동"
                    onConfirm={onClose}
                    onClose={closeAddedPopover}
                    surface="sheet"
                    tone="default"
                  />
                </S.ResultItem>
              ))}
            </S.ResultList>
          )}
          {hasResults && (
            <S.Pagination>
              <S.PageButton
                type="button"
                $direction="prev"
                aria-label="이전 페이지"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                <PageArrow />
              </S.PageButton>
              <S.PageLabel>
                {page}/{totalPages}
              </S.PageLabel>
              <S.PageButton
                type="button"
                $direction="next"
                aria-label="다음 페이지"
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                <PageArrow />
              </S.PageButton>
            </S.Pagination>
          )}
          {!keyword && (
            <S.Empty>
              <img src={characterMusicSearch} alt="" />
              <p>
                노래를 검색해서
                <br />
                추가해 주세요!
              </p>
            </S.Empty>
          )}
          {isNoResult && (
            <S.Empty>
              <img src={characterMusicSearch} alt="" />
              <p>검색 결과가 없어요</p>
            </S.Empty>
          )}
        </S.Sheet>
      </S.Content>
    </S.Overlay>
  )
}
