/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { getApiResponse } from '../utils'
import type { Config } from './types'

/**
 * Fetches the frontend config from the backend.
 * @return The frontend config.
 */
export const getConfig = (): Promise<Config> => {
  return getApiResponse<Config>('config')
}
