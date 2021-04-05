/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import equal from 'fast-deep-equal'
import { useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState, store } from '../../../redux'
import { useParams } from 'react-router-dom'
import { EditorPagePathParams } from '../editor-page'
import { HistoryEntry, HistoryEntryOrigin } from '../../../redux/history/types'
import { updateHistoryEntry } from '../../../redux/history/methods'

export const useUpdateHistoryEntry = (loading: boolean, error: boolean): void => {
  const { id } = useParams<EditorPagePathParams>()
  const userExists = useSelector((state: ApplicationState) => !!state.user)
  const noteTitle = useSelector((state: ApplicationState) => state.noteDetails.noteTitle)
  const noteTags = useSelector((state: ApplicationState) => state.noteDetails.frontmatter.tags)

  const lastTitle = useRef('')
  const lastTags = useRef<string[]>([])


  const updateHistory = useCallback(() => {
    if (loading || error) {
      return
    }
    // This is needed to not update the history entry on each scroll without changes
    // just because title or tags redux state were touched.
    if (noteTitle === lastTitle.current && equal(noteTags, lastTags.current)) {
      return
    }
    const history = store.getState().history
    const entry: HistoryEntry = history.find(entry => entry.id === id) ?? {
      id,
      title: '',
      pinned: false,
      lastVisited: '',
      tags: [],
      origin: userExists ? HistoryEntryOrigin.REMOTE : HistoryEntryOrigin.LOCAL
    }
    entry.title = noteTitle
    entry.tags = noteTags
    entry.lastVisited = new Date().toISOString()
    updateHistoryEntry(id, entry)
    lastTitle.current = noteTitle
    lastTags.current = noteTags
  }, [error, loading, id, noteTitle, noteTags, userExists])

  useEffect(updateHistory, [loading, updateHistory, noteTitle, noteTags])
}
