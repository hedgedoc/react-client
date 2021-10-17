/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Editor } from 'codemirror'
import type { EmojiClickEventDetail } from 'emoji-picker-element/shared'
import { createNumberRangeArray } from '../../../../common/number-range/number-range'
import { getEmojiShortCode } from './emojiUtils'

export const makeSelectionBold = (editor: Editor): void => wrapTextWith(editor, '**')
export const makeSelectionItalic = (editor: Editor): void => wrapTextWith(editor, '*')
export const strikeThroughSelection = (editor: Editor): void => wrapTextWith(editor, '~~')
export const underlineSelection = (editor: Editor): void => wrapTextWith(editor, '++')
export const subscriptSelection = (editor: Editor): void => wrapTextWith(editor, '~')
export const superscriptSelection = (editor: Editor): void => wrapTextWith(editor, '^')
export const markSelection = (editor: Editor): void => wrapTextWith(editor, '==')

export const addHeaderLevel = (editor: Editor): void =>
  changeLines(editor, (line) => (line.startsWith('#') ? `#${line}` : `# ${line}`))
export const addCodeFences = (editor: Editor): void => wrapTextWithOrJustPut(editor, '```\n', '\n```')
export const addQuotes = (editor: Editor): void => insertOnStartOfLines(editor, '> ')

export const addList = (editor: Editor): void => createList(editor, () => '- ')
export const addOrderedList = (editor: Editor): void => createList(editor, (j) => `${j}. `)
export const addTaskList = (editor: Editor): void => createList(editor, () => '- [ ] ')

export const addImage = (editor: Editor): void => addLink(editor, '!')

export const addLine = (editor: Editor): void => changeLines(editor, (line) => `${line}\n----`)
export const addCollapsableBlock = (editor: Editor): void =>
  changeLines(editor, (line) => `${line}\n:::spoiler Toggle label\n  Toggled content\n:::`)
export const addComment = (editor: Editor): void => changeLines(editor, (line) => `${line}\n> []`)
export const addTable = (editor: Editor, rows: number, columns: number): void => {
  const rowArray = createNumberRangeArray(rows)
  const colArray = createNumberRangeArray(columns).map((col) => col + 1)
  const head = '|  # ' + colArray.join(' |  # ') + ' |'
  const divider = '| ' + colArray.map(() => '----').join(' | ') + ' |'
  const body = rowArray.map(() => '| ' + colArray.map(() => 'Text').join(' | ') + ' |').join('\n')
  const table = `${head}\n${divider}\n${body}`
  changeLines(editor, (line) => `${line}\n${table}`)
}

export const addEmoji = (emoji: EmojiClickEventDetail, editor: Editor): void => {
  const shortCode = getEmojiShortCode(emoji)
  if (shortCode) {
    insertAtCursor(editor, shortCode)
  }
}

export const wrapTextWith = (editor: Editor, symbol: string, endSymbol?: string): void => {
  if (!editor.getSelection()) {
    return
  }
  const ranges = editor.listSelections()
  for (const range of ranges) {
    if (range.empty()) {
      continue
    }
    const from = range.from()
    const to = range.to()

    const selection = editor.getRange(from, to)
    editor.replaceRange(symbol + selection + (endSymbol || symbol), from, to, '+input')
    range.head.ch += symbol.length
    range.anchor.ch += endSymbol ? endSymbol.length : symbol.length
  }
  editor.setSelections(ranges)
}

const wrapTextWithOrJustPut = (editor: Editor, symbol: string, endSymbol?: string): void => {
  if (!editor.getSelection()) {
    const cursor = editor.getCursor()
    const lineNumber = cursor.line
    const line = editor.getLine(lineNumber)
    const replacement = /\s*\\n/.exec(line) ? `${symbol}${endSymbol ?? ''}` : `${symbol}${line}${endSymbol ?? ''}`
    editor.replaceRange(replacement, { line: cursor.line, ch: 0 }, { line: cursor.line, ch: line.length }, '+input')
  }
  wrapTextWith(editor, symbol, endSymbol ?? symbol)
}

export const insertOnStartOfLines = (editor: Editor, symbol: string): void => {
  const cursor = editor.getCursor()
  const ranges = editor.listSelections()
  for (const range of ranges) {
    const from = range.empty() ? { line: cursor.line, ch: 0 } : range.from()
    const to = range.empty() ? { line: cursor.line, ch: editor.getLine(cursor.line).length } : range.to()
    const selection = editor.getRange(from, to)
    const lines = selection.split('\n')
    editor.replaceRange(lines.map((line) => `${symbol}${line}`).join('\n'), from, to, '+input')
  }
  editor.setSelections(ranges)
}

export const changeLines = (editor: Editor, replaceFunction: (line: string) => string): void => {
  const cursor = editor.getCursor()
  const ranges = editor.listSelections()
  for (const range of ranges) {
    const lineNumber = range.empty() ? cursor.line : range.from().line
    const line = editor.getLine(lineNumber)
    editor.replaceRange(
      replaceFunction(line),
      { line: lineNumber, ch: 0 },
      {
        line: lineNumber,
        ch: line.length
      },
      '+input'
    )
  }
  editor.setSelections(ranges)
}

export const createList = (editor: Editor, listMark: (i: number) => string): void => {
  const cursor = editor.getCursor()
  const ranges = editor.listSelections()
  for (const range of ranges) {
    const from = range.empty() ? { line: cursor.line, ch: 0 } : range.from()
    const to = range.empty() ? { line: cursor.line, ch: editor.getLine(cursor.line).length } : range.to()

    const selection = editor.getRange(from, to)
    const lines = selection.split('\n')
    editor.replaceRange(lines.map((line, i) => `${listMark(i + 1)}${line}`).join('\n'), from, to, '+input')
  }
  editor.setSelections(ranges)
}

export const addLink = (editor: Editor, prefix?: string): void => {
  const cursor = editor.getCursor()
  const ranges = editor.listSelections()
  for (const range of ranges) {
    const from = range.empty() ? { line: cursor.line, ch: cursor.ch } : range.from()
    const to = range.empty() ? { line: cursor.line, ch: cursor.ch } : range.to()
    const selection = editor.getRange(from, to)
    const linkRegex = /^(?:https?|ftp|mailto):/
    if (linkRegex.exec(selection)) {
      editor.replaceRange(`${prefix || ''}[](${selection})`, from, to, '+input')
    } else {
      editor.replaceRange(`${prefix || ''}[${selection}](https://)`, from, to, '+input')
    }
  }
}

export const insertAtCursor = (editor: Editor, text: string): void => {
  const cursor = editor.getCursor()
  const ranges = editor.listSelections()
  for (const range of ranges) {
    const from = range.empty() ? { line: cursor.line, ch: cursor.ch } : range.from()
    const to = range.empty() ? { line: cursor.line, ch: cursor.ch } : range.to()
    editor.replaceRange(`${text}`, from, to, '+input')
  }
}
