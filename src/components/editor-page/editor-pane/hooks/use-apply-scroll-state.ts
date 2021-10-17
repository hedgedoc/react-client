/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useRef } from 'react'
import type { Editor } from 'codemirror'
import type { ScrollState } from '../../synced-scroll/scroll-props'

/**
 * Monitors the given scroll state and scrolls the editor to the state if changed.
 *
 * @param editor The editor that should be manipulated
 * @param scrollState The scroll state that should be monitored
 */
export const useApplyScrollState = (editor?: Editor, scrollState?: ScrollState): void => {
  const lastScrollPosition = useRef<number>()
  useEffect(() => {
    if (!editor || !scrollState) {
      return
    }
    const startYOfLine = editor.heightAtLine(scrollState.firstLineInView - 1, 'local')
    const heightOfLine = (editor.lineInfo(scrollState.firstLineInView - 1).handle as { height: number }).height
    const newPositionRaw = startYOfLine + (heightOfLine * scrollState.scrolledPercentage) / 100
    const newPosition = Math.floor(newPositionRaw)
    if (newPosition !== lastScrollPosition.current) {
      lastScrollPosition.current = newPosition
      editor.scrollTo(0, newPosition)
    }
  }, [editor, scrollState])
}
