/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useMemo } from 'react'
import Optional from 'optional-js'
import type { CodeMirrorSelection } from './code-mirror-selection'
import type { GenerateContentEditsCallback } from './change-content-context'
import { useCodeMirrorReference } from './change-content-context'
import type { CursorSelection } from '../editor-pane/tool-bar/formatters/types/cursor-selection'
import type { EditorView } from '@codemirror/view'

export const changeEditorContent = (view: EditorView, callback: GenerateContentEditsCallback): void => {
  const [changes, selection] = callback({
    currentSelection: {
      from: view.state.selection.main.from,
      to: view.state.selection.main.to
    },
    markdownContent: view.state.doc.toString()
  })

  view.dispatch({ changes: changes, selection: convertSelectionToCodeMirrorSelection(selection) })
}

export const useChangeEditorContentCallback = () => {
  const codeMirrorRef = useCodeMirrorReference()
  return useMemo(() => {
    if (codeMirrorRef) {
      return (callback: GenerateContentEditsCallback) => changeEditorContent(codeMirrorRef, callback)
    }
  }, [codeMirrorRef])
}

const convertSelectionToCodeMirrorSelection = (selection: CursorSelection | undefined) => {
  return Optional.ofNullable(selection)
    .map<CodeMirrorSelection | undefined>((a) => ({ anchor: a.from, head: a.to }))
    .orElse(undefined)
}
