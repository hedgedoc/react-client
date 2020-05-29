import React, { useState } from 'react'
import { Controlled as ControlledCodeMirror } from 'react-codemirror2'
import './editor-window.scss'
import 'codemirror/mode/gfm/gfm.js'
import 'codemirror/keymap/sublime.js'
import 'codemirror/addon/edit/matchtags'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/search/match-highlighter'
import 'codemirror/addon/comment/comment'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/continuelist'
import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'

const EditorWindow: React.FC = () => {
  const [content, setContent] = useState<string>('It\'s very easy to make some words **bold** and other words *italic* with Markdown.\nYou can even [link to Google!](http://google.com)')
  return (
    <ControlledCodeMirror
      className="h-100 w-100"
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
        placeholder: "← Start by entering a title here\n===\nVisit /features if you don't know what to do.\nHappy hacking :)"
      }
      }
      onBeforeChange={(editor, data, value) => {
        setContent(value)
      }}
      onChange={(editor, data, value) => {
        console.log('change!')
      }}
    />
  )
}

export { EditorWindow }
