const HANGUL_START = 0xac00
const HANGUL_END = 0xd7a3

// 한국어로 읽었을 때 받침이 있는 알파벳(엘, 엠, 엔, 알)과 숫자(영, 일, 삼, 육, 칠, 팔)
const ALPHABETS_WITH_BATCHIM = 'lmnr'
const DIGITS_WITH_BATCHIM = '013678'

function hasBatchim(word: string) {
  const last = word.trim().at(-1)
  if (!last) return false

  const code = last.charCodeAt(0)
  if (code >= HANGUL_START && code <= HANGUL_END) {
    return (code - HANGUL_START) % 28 !== 0
  }

  const lower = last.toLowerCase()
  return ALPHABETS_WITH_BATCHIM.includes(lower) || DIGITS_WITH_BATCHIM.includes(lower)
}

export function getObjectParticle(word: string) {
  return hasBatchim(word) ? '을' : '를'
}
