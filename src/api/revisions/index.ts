import { CacheEntry } from '../types'
import { defaultFetchConfig, expectResponseCode, getApiUrl } from '../utils'
import { Revision, RevisionListEntry } from './types'

const CACHE_TIME_SECONDS = 3600
const revisionCache = new Map<string, CacheEntry<Revision>>()

export const getRevision = async (noteId: string, timestamp: number): Promise<Revision> => {
  const cacheEntry = revisionCache.get(`${noteId}:${timestamp}`)
  if (cacheEntry && cacheEntry.timestamp < Date.now() - CACHE_TIME_SECONDS) {
    return cacheEntry.data
  }
  const response = await fetch(getApiUrl() + `/notes/${noteId}/revisions/${timestamp}`, {
    ...defaultFetchConfig
  })
  expectResponseCode(response)
  const revisionData = await response.json() as Revision
  revisionCache.set(`${noteId}:${timestamp}`, {
    timestamp: Date.now(),
    data: revisionData
  })
  return revisionData
}

export const getAllRevisions = async (noteId: string): Promise<RevisionListEntry[]> => {
  // TODO Change 'revisions-list' to 'revisions' as soon as the backend is ready to serve some data!
  const response = await fetch(getApiUrl() + `/notes/${noteId}/revisions-list`, {
    ...defaultFetchConfig
  })
  expectResponseCode(response)
  return await response.json() as Promise<RevisionListEntry[]>
}
