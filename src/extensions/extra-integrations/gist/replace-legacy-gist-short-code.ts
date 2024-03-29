/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { GistMarkdownExtension } from './gist-markdown-extension'
import type { RegexOptions } from '../../../external-types/markdown-it-regex/interface'

const finalRegex = /^{%gist\s+(\w+\/\w+)\s*%}$/

/**
 * Replacer for legacy hedgedoc 1 gist shortcodes.
 */
export const replaceLegacyGistShortCode: RegexOptions = {
  name: 'legacy-gist-short-code',
  regex: finalRegex,
  replace: (match) => {
    // ESLint wants to collapse this tag, but then the tag won't be valid html anymore.
    // noinspection CheckTagEmptyBody
    return `<${GistMarkdownExtension.tagName} id="${match}"></${GistMarkdownExtension.tagName}>`
  }
}
