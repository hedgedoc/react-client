/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect } from 'react'
import { isMockMode } from '../../../../../utils/test-modes'
import { getGlobalState } from '../../../../../redux'
import type { YText } from 'yjs/dist/src/types/YText'

/**
 * When in mock mode this hook inserts the current markdown content (that comes from the mock api) into the given yText
 * to make the editor usable.
 *
 * @param yText The yText in which the content should be inserted
 */
export const useInsertNoteContentInMockMode = (yText: YText): void => {
  useEffect(() => {
    if (isMockMode) {
      /**
       * Why a Timeout?
       * The yjs-codemirror-extension only reacts to yText-updates and doesn't insert the current state when the extension is loaded.
       * Therefore, we need to insert the text AFTER the extension is loaded.
       * But we also can't verify when the extension is loaded... so we just wait.
       */
      setTimeout(() => {
        yText.insert(0, getGlobalState().noteDetails.markdownContent.plain)
      }, 1000)
    }
  }, [yText])
}
