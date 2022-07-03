/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Config } from './types'
import { GetApiRequestBuilder } from '../common/api-request-builder/get-api-request-builder'

/**
 * Fetches the frontend config from the backend.
 *
 * @return The frontend config.
 * @throws {Error} when the status code does not match the expected one or is defined as in the custom status code
 *         error mapping.
 */
export const getConfig = async (): Promise<Config> => {
  const response = await new GetApiRequestBuilder<Config>('config').sendRequest()
  return response.asParsedJsonObject()
}
