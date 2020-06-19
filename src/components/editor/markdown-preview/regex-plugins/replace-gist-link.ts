import { RegexOptions } from '../../../../external-types/markdown-it-regex/interface'

const protocolRegex = /(?:http(?:s)?:\/\/)?/
const domainRegex = /(?:gist\.github\.com\/)/
const idRegex = /(\w+\/\w+)/
const tailRegex = /(?:[./?#].*)?/
const gistUrlRegex = new RegExp(`(?:${protocolRegex.source}${domainRegex.source}${idRegex.source}${tailRegex.source})`)
const linkRegex = new RegExp(`^${gistUrlRegex.source}$`, 'i')

export const replaceGistLink: RegexOptions = {
  name: 'gist-link',
  regex: linkRegex,
  replace: (match) => {
    return `<codimd-gist id="${match}"/>`
  }
}
