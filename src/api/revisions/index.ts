/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { getApiResponse, sendApiData } from '../utils'
import type { RevisionDetails, RevisionMetadata } from './types'

/**
 * Retrieves a note revision while using a cache for often retrieved revisions.
 * @param noteId The id of the note for which to fetch the revision.
 * @param revisionId The id of the revision to fetch.
 * @return The revision.
 */
export const getRevision = (noteId: string, revisionId: number): Promise<RevisionDetails> => {
  return getApiResponse<RevisionDetails>(`notes/${noteId}/revisions/${revisionId}`)
}

/**
 * Retrieves a list of all revisions stored for a given note.
 * @param noteId The id of the note for which to look up the stored revisions.
 * @return A list of revision ids.
 */
export const getAllRevisions = (noteId: string): Promise<RevisionMetadata[]> => {
  return getApiResponse<RevisionMetadata[]>(`notes/${noteId}/revisions`)
}

/**
 * Deletes all revisions for a note.
 * @param noteIdOrAlias The id or alias of the note to delete all revisions for.
 */
export const deleteRevisionsForNote = async (noteIdOrAlias: string): Promise<unknown> => {
  return sendApiData<undefined>(`notes/${noteIdOrAlias}/revisions`, 'DELETE', undefined, 204)
}
