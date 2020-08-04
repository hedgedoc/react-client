import CodeMirror, { KeyMap } from 'codemirror'
import {
  makeSelectionBold,
  makeSelectionItalic,
  markSelection,
  strikeThroughSelection,
  subscriptSelection,
  superscriptSelection,
  underlineSelection
} from './tool-bar/utils'

const isVim = (keyMapName?: string) => (keyMapName?.substr(0, 3) === 'vim')

export const defaultKeyMap: KeyMap = {
  F10: function (cm) {
    cm.setOption('fullScreen', !cm.getOption('fullScreen'))
  },
  Esc: function (cm) {
    if (cm.getOption('fullScreen') && !isVim(cm.getOption('keyMap'))) {
      cm.setOption('fullScreen', false)
    } else {
      return CodeMirror.Pass
    }
  },
  'Cmd-S': () => {
    return undefined
  },
  'Ctrl-S': () => {
    return undefined
  },
  Enter: 'newlineAndIndentContinueMarkdownList',
  Tab: editor => {
    const tab = '\t'

    // contruct x length spaces
    const spaces = Array((editor.getOption('indentUnit') ?? 0) + 1).join(' ')

    // auto indent whole line when in list or blockquote
    const cursor = editor.getCursor()
    const line = editor.getLine(cursor.line)

    // this regex match the following patterns
    // 1. blockquote starts with "> " or ">>"
    // 2. unorder list starts with *+-parseInt
    // 3. order list starts with "1." or "1)"
    const regex = /^(\s*)(>[> ]*|[*+-]\s|(\d+)([.)]))/

    let match
    const multiple = editor.getSelection().split('\n').length > 1 ||
      editor.getSelections().length > 1

    if (multiple) {
      editor.execCommand('defaultTab')
    } else if ((match = regex.exec(line)) !== null) {
      const ch = match[1].length
      const pos = {
        line: cursor.line,
        ch: ch
      }
      if (editor.getOption('indentWithTabs')) {
        editor.replaceRange(tab, pos, pos, '+input')
      } else {
        editor.replaceRange(spaces, pos, pos, '+input')
      }
    } else {
      if (editor.getOption('indentWithTabs')) {
        editor.execCommand('defaultTab')
      } else {
        editor.replaceSelection(spaces)
      }
    }
  },
  'Cmd-Left': 'goLineLeftSmart',
  'Cmd-Right': 'goLineRight',
  Home: 'goLineLeftSmart',
  End: 'goLineRight',
  'Ctrl-I': makeSelectionItalic,
  'Cmd-I': makeSelectionItalic,
  'Ctrl-B': makeSelectionBold,
  'Cmd-B': makeSelectionBold,
  'Ctrl-U': underlineSelection,
  'Cmd-U': underlineSelection,
  'Ctrl-D': strikeThroughSelection,
  'Cmd-D': strikeThroughSelection,
  'Ctrl-M': markSelection,
  'Cmd-M': markSelection,
  // Legacy shortcuts. maybe removed in a future update
  'Ctrl-*': makeSelectionItalic,
  'Shift-Ctrl-8': makeSelectionItalic,
  'Ctrl-_': makeSelectionItalic,
  'Shift-Ctrl--': makeSelectionItalic,
  'Ctrl-~': subscriptSelection,
  'Shift-Ctrl-`': subscriptSelection,
  'Ctrl-^': superscriptSelection,
  'Shift-Ctrl-6': superscriptSelection,
  'Ctrl-+': underlineSelection,
  'Shift-Ctrl-=': underlineSelection,
  'Ctrl-=': markSelection
}
