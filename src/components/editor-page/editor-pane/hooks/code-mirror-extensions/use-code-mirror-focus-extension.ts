/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { EditorView } from '@codemirror/view'
import { useMemo } from 'react'
import type { Extension } from '@codemirror/state'

export const useCodeMirrorFocusExtension = (onFocus: () => void): Extension => {
  return useMemo(
    () =>
      EditorView.domEventHandlers({
        focus: onFocus
      }),
    [onFocus]
  )
}
