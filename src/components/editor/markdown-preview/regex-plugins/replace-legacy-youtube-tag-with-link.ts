import { RegexOptions } from '../../../../external-types/markdown-it-regex/interface'

export const replaceLegacyYoutubeTagWithLink: RegexOptions = {
  name: 'legacy-youtube-tag',
  regex: /^{%youtube ([^"&?\\/\s]{11})%}$/,
  replace: (match) => {
    const link = `https://www.youtube.com/watch?v=${match}`
    return `<a href="${link}">${link}</a>`
  }
}
