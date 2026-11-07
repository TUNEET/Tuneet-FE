import { TERMS } from '@/pages/signup/terms'

export const DEFAULT_SETTINGS = {
  locationVisible: true,
  letterEnabled: true,
  platformLinked: true,
  terms: Object.fromEntries(TERMS.map(({ id }) => [id, true])) as Record<string, boolean>,
}

export type Settings = typeof DEFAULT_SETTINGS
