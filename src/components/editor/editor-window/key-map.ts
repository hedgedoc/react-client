import CodeMirror, { KeyMap } from 'codemirror'
import { wrapTextWith } from './tool-bar/utils'

// const isMac = CodeMirror.keyMap.default === CodeMirror.keyMap.macDefault

export const defaultKeyMap: KeyMap = {
  F10: function (cm) {
    cm.setOption('fullScreen', !cm.getOption('fullScreen'))
  },
  Esc: function (cm) {
    if (cm.getOption('fullScreen') && !(cm.getOption('keyMap')?.substr(0, 3) === 'vim')) {
      cm.setOption('fullScreen', false)
    } else {
      return CodeMirror.Pass
    }
  },
  'Cmd-S': function () {
    return CodeMirror.Pass
  },
  'Ctrl-S': function () {
    return CodeMirror.Pass
  },
  Enter: 'newlineAndIndentContinueMarkdownList',
  Tab: function (cm) {
    const tab = '\t'

    // contruct x length spaces
    const spaces = Array((cm.getOption('indentUnit') ?? 0) + 1).join(' ')

    // auto indent whole line when in list or blockquote
    const cursor = cm.getCursor()
    const line = cm.getLine(cursor.line)

    // this regex match the following patterns
    // 1. blockquote starts with "> " or ">>"
    // 2. unorder list starts with *+-parseInt
    // 3. order list starts with "1." or "1)"
    const regex = /^(\s*)(>[> ]*|[*+-]\s|(\d+)([.)]))/

    let match
    const multiple = cm.getSelection().split('\n').length > 1 ||
      cm.getSelections().length > 1

    if (multiple) {
      cm.execCommand('defaultTab')
    } else if ((match = regex.exec(line)) !== null) {
      const ch = match[1].length
      const pos = {
        line: cursor.line,
        ch: ch
      }
      if (cm.getOption('indentWithTabs')) {
        cm.replaceRange(tab, pos, pos, '+input')
      } else {
        cm.replaceRange(spaces, pos, pos, '+input')
      }
    } else {
      if (cm.getOption('indentWithTabs')) {
        cm.execCommand('defaultTab')
      } else {
        cm.replaceSelection(spaces)
      }
    }
  },
  'Cmd-Left': 'goLineLeftSmart',
  'Cmd-Right': 'goLineRight',
  Home: 'goLineLeftSmart',
  End: 'goLineRight',
  'Ctrl-C': function (cm) {
    if (cm.getOption('keyMap')?.substr(0, 3) === 'vim') {
      document.execCommand('copy')
    } else {
      return CodeMirror.Pass
    }
  },
  'Ctrl-*': cm => {
    wrapTextWith(cm, '*')
  },
  'Shift-Ctrl-8': cm => {
    wrapTextWith(cm, '*')
  },
  'Ctrl-_': cm => {
    wrapTextWith(cm, '_')
  },
  'Shift-Ctrl--': cm => {
    wrapTextWith(cm, '_')
  },
  'Ctrl-~': cm => {
    wrapTextWith(cm, '~')
  },
  'Shift-Ctrl-`': cm => {
    wrapTextWith(cm, '~')
  },
  'Ctrl-^': cm => {
    wrapTextWith(cm, '^')
  },
  'Shift-Ctrl-6': cm => {
    wrapTextWith(cm, '^')
  },
  'Ctrl-+': cm => {
    wrapTextWith(cm, '+')
  },
  'Shift-Ctrl-=': cm => {
    wrapTextWith(cm, '+')
  },
  'Ctrl-=': cm => {
    wrapTextWith(cm, '=')
  }
}
