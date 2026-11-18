import { useRef } from 'react'
import { getApiError } from '@/apis/error'
import { likeMusic, unlikeMusic } from '@/apis/music'
import { useToast } from './useToast'

type LikeableItem = ({ song: { musicId: string } } | { music: { musicId: string } }) & {
  liked: boolean
}

const getMusicId = (item: LikeableItem) => ('song' in item ? item.song : item.music).musicId

export type LikeUpdater = <T extends LikeableItem>(items: T[]) => T[]

/**
 * 좋아요는 곡 단위라 같은 곡이 있는 항목의 하트를 모두 함께 바꾼다.
 * applyToLists: 받은 updater를 하트를 맞출 목록의 setState에 넘긴다
 */
export function useMusicLike(applyToLists: (update: LikeUpdater) => void) {
  const showToast = useToast()
  const pendingRef = useRef(new Set<string>())

  return async (target: LikeableItem) => {
    const musicId = getMusicId(target)
    const { liked } = target
    if (pendingRef.current.has(musicId)) return
    pendingRef.current.add(musicId)

    const setSongLiked = (next: boolean) =>
      applyToLists((items) =>
        items.map((item) => (getMusicId(item) === musicId ? { ...item, liked: next } : item)),
      )

    setSongLiked(!liked)
    try {
      await (liked ? unlikeMusic(musicId) : likeMusic(musicId))
    } catch (error) {
      setSongLiked(liked)
      showToast(getApiError(error).message)
    } finally {
      pendingRef.current.delete(musicId)
    }
  }
}
