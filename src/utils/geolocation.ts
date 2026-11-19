const POSITION_TIMEOUT_MS = 10_000
const PROMPT_TIMEOUT_MS = 15_000

export class PositionTimeoutError extends Error {
  constructor() {
    super('위치를 확인하지 못했어요. 잠시 후 다시 시도해 주세요')
  }
}

export function getCurrentPosition() {
  return new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('이 기기에서는 위치를 확인할 수 없어요'))
      return
    }

    const timer = setTimeout(() => reject(new PositionTimeoutError()), PROMPT_TIMEOUT_MS)

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        clearTimeout(timer)
        resolve({ latitude: coords.latitude, longitude: coords.longitude })
      },
      (error) => {
        clearTimeout(timer)
        reject(error)
      },
      { enableHighAccuracy: false, timeout: POSITION_TIMEOUT_MS, maximumAge: 5 * 60 * 1000 },
    )
  })
}
