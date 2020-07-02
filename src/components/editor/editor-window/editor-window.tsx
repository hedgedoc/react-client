import { Editor, ScrollInfo } from 'codemirror'
import 'codemirror/addon/comment/comment'
import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/continuelist'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/matchtags'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/search/match-highlighter'
import 'codemirror/addon/selection/active-line'
import 'codemirror/keymap/sublime.js'
import 'codemirror/mode/gfm/gfm.js'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Controlled as ControlledCodeMirror } from 'react-codemirror2'
import { useTranslation } from 'react-i18next'
import { ScrollProps, ScrollState } from '../scroll/scroll-props'
import './editor-window.scss'
import { Positions, SelectionData } from './interfaces'
import { ToolBar } from './tool-bar/tool-bar'

export interface EditorWindowProps {
  onContentChange: (content: string) => void
  content: string
}

export const EditorWindow: React.FC<EditorWindowProps & ScrollProps> = ({ onContentChange, content, scrollState, onScroll }) => {
  const { t } = useTranslation()

  const editorRef = useRef<Editor>()
  const lastScrollState = useRef<ScrollState>()
  const lastScrollPosition = useRef<number>()
  const ignoreScroll = useRef<boolean>(false)

  const [scrollEventValue, setScrollEventValue] = useState<number>(0)

  const [positions, setPositions] = useState<Positions>({
    startPosition: {
      ch: 0,
      line: 0
    },
    endPosition: {
      ch: 0,
      line: 0
    }
  })

  const onSelection = useCallback((editor, data: SelectionData) => {
    const { anchor, head } = data.ranges[0]
    const headFirst = head.line < anchor.line || (head.line === anchor.line && head.ch < anchor.ch)

    setPositions({
      startPosition: {
        line: headFirst ? head.line : anchor.line,
        ch: headFirst ? head.ch : anchor.ch
      },
      endPosition: {
        line: headFirst ? anchor.line : head.line,
        ch: headFirst ? anchor.ch : head.ch
      }
    })
  }, [])

  const onEditorContentChange = useCallback((editor, data, value) => onContentChange(value), [onContentChange])
  const onEditorScroll = useCallback((editor: Editor, data: ScrollInfo) => {
    setScrollEventValue(() => data.top as number)
  }, [])

  useEffect(() => {
    if (ignoreScroll.current) {
      console.log('ignored onscroll in editor')
      ignoreScroll.current = false
      return
    }
    if (!editorRef.current || !onScroll) {
      return
    }
    const line = editorRef.current.lineAtHeight(scrollEventValue, 'local')
    const startYOfLine = editorRef.current.heightAtLine(line, 'local')
    const lineInfo = editorRef.current.lineInfo(line)
    if (lineInfo === null) {
      return
    }
    const heightOfLine = (lineInfo.handle as { height: number }).height
    const percentage = (Math.max(scrollEventValue - startYOfLine, 0)) / heightOfLine

    const newScrollState: ScrollState = { firstLineInView: line + 1, scrolledPercentage: percentage }
    if (!lastScrollState.current || lastScrollState.current.firstLineInView !== newScrollState.firstLineInView || lastScrollState.current.scrolledPercentage !== newScrollState.scrolledPercentage) {
      lastScrollState.current = newScrollState
      console.log('send onscroll in editor', scrollState, lastScrollState.current)
      onScroll(newScrollState)
    }
  }, [onScroll, scrollEventValue, scrollState])

  const setRef = useCallback((editor: Editor) => {
    editorRef.current = editor
  }, [])

  useEffect(() => {
    if (!editorRef.current || !scrollState || (lastScrollState.current?.firstLineInView === scrollState.firstLineInView && lastScrollState.current?.scrolledPercentage === scrollState.scrolledPercentage)) {
      return
    }
    const startYOfLine = editorRef.current.heightAtLine(scrollState.firstLineInView - 1, 'div')
    const heightOfLine = (editorRef.current.lineInfo(scrollState.firstLineInView - 1).handle as { height: number }).height
    const newPosition = startYOfLine + (heightOfLine * scrollState.scrolledPercentage)
    if (newPosition !== lastScrollPosition.current) {
      lastScrollPosition.current = newPosition
      lastScrollState.current = scrollState
      console.log('editor scroll to ', newPosition)
      editorRef.current.scrollTo(0, newPosition)
    }
  }, [scrollState])

  return (
    <div className={'d-flex flex-column h-100'}>
      <ToolBar
        content={content}
        onContentChange={onContentChange}
        positions={positions}
      />
      <ControlledCodeMirror
        className="overflow-hidden w-100 flex-fill"
        value={content}
        options={{
          mode: 'gfm',
          theme: 'one-dark',
          keyMap: 'sublime',
          viewportMargin: 20,
          styleActiveLine: true,
          lineNumbers: true,
          lineWrapping: true,
          showCursorWhenSelecting: true,
          highlightSelectionMatches: true,
          indentUnit: 4,
          //    continueComments: 'Enter',
          inputStyle: 'textarea',
          matchBrackets: true,
          autoCloseBrackets: true,
          matchTags: {
            bothTags: true
          },
          autoCloseTags: true,
          foldGutter: true,
          gutters: [
            'CodeMirror-linenumbers',
            'authorship-gutters',
            'CodeMirror-foldgutter'
          ],
          // extraKeys: this.defaultExtraKeys,
          flattenSpans: true,
          addModeClass: true,
          // autoRefresh: true,
          // otherCursors: true
          placeholder: t('editor.placeholder')
        }}
        onBeforeChange={onEditorContentChange}
        editorDidMount={setRef}
        onScroll={onEditorScroll}
        onSelection={onSelection}
      />
    </div>
  )
}
