/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { defaultFetchConfig, expectResponseCode } from '../../api/utils'

export const getFrontPageContent = async (pathname: string): Promise<string> => {
  const baseUrl: string = window.location.pathname.replace(pathname, '')

  const response = await fetch(baseUrl + '/intro.md', {
    ...defaultFetchConfig,
    method: 'GET'
  })
  expectResponseCode(response)

  return await response.text()
}
