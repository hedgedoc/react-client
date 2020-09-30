import { ForkAwesomeIcons } from '../../../editor/editor-pane/tool-bar/emoji-picker/icon-names'

interface TrimmedEmojiData {
  shortcodes: string[]
  emoji: string
}

type ShortCodeMap = { [key: string]: string }

const getEmojiShortcodes = async (): Promise<ShortCodeMap> => {
  const emojiMap: ShortCodeMap = {}
  try {
    const data = await window.fetch('/static/js/emoji-data.json')
    const json = await data.json() as TrimmedEmojiData[]
    if (!data || !json) {
      return {}
    }
    json.forEach(entry => {
      entry.shortcodes.forEach(shortcode => {
        emojiMap[shortcode] = entry.emoji
      })
    })
    return emojiMap
  } catch (e) {
    console.error(e)
    return {}
  }
}

const emojiSkinToneModifierMap = [2, 3, 4, 5, 6]
  .reduce((reduceObject, modifierValue) => {
    const lightSkinCode = 127995
    const codepoint = lightSkinCode + (modifierValue - 2)
    const shortcode = `skin-tone-${modifierValue}`
    reduceObject[shortcode] = `&#${codepoint};`
    return reduceObject
  }, {} as ShortCodeMap)

const forkAwesomeIconMap = Object.keys(ForkAwesomeIcons)
  .reduce((reduceObject, icon) => {
    const shortcode = `fa-${icon}`
    // noinspection CheckTagEmptyBody
    reduceObject[shortcode] = `<i class="fa fa-${icon}"></i>`
    return reduceObject
  }, {} as ShortCodeMap)

export const combinedEmojiData = {
  ...getEmojiShortcodes(),
  ...emojiSkinToneModifierMap,
  ...forkAwesomeIconMap
}
