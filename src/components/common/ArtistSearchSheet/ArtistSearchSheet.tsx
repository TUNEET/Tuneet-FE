import { useCallback, useEffect, useState } from 'react'
import { searchArtists } from '@/apis/music'
import plusCircleRoseIcon from '@/assets/icons/plus-circle-rose.svg'
import characterImage from '@/assets/images/character-search.webp'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import { PageArrow } from '@/components/common/SongSearchSheet/SongSearchSheet'
import type { ArtistSearchItem, ProfileArtist } from '@/types/music'
import * as S from './ArtistSearchSheet.styles'

const SEARCH_DEBOUNCE_MS = 200
const PAGE_SIZE = 5

type SearchResult = {
  keyword: string
  items: ArtistSearchItem[]
  totalPages: number
}

type ArtistSearchSheetProps = {
  onAdd: (artist: ProfileArtist) => void
  onClose: () => void
}

export function ArtistSearchSheet({ onAdd, onClose }: ArtistSearchSheetProps) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<SearchResult | null>(null)
  const [isError, setIsError] = useState(false)
  const [page, setPage] = useState(1)
  const [addedArtistId, setAddedArtistId] = useState<string | null>(null)
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
    const timer = setTimeout(async () => {
      try {
        const { items, totalPages } = await searchArtists(keyword, page, PAGE_SIZE)
        if (isStale) return
        setResult({ keyword, items, totalPages })
        setIsError(false)
      } catch {
        if (isStale) return
        setResult({ keyword, items: [], totalPages: 0 })
        setIsError(true)
      }
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      isStale = true
      clearTimeout(timer)
    }
  }, [keyword, page])

  // 새 검색어 결과가 오기 전에는 이전 결과를 보여주지 않는다 (페이지 이동 중에는 유지)
  const results = keyword !== '' && result?.keyword === keyword ? result.items : null
  const hasResults = results !== null && results.length > 0
  const isNoResult = results !== null && results.length === 0
  const totalPages = Math.max(result?.totalPages ?? 1, 1)

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
              {results.map((artist) => (
                <S.ResultItem key={artist.id} $variant="profile">
                  <S.ResultSong>
                    <S.CoverFallback />
                    <span>
                      {artist.name}
                      {artist.disambiguation && ` (${artist.disambiguation})`}
                    </span>
                  </S.ResultSong>
                  <S.AddButton
                    type="button"
                    aria-label={`${artist.name} 추가`}
                    onClick={() => {
                      onAdd({ id: artist.id, name: artist.name })
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
                disabled={page >= totalPages}
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
              <p>{isError ? '검색하지 못했어요. 다시 시도해 주세요.' : '검색 결과가 없어요'}</p>
            </S.Empty>
          )}
        </S.Sheet>
      </S.Content>
    </S.Overlay>
  )
}
