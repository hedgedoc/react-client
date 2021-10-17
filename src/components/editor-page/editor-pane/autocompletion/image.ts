/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Editor, Hint, Hints } from 'codemirror'
import { Pos } from 'codemirror'
import type { Hinter } from './index'
import { findWordAtCursor } from './index'

const wordRegExp = /^(!(\[.*])?)$/
const allSupportedImages = [
  '![image alt](https:// "title")',
  '![image alt](https:// "title" =WidthxHeight)',
  '![image alt][reference]'
]

const imageHint = (editor: Editor): Promise<Hints | null> => {
  return new Promise((resolve) => {
    const searchTerm = findWordAtCursor(editor)
    const searchResult = wordRegExp.exec(searchTerm.text)
    if (searchResult === null) {
      resolve(null)
      return
    }
    const suggestions = allSupportedImages
    const cursor = editor.getCursor()
    if (!suggestions) {
      resolve(null)
    } else {
      resolve({
        list: suggestions.map(
          (suggestion: string): Hint => ({
            text: suggestion
          })
        ),
        from: Pos(cursor.line, searchTerm.start),
        to: Pos(cursor.line, searchTerm.end + 1)
      })
    }
  })
}

export const ImageHinter: Hinter = {
  wordRegExp,
  hint: imageHint
}
