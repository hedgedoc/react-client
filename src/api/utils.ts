import { getMe } from './me'
import { setUser } from '../redux/user/methods'
import { store } from '../utils/store'

export const defaultFetchConfig: Partial<RequestInit> = {
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer'
}

// TODO: move to component util
export const getAndSetUser: () => (Promise<void>) = async () => {
  const me = await getMe()
  setUser({
    id: me.id,
    name: me.name,
    photo: me.photo,
    provider: me.provider
  })
}

export const getApiUrl = (): string => {
  return store.getState().apiUrl.apiUrl
}

export const expectResponseCode = (response: Response, code = 200): void => {
  if (response.status !== code) {
    throw new Error(`response code is not ${code}`)
  }
}
