/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { store } from '../index'
import {
  AddEntryAction,
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
import { getHistory, setHistory } from '../../api/history'

export const setHistoryEntries = (entries: HistoryEntry[]): void => {
  store.dispatch({
    type: HistoryActionType.SET_ENTRIES,
    entries
  } as SetEntriesAction)
  storeHistory()
}

export const addHistoryEntry = (newEntry: HistoryEntry): void => {
  store.dispatch({
    type: HistoryActionType.ADD_ENTRY,
    newEntry
  } as AddEntryAction)
  storeHistory()
}

export const updateHistoryEntry = (noteId: string, newEntry: HistoryEntry): void => {
  store.dispatch({
    type: HistoryActionType.UPDATE_ENTRY,
    noteId,
    newEntry
  } as UpdateEntryAction)
  storeHistory()
}

export const removeHistoryEntry = (noteId: string): void => {
  store.dispatch({
    type: HistoryActionType.REMOVE_ENTRY,
    noteId
  } as RemoveEntryAction)
  storeHistory()
}

export const toggleHistoryEntryPinning = (noteId: string): void => {
  const state = store.getState().history
  const entryToUpdate = state.find(entry => entry.id === noteId)
  if (!entryToUpdate) {
    return
  }
  if (entryToUpdate.pinned === undefined) {
    entryToUpdate.pinned = false
  }
  entryToUpdate.pinned = !entryToUpdate.pinned
  updateHistoryEntry(noteId, entryToUpdate)
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
  const noDuplicates = a.filter(entryA => !b.some(entryB => entryA.id === entryB.id))
  return noDuplicates.concat(b)
}

export const convertV1History = (oldHistory: V1HistoryEntry[]): HistoryEntry[] => {
  return oldHistory.map(entry => ({
    id: entry.id,
    title: entry.text,
    tags: entry.tags,
    lastVisited: DateTime.fromMillis(entry.time)
                         .toISO(),
    pinned: entry.pinned,
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

export const storeHistory = (): void => {
  const history = store.getState().history
  const localEntries = history.filter(entry => entry.origin === HistoryEntryOrigin.LOCAL)
  const remoteEntries = history.filter(entry => entry.origin === HistoryEntryOrigin.REMOTE)

  const localJson = JSON.stringify(localEntries.map(entry => ({
    ...entry,
    origin: undefined
  })))
  window.localStorage.setItem('history', localJson)

  if (!store.getState().user) {
    return
  }
  setHistory(remoteEntries.map(entry => ({
    ...entry,
    origin: undefined
  }))).catch(error => {
    console.error(`Error storing history entries to server: ${ String(error) }`)
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
    remoteHistory.forEach(entry => {
      entry.origin = HistoryEntryOrigin.REMOTE
    })
    return remoteHistory
  } catch (error) {
    console.error(`Error fetching history entries from server: ${ String(error) }`)
    return []
  }
}
