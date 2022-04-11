/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { MediaUpload } from '../media/types'
import type { ChangeDisplayNameDto, LoginUserInfo } from './types'
import { ApiRequest } from '../common/api-request'

/**
 * Returns metadata about the currently signed-in user from the API.
 * @throws Error when the user is not signed-in.
 * @return The user metadata.
 */
export const getMe = async (): Promise<LoginUserInfo> => {
  const response = await new ApiRequest('me').sendGetRequest()
  return response.getResponseJson<LoginUserInfo>()
}

/**
 * Deletes the current user from the server.
 */
export const deleteUser = async (): Promise<void> => {
  await new ApiRequest('me').sendDeleteRequest()
}

/**
 * Changes the display name of the current user.
 * @param displayName The new display name to set.
 */
export const updateDisplayName = async (displayName: string): Promise<void> => {
  await new ApiRequest('me/profile')
    .withJsonBody<ChangeDisplayNameDto>({
      displayName
    })
    .sendPostRequest()
}

/**
 * Retrieves a list of media belonging to the user.
 * @return List of media object information.
 */
export const getMyMedia = async (): Promise<MediaUpload[]> => {
  const response = await new ApiRequest('me/media').sendGetRequest()
  return response.getResponseJson<MediaUpload[]>()
}
