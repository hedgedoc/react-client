/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { GroupInfo } from './types'
import { GetApiRequestBuilder } from '../common/api-request-builder/get-api-request-builder'

/**
 * Retrieves information about a group with a given name.
 *
 * @param groupName The name of the group.
 * @return Information about the group.
 * @throws {Error} when the status code does not match the expected one or is defined as in the custom status code
 *         error mapping.
 */
export const getGroup = async (groupName: string): Promise<GroupInfo> => {
  const response = await new GetApiRequestBuilder<GroupInfo>('groups/' + groupName).sendRequest()
  return response.asParsedJsonObject()
}
