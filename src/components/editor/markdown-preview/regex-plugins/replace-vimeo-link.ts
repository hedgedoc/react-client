import { RegexOptions } from '../../../../external-types/markdown-it-regex/interface'

const protocolRegex = /(?:http(?:s)?:\/\/)?/
const domainRegex = /(?:player\.)?(?:vimeo\.com\/)(?:(?:channels|album|ondemand|groups)\/\w+\/)?(?:video\/)?/
const idRegex = /([\d]{6,11})/
const tailRegex = /(?:[?#].*)?/
const vimeoVideoUrlRegex = new RegExp(`(?:${protocolRegex.source}${domainRegex.source}${idRegex.source}${tailRegex.source})`)
const linkRegex = new RegExp(`^${vimeoVideoUrlRegex.source}$`, 'i')

export const replaceVimeoLink: RegexOptions = {
  name: 'vimeo-link',
  regex: linkRegex,
  replace: (match) => {
    return `<codimd-vimeo id="${match}"/>`
  }
}
