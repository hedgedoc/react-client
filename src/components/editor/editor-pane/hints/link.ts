import { Editor, Hint, Hints, Pos } from 'codemirror'
import { findWordAtCursor, Hinter } from './index'

const allowedChars = /(\[]?)/
const wordRegExp = /^(\[(.*])?)$/
const allSupportedLinks = [
  '[link text](https://example.com)',
  '[reference]: https://example.com',
  '[link text][reference]',
  '[reference]',
  '[^footnote reference]: https://example.com',
  '[^footnote reference]',
  '^[inline footnote]',
  '[TOC]'
]

const linkHint = (editor: Editor): Promise< Hints| null > => {
  return new Promise((resolve) => {
    const searchTerm = findWordAtCursor(editor, allowedChars)
    const searchResult = wordRegExp.exec(searchTerm.text)
    if (searchResult === null) {
      resolve(null)
      return
    }
    const suggestions = allSupportedLinks
    const cursor = editor.getCursor()
    if (!suggestions) {
      resolve(null)
    } else {
      resolve({
        list: suggestions.map((suggestion: string): Hint => ({
          text: suggestion,
          displayText: suggestion
        })),
        from: Pos(cursor.line, searchTerm.start),
        to: Pos(cursor.line, searchTerm.end+1)
      })
    }
  })
}

export const LinkHinter: Hinter = {
  allowedChars,
  wordRegExp,
  hint: linkHint
}
