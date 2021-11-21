/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { RegexOptions } from '../../../../external-types/markdown-it-regex/interface'
import { YoutubeMarkdownExtension } from './youtube-markdown-extension'

export const replaceLegacyYoutubeShortCode: RegexOptions = {
  name: 'legacy-youtube-short-code',
  regex: /^{%youtube ([^"&?\\/\s]{11}) ?%}$/,
  replace: (match) => {
    // ESLint wants to collapse this tag, but then the tag won't be valid html anymore.
    // noinspection CheckTagEmptyBody
    return `<${YoutubeMarkdownExtension.tagName} id="${match}"></${YoutubeMarkdownExtension.tagName}>`
  }
}