import { Editor, EditorChange, Pos } from 'codemirror'
import 'codemirror/addon/comment/comment'
import 'codemirror/addon/display/autorefresh'
import 'codemirror/addon/display/fullscreen'
import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/continuelist'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/matchtags'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/search/match-highlighter'
import 'codemirror/addon/selection/active-line'
import 'codemirror/keymap/sublime.js'
import 'codemirror/mode/gfm/gfm.js'
import { Data, EmojiData, NimbleEmojiIndex } from 'emoji-mart'
import data from 'emoji-mart/data/twitter.json'
import React, { useCallback, useState } from 'react'
import { Controlled as ControlledCodeMirror } from 'react-codemirror2'
import { useTranslation } from 'react-i18next'
import './editor-window.scss'
import { getEmojiIcon, getEmojiShortCode } from '../../../utils/emoji'
import { defaultKeyMap } from './key-map'
import { customEmojis } from './tool-bar/emoji-picker/emoji-picker'
import { ToolBar } from './tool-bar/tool-bar'

export interface EditorWindowProps {
  onContentChange: (content: string) => void
  content: string
}

interface findWordAtCursorResponse {
  start: number,
  end: number,
  text: string
}

const allowedCharsInEmojiCodeRegex = /(:|\w|-|_)/

const findWordAtCursor = (editor: Editor): findWordAtCursorResponse => {
  const cursor = editor.getCursor()
  const line = editor.getLine(cursor.line)
  let start = cursor.ch
  let end = cursor.ch
  while (start && allowedCharsInEmojiCodeRegex.test(line.charAt(start - 1))) {
    --start
  }
  while (end < line.length && allowedCharsInEmojiCodeRegex.test(line.charAt(end))) {
    ++end
  }

  return {
    text: line.slice(start, end).toLowerCase(),
    start: start,
    end: end
  }
}

const emojiWordRegex = /^:((\w|-|_)+)$/

const emojiHints = (editor: Editor) => {
  return new Promise((resolve) => {
    const searchTerm = findWordAtCursor(editor)
    const searchResult = emojiWordRegex.exec(searchTerm.text)
    if (searchResult === null) {
      resolve(null)
      return
    }
    const term = searchResult[1]
    if (!term) {
      resolve(null)
      return
    }
    const search = emojiIndex.search(term, {
      emojisToShowFilter: () => true,
      maxResults: 5,
      include: [],
      exclude: [],
      custom: customEmojis as EmojiData[]
    })
    const cursor = editor.getCursor()
    if (!search) {
      resolve(null)
    } else {
      resolve({
        list: search.map((emojiData: EmojiData) => ({
          displayText: `${getEmojiIcon(emojiData)} - ${getEmojiShortCode(emojiData)}`,
          text: getEmojiShortCode(emojiData)
        })),
        from: Pos(cursor.line, searchTerm.start),
        to: Pos(cursor.line, searchTerm.end)
      })
    }
  })
}

const hintOptions = {
  hint: emojiHints,
  completeSingle: false,
  completeOnSingleClick: false,
  alignWithWord: true
}

const emojiIndex = new NimbleEmojiIndex(data as unknown as Data)

const onChange = (editor: Editor) => {
  const searchTerm = findWordAtCursor(editor)
  if (emojiWordRegex.test(searchTerm.text)) {
    editor.showHint(hintOptions)
  }
}

export const EditorWindow: React.FC<EditorWindowProps> = ({ onContentChange, content }) => {
  const { t } = useTranslation()
  const [editor, setEditor] = useState<Editor>()

  const onBeforeChange = useCallback((editor: Editor, data: EditorChange, value: string) => {
    onContentChange(value)
  }, [onContentChange])

  return (
    <div className={'d-flex flex-column h-100'}>
      <ToolBar
        editor={editor}
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
          extraKeys: defaultKeyMap,
          flattenSpans: true,
          addModeClass: true,
          autoRefresh: true,
          // otherCursors: true,
          placeholder: t('editor.placeholder'),
          showHint: false,
          hintOptions: hintOptions
        }}
        editorDidMount={mountedEditor => setEditor(mountedEditor)}
        onBeforeChange={onBeforeChange}
        onChange={onChange}
      /></div>
  )
}
