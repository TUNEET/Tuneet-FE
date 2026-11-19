import { useEffect, useId, useState } from 'react'
import plusCircleBlueIcon from '@/assets/icons/plus-circle-blue.svg'
import plusCircleRoseIcon from '@/assets/icons/plus-circle-rose.svg'
import plusCircleIcon from '@/assets/icons/plus-circle.svg'
import characterMusicSearch from '@/assets/images/character-music-search.png'
import characterProfileSearch from '@/assets/images/character-search.webp'
import { searchMusics } from '@/apis/music'
import type { MusicSearchItem, SearchedSong } from '@/types/music'
import * as S from './SongSearchSheet.styles'
import type { SongSearchSheetVariant } from './SongSearchSheet.styles'
import { CoverImage } from '@/components/common/CoverImage/CoverImage'
import { usePagedSearch } from '@/hooks/usePagedSearch'
import { useToast } from '@/hooks/useToast'

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

const getCoverUrl = ({ coverUrl }: MusicSearchItem) => coverUrl

const toSearchedSong = ({ id, title, artist, coverUrl }: MusicSearchItem): SearchedSong => ({
  musicId: id,
  title,
  artist,
  albumImageUrl: coverUrl ?? '',
})

type SongSearchSheetProps = {
  onAdd: (song: SearchedSong) => void | boolean | Promise<void | boolean>
  onClose: () => void
  variant?: SongSearchSheetVariant
  title?: string
  hiddenTitle?: string
  /** 이미 고른 곡의 musicId. 넘기지 않으면 이 시트에서 추가한 곡만 추가된 것으로 본다 */
  addedIds?: string[]
}

export function SongSearchSheet({
  onAdd,
  onClose,
  variant = 'playlist',
  title,
  hiddenTitle,
  addedIds,
}: SongSearchSheetProps) {
  const titleId = useId()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const showToast = useToast()
  const [sheetAddedIds, setSheetAddedIds] = useState<string[]>([])
  const isAdded = (id: string) => (addedIds ?? sheetAddedIds).includes(id)
  const keyword = query.trim()
  const { result, isError } = usePagedSearch({
    search: searchMusics,
    keyword,
    page,
    pageSize: PAGE_SIZE,
    getImage: getCoverUrl,
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleAdd = async (item: MusicSearchItem) => {
    if (isAdded(item.id)) return
    const result = await onAdd(toSearchedSong(item))
    if (result === false) return
    setSheetAddedIds((ids) => [...ids, item.id])
    showToast('노래가 추가되었습니다.')
  }

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
            {hiddenTitle ?? title ?? (isPlaylist ? '플레이리스트' : '프로필')}
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
                  <S.ResultSong disabled={isAdded(song.id)} onClick={() => handleAdd(song)}>
                    <CoverImage src={song.coverUrl} />
                    <span>
                      {song.title} - {song.artist}
                    </span>
                  </S.ResultSong>
                  {/* 이미 추가된 곡은 플러스를 숨긴다 */}
                  {!isAdded(song.id) && (
                    <S.AddButton
                      type="button"
                      aria-label={`${song.title} 추가`}
                      onClick={() => handleAdd(song)}
                    >
                      <img src={ADD_ICONS[variant]} alt="" width={16} height={16} />
                    </S.AddButton>
                  )}
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
