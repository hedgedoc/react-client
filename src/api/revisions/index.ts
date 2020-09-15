import { defaultFetchConfig, expectResponseCode, getApiUrl } from '../utils'
import { Revision, RevisionListEntry } from './types'

export const getRevision = async (noteId: string, timestamp: number): Promise<Revision> => {
  const response = await fetch(getApiUrl() + `/notes/${noteId}/revisions/${timestamp}`, {
    ...defaultFetchConfig
  })
  expectResponseCode(response)
  return await response.json() as Promise<Revision>
}

export const getAllRevisions = async (noteId: string): Promise<RevisionListEntry[]> => {
  // TODO Change 'revisions-list' to 'revisions' as soon as the backend is ready to serve some data!
  const response = await fetch(getApiUrl() + `/notes/${noteId}/revisions-list`, {
    ...defaultFetchConfig
  })
  expectResponseCode(response)
  return await response.json() as Promise<RevisionListEntry[]>
}
