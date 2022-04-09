/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { doApiDeleteRequest, doApiPostRequest } from '../request-utils'
import { doApiGetRequestWithJsonResponse, doApiPostRequestWithJsonResponse } from '../request-utils/with-json-response'
import type { ChangePinStatusDto, HistoryEntry, HistoryEntryPutDto } from './types'

/**
 * Fetches the remote history for the user from the server.
 * @return The remote history entries of the user.
 */
export const getRemoteHistory = (): Promise<HistoryEntry[]> => {
  return doApiGetRequestWithJsonResponse<HistoryEntry[]>('me/history')
}

/**
 * Replaces the remote history of the user with the given history entries.
 * @param entries The history entries to store remotely.
 */
export const setRemoteHistoryEntries = (entries: HistoryEntryPutDto[]): Promise<unknown> => {
  return doApiPostRequest<HistoryEntryPutDto[]>('me/history', entries)
}

/**
 * Updates a remote history entry's pin state.
 * @param noteIdOrAlias The note id for which to update the pinning state.
 * @param pinStatus True when the note should be pinned, false otherwise.
 */
export const updateRemoteHistoryEntryPinStatus = (noteIdOrAlias: string, pinStatus: boolean): Promise<HistoryEntry> => {
  return doApiPostRequestWithJsonResponse<ChangePinStatusDto, HistoryEntry>('me/history/' + noteIdOrAlias, {
    pinStatus
  })
}

/**
 * Deletes a remote history entry.
 * @param noteIdOrAlias The note id or alias of the history entry to remove.
 */
export const deleteRemoteHistoryEntry = (noteIdOrAlias: string): Promise<unknown> => {
  return doApiDeleteRequest('me/history/' + noteIdOrAlias)
}

/**
 * Deletes the complete remote history.
 */
export const deleteRemoteHistory = async (): Promise<unknown> => {
  return doApiDeleteRequest('me/history')
}
