/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { ChangePinStatusDto, HistoryEntry, HistoryEntryPutDto } from './types'
import { GetApiRequestBuilder } from '../common/api-request-builder/get-api-request-builder'
import { PostApiRequestBuilder } from '../common/api-request-builder/post-api-request-builder'
import { PutApiRequestBuilder } from '../common/api-request-builder/put-api-request-builder'
import { DeleteApiRequestBuilder } from '../common/api-request-builder/delete-api-request-builder'

/**
 * Fetches the remote history for the user from the server.
 * @return The remote history entries of the user.
 */
export const getRemoteHistory = async (): Promise<HistoryEntry[]> => {
  const response = await new GetApiRequestBuilder<HistoryEntry[]>('me/history').sendRequest()
  return response.asParsedJsonObject()
}

/**
 * Replaces the remote history of the user with the given history entries.
 * @param entries The history entries to store remotely.
 */
export const setRemoteHistoryEntries = async (entries: HistoryEntryPutDto[]): Promise<void> => {
  await new PostApiRequestBuilder<void, HistoryEntryPutDto[]>('me/history').withJsonBody(entries).sendRequest()
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
  const response = await new PutApiRequestBuilder<HistoryEntry, ChangePinStatusDto>('me/history/' + noteIdOrAlias)
    .withJsonBody({
      pinStatus
    })
    .sendRequest()
  return response.asParsedJsonObject()
}

/**
 * Deletes a remote history entry.
 * @param noteIdOrAlias The note id or alias of the history entry to remove.
 */
export const deleteRemoteHistoryEntry = async (noteIdOrAlias: string): Promise<void> => {
  await new DeleteApiRequestBuilder('me/history/' + noteIdOrAlias).sendRequest()
}

/**
 * Deletes the complete remote history.
 */
export const deleteRemoteHistory = async (): Promise<void> => {
  await new DeleteApiRequestBuilder('me/history').sendRequest()
}
