import { defaultFetchConfig, expectResponseCode, getApiUrl } from '../utils'
import { UserResponse, UserResponseCacheEntry } from './types'

const CACHE_TIME_SECONDS = 600
const userResponseCache = new Map<string, UserResponseCacheEntry>()

export const getUserById = async (userid: string): Promise<UserResponse> => {
  const cacheEntry = userResponseCache.get(userid)
  if (cacheEntry && cacheEntry.timestamp < Date.now() - CACHE_TIME_SECONDS) {
    return cacheEntry.userData
  }
  const response = await fetch(`${getApiUrl()}/users/${userid}`, {
    ...defaultFetchConfig
  })
  expectResponseCode(response)
  const userData = (await response.json()) as UserResponse
  userResponseCache.set(userid, {
    timestamp: Date.now(),
    userData
  })
  return userData
}
