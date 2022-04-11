/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { Note } from './types'
import type { MediaUpload } from '../media/types'
import { ApiRequest } from '../common/api-request'

/**
 * Retrieves the content and metadata about the specified note.
 * @param noteIdOrAlias The id or alias of the note.
 * @return Content and metadata of the specified note.
 */
export const getNote = async (noteIdOrAlias: string): Promise<Note> => {
  const response = await new ApiRequest('notes/' + noteIdOrAlias).sendGetRequest()
  return response.getResponseJson<Note>()
}

/**
 * Returns a list of media objects associated with the specified note.
 * @param noteIdOrAlias The id or alias of the note.
 * @return List of media object metadata associated with specified note.
 */
export const getMediaForNote = async (noteIdOrAlias: string): Promise<MediaUpload[]> => {
  const response = await new ApiRequest(`notes/${noteIdOrAlias}/media`).sendGetRequest()
  return response.getResponseJson<MediaUpload[]>()
}

/**
 * Creates a new note with a given markdown content.
 * @param markdown The content of the new note.
 * @return Content and metadata of the new note.
 */
export const createNote = async (markdown: string): Promise<Note> => {
  const response = await new ApiRequest('notes')
    .withHeader('Content-Type', 'text/markdown')
    .withBody(markdown)
    .sendPostRequest()
  return response.getResponseJson<Note>()
}

/**
 * Creates a new note with a given markdown content and a defined primary alias.
 * @param markdown The content of the new note.
 * @param primaryAlias The primary alias of the new note.
 * @return Content and metadata of the new note.
 */
export const createNoteWithPrimaryAlias = async (markdown: string, primaryAlias: string): Promise<Note> => {
  const response = await new ApiRequest('notes/' + primaryAlias)
    .withHeader('Content-Type', 'text/markdown')
    .withBody(markdown)
    .sendPostRequest()
  return response.getResponseJson<Note>()
}

/**
 * Deletes the specified note.
 * @param noteIdOrAlias The id or alias of the note to delete.
 */
export const deleteNote = async (noteIdOrAlias: string): Promise<void> => {
  await new ApiRequest('notes/' + noteIdOrAlias).sendDeleteRequest()
}
