/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Editor, Hint, Hints, Pos } from 'codemirror'
import { findWordAtCursor, Hinter, search } from './index'

type highlightJsImport = typeof import('../../../common/hljs/hljs')

const wordRegExp = /^```((\w|-|_|\+)*)$/
let allSupportedLanguages: string[] = []

/**
 * Fetches the highlight js chunk.
 * @return the retrieved highlight js api
 */
const loadHljs = async (): Promise<highlightJsImport | null> => {
  try {
    return await import('../../../common/hljs/hljs')
  } catch (error) {
    console.error('hljs load error', error)
    return null
  }
}

/**
 * Creates a codemirror autocompletion hint with supported highlight js languages.
 * @param editor The codemirror editor that requested the autocompletion
 * @return The generated {@link Hints} or null if no hints exist.
 */
const codeBlockHint = async (editor: Editor): Promise<Hints | null> => {
  const highlightJs = await loadHljs()

  if (highlightJs === null) {
    return null
  }

  return new Promise((resolve) => {
    const searchTerm = findWordAtCursor(editor)
    const searchResult = wordRegExp.exec(searchTerm.text)
    if (searchResult === null) {
      resolve(null)
      return
    }
    const term = searchResult[1]
    if (allSupportedLanguages.length === 0) {
      allSupportedLanguages = highlightJs.default
        .listLanguages()
        .concat('csv', 'flow', 'html', 'js', 'markmap', 'abc', 'graphviz', 'mermaid', 'vega-lite')
    }
    const suggestions = search(term, allSupportedLanguages)
    const cursor = editor.getCursor()
    if (!suggestions) {
      resolve(null)
    } else {
      resolve({
        list: suggestions.map(
          (suggestion: string): Hint => ({
            text: '```' + suggestion + '\n\n```\n',
            displayText: suggestion
          })
        ),
        from: Pos(cursor.line, searchTerm.start),
        to: Pos(cursor.line, searchTerm.end)
      })
    }
  })
}

export const CodeBlockHinter: Hinter = {
  wordRegExp,
  hint: codeBlockHint
}
