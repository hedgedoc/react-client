import { Editor, Hint, Hints, Pos } from 'codemirror'
import Database from 'emoji-picker-element/database'
import { Emoji, EmojiClickEventDetail, NativeEmoji } from 'emoji-picker-element/shared'
import { emojiPickerConfig } from '../tool-bar/emoji-picker/emoji-picker'
import { getEmojiIcon, getEmojiShortCode } from '../tool-bar/utils/emojiUtils'
import { findWordAtCursor, Hinter } from './index'

const emojiIndex = new Database(emojiPickerConfig)
const emojiWordRegex = /^:([\w-_+]*)$/

const findEmoji = async (emojiIndex: Database, term: string): Promise<Emoji[]> => {
  try {
    if (term === '') {
      return await emojiIndex.getTopFavoriteEmoji(7)
    } else {
      const queryResult = await emojiIndex.getEmojiBySearchQuery(term)
      if (queryResult.length === 0) {
        return await emojiIndex.getTopFavoriteEmoji(7)
      } else {
        return queryResult
      }
    }
  } catch (error) {
    console.error(error)
    return []
  }
}

const generateEmojiHints = async (editor: Editor): Promise<Hints | null> => {
  const searchTerm = findWordAtCursor(editor)
  const searchResult = emojiWordRegex.exec(searchTerm.text)
  if (searchResult === null) {
    return null
  }
  const suggestionList: Emoji[] = await findEmoji(emojiIndex, searchResult[1])
  const cursor = editor.getCursor()
  const skinTone = await emojiIndex.getPreferredSkinTone()
  const emojiEventDetails: EmojiClickEventDetail[] = suggestionList.map((emoji) => ({
    emoji,
    skinTone: skinTone,
    unicode: ((emoji as NativeEmoji).unicode ? (emoji as NativeEmoji).unicode : undefined),
    name: emoji.name
  }))
  return {
    list: emojiEventDetails.map((emojiData): Hint => ({
      text: getEmojiShortCode(emojiData),
      render: (parent: HTMLLIElement) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = `${getEmojiIcon(emojiData)}   ${getEmojiShortCode(emojiData)}`
        parent.appendChild(wrapper)
      }
    })),
    from: Pos(cursor.line, searchTerm.start),
    to: Pos(cursor.line, searchTerm.end)
  }
}

export const EmojiHinter: Hinter = {
  wordRegExp: emojiWordRegex,
  hint: generateEmojiHints
}
