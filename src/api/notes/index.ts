/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { doApiDeleteRequest } from '../request-utils'
import type { Note } from './types'
import type { MediaUpload } from '../media/types'
import { doApiGetRequestWithJsonResponse, doApiPostRequestWithJsonResponse } from '../request-utils/with-json-response'

/**
 * Retrieves the content and metadata about the specified note.
 * @param noteIdOrAlias The id or alias of the note.
 * @return Content and metadata of the specified note.
 */
export const getNote = (noteIdOrAlias: string): Promise<Note> => {
  return doApiGetRequestWithJsonResponse<Note>('notes/' + noteIdOrAlias)
}

/**
 * Returns a list of media objects associated with the specified note.
 * @param noteIdOrAlias The id or alias of the note.
 * @return List of media object metadata associated with specified note.
 */
export const getMediaForNote = (noteIdOrAlias: string): Promise<MediaUpload[]> => {
  return doApiGetRequestWithJsonResponse<MediaUpload[]>(`notes/${noteIdOrAlias}/media`)
}

/**
 * Creates a new note with a given markdown content.
 * @param markdown The content of the new note.
 * @return Content and metadata of the new note.
 */
export const createNote = async (markdown: string): Promise<Note> => {
  return await doApiPostRequestWithJsonResponse<string, Note>('notes', markdown, {
    additionalRequestInit: {
      headers: {
        'Content-Type': 'text/markdown'
      }
    }
  })
}

/**
 * Creates a new note with a given markdown content and a defined primary alias.
 * @param markdown The content of the new note.
 * @param primaryAlias The primary alias of the new note.
 * @return Content and metadata of the new note.
 */
export const createNoteWithPrimaryAlias = async (markdown: string, primaryAlias: string): Promise<Note> => {
  return await doApiPostRequestWithJsonResponse<string, Note>('notes/' + primaryAlias, markdown, {
    additionalRequestInit: {
      headers: {
        'Content-Type': 'text/markdown'
      }
    }
  })
}

/**
 * Deletes the specified note.
 * @param noteIdOrAlias The id or alias of the note to delete.
 */
export const deleteNote = (noteIdOrAlias: string): Promise<unknown> => {
  return doApiDeleteRequest('notes/' + noteIdOrAlias)
}
