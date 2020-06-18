import { RegexOptions } from '../../../../external-types/markdown-it-regex/interface'

const protocolRegex = /(?:http(?:s)?:\/\/)?/
const domainRegex = /(?:vimeo\.com\/)/
const idRegex = /([\d]{6,11})/
const vimeoVideoUrlRegex = new RegExp(`(?:${protocolRegex.source}${domainRegex.source}${idRegex.source})`)
const linkRegex = new RegExp(`^${vimeoVideoUrlRegex.source}$`)

export const replaceVimeoLink: RegexOptions = {
  name: 'vimeo-link',
  regex: linkRegex,
  replace: (match) => {
    return `<codimd-vimeo id="${match}"/>`
  }
}
