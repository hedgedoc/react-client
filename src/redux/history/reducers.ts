/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Reducer } from 'redux'
import {
  AddEntryAction,
  HistoryAction,
  HistoryActionType,
  HistoryEntry,
  RemoveEntryAction,
  SetEntriesAction,
  UpdateEntryAction
} from './types'
import { mergeHistoryEntries } from './methods'

// The history reducer will be created without entries because of async entry retrieval.
// Entries will be added after reducer initialization.

export const HistoryReducer: Reducer<HistoryEntry[], HistoryAction> = (state: HistoryEntry[] = [], action: HistoryAction) => {
  switch (action.type) {
    case HistoryActionType.SET_ENTRIES:
      return (action as SetEntriesAction).entries
    case HistoryActionType.ADD_ENTRY:
      return mergeHistoryEntries(state, [(action as AddEntryAction).newEntry])
    case HistoryActionType.UPDATE_ENTRY:
      return [
        ...state.filter(entry => entry.identifier !== (action as UpdateEntryAction).noteId),
        (action as UpdateEntryAction).newEntry
      ]
    case HistoryActionType.REMOVE_ENTRY:
      return state.filter(entry => entry.identifier !== (action as RemoveEntryAction).noteId)
    default:
      return state
  }
}
