/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { UserInfo } from './types'
import { ApiRequest } from '../common/api-request'

/**
 * Retrieves information about a specific user while using a cache to avoid many requests for the same username.
 * @param username The username of interest.
 * @return Metadata about the requested user.
 */
export const getUser = async (username: string): Promise<UserInfo> => {
  const response = await new ApiRequest('users/' + username).sendGetRequest()
  return response.getResponseJson<UserInfo>()
}
