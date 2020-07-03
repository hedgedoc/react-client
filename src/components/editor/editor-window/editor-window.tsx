import CodeMirror from 'codemirror'
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
import React, { Fragment, useEffect, useState } from 'react'
import { Controlled as ControlledCodeMirror } from 'react-codemirror2'
import { useTranslation } from 'react-i18next'
import './editor-window.scss'
import { ToolBar } from './tool-bar/tool-bar'

export interface EditorWindowProps {
  onContentChange: (content: string) => void
  content: string
}

const EditorWindow: React.FC<EditorWindowProps> = ({ onContentChange, content }) => {
  const { t } = useTranslation()
  const [startPosition, setStartPosition] = useState<CodeMirror.Position>({ ch: 0, line: 0 })
  const [endPosition, setEndPosition] = useState<CodeMirror.Position>({ ch: 0, line: 0 })

  useEffect(() => {
    setStartPosition({
      line: 0,
      ch: 0
    })
    setEndPosition({
      line: 0,
      ch: 0
    })
  }, [content])

  return (
    <Fragment>
      <ToolBar
        content={content}
        onContentChange={onContentChange}
        startPosition={startPosition}
        endPosition={endPosition}
      />
      <ControlledCodeMirror
        className="h-100 w-100 flex-fill"
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
        }
        }
        onBeforeChange={(editor, data, value) => {
          onContentChange(value)
        }}
        onSelection={(editor, data: SelectionData) => {
          const { anchor, head } = data.ranges[0]
          let headFirst = false
          if (anchor.line < head.line) {
            headFirst = false
          }

          if (head.line < anchor.line) {
            headFirst = true
          }

          if (anchor.line === head.line) {
            if (anchor.ch < head.ch) {
              headFirst = false
            }

            if (head.ch < anchor.ch) {
              headFirst = true
            }
          }

          setStartPosition({
            line: headFirst ? head.line : anchor.line,
            ch: headFirst ? head.ch : anchor.ch
          })

          setEndPosition({
            line: headFirst ? anchor.line : head.line,
            ch: headFirst ? anchor.ch : head.ch
          })
        }}
      />
    </Fragment>
  )
}

interface SelectionData {
  ranges: AnchorAndHead[]
}

interface AnchorAndHead {
  anchor: CodeMirror.Position
  head: CodeMirror.Position
}

export { EditorWindow }
