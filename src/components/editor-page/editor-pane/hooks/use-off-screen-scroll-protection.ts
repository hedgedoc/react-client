/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { RefObject } from 'react'
import { useEffect, useMemo, useRef } from 'react'
import type { ScrollState } from '../../synced-scroll/scroll-props'
import { extractScrollState } from './code-mirror-extensions/use-code-mirror-scroll-watch-extension'
import { applyScrollState } from './use-apply-scroll-state'
import { store } from '../../../../redux'
import type { Extension } from '@codemirror/state'
import { Logger } from '../../../../utils/logger'
import type { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { useNoteMarkdownContent } from '../../../../hooks/common/use-note-markdown-content'
import { EditorView } from '@codemirror/view'

const logger = new Logger('useOffScreenScrollProtection')

export const useOffScreenScrollProtection = (codeMirrorRef: RefObject<ReactCodeMirrorRef>): Extension => {
  const offFocusScrollState = useRef<ScrollState>()
  const markdownContent = useNoteMarkdownContent()

  const saveOffFocusScrollStateExtension = useMemo(() => {
    return EditorView.domEventHandlers({
      blur: (event, view) => {
        offFocusScrollState.current = extractScrollState(view)
        logger.debug('Save off-focus scroll state', offFocusScrollState.current)
      },
      focus: () => {
        offFocusScrollState.current = undefined
      }
    })
  }, [])

  useEffect(() => {
    const view = codeMirrorRef.current?.view
    const scrollState = offFocusScrollState.current
    if (offFocusScrollState.current !== undefined && !!scrollState && !!view) {
      logger.debug('Apply off-focus scroll state', scrollState)
      applyScrollState(view, scrollState)
      const selection = store.getState().noteDetails.selection
      view.dispatch(
        view.state.update({
          selection: {
            anchor: selection.from,
            head: selection.to
          }
        })
      )
    }
  }, [codeMirrorRef, markdownContent])

  return saveOffFocusScrollStateExtension
}
