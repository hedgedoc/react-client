/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Editor, Hint, Hints } from 'codemirror'
import { Pos } from 'codemirror'
import type { Hinter } from './index'
import { findWordAtCursor, generateHintListByPrefix } from './index'

const wordRegExp = /^(\s{0,3})(#{1,6})$/
const allSupportedHeaders = ['# h1', '## h2', '### h3', '#### h4', '##### h5', '###### h6', '###### tags: `example`']
const allSupportedHeadersTextToInsert = ['# ', '## ', '### ', '#### ', '##### ', '###### ', '###### tags: `example`']

const headerHint = (editor: Editor): Promise<Hints | null> => {
  return new Promise((resolve) => {
    const searchTerm = findWordAtCursor(editor)
    const searchResult = wordRegExp.exec(searchTerm.text)
    if (searchResult === null) {
      resolve(null)
      return
    }
    const term = searchResult[0]
    if (!term) {
      resolve(null)
      return
    }
    const suggestions = generateHintListByPrefix(term, allSupportedHeaders)
    const cursor = editor.getCursor()
    if (!suggestions) {
      resolve(null)
    } else {
      resolve({
        list: suggestions.map(
          (suggestion): Hint => ({
            text: allSupportedHeadersTextToInsert[allSupportedHeaders.indexOf(suggestion)],
            displayText: suggestion
          })
        ),
        from: Pos(cursor.line, searchTerm.start),
        to: Pos(cursor.line, searchTerm.end)
      })
    }
  })
}

export const HeaderHinter: Hinter = {
  wordRegExp,
  hint: headerHint
}
