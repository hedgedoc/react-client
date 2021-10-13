/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { HistoryEntry } from '../../redux/history/types'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Hook that returns a memo for the title of a note in the history when present or the localized untitled name otherwise.
 * @param entry The history entry containing a title property, that might be an empty string.
 */
export const useHistoryEntryTitle = (entry: HistoryEntry): string => {
  const { t } = useTranslation()
  return useMemo(() => {
    if (entry.title !== '') {
      return entry.title
    }
    return t('editor.untitledNote')
  }, [t, entry])
}
