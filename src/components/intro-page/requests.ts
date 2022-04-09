/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { defaultFetchConfig } from '../../api/request-utils'
import { customizeAssetsUrl } from '../../utils/customize-assets-url'

export const fetchFrontPageContent = async (): Promise<string> => {
  const response = await fetch(customizeAssetsUrl + 'intro.md', {
    ...defaultFetchConfig,
    method: 'GET'
  })
  if (response.status !== 200) {
    throw new Error('Error fetching intro content')
  }

  return await response.text()
}
