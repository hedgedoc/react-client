/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useMemo, useState } from 'react'
import { isMockMode } from '../../../../../utils/test-modes'
import { getGlobalState } from '../../../../../redux'
import type { YText } from 'yjs/dist/src/types/YText'
import type { Extension } from '@codemirror/state'
import { EditorView } from '@codemirror/view'

/**
 * When in mock mode this hook inserts the current markdown content (that comes from the mock api) into the given yText
 * to make the editor usable.
 *
 * @param yText The yText in which the content should be inserted
 */
export const useInsertNoteContentInMockMode = (yText: YText): Extension | undefined => {
  const [firstUpdateHappened, setFirstUpdateHappened] = useState<boolean>(false)

  useEffect(() => {
    if (firstUpdateHappened) {
      yText.insert(0, getGlobalState().noteDetails.markdownContent.plain)
    }
  }, [firstUpdateHappened, yText])

  return useMemo(() => {
    return isMockMode && !firstUpdateHappened
      ? EditorView.updateListener.of(() => setFirstUpdateHappened(true))
      : undefined
  }, [firstUpdateHappened])
}
