import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Locale = 'ko' | 'en'

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
