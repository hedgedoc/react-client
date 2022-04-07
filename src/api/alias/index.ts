/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { doApiDeleteRequest } from '../request-utils'
import { doApiPostRequestWithJsonResponse } from '../request-utils/with-json-response'
import type { Alias, NewAliasDto, PrimaryAliasDto } from './types'

/**
 * Adds an alias to an existing note.
 * @param noteIdOrAlias The note id or an existing alias for a note.
 * @param newAlias The new alias.
 * @return Information about the newly created alias.
 */
export const addAlias = (noteIdOrAlias: string, newAlias: string): Promise<Alias> => {
  return doApiPostRequestWithJsonResponse<NewAliasDto, Alias>('alias', {
    noteIdOrAlias,
    newAlias
  })
}

/**
 * Marks a given alias as the primary one for a note.
 * The former primary alias should be marked as non-primary by the backend automatically.
 * @param alias The alias to mark as primary for its corresponding note.
 * @return The updated information about the alias.
 */
export const markAliasAsPrimary = (alias: string): Promise<Alias> => {
  return doApiPostRequestWithJsonResponse<PrimaryAliasDto, Alias>('alias/' + alias, {
    primaryAlias: true
  })
}

/**
 * Removes a given alias from its corresponding note.
 * @param alias The alias to remove from its note.
 */
export const deleteAlias = (alias: string): Promise<unknown> => {
  return doApiDeleteRequest('alias/' + alias)
}
