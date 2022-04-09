/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { doApiDeleteRequest, doApiPostRequest } from '../request-utils'
import type { MediaUpload } from '../media/types'
import type { ChangeDisplayNameDto, LoginUserInfo } from './types'
import { doApiGetRequestWithJsonResponse } from '../request-utils/with-json-response'

/**
 * Returns metadata about the currently signed-in user from the API.
 * @throws Error when the user is not signed-in.
 * @return The user metadata.
 */
export const getMe = (): Promise<LoginUserInfo> => {
  return doApiGetRequestWithJsonResponse<LoginUserInfo>('me')
}

/**
 * Deletes the current user from the server.
 */
export const deleteUser = (): Promise<unknown> => {
  return doApiDeleteRequest('me')
}

/**
 * Changes the display name of the current user.
 * @param displayName The new display name to set.
 */
export const updateDisplayName = (displayName: string): Promise<unknown> => {
  return doApiPostRequest<ChangeDisplayNameDto>('me/profile', {
    displayName
  })
}

/**
 * Retrieves a list of media belonging to the user.
 * @return List of media object information.
 */
export const getMyMedia = (): Promise<MediaUpload[]> => {
  return doApiGetRequestWithJsonResponse<MediaUpload[]>('me/media')
}
