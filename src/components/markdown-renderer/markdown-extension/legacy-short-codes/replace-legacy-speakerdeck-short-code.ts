/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import markdownItRegex from 'markdown-it-regex'
import type MarkdownIt from 'markdown-it/lib'
import type { RegexOptions } from '../../../../external-types/markdown-it-regex/interface'

const finalRegex = /^{%speakerdeck (\w+\/[\w-]+) ?%}$/

export const legacySpeakerdeckShortCode: MarkdownIt.PluginSimple = (markdownIt) => {
  markdownItRegex(markdownIt, {
    name: 'legacy-speakerdeck-short-code',
    regex: finalRegex,
    replace: (match) => `<a href="https://speakerdeck.com/${match}">https://speakerdeck.com/${match}</a>`
  } as RegexOptions)
}
