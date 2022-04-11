/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { AccessToken, AccessTokenWithSecret, CreateAccessTokenDto } from './types'
import { ApiRequest } from '../common/api-request'

/**
 * Retrieves the access tokens for the current user.
 * @return List of access token metadata.
 */
export const getAccessTokenList = async (): Promise<AccessToken[]> => {
  const response = await new ApiRequest('tokens').sendGetRequest()
  return response.getResponseJson<AccessToken[]>()
}

/**
 * Creates a new access token for the current user.
 * @param label The user-defined label for the new access token.
 * @param validUntil The user-defined expiry date of the new access token in milliseconds of unix time.
 * @return The new access token metadata along with its secret.
 */
export const postNewAccessToken = async (label: string, validUntil: number): Promise<AccessTokenWithSecret> => {
  const response = await new ApiRequest('tokens')
    .withJsonBody<CreateAccessTokenDto>({
      label,
      validUntil
    })
    .sendPostRequest()
  return response.getResponseJson<AccessTokenWithSecret>()
}

/**
 * Removes an access token from the current user account.
 * @param keyId The key id of the access token to delete.
 */
export const deleteAccessToken = async (keyId: string): Promise<void> => {
  await new ApiRequest('tokens/' + keyId).sendDeleteRequest()
}
