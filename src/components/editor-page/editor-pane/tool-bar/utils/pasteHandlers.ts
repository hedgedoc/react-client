/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Editor } from 'codemirror'
import { convertClipboardTableToMarkdown, isTable } from '../../table-extractor'
import { handleUpload } from '../../upload-handler'
import { insertAtCursor } from './toolbarButtonUtils'

type ClipboardDataFormats = 'text' | 'url' | 'text/plain' | 'text/uri-list' | 'text/html'

export interface PasteEvent {
  clipboardData: {
    files: FileList,
    getData: (format: ClipboardDataFormats) => string
  },
  preventDefault: () => void
}

const isCursorInCodefence = (editor: Editor): boolean => {
  const currentLine = editor.getCursor().line
  let codefenceCount = 0
  for (let line = currentLine; line >= 0; --line) {
    const markdownContentLine = editor.getDoc().getLine(line)
    if (markdownContentLine.startsWith('```')) {
      codefenceCount++
    }
  }
  return codefenceCount % 2 === 1
}

export const handleTablePaste = (event: PasteEvent, editor: Editor): boolean => {
  const pasteText = event.clipboardData.getData('text')
  if (!pasteText || isCursorInCodefence(editor) || !isTable(pasteText)) {
    return false
  }
  event.preventDefault()
  const markdownTable = convertClipboardTableToMarkdown(pasteText)
  insertAtCursor(editor, markdownTable)
  return true
}

export const handleFilePaste = (event: PasteEvent, editor: Editor): boolean => {
  if (!event.clipboardData.files || event.clipboardData.files.length < 1) {
    return false
  }
  event.preventDefault()
  const files: FileList = event.clipboardData.files
  if (files && files.length >= 1) {
    handleUpload(files[0], editor)
    return true
  }
  return false
}
