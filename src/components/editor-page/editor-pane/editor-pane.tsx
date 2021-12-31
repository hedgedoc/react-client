/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Editor, EditorChange } from 'codemirror'
import React, { useCallback, useEffect, useState } from 'react'
import type { ScrollProps } from '../synced-scroll/scroll-props'
import { StatusBar } from './status-bar/status-bar'
import { ToolBar } from './tool-bar/tool-bar'
import { useApplicationState } from '../../../hooks/common/use-application-state'
import { setNoteContent } from '../../../redux/note-details/methods'
import { useNoteMarkdownContent } from '../../../hooks/common/use-note-markdown-content'
import { useCodeMirrorOptions } from './hooks/use-code-mirror-options'
import { useOnEditorPasteCallback } from './hooks/use-on-editor-paste-callback'
import { useOnEditorFileDrop } from './hooks/use-on-editor-file-drop'
import { useOnEditorScroll } from './hooks/use-on-editor-scroll'
import { useApplyScrollState } from './hooks/use-apply-scroll-state'
import { MaxLengthWarning } from './max-length-warning/max-length-warning'
import { useCreateStatusBarInfo } from './hooks/use-create-status-bar-info'
import { useOnImageUploadFromRenderer } from './hooks/use-on-image-upload-from-renderer'
import { ExtendedCodemirror } from './extended-codemirror/extended-codemirror'

export const EditorPane: React.FC<ScrollProps> = ({ scrollState, onScroll, onMakeScrollSource }) => {
  const markdownContent = useNoteMarkdownContent()

  const [editor, setEditor] = useState<Editor>()
  const ligaturesEnabled = useApplicationState((state) => state.editorConfig.ligatures)

  const onPaste = useOnEditorPasteCallback()
  const onEditorScroll = useOnEditorScroll(onScroll)
  useApplyScrollState(editor, scrollState)

  const onBeforeChange = useCallback((editor: Editor, data: EditorChange, value: string) => {
    setNoteContent(value)
  }, [])

  useEffect(() => {
    const worker = new Worker(new URL('./worker/pingpong.worker.ts', import.meta.url))

    worker.addEventListener('message', (event: MessageEvent<string>) => {
      if (event.data === 'pong') {
        console.log('main thread received pong')
      } else {
        console.error('main thread received unknown message')
      }
    })
    worker.postMessage('ping')
  }, [])

  const [statusBarInfo, updateStatusBarInfo] = useCreateStatusBarInfo()

  useOnImageUploadFromRenderer(editor)

  const onEditorDidMount = useCallback(
    (mountedEditor: Editor) => {
      updateStatusBarInfo(mountedEditor)
      setEditor(mountedEditor)
    },
    [updateStatusBarInfo]
  )

  const onDrop = useOnEditorFileDrop()
  const codeMirrorOptions = useCodeMirrorOptions()

  return (
    <div className={`d-flex flex-column h-100 position-relative`} onMouseEnter={onMakeScrollSource}>
      <MaxLengthWarning />
      <ToolBar editor={editor} />
      <ExtendedCodemirror
        className={`overflow-hidden w-100 flex-fill`}
        value={markdownContent}
        options={codeMirrorOptions}
        onPaste={onPaste}
        onDrop={onDrop}
        onCursorActivity={updateStatusBarInfo}
        editorDidMount={onEditorDidMount}
        onBeforeChange={onBeforeChange}
        onScroll={onEditorScroll}
        ligatures={ligaturesEnabled}
      />
      <StatusBar statusBarInfo={statusBarInfo} />
    </div>
  )
}

export default EditorPane
