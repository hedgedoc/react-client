/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { getApiResponse, sendApiData, sendApiDataAndGetResponse } from '../utils'
import type { AccessToken, AccessTokenWithSecret, CreateAccessTokenDto } from './types'

/**
 * Retrieves the access tokens for the current user.
 * @return List of access token metadata.
 */
export const getAccessTokenList = (): Promise<AccessToken[]> => {
  return getApiResponse<AccessToken[]>('tokens')
}

/**
 * Creates a new access token for the current user.
 * @param label The user-defined label for the new access token.
 * @param validUntil The user-defined expiry date of the new access token in milliseconds of unix time.
 * @return The new access token metadata along with its secret.
 */
export const postNewAccessToken = (label: string, validUntil: number): Promise<AccessTokenWithSecret> => {
  return sendApiDataAndGetResponse<CreateAccessTokenDto, AccessTokenWithSecret>(
    'tokens',
    'POST',
    {
      label,
      validUntil
    },
    201
  )
}

/**
 * Removes an access token from the current user account.
 * @param keyId The key id of the access token to delete.
 */
export const deleteAccessToken = (keyId: string): Promise<unknown> => {
  return sendApiData<undefined>('tokens/' + keyId, 'DELETE', undefined, 204)
}
