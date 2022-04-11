/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { ApiRequest } from '../common/api-request'
import type { ChangePinStatusDto, HistoryEntry, HistoryEntryPutDto } from './types'

/**
 * Fetches the remote history for the user from the server.
 * @return The remote history entries of the user.
 */
export const getRemoteHistory = async (): Promise<HistoryEntry[]> => {
  const response = await new ApiRequest('me/history').sendGetRequest()
  return response.getResponseJson<HistoryEntry[]>()
}

/**
 * Replaces the remote history of the user with the given history entries.
 * @param entries The history entries to store remotely.
 */
export const setRemoteHistoryEntries = async (entries: HistoryEntryPutDto[]): Promise<void> => {
  await new ApiRequest('me/history').withJsonBody<HistoryEntryPutDto[]>(entries).sendPostRequest()
}

/**
 * Updates a remote history entry's pin state.
 * @param noteIdOrAlias The note id for which to update the pinning state.
 * @param pinStatus True when the note should be pinned, false otherwise.
 */
export const updateRemoteHistoryEntryPinStatus = async (
  noteIdOrAlias: string,
  pinStatus: boolean
): Promise<HistoryEntry> => {
  const response = await new ApiRequest('me/history/' + noteIdOrAlias)
    .withJsonBody<ChangePinStatusDto>({
      pinStatus
    })
    .sendPutRequest()
  return response.getResponseJson<HistoryEntry>()
}

/**
 * Deletes a remote history entry.
 * @param noteIdOrAlias The note id or alias of the history entry to remove.
 */
export const deleteRemoteHistoryEntry = async (noteIdOrAlias: string): Promise<void> => {
  await new ApiRequest('me/history/' + noteIdOrAlias).sendDeleteRequest()
}

/**
 * Deletes the complete remote history.
 */
export const deleteRemoteHistory = async (): Promise<void> => {
  await new ApiRequest('me/history').sendDeleteRequest()
}
