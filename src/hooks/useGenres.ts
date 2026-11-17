import { useEffect, useMemo, useState } from 'react'
import { getGenres } from '@/apis/genre'
import { DEFAULT_GENRES, GENRE_ROW_SIZE } from '@/constants/genres'

/**
 * 화면에서는 장르를 표시 이름으로 고르고, 저장할 때 서버 값으로 바꾼다.
 * rows: 칩을 그릴 표시 이름 줄 목록, toGenreName: 표시 이름 → 서버 값
 */
export function useGenres() {
  const [genres, setGenres] = useState(DEFAULT_GENRES)

  useEffect(() => {
    let isStale = false

    getGenres()
      .then((data) => {
        if (!isStale && data.length > 0) setGenres(data)
      })
      .catch(() => {})

    return () => {
      isStale = true
    }
  }, [])

  return useMemo(() => {
    const names = genres.map(({ displayName }) => displayName)
    const rows = Array.from({ length: Math.ceil(names.length / GENRE_ROW_SIZE) }, (_, index) =>
      names.slice(index * GENRE_ROW_SIZE, (index + 1) * GENRE_ROW_SIZE),
    )
    const nameByDisplay = new Map(
      genres.map(({ displayName, genreName }) => [displayName, genreName]),
    )
    const toGenreName = (displayName: string) => nameByDisplay.get(displayName) ?? displayName

    return { rows, toGenreName }
  }, [genres])
}
