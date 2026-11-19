import { useRef } from 'react'
import { getApiError } from '@/apis/error'
import { likeMusic, unlikeMusic } from '@/apis/music'
import { useToast } from './useToast'

type LikeableItem = ({ song: { musicId: string } } | { music: { musicId: string } }) & {
  liked: boolean
}

const getMusicId = (item: LikeableItem) => ('song' in item ? item.song : item.music).musicId

export type LikeUpdater = <T extends LikeableItem>(items: T[]) => T[]

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
