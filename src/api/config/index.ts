/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Config } from './types'
import { ApiRequest } from '../common/api-request'

/**
 * Fetches the frontend config from the backend.
 * @return The frontend config.
 */
export const getConfig = async (): Promise<Config> => {
  const response = await new ApiRequest('config').sendGetRequest()
  return response.getResponseJson<Config>()
}
