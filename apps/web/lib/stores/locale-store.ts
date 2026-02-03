import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Locale = 'ko' | 'en'

export const LOCALES: readonly Locale[] = ['ko', 'en'] as const

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
}

export interface LocaleStore {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: 'ko',
      setLocale: (locale) => set({ locale }),
    }),
    { name: 'locale' }
  )
)
