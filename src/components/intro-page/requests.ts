/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { customizeAssetsUrl } from '../../utils/customize-assets-url'
import { defaultConfig } from '../../api/common/default-config'

export const fetchFrontPageContent = async (): Promise<string> => {
  const response = await fetch(customizeAssetsUrl + 'intro.md', {
    ...defaultConfig,
    method: 'GET'
  })
  if (response.status !== 200) {
    throw new Error('Error fetching intro content')
  }

  return await response.text()
}
