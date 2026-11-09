import { useCallback, useEffect, useState } from 'react'
import plusCircleRoseIcon from '@/assets/icons/plus-circle-rose.svg'
import characterImage from '@/assets/images/character-search.webp'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { PageArrow } from '@/pages/matching/room/playlist/components/SongSearchSheet/SongSearchSheet'
import { mockSearchArtists } from '../../mocks'
import type { ProfileArtist } from '../../mocks'
import * as S from './ArtistSearchSheet.styles'

const SEARCH_DEBOUNCE_MS = 200
const PAGE_SIZE = 5

type Artist = Awaited<ReturnType<typeof mockSearchArtists>>[number]

type ArtistSearchSheetProps = {
  onAdd: (artist: ProfileArtist) => void
  onClose: () => void
}

export function ArtistSearchSheet({ onAdd, onClose }: ArtistSearchSheetProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Artist[] | null>(null)
  const [page, setPage] = useState(1)
  const [addedArtistId, setAddedArtistId] = useState<number | null>(null)
  const closeAddedPopover = useCallback(() => setAddedArtistId(null), [])
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
      mockSearchArtists(keyword).then((artists) => {
        if (!isStale) setResults(artists)
      })
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      isStale = true
      clearTimeout(timer)
    }
  }, [keyword])

  const hasResults = keyword !== '' && results !== null && results.length > 0
  const isNoResult = keyword !== '' && results !== null && results.length === 0
  const totalPages = Math.ceil((results?.length ?? 0) / PAGE_SIZE)

  return (
    <S.Overlay $variant="profile">
      <S.Content role="dialog" aria-modal="true" aria-label="아티스트 검색">
        <S.CloseButton type="button" onClick={onClose}>
          닫기
        </S.CloseButton>
        <S.Sheet $variant="profile">
          <S.ArtistSearchInput
            $variant="profile"
            type="text"
            enterKeyHint="search"
            value={query}
            placeholder="아티스트 검색하기"
            aria-label="아티스트 검색하기"
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
          />
          {hasResults && (
            <S.ResultList>
              {results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((artist) => (
                <S.ResultItem key={artist.id} $variant="profile">
                  <S.ResultSong>
                    <img src={artist.image} alt="" />
                    <span>{artist.name}</span>
                  </S.ResultSong>
                  <S.AddButton
                    type="button"
                    aria-label={`${artist.name} 추가`}
                    onClick={() => {
                      onAdd(artist)
                      setAddedArtistId(artist.id)
                    }}
                  >
                    <img src={plusCircleRoseIcon} alt="" width={16} height={16} />
                  </S.AddButton>
                  <ConfirmPopover
                    open={addedArtistId === artist.id}
                    message="아티스트가 추가되었습니다."
                    confirmLabel="닫기"
                    onConfirm={closeAddedPopover}
                    onClose={closeAddedPopover}
                    surface="sheet"
                    tone="muted"
                  />
                </S.ResultItem>
              ))}
            </S.ResultList>
          )}
          {hasResults && (
            <S.Pagination $variant="profile">
              <S.PageButton
                type="button"
                $direction="prev"
                aria-label="이전 페이지"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                <PageArrow />
              </S.PageButton>
              <S.PageLabel $variant="profile">
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
            <S.Empty $variant="profile">
              <img src={characterImage} alt="" />
              <p>
                아티스트를 검색해서
                <br />
                추가해 주세요!
              </p>
            </S.Empty>
          )}
          {isNoResult && (
            <S.Empty $variant="profile">
              <img src={characterImage} alt="" />
              <p>검색 결과가 없어요</p>
            </S.Empty>
          )}
        </S.Sheet>
      </S.Content>
    </S.Overlay>
  )
}
