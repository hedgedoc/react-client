import { RegexOptions } from '../../../../external-types/markdown-it-regex/interface'

const finalRegex = /^{%gist (\w+\/\w+) ?%}$/

export const replaceLegacyGistShortCode: RegexOptions = {
  name: 'legacy-gist-short-code',
  regex: finalRegex,
  replace: (match) => {
    // noinspection CheckTagEmptyBody
    return `<codimd-gist id="${match}"></codimd-gist>`
  }
}
