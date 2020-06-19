import { RegexOptions } from '../../../../external-types/markdown-it-regex/interface'

export const replaceLegacyYoutubeShortCode: RegexOptions = {
  name: 'legacy-youtube-short-code',
  regex: /^{%youtube ([^"&?\\/\s]{11}) ?%}$/,
  replace: (match) => {
    // noinspection CheckTagEmptyBody
    return `<codimd-youtube id="${match}"></codimd-youtube>`
  }
}
