import type { SettingsResponse } from '@/types/user'

export type Settings = {
  locationVisible: boolean
  letterEnabled: boolean
  platformLinked: boolean
  terms: Record<string, boolean>
}

export const toSettings = (response: SettingsResponse): Settings => ({
  locationVisible: response.locationVisible,
  letterEnabled: response.letterReceivable,
  platformLinked: response.platformConnected,
  terms: {
    termsOfService: response.termsAgreed,
    privacyPolicy: response.privacyAgreed,
    locationConsent: response.locationAgreed,
  },
})
