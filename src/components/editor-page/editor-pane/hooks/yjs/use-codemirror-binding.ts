/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect } from 'react'
import { CodemirrorBinding } from 'y-codemirror'
import type { Editor } from 'codemirror'
import type { WebsocketProvider } from 'y-websocket'

export const useCodemirrorBinding = (editor: Editor | undefined, websocketProvider: WebsocketProvider): void => {
  useEffect(() => {
    if (!editor) {
      return
    }
    const yText = websocketProvider.doc.getText('codemirror')
    const editorBinding = new CodemirrorBinding(yText, editor, websocketProvider.awareness)
    editor.focus()
    return () => {
      editorBinding.destroy()
    }
  }, [editor, websocketProvider])
}
