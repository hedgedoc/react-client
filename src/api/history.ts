import { HistoryEntry } from '../components/landing/pages/history/history'
import { expectResponseCode, getBackendUrl } from '../utils/apiUtils'

export const getHistory = async (): Promise<HistoryEntry[]> => {
  const response = await fetch(getBackendUrl() + '/history')
  expectResponseCode(response)
  return await response.json() as Promise<HistoryEntry[]>
}

export const setHistory = async (entries: HistoryEntry[]): Promise<void> => {
  const response = await fetch(getBackendUrl() + '/history', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      history: entries
    })
  })
  expectResponseCode(response)
}

export const deleteHistory = async (): Promise<void> => {
  const response = await fetch(getBackendUrl() + '/history', {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
  expectResponseCode(response)
}

export const updateHistoryEntry = async (noteId: string, entry: HistoryEntry): Promise<HistoryEntry> => {
  const response = await fetch(getBackendUrl() + '/history/' + noteId, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(entry)
  })
  expectResponseCode(response)
  return await response.json() as Promise<HistoryEntry>
}

export const deleteHistoryEntry = async (noteId: string): Promise<void> => {
  const response = await fetch(getBackendUrl() + '/history/' + noteId, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
  expectResponseCode(response)
}
