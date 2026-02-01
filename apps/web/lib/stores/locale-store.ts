import { create } from 'zustand'

export type Locale = 'ko' | 'en'

export interface LocaleStore {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: 'ko',
  setLocale: (locale) => set({ locale }),
}))
