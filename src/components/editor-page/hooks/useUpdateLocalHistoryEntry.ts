/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import equal from 'fast-deep-equal'
import { useEffect, useRef } from 'react'
import { getGlobalState } from '../../../redux'
import { updateLocalHistoryEntry } from '../../../redux/history/methods'
import { useApplicationState } from '../../../hooks/common/use-application-state'
import type { HistoryEntryWithOrigin } from '../../../api/history/types'
import { HistoryEntryOrigin } from '../../../api/history/types'

export const useUpdateLocalHistoryEntry = (updateReady: boolean): void => {
  const id = useApplicationState((state) => state.noteDetails.id)
  const userExists = useApplicationState((state) => !!state.user)
  const currentNoteTitle = useApplicationState((state) => state.noteDetails.title)
  const currentNoteTags = useApplicationState((state) => state.noteDetails.frontmatter.tags)

  const lastNoteTitle = useRef('')
  const lastNoteTags = useRef<string[]>([])

  useEffect(() => {
    if (!updateReady || userExists) {
      return
    }
    if (currentNoteTitle === lastNoteTitle.current && equal(currentNoteTags, lastNoteTags.current)) {
      return
    }
    const history = getGlobalState().history
    const entry: HistoryEntryWithOrigin = history.find((entry) => entry.identifier === id) ?? {
      identifier: id,
      title: '',
      pinStatus: false,
      lastVisitedAt: '',
      tags: [],
      origin: HistoryEntryOrigin.LOCAL
    }
    if (entry.origin === HistoryEntryOrigin.REMOTE) {
      return
    }
    entry.title = currentNoteTitle
    entry.tags = currentNoteTags
    entry.lastVisitedAt = new Date().toISOString()
    updateLocalHistoryEntry(id, entry)
    lastNoteTitle.current = currentNoteTitle
    lastNoteTags.current = currentNoteTags
  }, [updateReady, id, userExists, currentNoteTitle, currentNoteTags])
}
