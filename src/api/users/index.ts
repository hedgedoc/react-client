import { defaultFetchConfig, expectResponseCode, getApiUrl } from '../utils'
import { UserResponse } from './types'
import { CacheEntry } from '../types'

const CACHE_TIME_SECONDS = 600
const userResponseCache = new Map<string, CacheEntry<UserResponse>>()

export const getUserById = async (userid: string): Promise<UserResponse> => {
  const cacheEntry = userResponseCache.get(userid)
  if (cacheEntry && cacheEntry.timestamp < Date.now() - CACHE_TIME_SECONDS) {
    return cacheEntry.data
  }
  const response = await fetch(`${getApiUrl()}/users/${userid}`, {
    ...defaultFetchConfig
  })
  expectResponseCode(response)
  const userData = (await response.json()) as UserResponse
  userResponseCache.set(userid, {
    timestamp: Date.now(),
    data: userData
  })
  return userData
}
