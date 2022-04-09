/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Config } from './types'
import { doApiGetRequestWithJsonResponse } from '../request-utils/with-json-response'

/**
 * Fetches the frontend config from the backend.
 * @return The frontend config.
 */
export const getConfig = (): Promise<Config> => {
  return doApiGetRequestWithJsonResponse<Config>('config')
}
