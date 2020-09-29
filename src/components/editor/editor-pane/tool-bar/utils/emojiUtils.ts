import { EmojiClickEventDetail } from 'emoji-picker-element/shared'

export const getEmojiIcon = (emoji: EmojiClickEventDetail): string => {
  if (emoji.unicode) {
    return emoji.unicode
  }
  if (emoji.name) {
    // noinspection CheckTagEmptyBody
    return `<i class="fa ${emoji.name}"></i>`
  }
  return ''
}

export const getEmojiShortCode = (emoji: EmojiClickEventDetail): string => {
  return `:${emoji.emoji.shortcodes[0]}:`
}
