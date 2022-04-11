/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { GroupInfo } from './types'
import { ApiRequest } from '../common/api-request'

/**
 * Retrieves information about a group with a given name.
 * @param groupName The name of the group.
 * @return Information about the group.
 */
export const getGroup = async (groupName: string): Promise<GroupInfo> => {
  const response = await new ApiRequest('groups/' + groupName).sendGetRequest()
  return response.getResponseJson<GroupInfo>()
}
