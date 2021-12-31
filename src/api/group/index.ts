/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { getApiResponse } from '../utils'
import type { GroupInfo } from './types'

/**
 * Retrieves information about a group with a given name.
 * @param groupName The name of the group.
 * @return Information about the group.
 */
export const getGroup = (groupName: string): Promise<GroupInfo> => {
  return getApiResponse<GroupInfo>('groups/' + groupName)
}
