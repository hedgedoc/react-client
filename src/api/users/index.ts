/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { UserInfo } from './types'
import { doApiGetRequestWithJsonResponse } from '../request-utils/with-json-response'

/**
 * Retrieves information about a specific user while using a cache to avoid many requests for the same username.
 * @param username The username of interest.
 * @return Metadata about the requested user.
 */
export const getUser = (username: string): Promise<UserInfo> => {
  return doApiGetRequestWithJsonResponse<UserInfo>('users/' + username)
}
