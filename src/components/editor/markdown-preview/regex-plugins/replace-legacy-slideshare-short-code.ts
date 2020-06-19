import { RegexOptions } from '../../../../external-types/markdown-it-regex/interface'

const finalRegex = /^{%slideshare (\w+\/[\w-]+) ?%}$/

export const replaceLegacySlideshareShortCode: RegexOptions = {
  name: 'legacy-slideshare-short-code',
  regex: finalRegex,
  replace: (match) => {
    return `<a><codimd-slideshare id="${match}"/></a>`
  }
}
