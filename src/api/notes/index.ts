/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { doApiCall, extractJsonResponse, getApiResponse, sendApiData } from '../utils'
import type { Note } from './types'
import type { MediaUpload } from '../media/types'

/**
 * Retrieves the content and metadata about the specified note.
 * @param noteIdOrAlias The id or alias of the note.
 * @return Content and metadata of the specified note.
 */
export const getNote = (noteIdOrAlias: string): Promise<Note> => {
  return getApiResponse<Note>('notes/' + noteIdOrAlias)
}

/**
 * Returns a list of media objects associated with the specified note.
 * @param noteIdOrAlias The id or alias of the note.
 * @return List of media object metadata associated with specified note.
 */
export const getMediaForNote = (noteIdOrAlias: string): Promise<MediaUpload[]> => {
  return getApiResponse<MediaUpload[]>(`notes/${noteIdOrAlias}/media`)
}

/**
 * Creates a new note with a given markdown content.
 * @param markdown The content of the new note.
 * @return Content and metadata of the new note.
 */
export const createNote = async (markdown: string): Promise<Note> => {
  const response = await doApiCall(
    'notes',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'text/markdown'
      },
      body: markdown
    },
    201
  )
  return extractJsonResponse<Note>(response)
}

/**
 * Creates a new note with a given markdown content and a defined primary alias.
 * @param markdown The content of the new note.
 * @param primaryAlias The primary alias of the new note.
 * @return Content and metadata of the new note.
 */
export const createNoteWithPrimaryAlias = async (markdown: string, primaryAlias: string): Promise<Note> => {
  const response = await doApiCall(
    'notes/' + primaryAlias,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'text/markdown'
      },
      body: markdown
    },
    201
  )
  return extractJsonResponse<Note>(response)
}

/**
 * Deletes the specified note.
 * @param noteIdOrAlias The id or alias of the note to delete.
 */
export const deleteNote = (noteIdOrAlias: string): Promise<unknown> => {
  return sendApiData<undefined>('notes/' + noteIdOrAlias, 'DELETE', undefined, 204)
}
