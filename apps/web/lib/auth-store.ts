const STORAGE_KEY = 'access_token'

let accessToken: string | null =
  typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null

export function getAccessToken(): string | null {
  return accessToken
}

export function setAccessToken(token: string | null): void {
  accessToken = token
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem(STORAGE_KEY, token)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }
}
