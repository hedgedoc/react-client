import { RegexOptions } from '../../../../external-types/markdown-it-regex/interface'

const protocolRegex = /(?:http(?:s)?:\/\/)?/
const domainRegex = /(?:www\.)?(?:slideshare\.net\/)/
const idRegex = /(\w+\/[\w-]+)/
const tailRegex = /(?:[/?#].*)?/
const slideshareUrlRegex = new RegExp(`(?:${protocolRegex.source}${domainRegex.source}${idRegex.source}${tailRegex.source})`)
const linkRegex = new RegExp(`^${slideshareUrlRegex.source}$`)

export const replaceSlideshareLink: RegexOptions = {
  name: 'slideshare-link',
  regex: linkRegex,
  replace: (match) => {
    return `<codimd-slideshare id="${match}"/>`
  }
}
