import { RegexOptions } from '../../../../external-types/markdown-it-regex/interface'

export const replaceLegacyYoutubeShortCode: RegexOptions = {
  name: 'legacy-youtube-short-code',
  regex: /^{%youtube ([^"&?\\/\s]{11}) ?%}$/,
  replace: (match) => {
    return `<a><codimd-youtube id="${match}"/></a>`
  }
}
