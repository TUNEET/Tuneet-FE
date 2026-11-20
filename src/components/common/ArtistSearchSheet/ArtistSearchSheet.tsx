import { useEffect, useState } from 'react'
import { searchArtists } from '@/apis/music'
import plusCircleRoseIcon from '@/assets/icons/plus-circle-rose.svg'
import characterImage from '@/assets/images/character-search.webp'
import { PageArrow } from '@/components/common/SongSearchSheet/SongSearchSheet'
import { CoverImage } from '@/components/common/CoverImage/CoverImage'
import { usePagedSearch } from '@/hooks/usePagedSearch'
import { useToast } from '@/hooks/useToast'
import type { ArtistSearchItem, ProfileArtist } from '@/types/music'
import * as S from './ArtistSearchSheet.styles'

const PAGE_SIZE = 5

const getArtistImage = ({ artistImage }: ArtistSearchItem) => artistImage

type ArtistSearchSheetProps = {
  /** false를 돌려주면 추가되지 않은 것으로 보고 '추가되었습니다' 토스트를 띄우지 않는다 */
  onAdd: (artist: ProfileArtist) => boolean | void
  onClose: () => void
  addedIds?: string[]
}

export function ArtistSearchSheet({ onAdd, onClose, addedIds }: ArtistSearchSheetProps) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const showToast = useToast()
  const [sheetAddedIds, setSheetAddedIds] = useState<string[]>([])
  const isAdded = (id: string) => (addedIds ?? sheetAddedIds).includes(id)
  const keyword = query.trim()
  const { result, isError } = usePagedSearch({
    search: searchArtists,
    keyword,
    page,
    pageSize: PAGE_SIZE,
    getImage: getArtistImage,
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const addArtist = (artist: ArtistSearchItem) => {
    if (isAdded(artist.id)) return
    if (onAdd({ id: artist.id, name: artist.name, image: artist.artistImage }) === false) return
    setSheetAddedIds((ids) => [...ids, artist.id])
    showToast('아티스트가 추가되었습니다.')
  }

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
                  <S.ResultSong disabled={isAdded(artist.id)} onClick={() => addArtist(artist)}>
                    <CoverImage src={artist.artistImage} />
                    <span>
                      {artist.name}
                      {artist.disambiguation && ` (${artist.disambiguation})`}
                    </span>
                  </S.ResultSong>
                  {!isAdded(artist.id) && (
                    <S.AddButton
                      type="button"
                      aria-label={`${artist.name} 추가`}
                      onClick={() => addArtist(artist)}
                    >
                      <img src={plusCircleRoseIcon} alt="" width={16} height={16} />
                    </S.AddButton>
                  )}
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
