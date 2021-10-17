/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type MarkdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji/bare'
import { combinedEmojiData } from './emoji/mapping'

export const twitterEmojis: MarkdownIt.PluginSimple = (markdownIt) => {
  emoji(markdownIt, {
    defs: combinedEmojiData
  })
}
