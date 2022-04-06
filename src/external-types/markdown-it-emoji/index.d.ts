/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

declare module 'markdown-it-emoji/bare' {
  import type MarkdownIt from 'markdown-it/lib'
  import type { EmojiOptions } from './interface'
  const markdownItEmoji: MarkdownIt.PluginWithOptions<EmojiOptions>
  export = markdownItEmoji
}
