/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import type { ScrollProps, ScrollState } from '../synced-scroll/scroll-props'
import { StatusBar } from './status-bar/status-bar'
import { ToolBar } from './tool-bar/tool-bar'
import { useApplicationState } from '../../../hooks/common/use-application-state'
import { setNoteContent } from '../../../redux/note-details/methods'
import { useNoteMarkdownContent } from '../../../hooks/common/use-note-markdown-content'
import { MaxLengthWarning } from './max-length-warning/max-length-warning'
import { useOnImageUploadFromRenderer } from './hooks/use-on-image-upload-from-renderer'
import type { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import ReactCodeMirror from '@uiw/react-codemirror'
import { useCursorActivityCallback } from './hooks/use-cursor-activity-callback'
import { applyScrollState, useApplyScrollState } from './hooks/use-apply-scroll-state'
import styles from './extended-codemirror/codemirror.module.scss'
import { oneDark } from '@codemirror/theme-one-dark'
import { useTranslation } from 'react-i18next'
import { Logger } from '../../../utils/logger'
import {
  extractScrollState,
  useCodeMirrorScrollWatchExtension
} from './hooks/code-mirror-extensions/use-code-mirror-scroll-watch-extension'
import { useCodeMirrorPasteExtension } from './hooks/code-mirror-extensions/use-code-mirror-paste-extension'
import { useCodeMirrorFileDropExtension } from './hooks/code-mirror-extensions/use-code-mirror-file-drop-extension'
import { useCodeMirrorFocusExtension } from './hooks/code-mirror-extensions/use-code-mirror-focus-extension'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { EditorView } from '@codemirror/view'
import Optional from 'optional-js'
import { useCodeMirrorBlurExtension } from './hooks/code-mirror-extensions/use-code-mirror-blur-extension'
import { store } from '../../../redux'
import { autocompletion } from '@codemirror/autocomplete'

const logger = new Logger('EditorPane')

export const EditorPane: React.FC<ScrollProps> = ({ scrollState, onScroll, onMakeScrollSource }) => {
  const markdownContent = useNoteMarkdownContent()

  const ligaturesEnabled = useApplicationState((state) => state.editorConfig.ligatures)
  const codeMirrorRef = useRef<ReactCodeMirrorRef | null>(null)

  useApplyScrollState(codeMirrorRef, scrollState)

  const editorScrollExtension = useCodeMirrorScrollWatchExtension(onScroll)
  const editorPasteExtension = useCodeMirrorPasteExtension()
  const dropExtension = useCodeMirrorFileDropExtension()

  const editorFocused = useRef<boolean>(false)
  const blurExtension = useCodeMirrorBlurExtension(
    useCallback(() => {
      editorFocused.current = false
    }, [])
  )
  const focusExtension = useCodeMirrorFocusExtension(
    useCallback(() => {
      editorFocused.current = true
    }, [])
  )

  const offFocusScrollState = useRef<ScrollState>()
  const saveOffFocusScrollStateExtension = useCodeMirrorBlurExtension(
    useCallback(() => {
      Optional.ofNullable(codeMirrorRef.current?.view).ifPresent((view) => {
        offFocusScrollState.current = extractScrollState(view)
        logger.debug('Save off-focus scroll state', offFocusScrollState.current)
      })
    }, [])
  )
  useEffect(() => {
    const view = codeMirrorRef.current?.view
    const scrollState = offFocusScrollState.current
    if (!editorFocused.current && !!scrollState && !!view) {
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
  }, [markdownContent])

  const extensions = useMemo(
    () => [
      markdown({ base: markdownLanguage, codeLanguages: languages }),
      EditorView.lineWrapping,
      editorScrollExtension,
      editorPasteExtension,
      dropExtension,
      focusExtension,
      blurExtension,
      saveOffFocusScrollStateExtension,
      autocompletion()
    ],
    [
      blurExtension,
      dropExtension,
      editorPasteExtension,
      editorScrollExtension,
      focusExtension,
      saveOffFocusScrollStateExtension
    ]
  )

  const onBeforeChange = useCallback(
    (value: string): void => {
      if (!editorFocused.current) {
        logger.debug("Don't post content change because editor isn't focused")
      } else {
        setNoteContent(value)
      }
    },
    [editorFocused]
  )

  useOnImageUploadFromRenderer()

  const onCursorActivity = useCursorActivityCallback(editorFocused)

  const codeMirrorClassName = useMemo(
    () => `overflow-hidden ${styles.extendedCodemirror} h-100 ${ligaturesEnabled ? '' : styles['no-ligatures']}`,
    [ligaturesEnabled]
  )

  const { t } = useTranslation()

  return (
    <div className={`d-flex flex-column h-100 position-relative`} onMouseEnter={onMakeScrollSource}>
      <MaxLengthWarning />
      <ToolBar />
      <ReactCodeMirror
        placeholder={t('editor.placeholder')}
        extensions={extensions}
        width={'100%'}
        height={'100%'}
        maxHeight={'100%'}
        maxWidth={'100%'}
        basicSetup={true}
        className={codeMirrorClassName}
        theme={oneDark}
        value={markdownContent}
        onUpdate={onCursorActivity}
        onChange={onBeforeChange}
        ref={codeMirrorRef}
      />
      <StatusBar />
    </div>
  )
}

export default EditorPane
