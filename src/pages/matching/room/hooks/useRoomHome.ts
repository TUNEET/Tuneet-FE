import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getApiError } from '@/apis/error'
import { getRoomHome } from '@/apis/room'
import type { LikeUpdater } from '@/hooks/useMusicLike'
import { useToast } from '@/hooks/useToast'
import type { RoomDetail } from '@/types/room'

export function useRoomHome() {
  const showToast = useToast()
  const { roomId } = useParams()
  const id = Number(roomId)
  const isValidId = Number.isInteger(id) && id > 0
  const [room, setRoom] = useState<RoomDetail | null | undefined>(undefined)

  useEffect(() => {
    if (!isValidId) return
    let isStale = false

    getRoomHome(id)
      .then((data) => {
        if (!isStale) setRoom(data)
      })
      .catch((error) => {
        if (isStale) return
        setRoom(null)
        showToast(getApiError(error).message)
      })

    return () => {
      isStale = true
    }
  }, [id, isValidId, showToast])

  const updateLikes = useCallback(
    (update: LikeUpdater) =>
      setRoom((prev) =>
        prev ? { ...prev, feeds: update(prev.feeds), playlist: update(prev.playlist) } : prev,
      ),
    [],
  )

  return {
    roomId: id,
    updateLikes,
    room: isValidId ? room : null,
    isLoading: isValidId && room === undefined,
  }
}
