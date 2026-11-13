import { useCallback, useEffect, useId, useState } from 'react'
import plusCircleBlueIcon from '@/assets/icons/plus-circle-blue.svg'
import plusCircleRoseIcon from '@/assets/icons/plus-circle-rose.svg'
import plusCircleIcon from '@/assets/icons/plus-circle.svg'
import characterMusicSearch from '@/assets/images/character-music-search.png'
import characterProfileSearch from '@/assets/images/character-search.webp'
import { searchMusics } from '@/apis/music'
import { ConfirmPopover } from '@/components/common/ConfirmPopover/ConfirmPopover'
import type { MusicSearchItem, SearchedSong } from '@/types/music'
import * as S from './SongSearchSheet.styles'
import type { SongSearchSheetVariant } from './SongSearchSheet.styles'

const SEARCH_DEBOUNCE_MS = 200
const PAGE_SIZE = 5

const ADD_ICONS = {
  playlist: plusCircleIcon,
  profile: plusCircleRoseIcon,
  explore: plusCircleBlueIcon,
}

export function PageArrow() {
  return (
    <svg width="4" height="7" viewBox="0 0 6 10" fill="currentColor" aria-hidden="true">
      <path d="M0.229482 9.77964C0.0825448 9.63852 2.41668e-08 9.44713 3.28898e-08 9.24757C4.16128e-08 9.04801 0.0825449 8.85662 0.229482 8.7155L4.10882 4.9904L0.229482 1.26531C0.0912136 1.12269 0.0159468 0.934126 0.0195188 0.739299C0.0230903 0.544471 0.105222 0.358569 0.248632 0.220709C0.392043 0.0828474 0.585552 0.00377536 0.788442 0.000130426C0.991332 -0.00351451 1.18778 0.0685518 1.33646 0.201165L5.77052 4.45774C5.91745 4.59887 6 4.79026 6 4.98982C6 5.18937 5.91745 5.38076 5.77052 5.52189L1.33769 9.77964C1.19072 9.92074 0.991408 10 0.783586 10C0.575763 10 0.37645 9.92074 0.229482 9.77964Z" />
    </svg>
  )
}

type SearchResult = {
  keyword: string
  page: number
  items: MusicSearchItem[]
  totalPages: number
}

const toSearchedSong = ({ id, title, artist, coverUrl }: MusicSearchItem): SearchedSong => ({
  musicId: id,
  title,
  artist,
  albumImageUrl: coverUrl ?? '',
})

type SongSearchSheetProps = {
  onAdd: (song: SearchedSong) => void
  onClose: () => void
  variant?: SongSearchSheetVariant
  hiddenTitle?: string
}

export function SongSearchSheet({
  onAdd,
  onClose,
  variant = 'playlist',
  hiddenTitle,
}: SongSearchSheetProps) {
  const titleId = useId()
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<SearchResult | null>(null)
  const [isError, setIsError] = useState(false)
  const [page, setPage] = useState(1)
  const [addedSongId, setAddedSongId] = useState<string | null>(null)
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
    const timer = setTimeout(async () => {
      try {
        const { items, totalPages } = await searchMusics(keyword, page, PAGE_SIZE)
        if (isStale) return
        setResult({ keyword, page, items, totalPages })
        setIsError(false)
      } catch {
        if (isStale) return
        setResult({ keyword, page, items: [], totalPages: 0 })
        setIsError(true)
      }
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      isStale = true
      clearTimeout(timer)
    }
  }, [keyword, page])

  const handleAdd = (item: MusicSearchItem) => {
    onAdd(toSearchedSong(item))
    setAddedSongId(item.id)
  }

  // 새 검색어 결과가 오기 전에는 이전 결과를 보여주지 않는다 (페이지 이동 중에는 유지)
  const results = keyword !== '' && result?.keyword === keyword ? result.items : null
  const hasResults = results !== null && results.length > 0
  const isNoResult = results !== null && results.length === 0
  const totalPages = Math.max(result?.totalPages ?? 1, 1)
  const isPlaylist = variant === 'playlist'
  const characterImage = variant === 'profile' ? characterProfileSearch : characterMusicSearch

  return (
    <S.Overlay $variant={variant}>
      <S.Content role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <S.CloseButton type="button" onClick={onClose}>
          닫기
        </S.CloseButton>
        <S.Sheet $variant={variant}>
          <S.Title id={titleId} $variant={variant} $isHidden={hiddenTitle !== undefined}>
            {hiddenTitle ?? (isPlaylist ? '플레이리스트' : '프로필')}
          </S.Title>
          <S.SearchInput
            $variant={variant}
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
              {results.map((song) => (
                <S.ResultItem key={song.id} $variant={variant}>
                  <S.ResultSong>
                    {song.coverUrl ? <img src={song.coverUrl} alt="" /> : <S.CoverFallback />}
                    <span>
                      {song.title} - {song.artist}
                    </span>
                  </S.ResultSong>
                  <S.AddButton
                    type="button"
                    aria-label={`${song.title} 추가`}
                    onClick={() => handleAdd(song)}
                  >
                    <img src={ADD_ICONS[variant]} alt="" width={16} height={16} />
                  </S.AddButton>
                  <ConfirmPopover
                    open={addedSongId === song.id}
                    message="노래가 추가되었습니다."
                    confirmLabel={isPlaylist ? '플레이리스트로 이동' : '닫기'}
                    onConfirm={isPlaylist ? onClose : closeAddedPopover}
                    onClose={closeAddedPopover}
                    surface="sheet"
                    tone={variant === 'profile' ? 'muted' : 'default'}
                  />
                </S.ResultItem>
              ))}
            </S.ResultList>
          )}
          {hasResults && (
            <S.Pagination $variant={variant}>
              <S.PageButton
                type="button"
                $direction="prev"
                $variant={variant}
                aria-label="이전 페이지"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                <PageArrow />
              </S.PageButton>
              <S.PageLabel $variant={variant}>
                {page}/{totalPages}
              </S.PageLabel>
              <S.PageButton
                type="button"
                $direction="next"
                $variant={variant}
                aria-label="다음 페이지"
                disabled={page >= totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                <PageArrow />
              </S.PageButton>
            </S.Pagination>
          )}
          {!keyword && (
            <S.Empty $variant={variant}>
              <img src={characterImage} alt="" />
              <p>
                노래를 검색해서
                <br />
                추가해 주세요!
              </p>
            </S.Empty>
          )}
          {isNoResult && (
            <S.Empty $variant={variant}>
              <img src={characterImage} alt="" />
              <p>{isError ? '검색하지 못했어요. 다시 시도해 주세요.' : '검색 결과가 없어요'}</p>
            </S.Empty>
          )}
        </S.Sheet>
      </S.Content>
    </S.Overlay>
  )
}
