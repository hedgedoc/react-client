import { RegexOptions } from '../../../../external-types/markdown-it-regex/interface'

export const replaceLegacyVimeoShortCode: RegexOptions = {
  name: 'legacy-vimeo-short-code',
  regex: /^{%vimeo ([\d]{6,11}) ?%}$/,
  replace: (match) => {
    return `<a><codimd-vimeo id="${match}"/></a>`
  }
}
