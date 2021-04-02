/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { defaultFetchConfig, expectResponseCode, getApiUrl } from '../utils'
import { HistoryEntry } from '../../redux/history/types'

export const getHistory = async (): Promise<HistoryEntry[]> => {
  const response = await fetch(getApiUrl() + '/history')
  expectResponseCode(response)
  return await response.json() as Promise<HistoryEntry[]>
}

export const setHistory = async (entries: Omit<HistoryEntry, 'origin'>[]): Promise<void> => {
  const response = await fetch(getApiUrl() + '/history', {
    ...defaultFetchConfig,
    method: 'POST',
    body: JSON.stringify({
      history: entries
    })
  })
  expectResponseCode(response)
}
