import { BaseEmoji, CustomEmoji, EmojiData } from 'emoji-mart'

export const getEmojiIcon = (emoji: EmojiData):string => {
  if ((emoji as BaseEmoji).native) {
    return (emoji as BaseEmoji).native
  } else if ((emoji as CustomEmoji).imageUrl) {
    // noinspection CheckTagEmptyBody
    return `<i class="fa ${(emoji as CustomEmoji).name}"></i>`
  }
  return ''
}

export const getEmojiShortCode = (emoji: EmojiData):string => {
  if ((emoji as BaseEmoji).colons) {
    return (emoji as BaseEmoji).colons
  } else if ((emoji as CustomEmoji).imageUrl) {
    // noinspection CheckTagEmptyBody
    return `:${(emoji as CustomEmoji).name}:`
  }
  return ''
}
