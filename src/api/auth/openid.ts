/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { defaultFetchConfig, expectResponseCode, getApiUrl } from '../utils'

/**
 * Requests to login the user via the given OpenID provider.
 * @param openId The URL of the OpenID provider that handles the authentication.
 */
export const doOpenIdLogin = async (openId: string): Promise<void> => {
  const response = await fetch(getApiUrl() + 'auth/openid', {
    ...defaultFetchConfig,
    method: 'POST',
    body: JSON.stringify({
      openId: openId
    })
  })

  expectResponseCode(response)
}
