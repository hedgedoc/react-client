/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { RegexOptions } from '../../../../external-types/markdown-it-regex/interface'
import { YoutubeMarkdownExtension } from './youtube-markdown-extension'
import markdownItRegex from 'markdown-it-regex'
import type MarkdownIt from 'markdown-it'

/**
 * Configure the given {@link MarkdownIt} to render legacy hedgedoc 1 youtube links.
 *
 * @param markdownIt The {@link MarkdownIt} to configure
 */
export const replaceLegacyYoutubeShortCodeMarkdownItPlugin: MarkdownIt.PluginSimple = (markdownIt: MarkdownIt): void =>
  markdownItRegex(markdownIt, {
    name: 'legacy-youtube-short-code',
    regex: /^{%youtube ([^"&?\\/\s]{11}) ?%}$/,
    replace: (match) => {
      // ESLint wants to collapse this tag, but then the tag won't be valid html anymore.
      // noinspection CheckTagEmptyBody
      return `<${YoutubeMarkdownExtension.tagName} id="${match}"></${YoutubeMarkdownExtension.tagName}>`
    }
  } as RegexOptions)
