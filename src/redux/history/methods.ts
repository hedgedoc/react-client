/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { store } from '../index'
import {
  HistoryActionType,
  HistoryEntry,
  HistoryEntryOrigin,
  HistoryExportJson,
  RemoveEntryAction,
  SetEntriesAction,
  UpdateEntryAction,
  V1HistoryEntry
} from './types'
import { download } from '../../components/common/download/download'
import { DateTime } from 'luxon'
import {
  deleteHistory,
  deleteHistoryEntry,
  getHistory,
  postHistory,
  updateHistoryEntryPinStatus
} from '../../api/history'
import {
  historyEntryDtoToHistoryEntry,
  historyEntryToHistoryEntryPutDto,
  historyEntryToHistoryEntryUpdateDto
} from '../../api/history/dto-methods'

type ErrorHandler = (message: string) => void

export const setHistoryEntries = (entries: HistoryEntry[], onError?: ErrorHandler): void => {
  store.dispatch({
    type: HistoryActionType.SET_ENTRIES,
    entries
  } as SetEntriesAction)
  storeLocalHistory()
  storeRemoteHistory(onError)
}

export const deleteAllHistoryEntries = (onError?: ErrorHandler): void => {
  store.dispatch({
    type: HistoryActionType.SET_ENTRIES,
    entries: []
  })
  storeLocalHistory()
  deleteHistory().catch(error => {
    if (onError) {
      onError(error)
    }
    console.error(error)
  })
}

export const updateLocalHistoryEntry = (noteId: string, newEntry: HistoryEntry): void => {
  store.dispatch({
    type: HistoryActionType.UPDATE_ENTRY,
    noteId,
    newEntry
  } as UpdateEntryAction)
  storeLocalHistory()
}

export const removeHistoryEntry = (noteId: string, onError?: ErrorHandler): void => {
  const entryToDelete = store.getState().history.find(entry => entry.identifier === noteId)
  if (entryToDelete && entryToDelete.origin === HistoryEntryOrigin.REMOTE) {
    deleteHistoryEntry(noteId).catch(error => {
      if (onError) {
        onError(error)
      }
      console.error(error)
    })
  }
  store.dispatch({
    type: HistoryActionType.REMOVE_ENTRY,
    noteId
  } as RemoveEntryAction)
  storeLocalHistory()
}

export const toggleHistoryEntryPinning = (noteId: string, onError?: ErrorHandler): void => {
  const state = store.getState().history
  const entryToUpdate = state.find(entry => entry.identifier === noteId)
  if (!entryToUpdate) {
    return
  }
  if (entryToUpdate.pinStatus === undefined) {
    entryToUpdate.pinStatus = false
  }
  entryToUpdate.pinStatus = !entryToUpdate.pinStatus
  if (entryToUpdate.origin === HistoryEntryOrigin.LOCAL) {
    updateLocalHistoryEntry(noteId, entryToUpdate)
  } else {
    const historyUpdateDto = historyEntryToHistoryEntryUpdateDto(entryToUpdate)
    updateHistoryEntryPinStatus(noteId, historyUpdateDto).catch(error => {
      if (onError) {
        onError(error)
      }
      console.error(error)
    })
  }
}

export const downloadHistory = (): void => {
  const history = store.getState().history
  history.forEach((entry: Partial<HistoryEntry>) => {
    delete entry.origin
  })
  const json = JSON.stringify({
    version: 2,
    entries: history
  } as HistoryExportJson)
  download(json, `history_${ Date.now() }.json`, 'application/json')
}

export const mergeHistoryEntries = (a: HistoryEntry[], b: HistoryEntry[]): HistoryEntry[] => {
  const noDuplicates = a.filter(entryA => !b.some(entryB => entryA.identifier === entryB.identifier))
  return noDuplicates.concat(b)
}

export const convertV1History = (oldHistory: V1HistoryEntry[]): HistoryEntry[] => {
  return oldHistory.map(entry => ({
    identifier: entry.id,
    title: entry.text,
    tags: entry.tags,
    lastVisited: DateTime.fromMillis(entry.time)
                         .toISO(),
    pinStatus: entry.pinned,
    origin: HistoryEntryOrigin.LOCAL
  }))
}

export const refreshHistoryState = (): void => {
  let entries = loadLocalHistory()
  loadRemoteHistory().then(remoteEntries => {
    entries = mergeHistoryEntries(entries, remoteEntries)
  }).catch(error => {
    console.error(`Error fetching remote history entries: ${ String(error) }`)
  }).finally(() => {
    setHistoryEntries(entries)
  })
}

export const storeLocalHistory = (): void => {
  const history = store.getState().history
  const localEntries = history.filter(entry => entry.origin === HistoryEntryOrigin.LOCAL)
  const entriesWithoutOrigin = localEntries.map(entry => ({
    ...entry,
    origin: undefined
  }))
  window.localStorage.setItem('history', JSON.stringify(entriesWithoutOrigin))
}

export const storeRemoteHistory = (onError?: ErrorHandler): void => {
  if (!store.getState().user) {
    return
  }
  const history = store.getState().history
  const remoteEntries = history.filter(entry => entry.origin === HistoryEntryOrigin.REMOTE)
  const remoteEntryDtos = remoteEntries.map(historyEntryToHistoryEntryPutDto)
  postHistory(remoteEntryDtos).catch(error => {
    const msg = `Error storing history entries to server: ${ String(error) }`
    if (onError) {
      onError(msg)
    }
    console.error(msg)
  })
}

const loadLocalHistory = (): HistoryEntry[] => {
  const localJson = window.localStorage.getItem('history')
  const localV1Json = window.localStorage.getItem('notehistory')

  if (localV1Json) {
    try {
      const localV1History = JSON.parse(JSON.parse(localV1Json)) as V1HistoryEntry[]
      window.localStorage.removeItem('notehistory')
      return convertV1History(localV1History)
    } catch (error) {
      console.error(`Error parsing converting old history entries: ${ String(error) }`)
      return []
    }
  }

  if (!localJson) {
    return []
  }

  try {
    const localHistory = JSON.parse(localJson) as HistoryEntry[]
    localHistory.forEach(entry => {
      entry.origin = HistoryEntryOrigin.LOCAL
    })
    return localHistory
  } catch (error) {
    console.error(`Error parsing local stored history entries: ${ String(error) }`)
    return []
  }
}

const loadRemoteHistory = async (): Promise<HistoryEntry[]> => {
  try {
    const remoteHistory = await getHistory()
    return remoteHistory.map(historyEntryDtoToHistoryEntry)
  } catch (error) {
    console.error(`Error fetching history entries from server: ${ String(error) }`)
    return []
  }
}
